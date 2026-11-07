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
 /** Search result title when it should differ from the H1 (title). */
 seoTitle?: string;
 category: Category;
 date: string;
 readTime: number;
 body: string;
}

export const guides: Guide[] = [
 // ─── TFN ───────────────────────────────────────────────────────────────────
 {
 slug: "what-is-a-tfn",
 title:
 "What Is a TFN? Nine Digits, Two Rates",
 description:
 "A Tax File Number is your permanent identity with the ATO. Without one on file your employer must withhold 45% of your pay instead of 15%.",
 category: "TFN",
 date: "1 July 2024",
 readTime: 6,
 body: `
A Tax File Number is a nine digit identifier the ATO issues to anyone earning income in Australia. It is free and permanent, and it is what lets your employer withhold at the working holiday maker rate of 15% rather than the 45% that applies without one. Everything else here is keyed to it.

## Why does one number matter this much?

Because four separate systems use it as the thread that connects them to you. The ATO uses it for your tax and your refund. Your employer's payroll uses it to decide your withholding rate. Your super fund uses it to attach contributions to you. Your bank uses it to avoid withholding tax on interest.

A TFN problem surfaces as a wrong rate on a payslip, a super account nobody can match to you, or a refund that will not process.

## What does not having one on file actually cost?

Thirty cents in every dollar. With a TFN recorded, a working holiday maker's wages are withheld at 15%. Without one, the employer must withhold at 45%, and they have no discretion about it.

- $1,000 a week: $150 withheld at 15%, $450 at 45%, a difference of $300
- $1,500 a week: $225 against $675, a difference of $450
- $2,000 a week: $300 against $900, a difference of $600

The extra withholding is reconciled when the return is lodged and assessed, and any over-withheld amount can be refunded, though the outcome depends on your year. What is certain is that you lose access to the money for the months in between, which matters for anyone paying rent out of each pay.

## Who can get one, and how hard is it?

Anyone with the right to work in Australia, which covers 417 and 462 working holiday visas, student visas with work rights and most temporary skilled visas. The application is free and has to be made from inside Australia. How to [apply for a TFN on a working holiday visa](/tfn), step by step, is on our TFN page.

It is genuinely easy and you should not pay anyone for it. The declaration form your employer hands you on day one is harder: the residency box on it is a question that carries through to your end of year return, and it is the item most often answered wrongly.

## Why does the declaration form matter more than the number?

Because the form is what actually sets your rate. Handing a manager your TFN verbally, or showing them a photo of the letter, does not change payroll. The Tax File Number Declaration does, recording both your number and your status as a working holiday maker.

Every employer needs its own. Giving your TFN to a packing shed near Shepparton does nothing for a bar in Melbourne, and the most common quiet loss on a backpacker's year is one job at 15% and a second running at 45% for months because nobody completed a second form.

## How long does it take and what if you are already working?

Up to 28 days is the ATO's ceiling, about two weeks is typical, and it arrives as a posted letter to an Australian address. You can start work before it arrives.

You have 28 days from your first day to supply it. A declaration recording that the application is in progress keeps the working holiday maker rate through that window. Say nothing and the 45% starts immediately. Anything over-withheld before the number lands comes back at tax time rather than through payroll.

## How careful do you need to be with it?

Careful. A TFN alongside a passport scan is a workable identity kit, and working holiday makers are targeted because they are new and reachable through hostel noticeboards and social media.

The list of people entitled to ask is short: an employer after you have been hired, your bank, your super fund, a registered tax agent acting for you, Services Australia, and the ATO. Landlords, hostels, recruiters before hiring and anyone in a group chat are not on it, and refusing them costs you nothing. The [full list and the scam patterns](/blog/who-can-ask-for-your-tfn) are worth reading once.

## Where could your own paperwork cost you?

Getting a TFN is the same short task for everyone. What varies is whether you already have one and whether the paperwork around it was completed correctly.

- Whether you have ever worked in Australia before, since the number is permanent and applying again creates a duplicate that delays everything.
- Whether the postal address on your application will still hold mail in a month, which is the main cause of delay.
- How many employers you have, since each one needs its own declaration form.
- Whether the residency and threshold questions were answered correctly on that form, which can change how the year turns out at assessment.
- Whether your super fund has your TFN, since a fund without it taxes contributions higher and struggles to match the account to you later.

The number is what makes your [working holiday tax return](/tax-return) and any [superannuation claim after leaving Australia](/superannuation) possible, and you can [estimate your tax refund](/calculator) at any point in the year.
 `,
 }, {
 slug: "how-to-apply-for-a-tfn",
 title: "TFN application mistakes: address, passport and the 45% rate",
 description:
 "What goes wrong on a TFN application: the address, the passport match, the 28 day window and the 45% rate. The steps to apply are on our TFN page.",
 category: "TFN",
 date: "7 July 2024",
 readTime: 5,
 body: `
A Tax File Number costs nothing to obtain, and it normally arrives by post within 28 days of an application. An application is made once you are in Australia, and there needs to be an Australian postal address for the letter. What costs people money is what happens in the weeks before it arrives.

This guide is about what goes wrong. The steps themselves, in order, are on our page on how to [apply for a TFN on a working holiday visa](/tfn).

## What does the application depend on?

Three things, and all have to match. Your passport exactly as printed, including the spelling and date of birth, an Australian address the letter can be posted to, and an email address that will still work in a month.

No documents are uploaded. The ATO verifies the passport against immigration records electronically, which is why a transcription mismatch is the most common cause of an application failing. Our guide to [TFN identity documents](/blog/tfn-identity-documents-required) covers what the verification checks.

## Which address should you give?

The one you will still be at in a month, not the one you are at today. The TFN arrives as a physical letter, and a returned letter restarts the process rather than being redirected.

A hostel address works if you are confident about staying. A hostel you leave in ten days does not, and a friend's address or a longer term share house is better even if you have not moved in yet. An address that stopped being yours is the most common reason a 28 day process turns into a two month one.

## Can you start work before it arrives?

Yes, and this is where the money is decided. Your employer must withhold 45% rather than 15% until a TFN is on file, but a Tax File Number Declaration recording an application in progress keeps you on the working holiday rate through a 28 day window.

What matters is telling the employer on day one and completing the declaration accordingly. Say nothing and the 45% starts immediately. The difference on a $1,000 week is $300, every week, until it is corrected.

Any excess withheld is dealt with when the return is lodged and assessed, with the outcome depending on your year. What is lost for certain is the use of the money in between.

## What happens once it arrives?

Every employer needs its own Tax File Number Declaration. A TFN given to one employer is not shared with another, and each payroll needs that declaration before it can apply the right rate.

The declaration also carries the residency question, which feeds into your end of year return, and it is the field working holiday makers most often complete incorrectly. Our guide to the [Tax File Number Declaration form](/blog/tax-file-number-declaration-form) covers what each box asks.

## Is the number itself free?

Yes, because the opposite is often implied. The number is issued by the ATO at no charge, and we say the same on our [TFN page](/tfn).

Money is won and lost either side of it: the declaration form and the 28 day window on the way in, and the return that deals with any over withheld tax on the way out.

## What if it does not arrive?

The reference number from the confirmation email is what any follow up runs on, so keep it. If 28 days pass with nothing, the cause is almost always the address, and the second most common cause is a name or date of birth that did not match the passport.

An application that was rejected rather than delayed is a different problem, set out in our guide to [a rejected TFN application](/blog/tfn-application-rejected).

## How much would a delay cost you?

The application is the same for everyone. How much a delay costs you is not, and it comes down to points settled in your first week.

- Whether you had started work before applying, since the 45% period runs from the first pay rather than from the application.
- Whether you told the employer the application was in progress and it was recorded on the declaration.
- Whether the postal address will still be yours when the letter arrives.
- Whether your passport details were entered exactly as printed.
- Whether the employer is registered with the ATO as a working holiday maker employer, since an unregistered one withholds at foreign resident rates even after the TFN lands.
- How many employers you take on, because each needs its own declaration.

Anything over withheld during the wait is dealt with through the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) at any point in the year.
 `,
 }, {
 slug: "how-long-does-it-take-to-get-a-tfn",
 title:
 "How long does a TFN take? Most arrive in about 2 weeks",
 description:
 "Most TFNs arrive by post in about two weeks, and the ATO allows up to 28 days. You can start work while you wait. What decides it, and what to do if late.",
 seoTitle: "How long does a TFN take to arrive? 2 weeks, 28 days max",
 category: "TFN",
 date: "20 July 2026",
 readTime: 6,
 body: `
Your Tax File Number arrives as a physical letter, posted to an Australian address, never by email and never by SMS. Two weeks is normal, 28 days is the ATO's ceiling, and the wait itself is rarely what causes trouble. The trouble is the address you gave and the date of your first pay, because an employer without your number on file must withhold 45% instead of 15%.

You can work while you wait. Start the job, complete the Tax File Number Declaration showing that your application is in progress, and give the employer the number once it arrives. If it still has not come after the ATO's limit, [what to do when your TFN has not been received](/blog/tfn-application-delayed) covers the checks.

## Why does the 28 day figure matter more than the two week one?

Two separate 28 day clocks run at the same time. The first is the ATO's processing ceiling. The second is the window from your first day of work to give an employer your TFN before they must withhold 45% instead of the 15% working holiday maker rate. They start on different days, and the one that costs money is the second.

Land in Cairns in October, pick up bar work in your first week and apply the same week, and both clocks run together. Spend three weeks travelling the coast before applying and then start work immediately, and the employment clock is well ahead. That gap is where the money goes. The ATO sets out the application itself on its page for [TFN applications by temporary visitors](https://www.ato.gov.au/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application).

## What actually decides how long your TFN takes?

Two facts about your own application account for nearly every delay past 28 days, and both are within your control: the postal address you gave, and whether your passport and visa details match what the Department of Home Affairs holds.

**Your postal address.** Your TFN is a letter. A hostel you leave in ten days, a share house with eight names on the box, a wrong postcode digit: all end with the letter returned to the ATO and the wait starting again. In the applications we chase up, an address problem is by a wide margin the most common cause.

**Whether your details match immigration records.** A passport number transcribed with a slip, a name that appears differently on your visa grant than in your passport, or a previous TFN issued on an earlier visa will all put the application into manual review. That is not a rejection, but it adds weeks and will not resolve itself.

**Where you are staying.** Regional and remote delivery runs longer than metropolitan. A station address outside Katherine or a farm outside Mildura is not the same postal proposition as an inner Melbourne apartment, and the ATO's 28 days does not include Australia Post's own timeline.

## Does the wait cost you money?

Only if it overlaps with paid work and you have not told your employer the application is in progress. If the Tax File Number Declaration records that you have applied, your employer withholds at the working holiday maker rate through the 28 day window rather than at 45%. Say nothing, and the 45% starts on the first pay.

Withholding is not the final tax. Your liability is worked out on your income for the whole year when your return is lodged, and any over-withheld amount can be credited back, though the outcome depends on your year. What you lose for certain is the use of the money in between. Pay withheld at 45% while you wait is not corrected through payroll. It is reconciled when your [working holiday tax return](/tax-return) is assessed after 30 June.

## Can you start work before your TFN arrives?

Yes, and most people do. No law prevents you from being employed before your Tax File Number is issued, and no employer is entitled to refuse you work on that basis alone. Keep the ATO confirmation email in case the employer asks for it.

## Can you make it go faster?

No. There is no paid fast track, no priority processing and no online status tracker, whatever a third party site tells you. Anyone offering to expedite a TFN for a fee is selling something the ATO does not sell.

What shortens it is removing the two causes of delay, both settled before a [TFN application](/tfn) is made: a postal address that will still reach you in a month, and passport details that match the document exactly.

## What if 28 days pass and nothing has arrived?

Past day 28 it becomes a phone call. The ATO can be reached on 13 28 61 within Australian business hours, or on +61 2 6216 1111 from overseas, and you will need the reference number from your confirmation email and your passport.

Do not lodge a second application. A duplicate is the most reliable way to turn a three week delay into a two month one, because it creates a conflicting record that has to be resolved manually before either can proceed.

## Whose wait actually costs them?

The wait is close to identical for everyone. The cost of it is not.

- Whether you are working during the wait at all. A traveller who applies on arrival and starts work six weeks later has nothing at stake.
- Whether your employer recorded the in progress application on your declaration form.
- Whether your employer is registered with the ATO as a working holiday maker employer. An unregistered one withholds at foreign resident rates even after your TFN lands.
- Whether your address holds mail for a month. Seasonal work moves you, and harvest towns move you fastest.
- Whether you have held a TFN before on an earlier Australian visa. You keep it for life, and applying again creates the duplicate problem above.

If you have already worked a period at 45%, the extra withholding is reconciled when your [working holiday tax return](/tax-return) is assessed, and you can [estimate your tax](/calculator) before you lodge anything.
 `,
 }, {
 slug: "can-you-start-work-without-a-tfn",
 title:
 "Can you work without a TFN in Australia? Yes, for 28 days",
 description:
 "Yes. Start work before your TFN arrives: note on the declaration form that you have applied and you stay on 15% for 28 days. What to tell your employer.",
 category: "TFN",
 date: "20 July 2026",
 readTime: 6,
 body: `
Yes. Nothing prevents you starting work before your [Tax File Number](/tfn) arrives, and no employer can require it before hiring you. You have 28 days from your first day to supply it. Record on the declaration form that you have applied, and the working holiday maker rate applies through that window.

## What is the 28 day rule, exactly?

The 28 days run from the day you start with that employer, not from the day you applied for your TFN and not from the day you arrived in Australia. During them, an employer holding a Tax File Number Declaration that records your application in progress withholds at the ordinary working holiday maker rate of 15%. If the 28 days lapse and no TFN has been supplied, they must withhold at 45% on every pay from then on.

The clock is per employer. Start at a Perth cafe in March and a packing shed near Shepparton in May, and each one starts its own 28 days and needs its own declaration form. If you have not applied yet, the ATO's page on [TFN applications by temporary visitors](https://www.ato.gov.au/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application) covers eligibility and the online form.

## What does the declaration form actually do?

The Tax File Number Declaration decides your withholding rate. It is where you state that you are a working holiday maker, and where you either supply a TFN or record that you have applied for one. Payroll reads that form and applies the rate accordingly.

Showing a manager a photo of your TFN letter, or telling them the number verbally, does not change your pay. The rate follows the form. The residency box on that same form matters too: it carries through to your end of year return, and it is ticked wrong more often than any other item on the page.

## Does the 45% apply to everything if you miss the window?

No. If the 28 days lapse, the higher rate applies to each subsequent pay in full. It is not applied retrospectively to pays you have already received, and no employer claws money back out of past wages.

Hand in the TFN and the correct rate resumes from the next pay run. The over-withheld portion from the gap is not fixed in payroll; it is reconciled by the ATO when your return is assessed, along with anything else withheld that year. Whatever was withheld at 45% stays with the ATO until your [working holiday tax return](/tax-return) is assessed, which is the only point it is reconciled.

## What should you actually say to your employer on day one?

Say that your TFN application is in progress, offer the ATO confirmation email as evidence, and ask to complete the Tax File Number Declaration recording the application. Any hospitality or labour hire payroll office in Australia has had that conversation a hundred times.

The employers that get this wrong are not the large ones. Big hospitality groups and the labour hire firms that supply harvest work run this correctly by default. The gaps we see are small independent operators and single site farms, where payroll is one person doing it around everything else, and nobody notices that a rate is wrong until someone reads a payslip in June.

## Do you need a TFN for anything else while you wait?

You can open an Australian bank account without a TFN and be paid into it. Your super fund is what should not be left unresolved. A fund without your TFN on file taxes contributions at a higher rate, cannot accept some contributions at all, and is harder to find later when you are claiming it.

Superannuation is paid on your wages from your first dollar regardless, at 12%, and a working holiday maker can [claim your superannuation after leaving Australia](/superannuation). An account your fund cannot match to you is the most common reason people leave super behind.

## How expensive is your own 28 day window?

The 28 day rule is identical for everyone, so the rule itself is never the variable. What differs is how much the window costs you, and that turns on five facts about your own start date and your own employers.

- Whether you applied before or after starting work. Applying first almost always means no 45% pay at all.
- Whether the declaration recorded the in progress application. Without that record the 45% starts immediately rather than after 28 days.
- Whether the address on your application holds mail for a month. Seasonal work moves people, and a returned letter restarts the wait past the 28 days.
- Whether your employer is ATO registered as a working holiday maker employer. If not, they withhold at foreign resident rates even with your TFN on file, which is a separate over-withholding that is looked at when your return is assessed.
- How many employers you had in the year. Each one is its own form and its own clock.

Any period withheld above 15% is dealt with through your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) before deciding anything.
 `,
 }, {
 slug: "what-happens-without-your-tfn",
 title:
 "No TFN tax rate: 45% withheld instead of 15%",
 description:
 "Without a TFN your employer must withhold 45% instead of 15%, about $300 more on $1,000 a week. How to stop it, and how the extra is settled at tax time.",
 seoTitle: "No TFN tax rate: 45% withheld instead of 15%, and the fix",
 category: "TFN",
 date: "20 July 2026",
 readTime: 6,
 body: `
Thirty cents in every dollar, for as long as it lasts. With a TFN on file your employer withholds 15%; without one they must withhold 45%. On $1,000 a week that is $300 going to the ATO instead of your account, and on a $25 an hour job it is about $7.50 an hour.

## Why does your employer take 45% and not 15%?

Your employer has no discretion. Australian tax law requires an employer who does not hold an employee's Tax File Number to withhold at the top marginal rate of 45%, and an employer who ignores that is the one exposed to the ATO. The 15% working holiday maker rate is applied because of a document, not because of a visa.

That document is the Tax File Number Declaration. Handing over your visa, your passport or a photo of your TFN letter in a group chat does not do it. Until the declaration is with payroll, the system applies the rate it is legally required to apply.

## What does 45% withholding actually cost you?

The gap between the two rates is 30 percentage points, so do the arithmetic on your own wage rather than a generic one. Below are the weekly differences at wages realistic for full time seasonal and hospitality work.

- $800 a week: $120 withheld at 15% against $360 at 45%, a difference of $240
- $1,000 a week: $150 against $450, a difference of $300
- $1,500 a week: $225 against $675, a difference of $450
- $2,000 a week: $300 against $900, a difference of $600

A month of full time farm work in the Bundaberg or Mildura seasons at those rates is comfortably four figures of over-withholding.

## Do you get the money back?

It depends on your year, and the ATO decides.

Higher withholding is not a penalty. When your return is lodged the ATO works out what you owed across the financial year and compares it with what was withheld; if more was withheld than owed, the difference can be refunded to an Australian bank account. The extra withholding is reconciled only when your [working holiday tax return](/tax-return) is lodged and assessed, and how much of it comes back depends on the rest of your year.

What you lose is access to the money in the meantime. Paying hostel rent week to week, several months without $300 a week is a genuine problem, whatever is sorted out at assessment later. That is why fixing the declaration is worth more per hour than most of the shifts it affects.

## How do you stop it?

Give your employer a completed Tax File Number Declaration carrying your [TFN](/tfn). The correct rate applies from the next pay run. Your employer will not go back and re-run earlier pays at 15%, and is not required to; the earlier over-withholding is corrected by the ATO at tax time, not by payroll.

If your application is still in progress, record that on the declaration. An employer who has that on file applies the working holiday maker rate through the 28 day window instead of 45%, which usually means you never see a high pay at all.

## What decides how long you sit at 45%?

Four things decide how long the higher rate lasts, and none of them is the ATO being slow. That is why the period varies so widely between people who applied on the same day.

**Whether you told your employer the application was in progress.** The declaration records it, and that record is what carries the working holiday rate through the 28 day window.

**Whether your postal address was right on the application.** Your TFN arrives as a letter. A wrong address is the most common cause of a delay past 28 days by a wide margin, and every extra week is another week at 45%.

**Whether your employer is registered with the ATO as a working holiday maker employer.** An unregistered employer must withhold at foreign resident rates even once your TFN is on file. That is a separate over-withholding, not your mistake, and it is also looked at when your return is assessed. Check the payslip percentage rather than assuming the TFN fixed everything.

**How many employers you had.** Each employer needs its own declaration. Giving your TFN to the packing shed does not give it to the pub, and a common pattern is one job correctly at 15% and another quietly running at 45% for two months.

## Does this apply to cash in hand work?

Cash work sits outside this rule because there is usually no payroll applying a rate at all, a different and larger problem. Wages paid in cash are legal only where tax is still withheld and super is still paid, and where neither happens you have no withholding to reclaim and no income statement to lodge from.

If some of your year was cash, that income still belongs on your return. How it was paid changes what evidence is needed, not whether it is declared. See [cash in hand work in Australia](/blog/can-your-employer-pay-you-cash-in-hand) for what that means in practice.

## Can you claim the money back before the end of the year?

Usually you wait for the end of the financial year on 30 June. The exception that matters for working holiday makers is leaving Australia permanently: if you are departing and will not earn Australian income again that year, an early return can be lodged before 30 June.

Whether that is the right move depends on your residency position for the year, whether you have super to claim at the same time, and whether any employer is still to issue a final income statement. You can [estimate your tax refund](/calculator) first, and a period at 45% is exactly the situation where the estimate and the final figure diverge most.
 `,
 }, {
 slug: "tfn-vs-abn-difference",
 title:
 "TFN vs ABN: the difference, and why it costs money",
 description:
 "A TFN is for wages, where your employer withholds tax. An ABN is for contracting, where nothing is withheld and tax is due when you lodge. Which you need.",
 category: "TFN",
 date: "31 July 2024",
 readTime: 6,
 body: `
A TFN is your personal tax number, used when an employer pays you wages and withholds tax for you. An ABN identifies you as a business, used when you invoice for work and nothing is withheld. Most working holiday makers need only a TFN. Plenty end up needing both.

## What is a TFN for?

Your permanent identity with the ATO. Everyone earning income in Australia needs one, employed or self employed. It connects your wages, your withholding, your [superannuation](/superannuation) and your refund to the same person, and it never expires.

You need a [TFN](/tfn) for anything on a payroll: wages, PAYG withholding at the working holiday maker rate, employer super contributions and lodging a return. That covers most hospitality, retail, warehouse and employed farm work.

## What is an ABN for?

An eleven digit business identifier, used when you are trading as a sole trader rather than working as an employee. It lets you invoice a client, and it comes with the whole of the tax responsibility an employer would otherwise carry for you.

- You invoice for the work rather than being paid through payroll
- Nothing is withheld, so the tax falls due at assessment
- No employer superannuation is paid on your behalf
- You carry the commercial risk and generally supply your own equipment

It is common in gig work, delivery, some piece rate farm arrangements, and any job where the business asks for an invoice instead of putting you on the books. Our guide to [what an ABN is](/blog/what-is-an-abn) sets out when that is legitimate.

## Can you hold both at once?

Yes, and many working holiday makers do. The TFN is always required because it is your personal identifier, and the ABN sits alongside it for the contracting portion of your income.

What it creates is a single return with two kinds of income in it. Wages arrive with tax already withheld and ABN income arrives with none, so the withholding on the wage side often absorbs the liability on the ABN side. Both go on the same [working holiday tax return](/tax-return). Our guide to [holding a TFN and an ABN together](/blog/can-you-have-tfn-and-abn) covers how that interacts.

## How do you tell which one applies to your job?

The test is control, not the wording of the job ad. If the business decides when you start, how the work is done and what equipment you use, that is employment and it needs a TFN. If you decide those things, invoice for a result and carry the risk of fixing your own mistakes, that is contracting and it needs an ABN.

- **Employee**: on the payroll, tax withheld, super paid on top, the business directs the work
- **Contractor**: invoices issued, gross payments, your own tax and super, you direct the work

An advertisement requiring an ABN for supervised shift work at set hours is describing employment. That is sham contracting, and our guide to [employee versus contractor status](/blog/employee-vs-contractor-australia) explains the test and what it costs you.

## What does the wrong number actually cost you?

Being on an ABN when you should be an employee costs you the 12% super your employer would have paid, the award minimum rate, penalty rates, and any workers compensation cover, and it moves the entire tax bill onto you at the end of the year.

The reverse error is cheaper but not free. Working without your TFN recorded means 45% withheld instead of 15%, and no ABN on an invoice means 47% withheld by the payer.

## What decides which one you need this year?

Three facts about the work itself. Who controls how the work is done. Who supplies the equipment and carries the risk. And whether you are paid for hours or for a result.

Most working holiday years contain a mix, because a bar shift in Melbourne and a delivery round in the same month genuinely are different arrangements. What is not fine is a farm or an agency deciding for you that shift work is contracting, worth checking before the first pay run, when the super is the part that cannot be recovered easily. [Get in touch](/contact) if the arrangement you have been offered does not match the work you are actually doing.
`,
 }, {
 slug: "apply-for-tfn-before-arriving",
 title:
 "Can you apply for a TFN before arriving in Australia? No",
 description:
 "No. You must be in Australia to apply for a TFN on a working holiday visa. What to have ready before you fly so it goes in on day one, and which address.",
 seoTitle: "Can you apply for a TFN before arriving? No: what to prepare",
 category: "TFN",
 date: "20 July 2026",
 readTime: 6,
 body: `
No. The ATO's online TFN application for foreign passport holders requires you to be in Australia, so a working holiday maker cannot lodge it from home. What you can do beforehand is have every detail ready so it goes in on day one, which decides whether you ever see a 45% pay.

## Why does it have to wait until you arrive?

The application is built around your arrival being recorded against your visa, and it needs an Australian postal address to send the number to.

You can hold the granted visa for months beforehand and it makes no difference. The application is not gated on the grant, it is gated on you being here.

## Does applying on day one actually matter?

Yes, more than the processing time does. Once you have told an employer you applied, you have 28 days from your first day of work to give them your TFN before they must withhold 45% instead of the 15% working holiday maker rate, and the ATO takes up to 28 days to issue it. The only real variable is how many days pass between landing and applying.

Apply on day one and start work in week two, and the letter is very likely to arrive inside the employment window. Travel for a month first and then start work the day after you apply, and you have engineered a gap that costs 30 cents in every dollar until it closes.

## What should be ready before you fly?

Everything except the submission. The application is free, and [the form is not the hard part](/tfn).

- Your passport details, saved as a photo of the identity page. Details entered from memory are how applications end up in manual review.
- Your visa grant notice, accessible offline.
- A decision about your Australian postal address.
- An email address you will actually check, since the confirmation carries the reference number you will need if anything goes wrong.

## What address should you use?

Somewhere that will still hold your mail in four weeks, which is a different question from where you are sleeping on night one. Your TFN arrives as a letter and only as a letter.

A hostel is fine if it has a mail system and you are booked in for a few weeks. A hostel you are leaving on Friday is not. A friend or relative anywhere in Australia with a stable address is usually the better answer even if you never go there.

## Is your TFN affected if your visa changes?

No. A Tax File Number is issued once and kept for life. It does not expire with a visa, change with a second working holiday visa, or need renewing years later on a different visa.

What must stay current is the address the ATO holds against it, because that is where correspondence and any paper refund goes. Anyone who has been in Australia before on a student or working holiday visa should assume they already have a TFN and treat this as a retrieval.

## Your arrival dates decide the cost.

Everyone faces the same rule about applying from inside Australia, so the variable is what the gap between landing and applying costs you.

- Whether you have been in Australia before on any visa with work rights. If so you already have a TFN and applying again creates a duplicate that delays everything.
- How soon you intend to work. Someone starting a Thredbo or Falls Creek ski season in June with a job lined up has a much tighter margin than someone travelling first.
- Whether you have a stable Australian address, or anyone in the country who can be one for you.
- Whether your first employer is registered with the ATO as a working holiday maker employer, because an unregistered one withholds at foreign resident rates even once your TFN is on file.

Once you are working, tax withheld before the number was on file is dealt with through your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) at any point in the year.
 `,
 }, {
 slug: "tfn-application-delayed",
 title:
 "TFN not received after 28 days? 3 things to check",
 description:
 "If your TFN has not arrived after 28 days, it is usually the address, a mismatch with your visa record or a second application. How to check each one.",
 seoTitle: "TFN not received after 28 days? 3 causes and what to do",
 category: "TFN",
 date: "20 July 2026",
 readTime: 6,
 body: `
If your TFN has not arrived after 28 days, the cause is almost always an address the letter could not reach, details that do not match immigration records, or a duplicate application. The ATO's 28 days run from when it received the application, so check that first. Many delays turn out not to be delays.

## Has 28 days actually passed?

The processing window runs from the date the ATO received your application, not from when you decided to apply and not from your arrival in Australia. Online applications are normally received the same day, so the confirmation email settles it.

Under 28 days, there is nothing to escalate, and a [TFN application](/tfn) made correctly the first time is still the fastest route. Regional and remote postal delivery runs longer than metropolitan, so a station address in the Kimberley or a farm outside Renmark is a different proposition from inner Sydney.

## Why is the address the first thing to check?

Your TFN is a physical letter and nothing else. There is no email delivery, no SMS and no online copy to download, so an address the letter cannot reach is a total failure. This is the most common cause of a TFN that never turns up.

The failures are mundane. A postcode digit transposed. A hostel where mail for former guests goes into a box nobody empties. An address you gave in your first week and left in your third. If you have moved since applying, contact the old address before contacting anyone else.

## What else puts an application into review?

A mismatch between your application and the records the Department of Home Affairs holds. A passport number entered with a slip, a name that appears in a different order on your visa grant than in your passport, or a middle name included in one place and omitted in the other are each enough to stop automatic processing.

The third cause is a previous TFN. A Tax File Number is issued once and kept for life, so an applicant who held one on an earlier student or working holiday visa already has a number, and a new application conflicts with it rather than replacing it. If you have been in Australia before on any visa with work rights, assume the task is retrieving it.

## Why should you not apply a second time?

Because it is the most reliable way to make a three week delay into a two month one. A duplicate creates a conflicting record that has to be resolved manually before either application can proceed, and manual resolution is slower than the queue you were already in.

It is the mistake we see most often, and the one action that reliably makes things worse.

## How do you get a stalled application moving?

Past day 28 it becomes a phone call. The ATO can be reached on 13 28 61 during Australian business hours, or on +61 2 6216 1111 from outside Australia, and you need your passport and the reference number from your confirmation email.

What you are asking is narrow: has the TFN been issued, and to what address. If it was issued and the letter went astray, the address on record is corrected and it is re-sent. If it was never issued, you find out what is holding it. A tax agent can make that call on your behalf, which saves you the hold time and an identity verification built around documents an Australian resident has and a backpacker three weeks off the plane often does not.

## Can you keep working while it is unresolved?

Yes. The delay does not affect your right to work, and it does not have to affect your pay rate. Your employer keeps you on the working holiday maker rate of 15% through the 28 day employment window if the Tax File Number Declaration records that your application is in progress, and the confirmation email is your evidence.

If your own 28 day employment window is about to lapse while the ATO application is still open, tell payroll plainly. Some employers will hold the rate on the strength of the ATO correspondence. Others apply 45% because that is what the rule says, and the excess is dealt with through your [working holiday tax return](/tax-return).

## Which cause is behind your delay?

A delay past 28 days is almost always something specific rather than a queue, and the cause determines whether the fix is a phone call or simply waiting.

- Whether you have held an Australian TFN before, on any visa. If so this is a retrieval, and applying again is what is blocking it.
- Whether the address you gave still holds your mail. Harvest and hospitality work moves people faster than the post moves letters.
- Whether your passport details match the visa grant exactly, including name order and middle names.
- Whether a second application exists. If it does, that is very likely the whole problem.
- Whether you are working during the delay, and whether the declaration records the application.

If a stretch of pays has already run at 45%, it is reconciled when your return is assessed, and you can [estimate your tax refund](/calculator) to see what the year looks like once it is reconciled.
 `,
 }, {
 slug: "do-you-need-new-tfn-second-visa",
 title:
 "New TFN for a second visa? No, your TFN never expires",
 description:
 "No. Your TFN is issued once and never expires, so a second or third working holiday visa uses the same number. What to update, and super from last time.",
 seoTitle: "Do you need a new TFN for a second visa? No, keep yours",
 category: "TFN",
 date: "20 July 2026",
 readTime: 5,
 body: `
No. A Tax File Number is issued once and kept for life. It does not expire with a visa, does not change on a second or third working holiday visa, and does not need reactivating after years away. The same nine digits apply. What does need attention is the information the ATO holds against them.

## Why does the TFN survive the visa?

Because it identifies you, not your visa. It is attached to a person in the ATO's records, and every employer, super fund, bank and tax return you have had in Australia links back through it. A second one would fracture that history rather than refresh it.

A second application is actively harmful, not merely unnecessary. It creates a duplicate record that has to be resolved manually before anything can proceed, turning a five minute retrieval into a six week problem.

## Where do you find a TFN you have lost?

It is on more documents than people expect, and finding it is faster than any process involving the ATO. Start with anything from your first stint.

- The original letter the ATO posted when it was issued
- Any payslip or income statement from an Australian employer
- Any Australian tax return you have lodged
- Superannuation fund correspondence, which carries it if you supplied it
- Any earlier ATO correspondence at all

If none of those survive, a tax agent can retrieve it for you, and so can the ATO on 13 28 61 once you have verified your identity. What you must not do is apply again: a new [TFN application](/tfn) is only for someone who has never held one.

## What actually needs updating when you come back?

Three records, and none of them is the TFN itself. Getting these right before your first pay is what makes the second year uneventful.

**Your address.** The ATO still holds whatever you gave it on your first visit, usually a hostel you left years ago. Everything posted follows it until it is changed.

**Your bank account.** A refund directed to an Australian account you closed on the way to the airport does not disappear; it bounces and sits as a credit until the ATO is told where to send it. Returning backpackers sometimes have a first year they never lodged for, which is worth reviewing.

**A declaration form for each new employer.** Your TFN being permanent does not mean it travels between employers. Every new employer needs its own Tax File Number Declaration, answering the working holiday questions for the visa you are on now.

## What about super from your first visit?

A large amount of money gets abandoned here. If you claimed a departing Australia superannuation payment when you left, that account is closed and your second visit will accumulate into a new one, probably with a different fund chosen by your new employer.

If you did not claim it, it is still yours, either sitting with the original fund or, if the fund lost contact with you, reported as unclaimed and transferred to the ATO. Either way it can usually be traced, and it is tied to the same TFN you are about to start using again. If you are planning to leave again at the end of this visa, both stints can be dealt with together when you [claim your superannuation after leaving Australia](/superannuation).

## Do the tax rules work the same the second time?

Broadly yes. The financial year runs 1 July to 30 June, a return is usually worth lodging for any year you earned Australian income, the standard lodgement deadline is 31 October, and the working holiday maker rate of 15% applies up to $45,000 provided your employers hold your TFN and are registered as working holiday maker employers.

What is different is that you now have history. A prior year you never lodged for is still outstanding, and it may well contain money owed to you or a balance to pay, depending on how that year was withheld.

## What did your first visit leave behind?

The TFN never changes, so the work on a return visit is entirely about the records attached to it.

- Whether you lodged a return for your first visit. An unlodged year is still outstanding, not a problem going away.
- Whether super from the first visit was claimed, left with a fund, or transferred to the ATO as unclaimed.
- Whether the bank account your last refund was aimed at still exists.
- Whether your two stints fall in the same financial year or different ones, which changes how the income and any residency position is assessed.

Prior year returns can still be lodged, and a [working holiday tax return](/tax-return) covering an earlier year is routine rather than exceptional. You can [estimate your tax refund](/calculator) for either year.
 `,
 }, {
 slug: "how-to-find-lost-tfn",
 title:
 "Lost your TFN? Where to find it without reapplying",
 description:
 "Your TFN is permanent, so you find it rather than reapply. It is on payslips, super statements, notices of assessment and the ATO letter. If you have none.",
 seoTitle: "Lost your TFN? 4 places to find it without reapplying",
 category: "TFN",
 date: "29 July 2026",
 readTime: 4,
 body: `
Your [TFN](/tfn) is not gone. It is permanent, it was issued once, and it is almost certainly already written on something you still have: a payslip, a super fund statement, a notice of assessment, or the original ATO letter. A second application does not replace it, it conflicts with it.

## Where is it already written down?

Five places cover nearly everyone, and searching all of them takes less time than any process involving a phone call or an identity check. Your TFN was written down more often than you remember, usually by an employer or a super fund rather than by you.

- Your myGov account, if it is linked to the ATO: the number is shown in ATO online services under your personal details
- Payslips and income statements from any Australian employer, many of which display it
- Superannuation fund statements and welcome letters, if you gave the fund your number
- Any Australian tax return you have lodged, and the notice of assessment that followed it
- The original letter the ATO posted when the number was issued

The fastest single move is searching your email for the phrase tax file number. Most people who believe they have lost it find it within a few minutes, usually in an onboarding email or in fund correspondence they never opened.

## Why must you not simply apply again?

Because a Tax File Number is issued once per person for life. A second application creates a conflicting record that has to be resolved manually before either can proceed, which turns a retrieval into a delay of weeks.

This is the most common self inflicted problem among returning backpackers, and it is entirely understandable. The old number is missing, the form is free, applying again feels like progress. It is the one action that reliably makes it worse.

## What if you genuinely have nothing?

Then it is a retrieval through the ATO, which can be reached on 13 28 61 within Australian business hours or on +61 2 6216 1111 from overseas, or through a tax agent acting for you. Either way it is identity verification, not a new application.

Verification runs on your full legal name exactly as it appears on your passport, your date of birth, your passport number, the passport you held when you first applied if you have since renewed it, and your Australian address history. The renewed passport point catches people out: the record was created against the old document, and both may be needed.

It is harder from overseas, because the identity checks are built around documents and phone numbers an Australian resident has and someone who left two years ago frequently does not.

## Where does this bite hardest?

At the point where you actually need it, which is usually one of two moments. Starting a new job, where not having it means 45% withholding until it is supplied. Or claiming superannuation after leaving, where the fund cannot release money to someone it cannot identify.

The super case is the more expensive one, because it stacks with everything else that goes wrong once you are out of the country: a changed address, a closed bank account, a fund that has already reported the balance as unclaimed. Anyone planning to [claim your superannuation after leaving Australia](/superannuation) should locate their TFN before the flight.

## How do you not lose it again?

Store it somewhere that survives a stolen phone and a lost wallet: a password manager or an encrypted note rather than a photo in the camera roll. A paper copy is fine as long as it is kept separately from your passport, since the combination of the two is exactly what identity fraud needs.

Avoid emailing it to yourself in plain text or leaving it in an unlocked notes app. A TFN on its own cannot empty an account, but with a passport scan alongside it, it is enough to open one.

## Five minute search or a phone call?

Which one you are facing depends on your own history in Australia. These are the facts that decide it.

- Whether you have ever worked in Australia before, since that is what determines whether a number already exists.
- Whether you have renewed your passport since, which changes what is needed to verify you.
- Whether you are in Australia or overseas, which changes how hard the identity check is.
- Whether you have super sitting with a fund, since that is usually what makes finding it urgent.
- Whether there are prior years you never lodged, which need the same number and are worth reviewing.

Once you have it back, any outstanding year can still be lodged as a [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) for each year you worked.
 `,
 },

 // ─── ABN ───────────────────────────────────────────────────────────────────
 {
 slug: "what-is-an-abn",
 title: "What Is an ABN, and Do You Need One?",
 description:
 "An Australian Business Number makes you a contractor, not an employee: no tax withheld, no super paid for you. When that is legitimate and when it is not.",
 category: "ABN",
 date: "16 September 2024",
 readTime: 6,
 body: `
An ABN is an eleven digit identifier for people who invoice for their work rather than being paid a wage. Most working holiday makers on a payroll do not need one. You need it if a business pays you against an invoice, and whether that is genuinely your situation is decided by how the work runs.

## What actually decides whether you need one?

The substance of the arrangement, not the label on it. An employee is paid a wage, has PAYG tax withheld by the employer, and has superannuation paid on top. A contractor invoices for a result, has nothing withheld, carries their own insurance and generally supplies their own equipment.

That distinction is a legal test rather than a choice either party makes. If a business tells you to get an ABN for a job where they set your roster, supervise your work, provide the tools and pay you by the hour, the arrangement is very likely employment regardless of what the paperwork says, and the [employee versus contractor test](/blog/employee-vs-contractor-australia) is what settles it.

## Why do so many backpackers end up with one?

Because several jobs most available to working holiday makers are genuinely contracting. Delivery and rideshare platforms engage riders and drivers as contractors, piece rate harvest work is often contracted through labour hire, and freelance trade, photography and content work is contracting by nature.

There is a second, less honest reason. Some employers push an ABN onto ordinary employment because it removes their obligation to pay superannuation, workers compensation and award rates. The saving is theirs and the cost is yours, and it is the most common way a working holiday maker loses money without noticing.

## What happens if you invoice without one?

The business is required to withhold 47% from the payment before it reaches you. That is the no ABN withholding rule, and quoting a valid [ABN](/abn) on every invoice is what avoids it.

The withheld amount is credited against your tax when you lodge your return, in the same way over withheld PAYG is. What you lose is access to almost half of that payment until the return is processed.

## What changes about your tax once you have one?

Nothing is withheld for you, and that is the whole difference. On wages your employer takes tax out before you see the money. On ABN income the full invoice lands in your account and the tax is still owed, assessed at the end of the year when you lodge.

The working holiday maker rate of 15% on the first $45,000 applies to ABN income in the same way it applies to wages, so the amount is not the surprise. The timing is. Someone who earned $20,000 through an ABN and set nothing aside has a real bill at lodgement rather than a refund.

## What can you claim against ABN income that you could not claim on wages?

Genuine business expenses, and this is the compensation for the obligations. Fuel and vehicle running costs where a logbook supports them, phone and data apportioned to business use, equipment, insurance, platform commissions and bank fees all reduce the income the tax is calculated on.

Deductions are also where ABN returns go wrong most often, because the substantiation rules are stricter than most people assume. A logbook is not a receipt, apportionment has to be defensible, and a car claim without records is the most commonly disallowed item in this category.

## When does GST enter the picture?

Once your turnover reaches $75,000 in a year, registration is compulsory, and below that it is optional for most work. Rideshare driving requires GST registration from the first dollar, with no threshold at all.

Registration is not free of consequence. It brings a Business Activity Statement obligation, usually quarterly, and that continues until you cancel it. Registering when you did not have to is a common and avoidable way to acquire paperwork you will still owe after you have left the country.

## Does an ABN earn its place in your year?

Whether you need an ABN at all is usually clear once you look at the arrangement rather than the offer. What it costs you, and what it is worth, depends on facts specific to your year.

- Whether the work is genuinely contracting or misclassified employment, which decides whether you are also owed super and award rates.
- Whether you have ABN income and wages in the same year, since they combine into one assessment and the wage withholding often covers the ABN tax.
- Whether the platform you work through requires GST registration regardless of turnover.
- How much you set aside as you went, because nothing was withheld for you.
- Whether your deductions are substantiated to the standard the ATO actually applies.
- Whether you cancelled the ABN before leaving, since an open registration keeps its obligations.

If you have both kinds of income in one year, the combined position is worked out in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know roughly what each side of it came to.
 `,
 }, {
 slug: "how-to-register-for-an-abn",
 title: "How to Register an ABN, and When Not To",
 description:
 "Registration is free. Who is entitled to an ABN, why sham contracting is the risk, the $75,000 GST threshold, the 47% withholding rule, and when to cancel.",
 category: "ABN",
 date: "22 September 2024",
 readTime: 5,
 body: `
Registration on the Australian Business Register carries no government fee, and most applications return a number quickly. What decides whether yours does is entitlement: an ABN is only issued to someone genuinely carrying on an enterprise, not to anyone who has simply been told to get one. We handle [ABN registration](/abn) as part of getting that answer right.

## Who is actually entitled to an ABN?

Someone carrying on an enterprise in Australia: running a business activity on their own account rather than under someone else's direction. A delivery rider choosing their own hours, a freelance designer with several clients and a harvest contractor invoicing a labour hire company all qualify. An employee does not, no matter what the employer prefers.

This question decides everything else about the application, and it is the one most commonly answered without thought. If a business is telling you to get an ABN before your first shift on a job that is rostered, supervised and equipped by them, you are not carrying on an enterprise, and the arrangement is likely to be sham contracting rather than contracting. Registering anyway does not make it legal and does not stop the [super and award entitlements](/blog/employee-vs-contractor-australia) from being owed to you.

## What does an application turn on?

A [Tax File Number](/tfn), first of all. An ABN application not matched to a TFN is far more likely to go into manual review, and that is where the delays live.

The rest turns on your identity details matching your passport exactly, and on a description of the enterprise the register can actually classify. Applications are usually held up for one of those two reasons rather than for anything to do with the work itself.

## Where does GST come into it?

At $75,000 of turnover, which is the threshold above which [GST](/blog/gst-and-abn-for-working-holiday-makers) registration becomes compulsory. Almost no working holiday maker reaches it, and staying below it keeps GST and the quarterly Business Activity Statements out of your life entirely.

A GST registration taken on by mistake is not harmless. It creates a reporting obligation every quarter whether or not there is income to report, and it has to be cancelled deliberately.

## What does the ABN change once you have it?

It changes who is responsible for your tax, completely. Nothing is withheld from an invoice, so the whole liability sits with you until the [tax return](/tax-return) is lodged, at the working holiday maker rate of 15% on the first $45,000 of combined income. Genuine business expenses are deductible, which is the compensation for carrying the risk.

It also changes what your invoices have to carry. A payer receiving an invoice with no valid ABN on it is required to withhold 47% of the payment, and the excess is dealt with when your return is assessed. Quoting the number correctly on every invoice avoids the whole situation.

- Your name, and any business name you trade under
- Your ABN, quoted in full
- The date of issue and a description of the work done
- The amount payable and your contact details

## When should you cancel it?

When the enterprise ends, which for most working holiday makers is when they stop contracting rather than when they leave the country. An ABN left active after you go keeps you on the register as a business, and any GST registration attached to it keeps generating Business Activity Statement obligations whether or not income exists.

Cancelling too early can cause problems if a final invoice is still outstanding, and cancelling late is untidy rather than expensive. Our guide to [cancelling an ABN before leaving Australia](/blog/how-to-cancel-your-abn) sets out what has to be settled first.
`,
 }, {
 slug: "farm-work-and-abns",
 title: "Farm Work on an ABN: Legit or Wage Theft?",
 description:
 "Some farms push workers onto ABNs to dodge super and minimum rates. When contracting is legal, when it is sham, and how to protect your pay and 88 days.",
 category: "ABN",
 date: "30 September 2024",
 readTime: 6,
 body: `
You need an ABN for farm work only if the farm or labour hire company is engaging you as a contractor. If they are putting you on payroll, your [TFN](/tfn) is all you need. Ask which it is before the first shift, because the answer sets your tax, your super and your entitlements.

## Why does farm work involve an ABN so often?

Most large farms do not hire pickers and packers directly. They contract a labour hire company, and some of those companies ask workers to invoice rather than putting them on payroll. That shifts the tax, the super and the workers compensation exposure onto you.

The arrangement is legal when it is genuine. It stops being legal when the work has every feature of employment, common in horticulture: rostered start times, a supervisor telling you which row to pick, the farm's bins and transport, no ability to work for anyone else that week. Being asked to get an ABN is not itself a warning sign. Being asked to get one for a job that runs exactly like employment is.

- Labour hire contractor: you invoice, nothing is withheld, no super is paid, an [ABN](/abn) is required
- Direct farm employment: payroll, 15% withheld, 12% super, award rates apply, no ABN needed

## What decides whether piece rates make you a contractor?

Nothing about piece rates decides it. Piece rate is a way of calculating pay and exists in both employment and contracting, so being paid per bin tells you little about your legal status.

Under the Horticulture Award, pieceworkers who are employees are entitled to a guaranteed minimum floor for the hours worked, so a slow day in bad fruit still has to be topped up to the award rate. A contractor on a piece rate has no floor and earns what the bins earn. That difference is usually the largest single sum at stake on a harvest job.

- Employee on piece rates: award floor applies, super paid, payslips issued
- Contractor on piece rates: no floor, no super, invoices instead of payslips
- Same fruit, same bin, same shed: the paperwork is the only difference

## When should you be suspicious of an ABN arrangement?

When the features of employment are all present and the paperwork says otherwise. If your hours are dictated, your equipment is supplied, you work for that business and no one else, and a colleague doing the identical job is on payroll with super, the label is doing work the facts do not support.

That is sham contracting, prohibited under the Fair Work Act. The missing 12% super, the missing award floor and the missing workers compensation cover all sit with you until someone challenges it. The Fair Work Ombudsman takes these complaints without charge, and being on a 417 or 462 visa does not reduce your standing to make one.

- Vagueness about whether you are employed or contracted
- Pressure to register an ABN quickly, before anything is explained
- Identical work to payroll staff who receive super and leave
- Your hours, tools and location all controlled by the business

## What are your tax obligations on ABN farm income?

Nothing is withheld, so the whole tax bill arrives at once at the end of the financial year. The working holiday maker rate of 15% on the first $45,000 applies to your total income, ABN and wages combined, so a season of harvest contracting still sits inside that bracket for most people.

What changes is who holds the money meanwhile. On payroll the ATO already has your 15%; on an ABN you do, and it needs to still be there in October. Set aside a fixed share of every payment as it lands; the alternative is finding the money after the season and after the road trip. Genuine business expenses reduce the figure, which is the one advantage the ABN side carries.

- All ABN income is declared on the same [tax return](/tax-return) as any wages
- No PAYG is withheld, so nothing is prepaid against the bill
- Labour hire clients generally pay no super on contractor invoices
- An invoice without a valid ABN gets 47% withheld by the payer

## Does ABN farm work count towards the second year visa?

It can, because specified work is defined by what the work is and where it is done, not by how you were paid. Genuine harvest or agricultural contracting in an eligible postcode counts on the same terms as payroll work in the same shed.

The evidence burden changes, and against you. Payroll work generates payslips tying dates, hours and locations together. ABN work generates only what you keep: invoices, bank records and employer references placing you in the right postcode on the right dates. Where a sham arrangement is later unpicked, the visa evidence and the pay claim rest on the same facts. If a farm will only engage you on an ABN, invoice properly, bank every payment rather than taking cash, and keep a dated work log with locations.
`,
 }, {
 slug: "employee-vs-contractor-australia",
 title:
 "Employee or Contractor? What Decides It",
 description:
 "The label on your contract does not decide it - control, tools and risk do. How the test works, and what sham contracting costs working holiday makers.",
 category: "ABN",
 date: "4 October 2024",
 readTime: 6,
 body: `
Whether you are an employee or a contractor in Australia is decided by how the work actually runs, not by the word on your invoice. Employees have tax withheld, receive 12% super and accrue leave. Contractors invoice, set aside their own tax, and get none of that. Being called a contractor does not make you one.

## What actually decides whether you are an employee or a contractor?

The substance of the arrangement. The ATO and the Fair Work Ombudsman both weigh the same handful of factors rather than applying one clean test. Control is the heaviest: if the business decides when you start, where you go and how the job is done, that points hard at employment whatever your paperwork says.

Six factors carry most of the weight, and they are all things you already know about your own job.

- Control: rostered by them, or scheduled by you
- Tools: their ute, their gear, their software, or yours
- Delegation: could you lawfully send a substitute
- Risk: can a job cost you money, or only pay you
- Exclusivity: one business all year, or several clients
- Integration: their uniform and their name badge, or your own invoice

No single factor settles it. When most of them point at the business, that points to employee, whatever the [ABN](/abn) on the invoice says.

## How do you tell which side your own job falls on?

Look at the payment method first. An employee is paid a rate for time, has PAYG withheld before the money lands, and can see [super](/superannuation) on the payslip. A contractor is paid against an invoice for an agreed piece of work, receives the gross amount, and is responsible for the tax afterwards.

Then look at what happens when you are sick or when the work runs out. Employees accrue paid leave or, if casual, a loading in place of it, and they are covered by workers compensation. Contractors carry both risks themselves, which is the trade for charging more per hour.

- Paid hourly or daily, tax already taken out: employee
- Paid per bin, per job or per invoice, nothing withheld: usually contractor
- Told when to arrive and what to wear: employee indicators
- Free to accept or decline work and to work elsewhere the same week: contractor indicators

## What does the classification change in money terms?

Four things at once, three of them worth real money over a working holiday year. An employee receives 12% superannuation on top of wages, accrues leave, is covered by workers compensation, and has the award minimum as a floor under their rate. A contractor gets none of those and must fund their own tax bill out of what lands in the account.

The fourth is withholding. An employee on a [TFN](/tfn) with a completed declaration is withheld at 15% as a working holiday maker. A contractor who invoices without quoting a valid ABN has 47% withheld by the payer, a rule about the missing number rather than about the person, and the excess is dealt with when the return is assessed.

- Super: 12% of ordinary time earnings for employees, generally nothing for contractors
- Leave: accrued or loaded for employees, none for contractors
- Rate floor: award minimums apply to employees only
- Injury: workers compensation for employees, own insurance for contractors

## What is sham contracting, and how would you know?

A business dressing an employment relationship up as contracting so it does not have to pay super, leave or award rates. It is illegal under the Fair Work Act, and the giveaway is always the same: your day looks identical to that of a colleague on payroll, but you were told to get an ABN before your first shift.

The common backpacker version is a labour hire arrangement where the worker is rostered, supervised, supplied with all the equipment and paid per hour, yet asked to invoice. That is not contracting in any sense the law recognises, and signing something agreeing to it does not change the analysis.

If you were genuinely an employee, unpaid super and the gap between what you were paid and the award rate may both be recoverable, and the Fair Work Ombudsman handles the complaint free. If the arrangement was genuine contracting, the position is dealt with through deductions against your ABN income. Visa status does not weaken either claim.

## Can you be an employee and a contractor at the same time?

Yes, and a lot of working holiday makers are. Employment at a cafe on a TFN and delivery work on an ABN is an ordinary combination, and each stream keeps its own rules: 15% withheld on the wages, nothing withheld on the invoices, super on the wages only.

Both streams land on one [tax return](/tax-return) at the end of the financial year. The withholding already taken from your wages is credited against the total bill, and a year with heavy ABN income and light wages is where a refund can turn into an amount owing. Worth checking before June rather than after October.
`,
 }, {
 slug: "can-you-have-tfn-and-abn",
 title:
 "Can you have a TFN and an ABN at the same time? Yes",
 description:
 "Yes, you can hold both. The TFN covers wages with tax withheld; the ABN covers contracting with nothing withheld, so that tax is due when you lodge.",
 seoTitle: "Can you have a TFN and an ABN at once? Yes, with one catch",
 category: "ABN",
 date: "20 July 2026",
 readTime: 5,
 body: `
Yes. A working holiday maker can hold a Tax File Number and an Australian Business Number at the same time, and you need the TFN first because it is required to register an [ABN](/abn). The TFN covers employment income. The ABN covers contracting income. Both are declared on the same tax return.

This guide is about holding both at once. If you are still working out which one a job needs, start with the [difference between TFN and ABN](/blog/tfn-vs-abn-difference).

## What does each number actually do?

They are not interchangeable. The TFN is your identity with the ATO as a person: it sits behind your employment, your tax return, your superannuation account and your bank interest. The ABN is your identity as a business: it goes on invoices you issue, and tells a payer they are buying a service rather than employing someone.

The practical difference matters more than everything else here. Employment income arrives already taxed, because your employer withholds. ABN income arrives whole, and the tax on it is settled once, at assessment.

## Is holding both normal on a working holiday visa?

Completely. A common year is ten months of hospitality or farm work through payroll under a TFN, with delivery riding, a stall, some photography or a few weeks of contracted labour invoiced under an ABN alongside it.

The seasons make it more common than people expect. A summer in Cairns waiting tables, an Uber Eats or DoorDash account on weekends, and a stretch of vintage work in the Barossa billed as a contractor is three income shapes in one financial year, all on one return.

## What is the trap that catches people in October?

Nothing is withheld from ABN income during the year, so the money feels like it is all yours, and the assessment comes afterwards. The working holiday maker rates apply across your combined income, so ABN earnings stack on top of your wages rather than being taxed in isolation.

The habit that prevents it is putting aside roughly 15 to 20 cents of every ABN dollar as it comes in. The people with a problem are the ones who had a good three months and treated the gross as income. Both halves go on one [working holiday tax return](/tax-return), and the ABN half has nothing withheld against it, so set money aside each time you invoice.

## When should you not be using an ABN?

When the work is employment. Being paid through an ABN for what is really a job strips out three things at once: no tax is withheld, no superannuation is paid for you, and no leave entitlements accrue.

The pattern to watch for is being moved from payroll onto invoicing for the same job, hours, supervisor and roster. That is sham contracting and it is unlawful. If the job looks like employment, it legally is employment regardless of the paperwork, and the [employee versus contractor distinction](/blog/employee-vs-contractor-australia) is decided on how the work is actually done.

## What are you responsible for that an employee is not?

Your own records. Your employer reports your wages to the ATO automatically through payroll, so employment income turns up on your return whether you track it or not. ABN income does not.

So keep a copy of every invoice you issue and every payment received, plus the expense records supporting what you claim against it. Watch the GST threshold too: registration becomes compulsory once turnover reaches $75,000 in a year, and from the first dollar for rideshare driving.

## What does your ABN half do to the bill?

Holding both numbers is straightforward. What varies is what the ABN half does to your assessment.

- Whether your ABN work is genuinely contracting or employment wearing a different hat. This changes your super, your leave and who carries the tax.
- Whether most of your ABN income comes from a single payer. Where 80% or more comes from one source, personal services income rules can restrict what you deduct against it.
- Whether you crossed the GST threshold, or are driving rideshare, where GST applies from the first fare.
- Whether you set money aside during the year. This is the difference between an October assessment being routine and being a shock.
- Whether you had a period on wages before your TFN was on file, which puts part of the year at 45%.

Both income streams settle in the same [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know roughly what each came to.
 `,
 }, {
 slug: "how-to-cancel-your-abn",
 title: "How to Cancel an ABN Before You Fly Home",
 description:
 "An open ABN after you fly home keeps ATO lodgement expectations running. When cancellation should take effect, what to settle first, and what to lodge.",
 category: "ABN",
 date: "9 October 2024",
 readTime: 4,
 body: `
An [ABN](/abn) should be cancelled when you stop contracting, not when you happen to remember. There is no fee, and cancellation takes effect from the date you specify rather than the date it is filed. Leaving one open after you fly home creates lodgement expectations you will still be answering from another country.

## Why does an open ABN matter after you have gone?

Because the ABN is a registration with ongoing obligations, not a certificate you earned. While it is active the ATO can reasonably expect activity statements and returns, and where you registered for GST it will expect a BAS whether or not you invoiced anything.

Correspondence keeps going to whatever Australian address is on file, which for most backpackers is a hostel they left months earlier. Nothing gets forwarded, notices go unanswered, and the first you hear is when something has escalated. An open registration with an untended address is also a soft target for identity fraud.

## What has to be finished before you cancel?

Everything that runs through the ABN, because cancelling closes the registration rather than the obligations attached to it.

- Issue every outstanding invoice while the ABN is still active
- Collect payments you are owed, since chasing them from overseas is harder
- Lodge any BAS due if you were registered for GST, and cancel that registration separately
- Note the ABN income earned to the cancellation date, which still belongs in your return
- Keep the records for the deductions you intend to claim against that income

The GST registration is the one people forget. Cancelling the ABN does not automatically end it in every case, and a live GST registration generates quarterly obligations of its own.

## Does cancelling remove your obligation to lodge?

No. Cancelling ends the registration going forward. Income already earned under it remains assessable, and the return covering that year still has to be lodged.

If the financial year has not ended when you leave, the return is usually lodged after 1 July from wherever you are. Our guide to [lodging from overseas](/blog/how-to-lodge-tax-return-from-overseas) covers what that needs, and the short answer is an open Australian bank account. Someone leaving permanently can sometimes lodge before 30 June instead, as the guide to [an early return before departure](/blog/early-tax-return-leaving-australia) explains.

## Which date should you choose?

The date you actually stopped the activity, not today's date. A backpacker who last invoiced in March and remembers to cancel in June should cancel effective March.

The date defines the period the ATO regards you as carrying on an enterprise. A cancellation dated later than the real end suggests months of activity that produced no income and no reporting, which is the pattern that generates queries.

## Should you keep it open in case you come back?

Almost never. The number stays associated with you and can be reactivated if you return and start contracting again, so keeping it live buys nothing and costs continuing lodgement expectations for years in which you were not in the country.

## Is there anything else to close on the way out?

Superannuation, though it works the other way around. ABN contracting generally produces no super, because contractors are not paid the guarantee, but most working holiday makers also had employment alongside it and that employment did.

Super can only be claimed once your visa has ceased and you have left Australia. The ATO says a DASP is generally paid within 28 days of a complete application, and the taxable component is taxed at 65% for working holiday makers. Our [superannuation guide](/superannuation) covers the timing, which cannot be undone once claimed.

## Settle these before the cancellation date.

What needs to happen around a cancellation depends on how the ABN was used.

- Whether you were registered for GST, which is a separate registration with its own final BAS.
- Whether invoices are still outstanding, since collecting after cancellation is harder.
- What date the activity genuinely ended, which is the date to use rather than today's.
- Whether the financial year has closed, which decides when the final return can be lodged.
- Whether you also had employment income, since that is where the super and the withholding sit.
- Whether you intend to return to Australia, though this is rarely a reason to leave it open.

The final ABN income is declared in the [working holiday tax return](/tax-return) alongside any wages, and you can [estimate your tax refund](/calculator) to see whether that year lands as a refund or an amount owing.
 `,
 }, {
 slug: "gst-and-abn-for-working-holiday-makers",
 title: "GST With an ABN: Only Past $75,000",
 description:
 "Most working holiday makers with an ABN earn under the $75,000 GST threshold and should not register - except rideshare drivers, who must from dollar one.",
 category: "ABN",
 date: "10 October 2024",
 readTime: 5,
 body: `
Most working holiday makers with an [ABN](/abn) never touch GST. Registration is compulsory once turnover reaches $75,000 in a twelve month period, and almost nobody on a 417 or 462 visa gets near that. Drivers carrying passengers for money must register from the first dollar, whatever they earn.

## What does the $75,000 threshold actually measure?

Gross turnover from your business activities over any rolling twelve month period, before expenses. Not profit, and not wages you earn on a [TFN](/tfn), so a year of cafe work plus a little freelance income sits nowhere near the threshold even if the combined total looks large.

The test is forward looking as well as backward looking. You must register within 21 days of the month your turnover reaches $75,000, or of the point you reasonably expect it to. That expectation rarely arises on a working holiday, because the visa limits how long the enterprise can run.

- Under $75,000 of ABN turnover: registration is optional for most activities
- $75,000 or more: registration is compulsory within 21 days
- Employment income paid through payroll never counts towards the threshold
- Turnover is gross, so fuel, tools and platform fees do not reduce it

## Who has to register regardless of income?

Anyone providing taxi travel or ride sourcing, meaning carrying paying passengers. Drive for Uber, DiDi, Ola or a taxi network and the threshold does not apply: GST registration is required from your first trip, even if you only ever do a handful.

Food delivery is the distinction people get wrong. Delivering meals for Uber Eats, DoorDash or Menulog is not passenger transport, so the ordinary $75,000 threshold applies and most delivery riders never need to register. Drivers doing both are caught by the passenger side and must register for everything.

- Passengers for a fare: GST from the first dollar, no threshold
- Food and parcel delivery only: ordinary $75,000 threshold applies
- Both in the same ABN: registration required, covering all of it

## What happens if you are not registered?

Nothing, which is the point. You issue invoices without GST, lodge no Business Activity Statements, and your only obligation under the ABN is to declare the income on your [tax return](/tax-return) and pay income tax on the net figure at the working holiday maker rate of 15% on the first $45,000.

Staying unregistered below the threshold is compliant rather than a shortcut, and it is the ordinary position for most backpackers with an ABN.

## What does registering actually commit you to?

Collecting 10% on top of what you charge, holding it, and handing it to the ATO on a schedule. The 10% is never your money, and it is reported on a Business Activity Statement quarterly for most people.

Registration also lets you claim back the GST you paid on genuine business purchases. Where the costs are fuel and a phone plan, those credits rarely justify four BAS lodgements a year and the record keeping behind them.

- Charge 10% on invoices and keep it separate from your own money
- Lodge a BAS quarterly, or monthly at higher turnover
- Claim credits for GST paid on genuine business expenses
- Cancel the registration when the enterprise ends, and lodge any outstanding BAS

## What is the most common GST mistake backpackers make?

Registering when there was no need to. People tick the GST box during an ABN application because it looks professional, and the obligation is real: BAS lodgements start immediately and keep falling due whether or not any income arrives.

The registration can be cancelled from the date the enterprise ended, or from the date it began where it should never have existed, and outstanding statements are lodged as nil where that is true. How much work it takes depends on how long it ran unnoticed, because each quarter that passed is a separate lodgement.
`,
 },

 // ─── TAX RETURN ────────────────────────────────────────────────────────────
 {
 slug: "how-does-australian-tax-year-work",
 title: "The Australian Tax Year: 1 July to 30 June",
 description:
 "How the financial year works, when to lodge, what happens if you arrive or leave mid-year, and the deadlines working holiday makers actually need.",
 category: "Tax Return",
 date: "23 October 2024",
 readTime: 6,
 body: `
The Australian financial year runs 1 July to 30 June, not January to December. You lodge a return for any year in which you earned Australian income, and the self lodgement deadline is 31 October. A return lodged under a registered tax agent can get longer, but only if you were on the agent's client list before 31 October. Which year a pay belongs to is decided by when it was paid.

## Why does the July to June boundary matter so much to a backpacker?

A twelve month working holiday almost never sits inside one financial year. Arrive in September, work to the following August, and you have two part years rather than one full one.

Each is assessed on its own. With a registered working holiday maker employer and your TFN on file, withholding is a flat 15% of each pay up to $45,000 for the year, so a part year is not over withheld on that rate alone. What creates a gap is a period at a different rate, such as weeks at 45% before your TFN was on file, and each year's assessment can come out differently.

## Which year does a given pay belong to?

The year it was paid to you, not the year you did the work. A shift worked in late June and paid in early July falls into the new financial year.

- Arrived October 2025 and worked to April 2026: all of it falls in the 2025-26 year, which ended 30 June 2026.
- Started work in March 2026 and continued past July: March to June 2026 sits in 2025-26, and July onwards sits in 2026-27.

This is why your income statement, not your recollection, is the authority. It is compiled from what the employer reported to the ATO by payment date.

## What actually happens at the end of the year?

The ATO compares the tax you should have paid on the year's total income against what your employers withheld. Withheld more than owed, the difference is refunded. Less, it is payable.

For many working holiday makers the balance can fall on the refund side, though it depends on the year: weeks before your TFN reached the employer were withheld at 45% instead of 15%, an employer may have used the wrong rate, and deductions and the Medicare levy exemption are only applied at assessment.

## When is the deadline, and what moves it?

31 October following the end of the financial year, for anyone lodging their own return. The 2025-26 year ended 30 June 2026, so its self lodgement deadline was 31 October 2026 (now passed, though a late return can still be lodged), and the 2026-27 year, which runs 1 July 2026 to 30 June 2027, has a self lodgement deadline of 31 October 2027.

Returns lodged with the ATO under a registered tax agent generally fall under a later concessional date, often well into the following year. A missed October deadline is not the end of the matter, and penalties are not automatic.

## What if you left Australia before the year ended?

You can still lodge, and in some circumstances lodge early. A return can be prepared from anywhere, but a refund is paid into an Australian bank account, so keep that account open until the money clears.

Closing it is the most common self inflicted problem for departed backpackers: a refund that cannot be paid sits with the ATO until an alternative is arranged from overseas. Our guide to [lodging a tax return from overseas](/blog/how-to-lodge-tax-return-from-overseas) covers what changes once you have gone.

## What decides whether you have to lodge at all?

Your taxable income. The ATO says a working holiday maker must lodge if their taxable income for the year was $45,001 or more. If any employer withheld tax, a return is also how you find out whether it was too much, so for working holiday makers with any Australian earnings a return is usually worth lodging.

Below that threshold you may not be required to lodge, and the ATO usually expects a non-lodgment advice instead. A year you earned in and never lodged for does not disappear either. It remains lodgeable, and prior years can often still be lodged.

## Two returns or one?

The dates are fixed. What they mean for your money is not, and most working holiday makers have two returns rather than one.

- Which side of 30 June your first and last pays landed on, which sets how many returns you have.
- Whether any weeks were withheld at a different rate, such as 45% before your TFN reached the employer.
- Whether there was a period before your TFN reached the employer, withheld at 45% rather than 15%.
- Whether you are lodging yourself or under a registered tax agent, which changes the deadline.
- Whether an Australian bank account is still open to receive the refund.
- Whether any earlier year was never lodged, which can often still be lodged.

Both years are worked out in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) for each year separately.
 `,
 }, {
 slug: "backpacker-tax-rate-australia",
 title: "Backpacker tax rate in Australia: 15% to $45,000",
 description:
 "Working holiday makers are generally taxed at 15% on the first $45,000. Brackets above that, how the rate applies to you, and what can lead to a refund.",
 category: "Tax Return",
 date: "27 October 2024",
 readTime: 5,
 body: `
The working holiday maker rate is a flat 15% on the first $45,000 of income each financial year, for both subclass 417 and 462 visas. It is a different basis from the ordinary resident brackets, and how that applies to your year is assessed case by case. Getting that rate applied depends on two things being in place, not one.

## What has to be true before 15% is actually applied?

Three conditions, and most people only know the first. Your TFN has to be with the employer, the Tax File Number Declaration has to record you as a working holiday maker, and the employer has to be registered with the ATO as an employer of working holiday makers.

If the TFN is missing, withholding is 45%. If the employer is not registered, withholding is 30% even with a correct TFN and declaration, because an unregistered employer must apply foreign resident rates. That third condition is invisible from your side and is the commonest cause of a payslip that looks wrong.

## What does the rate look like in practice?

A flat rate is the same every week, with no step and no tapering across the first $45,000.

- $1,000 a week: $150 withheld, $850 to you
- $1,500 a week: $225 withheld, $1,275 to you
- $2,000 a week: $300 withheld, $1,700 to you

Above $45,000 the rate rises: 30% from $45,001 to $135,000, 37% to $190,000, and 45% above that. Few working holiday makers reach those levels, though mining and specialist trades occasionally do.

## How does it compare with other rates?

Different rates apply to different categories of taxpayer, and which one applies to you depends on the individual facts of your year. It is assessed case by case and the ATO makes the final decision. Our team reviews it as part of preparing the return, and a registered tax agent signs it off before it is lodged. Our guide to [tax residency for working holiday makers](/blog/tax-residency-working-holiday-makers) covers why it is not a box you can tick yourself.

## Why can a year with 15% withholding still change at assessment?

Because withholding and the final assessment are separate steps. A year can include a period where something other than 15% applied, and that period is where an adjustment can come from.

- Weeks before the TFN reached the employer, withheld at 45% rather than 15%
- Work for an employer who was not registered as a working holiday maker employer, withheld at 30%
- A declaration completed as foreign resident rather than working holiday maker
- Deductions for work related expenses that are only applied at assessment
- The 2% Medicare levy, which is only removed if the exemption is claimed

Take a year in which someone earned $37,000 but spent three weeks with a new employer before the TFN was recorded. The tax properly payable at 15% is $5,550. If $4,000 of that income was withheld at 45% rather than 15%, $1,200 more was taken than was owed, and that is the amount in question at assessment, before any deduction.

## What is not true about the backpacker tax?

Four claims circulate in hostels and backpacker groups, and each costs somebody money every year. Each contains a grain of truth, which is what makes them convincing.

- That backpackers pay no tax at all. Australian earnings are taxed, and how the rates apply to your year is assessed case by case.
- That correct withholding means there is nothing to claim. Deductions, the Medicare levy exemption and any wrongly withheld period all remain.
- That the rate varies by state. It does not. It is federal, though payroll errors are commoner with smaller regional employers.
- That leaving Australia ends the matter. A return can be lodged from overseas and the refund paid to an Australian account.

## Does the Medicare levy sit on top of the 15%?

Generally not, but only if it is claimed. The 2% levy applies to Australian residents for tax purposes, foreign residents pay none, and a resident not entitled to Medicare can claim an exemption. Which applies to you depends on your individual circumstances. It is not removed automatically.

Any exemption has to be claimed on the return with the right supporting evidence. We handle that as part of preparing it, and the outcome is assessed case by case.

## What happens when your stay crosses two financial years?

You get two assessments rather than one, each assessed on the income paid in that year. A stay that feels like twelve months of steady work produces two part year returns.

With a registered working holiday maker employer and your TFN on file, withholding is a flat 15% of each pay up to $45,000 for the year, so a short stay or part year is not over withheld on that rate alone. What creates a gap is a period at a different rate: weeks at 45% before your TFN was on file, or 30% from an employer not registered for working holiday makers. Any correction happens at assessment, in each year.

## Does ABN income get taxed at the same rate?

Yes, and the identical rate is what catches people out. Income invoiced under an ABN is assessed at the same 15% on the first $45,000, but nothing was withheld along the way, so the tax arrives as an amount payable.

Someone with both wages and ABN income usually finds the PAYG withheld from the wages absorbs the tax owed on the ABN side. Someone with ABN income only, who set nothing aside, gets a bill in a year they expected a refund.

## The rate is fixed. Your refund is not.

The rate is fixed by statute. What you actually paid, and what comes back, is decided by facts specific to your year, and your payslips already show most of them.

- Whether every employer had your TFN from the first pay, and how long any gap ran.
- Whether each employer was registered with the ATO as a working holiday maker employer.
- How the residency and working holiday maker boxes on each declaration were completed.
- Your Medicare levy position, which is assessed case by case from your circumstances.
- Whether you also had ABN income, which carries no withholding at all.
- Whether any weeks were withheld at a different rate, such as 45% before your TFN reached the employer.

All of it is reconciled in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know what each employer actually withheld.
 `,
 }, {
 slug: "how-to-lodge-tax-return-working-holiday",
 title: "How to lodge your own tax return on myTax as a backpacker",
 description:
 "Lodging it yourself on myTax: when you can lodge, the steps in myGov, the working holiday income item and the Medicare question to answer carefully.",
 category: "Tax Return",
 date: "29 October 2024",
 readTime: 7,
 body: `
An Australian [tax return](/tax-return) covers the year to 30 June and is due by 31 October if you lodge it yourself. You can do it from anywhere in the world. How straightforward it is depends on whether every employer has finalised, and whether you can still prove who you are.

## When can you actually lodge?

Not on 1 July, whatever the hostel says. Employers have until mid July to finalise their payroll reporting, and until then your income statement is marked as not tax ready, meaning the figures can still change.

Lodging before that point is the most common self inflicted error of the season. The return goes in against incomplete data, the employer finalises a week later with a different total, and the assessment has to be amended, which takes far longer than waiting. A return lodged early because you are leaving Australia permanently part way through the year is a different process with [its own rules for leaving before 30 June](/blog/early-tax-return-leaving-australia), including 50 business days of processing.

## What do you actually need to have?

Less than most people assume. Employers lodge income statements directly, so payslips are a cross check rather than a requirement, and a job you have no paperwork for is still in the system.

You supply what the ATO does not already hold.

- Your TFN and identity documents
- An Australian bank account for the refund, the item people lose first
- Records for any deductions you intend to claim
- Details of your Medicare position, so we can review the levy as part of your return
- Details of any ABN or contractor income, which is not pre-filled

## How do you lodge it yourself on myGov?

Through myTax, the ATO's online return, once your myGov account is linked to the ATO. The steps run in this order.

1. Link myGov to the Australian Taxation Office as a service, which needs your TFN and an identity check.
2. Check that every income statement shows as tax ready before you start.
3. Open your return in ATO online services and confirm the pre-filled income against the jobs you remember.
4. Answer the residency questions, including that you held a 417 or 462 visa during the year.
5. Complete the Medicare levy section, which needs a Medicare Entitlement Statement if you are claiming the exemption.
6. Add any ABN income and the deductions you can substantiate, then review and submit.

The notice of assessment then arrives in your myGov inbox. If you would rather not do it yourself, this is how we prepare a [working holiday visa tax return](/tax-return), reviewed and signed off by a registered tax agent before it is lodged with the ATO.

## What decides whether you can lodge from overseas?

Access rather than eligibility. No rule prevents a return being lodged after you have left, and doing it from your parents' kitchen in Manchester is entirely ordinary. The obstacles are identity verification and the refund destination.

Establishing or recovering a myGov identity from overseas is materially harder than doing it here, because the verification routes are built around Australian documents and an Australian mobile number. A closed bank account is the other: the refund has to land somewhere, and reopening an account from abroad is slow. Both are cheap to prepare in your last month in Australia and expensive to fix afterwards. Lodging through a registered agent removes the identity half of the problem, not the bank account half.

## What happens after it goes in?

The ATO compares what was withheld across the year against what you actually owed and issues a notice of assessment. A return lodged online usually takes about 12 business days to process, and longer through the July to September peak when most of the country lodges at once.

Two things extend that. A return that does not match the pre-filled data goes to manual review, which is not an audit but does add time. And a return lodged with a bank account the ATO cannot pay into simply stops, so a wrong BSB delays more than a complicated deduction.

## What changes if you had several employers?

The reconciliation becomes the work, rather than the lodgement. Every employer who reported income against your TFN has to appear, and the risk is not declaring too much but forgetting one and having the ATO adjust your assessment afterwards.

It is also where the money usually is. Over-withholding concentrates at one employer rather than spreading evenly, so the job that ran at 45% for six weeks or the labour hire company that was never registered decides the size of any refund. Working out which employer sat meaningfully above 15% is the part worth doing carefully.

## What if you also had ABN income?

Two income types on one return, and only one of them had tax taken out along the way. Wages arrive with PAYG already withheld and pre-filled; [ABN](/abn) income arrives with nothing withheld and nothing pre-filled, so it has to be declared from your own records.

That combination is the most likely to produce an amount owing rather than a refund, because the withholding on the wage side was calculated without knowing about the contracting side. Whether it lands as a refund or a bill depends on the ratio between the two and on what deductions the ABN work supports. Work it out before June rather than discovering it in October.
`,
 }, {
 slug: "what-is-payg-payment-summary",
 title:
 "PAYG payment summary: now called an income statement",
 description:
 "The PAYG payment summary was replaced by the income statement your employer reports to the ATO. Where it lives, why finalisation matters, when to lodge.",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 5,
 body: `
The PAYG payment summary no longer exists as a paper document. It was replaced by the income statement, which reports your total wages and total tax withheld for each employer across a financial year. It sits in ATO systems rather than with your employer, and it is what a return is built from.

## What is the difference between PAYG withholding and a payment summary?

They are the ongoing process and the year end record of it. PAYG withholding is the system: your employer takes tax out of each pay and sends it to the ATO on your behalf, every pay cycle, all year.

The income statement, formerly the PAYG payment summary and before that the group certificate, is the annual total. One employer, one financial year, one statement showing gross wages and total tax withheld. The names are historical, and Australians still say group certificate out of habit.

## Where does an income statement actually live?

In ATO systems, populated directly by your employer's payroll software under single touch payroll. Your employer hands you nothing, there is nothing to collect on your last shift, and no paper version to lose.

That is a genuine improvement for a backpacker: the record survives you leaving the country, losing touch with an employer, or never having set up an online account. A tax agent can retrieve every income statement across every employer directly, which is the standard route for anyone lodging from the United Kingdom, Germany or Japan after going home, and it routinely surfaces an employer the person had forgotten.

## Why does the finalisation date decide when you can lodge?

Because an income statement is not usable until the employer marks it finalised, and until then it is flagged as not tax ready. Employers must finalise by 14 July, and most do so in the first two weeks of July.

Lodging before finalisation is the most common self inflicted problem in July. The return goes in against incomplete figures, the employer finalises afterwards with different numbers, and one lodgement becomes a lodgement plus an amendment. Waiting until late July or early August avoids it, and there is no advantage to being first.

## What if an employer never finalised?

It happens, and it clusters where you would expect: single site operators, small farms and packing sheds running casual payroll through a season, and venues where one person does the books around everything else. Past 14 July, an income statement still showing as not tax ready means the employer has missed its deadline.

Your obligation does not disappear because theirs was not met. The income is still declarable, and the way through is to reconstruct it from your own evidence: payslips, bank deposits showing the wages landing, and rosters. That is the strongest argument for keeping payslips in one folder as they arrive.

## What should you check before your return goes in?

Whether every employer you worked for is actually on the list, and whether the figures match what you were paid. The ATO's data is usually accurate and not always accurate, and a discrepancy is far cheaper to resolve before lodgement than after.

Two failures are worth looking for. A missing employer, which is the finalisation problem above. And a withholding percentage that does not match what you expect: an employer running at 45% because your TFN never reached them, or at foreign resident rates because they are not registered as a working holiday maker employer, both show up here as a percentage that is not 15%, and both can mean more tax was withheld by that one employer than the year ended up needing.

## Is your income statement ready to lodge from?

An income statement is generated for you rather than by you, so what varies is whether it is complete and whether it is finalised.

- How many employers you had, since each one finalises separately and one late employer holds up the whole return.
- Whether any of them has finalised at all, which decides whether you can lodge or need to reconstruct.
- Whether you kept payslips, which is the only thing that resolves a mismatch.
- Whether you have already left Australia, which makes chasing an employer directly much harder and makes the ATO held record the practical source.
- Whether any income was cash or under an ABN, neither of which appears in an income statement at all and both of which are still declarable.

The income statements for every employer are reconciled in one [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) from your own gross and withheld totals before they are finalised.
 `,
 }, {
 slug: "tax-deductions-working-holiday-makers",
 title:
 "Tax deductions for working holiday makers: what to claim",
 description:
 "You can claim protective clothing, tools, travel between work sites, the work share of your phone and tax agent fees. What decides each, and the records.",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 5,
 body: `
Working holiday makers claim work related deductions on the same terms as anyone else in Australia. Uniforms and protective clothing, tools, travel between work sites, the work share of a phone bill and tax agent fees are all deductible. What decides each one is whether the expense earned your income and whether you kept a record.

## What makes an expense deductible at all?

An expense is deductible when you paid for it yourself, it directly relates to earning your income, and you were not reimbursed for it. The third is the one people forget: if the farm handed you the gloves, the gloves are not yours to claim.

The fourth condition is evidence. Without a receipt, a bank line or a diary note, a genuine expense is still not claimable, so the year you can substantiate is usually smaller than the year you actually spent.

## What work clothing can you claim?

Clothing is deductible when it is protective, compulsory and distinctive, or a genuine uniform. Ordinary clothing you happen to wear to work is not. This is where working holiday makers most often overclaim, because hospitality dress codes feel compulsory.

Deductible:

- Uniforms carrying a logo or a distinctive employer design
- Protective clothing such as steel capped boots, hi vis and sun protection for outdoor work
- Safety gear including gloves, hard hats and goggles
- Laundry and dry cleaning of the above

Not deductible:

- Plain black trousers and white shirts for hospitality, even where the venue insists
- Conventional business clothing
- Anything you would wear off shift

## What tools and equipment can you claim?

Tools you buy yourself are deductible, and the size of the purchase decides whether you claim at once or over several years. Knife rolls, chef whites, work boots, trade tools and contracting equipment all qualify where the employer did not supply them.

Items costing $300 or less each are claimed in full in the year you buy them. Larger items are written off over their effective life. Separately, a $1,000 standard deduction starts with the 2026-27 income year, which is covered in our guide to [the $1,000 standard deduction](/blog/1000-dollar-instant-deduction-rule-2026).

## Which travel can you claim, and which is private?

Travel between two different workplaces on the same day is deductible. Travel between home and your regular workplace is private, however long it is and however early the shift starts.

- Deductible: driving from a morning cafe shift to an afternoon catering job
- Deductible: travel to training or a work meeting away from your usual site
- Not deductible: the daily trip from the hostel to the same packing shed

One narrow exception: bulky equipment that cannot be secured at the workplace. It is genuine, and claimed far more often than it applies.

## How much of your phone bill counts?

The work related share of your phone, internet and devices is claimable, but the percentage has to be justified rather than picked. A representative record of work versus private use across the year supports it; a figure that feels about right does not.

A phone used for rosters, shift swaps and contact with a labour hire agency supports a modest percentage easily. A high percentage on a phone that is also the only way you speak to family at home does not, and it invites questions on an otherwise clean return.

## What do working holiday makers claim most often?

The pattern follows the work rather than the visa. Almost everyone has a defensible phone percentage, and the tax agent fee itself is deductible in the following year.

- Sunscreen, sunglasses and a sun hat for outdoor work
- Work boots and hi vis for farm and construction work
- Knife rolls and chef uniforms for kitchen work
- The work share of a phone plan
- Tax agent fees
- Self education directly related to the work you are already doing

## What is never deductible, whatever the circumstances?

Some costs feel work related and are not, and they account for most rejected claims. The visa lets you be in the country rather than earning your income, so neither the application fee nor the flight is deductible.

- Visa application fees and travel to Australia
- Meals, unless you were travelling away from home overnight for work
- Anything your employer reimbursed
- Home to work travel
- Everyday clothing

## What decides the size of your deduction claim?

Three things, and only one of them is what you spent. Your line of work, because the same $400 of boots and gloves is ordinary for a construction labourer and unusual for a receptionist. What you can substantiate. And whether the expense was yours or the employer's.

For 2025-26 and earlier years, a limited concession lets you claim up to $300 of work related expenses in total without receipts (from 2026-27 the ATO's standard deduction takes a different approach). It is not a free $300. You still have to have spent the money and be able to explain the figure, and once your total claim passes $300 the concession falls away for the whole claim, not just the excess.

## Where does this stop being a list and start being a judgement?

It stops being a list when the same expense could sit in two places, which is where most of the value is won or lost. A vehicle used for two jobs, a laptop used for contracting and for booking flights, a phone running a delivery app and a group chat: each is a percentage rather than a yes or no, and no article can make that judgement about your year.

The other judgement is which employer the expenses attach to. A year with four employers, one under an ABN, produces deductions belonging in different parts of the return, and putting them in the wrong place is the most common reason a self lodged return is amended later. That analysis is part of preparing your [tax return](/tax-return), alongside the residency and Medicare questions, which our team reviews for your year.
`,
 }, {
 slug: "do-you-need-to-lodge-tax-return-short-stay",
 title:
 "Worked a Few Months? Check Whether to Lodge",
 description:
 "Worked only a few months? Whether you must lodge depends on your taxable income, not your stay. The rules, and when a non-lodgment advice fits.",
 category: "Tax Return",
 date: "7 November 2024",
 readTime: 5,
 body: `
Often yes. Whether you must lodge depends on how much you earned, not on how long you stayed. Short stays are also worth checking, because a few weeks at 45% before your TFN was on file, or a second job without its own declaration, can leave too much withheld.

## What should you look at?

Wages earned in Australia during a financial year, which runs 1 July to 30 June. Whether you must lodge depends on how much you earned, and the ATO already holds the employer's report of what you were paid, so any tax withheld is worth checking.

- A two week casual role
- A single harvest season
- Brief contracting under an [ABN](/abn)
- Cash work that should have been reported

Cash work is the one people assume falls outside this. It does not. The income is taxable whether or not it was reported, and our guide to [lodging with cash income](/blog/cash-in-hand-tax-return) covers reconstructing a period with no payslips.

## When might you genuinely not need to lodge?

Check the ATO's lodgment rules for your income level. If you do not need to lodge, the ATO may ask for a non-lodgment advice instead, and if tax was withheld, a return is how you recover any over-withholding. If you earned no Australian income at all, there is nothing to lodge.

That is close to the whole list. A non lodgement advice is a formal statement to the ATO, not a decision you make privately by doing nothing.

## Why are short stays worth reviewing?

Because a short stay is when withholding mistakes go unnoticed. With a registered working holiday maker employer and your TFN on file, withholding is a flat 15% of each pay up to $45,000 for the year, so a short stay is not over withheld on that rate alone. What creates a gap is a period at a different rate, such as weeks at 45% before your TFN was on file or 30% from an employer not registered for working holiday makers.

The Medicare levy position and any work deductions are the other two items, and on eight weeks of harvest nobody raises either of them unless the return is actually prepared.

## What else is worth checking on a short stay?

Three items, and the first two are the ones nobody raises on their own. A period before your TFN reached the employer, withheld at 45% instead of 15%, means 30 cents in the dollar more was withheld, and whether that comes back depends on your year. An employer not registered with the ATO as a working holiday maker employer withholds at foreign resident rates, a separate over-withholding.

The third is Medicare. The 2% levy applies to Australian residents for tax purposes, and a resident not entitled to Medicare can claim an exemption; foreign residents pay none. Our team reviews it as part of preparing the return, and our guide to [the Medicare levy](/blog/medicare-levy-working-holiday-makers) explains how it works.

## Can you lodge after you have gone home?

Yes, and most short stay returns are. Income statements come from ATO systems rather than former employers, which matters when the employer was a packing shed you left in March.

The standard deadline is 31 October after the year ends, and returns lodged through a registered agent can have a later deadline, usually into the following May, but only where you were on the agent's list before 31 October. The refund pays into an Australian bank account, so keeping that account open is the practical constraint.

## Should you lodge early if you are leaving mid year?

Possibly. Someone leaving Australia permanently part way through a financial year, with no further Australian income that year apart from interest, dividends or royalties, may be able to lodge before 30 June rather than waiting for the following July.

It is not automatically better. Pre-fill is generally not available, the ATO says payslips are not sufficient because they may not show final payment details, and an early paper return takes 50 business days to process. Whether it fits your departure is covered in [lodging early when you leave mid year](/blog/early-tax-return-leaving-australia).

## What decides whether it is worth doing?

Whether anything was withheld. A short stay with tax withheld is worth reviewing, and one where the employer withheld at 45% throughout is worth reviewing closely.

The years that go unclaimed are the ones people talk themselves out of: three weeks of promotional work, a month of packing, a single season. Those are often the years where withholding was out of step with what was actually earned. If you worked in Australia at all and never lodged, the [tax return](/tax-return) for that year is still open, and there is generally no penalty where a refund was owed rather than a debt. Our guide to [late returns](/blog/late-tax-return-penalty-working-holiday) explains where the penalties actually apply.
`,
 }, {
 slug: "how-to-lodge-tax-return-from-overseas",
 title:
 "Lodging Your Tax Return From Overseas",
 description:
 "You can lodge an Australian return after you fly home, and go back through unlodged years. The refund still goes to an Australian bank account.",
 category: "Tax Return",
 date: "12 November 2024",
 readTime: 6,
 body: `
You do not need to be in Australia to lodge. A return can be prepared and lodged from anywhere, for any year you earned Australian income, including years you have already left. The refund is paid into an Australian bank account, so closing that account on the way to the airport is the mistake to avoid.

## What actually gets harder once you have left?

Access, not the return itself. The tax position is identical whether you are in Brisbane or Berlin. What changes is that every verification step assumes an Australian phone number, an Australian address and an Australian identity document to hand.

A dead Australian SIM cannot receive verification codes, an ATO letter goes to a hostel that has forwarded nothing, and the call centre queue is an hour of hold music at 3am your time. None of these are tax problems, and all of them stop returns being lodged.

## What do you actually need to have?

Less than most people assume. Employers report wages and withholding under Single Touch Payroll, so the income record already sits in ATO systems and lost payslips are rarely the obstacle they feel like.

- Your TFN, which is permanent and does not expire when you leave
- Passport details for identity verification
- An Australian bank account that is still open, for the refund
- Details of any ABN or contractor income, which carries no reporting behind it
- Receipts for any deductions you intend to claim

The bank account is the irreplaceable item. A refund the ATO cannot pay sits assessed but undelivered until an alternative is arranged from overseas, which is slower and more paperwork than leaving the account open a few more months.

## When is the deadline, and does it move?

31 October following the end of the financial year for self lodgement. A return lodged with the ATO under a registered tax agent generally falls under a concessional date well into the following year, so an October deadline missed from another continent is rarely the problem it appears.

If you have not left yet and are leaving for good before 30 June, an early return is sometimes possible, though it goes without pre-fill and takes longer to process; see [lodging before you leave Australia](/blog/early-tax-return-leaving-australia).

## How long does the refund take?

A return lodged online usually takes about 12 business days to process in a straightforward case, and the refund is paid in Australian dollars into an Australian account. A manual check by the ATO makes it considerably slower.

Overseas addresses attract more of those checks, particularly on a first return or where the TFN was recently issued. That is a delay rather than a refusal, and consistent identity details across passport, visa and TFN are what shorten it.

## What about years you never lodged?

They are still lodgeable, and for departed working holiday makers that is often where the most work is. An unlodged year does not expire, and several can be lodged in one pass rather than sequentially.

This matters most for anyone who worked a first year, went home and never dealt with it. Those years often contain a 45% period before the TFN landed and a Medicare levy question, both still open to be reviewed. How far back you can go and what the ATO needs for each year is in our guide to [lodging past years' tax returns](/blog/past-years-tax-returns-working-holiday).

## What if you end up owing rather than receiving?

Three situations turn a return into an amount payable: ABN income with nothing withheld, a declaration form that was answered incorrectly, and a year of mostly cash work.

The ATO then issues a notice with a due date, and a payment plan can be arranged. The debt does not disappear because you have left the country, and it is not something to carry into a future Australian visa application. Our guide to [ATO payment plans](/blog/ato-payment-plan-tax-debt-australia) covers how those work.

## Did you leave the right things in place?

Lodging from overseas is routine. How smooth it is depends on what you left in place, and each point below is harder to arrange after you fly.

- Whether an Australian bank account is still open to receive the refund.
- Whether the ATO holds a current address for you, rather than a hostel you left two years ago.
- Whether your identity details are consistent across passport, visa and TFN record.
- How many financial years are unlodged, since they can generally be dealt with together.
- Whether any of those years included ABN income, which changes a refund into a possible liability.
- Whether super is also held in a fund, since departure is what makes a DASP claim available.

Each year is worked out separately in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) for each of them before deciding what to do.

If you hold a UK or German passport, the guides to [Australian tax for UK passport holders](/uk-working-holiday-tax) and [Australian tax for German passport holders](/german-working-holiday-tax) cover the points specific to each passport.
 `,
 }, {
 slug: "what-is-a-tax-agent",
 title: "What Does a Tax Agent Actually Do?",
 description:
 "A tax agent is licensed to lodge for you, with extended deadlines and professional duties. What they handle for backpackers and fee red flags.",
 category: "Tax Return",
 date: "14 November 2024",
 readTime: 5,
 body: `
A tax agent is registered under Australian law to prepare and lodge returns for other people. Anyone charging a fee for tax agent services must be registered with the Tax Practitioners Board, or work under the supervision and control of someone who is. For a working holiday maker the practical differences are a later lodgement deadline if you engage them before 31 October, no direct dealing with the ATO, and someone who knows which deductions and offsets a 417 or 462 year actually carries.

## What does a tax agent do that you cannot do yourself?

Three things, and only one is the lodgement itself. An agent retrieves your income record directly from ATO systems rather than relying on you remembering every employer, applies the deadline concession that comes with an agent's lodgement program, and stands between you and the ATO if anything is questioned afterwards.

Pressing submit was never the hard part. The hard part is what goes into the return: how your residency position is assessed for your year, whether the Medicare levy exemption applies to you, and which of your expenses meet the substantiation rules rather than merely feeling work related.

## Who prepares your return, and who signs it off?

Two different people, deliberately. Your return is prepared by our team, who work only on 417 and 462 tax and see the same situations every day. It is then reviewed and signed off by a registered tax agent before it is lodged with the ATO.

That separation gives you the specialist knowledge and the professional accountability, and it is checkable rather than a claim: the agent's registration is listed on the government's public register of tax practitioners.

## How do you check that anyone offering tax help is legitimate?

By finding their registration on the government's public register of tax practitioners, the only authoritative source, which takes under a minute. The register shows whether a registration is current, whether it is subject to conditions, and whether it covers tax agent services rather than only BAS services.

A second test catches almost everything the register does not. A legitimate agent never needs your myGov password, because they reach your records through their own agent channel. Anyone asking for it is not operating as an agent, whatever they call themselves.

Working holiday makers are targeted for this specifically, in Facebook groups and messaging communities, because they are new to the system. Never send a TFN, passport or visa grant to someone who cannot produce a registration number.

## Who is allowed to lodge an Australian return for you?

Two kinds of people, and the line between them is the fee. You can always lodge your own return, online through myTax in myGov or on the paper form. Anyone who charges for preparing or lodging it has to be a registered tax practitioner: in the Tax Practitioners Board's words, "Only registered tax practitioners can charge a fee for tax agent services." People working under the supervision and control of a registered tax agent fall within that rule, as the opening of this guide explains.

That excludes more people than working holiday makers expect. An accountant or tax adviser in your home country, however qualified there, cannot charge you for an Australian return unless they are on the Australian register. The same goes for a friend of a friend, a hostel contact or a recruiter offering to sort your tax. A registered agent's name and number appear on the Tax Practitioners Board's free public register, so the check takes a minute.

## What actually changes once an agent is appointed?

You move onto their lodgement program, which carries a concessional deadline well past the 31 October self lodgement date. Communication with the ATO runs through the agent, including any query, adjustment or review that arises after lodgement.

The difference shows up in retrieval work rather than in the return itself. Income statements from an employer whose name you have forgotten, a TFN you never received, an unlodged year from two summers ago and a DASP claim all sit in systems far easier to reach from inside an agent channel than from a call centre queue in another timezone.

## Which years are close to a formality?

The simple ones, and they exist. One employer for the whole year, a TFN in place from the first week, 15% withheld correctly throughout, no ABN income, no deductions worth substantiating, no Medicare question to resolve. There is not much in a year like that for anyone to find.

The years where it stops being a formality are the common ones for this audience: several employers, a gap before the TFN landed, a period on an ABN, a residency position that has not been properly reviewed, a Medicare levy question, or a year you have already left the country for. Our comparison of [lodging yourself versus using an agent](/blog/diy-tax-return-vs-tax-agent-working-holiday) sets out where the money is lost.

## Is the agent fee deductible?

Yes, in the following year's return. Fees for managing your tax affairs are deductible in the year they are paid, so a fee paid in October for the year just ended is claimed in the return covering the year you paid it.

For a stay spanning two financial years, the first year's fee generally reduces the second year's assessable income. For someone lodging one final return on the way out, there is no following year to claim it in.

## Is your year the kind that needs one?

Whether an agent is worth it is a question about your particular year. The more of the points below that describe it, the further the return moves from being a formality.

- How many employers you had, since income from a forgotten one is the most common omission on a self lodged return.
- Whether there was a period before your TFN reached the employer, withheld at 45% instead of 15%.
- Whether the 2% Medicare levy applies to you, which depends on your own circumstances and is reviewed as part of preparing the return.
- Whether your residency position has been properly reviewed, since it depends on your own circumstances rather than on any single fact.
- Whether you have ABN income alongside wages, which changes both the calculation and the paperwork.
- Whether you have already left Australia, which makes almost every retrieval step harder to do alone.

The whole year is worked out in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) first to see roughly what yours looks like.
 `,
 }, {
 slug: "how-does-payg-withholding-work",
 title: "PAYG Withholding: Why Tax Leaves Your Pay",
 description:
 "Employers withhold tax from every pay and send it to the ATO on your behalf. How rates are set for working holiday makers and why refunds happen.",
 category: "Tax Return",
 date: "24 November 2024",
 readTime: 5,
 body: `
PAYG withholding is your employer taking tax out of each pay and sending it to the ATO on your account. For a working holiday maker with a [TFN](/tfn) on file it should be 15%. Two things decide whether it is: your declaration form, and whether your employer is registered.

## What does the withholding rate depend on?

The declaration form, first. Payroll applies a rate based on what the Tax File Number Declaration says about you, so telling a manager your number verbally or showing a photo of the letter changes nothing until the form is completed. Until then the law requires 45%.

Second is the employer's own registration. A business must register with the ATO as an employer of working holiday makers before it can apply the 15% rate. An unregistered employer must withhold at foreign resident rates instead, currently 30% on the relevant bracket, however perfect your own paperwork.

- TFN declaration completed, employer registered: 15%
- TFN not yet on file with that employer: 45%
- Employer not registered as a WHM employer: foreign resident rates, currently 30%
- Residency question answered incorrectly on the form: the wrong amount withheld, and possibly a bill later

## How do you read the rate off your own payslip?

Divide the tax withheld by the gross pay for the same period. That is the whole check, and it catches a wrong rate before months of it accumulate.

A payslip should show gross pay, tax withheld, super and net pay as separate lines. Super at 12% is paid by the employer on top of your wages rather than deducted from them, so it should never reduce the net figure. If the withheld figure divides out at 45% and your declaration form went in weeks ago, that is a payroll problem to raise immediately rather than a tax problem to sort out in October.

## Is over-withheld tax lost?

Not as such. Every dollar withheld is a prepayment credited against what you actually owe, so if 45% was taken and 15% was due, the difference is accounted for when the [tax return](/tax-return) is assessed. The outcome depends on your year, and the ATO makes that call.

What is genuinely lost is the use of the money in the meantime. Thirty cents in every dollar sitting with the ATO from February until August is the real cost, and for someone paying hostel rent weekly that gap decides what the year looks like. Fix a wrong rate now rather than count on getting it back later.

## What happens to the figures at the end of the year?

Your employer finalises payroll reporting after 30 June, and the year's total wages and total tax withheld are reported to the ATO under your TFN. Those figures become your income statement, and a return is built from them rather than from your payslips.

Income therefore sits in ATO systems even when your own records do not. A job you left abruptly, an employer that has since closed, or a payslip you never received does not remove that income from your return. It does mean the total has to be retrieved rather than remembered.

## Which PAYG problems are worth chasing?

The ones that changed the rate for a sustained period, rather than a single odd payslip. A month at 45% before a declaration form was processed, a whole harvest season with an unregistered labour hire company, or a second job that ran at the wrong rate all year are each worth reviewing, and each is dealt with through the return.

Two others run the other way. A declaration form answered incorrectly on residency can mean too little was withheld, which can produce a bill rather than a refund. Cash in hand work has nothing withheld at all, so the tax on it falls due in full at year end. Checking [what the tax withheld line on your payslip means](/blog/what-does-tax-withheld-mean-payslip) each pay period is what stops any of these from running for months.
`,
 }, {
 slug: "australian-financial-year-dates",
 title:
 "Australian financial year 2026-27 dates: 1 July to 30 June",
 description:
 "The Australian financial year runs 1 July to 30 June; 2026-27 started on 1 July 2026. Why a working holiday can mean two tax returns, and when to lodge.",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 4,
 body: `
1 July to 30 June. The Australian financial year is not the calendar year, nor the year used in the United Kingdom, Germany or Japan, so a working holiday that crosses 30 June produces two separate tax returns rather than one. The current year, 2026-27, runs 1 July 2026 to 30 June 2027.

## Why does the date split matter more here than at home?

Because working holidays rarely line up with it. A year starting in November and ending the following September sits across two financial years, each a separate assessment with its own income, withholding and outcome.

Each part year is assessed on what you actually earned in the months you worked. At working holiday maker rates withholding is a flat 15% of each pay up to $45,000 for the year, so a part year is not over withheld on that rate alone. A gap comes from weeks at a different rate, such as 45% before your TFN was on file.

## Which financial year does my work fall into?

Whichever one the money was earned in, set by the date you were paid rather than the date you worked. Three patterns cover most cases.

- Arrived November, worked through to May: all one financial year, lodged after 30 June.
- Arrived May, left the following August: two financial years, two returns, one covering May and June and the other July and August.
- Arrived July, worked through the following June: exactly one financial year, the cleanest case there is.

A past financial year you never lodged for is still open, and it can still be lodged. Unlodged prior years are common among second visa holders, and the result depends on how that year was withheld.

## When can you lodge, and when should you?

Lodgement opens on 1 July, and lodging on 1 July is usually a mistake. Employers finalise income statements through July, and a return lodged before yours is finalised can miss an employer entirely and then need amending.

Late July or early August is the practical window. The standard deadline for lodging yourself is 31 October, and a tax agent extends it, which matters if an employer has still not finalised.

## What if you are leaving Australia before 30 June?

Then you may be able to lodge an early return rather than waiting until you are home. If you are departing permanently and will earn no further Australian income that year, the return can be lodged before the year ends. The conditions, the paper and agent routes and the 15 June cut-off for agents are in the guide to [an early tax return before leaving](/blog/early-tax-return-leaving-australia).

Whether that is right depends on whether every employer has issued a final income statement, whether you have superannuation to claim at the same time, and how your residency position for the year is assessed. Leaving in April with three employers, one not finalised, is where lodging early creates an amendment later.

## What other dates run on the same calendar?

Two other sets of dates sit outside the return itself and are commonly missed. One decides whether your final super contributions exist yet, the other when you can claim them.

Until 30 June 2026 super was paid quarterly (28 October, 28 January, 28 April, 28 July). From 1 July 2026 Payday Super applies, and employers generally have to pay within seven business days of each payday, so a final contribution should now reach the fund soon after your last pay. Older quarterly timing can still matter for earlier pay periods, and a delayed final contribution is a common reason a super claim comes up short.

Your visa end date starts its own clock. It governs when you become eligible to [claim your superannuation after leaving Australia](/superannuation), and a fund that loses contact with you eventually transfers the balance to the ATO as unclaimed.

## When can you lodge, and how many times?

The dates are the same for everyone. How many returns you owe and when you can lodge them is not.

- Whether your stay crosses 30 June, which makes it two returns, both of which have to be lodged.
- Whether you are leaving before 30 June, which opens the early lodgement option.
- Whether every employer has finalised your income statement, which decides whether it is safe to lodge yet.
- Whether you have prior unlodged years from an earlier visa, which are usually still open to lodge.
- Whether your final super contribution has been paid (under Payday Super, generally within seven business days of your last payday).

The year you lodge for decides which rates and thresholds apply to your [working holiday tax return](/tax-return). You can [estimate your tax refund](/calculator) separately for each year you worked.
 `,
 }, {
 slug: "cash-in-hand-tax-return",
 title:
 "Paid cash in hand? How to declare it on your tax return",
 description:
 "Cash wages go on your tax return like any other wages. Nothing was withheld, so tax is settled when you lodge. How to rebuild the figures, what to keep.",
 category: "Tax Return",
 date: "27 November 2024",
 readTime: 5,
 body: `
Yes. Cash wages are taxable income exactly like wages paid into a bank account. The difference is that nothing was withheld along the way, so the tax is settled at lodgement, and the income has to be declared from your own records rather than an employer's reporting.

## What changes when you are paid in cash?

Only the mechanics, not the obligation. No PAYG is withheld, no Single Touch Payroll record is created, and you receive the whole amount. The tax liability moves from your employer's payroll to you, payable when the year is assessed.

The tax rate that applies to your year works the same way as for any wages, but it arrives as an amount owing. Someone who worked entirely in cash and set nothing aside can face a bill rather than a refund.

## Is your employer allowed to pay you in cash?

Yes, and the two things get confused constantly. Paying wages in cash is legal. What is not legal is failing to withhold tax, failing to report the wages, failing to pay superannuation, or failing to give a payslip.

So a cash arrangement is not by itself evidence of anything. A properly run cash job comes with a payslip, PAYG withheld, super paid and reporting to the ATO. When those are absent, the missing obligations are the employer's.

## What records make an honest return possible?

Your own contemporaneous notes, because nothing else exists. Dates worked, hours per shift, the agreed rate, the amount received each time and who paid you are the whole evidence base.

- Bank deposits, including partial banking of cash, which establish a pattern
- Text messages or app notifications about shifts and pay
- Rosters, photographs at the workplace, names of people you worked alongside
- The business name and ABN of whoever paid you

Keep it somewhere that survives a lost phone. The ATO can ask about a return for several years after it is lodged, and by then a WhatsApp thread from a Cairns hostel is usually gone.

## What if the figures are not exact?

Declare an honest best estimate and be consistent about how you reached it. Cash income is reported as salary and wages without an income statement.

What matters is the difference between good faith estimation and deliberate omission. An imprecise but honest figure supported by a method you can explain is very different from leaving income out, and it is the omission that creates a problem. Understating income has its own consequences, covered in our guide to [understating income and ATO penalties](/blog/understating-income-ato-penalty-working-holiday).

## What about the superannuation on cash work?

If you were an employee rather than a contractor, 12% superannuation was owed on your ordinary time earnings whether you were paid in cash or by transfer. Cash payment does not remove the obligation, and this is where most of the money in a cash job went missing.

Recovering it depends on the same records the income declaration depends on. Our guide to [unpaid super and what to do about it](/blog/super-employer-not-paying-what-to-do) sets out how the Superannuation Guarantee Charge process works.

## Does declaring it create trouble for you?

Declaring income is what protects you. An honest return is a clean record, and the employer's failure to withhold, report and pay super sits on their side of the ledger.

The risk is in the reverse. An unlodged year, or a lodged year with income left out, becomes difficult later, particularly for anyone who intends to apply for another Australian visa. Reporting the employer to the Fair Work Ombudsman is a separate decision, and our guide to [wage theft in Australia](/blog/wage-theft-working-holiday-australia) covers what that involves.

## Refund or bill? Your other income decides.

Whether cash income has to be declared is not in question. What it costs you turns on the rest of the picture.

- Whether you also had ordinary employment in the same year, since withholding from that job often covers the tax on the cash.
- Whether you were genuinely an employee or engaged under an ABN, which decides super and award entitlements.
- How much of the cash you can evidence.
- Whether the employer reported anything at all, which changes how the return is built.
- Whether deductions are available against the work.
- Whether 12% super was paid, which is usually the larger sum and is separately recoverable.

The combined position is worked out in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) to see whether the year lands as a refund or an amount owing.
 `,
 },

 // ─── SUPER ─────────────────────────────────────────────────────────────────
 {
 slug: "how-much-super-should-employer-pay",
 title:
 "How Much Super Should You Have Been Paid?",
 description:
 "12% of ordinary time earnings, on top of wages, within seven business days of payday from 1 July 2026. How to check it landed and what to do if not.",
 category: "Super",
 date: "2 December 2024",
 readTime: 5,
 body: `
Twelve per cent of your ordinary time earnings, paid into a super fund on top of your wages rather than out of them. That has been the rate since 1 July 2025 and it is the final legislated step, so it stays at 12%. On $8,000 of ordinary time earnings, $960 should appear.

## What counts as ordinary time earnings?

A narrower base than gross pay, and the difference is where quiet underpayment lives. It covers your regular wages for ordinary hours, most allowances, commissions, bonuses, loadings and in most cases annual leave loading.

It does not cover overtime, reimbursed expenses or genuine redundancy payments. For a working holiday maker on standard shifts that rarely matters. It matters in hospitality and on farms where penalty rates, loadings and overtime blur together and payroll calculates super on base hours alone.

## When should the money actually appear?

For pay from 1 July 2026, generally within seven business days of payday under Payday Super, plus a few days for the fund to process it. For earlier pay periods the old quarterly dates applied (28 October, 28 January, 28 April, 28 July), which is why older gaps caused most false alarms.

That lag used to be expensive for anyone leaving: under the old quarterly system a final contribution was not due until the quarter ended, so a [DASP claim after you leave Australia](/superannuation) submitted straight away would not include it. Payday Super (from 1 July 2026) shortens this, but a claim lodged too soon can still miss the last payment. This is one of the most common reasons a departing payment comes up short.

## How do you check it was paid?

Two records, compared. Your payslip should show the super accrued as a separate line, and your fund's account should show the contribution arriving. Divide the super figure by your ordinary time earnings and you should get 0.12.

If the result is 0.115 or 0.11, the employer is using a superseded rate. Payroll systems were slow to update through the step increases and some employers set rates manually, so this is a real and recoverable shortfall rather than a rounding issue. The rate history matters if your work spans the changes: 11% in 2023-24, 11.5% in 2024-25 and 12% from 2025-26 onward, each applying to the period in which the earnings accrued.

## Which fund did your super go to, and why does it matter?

Whichever one your first Australian employer defaulted you into, most likely, because of the stapling rule introduced in November 2021. Under stapling, a new employer must check whether you already have a fund and pay into that one rather than defaulting you into their own.

For an Australian who started work as a teenager this works as intended. For a working holiday maker it half works.

- On arrival you have no Australian fund, so your first employer's default becomes your fund by accident.
- Backpackers change employers fast, and the stapling record does not always update between a job in March and a job in April, so employers two and three may default you into their own funds anyway.
- Small balances transferred to the ATO as unclaimed break the chain entirely.

So a typical working holiday maker ends up with two or three accounts, each paying its own administration fee and often its own insurance premium against a balance of a few thousand dollars. To avoid that, nominate the same fund on the standard choice form at every job. Existing split balances are not combined retrospectively, and [consolidating super across funds](/blog/super-multiple-funds-consolidation) is a separate exercise worth doing before you leave.

## What if the super is missing entirely?

Start with payroll, in writing, because a genuine administrative error is more common than deliberate non payment and is fixed in a week. Give the pay periods, the ordinary time earnings and the fund details, and ask what was remitted and when.

If that fails, unpaid super is recoverable through the superannuation guarantee charge process, a formal enforcement mechanism rather than a complaint, and it can be pursued after you have left the country. It needs evidence: payslips showing the super line, fund statements showing what arrived, employment dates and hours, pay rates and gross earnings, and the employer's name and ABN. See [what to do when an employer is not paying super](/blog/super-employer-not-paying-what-to-do).

Cash paid work is where this fails most often, because there is no payslip trail and frequently no fund at all. The obligation is identical regardless of how the wages were paid.

## Was it your base or your timing?

Twelve per cent is the rate for everyone, so a shortfall is usually about the base it was calculated on or the timing of the payment.

- Whether your earnings include overtime, which correctly attracts no super.
- Which pay period you are checking, since before 1 July 2026 contributions could be due up to four months after the work.
- When you are leaving, because a final contribution can still be outstanding on your departure date.
- How many employers you had, which is how many funds you probably have.
- Whether any employer paid you cash without a payslip.
- Which financial year the work falls in, since the rate stepped up through 11%, 11.5% and 12%.

Everything paid in is claimable when you [claim your superannuation after leaving Australia](/superannuation), where working holiday maker balances are withheld at 65% before payment.

Super and tax are separate claims: the DASP pays out your fund balance, while tax over-withheld from your wages is dealt with only through a [working holiday tax return](/tax-return).
 `,
 }, {
 slug: "how-long-does-dasp-take",
 title:
 "DASP processing time: generally paid within 28 days",
 description:
 "The ATO generally pays a DASP within 28 days of a complete application, then bank clearing adds days. What delays a claim, several funds, overseas payment.",
 seoTitle: "How long does a DASP take? Generally within 28 days",
 category: "Super",
 date: "20 July 2026",
 readTime: 6,
 body: `
About 28 days for a complete application. The ATO says a DASP is generally paid within 28 days of your completed application being received, and international bank clearing adds days on top of that. The clock starts from a complete application, not from the day you start one. Applications that run longer almost always have a specific, identifiable cause rather than a queue problem.

## What has to happen before the money moves?

Three parties check three things, and the application waits for the slowest. Your visa has to have expired or been cancelled and you have to have left Australia; the online application checks both against Department of Home Affairs records. Your fund confirms the person applying owns the account. The fund then calculates the payment, applies the 65% withholding on working holiday maker super, and releases the net amount.

Nearly all delay lives in the step before the 28 days start: an application is not complete while a certified document or a visa record is still missing. The Home Affairs records either show what they need to or they do not. Identity matching is the slow part, because funds are releasing money permanently overseas to someone they cannot see. Both conditions, and the rest of the eligibility rules, are explained on the page about [the DASP claim](/superannuation).

## What actually causes a DASP to take longer?

Every extended claim we look at falls into a small number of buckets, and none is the fund simply being busy. Identifying which one applies is most of the work.

**Your visa or departure has not yet been recorded.** Lodging within days of your visa ceasing, or of flying out, means the Department of Home Affairs record has not caught up. Movement records can take some days to update after departure. There is no way to hurry it and no point lodging into it.

**Your name does not match.** The most common one by a distance, and almost never your mistake. Employers set up super accounts by typing a name off a passport at speed, and a missing middle name, a transposed given and family name, or a dropped accent is enough to stop the match.

**Your date of birth was entered wrong** by the same employer, in the same hurry.

**You applied to a fund that holds nothing.** Working holiday makers with four employers routinely have super in funds they have never heard of, and applying to the one they remember returns nothing because the money is somewhere else.

**Your certified documents were not accepted.** Funds differ on who counts as an approved certifier, and certification obtained in your home country after you have left is where this most often fails.

## Does having several super funds change the timing?

Yes. The ATO's online application creates one application per account it finds, and each runs on its own timeline, so they finish at different speeds. A traveller with four employers across a year in hospitality and harvest work commonly has three or four accounts, so the last payment can arrive weeks after the first.

Super already transferred to the ATO is claimed from the ATO through the same online application. The ATO's service standard there is also 28 days from lodgement, and it says it cannot always meet it. Funds transfer a former temporary resident's balance once at least six months have passed since they left Australia and their visa ceased, so this applies to anyone who left a while ago without claiming.

## How long does the money take to arrive once it is paid?

Payment and arrival are two different dates. An Australian bank account usually sees it within a couple of business days. A major bank in the United Kingdom, Europe or Japan is commonly two to five business days after release. Smaller and regional banks can take up to ten. An overseas account is only possible where your fund offers international transfers; super already held by the ATO is paid only to an Australian account or by cheque.

Currency conversion adds its own step. If you want the money in a particular currency, decide before the application goes in rather than after, because the receiving account details are part of the claim.

## Why might yours run past 28 days?

Twenty eight days is the ATO's expectation for a complete application, and most claims that run longer are incomplete in a way the applicant did not know about.

- Whether your visa has actually ceased and your departure is recorded. Submitting too early is the most common self inflicted delay. You can start and save the online application before you fly, but it is submitted once you have left.
- Whether your name on the fund's records matches your passport exactly, including middle names and accents.
- How many employers you had, which is how many funds you probably have.
- Whether any of your super has already been transferred to the ATO as unclaimed, which means that part is claimed from the ATO instead of a fund.
- Which bank you are being paid into and in what currency.
- Whether your tax return for your final year is also outstanding, since the two are usually best dealt with together.

The full eligibility and withholding position is set out where you [claim your superannuation after leaving Australia](/superannuation), and any final year [working holiday tax return](/tax-return) is a separate claim on separate money.
 `,
 }, {
 slug: "tax-on-super-withdrawal-backpacker",
 title:
 "Tax on your super after leaving: what happens after the 65%",
 description:
 "The 65% DASP tax is final: the payment does not go on your Australian tax return and cannot be claimed back. How home may treat it, and when to claim.",
 category: "Super",
 date: "29 July 2026",
 readTime: 6,
 body: `
The 65% withheld from a working holiday maker's Departing Australia Superannuation Payment is a final tax. It does not go on your Australian tax return, there is nothing to claim back, and whether your home country taxes what is left is a question for its own rules. What is still yours to decide is when you submit the claim and whether you have found every fund first.

This guide is about what happens around the tax. Why the [DASP tax rate](/blog/dasp-tax-rate-65-percent-explained) is 65%, what it applies to and what it leaves on real balances is set out in that guide.

## Does the DASP go on your Australian tax return?

No. The payment is not included in your Australian taxable income, and the amount withheld is not a credit you reconcile at the end of the year. It is final, so the DASP and your [tax return](/tax-return) are two separate things that never meet on the same form.

That cuts both ways. A large super balance does not push your income into a higher bracket, and the 65% is not something a deduction or an offset on your return can reduce. Tax over-withheld from your wages is the opposite case: it only comes back through a return.

## Will your home country tax it as well?

That depends on your home country, not on Australia. Many countries treat a payment like this as foreign pension income, and the rules on whether it has to be declared, and whether anything more is due, differ from one country to the next.

Ask your home tax office or an adviser there before you assume either way, and keep the payment statement your fund sends, because it shows the gross amount, the tax withheld and the net payment.

## Can the 65% be reduced or claimed back?

No. It is a final withholding rather than a prepayment, and tax treaties do not reach it. The ATO's rule also closes the obvious gap: if any part of your payment comes from contributions made while you held a 417 or 462 visa, the 65% applies to the whole payment, even where some of the super was built up later on another visa.

The one part it does not reach is a tax free component, from personal contributions made out of money already taxed, which almost no backpacker has. Anyone offering a lower rate is either mistaken or after your identity documents.

## Is it still worth claiming a small balance?

Yes, because the alternative is not keeping the money. Once at least six months have passed since you left Australia and your visa ceased, your fund transfers the balance to the ATO, where it is out of reach of fund fees and insurance premiums but also out of sight. It can still be claimed at any time, at the same rate.

The DASP pays 35% of whatever the fund holds, so a $1,500 balance returns about $525 and a $4,000 balance about $1,400. Every one of those is money an employer paid on top of your wages, and none of it comes home by itself.

## When should you actually lodge the claim?

After your visa has ceased or been cancelled and after you have left Australia, which are both conditions of eligibility rather than preferences. You can start and save the ATO's online application before you fly, and the ATO says payment generally follows within 28 days of a complete application.

The eligibility checks, documents and timing are set out where you [claim your super after leaving Australia](/superannuation).

The timing question that actually matters is the last quarter. Under Payday Super (from 1 July 2026) final contributions are generally due within seven business days of your last payday, while under the old quarterly system they were not due until the quarter ended. Claiming before your final contribution has landed means claiming against a balance your employer has not finished paying into, and the leftover then has to be chased separately. Against that, every month the balance sits in the fund is another month of administration fees on money you are no longer adding to. The answer depends on what the outstanding quarter is worth relative to the fees.
`,
 }, {
 slug: "what-happens-to-unclaimed-super",
 title: "Unclaimed Super: The ATO Holds It for You",
 description:
 "Unclaimed super stays yours. Six months after you leave and your visa ceases, funds transfer it to the ATO, and a DASP claim retrieves it at any time.",
 category: "Super",
 date: "22 December 2024",
 readTime: 5,
 body: `
Nothing bad. If you leave Australia without claiming, your fund transfers the balance to the ATO once at least six months have passed since you left and your visa ceased. It is held there in your name as unclaimed super, it can still be claimed through the ordinary Departing Australia Superannuation Payment process, and there is no deadline after which it stops being claimable.

## What triggers the transfer?

For a former temporary resident, time. Once at least six months have passed since the later of two dates, the day you left Australia and the day your visa ceased, the fund must transfer the balance to the ATO if you have not claimed it. Funds report and pay these amounts twice a year, by 31 October and 30 April, so the move can come some weeks after the six months are up.

Nothing about it depends on your fund losing contact with you, and nobody asks you first. Nothing was lost, but the money is now somewhere you would not think to look.

## Can you still claim it once it has moved?

Yes, through the same DASP online application, with the claim directed at the ATO rather than at a fund. Same eligibility, same 65% withholding on the taxable component for working holiday makers. [How the DASP claim works](/superannuation) is the same for ATO-held super as for a fund.

The ATO's service standard for these claims is 28 days from lodgement, which it says it cannot always meet. One thing does change: the ATO pays ATO-held super only by transfer to an Australian bank account in your name or by an Australian dollar cheque, with no international transfer. There is no time limit either: the ATO says super held for a former temporary resident can be claimed at any time.

## How do you find out whether yours has moved?

By searching against your TFN, which covers both funds and ATO held balances in one step. The DASP online application searches by TFN once you are eligible, and myGov linked to the ATO shows ATO-held super under Super, then Fund details. The fund you remember may no longer hold anything.

If you have been out of Australia for more than six months, assume at least part of your super may have moved and search rather than writing to the old fund. Our guide to [finding lost superannuation](/blog/how-to-find-lost-superannuation) covers what the search needs.

## Does it change while the ATO holds it?

It is no longer in a fund, so it no longer rises or falls with a fund's investment option.

It is not being eroded either. A small balance in a fund is charged administration fees and often insurance premiums, and a few hundred dollars can be consumed over a few years. Money held by the ATO is out of reach of fund fees and insurance premiums, so for a small balance the transfer is not necessarily the worse outcome.

## Why claim it rather than leave it?

Because the practical obstacles only grow. Identity verification gets harder the longer you have been out of the country, contact details go stale, and an Australian number attached to a lapsed SIM stops receiving verification codes.

The number people struggle with is the 65% withholding. After it you receive 35% of the balance. That is a poor rate and the only one available; the alternative is leaving the whole amount behind. For someone who worked several months at 12% super on their wages, 35% of the balance is still a real sum.

## What if some of it was never matched to you at all?

A different problem, and a more common one than the transfer. Contributions made before your TFN reached the fund frequently cannot be attached to a person, and they sit unallocated rather than being held against your name.

Those do not appear in a TFN search, which is why the employer list matters. If your payslips show super for a job that no fund and no ATO balance reflects, the money was either never paid or never matched, and the two are resolved differently. Our guide to [an employer not paying super](/blog/super-employer-not-paying-what-to-do) covers the first case.

## How many balances exist in your name?

Whether your super sits with a fund or with the ATO does not change what you receive. The points below decide how many balances exist and how straightforward the claim will be.

- How many employers you had, since each may have opened its own account.
- How long ago you left, which decides how much is likely to have transferred.
- Whether your TFN reached each fund, which decides whether contributions were matched at all.
- Whether your visa has ceased and you have departed, which is what makes the claim available.
- Whether your identity details are still consistent and your contact details reachable.
- Whether any employer simply never paid, which is a recovery rather than a search.

Super and an unlodged return are usually outstanding together, and the year is reconciled in the [working holiday tax return](/tax-return).
 `,
 }, {
 slug: "how-to-find-lost-superannuation",
 title: "How to find lost super in Australia before you leave",
 description:
 "Find lost superannuation before you leave Australia by searching every fund linked to your TFN. Multiple accounts, unclaimed super, and the DASP claim.",
 category: "Super",
 date: "29 December 2024",
 readTime: 5,
 body: `
Lost super is found by searching against your TFN, which surfaces every fund holding contributions in your name plus anything already transferred to the ATO as unclaimed. In myGov, linked to the ATO, the Super section of ATO online services lists every account held against your TFN, including any super already transferred to the ATO, though linking needs identity verification that is harder once you have left. Most working holiday makers have more accounts than they think, and the search is far easier before you leave Australia.

## Why does a backpacker end up with several accounts?

Because every employer that did not ask which fund you wanted opened one for you. A season of farm work, then a cafe, then a bar, with three default funds, is three accounts, each holding a few hundred dollars and each charging fees against it.

Then the contact details go stale. Statements go to a share house you left in March, the fund loses touch, and after a period of inactivity the balance is transferred to the ATO as unclaimed super. Still yours, just no longer where you would look.

## Can you find lost super with your tax file number?

Yes, and it is the most reliable way. Every fund an employer paid into reports your account against your TFN, so a search in ATO online services through myGov, or in the ATO's DASP online application once you have left, lists each account in your name, including super the ATO already holds. If the TFN itself is lost, [recover your TFN](/blog/how-to-find-lost-tfn) first, because no search by name and date of birth is as complete.

Super does not stay with your fund forever once you have gone. When six months have passed since you left Australia and your visa has ceased, a fund transfers the balance to the ATO as unclaimed super. It is still yours, and the same TFN search finds it there.

## What actually gets lost, as opposed to merely forgotten?

Two different things. Money in a fund you have forgotten about is findable through a TFN search immediately. Money that never got matched to you is harder.

Contributions made before your TFN reached the fund often cannot be attached to a person at all, and end up unallocated rather than held against your name. That is the most common reason a departing backpacker's super is smaller than the payslips say, and why payslips are worth checking against the fund.

## Where exactly do you search?

There are two official routes, and both run on your TFN.

- **myGov linked to the ATO.** In ATO online services, go to Super, then Fund details. Every account held against your TFN is listed, including super already transferred to the ATO. An account marked "Contact fund" is a lost member account: the fund has lost touch with you, and contacting it is how you reconnect.
- **The ATO's DASP online application.** Once you are eligible to claim, it searches for your accounts by TFN and turns each one it finds into its own application, ATO-held super included. That makes the search and [the DASP claim after you leave Australia](/superannuation) one process.

The ATO app shows the same records, and the ATO can also be reached by phone. Linking myGov to the ATO needs identity verification, which is the step that gets harder once you have left.

## What information makes the search complete?

Your TFN does most of the work, your employment history closes the gap. The search finds accounts linked to your TFN, not contributions that were never linked.

- Every Australian employer you worked for, by company name
- Approximate start and finish dates for each
- Any fund name you remember being mentioned or receiving a letter from
- Any correspondence you kept from a fund
- Payslips showing super amounts, which establish what should have been paid

The employer list matters most. If the search returns three accounts and you remember five jobs, the two missing ones are where unpaid super or unmatched contributions may be.

## Should you consolidate before claiming?

It depends on how many accounts there are and what they hold. Consolidating into one fund means one Departing Australia Superannuation Payment application, one verification and one payment instead of several.

Against that, consolidation takes time, so with two straightforward accounts claiming separately is often faster. Neither approach affects the amount you receive. Our guide to [consolidating multiple super funds](/blog/super-multiple-funds-consolidation) covers what is involved.

## Why does waiting cost you?

Not through any deadline, but through drag. Small accounts left in a fund are eroded by fees and insurance premiums, and identity verification gets harder the longer you have been out of the country.

A phone number on an Australian SIM stops receiving verification codes the moment that SIM lapses. Searching while you are still in Australia, with working contact details, avoids the largest obstacle to recovering super from overseas.

## What happens once you have found it all?

It stays in the fund until your visa has ceased and you have left Australia, which is what makes a DASP claim available. The taxable component is then taxed at 65% for working holiday makers, and the ATO says payment generally follows within 28 days of a complete application.

The alternative to 65% is not a lower rate, it is leaving the balance behind entirely.

## How much of yours is still findable?

These facts decide how many accounts exist and how much of the balance is attached to your name.

- How many employers you had, since each may have opened its own account.
- Whether you nominated a fund or were defaulted at each job.
- Whether your TFN reached each fund, which decides whether contributions were matched to you.
- Whether any balance has already been transferred to the ATO as unclaimed.
- Whether your contact details with each fund are current.
- Whether any employer simply did not pay, which is a recovery rather than a search.
- Whether you are still in Australia, which makes verification much easier.

Unpaid super and an unlodged return are usually found together, and the year is reconciled in the [working holiday tax return](/tax-return).
 `,
 }, {
 slug: "how-to-choose-super-fund",
 title: "Which Super Fund Is Best for a DASP Claim?",
 description:
 "For a working holiday maker the right fund is the one that pays a DASP claim quickly. Fees and default insurance matter more than investment returns.",
 category: "Super",
 date: "10 January 2025",
 readTime: 5,
 body: `
For a working holiday maker the best fund is the one that pays a DASP claim quickly and does not erode a small balance while it waits. You are withdrawing the whole amount when you leave, so fees, insurance defaults and identity verification matter. Long term investment performance does not.

## Why are the usual criteria the wrong ones?

Australians choose a fund for a forty year horizon, where a fraction of a percent compounds into a great deal of money. You are choosing for eighteen months, after which the entire balance leaves the country through the Departing Australia Superannuation Payment.

Over that horizon investment performance is close to irrelevant. What the fund charges while the money sits there, and how competently it handles a claim from someone no longer in Australia, decide what you receive.

## What is superannuation, in the short version?

Money your employer pays into a fund in your name, at 12% on top of your wages rather than out of them. Your gross wage is the same whether it is paid or not. For a working holiday maker it is a forced savings account you unlock on departure.

- Contributions are the employer's obligation, on top of your wage
- The fund holds and invests the balance
- The whole balance is claimable through [DASP](/superannuation) once your visa has ceased and you have left
- DASP is withheld at 65% for working holiday maker contributions

That 65% is the most important number here. A $10,000 balance pays out about $3,500, and nothing about fund choice changes that rate.

## Which fees actually matter over eighteen months?

Flat dollar administration fees hurt a small balance; percentage based fees do not. A few dollars a week charged regardless of balance is a meaningful proportion of $3,000 and an irrelevance on $300,000.

The larger and more avoidable leak is default insurance. Many funds automatically attach life and income protection cover and deduct the premiums from your balance, which for someone withdrawing everything within two years is money spent on cover that will never be claimed. It can usually be switched off through the fund's member portal.

## Which funds handle DASP well?

The large industry and major retail funds process departure claims routinely and have systems built for identity verification from overseas. Small employer default funds are where claims stall, because a claim from a former member in Berlin with an expired visa is an exception rather than a process.

The DASP application requires visa verification through Home Affairs and identity documents assessed from abroad, and the ATO says payment generally follows within 28 days of a complete application. What you want is a fund that has seen that a thousand times before.

## What happens if you never nominate a fund?

Two mechanisms run in order. Your employer first checks for a stapled fund, meaning any existing fund already linked to your TFN from earlier work, and pays into it if one exists. If none does, contributions go to the employer's default fund.

That is why nobody ends up with no super. What it produces over a four employer year is fragmentation: several accounts, several sets of fees, several DASP claims. Our guide to [consolidating multiple funds](/blog/super-multiple-funds-consolidation) covers whether to merge them or claim each separately.

## What is Payday Super, and does it change anything?

From 1 July 2026 employers must pay super at the same time as wages, generally within seven business days of each payday, instead of quarterly. It is an employer compliance change with a real benefit for anyone on a short stay.

Under quarterly payment a missing contribution was invisible for up to four months, by which time you had often left the job. Paid per pay run, a gap shows up within a fortnight while you are still there to raise it. Our guide to [unpaid super](/blog/super-employer-not-paying-what-to-do) covers what to do when one appears.

## What should you do at your first job?

Nominate one fund on the super choice form and give the same details to every employer afterwards. That single habit prevents the entire problem this guide describes.

- Nominate one well known fund at the first job
- Give the same fund details on every later super nomination form
- Switch off default insurance through the fund's app in the first month
- Keep the member number somewhere you will still have it in a year

The member number is the part people lose. A fund can be traced through your TFN, but a claim from overseas moves considerably faster when you can quote the account, and a photograph of the welcome letter costs nothing.

## What decides your outcome here?

Four decisions, all made in the first week of your first job. Whether you nominated one fund and gave the same details to every subsequent employer. Whether you turned off default insurance. Whether the fund charges flat or percentage based administration fees. And whether the fund processes overseas claims as routine.

Getting it wrong is quiet rather than dramatic: three small balances in three funds, each paying insurance premiums for cover nobody wanted, each requiring its own claim, and one forgotten entirely because the job lasted three weeks in a town you cannot now name. Our guide to [finding lost super](/blog/how-to-find-lost-superannuation) exists because that is the common ending rather than the rare one.

Super and tax are separate claims: the DASP pays out your fund balance, while tax over-withheld from your wages is dealt with only through a [working holiday tax return](/tax-return).
`,
 },

 // ─── WORK RIGHTS ────────────────────────────────────────────────────────────
 {
 slug: "minimum-wage-australia-2026-27",
 title: "Minimum Wage Australia: $26.44 an Hour",
 description:
 "The national minimum wage rose 6% to $26.44 per hour ($1,004.90 per week) on 1 July 2026. Casual rates with 25% loading, award increases, and your rights.",
 category: "Work Rights",
 date: "29 July 2026",
 readTime: 5,
 body: `
The national minimum wage from 1 July 2026 is $26.44 an hour, or $33.05 for casuals with the 25% loading, set by the Fair Work Commission's 2026 Annual Wage Review. It applies to working holiday makers in full. Most jobs are covered by an award that pays more, so this figure is a floor rather than a rate.

## Why is the national minimum usually the wrong number to check against?

Because it only applies where no award or enterprise agreement covers the job, and in the industries backpackers work in one almost always does. Hospitality, retail, horticulture, construction, cleaning and aged care all have modern awards with their own minimum rates, above the national minimum before any penalty is added.

So being paid exactly $26.44 in a cafe is not proof of compliance. It is closer to evidence of underpayment, because the Hospitality Industry (General) Award sets its own rates by classification.

## How is the figure set, and when does it change?

The Fair Work Commission reviews it once a year, with the increase taking effect from the first full pay period on or after 1 July. The 2026 review raised the national minimum by 6% and award minimum rates by 4.75%.

That split matters for a year that has already ended. For 2025-26 the national minimum was $24.95 an hour, or $31.19 casual, and those are the figures your payslips from that year should be measured against.

## What does the casual loading actually buy you?

An extra 25% on the base rate, in exchange for no paid annual leave, no paid sick leave and no notice of termination. It is not a bonus and not discretionary, and a casual paid the permanent base rate with no loading is underpaid even if the headline number looks like the minimum.

Check it before anything else on a payslip: the most common single error in backpacker pay, visible in one line. Casual rates for 2026-27 start at $33.05 an hour under the national minimum, and higher again under most awards.

## Where do the rates you are actually owed come from?

From your award and your classification within it. Every modern award has several classification levels reflecting experience and responsibility, and two people in the same kitchen can lawfully be on different rates.

- Hospitality Industry (General) Award, covering cafes, restaurants, pubs and hotels
- General Retail Industry Award, covering shops and retail
- Horticulture Award, covering fruit picking, harvest and agricultural work
- Building and Construction General On-site Award, covering construction
- Cleaning Services Award, covering commercial cleaning

Ask which award covers you and which level you sit at. An employer who cannot answer is usually not applying one, which is a more useful finding than any hourly comparison.

## What about weekends, nights and public holidays?

In most award covered work, hours outside ordinary time attract penalty rates, and for a casual the award's weekend and public holiday percentages already include the loading. Saturday, Sunday, public holiday and late night rates vary by award, and in hospitality and retail they are where a large share of a backpacker's earnings come from.

A casual hospitality worker on a Sunday can legitimately earn close to double the headline national minimum. Our guide to [penalty rates in Australia](/blog/penalty-rates-australia) sets out how the loadings combine.

## What should you do if the numbers do not add up?

Work out the correct rate first, because a claim built on the national minimum when an award applies will understate what you are owed. Identify the award, find your classification, apply the loading and any penalties, and compare against the payslips week by week.

Keep the evidence as you go. Rosters, payslips and any written confirmation of your classification turn a disagreement into a claim, and the Fair Work Ombudsman handles unresolved complaints. There is no visa based barrier to recovering underpaid wages.

## The national floor is rarely your rate.

The national figure is fixed. What you are owed is not, and it turns on facts about your own job.

- Which award covers your employer, since that sets the base rate rather than the national minimum.
- Which classification level you were placed at, which can differ between two people doing similar work.
- Whether you are casual or permanent, which decides the 25% loading.
- Which hours you worked, since weekend, evening and public holiday penalties often exceed the base pay.
- Whether an enterprise agreement applies, which can set rates above the award.
- Whether you are engaged on an ABN, in which case none of this applies to you at all and that is usually the real problem.

Whatever the rate, the tax withheld from those pays reconciles in your [working holiday tax return](/tax-return) at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 }, {
 slug: "how-many-hours-can-you-work-on-whv",
 title:
 "How many hours can you work on a WHV? No weekly limit",
 description:
 "There is no weekly hour limit on a 417 or 462 visa, so full time, overtime and two jobs are fine. The limit is six months per employer, with exemptions.",
 category: "Work Rights",
 date: "29 July 2026",
 readTime: 5,
 body: `
There is no weekly hour limit on a 417 or 462 visa. You can work full time, take overtime and hold several jobs at once. The real constraint is visa condition 8547, which limits you to six months with any one employer unless an exemption applies, and the exemptions cover most of the work backpackers do.

## Why do people think there is an hour limit?

Because student visas have one and the two get conflated. A student visa caps fortnightly hours during study periods; a working holiday visa has no equivalent, and the Department of Home Affairs sets no weekly maximum.

What limits your hours in practice is your award and your body. Awards set maximum ordinary hours and required breaks, and hours beyond them attract overtime or penalty rates: a right, not a restriction.

## What is condition 8547?

It limits you to six months of work with any one employer, counted in calendar months from your start date rather than by hours worked. It applies to every working holiday visa holder, it is mandatory rather than advisory, and it resets when a new working holiday visa is granted.

Breaching it is a visa matter, not a tax matter, and the consequence can be cancellation. It is the one rule here worth being careful about, particularly for anyone who found a good job in their second month and stayed.

## Which work is exempt from the six month limit?

A long list covering most of what working holiday makers actually do, which is why the six month rule binds far fewer people than most expect. In these cases you can work beyond six months with the same employer without seeking permission. Home Affairs states these exemptions apply from 1 January 2024 until the Government makes further decisions, so confirm the current list before relying on it.

- Plant and animal cultivation, anywhere in Australia
- Natural disaster recovery, anywhere in Australia
- Agriculture (including food processing), health, aged and disability care, childcare, and tourism and hospitality, anywhere in Australia
- Fishing and pearling, tree farming and felling, construction and mining, in northern Australia only (defined by postcode in Queensland, Western Australia and the Northern Territory)

Different locations of the same employer count separately, so long as no single location exceeds six months. A hospitality group moving you from a Melbourne venue to a Byron Bay one is a different position from a year in the same kitchen.

## What if your work is not exempt?

You can ask the Department of Home Affairs for permission to continue, and the request has to be made before the six months end, because permission is not retroactive. If you asked in time you can keep working until you receive the written decision; if you asked late you must stop working for that employer until you get an outcome. Permission is discretionary and not guaranteed, so it is not something to plan a job around.

The practical alternative is to change employers. For most working holiday makers the six month rule is a reason to move on they were going to have anyway.

## How does the 88 day rule fit in?

It does not, and confusing the two is common. Condition 8547 is about how long you can stay with one employer. The specified work requirement is about qualifying for a second visa, and it needs 88 days of specified work in an eligible area during your first visa. A third visa requires six months of specified work during the second.

Many specified work industries are also exempt from the six month rule, which is why a season in the Riverland or the Bundaberg region can run past six months and still count. Separate rules that happen to overlap.

## What do long hours do to your tax?

They can move you up the scale that applies to working holiday makers, which has a lower rate up to $45,000 and a higher one on the portion above it. Which scale applies to your year is for the ATO to decide. Two jobs at once reach that point faster than most people expect, because neither employer's payroll knows about the other.

That is the most common year end surprise for high earning backpackers: each employer withholds correctly on its own figures, and the combined income crosses a threshold neither can see. Superannuation follows earnings rather than hours, at 12% on top of your wages with no minimum monthly earnings requirement since 2022, so more hours means more super as well as more tax.

## Does the six month rule bind you?

There is no hour limit for anyone. What varies is whether the six month rule binds you and what your combined income does to your rate.

- Whether your industry is on the exempt list, which decides whether six months is a limit or a formality.
- Whether the same employer moved you between locations, which is treated separately.
- Whether you are chasing 88 days of specified work, which is a different rule with a different purpose.
- How many employers you have at once, since combined income is what crosses the $45,000 point.
- Whether all of them hold your TFN, because a second job at 45% is common and invisible until you check.
- Whether any of the work is under an ABN, where nothing is withheld and the tax lands at assessment.

Multiple employers all reconcile in one [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) across your combined income rather than job by job.
 `,
 }, {
 slug: "penalty-rates-australia",
 title: "Penalty Rates: What Weekends Really Pay",
 description:
 "Sundays commonly pay 150-175% and public holidays 225-250% under awards. The rates by industry and how to check your payslip is honouring them.",
 category: "Work Rights",
 date: "10 February 2025",
 readTime: 5,
 body: `
Penalty rates are the higher rates that apply to hours worked outside ordinary time: weekends, public holidays, evenings and early starts. They come from the award covering your job, not from your employer's goodwill. Saturdays commonly run around 125 to 150% of the ordinary rate, Sundays 150 to 175%, and public holidays 225 to 250%.

## Where do your penalty rates actually come from?

From the modern award or enterprise agreement covering your industry, a legal instrument rather than a workplace policy. The Fair Work Commission sets and reviews them, and an employer cannot pay below them by agreement, by contract or by a flat rate arrangement.

So the question is not what your boss pays on Sundays. It is which award covers the venue and which classification you are on, because those two answers produce every figure that follows.

## What do penalty rates look like in hospitality?

The Hospitality Industry (General) Award covers cafes, restaurants, pubs and hotels, and covers most working holiday makers. The award sets separate full-time and part-time and casual percentages, and the casual figures already include the 25% loading.

- Weekday evening from 7pm: a flat extra amount per hour rather than a percentage
- Saturday: around 125% (150% for casuals)
- Sunday: around 150% for full-time and part-time staff, around 175% for casuals
- Public holiday: around 225% for permanent staff, around 250% for casuals

Exact figures depend on your classification level and shift pattern, and the award itself is the authority. A casual on a Sunday is on a materially different hourly rate from the same person on a Tuesday.

## And in retail?

The General Retail Industry Award follows the same structure with lower Sunday loading. Saturdays run around 125%, Sundays around 150% and public holidays around 225%, with late night penalties keyed to the store's closing time rather than to a fixed hour.

Retail varies more by enterprise agreement than hospitality, particularly in the large supermarket chains, where the agreement rather than the award sets the rate. If you work for a national chain, ask which agreement applies; it will differ from the figures above in both directions.

## How do penalties and casual loading combine?

In the hospitality and retail awards the casual weekend and public holiday percentages already include the 25% loading, so the loading is not added a second time. A casual weekend shift still sits above both the loaded weekday rate and the permanent weekend rate.

This is where a flat rate arrangement costs most. One figure across every day of the week pays under the award on Saturdays and Sundays even if it looks generous against the weekday rate. A flat hourly number on a payslip covering a Sunday is the clearest sign of underpayment there is.

## How do you check whether yours are right?

Read the payslip rather than the total. A compliant payslip separates the hours by rate: ordinary hours at one figure, Saturday hours at another, Sunday and public holiday hours at their own, with the loading identified.

If every hour in a week that included a Sunday appears at one rate, the penalty was not paid. That is a documentation question, resolved by comparing the roster against the payslip for a few weeks.

## What if the penalties were not paid?

Work out the correct figure first, because a claim based on the national minimum understates what is owed where an award applies. Identify the award, the classification, the loading and the penalty for each shift, and total the shortfall across the whole period rather than for one week.

Raise it with the employer in writing first, since many are genuine payroll configuration errors rather than deliberate underpayment. The Fair Work Ombudsman handles it where that does not resolve it, the process is free, and working holiday makers have the same standing as anyone else.

## Your roster answers this, not the multipliers.

The multipliers are set by instruments you can look up. What you were owed depends on your own roster, and several of the points below apply at once.

- Which award or enterprise agreement covers the venue, since the Sunday rate in particular differs.
- Your classification level within it, which changes the base every multiple is applied to.
- Whether you are casual, since casual penalty percentages are higher and already include the 25% loading.
- Which specific hours you worked, because evening, weekend and public holiday penalties are all separate.
- Whether the payslip separates hours by rate or shows a single flat figure.
- Whether you are engaged on an ABN, in which case no award covers you and that is the underlying issue.

Penalty income is taxed the same way as the rest of your wages and reconciled in your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know what the year actually came to.
 `,
 }, {
 slug: "can-your-employer-pay-you-cash-in-hand",
 title:
 "Cash in hand pay: legal, but tax and super still apply",
 description:
 "Yes, paying wages in cash is legal in Australia. Skipping tax, super and a payslip is not. The warning signs, the records to keep, and declaring it.",
 seoTitle: "Can your employer pay you cash in hand? Yes, with 3 rules",
 category: "Work Rights",
 date: "29 July 2026",
 readTime: 5,
 body: `
Paying wages in cash is legal in Australia. No law requires a bank transfer. What is not legal is what usually travels with it: no tax withheld, no superannuation paid, no payslip. The payment method changes none of the employer's obligations, and each failure costs you, not them.

## What does a lawful cash arrangement look like?

Exactly like any other job, except the money is physical. Your employer still withholds PAYG tax at 15% with your TFN on file or 45% without, still pays 12% superannuation, still issues a payslip every pay period, still meets the minimum wage and the relevant award, and still pays penalty rates for weekends, public holidays and late nights.

If all of that happens and you are handed notes on a Friday, nothing is wrong. It is rare, but it exists in small family run venues that never moved to electronic payments.

## What does the unlawful version actually cost you?

Four things, all of them your loss rather than the employer's, which is why the arrangement is offered. Three are invisible until you need them.

**Your superannuation.** Twelve per cent of your wages, never paid. Over a six month hospitality season that is a four figure sum you could have claimed on departure.

**Your workers compensation position.** An off books worker injured in a kitchen or on a farm, which is where injuries happen, is in a genuinely difficult position.

**Your evidence for a second visa.** Specified work is demonstrated with payslips and payment records. Eighty eight days of cash farm work with no paper trail is eighty eight days you may not be able to prove.

**Your refund.** No withholding means nothing over-withheld, and over-withholding is where most backpacker refunds come from.

The employer saves money on all four. You carry all four.

## Do you still have to declare it?

Yes. All income earned in Australia is assessable regardless of how it was paid, and cash wages belong on your return the same as any other wages.

There is no income statement to lodge from, so the figures are reconstructed from your own records: bank deposits, a diary of shifts, rosters, messages arranging work, anything showing the rate agreed. See [declaring cash income on a tax return](/blog/cash-in-hand-tax-return) for how that is put together.

The ATO identifies undeclared income through bank data, industry benchmarking and third party reports, and the penalties for evasion are serious. Declaring reconstructed figures honestly is a far better position.

## What are the warning signs before you take the job?

They show up in the first conversation, not the first pay. An employer intending to do this properly asks for your TFN and hands you a declaration form.

- Cash is presented as the only option, with no bank transfer available
- You are asked not to mention the arrangement
- Payslips are not provided and are treated as unnecessary when asked for
- The rate is below the award, which in hospitality and horticulture it often is
- Nobody asks for your TFN or gives you a declaration form
- Super is not mentioned at all

The last two are the clearest tells. An employer who never asked for your TFN may well never have planned to report you.

## What records protect you?

Your own, because there will be nobody else's. Keep the date and hours of each shift, the rate agreed, the amount received, the employer's business name and address, and any messages or rosters.

Photographs of yourself at the workplace help, because the first thing disputed in an underpayment or unpaid super claim is whether you worked there at all. Unpaid super can be pursued years later through the superannuation guarantee charge process, and that claim turns on evidence the employment existed.

## Lawful arrangement or expensive one?

Cash itself is neutral. What decides whether you have a problem is what was and was not done alongside it.

- Whether tax was withheld and super paid. That is the whole difference.
- Whether you have any record of the shifts, which makes both the return and any claim possible.
- Whether you are relying on the work for second visa evidence, which raises the stakes.
- Whether the cash work sat alongside payroll work in the same year, the most common shape and the easiest to reconstruct.
- Whether you were injured during it, a separate and more urgent problem.
- How long ago it was, since unpaid super can be pursued well after the fact.

Cash income is declared alongside everything else in your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once the reconstructed figures are added to your payroll income.
 `,
 }, {
 slug: "fair-work-act-working-holiday-makers",
 title:
 "Fair Work Act Rights on a Working Holiday",
 description:
 "Visa status does not reduce your workplace rights. Minimum wage, protections from unfair treatment, and how to use the Fair Work Ombudsman for free.",
 category: "Work Rights",
 date: "17 February 2025",
 readTime: 5,
 body: `
The Fair Work Act 2009 applies to working holiday makers exactly as it applies to Australian citizens. Your visa changes nothing about minimum rates, penalty rates, notice of termination or protection from unfair dismissal. What varies is which award covers the job and how long you were in it.

## What does the Act actually guarantee?

A floor of minimum entitlements called the National Employment Standards, which apply to every employee regardless of visa status and cannot be contracted out of. They cover maximum weekly hours of 38 plus reasonable additional hours, annual leave and personal leave for permanent employees, public holidays, notice of termination, redundancy pay for qualifying employees, parental and community service leave, and a Fair Work Information Statement for every new employee.

Alongside them sits the wage floor: at least the national minimum wage, or the higher award rate where an award covers the job, which in the industries backpackers work in it almost always does.

## Which of those matter on a working holiday?

Only some of them, because most working holiday jobs are casual and short.

- The correct rate for your award and classification, which is where nearly all the money is
- Penalty rates for evenings, weekends and public holidays, since those are the shifts backpackers work
- The 25% casual loading, which should be visible on every payslip
- Notice of termination, or payment in lieu, when a permanent job ends
- Protection from being required to work unreasonable additional hours
- Superannuation at 12% of ordinary time earnings, paid on top of wages

Annual leave rarely accrues meaningfully because it needs a permanent role held for a substantial period. The wage and condition protections apply from the first shift, and from 1 July 2026 the national minimum is $26.44 an hour or $33.05 casual.

## What does the Fair Work Ombudsman actually do?

It enforces the Act, free of charge. It investigates complaints, mediates disputes, takes legal action against employers who breach the Act, publishes translated material for migrant workers, and runs targeted campaigns into industries with poor compliance records, repeatedly including horticulture and hospitality.

It is not a court and does not act on every complaint, but it is the correct first channel for underpayment. A complaint supported by rosters, payslips and messages is dealt with as a factual question rather than a legal argument, which is why the record keeping matters more than knowing the law.

## Does complaining put your visa at risk?

Not as such, and the belief that it does is a major reason underpayment of working holiday makers goes unreported.

Temporary visa holders have specific provisions allowing them to remain in Australia to pursue a workplace complaint, and visa status is not lawful grounds for retaliation. Reporting underpayment or unsafe conditions is an entitlement. If you have a specific visa concern, ask the Department of Home Affairs or a registered migration agent. The practical protections that matter are keeping records, raising issues in writing, and using the free Fair Work channels rather than accepting an informal cash settlement.

## Where does the Act not protect you?

Where you are not an employee. A contractor engaged under an ABN falls outside the Fair Work Act almost entirely: no award, no minimum rate, no penalty rates, no casual loading, no notice, no superannuation and no unfair dismissal protection.

That is why so much backpacker exploitation runs through ABNs. The label is not decisive: if the arrangement has the substance of employment, supervised, rostered, hourly paid and using the employer's equipment, it is employment whatever the paperwork says, and the entitlements follow. Our guide to [the employee versus contractor test](/blog/employee-vs-contractor-australia) sets out how it is decided.

## What is worth keeping while you are working?

Rosters, payslips and any written communication about hours or pay, saved somewhere that survives a lost phone. Rostering apps overwrite rather than archive, and a screenshot taken the week it happened is worth more than a recollection twelve months later.

Most underpayment claims are disputes about what actually happened, not about the law, and the person with the records generally prevails.

## Does the Act reach your particular job?

The Act covers you either way. What it is worth to you depends on how the job was structured.

- Whether you are an employee or engaged under an ABN, which decides whether any of it applies.
- Which award covers the employer and which classification you sit at, since that sets the rate.
- Whether you are casual or permanent, which decides loading, leave and notice.
- How long you were in the role, since notice and redundancy scale with service.
- Which hours you worked, because penalty rates are where the difference concentrates.
- Whether you kept rosters and payslips, which decides how straightforward any claim is.

Whatever was withheld from those pays reconciles in your [working holiday tax return](/tax-return) at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 }, {
 slug: "employer-not-paying-correctly",
 title:
 "Underpaid in Australia? How to Recover It",
 description:
 "Check your award rate, gather payslips, raise it in writing, then escalate to the Fair Work Ombudsman. The recovery path that works.",
 category: "Work Rights",
 date: "19 February 2025",
 readTime: 5,
 body: `
Work out the correct figure first, then raise it in writing, then escalate to the Fair Work Ombudsman if it is not fixed. Most recoveries settle at the first two steps. Underpayment claims run for six years, so leaving Australia does not forfeit the money.

## How do you establish what you should have been paid?

By finding the instrument that covers the job rather than comparing against the national minimum. Almost everyone skips that step, and a claim built without it understates the shortfall.

Identify the modern award or enterprise agreement covering the employer. Find the classification your actual duties correspond to. Apply the 25% casual loading if you are casual, then the penalty for each shift's day and time, then any allowance the award provides. Compare that against the payslips week by week rather than in aggregate.

Our guide to [reading an Australian payslip](/blog/how-to-read-a-payslip-australia-working-holiday) sets out what each line should show. A payslip showing one flat rate across a week containing a Sunday has already told you the penalties were not applied.

## Is it usually deliberate?

Often not, and starting from that assumption gets more money back faster. Small venue payroll is frequently set up once, by someone who is not a payroll specialist, and never revisited when award rates change on 1 July.

The reaction to the numbers distinguishes the two cases. An employer who corrects it and back pays had a configuration problem. One who becomes hostile, disputes your classification, or suggests your visa makes this complicated has told you what kind of situation this is. Stop negotiating and start documenting.

## How should you raise it?

In writing, once, factually. Set out the dates, the hours worked, what was paid, what should have been paid, and the award clause or rate you are relying on. Keep it short and free of accusation.

Writing gives a well intentioned employer something payroll can act on, and it becomes evidence if the matter goes further. A conversation at the end of a shift is neither.

## What does the escalation actually look like?

Four steps, and most cases end at the second. Check the number against the award. Ask in writing. If that fails, the Fair Work Ombudsman takes anonymous tip offs as well as full complaints, is free, can compel an employer to produce records and can recover wages. For clear cut amounts there is also a small claims track in the courts that handles wage claims without lawyers.

The Ombudsman route works best when the facts are documented, because it is a factual inquiry rather than a legal argument. Its powers include issuing compliance notices that require back payment, requiring written commitments and prosecuting serious cases.

## What records decide it?

Whatever establishes what you actually worked, which is almost always the disputed point. Payslips, rosters, the contract or letter of offer, messages about shifts and pay, a diary of hours worked and bank statements showing what was deposited.

Screenshot rosters when they are published, because rostering apps overwrite rather than archive. Where the employer never issued payslips, your own good faith records are accepted, and the failure to provide payslips is itself a breach.

## Does reporting put your visa at risk?

No, and this belief is the largest reason underpayment of working holiday makers goes unrecovered. Formal protections exist for temporary visa holders precisely because silence is the outcome the system is designed to avoid.

Temporary visa holders may remain in Australia to pursue a workplace complaint, visa status is not lawful grounds for retaliation, and the Fair Work Ombudsman maintains specific safeguards for migrant workers. What protects you is documentation, written communication and the free official channels rather than an informal cash settlement.

## What does recovered money do to your tax?

Back paid wages are assessable in the year you receive them, not the year you earned them, and should be reported through payroll with tax withheld like any other wage. Superannuation at 12% is owed on the corrected figure as well.

So an underpayment claim often has a super claim behind it. Our guide to [unpaid super](/blog/super-employer-not-paying-what-to-do) covers that side.

## What turns your complaint into a claim?

Whether you are owed anything, and how easy it is to recover, depends on the specifics of the job.

- Which award or enterprise agreement covers the employer, since that sets every figure.
- Which classification your duties actually correspond to, rather than your job title.
- Whether you are casual, which decides the 25% loading.
- Which hours you worked, since weekend, evening and holiday penalties are where most shortfalls sit.
- Whether payslips were issued at all, which shifts the evidential position in your favour when they were not.
- Whether you are engaged under an ABN, in which case no award applies and the classification itself is the claim.
- How long ago it happened, since underpayment claims run for six years.

Any wages eventually recovered are taxed in the year received and belong on that year's [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) from what you were actually paid.
 `,
 }, {
 slug: "leave-entitlements-working-holiday-visa",
 title:
 "Do Casuals Get Sick and Annual Leave? No",
 description:
 "Casual workers get a 25% loading instead of paid leave; part-time and full-time accrue both. What applies to your contract and what happens when you quit.",
 category: "Work Rights",
 date: "24 February 2025",
 readTime: 5,
 body: `
Casuals do not get paid sick leave or annual leave. They get a 25% loading on the hourly rate instead, which is the trade. Permanent full time and part time employees accrue four weeks of annual leave and ten days of personal leave a year. Which category you are actually in decides everything else.

## What do permanent employees accrue?

Under the National Employment Standards, full time employees accrue four weeks of paid annual leave and ten days of paid personal and carer's leave each year, part timers pro rata. Compassionate leave is two days per occasion, and public holidays are paid at base rate if you do not work and at penalty rates if you do.

Accrued annual leave that has not been taken is paid out in the final pay when the job ends. Working holiday makers most often leave that behind, because they resign expecting only hours worked and never check the last payslip against what had accrued.

## What do casuals get instead?

The 25% loading, applied to the award rate for every hour worked, in exchange for no paid leave and no notice of termination. From 1 July 2026 the casual minimum is $33.05 an hour, being the $26.44 national minimum with the loading applied, and most awards sit above that.

Calling in sick as a casual means an unpaid shift, with no accrual building quietly to be paid out later. The compensation was already paid hour by hour, which is why a casual payslip showing the bare base rate with no loading is an underpayment, not a rounding issue.

## How do you tell which one you actually are?

By how the work runs, not by the word on the contract. A genuinely casual arrangement has no guaranteed hours and a roster that varies, and either side can decline. A fixed weekly pattern of the same shifts over months, expected by both sides to continue, looks like part time employment whatever the paperwork says.

It is worth money in both directions. Someone labelled casual but working a fixed permanent pattern may be owed accrued leave. Someone labelled permanent but paid the casual loaded rate is a different problem again. Our guide to [full time, part time and casual](/blog/full-time-part-time-casual-australia) sets out how the categories are tested.

## What happens to leave when you quit?

Unused annual leave is paid out in full at your ordinary rate, plus any leave loading the award provides. Personal and sick leave is not paid out, and neither is anything a casual might feel they accrued.

For a working holiday maker in a permanent role for six months that payout can be meaningful, and it is a common exit underpayment because nobody checks. Read the final payslip line by line against your start date rather than trusting the total.

## How is a leave payout taxed?

As ordinary income in the year it is received, together with your other wages.

Anything withheld from it at the wrong rate is reconciled at assessment, which is a good reason not to close the Australian bank account when the job ends. Our guide to [tax on your final pay and leaving Australia](/blog/tax-obligations-after-leaving-australia) covers what else lands in that last payslip.

## Does long service leave ever apply?

Almost never. It generally requires seven to ten years with one employer depending on the state, well beyond what a 417 or 462 visa allows.

The exception is people who return to Australia repeatedly on other visas and stay with the same employer, where prior continuous service can count. The entitlement is then paid out on departure and taxed as income.

## Did anything accrue for you at all?

Your entitlements are decided by your employment category and by your award, both facts you can check today.

- Whether you are genuinely casual or working a permanent pattern under a casual label.
- Whether the 25% loading actually appears on your payslip, which is the first thing to check.
- Which award covers you, since annual leave loading and public holiday treatment vary by award.
- How long you were with a single employer, which decides whether meaningful annual leave accrued.
- Whether accrued leave was paid out in your final pay, and at the right rate.
- Whether you are engaged under an ABN, in which case none of these entitlements exist at all.

Leave payouts are taxed with the rest of your wages on your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 }, {
 slug: "what-is-a-tax-invoice",
 title: "Tax Invoices: The Required Elements",
 description:
 "Invoices of $82.50 or more need specific details to be valid, and GST lines only if registered. What to include and the mistakes that delay payment.",
 category: "ABN",
 date: "2 March 2025",
 readTime: 5,
 body: `
A tax invoice is the document you issue to a business to be paid for contracting work. It has to carry your name, your ABN, the date, a description of what you did and the amount. The ABN is the part with money attached: invoice without one and the business must withhold 47% before paying you.

## When do you have to issue one?

Whenever the sale is $82.50 or more including GST, and whenever the buyer asks for one. In practice most business clients require an invoice before their accounts system will release a payment at all, so the threshold is rarely the operative rule.

Issue one anyway for smaller jobs. It records what was agreed and delivered, settles payment disputes, and is the record your return is built from. An invoice takes two minutes in a notes app.

## What has to be on it?

Six things for someone not registered for GST, which is most working holiday makers doing delivery, farm or freelance work under an [ABN](/abn).

- Your name, and your business name if you trade under one
- Your ABN
- The date of the invoice
- A description of the services or goods provided
- The total amount payable
- Your contact details

If you are not registered for GST, do not put a GST line on it and do not head it "Tax Invoice". Adding 10% GST while unregistered is unlawful, and accounts departments catch it immediately. If you are registered, the GST amount has to be shown separately and the document is properly headed as a tax invoice.

## Why does the ABN on it matter so much?

Because of the no ABN withholding rule. Where an invoice carries no valid ABN, the paying business is required to withhold 47% of the payment and remit it to the ATO, leaving you with 53% of what you invoiced.

That withholding is taken into account when your return is assessed, but it can leave you short for months. Quoting the ABN on every invoice is the whole compliance requirement.

## How should you keep the records?

Sequentially and somewhere that survives a lost phone. Number invoices in order, save each as a PDF, and keep a simple list of date, client, amount and whether it was paid.

Keep them for five years, since that is the period over which the ATO can ask about a return. Where records are missing, contractor income has to be reconstructed from bank deposits, which is less accurate and harder to defend if the return is queried.

## Does invoicing mean you get no superannuation?

Usually, and that is the trade rather than an oversight. An employee has 12% superannuation paid on top of wages. A contractor is paid what the invoice says and nothing else.

Where the substance of the arrangement is employment, being supervised, rostered, hourly paid and working for one client with their equipment, the classification is wrong regardless of who issued an invoice, and superannuation and award rates are owed. That is sham contracting, and our guide to [the employee versus contractor test](/blog/employee-vs-contractor-australia) sets out how it is decided.

## What does invoicing change at tax time?

Everything about the timing. Nothing was withheld from any invoice you issued, so the tax on that income is owed in a single amount at assessment rather than absorbed pay by pay.

Invoiced income is generally taxed on the same basis as your wages for the year, with the rate depending on your individual circumstances, so the rate is not the surprise. Someone who invoiced $20,000 across the year and set nothing aside has a real bill, and someone who also had ordinary employment usually finds the withholding from those wages covers it.

## Employee or contractor changes everything here.

Invoicing is mechanical. What it means for you depends on how the work is structured, and none of that is visible from the invoices themselves.

- Whether you hold a valid ABN, since without one 47% is withheld from every payment.
- Whether you are registered for GST, which changes the document and adds a quarterly obligation.
- Whether the arrangement is genuinely contracting or is misclassified employment.
- Whether you kept copies, since the return is built from your records rather than from anyone's reporting.
- Whether you also had wages in the same year, whose withholding often absorbs the tax on the invoiced income.
- How much you set aside as you went, given nothing was taken out for you.

The combined position is worked out in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) to see whether the year lands as a refund or an amount owing.
 `,
 }, {
 slug: "can-you-work-for-multiple-employers",
 title: "Can you work two jobs on a working holiday visa? Yes",
 description:
 "Yes, you can work several jobs at once. The six month limit is per employer, and each job needs its own TFN declaration or it must withhold 45%.",
 seoTitle: "Two jobs on a working holiday visa? Yes, but watch the 45%",
 category: "Work Rights",
 date: "9 March 2025",
 readTime: 4,
 body: `
Yes. There is no limit on how many jobs a 417 or 462 visa holder can hold at once. The six month limit applies per employer, not overall. Each employer needs its own Tax File Number Declaration, because without one they must withhold at 45%.

## What does each new employer need from you?

Telling a manager your TFN, or showing them the letter, does not change payroll. Only the form does.

- Your TFN, the same number for every job
- A completed Tax File Number Declaration for that employer
- Your visa status and the tax free threshold question answered accurately for your situation, which we can talk through with you

The most common loss in a multi employer year: one job set up correctly and a second withholding at 45% for months because nobody completed a second form. Any excess is dealt with at tax time, but only after months without it.

## How does the six month rule interact with several jobs?

The six month restriction on 417 and 462 visas applies to each employer separately. Two years with one employer would breach it; two years across four employers would not.

Several industries and regions allow longer with the same employer. Our guide to [the six month employer rule](/blog/six-month-employer-rule-working-holiday-visa) sets out where the limit binds and where it does not.

## What happens to your tax with several jobs?

Which rate applies depends on your individual circumstances for the year, and the ATO makes the final call. Whatever each employer withholds, the income from all of them combines into one return, and our team reviews that as part of preparing it.

More employers make it likelier that one is set up wrongly, and a single job withholding at 45% or at foreign resident rates over-taxes you all season while the others look fine.

## What is the withholding trap in a multi job year?

Not under-withholding, but an over-withheld job you never noticed. One employer missing your declaration form, or not registered with the ATO as a working holiday maker employer, charges a rate you are not entitled to be charged.

Both can be addressed in the return, and both are invisible unless someone compares the withholding percentage across employers. Dividing tax withheld by gross for each job takes two minutes.

## What happens to super across several employers?

Each employer independently owes 12% on top of your wages, paid into whatever fund is nominated or stapled to you. Four jobs across a year often means more than one fund.

That matters at departure. Each fund holds a separate balance and each requires its own DASP claim, so remembering one fund and forgetting two leaves money in Australia permanently. Our guide to [finding lost super](/blog/how-to-find-lost-superannuation) covers tracing them before you fly.

## What should you keep track of?

A single line per job, written as you go, beats a shoebox of payslips collected later.

- Payslips from every employer
- Start and end dates for each
- The super fund used by each
- The withholding percentage each was applying

The forgotten job is almost always a short one, which is also the one most likely to have been withheld at the wrong rate.

## Where does this stop being straightforward?

At the point where one job is not employment at all. A year mixing wages with ABN contracting produces one return with two kinds of income, taxed at the same rates but with completely different withholding, and the wage side often absorbs the liability from the ABN side.

The other complication is a job that crossed 30 June. Wages are taxed in the year they were paid, not earned, so a job running from May to August splits across two returns and the withholding does not divide evenly. Both are worth flagging when the [tax return](/tax-return) is prepared rather than discovered afterwards.
`,
 }, {
 slug: "full-time-part-time-casual-australia",
 title:
 "Full-Time, Part-Time or Casual: Which Pays?",
 description:
 "Casual pays a 25% loading but no sick or annual leave. How the three employment types differ on pay, leave and job security for working holiday makers.",
 category: "Work Rights",
 date: "13 March 2025",
 readTime: 5,
 body: `
Casual work pays a 25% loading on the base rate and accrues no paid leave. Full-time and part-time pay the base rate and accrue annual and sick leave instead. All three are taxed on the same basis, so the choice is about pay shape and security, not tax.

## What does full-time employment mean in Australia?

Full-time means a regular pattern of ordinary hours, typically 38 a week, with a guaranteed schedule and the full set of entitlements under the National Employment Standards. There is no casual loading, because the leave is the compensation.

- Four weeks of paid annual leave a year
- Ten days of paid personal and carer's leave a year
- A guaranteed roster rather than offered shifts
- Notice of termination and access to unfair dismissal after the qualifying period

Few working holiday makers hold full-time roles, mostly because the six month employer limit sits awkwardly against a permanent job.

## What does part-time employment mean?

Part-time is full-time on fewer hours: an agreed regular schedule with every entitlement accruing pro rata. It is the least understood of the three and often the best deal on a working holiday visa.

A part-time worker on 25 hours a week accrues annual leave on those hours, paid out when the job ends. Over a settled six month block in one city, that payout can be worth more than the casual loading.

## What does casual employment mean?

Casual means no guaranteed hours and no leave accrual, compensated by a 25% loading on top of the base hourly rate. It is by far the most common arrangement for working holiday makers, particularly in hospitality, retail and harvest work.

- No annual leave or paid sick leave
- 25% loading on the base rate
- Shifts offered rather than rostered, and refusable
- Less security, more flexibility

The national casual minimum is $33.05 an hour from 1 July 2026: the national minimum wage of $26.44 plus the loading. A casual rate at or near the base rate means the loading is missing, which is an underpayment.

## How do you tell which one you actually are?

The contract should say, but where the two disagree the reality of the work decides. A fixed weekly roster is part-time employment whatever the paperwork calls it, and being labelled casual on an unchanging roster is a recognisable misclassification.

- A stated classification in the letter of engagement
- A fixed weekly schedule points to part-time
- Variable shifts week to week point to casual
- A 25% loading in the rate points to casual

After six months of a regular pattern, casual conversion rights can arise, which corrects a long running misclassification. Our guide to [shift cancellation rules](/blog/casual-shift-cancellation-rules-australia) covers what protection casuals have when a shift is pulled.

## Does the classification change your tax?

No. All three are taxed on the same basis, and the 25% casual loading is ordinary taxable wages. Superannuation at 12% is payable on all three from the first dollar.

What changes is the shape of your income, not the rate. At working holiday maker rates every pay is withheld at a flat 15% up to $45,000 for the year, busy fortnight or quiet one, and the year as a whole is settled in the [tax return](/tax-return) rather than in the pay.

## Which should you actually choose?

Casual suits most working holiday years: the loading, plus the freedom to leave without notice. If you are moving every few months the leave would mostly go unused, and the 25% is money now.

Part-time wins in one case: a settled block of five or six months in one city with a predictable roster. The accrued annual leave pays out at the end, the sick days are real, and the roster lets you sign a lease.

## Where does this genuinely change your money?

Three branch points, none about the label. Whether the 25% loading is actually in your casual rate, since a flat rate described as covering everything usually covers nothing. Whether your classification level under the relevant award matches the work, since a Level 1 rate for Level 2 duties costs more than the casual question ever will. And whether accrued leave was paid out when a part-time job ended.

A final pay that ends a part-time role should include the balance of untaken annual leave. It is the item most commonly left out when a backpacker gives notice and leaves the state a week later.
`,
 },

 // ─── MEDICARE & OTHER ────────────────────────────────────────────────────────
 {
 slug: "what-is-medicare-working-holiday-makers",
 title:
 "Medicare on a working holiday visa: are you covered?",
 description:
 "Most working holiday makers are not covered by Medicare. Nationals of 11 agreement countries get limited cover. Who qualifies, what it pays for, the levy.",
 category: "Medicare & Other",
 date: "20 July 2026",
 readTime: 6,
 body: `
Usually not. [Medicare](/medicare) covers Australian citizens and permanent residents, and a 417 or 462 visa does not make you either. The exception is your passport: eleven countries hold a Reciprocal Health Care Agreement with Australia, and their nationals get limited cover. Everyone else pays privately.

## What decides whether you are covered?

One fact, and it is your passport rather than your visa. Australia has Reciprocal Health Care Agreements with the United Kingdom, the Republic of Ireland, New Zealand, Sweden, the Netherlands, Finland, Norway, Belgium, Slovenia, Malta and Italy, and nationals of those eleven countries can enrol for limited Medicare benefits while their visa is valid.

If your passport is German, French, Japanese, Korean, Taiwanese, Canadian, American, Israeli, Spanish or anything else, there is no agreement and there is no Medicare. Check the [full agreement country list](/blog/countries-with-medicare-agreement-australia) rather than assuming, because people assume wrong in both directions.

## What does an agreement actually get you?

Less than the word Medicare suggests. Reciprocal cover is for medically necessary treatment, meaning something that arises while you are here and cannot reasonably wait until you go home. In practice that is a subsidised GP visit, public hospital treatment as a public patient, and prescriptions at the subsidised rate.

It does not cover ambulance transport, billed separately in most states and running into hundreds of dollars for a single trip. Nor dental, optometry, physiotherapy, elective procedures, private hospitals or, in most cases, pre-existing conditions. That is why British and Irish backpackers who technically have cover still commonly carry insurance, and why the ambulance gap is the most common expensive surprise.

## What does it cost if you are not covered?

You are treated as a private patient and you pay the published fee. A GP consultation is commonly $80 to $120. A specialist appointment runs from $200 upward. Prescriptions are full retail rather than subsidised. Public hospital emergency departments will treat you, but the follow up and any admission is chargeable.

Health insurance (condition 8501) can be a condition of either the 417 or the 462 visa, depending on your grant letter, and it is strongly recommended either way. A broken wrist falling off a ladder in a Mildura packing shed is a manageable expense with cover and a genuinely serious one without.

## How does this affect your tax?

Directly. The Medicare levy is 2% of taxable income charged to Australian residents for tax purposes; foreign residents pay none. A resident who is not entitled to Medicare can claim an exemption, and on $40,000 of taxable income that is about $800.

The exemption is not automatic. It has to be claimed on the [working holiday tax return](/tax-return) itself, with a Medicare Entitlement Statement in hand, and that is needed separately for each financial year. Most people only learn this when the return is already due, which is why it is often missed. We handle it as part of preparing your return.

## Does having private insurance change the exemption?

No. The exemption turns on whether you are entitled to Medicare, not on whether you bought anything else. Private cover neither creates an exemption nor removes one.

The mirror of that is more painful. A British or Irish traveller who never enrolled in Medicare and never used it is still generally entitled to it, and entitlement is what the exemption tests. The levy applies.

## Your passport decides both halves of this.

Coverage and the levy exemption are decided by the same fact, your passport, and they move in opposite directions.

- Your passport, which is the whole question. Eleven countries in, everyone else out.
- Whether you enrolled part way through the year, which produces a partial exemption for the days you were not covered rather than an all or nothing result.
- Whether the supporting evidence was in place when the return was prepared.
- Whether you hold dual nationality. The agreement follows the passport you are here on, and a second passport can change the answer completely.
- Whether you already lodged a year without claiming it, since the levy can usually be recovered by amending the return, generally within two years of the original lodgement.

The exemption is claimed as part of your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) with and without it to see what it is worth on your income.
 `,
 }, {
 slug: "countries-with-medicare-agreement-australia",
 title:
 "Medicare reciprocal countries: the 11 with an agreement",
 description:
 "The 11: the UK, Ireland, New Zealand, Sweden, the Netherlands, Finland, Norway, Belgium, Slovenia, Malta and Italy. What the cover includes, and the levy.",
 seoTitle: "Medicare reciprocal countries: all 11, and what is covered",
 category: "Medicare & Other",
 date: "29 July 2026",
 readTime: 5,
 body: `
Eleven. Australia holds Reciprocal Health Care Agreements with the United Kingdom, the Republic of Ireland, New Zealand, Sweden, the Netherlands, Finland, Norway, Belgium, Slovenia, Malta and Italy. Nationals of those countries on a valid working holiday visa can access limited [Medicare](/medicare) benefits. Nationals of every other country cannot.

## Which countries are on the list, and which are not?

The eleven named above are the whole list, as published by [Services Australia](https://www.servicesaustralia.gov.au/reciprocal-health-care-agreements). Nothing regional or linguistic holds them together, so read it rather than guess. Cover for Italian and Maltese nationals is narrower than for the others: for Italy it runs for up to six months from arrival.

The countries people most often assume are on it and are not include Germany, France, Spain, Canada, the United States, Japan, South Korea, Taiwan and Hong Kong. Germany and Japan matter most in practice, being large working holiday populations whose travellers assume a European or developed country reciprocity that does not exist.

## What does the cover actually include?

Medically necessary treatment as a public patient: a condition that arises during your stay and cannot reasonably wait until you go home. That covers a GP consultation at the subsidised rate, treatment in a public hospital as a public patient, and prescriptions at the subsidised rate under the Pharmaceutical Benefits Scheme.

It is a safety net rather than health cover, and the exclusions are where people get caught.

- Ambulance transport, which is billed separately in most states and runs to hundreds of dollars for a single trip
- Dental treatment of any kind
- Optometry, glasses and physiotherapy
- Most specialist consultations
- Private hospital treatment
- Elective and cosmetic procedures
- Pre-existing conditions, in most cases

The ambulance gap surprises British and Irish travellers most, because it does not exist at home. A single trip after a fall on a farm outside Bundaberg is a bill, agreement or no agreement.

## Is enrolling worth it?

If you are eligible, usually yes. Enrolment is done with Services Australia, and the card is valid for the eligible period of your visa. It makes a bulk billing GP free at the point of use rather than a hundred dollar consultation. It does not replace insurance.

Enrolment also bears on your levy position, so keep the date you enrolled and tell us when we prepare your return.

## What does an agreement do to your tax?

The 2% Medicare levy applies to Australian residents for tax purposes, and a resident can claim the exemption only if not entitled to Medicare. Entitlement is what an agreement creates, so an agreement passport generally removes your ability to claim the levy exemption, whether or not you ever enrolled and whether or not you ever saw a doctor.

For a traveller from a country with no agreement, the [levy exemption](/blog/medicare-levy-working-holiday-makers) may be available: the levy is 2% of taxable income, so where an exemption applies it removes that 2%. For a British or Irish traveller the levy usually applies. Same income, same visa, different passport, different assessment. Whether the 2% stays or comes off is settled on your [working holiday tax return](/tax-return), and for a passport not on the list it needs a Medicare Entitlement Statement.

## More than your passport decides this.

The eleven country list is fixed, but what it means for you depends on more than which passport you carry.

- Your passport, which is the entire test for the health cover and most of the test for the levy.
- Dual nationality, which can flip the answer completely and is worth raising rather than assuming the visa passport governs.
- Whether you enrolled, and when. Enrolment part way through a year can produce a partial levy exemption for the days before it.
- Which state you are in, since ambulance cover is state based and is the largest gap in reciprocal cover everywhere.
- Whether you have a pre-existing condition, which is generally outside the agreement even for the eleven.

The levy position is settled when you lodge your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) to see what the 2% is worth on your income either way.
 `,
 }, {
 slug: "medicare-levy-working-holiday-makers",
 title:
 "Do working holiday makers pay the Medicare levy?",
 description:
 "Usually not: foreign residents pay no levy, and residents not entitled to Medicare can claim the 2% exemption. It is not removed automatically. How it works.",
 seoTitle: "Do working holiday makers pay the Medicare levy? Usually not",
 category: "Medicare & Other",
 date: "20 July 2026",
 readTime: 6,
 body: `
Usually not. The 2% Medicare levy follows tax residency: foreign residents for tax purposes pay none, and a resident who is not entitled to Medicare, as most 417 and 462 holders are not, can claim an exemption. On $40,000 of taxable income that is about $800. It is not applied automatically and it is not removed automatically either, which is where the money is lost.

## What decides whether you get the exemption?

Your passport, and one piece of paper most backpackers never learn exists. Entitlement to Medicare is the test, and it comes from holding a passport from one of the eleven Reciprocal Health Care Agreement countries: the United Kingdom, Ireland, New Zealand, Italy, Malta, the Netherlands, Belgium, Finland, Norway, Sweden and Slovenia.

Whether the exemption applies to you depends on your individual circumstances and is assessed case by case. It is not something to assume either way.

## What is the piece of paper?

A Medicare Entitlement Statement is the kind of evidence used to support an exemption claim for a given period, and a separate one is needed for every financial year. Most people only find out it exists when the return is already due. We take care of this for you as part of preparing your return.

## How much is it actually worth?

Two per cent of taxable income, so it scales with earnings rather than being a flat amount. At working holiday income levels it is worth the paperwork.

- $35,000 earned: about $700
- $45,000 earned: about $900
- $60,000 earned: about $1,200

Below about $28,000 of taxable income no levy is charged for 2025-26 (the ATO low income threshold for a single person is $28,011), so the exemption matters above that.

That money is dealt with at assessment rather than on your payslip, because the levy is assessed at year end rather than withheld pay by pay.

## What if you are from an agreement country?

Then the answer usually goes the other way. If you hold a passport from one of the eleven agreement countries you are generally entitled to Medicare whether or not you ever enrolled and whether or not you ever used it. Entitlement is the test, not use.

The exemption is therefore off the table for most British and Irish travellers, and the levy applies as part of the assessment. Partial cases remain: someone whose entitlement began part way through the year can be exempt for the days they were not entitled, and the dates have to be right.

## What if you already lodged without claiming it?

It can usually be addressed by amending the return. The general amendment window is two years from the date the original assessment issued, so a first year backpacker who lodged in the previous October is often still inside it.

It is worth checking for anyone who lodged their first Australian return themselves: the levy exemption is one of the items that is easy to miss on a self lodged return. Check every year separately, since a two year stay is two returns, two statements and two possible amendments.

## Can you claim the exemption at all?

The exemption is worth about $800 on $40,000 of taxable income, but whether you can claim it at all turns on facts you already know.

- Your passport, which decides entitlement and therefore the whole question.
- Whether you enrolled in Medicare part way through the year, which produces a partial exemption for the days you were not covered.
- Whether the supporting evidence was in place, which is why this is often missed.
- Whether you hold dual nationality, since the agreement follows the passport, not the visa.
- How many financial years your stay spans. Each year needs its own statement and its own claim.
- Whether a prior year was lodged without it, which is usually amendable within two years.

The exemption is claimed as part of your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) to see what the 2% is worth against your own income.
 `,
 }, {
 slug: "tax-file-number-declaration-form",
 title:
 "The Two Boxes on the TFN Declaration Form",
 description:
 "The residency and tax-free threshold questions affect your withholding rate. Why the answers matter and why it is worth having them reviewed.",
 category: "TFN",
 date: "2 April 2025",
 readTime: 5,
 body: `
The Tax File Number Declaration is the form you give a new employer so they can withhold at the right rate. A few answers on it set your tax, including your residency status and whether the working holiday maker rate applies. Everything else is identification.

## Why does this form decide more than the TFN itself?

Because the employer's payroll reads the form, not your intentions. Without a completed declaration on file the default is 45% withholding, which on a $1,000 week is $450 withheld. Where the working holiday maker rate applies it is 15% on the first $45,000, and only the form triggers it.

So the declaration, not the [TFN application](/tfn), is where the money is decided. It is handed to you on your first day, usually when you are least equipped to think about it.

## What do the answers do?

Each moves the rate to a different place, and some wrong combinations create a debt rather than a delay.

- The working holiday maker answer is what produces the 15% rate where it applies. Which answer fits depends on your individual facts.
- Other answers lead to different withholding, and the difference is settled when the return is assessed.

A wrong combination can mean over withholding or an amount owing later. Which answers are right depends on your individual facts, and our guide to [the tax free threshold and working holiday visas](/blog/tax-free-threshold-working-holiday-visa) explains why it is worth having it reviewed.

## What if your TFN has not arrived yet?

You can still complete the declaration, and that is the point of the 28 day window. Recording that an application is in progress, with the reference number, avoids starting at 45% on day one.

Say nothing and the higher rate applies immediately, and every week at 45% is a week of wages withheld at the higher rate until the return is assessed. Our guide to [working before the TFN arrives](/blog/tfn-reference-number-before-tfn-arrives) covers what to give the employer in the meantime.

## Does one form cover every job?

No. Every employer needs their own declaration, including short casual roles and a two week harvest job. A TFN given to one payroll is not shared with another.

This is why multi employer years go wrong so often. Four jobs means four declarations, and the one never completed is usually the one withholding at 45%.

## What does the residency question on the form actually ask?

The same question that later shapes your tax, asked at the worst possible moment. Residency for tax purposes is not immigration residency. It depends on your own circumstances, it has to be properly reviewed, and it is rarely as obvious as the form makes it look.

Which answers apply depends on the individual facts of your year, and calling it wrongly can be expensive in either direction. The ATO makes the final decision, and our team reviews it as part of preparing the return. Our guide to [tax residency for working holiday makers](/blog/tax-residency-working-holiday-makers) covers why it is not a question to answer on instinct.

## What if it was filled in wrong?

Submit a corrected declaration to the employer. Payroll updates from that point forward rather than retrospectively, so the correction fixes future pays and the earlier difference is settled through the return.

Where too much was withheld, it is accounted for when the return is assessed. Where too little was withheld because the threshold was claimed, the shortfall is payable. Check the next payslip after any correction.

## What was true the day you signed it?

The form is short. What it costs you depends on your circumstances at the moment you signed it.

- Whether the working holiday maker box was ticked, which is the single field that produces the 15% rate.
- Whether the tax free threshold was claimed, since an answer that does not fit your situation can build a debt rather than a refund.
- Whether your TFN had arrived, and whether an application in progress was recorded with its reference number.
- How many employers you gave a declaration to, since each is separate.
- Whether the employer is registered with the ATO as a working holiday maker employer, because an unregistered one withholds at foreign resident rates regardless of your form.
- Whether your residency position is genuinely as simple as the form assumes.

Any over withholding is reconciled in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) to see what a wrongly completed form actually cost.
 `,
 }, {
 slug: "what-does-tax-withheld-mean-payslip",
 title:
 "Tax withheld meaning: is 15% right on your payslip?",
 description:
 "Tax withheld is the income tax your employer holds back from your pay for the ATO, often about 15% on a WHV. How to check it, and what 30% or 45% means.",
 seoTitle: "What does tax withheld mean on a payslip? The 15% check",
 category: "Tax Return",
 date: "20 July 2026",
 readTime: 5,
 body: `
Tax withheld is the income tax your employer sends to the ATO out of your gross pay before the rest reaches your account. On a working holiday visa it is commonly about 15% of gross earnings up to $45,000. Divide the tax withheld by the gross figure on your payslip and you will often get roughly 0.15.

## What are the three numbers on a payslip and how do they relate?

Every compliant Australian payslip shows gross pay, tax withheld and net pay: the first minus the second equals the third. Gross is what you earned, tax withheld is what your employer forwarded to the ATO, net is what lands in your account.

Tax withheld is a prepayment, not a final bill. It is an estimate collected pay by pay against a liability calculated once, at the end of the financial year, across your whole income. Over-withholding produces a refund; under-withholding produces a bill.

## How do you check the rate is right?

Divide tax withheld by gross pay on any single payslip. A working holiday maker with a Tax File Number Declaration correctly completed and a properly registered employer should land near 0.15.

- Gross $600 a week: about $90 withheld
- Gross $900 a week: about $135 withheld
- Gross $1,200 a week: about $180 withheld
- Gross $2,000 a week: about $300 withheld

Do it on more than one payslip, and on each employer separately. The common pattern is not a payslip that is wrong across the board, it is one employer correct and another quietly wrong for months.

## What does each wrong percentage mean?

The percentage tells you which rule went wrong, and each one has a different cause and a different fix.

**Around 45%.** Your Tax File Number Declaration has not reached payroll, or the 28 day window lapsed without your TFN. The most expensive and the most common. It resolves the moment the declaration is on file, from the next pay run onward.

**Around 30% or a bit above.** Your employer is not registered with the ATO as an employer of working holiday makers, so they are applying foreign resident rates. This is not your mistake and there is nothing on your declaration form to fix. The excess is taken into account when your return is assessed.

**Noticeably under 15%, or close to nothing on ordinary wages.** The tax free threshold may have been claimed on your declaration. It is the only one on this list that creates a debt rather than a refund, because too little was withheld all year and the shortfall is payable at assessment.

**Nothing at all, with no super line either.** You are being paid outside payroll, whatever anyone called it. There is no withholding to reclaim and no income statement to lodge from, and the income is still declarable.

A payslip showing 45% or 30% where 15% was due is exactly what a [working holiday tax return](/tax-return) reconciles. Keep it, because it shows the employer and the period.

## Where does the money go once it is withheld?

Your employer holds it briefly and remits it to the ATO on their own reporting cycle, then finalises the totals at year end as your income statement. That statement is what your return is built from, not your payslips.

If an employer never finalises, or finalises with figures that do not match what you were paid, your payslips are the only evidence of the difference. That is the whole argument for keeping them.

## Why keep payslips if the ATO already has the data?

Because the ATO has what the employer reported, which is not always what you were paid. Payslips are how a discrepancy gets resolved, and they are the only record that shows super separately from tax, the line most likely to be missing entirely.

Payroll errors on backpacker wages are not rare and not usually malicious. They cluster in small single site operators, in farms and packing sheds using casual paper systems through a harvest, and in venues where one person does payroll around everything else. Keeping the emailed payslips in one folder settles the question later.

## Why does your payslip read differently?

The 15% benchmark is what employers commonly apply to working holiday makers, so a payslip that reads differently is telling you something about your own setup. These situations produce a different percentage, and they do not all point the same way.

- How many employers you had. Each is a separate declaration, a separate rate and a separate income statement, and over-withholding is usually concentrated in one of them.
- Whether any employer was unregistered as a working holiday maker employer, which produces foreign resident withholding you cannot fix on your end.
- Whether the tax free threshold was ticked. This is the branch that produces a bill rather than a refund.
- Whether any of your income was ABN work, where nothing is withheld at all and the tax is settled entirely at assessment.
- Whether a period ran before your TFN was on file, which puts a block of pays at 45% and concentrates any over-withholding there.

Anything withheld above what you actually owed is accounted for in your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 }, {
 slug: "what-is-an-income-statement",
 title:
 "What Is an Income Statement in Australia?",
 description:
 "The income statement replaced the paper payment summary. Your employer files it through payroll reporting, and it is only final once marked as tax ready.",
 category: "Tax Return",
 date: "20 April 2025",
 readTime: 4,
 body: `
You get one income statement for each employer, for each financial year, and it carries the two numbers your return is built on: gross pay and tax withheld. It is the digital successor to the PAYG payment summary that used to arrive on paper. Nobody hands it to you now: it sits in ATO systems, and a working holiday year with five employers produces five of them.

## Where does an income statement come from?

It comes from your employer's payroll software, not a form anyone fills in at the end of the year. Under Single Touch Payroll every pay run reports your gross wages, the tax withheld and your superannuation to the ATO as it happens, and the income statement is the accumulated total.

The record therefore belongs to the ATO's systems rather than to your former employer. A farm in Mildura that no longer answers emails has already reported your wages, and the figures can be retrieved without them.

## When does it become usable?

The year ends on 30 June and employers must finalise by 14 July, so most income statements are tax ready by mid to late July. Until an employer finalises, the statement shows year to date figures not yet declared complete; the status changes to tax ready once they do.

Lodging against a statement that is not tax ready is a reliable way to get a wrong assessment and an amendment later. The figures can still change, and then the return no longer matches what the ATO holds. Waiting until every employer has finalised beats lodging in the first week of July.

## What are the three numbers to check?

Gross payments, tax withheld, and the super shown alongside them. Those three tell you whether your year was taxed the way it should have been.

- **Gross payments.** Compare against your own running total from payslips. A gap means either a missing pay period or an underpayment.
- **Tax withheld.** Divide it by gross. Around 15% is what a registered employer commonly withholds from a working holiday maker. Substantially more means a period without your TFN on file, or an employer who never registered.
- **Super.** Employers generally pay within seven business days of payday from 1 July 2026 (quarterly before that), so a figure that looks light may simply not have reached the fund yet.

## What if an employer is missing?

A missing employer is the most common defect and it has three causes. The employer may not have finalised yet, in which case waiting resolves it. They may have reported you under a wrong name or date of birth, so the record exists but is not attached to you. Or they may never have reported the wages at all, which is the cash in hand case.

Either way, the income you earned is taxable and belongs in the return whether or not a statement exists for it. Our guide to [lodging with cash income](/blog/cash-in-hand-tax-return) covers reconstructing a period where no record was filed.

## What if the figures are wrong?

Errors in the statement are corrected by the employer, not by adjusting the return to match your payslips. Common ones are a gross total that does not reconcile, a withholding figure that reflects the wrong residency status, and duplicated pay periods after a payroll system change.

Where an employer is responsive, a correction is usually made within a pay cycle or two. Where they are not, the return can be lodged on a properly supported estimate and amended once the reporting is fixed, within the two year window. What does not work is quietly using a figure the ATO does not hold, which is the mismatch that puts a return into manual review.

## What decides how complete your return is?

Whether every employer for the year has been identified, and nothing else comes close. A working holiday year commonly runs to three, four or five employers across two states and often two financial years, and the forgotten one is almost always the short one: three weeks of packing in February, a fortnight of promotional work, an agency shift.

Lodging without accounting for every one is the most common self lodgement error, and it cuts both ways. A forgotten employer with heavy withholding is money you may never have claimed. A forgotten employer with income you did not declare is an amendment and an interest charge later. When we prepare a [tax return](/tax-return) the full list is pulled from ATO systems first, because memory is unreliable about a year spent moving.

## What should you keep yourself?

Keep payslips, bank statements showing wages arriving, and anything in writing about your pay rate. The income statement tells you what was reported. Your own records are the only thing that tells you whether what was reported is what you were owed.

That matters most in farm work and hospitality, where the reported figure can be perfectly accurate as a record of an underpayment. The return is prepared on the reported figures either way, but the gap is worth knowing, because recovering it through Fair Work is a separate and free process.
`,
 }, {
 slug: "what-is-the-ato",
 title:
 "What is the ATO? The Australian Taxation Office explained",
 description:
 "The ATO is the Australian Taxation Office, the federal agency that runs the tax system. It issues your TFN, processes your return and releases your super.",
 category: "Medicare & Other",
 date: "29 July 2026",
 readTime: 4,
 body: `
The Australian Taxation Office is the federal agency that runs Australia's tax system. For a working holiday maker it does four things: it issues your TFN, it receives what your employers and super funds report about you, it processes your tax return and pays the refund, and it releases super after you leave.

## What does the ATO actually do that affects you?

Everything routes through your Tax File Number. The ATO issues it, then uses it as the thread connecting every wage report, every super contribution, every bank interest payment and every return you lodge.

Its wider remit covers income tax, GST, the business register and the superannuation guarantee system. Almost none of that touches a backpacker directly.

## How does the ATO know what you earned?

Automatically, before you tell it anything. Employers report your wages and the tax withheld with every pay run through single touch payroll, super funds report contributions made for you, banks report interest on Australian accounts, and share registries report dividends.

That is why a return can be lodged from another country without a single payslip. It is also why an employer who never finalised their reporting creates a real problem: the income exists, you know about it, and the ATO's record does not show it. Your payslips close that gap.

## When would the ATO contact you?

Most working holiday makers never hear from it. The reasons are narrow: it needs more information to process a return, its figures do not match what was declared, tax is owed and unpaid, identity verification is holding up a refund, or, rarely, a review has been opened.

Legitimate contact comes by post, through your myGov inbox, by SMS or email that never asks you to click a link to log in, or through a tax agent acting for you. So an out of date address matters: a letter you never saw is still a letter you were treated as having received.

## How do you tell a real contact from a scam?

By what is being asked for and how urgently. The ATO does not phone demanding immediate payment, does not accept payment in gift cards or cryptocurrency, does not threaten arrest or deportation, and does not ask you to stay on the line while you go to a shop.

Working holiday makers are targeted specifically: you are new to the country, unsure what is normal, and the threat of a visa problem is credible in a way it would not be to a local. Hang up and check independently.

## What is the ATO's role in getting your super back?

Gatekeeper rather than payer, in most cases. When a departing Australia superannuation payment is claimed, the ATO verifies that your visa has ceased and that you have left, then the claim passes to your super fund, which applies the 65% withholding and releases the balance.

The exception is super the ATO already holds. Where a fund lost contact with you, the balance is transferred to the ATO as unclaimed super and the ATO pays it directly. Anyone who left without updating an address may be in that position. Either route is set out where you [claim your superannuation after leaving Australia](/superannuation).

## Your records decide how smoothly this goes.

What decides whether those four routine interactions go smoothly is the state of the records the ATO holds about you.

- Whether the address and bank details the ATO holds are current.
- Whether every employer finalised their reporting.
- Whether you still have access to any online account you set up, which becomes a problem once you are overseas.
- Whether your super sits with funds or has already been transferred to the ATO as unclaimed.
- Whether you have prior years that were never lodged, which the ATO's records will still show.

Your annual reconciliation with the ATO is your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) before lodging anything.
 `,
 }, {
 slug: "gross-pay-vs-net-pay-australia",
 title:
 "Gross vs Net Pay: Where the Money Goes",
 description:
 "Gross is before tax, net is what lands in your account. About 15% commonly sits between them on a WHV, and super is paid on top, not out of your wages.",
 category: "Tax Return",
 date: "10 May 2025",
 readTime: 4,
 body: `
Gross pay is what you earned before tax. Net pay is what reaches your bank account. On a working holiday visa with a TFN on file, commonly about 15% of gross sits between the two. Superannuation is not part of that gap: it is paid on top of your wages, into a fund, not deducted from them.

## What do the numbers on your payslip actually mean?

An Australian payslip separates four figures, and confusing any two of them is how people conclude they have been underpaid when they have not.

- **Gross pay**: total earnings before anything is taken out
- **Tax withheld**: PAYG sent to the ATO in your name
- **Net pay**: gross minus tax withheld, the amount transferred to you
- **Super**: a separate line, paid by the employer into your fund

On $1,000 of gross wages at a registered working holiday maker employer, $150 is withheld at 15%, $850 lands in your account, and $120 of super at 12% goes to your fund. The super never appears in the $850 and never should.

## Why is superannuation not a deduction?

Superannuation is an employer cost on top of your wage, not a slice of it. It is calculated on your gross ordinary earnings at 12% and paid into a fund in your name, and your gross pay is the same whether the employer pays it or not. This is the most common misreading of an Australian payslip we see.

If a payslip shows super subtracted from gross to arrive at a lower gross, that is not a presentation quirk. It means a payroll error, or an employer treating a wage as though it already included super, which changes what you are owed. Our guide on [unpaid super](/blog/super-employer-not-paying-what-to-do) covers what to do about it.

## Which figure does your tax return use?

Your tax return and income statement both use gross pay, never net. The ATO calculates your liability on gross earnings, then credits the tax already withheld, and the difference either way is your refund or your bill. Net pay appears nowhere in the calculation.

This catches people tracking their year in a banking app. The figure reaching your account is roughly 85% of the number the ATO will use, so the year always looks smaller from the bank side.

## What decides how much of your gross you actually keep?

Three facts about your year decide the gap. The withholding rate is the biggest: 15% with a TFN on file at a registered working holiday maker employer, 45% without one, and foreign resident rates if the employer never registered as a WHM employer. Each produces a very different net figure on the same gross.

- **Whether your TFN was on file from day one.** Weeks at 45% before the declaration form was processed show up as much thinner net pay, and the excess is dealt with at tax time rather than in the pay run.
- **Whether the employer is ATO registered to employ working holiday makers.** An unregistered employer withholds at foreign resident rates, higher than 15% from the first dollar.
- **Whether penalties, loading and allowances were paid at all.** A casual rate that quietly omits the 25% loading lowers gross before withholding enters the picture, and that loss does not come back in a refund.

## How can you check the gross figure is right?

Rebuilding gross from first principles takes about five minutes, and it is worth doing once per employer while you still remember the shifts.

1. Ordinary hours multiplied by your hourly rate
2. Plus penalty rates for weekend, evening and public holiday shifts
3. Plus allowances such as uniform, tool or travel
4. Plus overtime at the correct rate
5. Compare the total against the gross line on the payslip

Where the numbers do not reconcile, the cause is usually a classification one level too low under the award rather than deliberate theft. Raise it in writing with payroll, because that is the version employers fix quickly.

## Where does this stop being a payslip question?

It stops being one the moment the gap between gross and net is caused by your tax position rather than by arithmetic. Over-withholding at 45%, an unregistered employer, a Medicare levy charged to someone not entitled to Medicare, and a residency item answered wrongly all shrink net pay during the year and are all recovered, or not, on the return.

The payslip shows the amount taken and says nothing about whether it should have been. Working out which of those applied to your year is what a [tax return](/tax-return) is for, and it is why two backpackers with identical gross pay can end up a long way apart.
`,
 }, {
 slug: "do-working-holiday-makers-pay-tax-on-tips",
 title: "Are Tips Taxable in Australia? Yes",
 description:
 "Cash and card tips both count as assessable income. How tips flow through payslips, what the ATO expects you to declare, and record-keeping that suffices.",
 category: "Tax Return",
 date: "13 May 2025",
 readTime: 4,
 body: `
Yes. Tips are assessable income in Australia whatever form they arrive in, taxed alongside your wages. What varies is who reports the money, and that depends on how the tip reached you.

## Which tips are already reported for you?

Anything that passes through the venue's till. Card tips, service charges added to a bill and pooled tips distributed through a tronc arrangement all run through payroll, so PAYG is withheld at the time and the amounts appear in your end of year income statement with the rest of your wages.

The reporting and the tax are already done on that portion. Check a payslip: a venue that says it distributes tips and shows nothing on any payslip is worth a question.

## Which tips are yours to declare?

Cash handed to you directly. Nobody records it, no PAYG is withheld, and it does not appear in your income statement. The obligation to declare it at the end of the financial year sits with you.

The amount decides how much this matters. A quiet suburban cafe generates almost nothing in cash tips and the question is academic. A busy city bar on Friday and Saturday nights can generate a meaningful sum across a season, and there it becomes real money on the [tax return](/tax-return).

- Cash tips from customers: your responsibility, no tax withheld at the time
- Tips split at the end of a shift in cash: same treatment, still declarable
- Card and tronc tips: reported through payroll, nothing further to do

## What records do you actually need?

A running total. The ATO does not expect every individual tip logged. A weekly figure noted somewhere durable, with the date and the venue, satisfies the record keeping requirement.

The alternative is guessing in October about a season that ended in March. People who declare nothing are rarely dishonest; they have no idea what the figure was and zero looks safest. A note on a phone fixes that.

## What happens if you do not declare cash tips?

Not an audit letter the week after you lodge. Hospitality is a data matched industry, and undeclared income surfaces later through venue level reporting and bank deposit patterns.

The consequence when it does surface is the tax that should have been paid plus a shortfall penalty and interest, applied to the year in question. The tax on a declared season of tips is smaller than most people assume. For anyone planning a second or third year, an unresolved ATO position is a loose end in every future dealing with Australian government systems.

## Does super get paid on tips?

Sometimes, and it turns on the same distinction. Tips distributed through the employer's payroll can form part of ordinary time earnings, in which case 12% [super](/superannuation) is payable on them. Cash handed over by a customer is not paid by the employer, so no super obligation attaches.

Where it lands depends on the award and how the venue has classified the payments, which a payslip will not tell you. The useful check is whether your super contributions look consistent with your total earnings including tronc distributions, because a gap there is the same conversation as any other case of [super not being paid](/blog/super-employer-not-paying-what-to-do).
`,
 }, {
 slug: "tax-obligations-after-leaving-australia",
 title:
 "Tax after leaving Australia: what you still need to do",
 description:
 "Leaving Australia does not close your tax file. Your final return, super claim and any ABN cancellation are still open, and all can be done from overseas.",
 category: "Tax Return",
 date: "15 May 2025",
 readTime: 5,
 body: `
A boarding pass is not a tax event. Everything you built up while working in Australia sits with the ATO after you fly out: a return for every financial year you earned income in, a super balance nobody claims on your behalf, an ABN that stays registered until you cancel it. None of it requires you to be in the country, and none of it expires because you left.

## What is still outstanding once you have gone?

Four things, independent of each other, so doing one does not clear the others. The final return has to be lodged, the [superannuation](/superannuation) claimed, any [ABN](/abn) cancelled, and the ATO needs contact details that still reach you.

- Lodge a return for every Australian financial year in which you had tax withheld from your pay or otherwise need to lodge
- Claim your super through the Departing Australia Superannuation Payment
- Cancel any ABN you registered as a sole trader
- Keep an email address and a bank account that still work

The ATO holds your income records from every employer regardless of where you are, so a year that goes unlodged does not go unnoticed. It sits open.

## How does lodging from overseas actually work?

The same return, prepared the same way, from a different postcode. Income statements come from ATO systems rather than from your former employers, which matters because chasing a Queensland packing shed for paperwork from Berlin is not a realistic plan.

The standard deadline is 31 October following the end of the financial year. Returns lodged through a registered agent can have a later deadline, usually into the following May, but only where you were on the agent's list before 31 October. Our guide to [lodging from overseas](/blog/how-to-lodge-tax-return-from-overseas) covers the mechanics.

## When can you claim your super?

The DASP claim opens once two conditions are both met: your visa has ceased to be in effect, and you have left Australia. Not one or the other. Leaving while the visa is still live means waiting for it to expire or be cancelled before the claim can proceed.

The payment is withheld at 65% for working holiday maker contributions, so a $10,000 balance pays out about $3,500. The ATO says it is generally paid within 28 days of a complete application, and the net amount can be paid to an Australian or an overseas account depending on the fund. Our [superannuation guide](/superannuation) covers the process and the documents.

## What happens if you leave the super sitting there?

Once at least six months have passed since you left and your visa ceased, a fund holding an unclaimed balance transfers it to the ATO as unclaimed super. The money is still yours and can be claimed at any time, but the claim becomes an ATO claim rather than a fund claim, and the ATO pays it only to an Australian bank account in your name or by cheque.

What genuinely costs people money is having several funds and claiming from only the one they remember. Four employers across a year often means more than one fund, each holding a separate balance that needs a separate claim. Our guide to [finding lost super](/blog/how-to-find-lost-superannuation) covers tracing them.

## Can you lodge before 30 June if you are leaving for good?

Sometimes. If you are leaving Australia permanently and will have no further Australian income that year apart from interest, dividends or royalties, the ATO may accept your return before 30 June, without pre-fill and on final figures from each employer rather than payslips. [Lodging an early tax return before leaving Australia](/blog/early-tax-return-leaving-australia) covers who qualifies, the two ways it is lodged and when waiting is better.

## What decides whether this is simple or messy?

Three facts about how you left. Whether your Australian bank account is still open, because the ATO pays a tax refund only into an Australian bank account and reopening one from overseas is genuinely difficult. Whether you know every employer for the year, since a forgotten job is the usual cause of an amendment months later. And whether the visa has actually expired, which gates the super claim.

The account causes the real damage. People close everything the week before flying, which turns a straightforward refund into a months long exercise in re-establishing payment details from another continent. Keep it open for three to four months after departure, until the refund and the super have both landed.

## Does it matter if you simply do not lodge?

It matters more later than it does now. An unlodged year stays on file indefinitely, and where a refund was owed it simply goes unpaid, which is the most common outcome and the quietest one.

Where tax was owed rather than refunded, interest accrues and the debt follows the tax file rather than the person, surfacing when there is a reason to look, including a future Australian visa application. Our guide to [late returns and penalties](/blog/late-tax-return-penalty-working-holiday) covers where the penalties actually bite, which is rarely where people fear. If you have left with a year outstanding, you can [lodge the outstanding return from overseas](/tax-return).

If you hold a UK or German passport, the guides to [Australian tax for UK passport holders](/uk-working-holiday-tax) and [Australian tax for German passport holders](/german-working-holiday-tax) cover the points specific to each passport.
`,
 }, {
 slug: "early-tax-return-leaving-australia",
 title:
 "Leaving Australia before 30 June? Lodging an early tax return",
 description:
 "If you leave Australia for good before 30 June, the ATO may accept your return early. Who qualifies, how it is lodged, and when waiting is better.",
 category: "Tax Return",
 date: "5 November 2026",
 readTime: 7,
 body: `
Yes, if you are leaving Australia permanently before 30 June and will earn no more Australian income that year, the ATO may accept your tax return early instead of after 1 July. It is an option, not an obligation, and for a working holiday maker it is not automatically the better one: it runs without pre-fill, it needs final figures from every employer, and the ATO takes longer to process it than a normal return.

## Who can lodge a tax return before 30 June?

Someone whose Australian tax year is genuinely over. The ATO accepts an early return from a foreign resident for tax purposes who is leaving Australia permanently, and from an Australian resident for tax purposes who leaves and stops being a resident. Either way, you must not receive any more Australian-sourced income after you leave, other than interest, dividends or royalties. Which of the two applies to you is the [tax residency](/blog/tax-residency-working-holiday-makers) question, and it is worth settling first.

The ATO lists who has to lodge in the normal period of 1 July to 31 October instead:

- Anyone who is not leaving Australia permanently, such as someone going home between two working holiday visas
- Anyone who will receive other Australian-sourced income after leaving
- Anyone with a HELP, AASL or VET Student Loan debt

## How is an early return lodged: paper form or tax agent?

There are two routes, and myTax is not one of them. If you lodge it yourself, the ATO says it has to be on the paper tax return form. You use the current individual tax return instructions, mark the year you are lodging for in bold on the front, and post the return to the address printed on the form. Your notice of assessment is posted to the address you write on the return, so give one that will still reach you after you have gone.

The other route is electronic lodgement by a registered tax agent. For a taxpayer leaving Australia permanently, the ATO accepts an early individual return lodged through practitioner software, but only up to a fixed date in June. Both routes need the same final figures, which is where the real work sits. Every [working holiday tax return](/tax-return) prepared by our team is reviewed and signed off by a registered tax agent before it is lodged with the ATO.

## What is the latest date an early return can go in?

For electronic lodgement through a registered tax agent, 15 June. The ATO accepts these early returns up to and including 15 June of the financial year, or the Friday before if that date falls on a weekend when its systems are down for maintenance. After that, the return is lodged as normal from 1 July.

The ATO's guidance for people lodging on paper gives no separate cut-off date. What it does make clear is that the paper route is slow, so a return posted in late June gains little over one lodged online in July.

## Why is pre-fill missing, and what replaces it?

Because the year has not finished. Pre-fill copies in what the ATO already holds, such as employer income statements and bank interest, and the ATO says it will generally not be available for an early return. Income for part of a year may not appear in pre-fill until the income year ends.

What replaces it is a final figure from each employer, and payslips do not count. In the ATO's words, "Payslips aren't sufficient as they may not contain final payment details." It asks for a payment summary from each employer, and where an employer reports through Single Touch Payroll, your income statement in myGov is the record to use. A last pay run that has not been finalised is exactly the kind of gap that turns an early return into an amendment.

## How long does an early return take to process?

The ATO states 50 business days for early lodgements, which is about ten weeks and far longer than a normal return lodged online after 1 July. Lodging early brings the lodgement forward, not necessarily the result.

The ATO also says that someone in serious financial hardship can ask whether they are eligible for priority processing.

## When is it better to wait until July?

More often than people expect. An early return suits a clean departure: one or two employers, final figures in hand, no plan to come back that year. Waiting is the safer choice when:

- An employer has not finalised your pay, or you are still owed a last payment
- There is a real chance you return and work in Australia again in the same financial year
- You had ABN or other non-wage income whose figures are not yet complete
- You hold a HELP, AASL or VET Student Loan debt, which rules early lodgement out anyway

Waiting does not mean flying back. After 1 July a return can be lodged online through myTax from overseas, as long as your myGov sign-in options still work abroad, or through a registered tax agent; [lodging from overseas after 1 July](/blog/how-to-lodge-tax-return-from-overseas) covers what changes once you have gone.

## What should you collect before you fly?

Whichever way you lodge, the things that are hard to get from abroad are worth gathering now:

- A payment summary or a finalised income statement from every employer for the year
- Your TFN, and the notice of assessment from any earlier Australian return, which the ATO asks for as proof of identity if you contact it about debts or earlier years
- myGov sign-in options that work from overseas, in case you end up lodging after 1 July
- An Australian bank account you will keep open
- A postal address that will reach you, for the notice of assessment
- Records for any deductions you plan to claim

If you worked as a contractor, [cancel your ABN before you fly](/blog/how-to-cancel-your-abn), effective from the date the work actually stopped.

## Where does the refund go once you have left?

Into an Australian bank account, and nowhere else. The ATO pays refunds only into an Australian bank account, so keep yours open until the assessment has been issued and anything owed to you has cleared.

Whether a refund is due at all depends on your year. A working holiday maker's wages are withheld at a flat 15% up to $45,000, with no tax-free threshold, and an early return does not change the rates. A difference usually comes from a period at another rate, such as 45% before your TFN was on file. The return is also only one item on the list; [what is still outstanding after you leave](/blog/tax-obligations-after-leaving-australia) covers the rest.

## Can you claim your super at the same time?

Not until you have left. The tax return and the super claim run on different clocks. A Departing Australia Superannuation Payment can only be claimed once you have left Australia and your temporary visa has expired or been cancelled, with no other Australian visa active. You can start and save the ATO's online application before you fly and submit it afterwards, and the eligibility checks, documents and timing are set out where you [claim your super after leaving Australia](/superannuation).

The two never meet on the same form. The 65% withheld from a working holiday maker's super payment is final and does not go on your tax return. An Australian account kept open helps with both: the refund can only be paid there, and super that has already moved to the ATO is paid only to an Australian account in your name or by Australian dollar cheque.

## What decides whether lodging early is right for you?

Lodging early suits some departures and not others. These are the points that decide it:

- Whether you are leaving Australia permanently, or might come back on another visa
- Whether every employer has finalised your pay, with figures you can show
- Whether you will receive any Australian-sourced income after leaving, other than interest, dividends or royalties
- Whether you have a HELP, AASL or VET Student Loan debt
- Whether it is still before 15 June, which keeps electronic lodgement through a registered tax agent available
- Whether 50 business days of processing suits you better than lodging online from overseas after 1 July

Lodged early or in the normal period, the year is settled through one [working holiday tax return](/tax-return).
`,
 }, {
 slug: "tax-residency-working-holiday-makers",
 title:
 "Are you a tax resident of Australia?",
 description:
 "Residency can change the rates on your whole year. It cannot be settled from a checklist, is easy to get wrong both ways, and needs a proper review.",
 category: "Tax Return",
 date: "24 May 2025",
 readTime: 6,
 body: `
Tax residency is whether the ATO treats you as an Australian resident for tax purposes for a financial year, judged under four tests in the law rather than by your visa. It is the question with the widest reach on a working holiday tax return. It can change the rates applied to your entire year, and it is the item most often answered wrongly by people who were sure of their answer.

Which side of the line you fall on cannot be worked out from this page, from a calculator or from a friend's experience. It is a judgement about your own year, and every return prepared here has it reviewed and signed off by a registered tax agent before a position is taken.

## What does tax residency change?

More than most people expect. It can change the rates applied to your wages, the deductions available to you, how investment income and foreign income are treated, and the size of the final result. For some people the difference is significant. For others it changes nothing. Nobody can tell which from the outside.

## What tests does the ATO use?

Four, and meeting any one of them can make you a resident for tax purposes for that year.

- **The resides test.** The main one. It asks whether you live in Australia in the ordinary sense: how long you stay, why you are here, where your belongings, work and relationships are, and how settled your living arrangements are.
- **The domicile test.** Whether your permanent home, in the legal sense, is in Australia. Rarely met by anyone on a temporary visa.
- **The 183 day test.** Whether you were in Australia for more than half the income year, unless your usual home is overseas and you do not intend to live here.
- **The Commonwealth superannuation fund test.** Only for Australian government employees posted overseas, so it does not apply to working holiday makers.

## Does staying longer than six months make you a resident?

Not automatically. The 183 day test has an exception for someone whose usual home is overseas and who does not intend to live in Australia, which describes many working holiday makers. What decides most cases is the resides test, which weighs the whole year rather than a day count.

## How does the Addy ruling fit in?

Addy v Commissioner of Taxation [2021] HCA 34 is a High Court ruling that may change which rates apply to some working holiday makers, depending on their passport and their residency position. Whether it applies depends on the individual facts of the year, and it is assessed case by case as part of the review of each return. UK passport holders have [their own guide](/uk-working-holiday-tax), and so do [German passport holders](/german-working-holiday-tax).

## Why can't you work it out yourself?

Because it is not one question with one answer. It weighs many parts of your circumstances together, including parts most people never think to check, and no single fact and no rule of thumb settles it. Two travellers whose years look almost identical can be correctly assessed differently.

## Does your visa decide it?

Not on its own. Holding a 417 or 462 visa tells you very little about how your year will be assessed, and answering the residency question on a form by instinct is how returns end up wrong, in both directions.

## What happens if it is answered wrongly?

Either you claim a position you cannot support, which can lead to an amended assessment later, or you quietly overpay because a better position was never considered. Both are common, and both are avoidable.

## Who should check it for you?

A registered tax agent who goes through your year in full before anything is lodged. That is how residency is handled in every [working holiday tax return](/tax-return) prepared here. [Get in touch](/contact) and we will go through it with you.
 `,
 },

 // ─── NEW: TFN ──────────────────────────────────────────────────────────────
 {
 slug: "how-to-update-address-with-ato",
 title:
 "Changing your address with the ATO: online or by phone",
 description:
 "Update your address with the ATO online in myGov or by calling 13 28 61. Why it matters for your TFN letter and ATO mail, and which address to give.",
 seoTitle: "How to change your address with the ATO: online or by phone",
 category: "TFN",
 date: "20 July 2026",
 readTime: 5,
 body: `
The address the ATO holds for you decides where your TFN letter, assessment notices and super correspondence are sent. You update it online in myGov, by phoning the ATO on 13 28 61 (+61 2 6216 1111 from overseas), or through a registered tax agent acting for you. The change applies to mail sent after it, not to letters already posted.

## How do you change your address with the ATO?

Three routes, and the first is the fastest if your myGov account is already linked to the ATO.

- **Online.** Sign in to myGov, select Australian Taxation Office under linked services, then My profile, Personal details and Contact details, and save the new address.
- **By phone.** Call the ATO on 13 28 61, or +61 2 6216 1111 from overseas, with your TFN ready, because you have to prove your identity first.
- **Through a registered tax agent** acting for you, who can update the details on your record.

The postal and residential addresses are separate fields, and each super fund you hold keeps its own address, so updating the ATO does not update your funds. The steps are on the ATO page [update your personal contact details](https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-personal-contact-details).

## Why does the ATO hold an address at all if refunds go to a bank account?

Because several things that decide whether you get paid still travel by post. Your TFN letter is posted and only posted. Identity verification correspondence is posted. Notices of assessment, amendment letters and any request for information go to the address on file, and a letter you never see is still a letter you were deemed to have received.

Refunds themselves are paid electronically to an Australian bank account in almost every case, so a stale address does not usually stop the money. It stops everything that has to happen before the money.

## What actually goes wrong when the address is old?

The most expensive failure is the [TFN](/tfn) letter, because a returned letter restarts a 28 day wait while you may be working at 45% instead of a lower rate.

The second is superannuation. Your fund and the ATO both hold an address for you, and a fund that cannot reach you eventually reports the account as unclaimed and transfers it to the ATO. That money is still yours and still claimable, but it is now one more step away from you at the exact moment you are leaving the country.

The third is the quiet one. An ATO letter asking a question about your return, unanswered because it went to a hostel in Byron you left in March, becomes an assessment made without your input.

## Which address should you give if you are moving every few weeks?

Somewhere that will still hold your mail in four weeks, which is rarely where you are sleeping tonight. Harvest and hospitality move people faster than the post moves letters.

- A friend's or relative's permanent Australian address is the best answer, even if you never go there.
- A long stay hostel works if it genuinely holds mail for departed guests, which many do not.
- A post office box is accepted and is the most reliable option for anyone spending a season moving between farms.
- A hostel you are leaving on Friday is the worst answer, and it is the one most people give.

The ATO records a postal address and a residential address separately. If you are using a mail holding address, set the postal one to it and leave the residential one as where you actually live, because the TFN letter follows the postal address.

## Does your address matter once you have left Australia?

Yes, and this is the point at which most people stop thinking about it. An overseas address can be recorded with the ATO, and it should be, because post departure correspondence is exactly the correspondence you cannot afford to miss: a refund under review, a departing Australia superannuation payment, a request to confirm your identity.

Your bank details matter as much. A refund directed to an Australian account you closed on the way to the airport does not vanish, but it bounces back and becomes a credit sitting on your ATO account until someone tells the ATO where to send it. If your [working holiday tax return](/tax-return) is still to be lodged when you leave, give the ATO your overseas address and keep your Australian bank account open, because a refund can only be paid into an Australian account.

## Is this housekeeping or urgent for you?

Updating an address is the same task for everyone, but the urgency is not.

- Whether you are still waiting on a TFN letter. If you are, this is urgent and it is the only thing on this page with a weekly cost attached.
- Whether you have superannuation with a fund that has an old address. Unreachable accounts end up transferred to the ATO as unclaimed super.
- Whether you are about to leave Australia. The address and the bank account both need to be right before you fly, not after.
- Whether you have more than one super fund from more than one employer. Each fund holds its own address, and updating the ATO does not update them.

If you are leaving with super still in Australia, the address is one of the details that decides how smoothly you [claim your superannuation after leaving Australia](/superannuation), and you can [estimate your tax refund](/calculator) before you lodge anything.
 `,
 },

 // ─── NEW: Tax Return ───────────────────────────────────────────────────────
 {
 slug: "what-is-a-tax-refund-australia",
 title:
 "What is a tax refund in Australia? How it works on a WHV",
 description:
 "A tax refund is what the ATO pays back when more tax was withheld from your pay than you owed for the year. Where the gap comes from, and when it arrives.",
 category: "Tax Return",
 date: "5 June 2025",
 readTime: 5,
 body: `
A tax refund is the amount the ATO pays back when more tax was withheld from your pay during the financial year than you actually owed for it. Nobody works out your tax during the year: your employer withholds an amount each payday at a set rate, and the real figure is settled once, when the return is lodged. The refund is what falls out of that comparison, and on a working holiday year it can fall in your favour.

## Why can a working holiday year end up over withheld?

Withholding is applied pay by pay at a set rate, and it never sees the year as a whole. At working holiday maker rates that rate is a flat 15% of each pay up to $45,000 for the year, so a short or part year is not over withheld on that rate alone. A gap comes from something the payroll rate did not account for:

- Weeks worked before the TFN reached the employer, withheld at 45% rather than 15%
- An employer not registered with the ATO to employ working holiday makers, withholding at foreign resident rates
- Deductions that reduce taxable income and were never accounted for during the year
- A 2% Medicare levy charged to someone not entitled to Medicare

## How do you know whether you are owed anything?

You do not know until the year is reconstructed. The calculation compares the tax that should have applied to your actual income against the total already withheld across every employer, and then adds the items withholding never sees.

There is no average refund worth quoting. Two backpackers who earned identical wages can finish a long way apart on the strength of a residency position, a Medicare entitlement and a 45% period, and none of those is visible from the payslips alone.

## What decides the size of your refund?

Five facts about your own year decide much of it, and you already know most of them. A sixth, your residency position, has to be worked out rather than recalled.

- **Whether there was a period without a TFN on file.** Every week at 45% rather than a lower rate means a larger share of each dollar withheld, which is looked at when the return is assessed.
- **Whether every employer was registered as a working holiday maker employer.** An unregistered one withholds at foreign resident rates, and the excess is taken into account in the return.
- **When you arrived and when you left.** This decides which financial years you lodge for, which run 1 July to 30 June, and which income belongs in each.
- **Your Medicare position.** Entitlement to Medicare is what makes the 2% levy apply, and whether you were entitled turns on your individual facts.
- **What you can substantiate in deductions.** Boots, tools, sun protection, the work share of a phone, and last year's agent fee.

## Where does it stop being arithmetic?

At the residency item, where no calculator helps. Residency is a judgement about a year as a whole, it turns on details most people never think to check, and it is easy to get wrong in both directions.

For some people a residency finding changes the rates applied to everything they earned, so a position is only taken after the year has been gone through properly. Our guide to [tax residency on a working holiday visa](/blog/tax-residency-working-holiday-makers) covers why it cannot be self assessed with confidence.

## When does the refund arrive?

The ATO says most online returns are processed in about 12 business days, with the refund paid into a nominated Australian bank account. It runs a few days longer through the July to September peak, and considerably longer if the return was lodged before employer income statements were finalised.

The account is the part worth planning. The refund pays to an Australian account and nowhere else, so anyone leaving the country needs that account alive for at least four to six weeks after lodgement. Our guide to [how long a refund takes](/blog/how-long-does-tax-refund-take-australia) covers what holds one up.

## Can you still claim after you have gone home?

Yes, and a surprising number of people never do. A return can be lodged from overseas for the year you left, and unlodged earlier years can still be lodged. Nothing about being in another country closes the file.

The years that go unclaimed are almost always the short ones, where someone worked three months, assumed the amount was too small to bother with, and left. Those years can still include weeks at 45% before a TFN was on file, or an employer withholding at 30%, and the return is the only place either is reconciled.

## What actually changes the outcome?

Two things, and neither of them is effort. The first is whether every employer for the year is accounted for, because a forgotten job is both the most common cause of a later ATO amendment and a common cause of a refund being understated. The second is whether the items that withholding cannot see were claimed at all: the Medicare position, the residency position and the deductions.

Not aggressive claims, which come back at you, but a complete picture of a year worked across several employers, several states and often two financial years. Running the numbers through the [calculator](/calculator) gives you an indication, and preparing the [tax return](/tax-return) properly is what settles it.
`,
 }, {
 slug: "how-long-does-tax-refund-take-australia",
 title:
 "How long does a tax refund take in Australia in 2026?",
 description:
 "The ATO says most online returns are processed in about 12 business days; paper can take up to 50 business days. What stalls a refund and why.",
 seoTitle: "How long does a tax refund take in Australia? About 12 business days",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 4,
 body: `
The ATO says most online returns are processed in about 12 business days, counted from when it can match them against the income data it already holds. Paper can take up to 50 business days. The clock does not start when you press send, so the date a refund lands is mostly decided before lodgement.

## What does a normal refund timeline look like?

A clean electronic return is usually processed in about 12 business days, the ATO's own figure for most online returns. Slower ones can take a week or more beyond that.

Outside the peak, from October to June, it is often quicker. From July to September the same return takes a few days longer, purely on volume.

## What actually decides your refund speed?

Six things move a refund date, and most of them are settled before lodgement. The largest is whether the return was lodged before employer income statements were finalised, because a return built on unconfirmed data goes into a queue rather than through the system.

- **Lodgement method.** Electronic lodgement is measured in days, paper in months.
- **Income statement status.** Employers finalise their reporting after the year ends, and lodging before that invites a mismatch.
- **First time lodgers.** An initial identity check adds time once and never again.
- **Data mismatches.** A figure that disagrees with what the ATO already holds moves the return into manual review.
- **Bank details.** A wrong BSB or account number bounces the payment, which then has to be re-issued.
- **Time of year.** July to September is slower for everyone.

## Why does an incorrect bank account cause so much trouble?

A refund pays to a nominated Australian bank account and nowhere else. When the account is closed or the digits are wrong the payment bounces back and sits as a credit on your ATO record until correct details are supplied.

It is the most common reason a refund appears to have vanished. Almost always it has not: it was issued, rejected, and is waiting. Keeping the Australian account open for at least four to six weeks after lodgement avoids the whole problem.

## What does it mean when a return is under review?

Under review means a person is looking at the return rather than a system, and it is routine. The usual triggers are a residency answer that does not match the rest of the return, income the ATO can see that the return does not include, or bank details changed close to lodgement.

Larger refunds relative to the income reported are more likely to be selected, as an integrity check rather than an accusation. It adds time and rarely changes the outcome where the return was right.

## Why has your refund not arrived after two weeks?

Two weeks is typical, not a guarantee. Most returns that pass it are held by an income statement that was not final when the return went in, a bank detail mismatch, or a manual review queue. Each normally resolves within another one to two weeks.

Past 28 days, something specific is holding it. The status can be checked in myGov under ATO online services, or by calling the ATO on 13 28 61 (+61 2 6216 1111 from overseas). Returns prepared by our team are reviewed and signed off by a registered tax agent before they are lodged with the ATO.

## Does leaving Australia change the timing?

Lodging from overseas does not slow the return itself. The same timing of about 12 business days applies, and returns for earlier years can still be lodged after you have gone home. What changes is the destination, because the refund still pays into an Australian account.

Our guide to [tax after leaving Australia](/blog/tax-obligations-after-leaving-australia) covers the constraint on departure planning. The refund and the DASP super payment both arrive after you have left, so the account they pay into needs to outlive the flight.

## What decides whether your refund is quick or slow?

Four facts, all settled before lodgement. Whether every employer had finalised their income statement, generally from mid July onward. Whether the return matches what the ATO already holds. Whether the account details are current. And whether the return contains an item that invites a closer look: residency, a large deduction claim, or a Medicare levy exemption.

None of those is a reason to rush a return in early July. A return lodged in the first week against unfinalised data is not faster, it is first into the review queue. The [tax return](/tax-return) that arrives quickly is the one that was complete when it was sent.
`,
 },

 // ─── NEW: Super ────────────────────────────────────────────────────────────
 {
 slug: "super-for-casual-and-part-time-workers",
 title:
 "Do casual workers get super? Yes, 12% from the first dollar",
 description:
 "Yes. Casual and part time workers get 12% super from the first dollar earned, with no monthly minimum. How to check it is reaching a fund in your name.",
 category: "Super",
 date: "9 June 2025",
 readTime: 5,
 body: `
Yes. Superannuation is owed on all ordinary time earnings from the first dollar, for casual, part time and full time employees alike. The rate is 12%, paid by the employer on top of your wages rather than out of them. Being casual, being temporary and being on a working holiday visa change none of it.

## Why do people still think there is a minimum before super starts?

Because there was one until 1 July 2022. An employer owed nothing on a month in which you earned under $450 with them, and casual backpackers with shifts scattered across several venues lost real money to it lawfully.

It is gone. Every dollar of ordinary time earnings now attracts the guarantee regardless of the monthly total: two shifts at one pub, a week of harvest work, a single trial period at a cafe all generate a super obligation. The one remaining exception is workers under 18, who still need to work more than 30 hours in a week before the guarantee applies.

## Does casual status change anything?

No. The 25% casual loading and the 12% super guarantee are separate things that both apply, and an employer cannot treat the loading as covering the super. One shift a week generates super on that shift's earnings; five shifts generate super on all of them.

The confusion comes from the loading being described as compensation for what casuals do not get: paid leave and notice. Super is not on that list, and is paid to casuals on the same terms as anyone else.

## What is super actually calculated on?

Ordinary time earnings, which is not everything on your payslip. It covers ordinary hours including casual loading, and generally penalty rates and allowances tied to ordinary hours, but excludes overtime paid at overtime rates.

A hospitality casual whose Sunday penalty hours are ordinary rostered hours should be accruing super on the loaded amount, not on a notional base rate. An employer calculating super on the base is underpaying it.

## How do you tell whether it is actually being paid?

By checking the fund, not the payslip. A payslip line showing super states what the employer intends to pay, not that it arrived, and the two diverge more often than people realise.

From 1 July 2026 super is generally due within seven business days of each payday (Payday Super); before that it was paid quarterly. A gap of a week or two between the payslip and the money appearing can be normal. A gap that survives the due date is not. Comparing the fund's contribution history against your payslips settles it.

## What happens to it when you leave?

It stays yours and is claimable as a Departing Australia Superannuation Payment once your visa has ceased and you have left the country. The taxable component of a working holiday maker's DASP is taxed at 65%, which is the figure people find hardest to accept, but the alternative is receiving none of it.

Small balances from short casual stints are still worth claiming, and the ATO's online application turns each account it finds into its own application, so several balances can be claimed in one sitting. The ATO says payment generally follows within 28 days of a complete application. The steps are on the page about [getting your super back as a DASP](/superannuation).

## What is the specific risk for casual work across many employers?

Lost accounts. A casual working holiday maker who did not nominate a fund had one chosen for them at each employer, so four jobs is potentially four accounts, each quietly charging fees against a small balance.

Worse, contributions made before your TFN reached the fund often cannot be matched to you and end up held by the ATO rather than any fund. That money can usually be traced but is invisible, and it is the most common reason a departing backpacker's super is smaller than the payslips say. Our guide to [finding lost superannuation](/blog/how-to-find-lost-superannuation) covers how it is traced.

## Did it reach a fund in your name?

Entitlement to super is not the variable. What you end up with is. Each fact below changes either how much was owed or how much reached a fund with your name on it.

- Whether you worked before or after 1 July 2022, since gaps in low earning months were lawful before that date.
- Whether you were an employee or engaged under an ABN, because a contractor generally receives no super at all.
- Whether super was calculated on ordinary time earnings including loading and penalties, or on a bare base rate.
- How many employers you had, since each one may have opened a separate account.
- Whether your TFN reached each fund, which decides whether contributions were matched to you or sent to the ATO.
- Whether your visa has ceased and you have departed, which is what makes the balance claimable.

Unpaid super and an unlodged return are usually found together, and the year is reconciled in the [working holiday tax return](/tax-return).
 `,
 },

 // ─── NEW: Work Rights ──────────────────────────────────────────────────────
 {
 slug: "employer-asking-you-to-work-more-than-visa-allows",
 title:
 "Boss Pushing You Past the 6-Month Limit?",
 description:
 "Going past the 6-month employer limit puts your visa at risk, and the employer too. Your options, the exemptions that may apply, and how to say no safely.",
 category: "Work Rights",
 date: "15 June 2025",
 readTime: 4,
 body: `
Condition 8547 limits you to six months with one employer on a working holiday visa, but a long list of sectors is exempt. Whether your boss can legally keep you past six months depends on what the work is. Most people asking are already exempt.

## What does condition 8547 actually restrict?

Employment with a single employer beyond six months, counted in calendar months from your start date rather than in hours or shifts worked. It applies identically to full time, part time and casual, so two days a week for eight months is a breach in exactly the way five days a week is.

It restricts one relationship, not your total work. You can work for as many employers as you like across the visa, and the six months resets only on the grant of a new working holiday visa. The separate Fair Work rule that full time employees should not regularly work beyond 38 hours a week plus reasonable additional hours is about weekly hours rather than months.

## Which work is exempt from the limit?

A broad list, and it covers most of what working holiday makers actually do. If your work falls inside it, no permission is needed.

- Plant and animal cultivation, anywhere in Australia
- Natural disaster recovery work, anywhere in Australia
- Agriculture, food processing, health, aged and disability care, childcare, and tourism and hospitality, anywhere in Australia
- Fishing and pearling, tree farming and felling, construction and mining, in northern Australia only (defined by postcode in Queensland, Western Australia and the Northern Territory)
- Different locations of the same employer, where no single location exceeds six months

The list is set by Home Affairs and has been adjusted more than once, so confirm the current version against their published conditions.

## What if your work is not exempt?

You can change employers at the six month mark, which requires nothing from anybody. Or you can ask Home Affairs for permission to continue, which has to be done before the six months elapse and is granted at their discretion rather than as of right.

Permission is not retroactive, so the request has to go in before the six months end. If you asked in time, Home Affairs says you can keep working for that employer until you receive its written decision. If you asked late, you must stop working for that employer and wait for the outcome. Working past the limit without an exemption or an approval is the breach, whatever the paperwork eventually says.

## What are the consequences of getting it wrong?

Visa cancellation is the formal risk, though for an unintentional overrun it is not the usual outcome. More commonly, a breach sits on your immigration record and gets weighed when you apply for anything else Australian, including a second or third year visa.

The employer is exposed too. A business that keeps a non exempt worker past six months faces its own civil penalties, so an employer pressing you to continue is asking you to carry a risk they also hold.

## Can an employer make you do it?

No, and the pressure usually comes dressed up as a favour. Visa conditions are legal limits, not terms you can negotiate, and no employer can waive one.

Refusing to breach a visa condition is not misconduct, and an adverse response to it is the kind of thing a General Protections claim exists for. An employer who implies they can affect your visa is wrong: only Home Affairs decides visa matters, and workplace complaints made in good faith do not trigger any visa review. Get the request in writing where you can: a text message asking you to stay on is evidence in a way a conversation is not.

## How do you extend your stay legitimately?

Through a further visa rather than through a longer job. A second year visa requires 88 days of specified work in a designated regional area during your first year; a third year requires six months of specified work during the second.

That work has to meet the definition and be in the right postcode, a separate test from the six month employer limit. Staying longer with one employer does not extend your stay by a day, and 88 days on a farm does not exempt you from condition 8547 in a later non exempt job.

## Does any of this change your tax?

No. Staying with one employer for a full year under an exemption produces the same kind of tax position as three jobs of four months each: tax withheld from wages, 12% [super](/superannuation) on top, and all of it combined on one [tax return](/tax-return).

One long job is the simpler tax year: one employer to reconcile, one declaration form. Several short jobs mean several chances for the wrong withholding rate to be applied unnoticed.
`,
 }, {
 slug: "farm-work-rights-working-holiday-australia",
 title:
 "Farm Work Rights: Pay, Piece Rates, 88 Days",
 description:
 "Minimum hourly rates apply on every farm, piece rates included, and piece rates must let an average picker earn 15% more. Your rights on the 88 days.",
 category: "Work Rights",
 date: "16 June 2025",
 readTime: 6,
 body: `
Farm work carries the same protections as any other Australian job: award rates, safe conditions, payslips and 12% superannuation on top of wages. Most of it sits under the Horticulture Award. What is specific to farm work is how piece rates meet the hourly minimum, and how much of your visa rests on paperwork the farm may not keep.

## What protections apply?

All of them. The Fair Work Act covers farm workers on working holiday visas identically to Australian workers: minimum wage, the relevant award, safe working conditions, payslips within one day of payday, superannuation, and protection from unlawful dismissal or retaliation.

Visa status reduces none of it, and the belief that it does is why this sector has the longest record of underpayment. The Fair Work Ombudsman has run repeated campaigns into horticulture for exactly that reason.

## What does the Horticulture Award set?

Minimum hourly rates by classification, rules for piece rate agreements, penalty rates for overtime, weekends and public holidays, and the top up obligation that makes piece rates lawful.

The award applies to fruit picking, vegetable harvesting, packing and vine and tree work. Pastoral work such as livestock and broadacre cropping sits under a different award. Our guide to [the Horticulture Award](/blog/horticulture-award-working-holiday-makers) covers the classifications in detail.

## How do piece rates and the hourly minimum interact?

Piece rates are lawful and do not displace the hourly floor. A worker paid per bin or per kilogram must still earn at least the applicable casual minimum for every hour worked, and where piece earnings fall short the employer must top the pay up to it.

The top up is an obligation, not a courtesy, and it is the most commonly ignored provision in farm work. From 1 July 2026 the casual minimum across all work is $33.05 an hour, being the $26.44 national minimum plus the 25% loading, and horticulture classifications run from there.

Divide what you were paid for a day by the hours you actually worked, including time waiting for bins and moving between rows. If the result is below the casual minimum, a top up was owed. Our guide to [piece rates in farm work](/blog/piece-rates-farm-work-working-holiday) sets out how the agreements are supposed to be written.

## Can the farm deduct for accommodation and transport?

Only within limits, and only with your agreement in advance and in writing. Deductions must reflect actual costs, be reasonable, and never take your pay below the minimum.

Deductions failing any of those conditions are unlawful, and overcharging for hostel beds and bus runs is a recurring pattern here. Keep the written agreement and the payslips showing what was taken, because a deduction with no agreement behind it is recoverable.

## What about superannuation?

An employee on a farm is owed 12% superannuation on ordinary time earnings, paid into a fund (generally within seven business days of payday from 1 July 2026), regardless of how few hours were worked. Piece rate earnings are wages, so the guarantee applies to them.

Farm employers skip it more often than any other sector this audience works in. It is recoverable through the Superannuation Guarantee Charge process, and claimable as a Departing Australia Superannuation Payment once your visa has ceased and you have left. On an ABN none of that applies, which is why the classification question matters: our guide to [farm work and ABNs](/blog/farm-work-and-abns) covers it.

## What evidence should you build from day one?

Everything that proves where you worked, when, and for whom. The same file that satisfies a second year visa application is what recovers underpaid wages, and farms are frequently poor at paperwork.

- Every payslip, which is the primary evidence immigration looks for
- Employment dates confirmed in writing, even a text message about your start date
- The farm's legal name, ABN and address
- Evidence that the location sits in an eligible postcode
- Your own daily log of hours worked and tasks performed
- The written piece rate agreement, if you are on one

The people who lose both a visa application and a wage claim are the ones who kept nothing but a recollection of the season.

## Does complaining risk your visa or your 88 days?

No. Protections exist specifically for temporary visa holders pursuing workplace complaints, including provisions allowing you to remain in Australia to pursue one, and visa status is not lawful grounds for retaliation.

The days you actually worked remain the days you worked. What jeopardises a second year application is not a complaint but an absence of evidence.

## The season, not the award, decides your pay.

Your entitlements are fixed by the award; what you are actually owed depends on how the season ran. The same facts are what a second year visa application will ask you to evidence.

- Whether you are an employee or engaged under an ABN, which decides whether any of it applies.
- Which award covers the property, since horticulture and pastoral work differ.
- Whether you are on piece rates, and whether the hourly top up was ever calculated.
- Whether deductions for accommodation or transport were agreed in writing and within limits.
- Whether payslips were issued, which decides both wage claims and visa evidence.
- Whether 12% superannuation was paid at all.
- Whether the postcode and work type qualify toward the 88 days.

Whatever was withheld across each farm reconciles in your [working holiday tax return](/tax-return) at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 },

 // ─── NEW: Medicare & Other ─────────────────────────────────────────────────
 {
 slug: "what-is-superannuation-guarantee-charge",
 title:
 "SGC: When an Employer Skips Your Super",
 description:
 "Miss a super deadline and employers can owe the Super Guarantee Charge, with interest and penalties. What it means for unpaid super and what to gather.",
 category: "Super",
 date: "20 June 2025",
 readTime: 5,
 body: `
The Superannuation Guarantee Charge is what an employer owes the ATO when they pay your super late, short, or not at all. It is deliberately more expensive than paying on time. For you, it is the mechanism that gets the money back.

## What triggers the charge?

Missing the due date, by any margin. An employer who pays late can be liable for the charge, not just for the delay, and the detail depends on the ATO's rules at the time.

For pay from 1 July 2026 the due date is generally seven business days after each payday. Before that, quarterly dates applied: contributions for July to September were due by 28 October, October to December by 28 January, January to March by 28 April, and April to June by 28 July. Once a pay period is past its due date, an empty fund account is a genuine gap rather than a delay.

- Paying nothing at all
- Paying less than 12% of ordinary time earnings
- Paying after the due date (quarterly before 1 July 2026, seven business days after payday since)
- Paying into a fund you did not nominate, in some circumstances

## Why is the charge worse for an employer than just paying?

Because it is built to be. For pay from 1 July 2026 the charge is worked out for each payday and is made up of the shortfall, notional earnings on it at the ATO's general interest charge rate, and an administrative uplift that starts at 60% of those two amounts and can be reduced, plus a choice loading where the employer ignored your choice of fund.

For quarters before 1 July 2026, the charge was the shortfall, plus nominal interest of 10% a year from the start of the quarter, plus an administration fee per employee per quarter, and none of it was deductible. Under the new rules the charge can be deducted when it is paid, but a 60% uplift on top of the shortfall still leaves a business that skips super and gets caught paying far more than one that paid on time.

## Where does the money end up?

With you, through your fund. The ATO collects the charge from the employer, and the shortfall and the interest go into your nominated super fund, or are held by the ATO where no current fund details exist, which is common for backpackers who have already left.

The interest belongs to you as well, which is the part people do not expect. The rule is meant to restore your position as if the employer had paid correctly and on time, so the earnings you would have had are replaced rather than kept. Where the money is held by the ATO rather than a fund, it still counts towards your [DASP claim](/superannuation) when you leave.

## How would you know your employer is behind?

By comparing two things you already have. Your payslips state a super figure for each pay period; your fund statement states what actually arrived and when. If the payslip line has been showing super and the fund shows nothing after the due date has passed, the money was accrued but not paid.

Two branch points change what you are looking at. A payslip with no super line at all usually means the employer is treating you as a contractor, in which case the question is whether the [classification is right](/blog/employee-vs-contractor-australia). And a fund account you have never logged into may be receiving payments you have simply never seen.

## What happens once unpaid super is reported?

A defined process starts, and it runs on data rather than on your persuasiveness. The ATO holds the wages an employer reports through single touch payroll and the contributions funds report receiving, so the comparison that proves a shortfall is one it can make itself once your report tells it where to look.

What it does not do is keep you informed. Assessments are raised against the employer, debt recovery powers you do not have are used to collect, and the recovered amount reaches your fund with the interest attached. The timeline runs in months rather than weeks, and the report survives your departure from Australia, which matters because most backpackers only discover a gap on the way out.

- Payslips covering the period, showing the super line
- Fund statements showing what arrived and when
- Employment dates, hours and pay rates
- The employer's legal name and ABN, which is on the payslip

Super and tax are separate claims: the DASP pays out your fund balance, while tax over-withheld from your wages is dealt with only through a [working holiday tax return](/tax-return).
`,
 },

 // ─── TFN - NEW ─────────────────────────────────────────────────────────────
 {
 slug: "tfn-reference-number-before-tfn-arrives",
 title:
 "TFN application reference number: what it is for",
 description:
 "The reference number proves you have applied for a TFN, which keeps you on 15% through the 28 day window. It is not a TFN. What it can and cannot do.",
 seoTitle: "TFN reference number: what it does before your TFN arrives",
 category: "TFN" as const,
 date: "29 July 2026",
 readTime: 6,
 body: `
The reference number arrives the moment you submit your TFN application, and it is the evidence that the application is in progress. That evidence is what keeps you on the working holiday maker rate of 15% during the 28 day window instead of 45%. It is not your TFN and it cannot be used as one.

## What is the reference number and where does it come from?

It appears on the confirmation screen at the end of the online [TFN application](/tfn) and is sent to the email address you gave. It is a tracking number for the application rather than an identifier for you, and it looks nothing like the nine digit TFN that follows.

Think of it as a receipt. It proves the application exists, it lets the ATO find that application instantly if you have to call, and an employer can point to it when asked why a new starter has no TFN on file.

## What does it actually do for your pay?

It supports the answer you give on the Tax File Number Declaration. That form has a box for recording that you have applied for a TFN but not yet received it, and an employer with that recorded applies the working holiday maker rate through the 28 day window rather than the 45% no TFN rate.

The declaration changes the rate. The reference number is the evidence that the declaration is honest, and a payroll office that has never seen one will want to see it.

## What can it not do?

Three things, each a regular mistake because the reference number looks official enough to be taken for the real one.

It does not go in the TFN field on any form. A reference number typed into a payroll system as a TFN produces a mismatch that has to be unwound later.

It cannot be used to lodge a tax return. Only the real number can.

It cannot be given to a super fund in place of a TFN. A fund without your TFN taxes contributions at a higher rate and struggles to match the account back to you when you claim it, one of the main reasons backpacker super gets lost.

## How long until the real number arrives?

Up to 28 days is the ATO's stated ceiling and about two weeks is typical. It arrives as a letter posted to the Australian address on your application, and only as a letter.

The reference number stops mattering the day the letter arrives. Until then, keep the confirmation email, because it is what you will need if the 28 days pass and nothing has come.

## What do you do when the TFN arrives?

Give it to every employer with an updated declaration, not just the current one. Each employer holds its own record, so the packing shed knowing your TFN does nothing for the pub.

From that point the correct rate applies going forward. Anything withheld above 15% before the number was on file is not corrected in payroll and is reconciled through your return instead.

## Is the reference number any use to you?

It does the same job for everyone, but whether it matters depends on what you are doing during the wait.

- Whether you are working during the wait at all. If you are not, none of this costs anything.
- Whether the declaration records the in progress application.
- Whether your employer accepts it. Larger hospitality groups and labour hire firms handle this routinely; small single site operators sometimes apply 45% regardless, which is then reconciled in your return.
- Whether the address on the application will still hold your mail in a month.
- Whether you have held an Australian TFN before, in which case the task is retrieving the old number.

Anything withheld above the correct rate is reconciled through your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know how long the gap ran.
 `,
 }, {
 slug: "tax-free-threshold-working-holiday-visa",
 title:
 "Tax-free threshold on a working holiday visa: can you claim?",
 description:
 "Generally no. Working holiday maker income is taxed at 15% from the first dollar, so you usually answer no on the TFN declaration. The Addy exception.",
 seoTitle: "Tax-free threshold on a working holiday visa? Generally no",
 category: "TFN" as const,
 date: "29 July 2026",
 readTime: 5,
 body: `
Generally no. Income taxed at the working holiday maker rates is taxed at 15% from the first dollar, so there is no tax free threshold, and on the [TFN](/tfn) declaration a working holiday maker normally answers no to the threshold question. The Addy ruling may change this for some passports, and that is assessed case by case when the return is prepared.

So the withholding declaration is not a place to guess. Getting it wrong can create a debt rather than a saving.

## What is the threshold and who is it for?

A concession in the ordinary resident tax scale that lets the first part of income in a financial year be received without tax. Working holiday makers are generally taxed under a different schedule, and whether the concession plays any part in your year depends on your individual circumstances. That is why the declaration form asks.

## Why does ticking it cause a problem rather than saving money?

Because it changes what your employer withholds, not what you owe.

Answering yes tells payroll to apply a different scale, so less tax may come out of each pay and your take home rises. It feels like a win for a few months.

None of that changes your actual liability, which is worked out at the end of the year. Any shortfall is payable at assessment. What should have been a refund can become a bill, and its size tracks how long the error ran.

With the threshold wrongly claimed, withholding can be materially less than it should be. Over months, that can build into a debt at assessment.

## What is the exception, exactly?

Not something to assume. It traces back to the High Court's decision in Addy v Commissioner of Taxation [2021] HCA 34, and its effect varies from person to person, because it turns on a residency judgement about your whole year.

See [tax residency for working holiday makers](/blog/tax-residency-working-holiday-makers) for why the question resists self assessment, and expect the final call to be made when the return is prepared and reviewed by a registered tax agent, not settled by you in July.

Either way it is settled at assessment, not in payroll, so it is worth having the position reviewed rather than guessing on the form.

## How do you fix it if the box is already ticked?

Give your employer a new withholding declaration with the answer corrected, and payroll applies the right rate from the next pay run. It is not corrected retrospectively, so the earlier it is caught the smaller the catch-up.

Then plan for the gap. The under-withheld amount does not disappear and is not waived; it is reconciled when the return is lodged, and knowing roughly how big it is before October is the difference between a manageable adjustment and a shock. If you have more than one employer, check every one. The error is usually made once, on the first declaration form filled in on the first day in Australia, and copied onto every form after it.

## How do you tell from a payslip?

Divide tax withheld by gross pay. A working holiday maker at the correct rate lands near 0.15. Materially below that, on ordinary wages, points at the threshold having been claimed, and it is the only common error producing too little withholding rather than too much.

The other directions tell you something different. Around 45% means your TFN is not on file. Around 30% means your employer is not registered as a working holiday maker employer. Both mean too much was withheld, which is reconciled at assessment. Only the threshold typically produces a debt.

## Does the exception apply to you?

That is not something to decide from the outside, so the declaration is worth having reviewed rather than guessed. These are the facts that matter.

- How your year as a whole would be assessed for residency, which is a judgement rather than a checklist.
- Details of your circumstances that rarely look important until someone who knows the area goes through them.
- How many employers received a declaration with the wrong answer.
- How long the wrong rate ran before it was caught, which is the whole size of the problem.
- Whether you also have ABN income, which is untaxed as it arrives and compounds the same shortfall.

The position is finalised when you lodge your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) to see whether the year lands as a refund or a bill.
 `,
 },

 // ─── WORK RIGHTS - NEW ─────────────────────────────────────────────────────
 {
 slug: "white-card-australia-working-holiday",
 title:
 "White card in Australia: course, cost and tax deduction",
 description:
 "You need a white card for any Australian construction site. The course takes a few hours and costs about $100. Who needs one, and is it tax deductible?",
 seoTitle: "White card in Australia: about $100 and a few hours",
 category: "Work Rights" as const,
 date: "29 July 2026",
 readTime: 5,
 body: `
You cannot legally work on an Australian construction site without one. The White Card, formally the general construction induction card, is issued by a registered training organisation after a course of a few hours, costs around $100 and has no expiry date, though if you go two years without doing construction work you need to repeat the induction. Cards are recognised across states.

## What is it and what does it actually prove?

It proves you have completed general construction induction training, unit CPCWHS1001, covering site hazards, emergency procedures and your rights and duties as a worker. It is a safety credential and nothing more: it does not qualify you for any trade.

It is a legal requirement under work health and safety law rather than an employer preference, so a site supervisor cannot wave you through on the strength of experience. A builder that does is telling you something about the site.

## Who needs one, and who does not?

Anyone performing construction work: labourers, carpenters, scaffolders, painters, landscapers on construction sites, trades assistants, and anyone regularly on site for work. If a job description involves a site, assume it involves a card.

You do not need one for hospitality, farm work, retail, cleaning or office work. The moment someone offers you a few weeks of labouring, common in Perth, Darwin and along the Queensland coast, you need the card before your first shift.

## What does the course involve and can you do it online?

A few hours, in one sitting, ending in an assessment. Most states accept accredited online delivery with a supervised webcam assessment, which is how most backpackers do it, and the card follows within a few days.

Queensland has historically been stricter about verified delivery formats, and Western Australia has run its own arrangements. Heading west, confirm acceptance with the employer or the training organisation before assuming a card issued in Sydney works in Karratha.

## Does it expire?

No, in most states it is issued for life and needs no renewal. The exception is time out of the industry: if you have not done construction work for two years, the induction has to be repeated before you go back on site, even though the card itself carries no expiry date.

Photograph it the day it arrives. Losing the physical card is common, replacement is a nuisance from another state, and a photo on your phone will get you onto most sites while a replacement is issued.

## Can you claim it as a tax deduction?

Your first White Card is generally not deductible, because it is the cost of becoming eligible to do the work rather than a cost of doing it, and the ATO treats it the way it treats a first driver's licence.

A renewal or a replacement, obtained while you are already working in construction, is deductible as a work related expense. The same first against subsequent logic applies to a forklift ticket, a heavy vehicle licence and most other tickets.

Keep the receipt regardless. Even where the card itself is not claimable, the boots, the hard hat, the tool belt and the hand tools you bought at the same time generally are, and most of them fall under the [instant write off for items under $300](/blog/tools-equipment-under-300-instant-deduction-whv).

## Where you trained decides more than you expect.

The card requirement is identical everywhere, so the variables are where you trained, where you intend to work, and whether the cost is deductible.

- Whether this is your first card or a subsequent one, which is the whole deduction question.
- Which state you did the course in and which state you intend to work in, since delivery formats differ even though recognition is national.
- Whether you are engaged as an employee or under an ABN, which changes how and where the related expenses are claimed.
- Whether the site work is your main income or a few weeks between other jobs, which affects the work use percentage on the gear you buy for it.
- Whether you bought boots, PPE and tools alongside it, which are usually the larger claim.

Site work expenses are claimed through your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know roughly what you spent on gear.
 `,
 }, {
 slug: "rsa-certificate-australia-working-holiday",
 title:
 "RSA Certificate: Cost and Rules by State",
 description:
 "An RSA is required to serve alcohol anywhere in Australia. It takes three to five hours, costs around $90, and is issued per state rather than nationally.",
 category: "Work Rights" as const,
 date: "5 July 2025",
 readTime: 5,
 body: `
An RSA is legally required before you can serve alcohol anywhere in Australia. The course takes three to five hours, costs around $90, and can usually be done online. It is issued at state level, so a certificate from one state does not always work in the next one. A first RSA taken to get a job is not deductible; a renewal for a job you already have can be.

## What does the RSA course actually cover?

Responsible Service of Alcohol training covers the legal obligations on the person pouring the drink, not just on the licensee.

- Identifying signs of intoxication
- Refusing service legally and without escalation
- The legal obligations of staff and of the venue
- Preventing alcohol related harm
- State liquor licensing rules

Without one you cannot legally serve a drink at a licensed venue, and the penalties fall on both you and the venue. No reputable employer will roster you before the certificate exists.

## Who actually needs one?

Anyone whose role involves serving, selling or supplying alcohol, which is a wider group than bar staff. Waiting tables in a licensed restaurant counts, as do bottle shop, event and cellar door work.

Back of house roles such as kitchen work and cleaning do not legally require one, but many employers ask regardless, because it makes you rosterable anywhere in the venue.

## Does your certificate work in every state?

No, and this is the detail that costs people money. RSA is regulated at state level, so a Victorian certificate does not automatically let you pour drinks in Sydney, and mutual recognition exists between some states and not others.

New South Wales, Victoria and Queensland each require their own state approved course and competency card. South Australia, Western Australia, Tasmania, the Northern Territory and the ACT accept nationally accredited units, with recognition between most of them. If your route runs from Melbourne to Sydney, budget for a second course.

## How long does it last?

Validity depends on the state, and the range is wide enough to matter across a two year working holiday.

- New South Wales: five years
- Victoria, Queensland, Tasmania, ACT and Northern Territory: three years
- Western Australia and South Australia: no expiry

Renewal is generally a short refresher rather than the full course. For most working holiday makers the certificate outlasts the visa, so it is a one off cost.

## Can you claim the cost back?

Only where it relates to hospitality work you already have. A first RSA taken to get a job is a cost of becoming eligible for the work, so it is not deductible. A renewal or a further course for the job you already hold can be a work related self education expense in your [tax return](/tax-return), with the receipt kept. Our guide to [tax deductions for working holiday makers](/blog/tax-deductions-working-holiday-makers) sets out the general test.

## Should you pay for it yourself?

Ask before you do. Many venues cover the course cost when they hire, particularly larger pub groups and hotel chains, and paying two days before an interview at a venue that would have covered it is an avoidable loss.

Where the employer pays, it is not your deduction, because you did not incur the cost. Nor is it where you pay and are later reimbursed. Only an expense you actually bore is claimable.

## What decides how this plays out for you?

Three facts you know before booking a course. Which state you will work in first, which decides the syllabus and the card. Whether you are moving between the eastern states, which decides whether you need a second. And whether you already have a hospitality job offer, which decides both who pays and whether the deduction is available.

Complete the state card for where you are, keep the PDF on your phone because venues ask on the first day, and keep the receipt for the return. Our guide to [bartending on a working holiday](/blog/bartender-jobs-working-holiday-australia) covers what the certificate opens up.
`,
 }, {
 slug: "wwcc-working-with-children-check-australia",
 title:
 "WWCC: Who Needs One, and What It Costs",
 description:
 "Au pairs, camp staff and swim teachers need a Working With Children Check. Costs, processing times and rules per state - and whether volunteers need one.",
 category: "Work Rights" as const,
 date: "18 July 2025",
 readTime: 5,
 body: `
A Working With Children Check is a state issued background screening you need before any work with children in Australia. Fees vary by state (paid work starts at around $80), it is usually free for volunteers, and it takes a few weeks. Which state you work in decides the card, the cost and whether it travels with you.

## What does a Working With Children Check actually screen for?

A risk assessment run by a state government agency, not a criminal record printout. It examines criminal history, findings of inappropriate behaviour involving children, and other state records, to identify people who present an unacceptable risk in child related work.

It is ongoing rather than a snapshot. Once issued, your record continues to be monitored, and a check can be revoked if new information appears. That is why a general police check from home does not substitute for it.

## Which jobs need one, and which only ask for one?

Any paid or volunteer role involving regular contact with children requires one by law, and that is a wider group than childcare. Teaching assistants, tutors, music teachers, sports coaches, camp counsellors, youth program staff, after school care workers, nannies and au pairs all fall inside it.

Au pair work surprises people. It happens in a private home rather than an institution and still triggers the requirement in most states, which matters because those arrangements are often informal and arranged at short notice.

Some employers ask for a check where the law does not require it, usually a blanket venue or school site policy. Holding one makes you rosterable across more roles, which for a backpacker chasing holiday camp work is often the real reason to get it.

## Does your check work in another state?

No, and this is the detail that costs money. Each state runs its own scheme, card, fee and validity period, none of them automatically transferable. New South Wales issues through the Office of the Children's Guardian, Victoria runs its own Working with Children Check, and Queensland uses the Blue Card system.

A summer camp in New South Wales followed by a swim school in Victoria means two applications, two fees and two waiting periods. Apply in the state where the first job is and budget for a second card rather than assuming recognition you may not get.

## How long does it take, and can you work while it processes?

A few weeks is the realistic planning figure, and the bottleneck is usually identity verification rather than the assessment. Most states require an in person appointment, commonly at an Australia Post outlet, with original identity documents, and the clock does not start until that is done.

Whether you can work while the application is pending is state dependent. Some states allow supervised work once the application is lodged and a receipt number issued; others prohibit any child related work until the card is in hand. Ask the state authority rather than the employer, because employers get this wrong in both directions and the penalty falls on the venue as well as on you.

## How long does the card last?

Three to five years in most states, which for a two year working holiday means the card almost always outlasts the visa. New South Wales and Victoria both issue for five years. Queensland's Blue Card and several other schemes run shorter.

So this is a one off cost rather than a recurring one, and the question is not renewal but whether you will need a second state's card during the same trip.

## Can a working holiday maker get one?

Yes. A 417 or 462 visa is no barrier, and there is no citizenship or permanent residence requirement. The application does need an Australian residential address for correspondence, identity documents that match across the set, and in most states an in person verification appointment.

The address is worth thinking about. A hostel you leave in ten days is a poor choice for a posted card, and a returned card is the most common self inflicted delay on these applications.

## Is the fee deductible?

Where the work you are already doing requires the check, the fee is a work related expense and belongs in your tax return with the receipt kept. Obtained speculatively before any child related work, it is harder to justify, because the test looks at the connection to income you are actually earning.

The same principle catches people out on White Cards and RSA certificates. If the employer paid or reimbursed you, it is not your deduction, because you did not bear the cost.

## Which state's rules bind you?

The check itself is straightforward. Which state's rules bind you, and whether you can start before the card arrives, turns on your own plans.

- Which state your first child related job is in, which decides the scheme, the fee and the validity.
- Whether your route crosses a border during the visa, since a second state means a second application.
- Whether the role is paid or volunteer, because volunteer categories are commonly free.
- Whether that state allows supervised work while the application is pending, which decides your available start date.
- Whether you gave a stable postal address, since a returned card restarts the wait.
- Whether you or the employer paid, which decides whether the fee is deductible in your [working holiday tax return](/tax-return).
 `,
 }, {
 slug: "public-holidays-australia-working-holiday",
 title:
 "Public holiday pay in Australia: up to 250% of base rate",
 description:
 "Working a public holiday commonly pays 225% to 250% under an award. Which days count depends on your state, and substitute days move the entitlement.",
 category: "Work Rights" as const,
 date: "20 July 2025",
 readTime: 6,
 body: `
Public holidays attract the highest penalty rates in Australian employment, commonly 225 to 250% of the ordinary rate, and working holiday makers are entitled to them on the same terms as anyone else. Which holidays apply depends on the state you work in; what you are paid depends on the award covering the job.

## Which public holidays apply everywhere?

Seven are observed nationally, the rest state by state: New Year's Day on 1 January, Australia Day on 26 January, Good Friday and Easter Monday on dates that move each year, Anzac Day on 25 April, Christmas Day on 25 December and Boxing Day on 26 December.

The King's Birthday is national in name but not in date. Most states observe it on the second Monday in June; Queensland and Western Australia observe it at other times.

## What does each state add?

Enough that a backpacker working across three states in a year will meet holidays they have never heard of, each paying penalty rates.

- Victoria: Melbourne Cup Day on the first Tuesday in November, and the Friday before the AFL Grand Final
- New South Wales: the August Bank Holiday, which applies to banks rather than generally
- Queensland: the Royal Queensland Show, observed in the Brisbane area
- South Australia: Adelaide Cup Day and Proclamation Day
- Western Australia: WA Day on the first Monday in June
- Tasmania: Royal Hobart Show Day and Eight Hours Day

Labour Day also falls on different dates in different states. Check the calendar for where you are working, not where you were last month.

## What are you paid for working one?

Between 225 and 250% of the ordinary rate in most awards, double time and a quarter to double time and a half, applying to every hour worked on the day rather than to hours beyond a threshold. For a casual, the loading and the holiday penalty interact according to the award rather than simply adding.

On a $25 ordinary rate, 225% is $56.25 an hour and 250% is $62.50. Across a full shift that gap beats any other roster decision a casual makes, which is why volunteering for the shifts locals avoid lifts a month's earnings.

## What if you do not work the holiday?

For permanent full time and part time employees, a public holiday falling on a day you would normally work is paid at your base rate as a day off. No penalty applies because no work was done, but the day is not unpaid.

Casuals get nothing for a public holiday they do not work. That is part of what the 25% loading compensates for, and a casual who does work the day should see a clearly higher rate on the payslip.

## Can your employer make you work it?

An employer can request it, and you can refuse if the request is unreasonable. Reasonableness takes account of the nature of the business, the notice you were given, your personal circumstances and whether the role ordinarily involves holiday work.

Refusing an unreasonable request is not lawful grounds for termination. A casual declining a public holiday shift rarely creates a problem; a permanent employee in hospitality refusing Christmas Day is a harder argument, because holiday trade is intrinsic to the industry.

## Does overtime stack on top?

Generally not. The public holiday rate is already at the top of the penalty structure and usually absorbs overtime rather than compounding with it, so a long shift on a holiday is paid at the holiday rate throughout.

Some awards handle this differently, and a few provide additional treatment beyond a certain number of hours. It is worth reading the actual award clause.

## What should the payslip show?

The public holiday hours separated out at their own rate, not folded into the week's total at a flat figure. That separation is what makes the penalty verifiable, and its absence is the clearest sign it was not paid.

Substituted days count too. Where a holiday falls on a weekend and is observed on the following Monday, the penalty attaches to the substituted day. Our guide to [an employer not paying correctly](/blog/employer-not-paying-correctly) covers what to do when the numbers do not match the roster.

## Were you rostered on the days that pay?

Which holidays you get and what they pay are decided by your job rather than by a national rule.

- Which state you are working in, since several holidays are state specific.
- Which award or enterprise agreement covers the venue, because 225% and 250% are both common.
- Whether you are casual or permanent, which decides both the unworked day and how the loading interacts.
- Whether the day was substituted from a weekend, since the penalty follows the observed day.
- Whether the payslip separates holiday hours at their own rate or shows a flat figure.
- Whether you are engaged under an ABN, in which case no award applies and none of this is owed to you.

Holiday earnings are taxed together with the rest of your wages on your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 }, {
 slug: "casual-shift-cancellation-rules-australia",
 title:
 "Casual shift cancellation: notice and pay rules",
 description:
 "Casuals usually owe no notice to cancel a shift unless an award or contract says so. If the boss cancels on arrival, most awards pay a 2 or 3 hour minimum.",
 seoTitle: "How much notice to cancel a casual shift? Usually none",
 category: "Work Rights" as const,
 date: "20 July 2026",
 readTime: 6,
 body: `
Casuals generally have no notice to give before declining or cancelling a shift, unless an award, agreement or contract says otherwise. An employer can cancel a casual shift too, but most modern awards require a casual who turns up as rostered, or is sent home early, to be paid a minimum engagement of 2 to 3 hours regardless. Which award covers your job decides the number.

## How much notice does a casual have to give to cancel a shift?

Generally none is set by law, in either direction, and that is what makes the answer feel unsatisfying. The Fair Work Ombudsman describes casual employees as having "no firm advance commitment to ongoing work": the employer can offer or not offer work, and you can decline a shift that is offered without giving a reason. Declining is not lawful grounds for retaliation. Casuals also "generally don't need to provide any notice to their employer if they want to resign", and generally are not entitled to notice of termination either.

Two things sit on top of that baseline. Your award, an enterprise agreement or your contract can set terms of its own, so a requirement to give notice before cancelling a shift you have already accepted is worth checking for there, not assuming away. And repeatedly cancelling accepted shifts at short notice can lead the employer to stop offering work, which casual employment allows.

On the employer's side, no general notice period applies before a casual shift is cancelled either, though your award's roster change rules may require one, as set out further down. Once you have turned up, the minimum engagement below decides what you are paid.

## What is a minimum engagement, and why does it exist?

The shortest period a casual can be paid for once engaged for a shift. It exists because turning up is itself a cost: you travelled, you arranged your day around it, and you turned down other work.

The number is set by the award covering your industry, not by your employer and not by your contract. It is the most useful single number a casual worker in Australia can know about their own job.

- Hospitality Industry (General) Award: 2 hours
- General Retail Industry Award: 3 hours for most casuals
- Cleaning Services Award: set by the size of the area cleaned rather than one fixed number, as the [Fair Work Ombudsman explains](https://www.fairwork.gov.au/find-help-for/contract-cleaning/entitlements-for-employees-under-the-cleaning-award)
- Horticulture Award: 2 hours

Show up for a rostered eight hour shift at a Gold Coast restaurant and be told at the door that it is quiet, and the employer has not saved eight hours of wages. They have saved six.

## Does the rule cover a shift cancelled before you leave home?

This is the genuinely uncertain part. A cancellation made before the shift begins sits outside the minimum engagement clause in most awards, because the engagement never started.

What can still apply is your award's rostering and roster change provisions. Several awards require notice before a roster is changed, or consultation where changes are regular, and a pattern of cancelling by text the night before can breach those where a single instance would not. Enterprise agreements sometimes go further and are worth reading if you are covered by one.

## What if you are sent home part way through?

The same minimum applies from the start of the engagement. If your award sets three hours and you are sent home after one, you are generally owed the three, and the reason rarely matters. Slow trade, a quiet dining room, an unexpected closure and an overstaffed roster are the employer's commercial risk rather than yours.

The common version in hospitality is being sent home after the lunch rush on a shift rostered through to close.

## Do casuals get sick pay if they cannot attend?

No. Casual employees do not accrue paid sick leave or paid annual leave, and a shift you cannot work is a shift you are not paid for. That is the deliberate trade behind the 25% casual loading on your hourly rate.

The loading is not optional generosity. If your payslip shows the base award rate with no loading applied and you are engaged as a casual, that is an underpayment in itself, and it is more common than the shift cancellation issue.

## Is your employer required to give you any shifts at all?

No. Casual employment carries no guaranteed hours, and a roster that thins from four shifts a week to one is not in itself a breach. The flexibility runs both ways: you can decline shifts too, and declining is not lawful grounds for retaliation.

Long term regular casuals can in some circumstances have a pathway to permanent employment, but that is a longer arrangement than a working holiday visa allows for.

## What should you keep if you think you are owed money?

Evidence of the roster and of the cancellation. Screenshot the roster when it is published, since rostering apps overwrite rather than archive, and keep the message that cancelled it.

Then compare against your payslip. Most claims of this kind are disputes about what happened rather than about the law, and a screenshot settles them. The Fair Work Ombudsman handles unresolved complaints, and a pattern of unpaid cancellations is straightforward to evidence. Back pay you recover counts as income for the year it is paid, so it goes on your [working holiday tax return](/tax-return) with your other wages. Keep the payslip or letter that shows it.

## When was the shift cancelled?

Minimum engagement is whichever number your award sets, and whether it applies at all turns on when the shift was cancelled.

- Which award covers your job, since that sets the minimum engagement and the rostering rules.
- Whether an enterprise agreement applies, which can be more generous than the award.
- Whether the shift was cancelled before it started or ended early, which is the line the clause turns on.
- Whether you are genuinely a casual or engaged through an ABN, because a contractor has no award, no minimum engagement and no loading.
- Whether the 25% casual loading is actually on your payslip.

Underpaid or not, everything withheld from those pays reconciles at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 }, {
 slug: "six-month-employer-rule-working-holiday-visa",
 title:
 "6-month employer rule on a WHV: who is exempt",
 description:
 "Condition 8547 limits you to six calendar months with one employer. Farm, hospitality and care work are exempt. Who counts as one employer, and breaches.",
 seoTitle: "6 month employer rule on a WHV: who is exempt",
 category: "Work Rights" as const,
 date: "29 July 2026",
 readTime: 5,
 body: `
Visa condition 8547 limits 417 and 462 holders to six calendar months with the same employer. It is measured in calendar time, not hours worked. A long list of industries is exempt, and those exemptions cover most of the work backpackers actually do, so for most people the rule never bites.

## What exactly does the rule restrict?

Six calendar months with one employer, counted from your start date regardless of hours worked. Two days a week for six months uses the same allowance as full time.

- Measured in calendar months, not days or hours worked
- Applies per employer, not to your total time in Australia
- Breach can lead to visa cancellation
- The clock resets only when a new working holiday visa is granted

The condition exists to keep the visa about travel rather than employment, which is why the exemptions are drawn around industries with genuine seasonal labour shortages.

## Who counts as the same employer?

The legal entity behind the ABN, not the building you work in.

- The same company across different branches is generally the same employer
- Related businesses trading under different ABNs are different employers
- Franchises under different owners are different employers
- In labour hire, the host business where you actually work is treated as the employer
- For contractors, each end client is a separate employer

Check the ABN on your payslip to know which entity employs you. Two venues with the same name and different ABNs are two employers.

## Which work is exempt?

The Department of Home Affairs exempts a long list of sectors covering the substantial majority of working holiday employment. On this list you can stay with the same employer beyond six months without asking anyone. Home Affairs states these exemptions apply from 1 January 2024 until the Government makes further decisions, so confirm the current list before relying on it.

- Plant and animal cultivation, anywhere in Australia
- Natural disaster recovery, anywhere in Australia
- Agriculture, food processing, health, aged and disability care, childcare, and tourism and hospitality, anywhere in Australia
- Fishing and pearling, tree farming and felling, construction and mining, in northern Australia only (defined by postcode in Queensland, Western Australia and the Northern Territory)
- Different locations of the same employer, where no single location exceeds six months

Tourism and hospitality is on the nationwide list, which removes the concern for the largest single group of working holiday workers, for as long as the exemption stays in place.

## What if your work is not exempt?

Permission has to be requested from the Department of Home Affairs (online form) before the six months ends, not after, and it is not retroactive. If you asked in time you can keep working for that employer until you receive the written decision, and you must stop if it is refused. If you ask late, you must stop working for that employer until you get an outcome.

Approval is discretionary, and the grounds usually put forward are practical: a new visa application already lodged that would allow full time work, a priority sector with employer support, or a genuine operational reason. Leaving the request until week 25 is the most common reason it does not go smoothly.

## How does this interact with the 88 days?

They are separate rules that happen to overlap. The 88 days of specified work for a second year visa is an immigration requirement about the type and location of work. Condition 8547 is a limit on time with one employer.

Most specified work industries are also exempt from the six month rule, so completing all 88 days with a single farm is usually fine. For a third visa the requirement rises to six months of specified work during the second visa year, which is why the exemptions matter more at that stage.

## What does a breach actually cost?

More later than immediately. The immediate risk is visa cancellation, real but not the usual outcome. The durable cost is the record: a breach sits against you when any future Australian visa is assessed, including a second working holiday visa or a skilled visa years later.

There is a separate exposure on the employer's side, which explains why some refuse to keep you past six months even where an exemption applies. They are managing their own compliance.

## What decides whether this is an issue for you?

Three facts, all settleable this afternoon. Which industry the work is in, since the exemptions are broad. Which legal entity employs you, which is on the payslip as an ABN. And when you actually started, because the clock is calendar based and people misremember by weeks.

Where no exemption applies, changing employers is usually simpler than seeking permission, and the tax and super consequences are minor. The same withholding rules apply throughout, [superannuation](/superannuation) continues to accrue at 12%, and all the wages combine into one [tax return](/tax-return) at the end of the year. The one thing worth managing is the super: each new employer means a new nomination, and giving every one of them the same fund details is what stops a year producing four accounts and four claims.
`,
 },

 // ─── GENERAL / PRACTICAL - NEW ────────────────────────────────────────────
 {
 slug: "opening-bank-account-australia-working-holiday",
 title: "Australian bank account on a WHV: apply before you fly",
 description:
 "All four major banks open accounts on a passport, and most let you apply online before you arrive. Fees, your TFN, transfers and when to close it.",
 category: "Medicare & Other" as const,
 date: "4 August 2025",
 readTime: 6,
 body: `
You need an Australian bank account for wages, and later for your tax refund and your super payment. All four major banks open accounts for working holiday makers on a passport, and most let you apply online before you arrive. The important decision is not which bank, it is when you close it.

## Which bank should you choose?

There is very little between Commonwealth Bank, Westpac, ANZ and NAB: low fee everyday accounts, apps, debit cards and wide ATM networks.

The one criterion that varies is coverage along your route. Branches and ATMs in the regional towns you are heading to beat a marginally better fee structure, because fee free ATM access in Mildura or Bowen is not a given.

## What do you need to open one?

Less than people expect. A valid passport, an Australian address that can be temporary, and ideally an Australian phone number are enough for most banks.

- A valid passport
- An Australian residential address, including a hostel
- An Australian phone number
- A second form of identity in some cases
- Your TFN, which is useful but not required

Most banks let you begin the application online before you fly, with identity verification completed at a branch in the first days after arrival.

## Do you have to give them your TFN?

No, and you can open and operate an account without one. The consequence is confined to interest: without a TFN recorded, the bank must withhold tax from interest earned at the top rate.

On a transaction account earning cents that is irrelevant. Add the TFN when the letter arrives, and do not let its absence delay opening the account: you need a BSB and account number before your first shift.

## What do the fees actually cost?

Most major banks charge a monthly account fee of around $5, usually waived if a minimum is deposited each month, commonly around $2,000. Anyone working regular hours clears that, and the fee only bites in a month you were travelling rather than working.

Several banks also run fee free accounts for new arrivals and students, which sidestep the threshold. They are not always the default offered at the counter, so ask.

## Should you use a transfer service instead?

A transfer service is a complement, not a replacement. They generally beat a bank's exchange rate on a four figure transfer home, but they do not give an Australian employer's payroll what it needs, and they are not where the ATO pays a refund.

The workable setup is both: an Australian bank account to receive wages, tax refunds and super, and a transfer service to move money home when the time comes. Our guide to [transferring money out of Australia](/blog/transferring-money-overseas-australia-tax) covers the tax position, which is that there isn't one.

## When should you close the account?

Not when you fly. This is the most consequential banking decision on a working holiday, and almost everyone makes it casually in the last week.

Both your tax refund and your DASP super payment arrive weeks or months after departure, and both pay into an Australian account. Keep it open for three to four months after you leave, then transfer the balance and close it.

- Have the [tax return](/tax-return) lodged around your departure, and the [DASP](/superannuation) claim made once your visa has ceased
- Keep the account open for three to four months after departure
- Transfer the balance home once both payments have cleared
- Close the account last

Closing it first does not lose the money, but re-establishing payment details with the ATO and a super fund from another country turns a two week wait into a several month one.

## How do you avoid the scams that target new arrivals?

Assume that any message asking you to click a link and enter banking details is a scam, because it is. The ATO does not ask you to update bank details by text or email link, does not demand payment in gift cards or cryptocurrency, and does not threaten arrest or visa cancellation.

Working holiday makers are targeted deliberately: a recent arrival does not yet know what normal ATO contact looks like, and a visa threat lands harder on someone whose visa is the reason they are here. Check independently rather than engage with the message. Our guide to [protecting your TFN](/blog/tfn-security-protect-from-fraud) covers who is entitled to ask for your details.
`,
 }, {
 slug: "trs-tourist-refund-scheme-australia",
 title:
 "Tourist Refund Scheme: claim 10% GST back at the airport",
 description:
 "Spend $300 or more with one business within 60 days of leaving and claim the GST back at the TRS desk. What to bring, how it is paid, and is it worth it.",
 category: "Medicare & Other" as const,
 date: "8 August 2025",
 readTime: 6,
 body: `
The Tourist Refund Scheme returns the 10% GST on goods you buy in Australia and carry out with you. The invoice must total $300 or more from a single business, dated within 60 days of departure, and you must have the goods with you at the airport. A $1,000 laptop refunds about $91.

## What is the Tourist Refund Scheme actually for?

GST is a tax on consumption in Australia, so goods leaving the country with you were never meant to carry it. The Tourist Refund Scheme gives it back, run by the Australian Border Force at international airports and some seaports. It refunds the 10% GST, and it can also refund Wine Equalisation Tax on eligible wine.

It is open to every departing traveller, including working holiday makers. Nothing about your visa affects eligibility, and using it has no bearing on your tax return or your [super](/superannuation) claim.

## Which purchases actually qualify?

A purchase qualifies only if it meets all five conditions, and failing any one disqualifies the claim. The one that catches people is the single business rule: $300 has to come from one ABN, not $300 of spending across a shopping centre.

- Goods bought from a single business trading under a single ABN
- A total invoice of $300 or more, including GST
- Purchased within 60 days of your departure date
- The goods with you and available for inspection
- Physical goods, not services

Electronics, cameras, phones, laptops, watches, jewellery, luggage, clothing and sporting goods all qualify. Services do not, so accommodation, tours and massages are out, and so are tobacco, GST free items, anything you have already consumed, and anything you posted home.

## What do you need to bring to the desk?

Four things: passport, boarding pass, the original tax invoices, and the goods themselves. Missing any one ends the claim, and the invoices are the item most often left in a hostel or thrown away weeks earlier.

The invoice has to show the seller's name and ABN, the GST paid or a total including GST, a description of the goods and the purchase date. For invoices over $1,000 your own full name must appear on the invoice, which the retailer has to add at the time of purchase rather than afterwards.

## How does the claim work at the airport?

Check in as normal, keep the goods in your hand luggage, and go to the TRS facility after security in the international terminal. Staff check the passport, boarding pass and invoices, inspect the goods, and process the refund to the payment method you nominate.

Allow real time. Queues run long in the departure peaks and the desks close well before your gate, so arrive 90 minutes before the flight rather than the usual 60. The MyTRS app lets you lodge the details in advance, which shortens desk time but does not remove the inspection.

## How and when is the money paid?

The refund is paid to a credit card, an Australian bank account, or by cheque, and you choose at the desk. It cannot be paid into an overseas bank account. Credit card is the most common and the fastest, usually landing within about five business days.

If you are closing your Australian bank account before you fly, nominate a card rather than that account, because a refund sent to a closed account has nowhere to land.

## Is it worth the time for a working holiday budget?

On a single large purchase, clearly. On a scattered year of small spending, no. The 10% comes back on the GST inclusive price, so $1,000 of electronics returns about $91 and $3,000 returns about $273, against roughly half an hour of queueing.

- A $1,000 laptop refunds about $91
- A $2,000 camera refunds about $182
- A $500 watch refunds about $45

Buying the laptop or camera you were going to buy anyway in your final fortnight, so the invoice falls inside the 60 days, is legitimate and common.

## What decides whether your claim succeeds?

Four facts about how you shopped, all settled long before you reach the airport. Whether the $300 sat with one business, since multiple receipts from the same retailer combine and ten shops at $30 do not. Whether the purchase date falls inside 60 days of departure, counted back from the flight. Whether you still have the original invoice. And whether the goods are physically with you rather than in the hold, mailed home, or already worn out.

Oversized items are the edge case. A surfboard or a large instrument cannot go through the cabin, so inspection has to be arranged with the airline and the TRS desk before check in, days ahead rather than on the morning.

## Where does the TRS sit in the rest of your departure?

The TRS is the one part of leaving Australia that cannot be done afterwards. Once you pass through the gate the claim is gone permanently, whereas your [tax return](/tax-return) and your DASP super claim can both be lodged from home months later.

The refund at the airport is worth tens or low hundreds of dollars. The return and the super claim are often worth more, depending on your year, and they are the ones that survive the flight.
`,
 }, {
 slug: "transferring-money-overseas-australia-tax",
 title:
 "Is sending money home from Australia taxed? No",
 description:
 "No. Sending your own after-tax wages home is not taxed. Transfers are reported to AUSTRAC, which is monitoring, not tax. Will home tax it, and the fees.",
 category: "Tax Return" as const,
 date: "11 August 2025",
 readTime: 5,
 body: `
No. Moving your own money out of Australia is not a taxable event. Wages are taxed when you earn them, not when you spend or transfer them, so an after tax balance can leave the country freely. International transfers are reported to AUSTRAC, which is monitoring, not taxation.

## Why is a transfer not taxed?

Tax attaches to income, and a transfer is not income. Sending Australian dollars to an account in your own name at home, converting currency, or moving savings you brought in with you all move money that has already been through the tax system or was never in it.

What the ATO taxes is what you earned here: wages at the working holiday maker rates, contractor income under an [ABN](/abn), tips, interest on an Australian account, and cash work, which is taxable whether or not it appeared on a payslip. Once the [tax return](/tax-return) has settled that, the balance is your business.

## What is actually reported when you send money home?

Two reporting rules exist and neither creates a liability. Banks and money transfer services report international transfers of any amount to AUSTRAC automatically and without any action from you. Physical cash of $10,000 or more crossing the border must be declared to the Australian Border Force.

Both are anti money laundering measures. Visibility is not taxation, and honest wage money moves without difficulty. What is an offence is deliberately splitting cash deposits or withdrawals to stay under the $10,000 cash reporting threshold. That is called structuring, and it is treated far more seriously than the transfer would have been.

## Will you be taxed again at home?

That depends on your own country's rules rather than Australia's. Most of the countries working holiday makers come from have a double tax agreement with Australia, which generally lets Australian tax already paid be credited against any home liability on the same income.

The treatment varies more than people expect. Some countries treat a year of Australian working holiday earnings as ordinary foreign income and want it declared; others largely disregard it. A tax adviser in your own country is the right person for that half.

## What order should you do things in before you fly?

The order matters more than the tax treatment does, because two payments arrive after you have gone. Any tax refund and your DASP super payment are paid into a nominated account weeks or months after lodgement, so the account has to still exist when they land.

1. Lodge the Australian [tax return](/tax-return) for your final year
2. Once your visa has ceased and you have left, have the [superannuation](/superannuation) DASP claim made
3. Cancel any ABN you registered
4. Wait for the refund and the super payment to arrive
5. Transfer the balance home
6. Close the Australian account last

Closing the bank account early is the most common and most expensive mistake we see. The money is not lost, but recovering it means re-establishing payment details with the ATO or a super fund from overseas, which turns a two week wait into a several month one.

## What decides how much actually arrives at the other end?

Not tax, but the exchange rate and the fee, and the two are often presented so the worse deal looks cheaper. A bank quoting a low flat fee frequently builds a wider margin into the rate itself, so on a four figure transfer the headline fee is the smaller half of what you pay.

Compare on the amount that lands in your home account, not on the fee. That is the only number that means anything.

## Does money you brought into Australia change anything?

No. Savings you arrived with are yours, bringing them in was not income, and taking them out again is not a taxable event either. The Australian system only ever looks at what you earned while you were here.

If you brought in a large sum and want to send it back out, the transfer is reported like any other international transfer and there is nothing to answer for. Keeping the original bank statement to show where the money came from is worth the two minutes.

## What still ties you to Australia after the money has gone?

Moving your funds home settles nothing with the ATO. The obligation to lodge for your final Australian financial year is independent of where the money sits, and it runs to 31 October after the year ends whether or not you are still in the country. Our guide to [tax after leaving Australia](/blog/tax-obligations-after-leaving-australia) covers what is still outstanding once you have gone.

A year that ends part way through, in December or February, still needs its return. At the flat 15% working holiday maker rate a short year is not over taxed on that rate alone, but any over withholding, such as weeks at 45% before your TFN was on file, is only refunded if the return is lodged.
`,
 },

 // ─── ABN ADVANCED - NEW ────────────────────────────────────────────────────
 {
 slug: "vehicle-logbook-abn-working-holiday",
 title:
 "The 12-Week Logbook for ABN Car Costs",
 description:
 "A valid logbook lets ABN workers claim the business share of all car costs - often beating the cents-per-km cap. How to keep one the ATO accepts.",
 category: "ABN" as const,
 date: "12 August 2025",
 readTime: 6,
 body: `
Two methods, and how far you drive for work decides which suits you. For 2026-27, cents per kilometre pays 91 cents a kilometre up to 5,000 kilometres a year with no logbook, capped at $4,550 (for 2025-26 returns it is 88 cents, capped at $4,400). The logbook method has no cap but requires twelve continuous weeks of records, and it fails most often for lack of them.

## What counts as business travel?

Travel with a genuine business purpose, narrower than most people assume and wider in one respect. Driving between job sites on the same day is business. So is travel to buy equipment or supplies, to a client, for training directly related to the work, and from your accommodation to a temporary work site where the location varies.

Not business travel: the daily commute from home to one regular workplace, however early or far, and personal travel. The first and last trip of the day to and from your main work base is generally private.

For a backpacker with a car this splits cleanly. The drive from your hostel to a farm for ABN work is business. The Sydney to Cairns road trip is not.

## How does the cents per kilometre method work?

You claim a set rate for each business kilometre on your [ABN](/abn) work with no receipts for running costs. For 2026-27 the rate is 91 cents, the limit is 5,000 business kilometres a year, and the maximum deduction is $4,550.

You still need a reasonable basis for the kilometres: a simple record of date, distance and purpose for each trip. No odometer readings or formal logbook, which makes it the practical choice for occasional driving.

## How does the logbook method work?

You establish a business use percentage over twelve continuous weeks, then apply it to every vehicle cost for the year. During those weeks you record every trip, business and private, with date, start and end odometer readings, and purpose.

The percentage applies to fuel, insurance, registration, servicing, repairs and depreciation. Sixty per cent business use against $8,000 of vehicle costs is a $4,800 deduction, uncapped, so a driver with high running costs clears the cents per kilometre maximum comfortably.

The logbook remains valid for five years, or until your usage pattern changes significantly. Twelve weeks of admin covers the rest of the visa, which is the argument for doing it early.

## Where is the crossover?

At around 5,000 business kilometres, which full time rideshare and delivery drivers pass within months. Below that, cents per kilometre is simpler and comparable. Above it, the logbook method is worth substantially more, and the gap widens with every kilometre.

Financing or leasing pushes the calculation further toward the logbook, because interest and depreciation are captured by the percentage method and not by a per kilometre rate.

## What records does either method need?

More than most people keep, which is why vehicle claims are the most commonly disallowed item in the category. Keep receipts for every vehicle expense, the logbook or trip records, odometer readings at the start and end of the financial year, and the purchase invoice if you bought the car that year.

Keep all of it for five years from the date the return is lodged. A claim that cannot be evidenced is not a deduction.

## Does the method carry across cars?

A logbook is kept for a particular car, so a change of car generally means a new twelve week logbook for the new one. The cents per kilometre method is not tied to a single vehicle.

That matters here, because selling one car and buying another partway through a stay is common. It is worth allowing for when deciding which method suits you.

## Logbook or cents per kilometre for you?

Both methods are available to any ABN holder. Which one is worth more, and whether it survives review, depends on your own driving.

- How many business kilometres you drive in a year, since 5,000 is the point the cap bites.
- Whether you kept twelve continuous weeks of logbook records, which is what makes the uncapped method available.
- What your total running costs are, since the logbook percentage applies to all of them.
- Whether the vehicle is financed or leased, which adds interest and depreciation to the pool.
- How clearly your business and private travel are separated in the records.
- Whether the trips you counted are genuinely business rather than commuting.

The method producing the larger legitimate deduction is chosen when the [working holiday tax return](/tax-return) is prepared, and you can [estimate your tax refund](/calculator) once you know roughly what your ABN income and costs came to.
 `,
 }, {
 slug: "small-business-tax-offset-working-holiday-abn",
 title:
 "Small Business Tax Offset on ABN Income",
 description:
 "The offset can reduce tax on sole-trader income by up to $1,000, and working holiday makers with ABN income may be eligible. How it is calculated.",
 category: "ABN" as const,
 date: "16 August 2025",
 readTime: 5,
 body: `
It reduces the tax payable on ABN income by 16% of that tax, capped at $1,000 a year. Sole traders qualify; companies and trusts do not. It is non refundable, so it can reduce tax to zero but cannot create a refund on its own, and the ATO only works it out when your net small business income from your [ABN](/abn) is reported on the return.

## What is it actually discounting?

The tax attributable to your business income, not the income itself and not your whole assessment. That is why the figure ends up small.

The calculation runs in three steps. Take your net small business income, being ABN receipts less ABN deductions. Identify the tax attributable to that slice. Apply 16% to it, capped at $1,000. So $12,000 of delivery income less $2,500 of deductions leaves $9,500 net, tax on that slice, illustrated here at 15%, is $1,425, and the offset reduces it by $228.

## Who qualifies?

Individuals with business income under an ABN, as a sole trader or a partner in a partnership, with aggregated annual turnover under $5 million. For a working holiday maker the turnover test is never the issue, so having ABN income is the qualification.

Companies and trusts are excluded, because the offset exists to give unincorporated businesses something in place of the lower company tax rate. Hence its other name, the unincorporated small business tax discount.

## What is it worth at typical backpacker income levels?

Modest, and worth having. The offset scales with the tax on the business slice, up to the cap. These figures assume 15% tax on that slice, for illustration only.

- $5,000 of net ABN income: an offset in the region of $120
- $15,000: around $360
- $30,000: around $720
- Above that: capped at $1,000

Deductions reduce the offset as well as the tax, because a smaller net business income means less tax attributable to it. That is not a reason to claim fewer deductions, since a dollar of deduction saves more than the 16% the offset gives back.

## Can it be combined with other offsets?

Yes, and for a working holiday maker with mixed income it usually is. Each offset is calculated separately and applied to the final position.

- The small business tax offset, on the tax attributable to business income, capped at $1,000
- The low income tax offset, which depends on how your year is assessed
- The Medicare levy exemption, which removes the 2% levy where you are not entitled to Medicare

How your year is assessed affects whether the low income offset is available, and your individual facts affect the Medicare question. Our guide to [the low income tax offset](/blog/low-income-tax-offset-working-holiday) sets out that side.

## What happens when you had both wages and ABN income?

Both go on one return, and only the ABN portion attracts this offset. Deductions and other offsets apply across the whole assessment.

That works in your favour more often than people expect, because the PAYG withheld from wages frequently covers the tax owed on the untaxed ABN income. The offset then reduces the remaining business tax, turning a small amount payable into nothing owing.

## What voids it?

Income that is not genuinely business income. If an arrangement is reclassified as employment rather than contracting, the income stops being small business income and the offset goes with it, along with the deductions claimed against it.

Sham contracting, where a worker is put on an ABN for what is really a supervised hourly job, is widespread in hospitality and farm work, and the reclassification brings back award rates, superannuation and workers compensation while removing the offset. Our guide to [the employee versus contractor test](/blog/employee-vs-contractor-australia) sets out how the line is drawn.

## What if you already lodged without it?

It can generally be claimed by amending the return, and the standard amendment window is two years from the date the original assessment issued. A first year backpacker who lodged the previous October is often still inside it.

Self lodged returns miss this offset regularly, because the ATO can only work it out when the net small business income label is completed, and that label is easy to leave empty.

## What is the offset worth to you?

The rate and the cap are fixed. What it is worth to you is decided by the shape of your year.

- How much of your income ran through the ABN rather than through wages.
- What your deductions came to.
- Whether you also had wages, whose withholding often absorbs the business tax before the offset is reached.
- Whether the contracting was genuine, since reclassification removes it.
- How your year is assessed, which affects whether the low income offset can apply alongside it.
- Whether a prior year was lodged without claiming it, amendable within two years.

Every eligible offset is applied when the [working holiday tax return](/tax-return) is prepared, and you can [estimate your tax refund](/calculator) to see how the two income types combine.
 `,
 }, {
 slug: "sole-trader-vs-company-australia-working-holiday",
 title:
 "Sole Trader or Company on a WHV?",
 description:
 "A company costs hundreds per year and adds ASIC duties - overkill for delivery and farm contracting. When sole trader is right and the rare exceptions.",
 category: "ABN" as const,
 date: "2 September 2025",
 readTime: 6,
 body: `
Sole trader, almost always. A sole trader is you, operating under an [ABN](/abn), with the business income flowing onto your personal return at working holiday maker rates. A company is a separate legal entity with its own tax at 25%, its own filings and its own costs. At backpacker income levels the company loses.

## What is the actual difference?

Legal separation. A sole trader is not separate from the business: the income is your income, it goes on your individual return, and you are personally liable for what the business owes. Registration is the ABN and nothing more.

A company has its own ABN, its own tax obligations, and limited liability that protects personal assets. It also requires registration with ASIC, annual review fees, separate financial accounts, a company tax return, a director identification number and ongoing director obligations. That overhead exists whether the company trades or not.

## How do the tax rates actually compare?

Badly for the company, at these income levels. Where working holiday maker rates apply to your year, a sole trader pays 15% on the first $45,000 of business income and 30% above it. A company pays a flat 25% on every dollar from the first.

On $30,000 of ABN income, on that basis, the sole trader position is $4,500 of tax and the company position is $7,500, before any of the company's running costs. Then the money still has to come out of the company as salary or dividends, which is taxed again in your hands.

## What would a company actually cost?

Enough to make the comparison one sided. ASIC registration is in the region of $600, the annual review fee is a few hundred more, a company tax return has to be prepared separately from your personal one, and the director obligations include identity verification.

The exit is the standing problem. A visa limited director who leaves Australia with a dormant company still has ASIC obligations, and they accrue in your absence. A sole trader closes the whole thing by [cancelling the ABN](/blog/how-to-cancel-your-abn), which is free and takes minutes.

## When would a company genuinely make sense?

In situations that essentially never describe working holiday work. Multiple owners sharing a business, liability heavy contracting where insurance is not sufficient protection, or income high enough that the tax and structuring advantages outweigh the running costs, which is a threshold far above what a 417 or 462 year produces.

Licensed specialist trades such as electrical and plumbing are the closest real case, and those require qualifications most working holiday makers do not hold. Delivery riding, farm contracting, cleaning and freelance work do not come near it.

## What if a platform or employer insists on one?

Treat the requirement as something to investigate, not an instruction. There are legitimate contexts where a principal will only engage incorporated contractors, usually for insurance reasons on large sites.

The demand can also exist to push obligations away from whoever should be carrying them. If someone wants you incorporated for what is plainly hourly supervised work, the classification question comes first, and our guide to [the employee versus contractor test](/blog/employee-vs-contractor-australia) covers how that is decided.

## What about personal liability as a sole trader?

Real but usually small, and cheaper to insure than to structure around. For cleaning, hospitality, delivery and basic trades the exposure is limited, and public liability insurance covers most of it at a modest cost.

Compare an insurance premium against the total cost of forming and maintaining a company for a stay of a year or two. For almost every working holiday maker, the premium wins.

## Are partnerships or trusts ever relevant?

Rarely, and for the same reasons. A partnership is two or more people sharing business income, with its own return and its own rules about how income is split and who is liable. A trust holds income or assets for beneficiaries and exists mainly for asset protection and distribution flexibility.

Both add administration to a situation that does not have the scale to justify it. If two backpackers are genuinely running something together, that is worth advice rather than a default answer.

## Does the structure change what you can deduct?

Barely, which removes the last argument people make for incorporating. A sole trader deducts the same genuine business expenses a company would: tools, vehicle costs on a logbook or per kilometre basis, the work share of phone and internet, insurance, licences and fees for managing your tax affairs.

What the company adds is not deductions but administration, which is itself a cost. Our guide to [ABN deductions](/blog/abn-deductions-business-expenses) sets out what is claimable either way.

## Would anything move you off sole trader?

The facts that would move it are specific and uncommon. If none of the points below describes your situation, sole trader is the answer.

- How much you expect to earn under the ABN, since personal rates generally beat company tax across the realistic range.
- Whether anyone else shares ownership of the work.
- Whether the work carries liability that insurance cannot reasonably cover.
- Whether a principal genuinely requires incorporation, and why.
- How long you will be in Australia, since company obligations continue after you leave.
- Whether the arrangement is really contracting at all, which is the first question rather than the last.

Whatever the structure, the income is reconciled in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know what the year came to.
 `,
 }, {
 slug: "profit-loss-vs-personal-services-income-australia",
 title:
 "Personal services income or business income? The 80% rule",
 description:
 "Most working holiday ABN income is personal services income, as you are paid for your own labour. How the 80% rule works, and the deductions PSI limits.",
 category: "ABN" as const,
 date: "3 September 2025",
 readTime: 5,
 body: `
Almost all working holiday [ABN](/abn) income is personal services income, because you are paid for your own labour rather than for goods, assets or other people's work. PSI is not a penalty. It restricts a small set of deductions that backpackers rarely have anyway.

## What counts as personal services income?

Income earned mainly from your own skills or effort rather than from selling something. If the payer is buying your hands and your hours, the income is PSI whatever the invoice says.

- Tradespeople paid for their labour
- Cleaners paid for their cleaning
- Fruit pickers paid by the bin or by the hour
- Freelancers and consultants paid for their own work
- Delivery riders paid per drop

A carpenter invoicing a construction company is paid for hours and skill, so that is PSI. So is a picker invoicing a labour hire contractor.

## What would make your ABN income business income instead?

Business income comes from something other than your personal effort: goods you produce, assets you own, or people you employ. The test is whether the money would still arrive if you were not there to do the work. For nearly every backpacker on an ABN, the answer is no.

- Producing and selling goods, such as a bakery
- Income from business assets, such as leasing equipment
- Employing others to do the work you have contracted for
- Reselling products bought from suppliers

## How does the 80% rule actually work?

The results test comes first: pass it and the PSI rules do not apply, however many clients you have. Fail it, and the 80% rule decides what happens next: if 80% or more of your personal services income in a year comes from one client and their associates, you cannot self assess out of the PSI rules. Below 80%, the other tests can take you out of PSI, and you need pass only one.

- **Results test**: you are paid for a specific outcome, supply your own tools, and are liable to fix defects at your own cost
- **Unrelated clients test**: you have two or more unrelated clients won through public advertising or a similar offer
- **Employment test**: you pay someone else to do at least 20% of the principal work
- **Business premises test**: you work from premises that are physically separate from your home and your client's

In practice most working holiday makers fail all four. One farm, one agency or one platform supplies nearly all the income, the tools are the client's, and there is no separate premises.

## Which deductions does PSI actually restrict?

PSI restricts deductions that only make sense inside a real business structure and leaves the ordinary work related deductions intact. What goes is the ability to shift income or costs onto other people.

Still deductible under PSI:

- Tools and equipment you personally use
- Protective clothing and uniforms
- Travel between work sites on the same day
- Vehicle expenses for genuine business travel
- The work portion of phone and internet
- Self education directly related to the work you are already doing

Restricted or unavailable under PSI:

- Wages or [superannuation](/superannuation) paid to a partner or family member for support work
- Rent for premises that the work does not genuinely require
- Most home office occupancy costs

## Does PSI change what a rider or a picker can claim?

For riders, pickers, cleaners and labourers, PSI changes almost nothing. The bike, the boots, the phone plan share and the kilometres between sites are still claimable. The restricted deductions are ones this group does not have.

We see the anxiety far more often than the consequence. Someone reads that their income is PSI, assumes deductions are being taken away, and either overclaims or claims nothing. Both cost money.

## When does the classification genuinely change your outcome?

It matters when the ABN work is a real second business rather than dressed up wages. If you subcontracted other backpackers, split invoices with a partner, or ran two genuinely unrelated client bases, the tests can produce a different answer and the deduction set widens.

It also matters when the ABN was never appropriate. Where the arrangement looks like employment, with set hours, supervision and the client's equipment, the issue is not PSI but sham contracting, which changes who owes your super and your minimum rates. Our guide on [employee versus contractor status](/blog/employee-vs-contractor-australia) sets out that test.

## What decides it in your case?

Four facts you already know: how many clients paid you, whether any one accounted for 80% or more of the ABN income, whether you supplied the tools and carried the risk of fixing your own mistakes, and whether anyone worked for you.

PSI, sham contracting and ordinary contracting all look identical on a bank statement and produce different returns. When we prepare a [tax return](/tax-return) with ABN income in it, describing the work accurately, who paid you, how you were paid and whose equipment you used, is what tells us which rules apply.
`,
 },

 // ─── TAX RETURN ADVANCED - NEW ────────────────────────────────────────────
 {
 slug: "low-income-tax-offset-working-holiday",
 title:
 "Low income tax offset on a working holiday visa? Usually no",
 description:
 "Generally not: income taxed at working holiday maker rates sits outside the resident scale LITO belongs to. When residency changes that, and other offsets.",
 category: "Tax Return" as const,
 date: "15 September 2025",
 readTime: 5,
 body: `
Generally not on income taxed at working holiday maker rates. The Low Income Tax Offset belongs to the ordinary resident tax scale, while 417 and 462 income is normally taxed under its own schedule at 15% from the first dollar. A residency finding, including under the Addy ruling, can change that for some people, case by case.

## What is an offset, and why is it worth more than a deduction?

An offset reduces the tax you owe. A deduction reduces the income the tax is calculated on. The same dollar figure produces very different outcomes.

- A $700 deduction against income taxed at 15% saves you $105
- A $700 offset reduces your tax bill by the full $700

LITO is worth up to $700 for taxable income up to $37,500, shading down through $37,500 to $66,667 and disappearing above that. It is also non-refundable, meaning it can reduce tax to zero but never turns into a payment on its own.

## Does it apply to working holiday makers?

LITO sits in the ordinary resident tax system, while working holiday maker income is generally taxed under its own schedule. Whether the offset attaches to your income depends on how your year is assessed, and you should not assume either way.

## When does it become available?

That depends on how your year is assessed. Residency depends on your own circumstances, has to be properly reviewed, and is easy to call wrongly in both directions.

What any finding is worth varies from person to person and is assessed case by case when the return is prepared, with the ATO making the final decision. Our guide to [tax residency](/blog/tax-residency-working-holiday-makers) covers why the question is harder than it looks.

## What can you claim instead?

Relief can also reach working holiday makers through exemptions and deductions. Whether and how much applies depends on your own year.

- The [Medicare levy exemption](/blog/medicare-levy-working-holiday-makers), for someone not entitled to Medicare
- The [small business income tax offset](/blog/small-business-tax-offset-working-holiday-abn) on ABN sole trader income, worth up to $1,000
- Recovery of any period withheld at 45% before your TFN reached the employer
- Work related deductions, where they are properly substantiated

Rather than assuming anything about LITO, it is better to have the whole position reviewed, including the Medicare position and a complete deduction list.

## What happens if an offset exceeds your tax?

Nothing is paid out. LITO is non-refundable, so if your liability is $500 and the offset is $700, the tax becomes zero and the remaining $200 disappears rather than being refunded.

Your refund comes from the tax already withheld from your pay during the year, not from the offset. The offset reduces the final liability, which leaves more of the withheld tax to come back to you.

## Can several offsets apply to the same return?

Yes, and they are calculated separately before being applied against total tax payable. A year with both wages and ABN income can carry the small business offset on the business portion while the Medicare position is handled separately.

That combination is where a return stops being a form and becomes a calculation, particularly where residency changed part way through the year. A part year resident has part of the year under one set of rules and part under another, and the offsets follow the periods rather than the whole.

## What decides your position?

Mostly how your year is assessed for residency purposes. That depends on your own circumstances and has to be properly reviewed.

It is not a box to tick with confidence on a first reading, and it is worth resolving properly when the [tax return](/tax-return) is prepared.
`,
 }, {
 slug: "appealing-ato-decision-australia",
 title: "Disagree with the ATO? How to object",
 description:
 "Objecting to an ATO decision is free. For a standard tax assessment you generally have two years; for most other decisions, 60 days. What makes it work.",
 seoTitle: "How to object to an ATO decision (free): deadlines and steps",
 category: "Tax Return" as const,
 date: "20 September 2025",
 readTime: 5,
 body: `
You can object to an ATO decision, and it costs nothing to lodge. For a standard individual income tax assessment the window is generally two years from the date on the notice. For most other decisions it is 60 days. Working holiday makers have exactly the same rights as anyone else.

## When is an objection the right tool?

An objection challenges an ATO position you think is wrong on the law or on the facts. It is not the tool for correcting your own mistake, which is an amendment. Confusing the two wastes the deadline on the wrong process.

- An assessment showing tax owed that you believe is incorrect
- A deduction disallowed that you say is legitimate
- A penalty applied where you say it should not have been
- A residency status determined against you
- Income figures in the assessment that do not match your records
- A refund reduced or refused without explanation

The two that come up most often with working holiday makers are residency treatment and refunds assessed before late arriving exemption paperwork, particularly a Medicare Entitlement Statement that turned up after lodgement. Both often succeed when documented.

## What deadline actually applies to you?

The deadline depends on the type of decision. For an individual income tax assessment the objection period is generally two years from the date of the notice of assessment.

For most other decisions, including many penalty and private ruling decisions, the period is 60 days. If that window has already closed, a late objection can still be lodged with a written explanation for the delay, at the ATO's discretion.

## What makes an objection succeed?

Structure, not eloquence. The reviewer needs to find four things quickly, and an objection that buries them in narrative comes back with a request for clarification and loses months.

1. Which decision is being challenged, by notice identifier and date
2. Which specific items are disputed, named precisely rather than as a general disagreement
3. What the correct treatment is, and the rule that supports it
4. The evidence, attached rather than described

Disputing the whole assessment, rather than the residency determination or the deduction at a named item, is the difference between an objection that is decided and one that is bounced.

## What does it cost?

Nothing to lodge. There is no ATO filing fee for an objection. Costs arise only if you engage someone to prepare it, or if the matter eventually escalates to the Administrative Review Tribunal, which replaced the Administrative Appeals Tribunal in October 2024 and has its own fee.

Where the disputed amount is a few hundred dollars, a free objection is worth lodging and a tribunal application usually is not.

## What happens while the dispute runs?

Interest keeps accruing on any disputed amount through the General Interest Charge, and the ATO can continue collection action unless it agrees to pause it. That is the practical reason not to leave an objection sitting on a hostel desk for three months.

If the objection succeeds, interest and penalties on the disputed portion can be remitted. If it fails, the original amount is still owed plus the interest that accumulated while it was argued. A deferral of collection can be requested while the matter is under review, and it is usually granted where the objection is genuine.

## What if the objection is disallowed?

The ATO issues one of three outcomes: allowed in full, allowed in part, or disallowed. The ATO sets no fixed timeframe, but if no decision has been made 60 days after it has your objection and the information it asked for, you can give written notice requiring one. If it is disallowed, the next step is independent review by the Administrative Review Tribunal (which replaced the Administrative Appeals Tribunal in October 2024), and beyond that the Federal Court.

For working holiday makers the tribunal is the realistic ceiling. Federal Court costs make no sense for an individual refund dispute, and most legitimate backpacker disputes end months earlier at a corrected assessment.

## Can you do this after leaving Australia?

Yes. Nothing in the objection process requires you to be in the country. Documents are lodged and correspondence handled remotely, which is how objections proceed for people who went home in November and received the assessment in February.

The complication is not the objection, it is the correspondence reaching you. An ATO letter sent to a hostel address you left eight months ago is how a two year window quietly becomes an argument about why you responded late.

## What decides whether you should object at all?

Two things. The first is whether the ATO is actually wrong. Sometimes it is not, and the honest answer is to accept the assessment rather than spend three months confirming it. Read the reasoning in the notice before reacting to the number.

The second is where the error came from. Most disputes we see trace back to how the original [tax return](/tax-return) was prepared: a residency item answered without thought, a Medicare position taken by default, a deduction claimed without the substantiation behind it. An objection is the expensive way to fix a decision that was made in ten seconds at lodgement.
`,
 }, {
 slug: "amending-tax-return-australia",
 title: "Amending an Australian tax return: the 2 year rule",
 description:
 "You can amend an Australian tax return, generally within two years of your notice of assessment, to add a missed deduction or income. Even from overseas.",
 seoTitle: "How to amend a tax return in Australia: the 2 year rule",
 category: "Tax Return" as const,
 date: "22 September 2025",
 readTime: 5,
 body: `
An Australian tax return can be amended after it has been assessed, generally within two years of the date on the notice of assessment. Amendments run both ways: you can add a deduction you missed, or income you left out. The ATO works to the same two year clock.

## What is an amendment for?

An amendment is the ordinary way a lodged return gets put right, and it costs nothing to lodge. It is not a dispute, and most working holiday maker amendments simply produce a larger refund.

- A deduction that was never claimed
- Income from an employer that was left out
- An offset or exemption that was missed
- Figures entered incorrectly
- A Medicare position taken before the paperwork arrived

The last is the most common single reason we amend a working holiday return. A Medicare Entitlement Statement from Services Australia commonly takes weeks to issue, and a return lodged in the meantime went without it.

## How long do you have?

Two years from the date of the original notice of assessment, for individuals and small businesses. Four years applies to some other taxpayers, and there is no limit in cases of fraud or evasion.

The clock runs from the assessment, not from the end of the financial year, so a return assessed in September 2026 can be amended until September 2028.

## What is the difference between amending and objecting?

Confusing them wastes a deadline. An amendment fixes something that was wrong in the return you lodged. An objection challenges a decision the ATO made about it.

- You forgot the Medicare exemption: amend
- You disagree with how the ATO assessed your residency: object
- The ATO has written proposing changes: respond with records rather than pre-emptively amending

Our guide to [objecting to an ATO decision](/blog/appealing-ato-decision-australia) covers the second path, which has its own deadlines and structure.

## What happens to your money?

If the amendment increases the refund, the additional amount is paid to your nominated account, generally within a few weeks to a couple of months. If it reduces the refund, the ATO issues a revised assessment and the difference becomes payable, usually within 21 days.

An amendment that adds forgotten income creates a debt, and it is still the right thing to do. The alternative is the ATO finding it through data matching and adding interest and a penalty to the same amount.

## Does amending draw attention to you?

No. Amendments are an ordinary part of the system, and a genuine correction supported by records is not a flag. Voluntary disclosure of an error is treated more favourably than the same error found by the ATO.

A pattern of large unsupported claims is a different thing entirely. A single amendment adding a Medicare exemption or a forgotten set of work boots is invisible.

## Can you amend after leaving Australia?

Yes. The two year window applies wherever you are. Amendments are lodged remotely and any additional refund pays into an Australian account.

The account is the practical constraint, not the amendment. Where the Australian account has been closed, arranging an alternative payment route adds time, so it is worth keeping the account alive until the year is genuinely finished rather than until you fly.

## What decides whether an amendment is worth lodging?

Two things: the size of the correction and whether it can be substantiated. An amendment for a $40 deduction with no receipt is not worth the time. Adding a Medicare Entitlement Statement to a year where the 2% levy was charged removes that 2% of taxable income where the exemption applies, and takes the same effort.

The pattern in the returns we amend is consistent. Medicare exemptions unclaimed because the statement arrived late. Deductions overlooked because the receipts were in a different phone. ABN income reported in the wrong place. A period at 45% before the TFN landed that was never recovered. Almost all are upward, and almost all come from returns lodged quickly rather than completely. If you lodged a [tax return](/tax-return) yourself and it did not deal with residency, Medicare and every employer, it is worth a second look while the two years are still open.
`,
 }, {
 slug: "ato-payment-plan-tax-debt-australia",
 title: "ATO payment plans: paying a tax debt in instalments",
 description:
 "Can't pay an ATO bill by the due date? A payment plan lets you pay in instalments, but interest keeps running. Leaving Australia does not clear the debt.",
 seoTitle: "ATO payment plan: how to pay a tax debt in instalments",
 category: "Tax Return" as const,
 date: "30 September 2025",
 readTime: 5,
 body: `
Yes. If you cannot pay an ATO bill by the due date, a payment plan clears it in instalments. Interest keeps accruing through the General Interest Charge, so a plan costs more than paying outright and far less than silence. Tax debts do not lapse when you leave Australia.

## Why does a working holiday maker end up owing at all?

Because some income had no tax withheld. ABN or contractor income is the most common, since the full invoice reached you. Withholding set too low on the tax declaration is the second. Cash work with no withholding is the third.

None is noticed at the time. All three feel like slightly more money each week and arrive as a single figure months later.

## What is a payment arrangement, and when will the ATO agree?

A formal agreement to pay in instalments rather than a lump sum, usually weekly or fortnightly by direct debit, with the debt typically cleared inside two years. While it is in place and being met, it protects you from active collection action.

The ATO generally agrees where the amount is proportionate, you can show a genuine inability to pay in full, there is an income source behind the instalments, and you have not defaulted on a previous arrangement. Approaching before the due date works better than being chased.

## What does it cost to take longer?

The General Interest Charge compounds daily on the outstanding balance and is set well above the cash rate. It runs from the original due date, not from the date the plan starts.

Lodging late is penalised separately from paying late. Failure to lodge is charged at one penalty unit for every 28 days a return is overdue, currently $364 from 1 July 2026, capped at five units or $1,820. The penalty attaches to not lodging, so lodging on time and paying late is materially cheaper than doing neither. Our guide to [late lodgement penalties](/blog/late-tax-return-penalty-working-holiday) covers when it is applied.

## What happens if you simply leave?

The debt stays. The General Interest Charge keeps accruing, the balance offsets automatically against any future Australian refund, including the final return most backpackers lodge after leaving, and it stays on your ATO record.

An outstanding tax debt can surface against a future Australian visa application. Small balances are occasionally written off, but that is the ATO's decision and not one to plan around.

## What should you do before you fly?

Set the arrangement up while your Australian banking still works. Direct debit from an open Australian account is what keeps working from overseas, and closing that account breaks the plan.

Check the balance before you go. Hardship and remission requests can be handled by correspondence from overseas, but setting the plan up is far easier from inside Australia.

## Can penalties ever be reduced?

Sometimes. Remission is considered for first time errors, genuine misunderstanding of an obligation, serious illness or other extraordinary circumstances, and where you have complied properly since.

Remission is discretionary, not automatic, and partial remission is more common than full. Delay does not help, because the case for a genuine misunderstanding weakens each month.

## What if you think the amount is wrong?

Dispute it rather than simply paying it, but do both in parallel where you can. An assessment you believe is wrong can be amended, generally within two years of the original assessment issuing, and a decision you disagree with can be objected to formally.

Neither step pauses the General Interest Charge. Interest keeps accruing on the disputed amount while the objection is considered, so where the sum is large it is usually worth arranging a plan and disputing at once. Our guide to [amending a tax return](/blog/amending-tax-return-australia) covers which route applies to which kind of error.

## Short inconvenience or two year arrangement?

Whether a plan is available, and what it costs, turns on facts specific to your position.

- What produced the debt: ABN income, a wrongly claimed threshold and unlodged years lead to different fixes.
- Whether the return is lodged, since the failure to lodge penalty is separate from the debt.
- How large the balance is against what you can pay, which decides whether the ATO accepts the schedule.
- Whether an Australian bank account remains open to service the direct debit.
- Whether you are still in Australia, which makes setting the plan up much easier.
- Whether a refund from another year is due, since it offsets against the debt automatically.
- Whether there are grounds for remission, worth raising early rather than late.

A debt usually starts with a return not prepared with the full picture, and the [working holiday tax return](/tax-return) is where the position is put right. You can [estimate your tax refund](/calculator) for other years to see whether an offset is coming.
 `,
 },

 // ─── WORK RIGHTS - BATCH 2 ─────────────────────────────────────────────────
 {
 slug: "piece-rates-farm-work-working-holiday",
 title:
 "Piece Rates on Farms: The Guaranteed Floor",
 description:
 "Piece rate pickers must be able to earn at least the award hourly rate. How the rules work, what a valid agreement needs, and how underpayment is fixed.",
 category: "Work Rights" as const,
 date: "1 October 2025",
 readTime: 6,
 body: `
Piece rates pay you per bin, kilogram or tray rather than per hour, and they are lawful under the Horticulture Award. What makes them lawful is the floor underneath: a pieceworker who is an employee must still receive the minimum hourly rate for their classification. Bad weeks get topped up.

## How does a piece rate work?

You are paid for output rather than time, so the money follows what you pick, weigh or pack, not the hours you stand in the row. Per kilogram of strawberries, per bin of apples, per tray of blueberries, per row weeded, per item packed.

The system rewards speed, which is why farms like it and why experienced pickers often do well out of it. A first week is different: technique takes time to acquire, and someone learning on unfamiliar fruit picks a fraction of what a returning worker does. That gap is what the guaranteed floor exists to handle.

## What is the guaranteed floor?

The minimum hourly rate for your classification under the award, applied across the hours you actually worked in the pay period. If your piece earnings divided by your hours come out below it, the employer must top up the difference. It is not discretionary and a farm cannot contract out of it.

From 1 July 2026 the casual minimum across all work is $33.05 an hour, being the $26.44 national minimum wage plus the 25% casual loading, and award classification rates sit at or above that. The floor is calculated per pay period rather than per day, so a fast Friday can offset a slow Tuesday, but the period as a whole has to clear the line.

## How does the top up calculation work?

Total your piece earnings for the period, total the hours worked, and divide one by the other. If the result is below the applicable hourly minimum, the shortfall is the difference between what the hours should have paid and what the pieces did pay.

At $33.05 an hour, twenty hours is $661.00. If those twenty hours produced $400 in piece earnings, the effective rate was $20.00 an hour and the employer owes a top up of $261.00. An employer who pays only the $400 is in breach of the Fair Work Act, whatever was agreed verbally.

## What is wrong with a verbal piece agreement?

It is not valid. Piece rate agreements under the Horticulture Award must be in writing, and a rate offered across a shed floor as four dollars a tray, take it or leave it, fails the award at formation rather than on the arithmetic afterwards.

A written agreement records what the rate is, which stops it moving downwards mid season, and it is what makes a later claim straightforward. Where no written agreement exists, the ordinary hourly rate applies by default, usually better for the worker than whatever was said out loud.

## Which practices should you watch for?

The ones that reduce your recorded output or your recorded hours without reducing the work. Each is common enough in horticulture to be worth checking specifically.

- Undercounting, where the tally or weight recorded is below what you actually picked
- Unpaid sorting, packing or setup time, which is working time and counts towards the hours in the calculation
- Deductions for accommodation, transport or meals that push the effective rate below the minimum
- No top up applied at all, which is the single most common breach in piece rate work
- Rows or blocks allocated so sparsely that the target is unreachable, which does not remove the floor

## How do you audit your own week?

Keep a daily log, because the guarantee only protects pickers who can show what happened. Record start and finish times, breaks, and the units picked or tally tickets issued, and photograph anything the farm writes down before it goes into a drawer.

At the end of the period, run the numbers. Earnings divided by hours gives your effective rate; against the hourly minimum for your classification that gives the shortfall. Persistent results below the floor mean either the rate per unit was set too low to be lawful, or the conditions made the target impossible. Either way the conversation starts with your log, and the Fair Work Ombudsman recovery process runs on that evidence. Our guide to [wage theft and recovery](/blog/wage-theft-working-holiday-australia) covers where it goes from there.

## How is piece rate income taxed?

Exactly like any other employment income. PAYG is withheld at 15% with your TFN on file, 12% [super](/superannuation) is paid on top of gross earnings, and the whole amount appears in your income statement and on your [tax return](/tax-return).

The one branch that changes things is whether you are an employee at all. Piece rate work engaged through an [ABN](/abn) has nothing withheld, attracts no super and carries no guaranteed floor, which is why some operators prefer it. Whether that classification is genuine depends on how the work runs rather than what the paperwork says, and our guide to [farm work and ABNs](/blog/farm-work-and-abns) sets out the test.
`,
 }, {
 slug: "labour-hire-agencies-working-holiday-australia",
 title:
 "Labour Hire Agencies: Who Is Your Employer",
 description:
 "The agency is your employer - it owes award rates, super and payslips even if the farm directs your work. Licensing rules by state and red flags to check.",
 category: "Work Rights" as const,
 date: "6 October 2025",
 readTime: 6,
 body: `
When you work through a labour hire agency, the agency is your employer and the farm or site is only where you go. That single fact decides who owes you wages, super and entitlements. It is also why agency work is where those entitlements most often go missing.

## Who is legally your employer?

The agency. It pays you, withholds your tax, owes your [super](/superannuation), issues your payslips and carries the obligations under the award. The host business tells you what to do and where to stand, and owes you none of that.

That split is why agency arrangements go wrong more often than direct employment. When pay is short, the host says talk to the agency and the agency says the host sets the hours. Get in writing who your employer is before you start.

## What does agency work get you?

Speed. Agencies place workers within days rather than weeks, cover several industries at once, and ask far less than a direct hiring process. That matters when you have just arrived and need work this week.

They also handle payroll across placements, so three different host sites in a month still produce one employer, one TFN declaration and one super fund rather than three of each. For someone moving around Australia that genuinely simplifies the year.

## Where does agency work go wrong?

In deductions, mostly. Charging for accommodation and transport is lawful where it is agreed in writing and reasonable. It becomes wage theft the moment the deductions bring your effective rate below the minimum. Unitemised bundles taking a weekly figure for a room and a van seat are where exploitation in this sector concentrates.

The other failures: being put on an ABN as a contractor when the work is plainly employment, penalty rates never applied to weekend shifts, payslips not issued at all, and wages withheld until you complete a placement, which is not lawful at any point. If an agency tells you different rules apply to labour hire, that is untrue. The Fair Work Act applies in full.

## What are you actually entitled to?

Exactly what you would get working directly for the host, with no discount for the arrangement. That means the award rate for the classification the host site work falls under, penalty rates for weekends, public holidays and overtime, and payslips within one working day of each pay.

- The award rate for the work, with the casual floor from 1 July 2026 being $33.05 an hour
- 12% super into your nominated fund
- Payslips itemising hours, rate, tax and deductions
- Written terms before you start a placement
- A safe workplace, which is the host's duty as well as the agency's

## Is the agency licensed?

Check before you sign anything. Victoria, Queensland, South Australia and the Australian Capital Territory operate mandatory labour hire licensing schemes with public registers, and operating without a licence in those jurisdictions is an offence.

A licence is not a guarantee of good behaviour, but its absence in a state that requires one tells you a great deal quickly. Add the basics: a known super fund, written terms, itemised payslips, payment on the same day each cycle.

## What should you ask before you sign?

Five questions, answered in writing rather than across a counter. An agency that will not answer them has told you something more useful than any answer would have been.

- Are you licensed, and in which state
- Who pays my super, and into which fund
- Which award and classification covers the work at the host site
- Will payslips be itemised by site and shift
- What deductions will be taken, and at what rate

Press on deductions. Transport and housing packages are where the money goes, and a figure quoted per week rather than per item is what makes underpayment hard to see.

## What if you think you are being underpaid?

Work out your effective rate first, because that is the number any claim turns on. Total everything you were actually paid across a pay period, including top ups, divide it by the hours you genuinely worked including unpaid waiting time, and compare the result with the award rate for the work.

If it falls short, the claim is against the agency rather than the host. The Fair Work Ombudsman handles underpayment complaints without charge, unpaid super goes to the ATO instead, and being on a 417 or 462 visa weakens neither. Our guide to [wage theft and recovery](/blog/wage-theft-working-holiday-australia) covers what evidence makes a claim work.

Back pay and any leave paid out are taxed in the year they are paid and belong on that year's [working holiday tax return](/tax-return).
`,
 }, {
 slug: "how-to-read-a-payslip-australia-working-holiday",
 title: "How to Read an Australian Payslip",
 description:
 "Gross, tax withheld, super, hourly rate and hours - what each must show by law, and the quick check that catches most underpayment on a working holiday.",
 category: "Work Rights" as const,
 date: "9 October 2025",
 readTime: 5,
 body: `
An Australian payslip must be issued within one working day of being paid, and must show gross pay, tax withheld, super and net pay. For a working holiday maker with a TFN on file, tax should be 15% of gross and super 12% on top. Two divisions tell you.

## Why is the payslip the document that matters?

It is the only place where the hours, the rate, the tax and the super appear together, and it is the evidence if any of them turns out to be wrong. Your bank statement shows one number and nothing about how it was reached.

It is also the record that disappears first. Payslips delivered through a rostering app or a work email vanish the moment your employment ends, often before you have thought about needing them. Emailing them to yourself as they arrive is thirty seconds a fortnight and the single most useful habit on this page.

## What should gross pay look like?

Your hours multiplied by your rate, plus penalty rates for weekend, evening, overtime or public holiday work, plus any allowances the award attaches to the job. Check this line before anything else, because every other figure on the payslip is calculated from it.

Check it against your own record of hours rather than the roster, since the two often differ. Time spent setting up before a shift or cleaning down after it is working time, and it is where hours quietly go missing. If every hour is paid at the same rate across a week with weekend work in it, the award is not being applied.

## How do you check the tax line?

Divide tax withheld by gross pay. For a working holiday maker whose Tax File Number Declaration has been processed and whose employer is registered, the answer should be close to 15%.

Anything materially above that has a specific cause, and each is fixed differently.

- Around 45%: your TFN is not yet recorded with that employer, usually because the declaration form has not been processed
- Around 30%: the employer is not registered with the ATO as a working holiday maker employer
- Well below 15%: the declaration may have been completed in a way that reduced the withholding, which can produce a bill later rather than a refund

Over-withholding is dealt with when the [tax return](/tax-return) is lodged, but the money sits with the ATO until then and the outcome depends on your year. Raise a wrong rate in the first fortnight rather than at the end of the year.

## How do you check the super line?

Divide the super figure by gross pay and expect 12%, the rate since 1 July 2025. Super is paid by the employer on top of your wages, so it should never reduce your net pay, and a payslip where super appears to come out of your earnings needs a question asked about it.

Accrued is not paid. A super figure on a payslip records what the employer owes for that period, not what has reached your fund, and the two can be separated by days or, for periods before 1 July 2026, up to three months, because super used to be paid quarterly. Only the fund itself tells you whether the money actually arrived. Our guide to [unpaid super](/blog/super-employer-not-paying-what-to-do) covers what to do when it has not.

## What does net pay tell you?

Whether the arithmetic holds together. Net pay is gross pay minus tax withheld and any lawful deductions, and it should match the amount deposited in your account to the cent. Super does not appear in this calculation at all.

Any deduction, for accommodation or equipment or anything else, has to be shown on the payslip, agreed in advance and lawful. An unexplained gap between gross less tax and what actually landed is the clearest sign of an unlawful deduction there is, and it is visible in one subtraction.

## What are the year to date figures for?

Tracking your position without waiting for July. Most payslips carry cumulative year to date totals for gross pay, tax withheld and often super, running from 1 July, so you can see the shape of your year while there is still time to correct it.

They also cross check the income statement your employer eventually files with the ATO. If the year to date gross on your final payslip and the figure in your income statement disagree, one of them is wrong, and having the payslip is what lets you say which.

## What if your employer does not issue payslips at all?

That is a breach in itself, and rarely the only one. Australian employers must issue a payslip within one working day of paying wages, in electronic or hard copy form, whether or not the employee asks for one.

No payslips means no record of hours, rate, tax or super, which is exactly the position an employer avoiding those obligations wants you in. Keep your own dated record of hours worked from that point on, save every bank deposit, and treat the absence as the warning sign it is. Our guide on [an employer not paying correctly](/blog/employer-not-paying-correctly) covers where that goes next.
`,
 }, {
 slug: "wage-theft-working-holiday-australia",
 title:
 "Wage Theft Is a Crime: How to Recover Pay",
 description:
 "Deliberate underpayment is a criminal offence. How to document it, recover wages through the Fair Work Ombudsman for free, and claim without visa risk.",
 category: "Work Rights" as const,
 date: "12 October 2025",
 readTime: 5,
 body: `
Being paid below your legal entitlement is recoverable, and reporting it cannot affect your visa. The floor from 1 July 2026 is $26.44 an hour, or $33.05 for casuals with the loading, and most awards sit above it. Whether you have a claim is arithmetic, not a feeling.

## What counts as underpayment?

Anything that leaves you below the rate the award or the national minimum sets for the hours you actually worked. It is a wider category than a low hourly rate, and the most common forms look like something else at the time.

- Paid below the minimum, which from 1 July 2026 is $26.44 an hour and $33.05 for casuals
- Weekend, evening, overtime or public holiday hours paid at the base rate with no penalty applied
- 12% [super](/superannuation) never reaching your fund
- Deductions for accommodation or transport that push your effective rate below the minimum
- Unpaid trial shifts running well past a brief demonstration of skills
- Being put on an ABN to avoid super and award rates when the work is really employment
- Wages withheld until you complete a placement, which is not lawful
- Cash with no payslip and no super

Some of this is deliberate and some is genuine payroll incompetence. The distinction matters for how the conversation goes and not at all for what you are owed.

## How do you check your own pay?

Divide what you were paid by the hours you actually worked, including any unpaid time before and after shifts. If the result is below $33.05 as a casual, you are underpaid at the national floor, and if your job is covered by an award, the real floor is usually higher than that.

Then check the pattern rather than the total. Penalty rates mean weekend and public holiday hours should pay a multiple of the ordinary rate, so a payslip where every hour is paid identically across a week that included a Sunday is wrong even if the average looks acceptable. Our guide to [penalty rates](/blog/penalty-rates-australia) sets out the multipliers by day and by award, and the [award classifications](/blog/award-classifications-working-holiday-australia) guide covers the right rate for the work you actually do rather than the job title.

## What should you do about it?

Raise it in writing first, because most claims that go anywhere start with a paper trail rather than a confrontation. A short message setting out the hours, the rate paid and the rate you believe applies gives a mistaken employer a way to fix it and a deliberate one something to answer.

If that fails, the Fair Work Ombudsman handles underpayment complaints without charge, and being on a 417 or 462 visa does not weaken the claim. Super goes somewhere else: unpaid super is recovered by the ATO through the [Superannuation Guarantee Charge](/blog/what-is-superannuation-guarantee-charge), not by Fair Work, so a job with both problems produces two separate claims. Staying employed while you raise it makes the case stronger where that is safe, because the pattern of shifts continues to build evidence.

## Will reporting it affect your visa?

Reporting an employer for underpayment does not put your working holiday visa at risk. That fear keeps underpaid backpackers quiet, and it is not founded on anything in Australian law.

Workplace complaints made in good faith do not trigger visa review, an employer has no power over your visa status whatever they imply, and the Workplace Justice visa arrangements exist specifically so that temporary visa holders can pursue exploitation claims without their immigration position being used against them.

## What records make a claim work?

Anything that ties hours to money, kept somewhere the employer cannot take away. An underpayment claim is almost entirely a function of evidence, easiest to gather while you are still there.

- Every payslip, saved as a file rather than left in a work app
- The published roster, and your own note of the hours you actually worked
- Any contract or letter of offer, however informal
- Text messages and emails about pay, shifts and deductions
- Super fund statements showing what arrived and when
- Bank statements showing what was actually deposited

A daily note of start and finish times takes seconds and is the record that most often decides a dispute. Save everything as you receive it rather than at the end.

## Can you still recover after leaving?

Yes. Underpayment claims through the Fair Work Ombudsman and unpaid super reports to the ATO both survive your departure from Australia, and neither requires you to be in the country to pursue them.

What gets harder is evidence and contact. Rosters and payslips left in a system you no longer have access to are difficult to retrieve from another continent, and an Australian bank account closed on the way out complicates payment of anything recovered. Both are cheap to sort out in your last fortnight here and expensive to fix afterwards.

Anything recovered is taxed in the year it is paid and belongs on that year's [working holiday tax return](/tax-return), which is another reason to keep the account open.
`,
 },

 // ─── TAX - BATCH 2 ─────────────────────────────────────────────────────────
 {
 slug: "backpacker-tax-history-australia",
 title: "From the High Court to 15%: how the WHM tax rate came about",
 description:
 "The 15% backpacker tax started in 2017 and was tested in the High Court in 2021. The rate survived, with consequences that are still assessed case by case.",
 category: "Tax Return" as const,
 date: "14 October 2025",
 readTime: 6,
 body: `
The backpacker tax is the flat rate applied to subclass 417 and 462 income: 15% on the first $45,000 of income taxed under the working holiday maker schedule. It has been that rate since 1 January 2017. This guide is the history; the current [backpacker tax rate](/blog/backpacker-tax-rate-australia) and how it applies to your pay are in their own guide. The part that still decides individual cases is what the High Court said about it in 2021, and its effect varies from person to person.

## What is the rate today?

Fifteen per cent from the first dollar up to $45,000, then the foreign resident scale above it. Both visa subclasses are treated identically, and almost every working holiday maker earns inside the first bracket.

The working holiday maker schedule is what separates this from ordinary Australian taxation. How it applies to you, compared with ordinary resident rates, depends on how your year is assessed and is not something to assume.

- 15% on income up to $45,000
- 30% from $45,001 to $135,000
- 37% from $135,001 to $190,000
- 45% above $190,000

## What was the position before 2017?

Residency mattered a great deal. Two people doing identical work could face very different bills, depending on how their year was assessed, and that was a judgement, contested then for the same reasons it is contested now.

The government regarded some of the resulting low tax bills as an unintended outcome rather than a policy. That view produced the 2016 proposal.

## How did the 2017 rate come about?

As a compromise after a fight. The 2016 proposal was to tax all working holiday maker income at 32.5% from the first dollar by deeming every backpacker a non-resident. Agriculture and tourism objected immediately, because harvest labour depends on people for whom that rate would have changed the arithmetic of coming at all.

The settlement was the 15% rate from 1 January 2017. The same package raised the Departing Australia Superannuation Payment rate for working holiday makers from 38% to 65% from 1 July 2017, leaving other temporary visa holders such as students on 35% for the taxed element. The concession on wages was paid for on the [super side, through the 65% DASP rate](/blog/dasp-tax-rate-65-percent-explained), and it still is.

## What did the High Court decide in Addy?

That the 15% rate could not lawfully be applied to the particular taxpayer before it. In *Addy v Commissioner of Taxation* [2021] HCA 34 the High Court found for the taxpayer, a UK national who was an Australian tax resident, because taxing her at the 15% rate breached the non-discrimination article of the UK tax treaty. That turns on residency and nationality together, which is why the decision cannot be read as a general rule about backpacker tax.

The taxpayer succeeded at first instance in 2019, lost in the Full Federal Court, and won in the High Court in 2021. The legislation was not amended afterwards, so the position stands as the court left it and is applied case by case rather than through a change in the rate.

## Who does Addy actually help?

Fewer people than the headlines suggested, and rarely the people who assume it covers them. Whether the decision reaches a particular working holiday maker depends on an assessment of their whole year, and that assessment goes wrong in both directions when people attempt it themselves.

The question is a judgement about your own circumstances, turning on details most people never think to check, and neither the rate table nor the case name can answer it. A position is taken only after the year has been gone through in full. UK passport holders have [their own guide](/uk-working-holiday-tax), and so do [German passport holders](/german-working-holiday-tax).

## What does any of this change on your return?

For many people, the refund comes from over-withholding and the Medicare levy exemption rather than from *Addy*. A court ruling may change which rates apply in some cases, and whether it applies to you depends on how your year looked and is assessed case by case.

Where it does apply it changes things substantially, in ways that differ from person to person for reasons that are not obvious from the outside. That is the branch worth having checked before a [tax return](/tax-return) is lodged, because amending later is harder than getting it right once, and the position taken has to be one that can be defended.
`,
 }, {
 slug: "how-to-check-super-balance-working-holiday",
 title:
 "How to Check Your Super Balance on a WHV",
 description:
 "Your super sits with a fund, not with your employer. Contributions arrive after payday, so a balance can look empty for a while after the work was done.",
 category: "Super" as const,
 date: "16 October 2025",
 readTime: 4,
 body: `
Your super balance sits with the fund your employer paid into, and you reach it with the member number that fund sent you. Whether the balance you see is the whole balance depends on how many jobs you have had, because each employer opened another account.

## Why does the balance need checking at all?

Because super is the only money you earn in Australia that never appears in your bank account. It is paid on top of your wages, straight into a fund, so nothing in your day to day banking would tell you it is short.

That is why unpaid [super](/superannuation) goes unnoticed for so long. An employer who underpays wages is found out within a fortnight because the deposit is visibly wrong. An employer who never pays super can go a full season unnoticed, and for a working holiday maker the discovery usually comes at the point of leaving, when it is hardest to chase.

## When should contributions actually appear?

For pay from 1 July 2026, generally within seven business days of each payday under Payday Super. Before that, employers paid quarterly, so a gap of up to three months was normal, and for older periods it is still the most common reason people think super is missing when it is not.

The old quarterly deadlines were 28 October, 28 January, 28 April and 28 July, and they still apply to pay periods before 1 July 2026. Since then the due date is generally seven business days after payday. Anything still missing a week or two after its due date is a real gap, and that is when comparing the payslip line against the fund statement is worth doing.

## What if you do not know which fund you are with?

Your payslip usually carries the fund name and often the member number, and the fund will have sent a welcome email when the account was opened. For accounts you have forgotten, the ATO's records against your TFN are the complete list, and [finding lost superannuation](/blog/how-to-find-lost-superannuation) sets out exactly where to search.

## Why do multiple accounts cost you money?

Because each one charges its own administration fees and often its own insurance premiums, deducted from a balance that is not growing between jobs. Four small accounts sitting idle for six months lose more to fees than one account holding the same money, and on backpacker sized balances the proportion is significant.

Whether consolidating is right depends on your timing. If you are staying and working, [combining the accounts](/blog/super-multiple-funds-consolidation) stops the duplicate fees. If you are leaving within weeks, the accounts will all be claimed through DASP anyway and consolidating first can delay the claim rather than help it. What is always wrong is leaving an account you have forgotten about, because that is how super ends up transferred to the ATO as unclaimed money and quietly left behind.

## What should be confirmed before you claim DASP?

That every account has been found and that the final contributions have actually been paid. A Departing Australia Superannuation Payment claim closes the account it is made against, so any contribution arriving afterwards has to be chased separately, and the last pay period of work is the one most likely to still be outstanding.

Timing is the branch point. Under the old quarterly rules, someone who finished work in May and flew home in June had an April to June contribution that was not due until 28 July, so claiming immediately meant claiming before the employer was required to pay. Under Payday Super the gap is much shorter, about seven business days after each payday, but the final pay period can still be outstanding. Waiting until the contribution has arrived usually collects more, which has to be weighed against the [65% withholding, which is final whenever you claim](/blog/tax-on-super-withdrawal-backpacker), and against the ATO's guide that payment generally follows within 28 days of a complete application.

Super and tax are separate claims: the DASP pays out your fund balance, while tax over-withheld from your wages is dealt with only through a [working holiday tax return](/tax-return).
`,
 },

// ─── NEW POSTS - BATCH (27 articles) ─────────────────────────────────────

// ─── TFN ──────────────────────────────────────────────────────────────────
 {
 slug: "tfn-application-rejected",
 title: "TFN Application Rejected? Four Causes",
 description:
   "Mismatched passport details, immigration data lag, a previous TFN or an unverifiable address - how to identify which blocked you and reapply correctly.",
 category: "TFN",
 date: "18 October 2025",
 readTime: 5,
 body: `
Almost always because the identity details did not match the records held by Home Affairs. The usual causes are a passport number that differs from the visa grant, a date of birth that does not match, a name spelled differently to the passport, or a TFN that already exists from an earlier visa. None is fatal.

## What is actually being checked?

An electronic match against immigration records, not a human reading your documents. Nothing is uploaded, so it succeeds or fails on whether the fields you typed line up exactly with what the government already holds.

That explains the failure pattern. Middle names left out, hyphens and accents dropped, a transliterated name entered the way people say it rather than the way the passport prints it, a passport renewed after the visa was granted. Each is a mismatch even though it is obviously the same person.

## What are the four causes worth checking first?

Most rejections resolve into one of four, and which one you have decides the route back.

- A typing error in the passport number, name or date of birth. Correct it and [reapply for your TFN](/tfn) with the details exactly as printed.
- Applying before your arrival was recorded. If you applied within hours of landing, the movement record may not have existed yet, and waiting a few days is the fix.
- A visa not yet activated by entering Australia, which is a timing problem rather than a data one.
- A TFN that already exists from an earlier visa. This is not a rejection so much as a recovery, and creating a second number would be the wrong outcome.

That last one matters most for anyone returning to Australia. A TFN is permanent, so the step is to [find the existing number](/blog/how-to-find-lost-tfn) rather than apply again and generate a duplicate trail.

## What is it costing you while it is unresolved?

Thirty cents in every dollar, for as long as it lasts. Without a valid TFN on file your employer withholds 45% instead of 15%, which on a $1,000 week is $300 a week held back rather than paid.

What happens to the extra tax withheld depends on your year and is settled by the ATO when the return is assessed, and for someone paying rent weekly the timing is what matters.

## Does the rejection also affect the declaration you gave your employer?

Yes. The Tax File Number Declaration records an application in progress and keeps you on the working holiday rate through a 28 day window. A rejection does not pause that clock, and once the window has passed the employer must withhold at 45% regardless of what you told them.

So tell the employer that the application was rejected and is being resubmitted, and update the declaration when the number issues. Our guide to the [Tax File Number Declaration form](/blog/tax-file-number-declaration-form) covers what payroll actually needs.

## Is a phone call better than another online attempt?

For some causes, yes. A typing error is fixed fastest by reapplying cleanly. A name mismatch, a married name, a transliteration or a suspected duplicate is better handled by speaking to the ATO, because an officer can reconcile records an automated check cannot.

The reference number from the original confirmation email speeds up every route, and it is the one thing people routinely delete.

## What should you do once the number finally issues?

Give it to every employer separately on a fresh declaration, then check the next payslip rather than assuming payroll updated. Treat the number the way you would treat a bank account number.

Working holiday makers are targeted for TFN theft, because a stolen TFN allows a fraudulent return to be lodged with the refund directed elsewhere, and the victim often discovers it only when their own return is rejected as a duplicate. Anyone offering tax help who cannot show a registration on the government's public register of tax practitioners should not receive your documents.

## Which of the four caused yours?

A rejection is a data problem, and which data caused it decides both the fix and how long it takes. The points below narrow it to one cause.

- Whether your full name was entered exactly as the passport prints it, middle names and hyphens included.
- Whether your passport was renewed after the visa was granted, which produces a number that no longer matches.
- How soon after arriving you applied, since the movement record has to exist first.
- Whether you have held a TFN before, in which case recovery rather than reapplication is the correct route.
- Whether the employer's 28 day declaration window has already expired.
- How many weeks of 45% withholding accumulate before it is resolved, which is what gets reconciled at assessment.

Tax withheld at 45% during the delay is dealt with through the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know how long the period ran.
 `,
 }, {
 slug: "tfn-identity-documents-required",
 title: "TFN Documents: Your Passport Is Enough",
 description:
   "Working holiday makers applying online need only a valid passport with their visa - no certified copies. What the ATO checks and what trips applicants.",
 category: "TFN",
 date: "22 October 2025",
 readTime: 5,
 body: `
For most working holiday makers, the passport that carries the visa is the whole document requirement for a [TFN application](/tfn). Nothing is uploaded. The application verifies your passport electronically against immigration records, so what matters is not the documents you hold but whether what you type matches what the government already has.

## What does the application actually ask for?

Identity details rather than evidence. Your full legal name exactly as printed on the passport, date of birth, country of citizenship and country of birth, the passport that carries your current 417 or 462 visa, your date of arrival on that visa, an Australian residential address, and contact details.

There is no officer reading your visa grant notice, only an automated match that either succeeds or does not. That is why a trivial looking detail can stop the application.

## Which passport, if you hold more than one?

The one you entered Australia on and the one the visa was granted against. Dual nationals routinely apply with the passport they think of as their main one and match against nothing, because the immigration record sits on the other document.

The same trap catches anyone who renewed a passport after the visa was granted. The new booklet has a new number, the visa record carries the old one, and the match fails on a document in your hand.

## What address should you give?

Somewhere mail will reliably reach you in a month, because the TFN arrives as a physical letter and a returned letter restarts the wait. A rental or share house, a friend or relative, a hostel where you have permission to receive mail, or a workplace with the employer's agreement all work.

A hostel you are leaving in ten days does not, and that is the most common self inflicted delay in the process. Our guide to [updating your address with the ATO](/blog/how-to-update-address-with-ato) covers what to do if you move before the letter arrives.

## What happens with names that are not simple?

They are the leading cause of rejection, and the reason is mechanical. Hyphens, apostrophes, accented characters, multiple middle names, transliterated names and married names all create differences between how a name is printed, how it was recorded at the visa stage, and how a person types it.

If the passport reads Francois with a cedilla and Muller with an umlaut, the unaccented forms are a mismatch to a system comparing strings. So is dropping a middle name that appears on the visa grant. Enter it character for character as printed.

## When does the ATO ask for more?

When the automated match fails. The ATO may then ask for certified copies or for in person identity verification at a service centre.

That path is slow, particularly from overseas, which is the argument for applying early in your stay rather than later.

## What does a delay actually cost?

Thirty cents in every dollar you earn in the meantime. Without a TFN on file the employer withholds 45% instead of 15%, which on a $1,000 week is $300 held back, and it continues until the number is recorded.

The 28 day declaration window is the mitigation. Telling your employer the application is in progress, recorded on the Tax File Number Declaration, keeps you on the working holiday rate through the window. Tax over withheld in the meantime is dealt with at assessment, and the outcome depends on your year.

## What should you do with the number once it arrives?

Give it to every employer separately, then protect it. Working holiday makers are targeted for TFN theft, because a stolen TFN allows a fraudulent return to be lodged with the refund sent elsewhere, and the victim usually finds out when their own return is rejected as a duplicate.

Never send a TFN, passport or visa grant to anyone who cannot show a current registration on the government's public register of tax practitioners. People presenting themselves as accountants in backpacker groups are a recurring problem, and a verifiable registration number is the whole test.

## Will yours clear on the first try?

The documents are the same for everyone. Whether it clears first time depends on details specific to you, and each point below is a common and avoidable failure.

- Whether the passport you apply with is the one the visa was granted against.
- Whether that passport has been renewed since the visa was granted.
- Whether your name contains characters or middle names that were recorded differently at any stage.
- Whether your arrival has been recorded, which it may not be if you apply within hours of landing.
- Whether the postal address will still be yours in a month.
- Whether you have held a TFN before, in which case recovery rather than a fresh application is correct.

Tax over withheld during the wait is dealt with through the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know how long the period ran.
 `,
 }, {
 slug: "tfn-security-protect-from-fraud",
 title: "TFN Scams: Who May Ask, and Who May Not",
 description:
   "Your TFN plus passport details is enough for identity fraud. The only parties allowed to ask, scams doing the rounds, and what to do if yours leaked.",
 category: "TFN",
 date: "25 October 2025",
 readTime: 6,
 body: `
A stolen [TFN](/tfn) is mostly used to lodge a fake return in your name and take the refund. If you think yours has been misused, call the ATO's client identity support line on 1800 467 033, lock down myGov and tell your bank and super fund, then check with the ATO for returns you did not lodge. Only six groups may lawfully ask for the number in the first place, listed in our guide on [who can ask for your TFN](/blog/who-can-ask-for-your-tfn), and anyone outside that list is either mistaken or attempting fraud.

## Why is a TFN worth stealing?

Because it is permanent and it unlocks money in your name. Someone holding your TFN plus basic identity details can lodge a return as you and direct the refund to their own account, attempt to access your superannuation, or create ABN registrations linked to you.

The number cannot be cancelled like a card. A fraudulent return usually surfaces only when your genuine return is rejected as a duplicate, months later, with the refund frozen while it is investigated.

## Why are working holiday makers targeted specifically?

Because they are new to the system, unsure what normal looks like, and moving through environments built on informal trust. Hostels, backpacker Facebook groups and WhatsApp communities are where someone unfamiliar with Australian tax looks for help, and the people offering it are not screened.

The pattern is consistent. An offer to lodge your return or claim your super for a small fee, a request for a photo of your passport and visa grant, your TFN, date of birth and address, and sometimes bank details. Then the return is lodged with the refund pointed elsewhere and the account disappears.

## What are the warning signs?

The first settles most cases: no verifiable registration on the government's public register of tax practitioners. Registration is public, checkable in under a minute, and anyone unwilling to give you a number has answered the question.

- Payment requested in cash, cryptocurrency or gift cards
- No business address, operating only through a messaging app
- A large refund promised before anyone has looked at your circumstances
- A request for your account passwords, or to share your screen
- Pressure to act immediately, usually invoking a deadline

The password request deserves emphasis. A registered agent reaches your records through their own agent channel and never needs your myGov credentials. Anyone asking for them is not operating as an agent whatever they call themselves.

## How did the leak usually happen?

Rarely through anything sophisticated. The recurring causes are job scam onboarding forms asking for full identity documents before any work exists, documents photographed or left on shared hostel computers, and TFNs sent over WhatsApp to someone described as payroll.

The common thread is a request that seems administratively normal arriving when you have no basis for comparison. Knowing the list of six converts a judgement call into a fact check.

## What do you do if it has already happened?

Act the day you suspect it. Contact the ATO's client identity support line and tell them you have a compromised TFN. They can place a marker on your record requiring additional verification before anything is processed in your name, and in some circumstances issue a new number.

Then secure everything attached to it. Change your myGov credentials and enable the strongest sign in available, notify your superannuation fund because balances are a target in their own right, and check whether a return has already been lodged in your name this year. The marker costs nothing and remains protective for years.

## What if a fraudulent return was already lodged?

The genuine return can still be lodged, but it moves onto a slower path while the duplicate is investigated. That is typically a delay of months, resolved through the ATO rather than the police in most cases.

Report it, keep every piece of correspondence, and expect additional identity verification on everything that follows. Being outside Australia makes this materially harder.

## How exposed are you right now?

The protective rules are the same for everyone. Your exposure is not, and remediation from overseas is slower.

- Whether you have ever sent identity documents to someone you could not verify.
- Whether your myGov account uses a phone number that still works, since a dead Australian SIM locks you out of your own record.
- Whether super fund contact details are current, because funds are a separate target.
- Whether you have already left Australia.
- Whether a return has been lodged in your name this year that you did not lodge.
- Whether any ABN is registered against your details that you did not register.

Returns lodged as part of the [working holiday tax return](/tax-return) go through a verifiable professional channel rather than an anonymous account, and you can [estimate your tax refund](/calculator) yourself before dealing with anyone at all.
 `,
 }, {
 slug: "who-can-ask-for-your-tfn",
 title:
 "Who can ask for your TFN? Six groups, and not your hostel",
 description:
 "Only six groups may ask: your employer, the ATO, your super fund, your bank, a registered tax agent and Services Australia. Common scams and what to do.",
 category: "TFN",
 date: "29 July 2026",
 readTime: 6,
 body: `
Six groups may lawfully ask for your [Tax File Number](/tfn): your employer once you are hired, the ATO, your superannuation fund, your bank, a registered tax agent acting for you, and Services Australia if you are claiming a payment. Everyone else may ask, and you may refuse, and refusing cannot lawfully be held against you.

## Why is the list this short?

Because a TFN plus a passport is a workable identity kit, and Australian privacy law treats it accordingly. Collection is restricted to organisations with a genuine tax reason to hold it, and each of them has to explain why it needs the number, store it securely and use it only for that purpose.

The short list means you never have to judge whether a request is reasonable. If the asker is not on the list, the answer is no, and no explanation is required.

## When is your employer entitled to ask?

After you have been hired, not before. The legitimate request comes as a Tax File Number Declaration during onboarding, which is a standard ATO form, and the employer uses the number to apply the correct 15% working holiday maker rate and to report your income.

A request before you have accepted a job is the warning sign, and the most common way backpackers get caught. A recruitment agency does not need your TFN to put you forward for work, and if you have not accepted an offer there is nothing to complete a declaration for.

## Who is not entitled to it?

Anyone whose reason for wanting it is not tax. The requests working holiday makers actually receive come from a predictable set.

- Landlords and real estate agents, including on rental applications
- Hostels, for any purpose
- Phone, internet and utility providers
- Recruitment agencies, before you have been hired
- Other travellers, friends, or anyone in a group chat
- Anyone offering tax help who cannot produce a current registration

Refusing any of these is not a criminal matter and cannot lawfully be used to deny you a tenancy, a service or a job.

## What do the scams actually look like?

They are not sophisticated and do not need to be, because they target people in their first weeks in a new country.

**The fake job.** An offer that arrives unprompted, asks for your TFN and a photo of your passport before any interview, and never proceeds to actual work. The output is an identity kit, not a job.

**The social media refund agent.** An account offering to lodge your return, asking for your TFN and your government account login, and frequently promising a figure before seeing any of your income. Returns are lodged to bank accounts the victim does not control.

**The hostel noticeboard payroll form.** A paper form collecting TFNs for cash work that never materialises, left where a hundred people will fill it in.

The consistent tell is a promise of a specific refund amount before anyone has seen your income statements. Nobody can know that number in advance, and anyone claiming to is not doing tax work. A genuine [working holiday tax return](/tax-return) starts from the income statements in your ATO record, and the result is only known once it has been assessed.

## How do you check someone before handing anything over?

Every tax agent operating in Australia is on the government's searchable public register of tax practitioners. The check takes a minute, and a legitimate practice will expect you to do it.

Two things a genuine agent will never need are your government account password and your bank login. Access to your ATO records is obtained through a professional channel, not by logging in as you, and any request for those credentials is a fraud. Returns prepared for you here are reviewed and signed off by a registered tax agent before lodgement, and that registration is checkable on the same public register.

## What if you have already given it to the wrong person?

Nothing catastrophic happens automatically, and a TFN alone is not enough to empty a bank account. The risk is a fraudulent tax return lodged in your name, or an account opened using your identity, and both are detectable.

The ATO can place a flag on your record after an identity compromise, which is worth doing rather than waiting to see. Call its identity support line on 1800 467 033 and say plainly what was disclosed and to whom. If you also handed over a government account login, change it before you do anything else.

## Is the request in front of you legitimate?

The list of who may lawfully ask is fixed, but whether a particular request is legitimate turns on context.

- Whether you have accepted the job yet. This is the whole test for an employer request.
- Whether the person asking is a registered practitioner, which is checkable in a minute on the public register.
- Whether anyone has your government account credentials as well as your TFN, which is a materially worse situation than the TFN alone.
- Whether you are claiming a Services Australia payment, which is the one government context outside the ATO where the request is legitimate.
- Whether you gave it to a super fund. That one is not a risk, it is necessary, and a fund without your TFN taxes contributions at a higher rate and struggles to match the account to you when you [claim your superannuation after leaving Australia](/superannuation).
 `,
 }, {
 slug: "tfn-australian-address-no-fixed-address",
 title:
 "No fixed address? Get a TFN with a hostel or PO box",
 description:
 "Your TFN arrives as a letter, so you need an Australian address that holds mail for about four weeks. A hostel, a friend's place or a PO box all work.",
 category: "TFN",
 date: "29 October 2025",
 readTime: 5,
 body: `
A [TFN application](/tfn) needs an Australian address because the TFN arrives as a posted letter. It does not need a lease. A hostel, a friend's place, a workplace or a mail holding service all work, provided mail is reliably collected for about four weeks after you apply.

## What does the ATO accept as an address?

The ATO asks for an Australian residential or postal address and does not verify that you live there. It needs somewhere a letter will be collected rather than returned to sender, which is a lower bar than most applicants assume.

- A rental, share house or sublet
- A hostel or backpacker accommodation
- A friend's or relative's home
- A workplace address, with the employer's agreement
- A mail holding service with a street address

A street address works more easily than a PO box, which is worth knowing before you pay for one.

## Why is a hostel address the risky option?

A hostel is the most common choice and the most common failure. Large hostels handle hundreds of items of mail a week, letters are lost, binned or returned, and almost none of them forward mail to a guest who has checked out.

If a hostel is the only realistic option, ask the front desk whether they hold mail by guest name and start checking after ten days. The ATO's outer limit is 28 days but the letter usually arrives inside two weeks.

## What happens if you move before the letter arrives?

Moving before the letter lands is the biggest cause of a working holiday maker never receiving their TFN. Once it has been posted to the old address the ATO does not automatically send another, and a returned letter does not trigger a reissue.

The number itself is not lost, because a TFN is issued once and permanently. Only the delivery failed. Recovering it means correcting the address on the ATO record and having the number confirmed, not applying again, which creates a duplicate record that takes longer to untangle. Our guide to [updating your address with the ATO](/blog/how-to-update-address-with-ato) covers the correction.

## Which address should you actually use?

Rank the options by whether a human being will notice the letter. A friend's or relative's established home is the best answer available, because real households open their post. A workplace comes next where the employer agrees, and farms do this routinely for seasonal staff.

- A friend's or relative's established residence
- A workplace address with the employer's agreement
- A hostel where you have booked four weeks or more and confirmed they hold mail by name
- A mail forwarding service with a street address

What breaks deliveries is predictable: checking out before the letter arrives, hostels that clear unclaimed mail weekly, and a wrong unit number on the form.

## Does the delay actually cost you anything?

Not directly. The TFN application is free, the number is permanent, and any over-withheld tax is dealt with on your [working holiday tax return](/tax-return), so the letter being late does not by itself cost you money.

What it costs is cash flow in the months between, and that depends on something separate from the letter. If you tell your employer you have applied, you have 28 days from your first day of work to give them a TFN before they must withhold at 45% instead of 15%, and the declaration form records an application in progress. Without that, the top rate applies at once. What decides your pay is whether you told the employer, not whether the letter has arrived. Our guide to [the TFN reference number](/blog/tfn-reference-number-before-tfn-arrives) covers what you can use in the meantime.

## What decides whether your application goes smoothly?

Three facts, all yours to control on the day you apply. Whether the address will still be collecting your mail in four weeks. Whether the details match your passport exactly, since a mismatch with immigration records is the usual reason an application is rejected outright. And whether your employer has been told the application is in progress, which protects your withholding rate while you wait.

We handle TFN applications with a verified address that holds mail for the life of the application and confirm the number back to the client directly, which removes that failure point for anyone still moving every few weeks. Treat the letter as a high value document: our guide to [protecting your TFN](/blog/tfn-security-protect-from-fraud) sets out who is entitled to ask for it.
`,
 },

// ─── ABN ──────────────────────────────────────────────────────────────────
 {
 slug: "abn-invoicing-requirements-australia",
 title: "What Must an ABN Tax Invoice Include?",
 description:
   "An ABN invoice needs your name, your ABN, the date, a description and the total. GST lines belong on it only if you are registered, which most are not.",
 category: "ABN",
 date: "30 October 2025",
 readTime: 5,
 body: `
A tax invoice issued under an [ABN](/abn) must show your name, your ABN, the date, a description of the work and the total payable. GST lines belong on it only if you are registered for GST. Leave the ABN off and the payer must withhold 47% of the payment.

## What must every ABN invoice contain?

Five items on any invoice, whatever the amount. The name has to be the legal name registered against the ABN, not a trading name you invented.

- Your name, exactly as registered against the ABN
- Your ABN
- The date of issue
- A description of the goods or services
- The total amount payable

Once the invoice reaches $75 excluding GST and you are registered for GST, more is needed: the words Tax Invoice displayed clearly, the GST amount or a statement that the total includes GST, and for invoices of $1,000 or more, the buyer's name or ABN.

## Do you need to show GST at all?

Only if you are registered, and most working holiday makers are not. Registration is required once turnover passes $75,000 in a financial year, and most backpacker ABN income sits well below that.

Showing GST when you are not registered is a real problem: you are charging a tax you cannot remit and the payer is claiming a credit they are not entitled to. Passenger rideshare is the exception and requires registration from the first dollar, which our guide to [GST and ABNs](/blog/gst-and-abn-for-working-holiday-makers) explains.

## What happens if you leave the ABN off?

The no ABN withholding rule requires a business paying for goods or services without a quoted ABN to withhold 47% and send it to the ATO. It applies even where you hold a valid ABN and simply forgot to put it on the invoice.

The amount withheld is taken into account when the [tax return](/tax-return) is assessed. What it costs is access: on a $2,000 invoice that is $940 sitting with the ATO for months.

## Why do invoices get rejected?

Almost never over tax rules, almost always over small mismatches that stop an automated system dead. Payers verify an ABN through the public ABN Lookup tool, and if the registered name does not match the invoice, it does not proceed.

- A trading name on the invoice where the ABN is registered to your personal name
- One wrong digit in the ABN, which makes it fail lookup entirely
- No invoice number, where the payer needs a unique reference
- A date written the American way rather than as DD/MM/YYYY
- No bank details, leaving a willing payer unable to pay

## What actually gets you paid?

Compliant fields get an invoice accepted. Habits get it paid. The strongest is invoicing on the day the work finishes, because a late invoice from someone who has left the region is easy to ignore.

- Invoice the day the work is completed
- State payment terms explicitly, since seven days is normal for labour and silence invites thirty
- Quote the purchase order or the supervisor's name where the site uses them
- Chase in writing on the first day overdue, politely, with the invoice attached again
- Run an ABN Lookup on an unfamiliar payer before a large job, which takes seconds and shows deregistered entities

## What decides whether the invoice or the arrangement is the real problem?

The invoice is paperwork. Whether you should be invoicing at all is much larger. If the business sets your hours, supervises the work and supplies the equipment, that is employment, and an invoice does not change it.

Being asked to invoice for supervised shift work is sham contracting, and it costs you the 12% [superannuation](/superannuation), the award rate, penalty rates and workers compensation cover. Our guide to [employee versus contractor status](/blog/employee-vs-contractor-australia) sets out the test, worth applying before the first invoice.

## What should you do before you leave Australia?

Two things, neither of them the invoicing. Unpaid invoices remain legally collectable after you have gone, but recovering them from another country at backpacker scale is close to impossible, so short terms and fast chasing while you are here is the only system that works.

The second is the ABN itself, which should be cancelled when the contracting stops. Left open it generates ATO correspondence and lodgement expectations for years. Our guide to [cancelling an ABN](/blog/how-to-cancel-your-abn) covers what to close off first.
`,
 }, {
 slug: "abn-deductions-business-expenses",
 title: "ABN Deductions: What Contractors Can Claim",
 description:
   "ABN income opens broader deductions - equipment, phone share, vehicle costs, insurance. The full list with the records the ATO expects.",
 category: "ABN",
 date: "15 November 2025",
 readTime: 6,
 body: `
An [ABN](/abn) holder deducts genuine business expenses from income before tax is calculated, the compensation for having nothing withheld. Tools, protective gear, vehicle running costs, the work share of phone and internet, licences and agent fees all qualify. Substantiation is stricter than for employees, and that is where claims fail.

## What is the actual test for a deduction?

That the expense was incurred in earning your ABN income, and that you can show it. Most claims fall down on the second part.

Claims are disallowed for no record of the cost, no record of the work connection, or no defensible basis for the split between work and private use. An expense that genuinely happened but cannot be evidenced is not a deduction.

## What can a working holiday maker on an ABN claim?

Which categories matter depends on the kind of contracting. A delivery rider and a farm contractor with their own equipment share little beyond the phone.

- Tools and equipment required for the work, such as a chainsaw for tree work or a courier's delivery bag
- Protective clothing and safety gear: high visibility vests, steel capped boots, gloves, hard hats
- Vehicle running costs for work travel: fuel, registration, insurance and maintenance, apportioned to work kilometres
- The work related percentage of mobile phone and internet costs
- Licences and tickets the work actually requires, such as a White Card or an RSA
- Bank and merchant fees on a business account, including platform commissions
- Fees for managing your tax affairs

Anything used for both work and private purposes is claimable only at the work percentage. A phone used 60% for work is 60% deductible, and that 60% cannot be a guess.

## What records does the ATO actually require?

A receipt or tax invoice showing the supplier, the date, the amount and what was bought, for every claim. Apportioned items also need a basis for the percentage: a logbook for vehicles, a representative period of usage for phone and internet.

Two thresholds are often misapplied here. The $300 immediate deduction is an employee rule; on an ABN, a small business using the simplified depreciation rules can write off each asset costing less than $20,000 in the year it is first used, a threshold made permanent from 1 July 2026. The $1,000 standard deduction that starts in the 2026-27 income year does not cover business expenses at all: it is for Australian residents with labour income such as wages, and ABN costs are claimed separately. Our guide to [the $1,000 standard deduction](/blog/1000-dollar-instant-deduction-rule-2026) sets out who it is for.

## What cannot be claimed, however much it feels like it should be?

Several costs look deductible and are not, and they account for most disallowed claims here. The common thread is a private cost that occurs around work rather than a cost of doing the work.

- Travel between home and a regular work location, private travel however early the start
- Clothing that is ordinary rather than protective or a branded uniform
- Food and drink during the working day, private for contractors as it is for employees
- Accommodation at your own base, including where you work from it
- Costs incurred before the ABN was registered and the activity started

The vehicle rules carry the most money and the most misunderstanding. Our guide to [vehicle logbooks on an ABN](/blog/vehicle-logbook-abn-working-holiday) covers what a logbook has to contain to be accepted.

## Why do deductions matter more on an ABN than on wages?

Because nothing was withheld. On wages the employer has already taken tax out, so a deduction increases a refund. On ABN income the full invoice reached you and the tax is still owed, so a deduction reduces an amount payable.

That changes the stakes, not the arithmetic. A wage earner who misses deductions gets a smaller refund. A contractor gets a larger bill, and if nothing was set aside during the year it arrives without funds behind it.

## Why do so many claims never get made?

Because the records were never kept, not because the expenses were not incurred. Farm contracting with your own gear, or delivery work with your own vehicle, incurs deductible costs continuously and keeps almost none of the paperwork.

There is also a knowledge gap between the two regimes. People who worked as employees before going onto an ABN carry over the employee rules, and the vehicle and equipment treatment is not the same.

## Which of these apply to your year?

Which deductions are available, and whether they survive scrutiny, depends on how the work was structured and what you kept.

- What kind of contracting it was, since the categories differ between delivery, farm work and trades.
- Whether you kept receipts as you went, which is what makes a claim defensible.
- Whether a logbook exists for any vehicle claim, the most commonly disallowed item.
- Whether individual assets cost more or less than $20,000, which decides immediate write off or depreciation under the small business rules.
- Whether wages as a resident bring in the $1,000 standard deduction (2026-27 onwards), which covers labour income only and never ABN expenses.
- Whether you had wages in the same year, since that withholding often absorbs the ABN tax.
- Whether you registered for GST, which decides whether amounts are claimed inclusive or exclusive of it.

The combined position is worked out in the [working holiday tax return](/tax-return). You can [estimate your tax refund](/calculator) once you know what each side of the year came to.
 `,
 }, {
 slug: "uber-doordash-rideshare-abn-working-holiday",
 title: "Uber and DoorDash: ABN, GST and Your Tax",
 description:
   "Rideshare needs GST registration from dollar one - delivery does not. Setting up correctly, quarterly BAS, and the deductions that cut your bill.",
 category: "ABN",
 date: "20 November 2025",
 readTime: 6,
 body: `
Platform work is contracting, not employment. You need an [ABN](/abn), nothing is withheld from what the platform pays you, and no superannuation is paid on it. The rule that catches people is GST: rideshare requires registration from the first dollar with no threshold, while food delivery follows the ordinary $75,000 threshold.

## Why is platform work treated as contracting?

Because the platform pays you for completed jobs rather than for your time, and does not control your hours the way an employer does. Uber, DoorDash, Menulog and the rest engage riders and drivers as independent contractors, a genuine classification here rather than the disguised employment you see in cafes and farms.

So you need an ABN before you can be onboarded, you set aside your own tax, you receive an annual platform statement rather than an income statement, and you can deduct the costs of doing the work. You also receive no superannuation, no award rate and no workers compensation.

## What is the GST rule that catches almost everyone?

Ordinary ABN work only requires GST registration once turnover passes $75,000 in a financial year. Rideshare does not follow that rule. Passenger transport services, which includes Uber, Ola, Didi and their equivalents, require GST registration from the first fare.

Food delivery is different. Uber Eats, DoorDash and Menulog sit under the standard $75,000 threshold, so a rider doing delivery only usually has no GST obligation. The distinction follows the work rather than the app: add passenger rides to a delivery week and the rideshare registration requirement is triggered.

Registration brings a Business Activity Statement obligation, usually quarterly, and it persists until you cancel it. A driver who registered and then ignored the statements can face backdated liability for the GST component of every fare taken.

## What can you deduct against platform income?

Everything genuinely incurred in doing the work, and for driving that is a large list because the vehicle is the business.

- Fuel, servicing, registration, insurance and depreciation, apportioned to work kilometres
- Interest on a vehicle loan, at the same apportionment
- Mobile phone and data for the app
- Tolls and parking incurred while working
- Vehicle cleaning
- Delivery equipment: bag, helmet, bike maintenance and repairs for couriers
- Platform commissions and service fees

Vehicle costs can be claimed on a cents per kilometre basis or by actual costs supported by a logbook. The logbook method usually produces a larger deduction for anyone driving serious hours, and it is also the method that fails most often for lack of records. Our guide to [vehicle logbooks](/blog/vehicle-logbook-abn-working-holiday) sets out what one has to contain.

## Does the ATO already know what you earned?

Yes. Platforms report annual earnings directly to the ATO under the Sharing Economy Reporting Regime, so the income figure exists in ATO systems before you lodge anything.

That makes under reporting platform income the least effective omission available. It also makes multi apping simpler than it looks: every platform reports separately, and a return covering three platforms is matched against three reports.

## How does multi apping work for tax?

As one business, not three. Running Uber Eats, DoorDash and Menulog at once is a single sole trader enterprise: one ABN, income summed across platforms, expenses pooled, one set of business items in the return.

Expenses need no allocation between apps, because the bike or car serves the enterprise rather than any one platform. One spreadsheet with date, platform, gross earnings and kilometres carries everything downstream.

## Why does this go wrong so often for working holiday makers?

Because nothing is withheld and nothing prompts you. Someone earning $25,000 through delivery in a year has had no tax taken at any point, and the working holiday rate of 15% on that income is still owed, payable in a single amount at lodgement.

Someone who also had ordinary wages is usually better off, because the PAYG withheld from those wages frequently absorbs the tax on the platform income. Someone who did platform work only, and set nothing aside, gets a bill.

## How was your platform year made up?

Platform work is straightforward once the registrations are right. What you owe depends on how the year was made up.

- Whether you drove passengers or delivered food, which decides the GST question entirely.
- Whether you also had wages, since the withholding from those often covers the platform tax.
- Whether a logbook exists, which decides how much of the vehicle cost is claimable.
- How much you set aside as you went.
- Whether you registered for GST and lodged the activity statements that came with it.
- Whether the ABN and any GST registration were cancelled when you stopped.

The combined position is worked out in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) to see whether your year lands as a refund or an amount owing.
 `,
 },

// ─── TAX RETURN ───────────────────────────────────────────────────────────
 {
 slug: "tax-return-without-tfn-australia",
 title: "Worked Without a TFN? The 45% Explained",
 description:
   "No TFN during the year means 45% withholding, but a TFN can still be obtained later and the year lodged. How late-TFN tax returns work.",
 category: "Tax Return",
 date: "21 November 2025",
 readTime: 5,
 body: `
You can, and the return is often the most significant one of your stay. Without a TFN on file your employer had to withhold 45% instead of 15%, and the difference is reconciled through the return. You need a TFN before anything can be lodged, and it can still be obtained after you have left.

## How much does a no TFN period actually cost you?

Thirty cents in every dollar earned, for as long as it lasted. With a TFN recorded the working holiday rate of 15% applies to the first $45,000. Without one, 45% is withheld from the first dollar, and on a $1,000 week that is $300 held back rather than paid to you.

Over withheld tax is taken into account when the return is assessed, and what is returned depends on your year. What it costs meanwhile is cash flow, and it is why a no TFN year can be one of the larger refunds a working holiday maker sees.

## Why can you not lodge without a TFN?

Because the TFN is the identifier that connects the employer's reported income to you. The ATO holds the reported wages and the withheld tax, but until a TFN exists to attach them to, there is no assessment to make.

This is why people give up on the year. They assume the withholding no longer counts because they never had a number. It still appears against the employer's reporting, and a TFN is what allows it to be matched. The application is free and can be made from overseas with identity verification.

## What happens to the records if you kept nothing?

Most of what is needed already exists in ATO systems. Employers report wages and withholding under Single Touch Payroll, and that reporting is what the return is built from, so a shoebox of lost payslips is a smaller problem than it feels like.

The real problem is an employer who never reported at all, which happens in cash paying industries. Then the income has to be reconstructed, and our guide to [cash in hand tax returns](/blog/cash-in-hand-tax-return) covers what evidence carries weight.

## What if the year has already passed?

A prior financial year can still be lodged. Time passing does not close off an unlodged year by itself, and working holiday makers routinely lodge for a year they left the country in.

Two things change with time. Employer records get harder to chase where reporting was patchy, and identity verification gets slower from overseas. Neither closes the door.

## What changes about the return if you have already left?

The mechanics are the same and the friction is different. A return can be lodged from anywhere, but the refund is paid to an Australian bank account, so an account closed on the way to the airport becomes the obstacle rather than the tax.

A first return, a newly issued TFN and an overseas address is the combination most likely to attract manual identity checking at the ATO. That is a delay rather than a rejection, and consistent documents shorten it.

## What else is usually sitting in a no TFN year?

More than the withholding difference, because the years people work without a TFN are the years where nothing else was set up. Superannuation is the common one: contributions made without a TFN attached often sit unmatched in a fund or with the ATO, and they are still yours.

The Medicare levy exemption is the other. Whether the 2% levy applies depends on your individual circumstances, and an exemption is only applied if it is claimed. Neither appears on any payslip.

## How big is your own over withholding?

Whether anything is returned, how much, and how quickly, depend on your own facts.

- How many weeks ran before your TFN reached the employer.
- Whether the employer reported your income under Single Touch Payroll.
- Whether the employer was registered with the ATO as a working holiday maker employer, since an unregistered one withholds at foreign resident rates even with a TFN on file.
- Whether an Australian bank account is still open to receive the refund.
- Whether super was paid to a fund that could not match it to you.
- Whether more than one financial year is involved, since each is a separate return.

The reconciliation is done as part of the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know roughly what was withheld.

## Who should you actually hand your documents to?

People who worked without a TFN are the most targeted group in this audience, because they are already unsure how the system works. Backpacker Facebook groups and messaging communities carry a steady supply of people offering to sort your tax out.

Never send a TFN, passport or visa grant to anyone who cannot show you a registration on the government's public register of tax practitioners. A verifiable registration number is the whole test.
 `,
 }, {
 slug: "multiple-jobs-tax-return-working-holiday",
 title: "Multiple Jobs? One Tax Return Covers All",
 description:
 "All income statements combine into a single return - missing one triggers ATO amendments. How to reconcile several employers and spot over-withholding.",
 category: "Tax Return",
 date: "23 November 2025",
 readTime: 5,
 body: `
Every job in a financial year goes on one [tax return](/tax-return), including the week you did in a kitchen and never went back to. Each employer reports separately to the ATO, so the return has to reconcile against the combined total. Any over-withholding usually traces back to whichever employer had the wrong rate.

## How does the ATO already know where you worked?

Through Single Touch Payroll, which requires every Australian employer to report wages, tax withheld and [super](/superannuation) to the ATO at each pay run rather than once a year. By the time you come to lodge, the ATO holds the complete list.

Two consequences follow. Forgetting an employer does not leave income off a return; it lodges a return that does not match the record. And a job you have no payslips for is not lost income, because the reporting came from the employer and not from you. A festival shift paid through a temp agency six months ago is in there whether or not you remember the agency's name.

## What goes wrong when an employer is left off?

The return is processed at the figure you reported, the refund is paid, and the correction arrives afterwards. The ATO spots the gap against its own record and issues an amended assessment adding the missing income, commonly weeks or months later.

By then the refund is generally spent. The amended assessment creates a debt, the General Interest Charge runs on it from the original due date, and a substantial omission can attract a penalty on top. Lodging once against the full record avoids all of it.

## Where does over-withholding usually sit?

Often with one employer rather than spread evenly across them. The useful exercise is comparing rather than adding: divide tax withheld by gross wages for each employer separately and see which one sits meaningfully above 15%.

Two patterns produce that. An employer not registered with the ATO as a working holiday maker employer must withhold at foreign resident rates rather than 15%, common on farms and with small regional businesses, and the excess is recoverable. A first job where your TFN arrived late shows weeks at 45%, a difference of 30 cents in every dollar for that period. Identifying which employer it was shows where the withholding went wrong.

- One employer well above 15%: an unregistered employer or a late TFN, and an excess that may be recoverable
- All employers at 15%: the withholding looks right, and any difference comes from items such as the Medicare levy and deductions instead
- Combined income above $45,000: the rate steps to 30% and the withholding may have been short

## Can multiple jobs leave you owing money?

Yes, and it catches people who assume more jobs means a bigger refund. Each employer withholds against the income they pay you without knowing about the others, as though its job were your only one.

Working holiday makers are generally taxed under a separate schedule, so the usual Australian version of this problem may not arise in the same way, but the bracket effect does. Combined income above $45,000 moves into the 30% bracket while each individual employer may still have been withholding at 15%, and the shortfall appears at the end of the year as an amount owing. Three concurrent casual jobs through a busy summer is the usual shape.

## What is worth keeping when you work several jobs?

Anything not already in the ATO record, which is a shorter list than most people expect. The income side comes through Single Touch Payroll, so payslips are a cross check rather than the source, useful for proving what should have been reported if an employer never finalised.

- Payslips or final summaries, as a check against the ATO figures
- Details of any cash payments never reported through payroll, which still have to be [declared](/blog/cash-in-hand-tax-return)
- Work related expenses, recorded against the job they belong to
- Travel between two workplaces on the same day, which can be deductible where travel from home is not

## When can a multi employer return be lodged?

Once every employer has finalised, and not before. Employers must finalise their Single Touch Payroll reporting by 14 July, and income statements show as not tax ready until they do, and one employer finalising late is enough to make the whole return premature.

This is where multi employer years get amended unnecessarily. Lodge in early July against three finalised employers and one that has not finished, and the fourth arrives afterwards and the assessment changes. Waiting for all of them costs a fortnight; amending afterwards costs considerably more.
`,
 }, {
 slug: "second-third-year-visa-tax-implications",
 title: "Second year visa tax in Australia: same 15% rate, same TFN",
 description:
   "A second or third year visa does not change the 15% working holiday rate or your TFN. What can change: your residency, super across visas, your records.",
 category: "Tax Return",
 date: "24 November 2025",
 readTime: 6,
 body: `
The working holiday maker rates themselves do not change with a second or third year visa. What can change is your residency position, because a longer stay can turn a question that was once straightforward into a genuine judgement, and that is where the numbers can move.

## Why does the rate stay the same when everything else has changed?

Because the rate attaches to the visa subclass rather than to time served. A third year on a 417 is taxed identically to the first week of the first year, and 30% applies above $45,000 up to $135,000 on every visa year. Our guide to [the backpacker tax rate](/blog/backpacker-tax-rate-australia) sets out the full structure.

What people get wrong is assuming the rest of the return is a copy of last year's. In several specific places it is not.

## Where does residency genuinely start to shift?

In a second or third year, quietly and with no obvious moment where it happens. Tax residency is not settled by your visa; it depends on your circumstances and has to be properly reviewed. A longer stay is exactly the kind of year where the judgement can land either way, and two multi year backpackers whose years look identical from the outside can be correctly assessed on opposite sides of the line.

If residency is established, what the finding is worth varies from person to person and is assessed case by case. The area has been fought to the High Court in Addy v Commissioner of Taxation, which measures how far from obvious the answers are.

None of it is automatic. Our guide to [tax residency for working holiday makers](/blog/tax-residency-working-holiday-makers) covers why it has to be assessed rather than assumed.

## Do you need a new TFN?

No. A TFN is issued once and is permanent, following you across visas, years and a departure and return. Applying again creates a duplicate record rather than a second number, and duplicates cause the identity mismatches that delay refunds.

If you cannot find the old one, recovering it is a different process from applying for a new one, and it is the right process. Our guide to [whether you need a new TFN on a second visa](/blog/do-you-need-new-tfn-second-visa) covers it.

## What happens to super across visa years?

It stays where it is, and the timing of the DASP claim becomes the decision. Super can only be claimed once your visa has ceased and you have left, so a first year balance accumulates alongside the second year's contributions and is claimed together at the end.

If you claimed DASP after your first visa and then returned on a second, that money is gone at 65% withholding and contributions start fresh. Nobody can undo it, and it is the most expensive avoidable decision here for someone who intended to come back.

Multiple visa years also mean multiple funds, because each new employer defaults you into their own unless you nominate. Consolidating is covered in our guide to [super across multiple funds](/blog/super-multiple-funds-consolidation).

## What do the 88 and 179 day requirements do to your tax records?

They are immigration requirements rather than tax ones, but they generate the tax records your next visa application is evidenced with. Eighty eight days of specified work in a regional area qualifies you for a second year visa, and a further 179 days during the second year qualifies you for a third.

Every regional employer needs your TFN on file, reports your income to the ATO under Single Touch Payroll, and produces payslips that evidence the days worked. Regional work is also where employers are most likely to be unregistered as working holiday maker employers or to engage people on ABNs, so it is where withholding errors concentrate.

## What does a multi year backpacker end up carrying?

More returns than they expect. Because the financial year runs 1 July to 30 June, a two or three year stay usually produces three or four returns rather than one per visa, each with its own income, residency question and refund.

The people who leave with clean records collect their final refund and DASP without much friction. The ones carrying an unlodged year from two summers ago, four super accounts and an ATO address that is a hostel in Cairns spend months on it from the other side of the world.

## What is different about your second year?

The rate is fixed across visa years. Almost everything else about a second or third year return is decided by facts specific to you.

- Whether your residency position deserves a fresh look, which after a longer stay it usually does.
- What a residency finding would be worth in your particular case, which varies more than people expect.
- Whether any earlier financial year was left unlodged, which can still be lodged.
- Whether you claimed DASP between visas, which cannot be reversed.
- How many super funds now hold contributions in your name.
- Whether any period ran on an ABN, since that income is assessed with no withholding behind it.
- Whether the ATO holds a current address and an open Australian bank account for you.

Each year is worked out separately in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) for each of them.
 `,
 },

// ─── SUPER ────────────────────────────────────────────────────────────────
 {
 slug: "dasp-documents-required",
 title:
 "DASP Documents: What Every Fund Asks For",
 description:
 "Identity, proof the visa has ceased and proof you have left, for every fund separately. Certified copies are what stalls most claims made from overseas.",
 category: "Super",
 date: "28 November 2025",
 readTime: 5,
 body: `
Three things, for every fund separately: proof of identity, proof your visa has expired or been cancelled, and proof you have left Australia. Missing paperwork is the leading cause of a one month claim becoming a six month one, and certified copies are where claims from overseas stall.

## Are you actually eligible yet?

Three conditions have to hold together, and submitting before they do is the most common wasted application. You accumulated super while working on a temporary visa, which includes 417 and 462. You have left Australia. And your visa has expired or been cancelled, with no other Australian visa active.

You cannot claim while the visa is still active, even from your home country, and you cannot claim before you leave, though you can start and save the ATO's online application while still here. Citizens and permanent residents of Australia or New Zealand cannot claim at all. If your situation is clear on all three, the page on how to [claim it as a DASP](/superannuation) walks through the application itself.

## What identity documents does a fund want?

The passport used on your working holiday visa, and if you have renewed since, both passports. A fund may ask for certified copies of your identity documents rather than photographs, whatever the balance, online or on paper.

The $5,000 figure people mention is a different rule. On a paper application for a balance of $5,000 or more you may need a Certification of Immigration Status from the Department of Home Affairs, which has a fee. Under $5,000 other evidence can be given, though a fund may still ask for the certificate.

Certified means an authorised person has sighted the original and endorsed the copy, and who counts varies by fund: an Australian notary or justice of the peace, an Australian consulate abroad, or a locally recognised equivalent. This is what most often stalls a claim from overseas, because a solicitor in Manchester or a notary in Osaka may or may not appear on a fund's accepted list, and you find out after submitting. Some funds accept digital identity verification instead.

## What proves your visa has ceased?

On the ATO's online application, usually nothing from you: it checks your visa status against Department of Home Affairs records and confirms eligibility automatically. Where a fund or a paper application asks for evidence, it comes from Home Affairs in one of three forms. A visa grant notice showing an expiry date that has passed. A cancellation notice if the visa was cancelled early. Or a VEVO extract showing current status as expired, the most common because it shows live status.

A VEVO extract has to be generated after the visa has ceased. One pulled a week early shows an active visa and proves the opposite of what you need.

## What proves you have departed?

The movement record maintained by Home Affairs, which logs every entry and exit. Funds also commonly accept a departure boarding pass with a passport exit stamp, or an entry stamp into another country dated after the visa expiry.

The departure has to be after the visa ceased. Flying out mid visa and returning later does not trigger eligibility, so a trip to Bali in your ninth month is not a departure for these purposes.

## What makes a claim difficult?

Not the tax. The 65% withholding on a working holiday DASP is the same whoever lodges it, so the difficulty is entirely in the paperwork, and it scales with three things.

**How many funds hold your money.** Each account is a separate application with its own document standards, and each has to be located first. A traveller who remembers one fund and had three employers is leaving two behind.

**Where you are when you claim.** Certification requirements are assessed against the country you are certifying in, and a fund that goes silent is far harder to chase from another continent.

**How long ago you left.** Once at least six months have passed since you departed and your visa ended, funds must transfer unclaimed balances to the ATO. The money is not lost, but it has moved.

Our [superannuation refund service](/superannuation) covers exactly those parts: locating every fund rather than the one you remember, meeting fund specific document standards, arranging certification, chasing funds that go quiet, and running the claim alongside your final year [working holiday tax return](/tax-return).

## What goes wrong most often?

The same short list. Passport details that do not match what the fund holds, because an employer typed your name in a hurry when the account was opened. A visa expiry date entered incorrectly. A departure date that predates the visa expiry. Certification the fund will not accept. And an application sent to a fund holding no balance.

That last one is the most common. A traveller with three employers usually has three funds, each identified and claimed from separately. See [finding lost superannuation](/blog/how-to-find-lost-superannuation) for how the central record works.

## How hard will your three documents be?

Every fund wants the same three things. How hard they are to produce varies with where you are and how long ago you left.

- How long ago you left, which decides whether your money is still with funds or already with the ATO.
- Whether you have renewed your passport since working in Australia.
- Whether you apply online or on paper, since a paper application for $5,000 or more may need a Certification of Immigration Status.
- Where you are certifying documents, because acceptance varies by country and by fund.
- How many employers you had, which is how many separate applications this becomes.
- Whether your final year return is also outstanding, which is separate money on a separate timetable.

The eligibility rules, withholding and timing are set out on the superannuation refund service page linked above.
 `,
 }, {
 slug: "dasp-tax-rate-65-percent-explained",
 title:
 "DASP tax rate: why working holiday super is taxed 65%",
 description:
 "Working holiday super is taxed at 65% when you claim it as a DASP, so $10,000 pays out about $3,500. Why the rate exists, and why claiming is still right.",
 seoTitle: "DASP tax rate: 65%, so $10,000 of super pays about $3,500",
 category: "Super",
 date: "11 December 2025",
 readTime: 4,
 body: `
Sixty five per cent, on the taxable component. A $10,000 balance pays out about $3,500. The rate was set by federal law in 2017 specifically for super contributed while on a 417 or 462 visa, and it cannot be reduced, deducted against or planned around. Other temporary visa holders pay 35% on the taxed element and 45% on the untaxed element.

## What does the 65% actually apply to?

The taxable component, which for a working holiday maker is essentially all of it. Your account is employer contributions paid under the superannuation guarantee, currently 12% of your wages, plus what those contributions earned while invested. Both are taxable component.

For a working holiday maker the 65% applies to the taxed and the untaxed element of the taxable component alike. Only a tax free component, from personal after tax contributions, escapes it, and almost no working holiday maker has one.

## Why is DASP tax so high for working holiday makers?

A deliberate trade in the 2017 working holiday maker reform package. That legislation set the income tax rate at 15% from the first dollar, lower than the foreign resident rates that would otherwise apply, and set a separate 65% DASP rate, in force since 1 July 2017, for super built up on those visas.

The rate does not vary with how long you were here, how much you accumulated, which fund it sat in or what you earned. The fund applies it before release, so nothing arrives that you have to set aside.

## How much DASP do you get on $5,000, $10,000 or $20,000?

At 65% on a balance that is all taxable component, 35 cents in every dollar is paid to you. These are worked examples, not a quote.

- $5,000 balance: $3,250 withheld, about $1,750 paid to you
- $10,000 balance: $6,500 withheld, about $3,500 paid to you
- $20,000 balance: $13,000 withheld, about $7,000 paid to you

## What does this look like on real wages?

Super accrues at 12% of your wages, so the balance tracks what you earned. The figures below assume the whole account is taxable component.

- $20,000 of wages: roughly $2,400 of super, roughly $840 after the withholding
- $40,000 of wages: roughly $4,800 of super, roughly $1,680 after
- $60,000 of wages: roughly $7,200 of super, roughly $2,520 after
- A $10,000 balance: about $3,500 after

Fund fees and investment returns move these figures a little in both directions.

## Is it still worth claiming at that rate?

Yes. The alternative is not keeping the money, it is losing access to it. Once at least six months have passed since you left and your visa ceased, an unclaimed balance is transferred to the ATO, where it is still subject to the same 65% whenever it is claimed.

The choice is not 65% now against 0% later. It is 35% in your account now against a balance you come back for from another country years later, with a passport that may have been renewed in between. Most people who never claim did not decide not to. They just left. If claiming is right for you, [claim it as a DASP](/superannuation) once your visa has ceased and you have left.

## Can anyone get it out at a lower rate?

No. The rate is statutory, applied by the fund at the point of release, and identical whoever lodges the claim. There is no deduction, offset, structure or agent channel that changes it.

Offers on social media and messaging apps to handle a super claim at a better rate are either a misunderstanding of the law or a fraud collecting a passport, a TFN and enough identity to open accounts. A claim needs your passport, your TFN and your bank details in one place, which is what makes it an attractive target. The [TFN fraud patterns](/blog/tfn-security-protect-from-fraud) are worth reading before sharing anything with anyone.

## What decides your figure rather than the rate?

The rate is fixed by statute. What varies is how much of your balance it reaches and how much survives the wait.

- Whether any of the balance is tax free component, which is rare but is the only thing the 65% does not reach.
- Whether all of your contributions were made on another visa. If any part of the payment comes from contributions made on a 417 or 462 visa, the ATO applies the 65% to the whole payment; only super built up entirely on other temporary visas is taxed at 35% or 45%.
- How many funds you have, since fees erode each small balance separately.
- Whether your super has already been transferred to the ATO as unclaimed, which changes the route but not the rate.
- Whether your final year tax return produces a refund, which is separate money, taxed separately, and sometimes larger.

The eligibility rules, timing and documents are set out where you [claim your superannuation after leaving Australia](/superannuation), and the income side is a separate [working holiday tax return](/tax-return) that you can [estimate](/calculator) on its own.
 `,
 }, {
 slug: "super-multiple-funds-consolidation",
 title: "Several Super Funds? Consolidate or Claim",
 description:
   "Multiple funds mean multiple DASP applications - or one consolidation first. Which is faster, what fees change, and how insurance is affected.",
 category: "Super",
 date: "21 December 2025",
 readTime: 4,
 body: `
Four employers usually means four super accounts, because each one defaults you into its own fund unless you say otherwise. Whether you should consolidate them or simply claim each separately turns on one thing: how long you are staying. Consolidation is worth doing while you are in Australia and awkward once you have gone.

## Why does one person end up with four super accounts?

Because the default sits with the employer and almost nobody exercises the choice on their first day. An employee who does not nominate a fund is put into whichever fund that business uses, and the next employer does the same with a different fund, so the accounts accumulate without a decision being made.

Super stapling, introduced in 2021, was meant to solve this by tying you to your first fund. It works less well for working holiday makers: the stapling lookup often finds nothing for someone who has just arrived, and by the time a record exists the first employer has already paid into a different default.

## What does holding several accounts actually cost?

More than the balances justify. Every fund charges its own flat administration fee whatever the balance, and several also deduct default insurance premiums, so four small balances pay four sets of the same charges.

On a large balance those fees are trivial. On a few thousand dollars split four ways they are not, and the worst are the accounts from a job you did for three weeks, sitting untouched for a year paying for insurance you will never claim on.

- A flat administration fee per fund, charged whatever the balance
- A percentage fee on the balance itself
- Default insurance premiums, deducted unless cancelled
- No offsetting contributions once you stop working for that employer

## When is consolidating the right move?

When you are still in Australia and still working. One nominated fund, given to every current and future employer on a Standard Choice form, stops the duplicate fees and the duplicate insurance and leaves one account to deal with when you leave.

When you are leaving within weeks it is usually the wrong move. A rollover takes time to settle, and a DASP claim made while a transfer is in flight leaves a fragment behind in a fund you thought was closed. Claiming each fund separately is slower on paper and faster in practice. Our guide on [choosing a super fund](/blog/how-to-choose-super-fund) sets out what matters for a working holiday maker as opposed to a career.

## Can you consolidate after you have left Australia?

Technically yes, practically rarely. Most funds authenticate rollovers through Australian credentials and an Australian mobile number, which are the first things a departing backpacker loses.

The realistic route from overseas is a separate [DASP claim](/superannuation) with each fund rather than merging them first. It is more paperwork and several payments instead of one, but each claim is independent of a rollover completing. Keeping an Australian phone number alive for a few months after departure keeps the other options open.

## What if you do not know how many accounts you have?

Assume there are more than you remember. The ATO record is the only complete list: every fund that has ever received a contribution against your TFN appears there, including accounts opened by an employer you worked for briefly.

Balances that go unclaimed long enough stop being held by the fund at all and are transferred to the ATO as unclaimed super, which is not a loss but does change where you have to look. Our guide to [finding lost superannuation](/blog/how-to-find-lost-superannuation) covers what that transfer means.

## Who should you not give your details to?

Anyone who approaches you offering to find or consolidate your super. It is a well established scam aimed at this audience: they need your TFN, a passport scan and often your fund login, and those three are enough to move a balance into an account they control.

Paid tax help in Australia has to come from a registered tax agent, or from someone working under one's supervision, and the agent's registration can be checked on the government's public register in a minute. A super fund password is never required by any legitimate process, and being asked for one is the end of the conversation.

Super and tax are separate claims: the DASP pays out your fund balance, while tax over-withheld from your wages is dealt with only through a [working holiday tax return](/tax-return).
`,
 }, {
 slug: "dasp-rejected-what-to-do",
 title:
 "DASP claim rejected? 5 common reasons and how to fix them",
 description:
 "A rejected DASP is not lost money; the super stays in the fund. It is usually a visa record not yet updated, a name mismatch or an empty fund. The fixes.",
 category: "Super",
 date: "22 December 2025",
 readTime: 4,
 body: `
A rejected DASP is not lost money. The balance stays in the fund and the claim can be lodged again once the cause is fixed. Five things account for nearly every rejection, and four of them are administrative rather than substantive.

## What are the five reasons?

A vague rejection notice can usually be decoded without asking anyone.

**Your visa is not yet recorded as ceased.** A claim lodged within days of expiry or cancellation hits a Department of Home Affairs record that still shows the visa as active. The most common rejection, and purely timing.

**Your departure is not yet recorded.** The movement record follows airline data and typically updates within 7 to 14 days of you flying out. Claiming from the airport lounge does not work.

**Your identity does not match the fund's record.** Your passport says one thing and the super account, set up by an employer in a hurry, says something slightly different.

**The fund holds none of your money.** You applied to a fund you remember rather than the fund your contributions went to.

**Your certified documents were not accepted.** The certifier you used is not one that fund recognises, a much bigger problem once you are overseas.

Most of them are checks the [DASP claim](/superannuation) runs before anything is paid.

## How do you tell which one you have?

The notice usually just says the application was declined, so the diagnosis comes from the underlying records. Four settle it: your visa status, your movement record, the funds actually linked to your TFN, and the fund's own identity requirements.

The list of funds is the one people underestimate. A working holiday maker with four employers across a year usually has three or four super accounts, several with funds they have never heard of, because the employer chose.

## What do you do about a record that has not updated?

Wait and re-lodge. Visa cessation records update the day after expiry. Movement records typically update within a fortnight of departure. A claim lodged into a record that has not caught up fails again for the same reason.

If more than 30 days have passed since departure and the movement record still does not show it, it needs raising with Home Affairs, which is part of what we handle in a claim. It happens, usually on a code shared or rebooked flight.

## What do you do about a name mismatch?

The fund has to correct its record before the claim will pass. It is not your error: employers type a name off a passport at speed, and dropped middle names, reversed given and family names and stripped accents are all routine.

Two variants matter. If you renewed your passport since working in Australia, both the old and the new document are usually needed, because the account was opened against the old number. If you have been in Australia twice, you may have two member numbers with the same fund.

## What do you do if the fund holds nothing?

Find the fund that does. Every fund that has received a contribution linked to your TFN is recorded centrally, so the money is not missing and the answer is a lookup, not a search. See [finding lost superannuation](/blog/how-to-find-lost-superannuation) for how the records work.

If you left Australia more than six months ago, there is a reasonable chance the fund lost contact and the balance has already been transferred to the ATO as unclaimed super. That part is claimed from the ATO instead, through the same online application, where the ATO's service standard is 28 days from lodgement.

## A week of waiting or a fund correction?

Which of the five causes you have decides that. These facts settle it.

- How long ago your visa ceased and how long ago you actually left. Both have to be recorded before anything can succeed.
- Whether you have renewed your passport since working in Australia.
- How many employers you had, which is how many funds you probably have and how many separate claims this is.
- Whether you are applying from overseas, which makes certification the binding constraint.
- Whether the balance has already moved to the ATO, which changes the route entirely.
- Whether your final year tax return is still outstanding, which is separate money on a separate timetable.

The eligibility rules and documents are set out where you [claim your superannuation after leaving Australia](/superannuation), and if a final year [working holiday tax return](/tax-return) is also outstanding you can [estimate your tax refund](/calculator).
 `,
 }, {
 slug: "super-employer-not-paying-what-to-do",
 title: "Employer Not Paying Super? What Happens Next",
 description:
   "How unpaid super is recovered through the ATO, what to check in your fund, and realistic timelines when an employer has not paid.",
 category: "Super",
 date: "29 December 2025",
 readTime: 5,
 body: `
Unpaid super can be recovered, and the ATO rather than you is the one who recovers it. Employers must pay 12% of ordinary time earnings into your fund (within seven business days of payday from 1 July 2026, quarterly before that), and a missed payment creates a debt the ATO can pursue with powers no individual worker has. The question is whether you find it before you leave.

## How do you tell whether super has actually been paid?

By looking at the fund, not the payslip. A super line on a payslip means the amount was accrued against your pay, not that anything was transferred. That gap is the most common shape unpaid super takes in Australia.

The only proof of payment is the fund statement or the ATO's record of contributions. If the due date has passed by a week or two and the fund still shows nothing, the super is unpaid rather than late. Before that, a short gap is normal, and for pay periods before 1 July 2026 a gap of up to a quarter was normal because super was paid quarterly.

## What is the employer actually obliged to do?

Pay 12% of your ordinary time earnings into your nominated fund on time (generally within seven business days of payday from 1 July 2026), for every employee including casuals, under the Superannuation Guarantee (Administration) Act. There is no minimum earnings threshold, and a 417 or 462 visa makes no difference.

Missing a deadline does not create a late payment. It creates a liability for the [Superannuation Guarantee Charge](/blog/what-is-superannuation-guarantee-charge): the shortfall plus interest at the general interest charge rate plus an administrative uplift, which for pay from 1 July 2026 starts at 60% of the shortfall and interest and is reduced when the employer comes forward voluntarily. That is what makes it worth reporting rather than absorbing.

For pay periods before 1 July 2026 the old quarterly dates applied:

- 1 July to 30 September, due by 28 October
- 1 October to 31 December, due by 28 January
- 1 January to 31 March, due by 28 April
- 1 April to 30 June, due by 28 July

## What decides how you get it back?

Whether the employer is still trading and whether the omission looks deliberate. A small business that missed a quarter through disorganisation will often fix it once asked in writing, which is by far the fastest route.

Where a written request goes unanswered, the ATO route has teeth. It already holds both halves of the comparison: the wages your employer reported through single touch payroll and the contributions your fund reported receiving. Where the pattern includes underpaid wages or missing payslips, the Fair Work Ombudsman handles that side, and the two claims can run alongside each other.

## What if the employer has closed down?

The claim survives. When a business goes into liquidation the ATO becomes a creditor of it for the super charge, and contributions can be recovered through that process rather than being written off with the company.

What changes is the timeline, which runs in months rather than weeks. The Fair Entitlements Guarantee, the federal safety net that covers some unpaid wages and entitlements when an employer collapses, does not cover superannuation. Raise unpaid super while the employer is still trading if you have the choice.

## Why does this matter more if you are leaving?

Because DASP pays out only what is actually sitting in the fund. Super the employer never transferred is not in the fund, so it is not in the payment, and the money does not follow you home automatically.

That is a timing decision rather than a procedure. Delaying the [DASP claim](/superannuation) until the ATO has recovered the contributions puts everything in one payment, but can mean a long wait from overseas. Claiming now for what is in the fund gets that money moving and leaves the rest to be pursued separately, meaning a second payment later and more admin. Which is better depends on the size of the gap and on how long you can leave an Australian bank account open.

## How do you avoid the scam that targets this?

Be sceptical of anyone who contacts you about super rather than the other way round. Unpaid and lost super are known hooks, and the offer to chase it collects a TFN, a passport scan and fund login details, everything needed to roll a balance somewhere else.

Paid tax help in Australia has to come from a registered tax agent, or from someone working under one's supervision, and the agent's registration can be checked on the government's public register. A genuine one will not object to being looked up. No legitimate process requires you to hand over a super fund password.

Super and tax are separate claims: the DASP pays out your fund balance, while tax over-withheld from your wages is dealt with only through a [working holiday tax return](/tax-return).
`,
 }, 

// ─── WORK RIGHTS ──────────────────────────────────────────────────────────
 {
 slug: "workplace-injury-working-holiday-rights",
 title: "Injured at Work? Workers Comp Covers You",
 description:
   "Workers compensation applies regardless of visa - medical costs and lost wages included. What to do first and how claims work by state.",
 category: "Work Rights",
 date: "20 January 2026",
 readTime: 5,
 body: `
Yes. A working holiday maker injured during paid employment can claim workers compensation through the state or territory scheme. It covers medical treatment, rehabilitation and a share of lost wages. The right does not depend on your visa, on how long you have been in the job, or on whether the employer actually holds the insurance.

## What does the scheme actually cover?

Any injury or illness arising out of, or in the course of, paid employment. That is broader than most people assume.

- Acute injuries such as cuts, breaks, sprains and burns
- Repetitive strain from ongoing work activity
- Mental health conditions caused or aggravated by work
- Diseases contracted because of the work, including skin conditions from chemical exposure
- Injuries during work related travel, and in some states travel to and from work

It is a no fault scheme, the point most often missed. The injury does not have to be anybody's fault, and it does not have to be the employer's. If it happened because of work, the claim stands.

## What do the benefits amount to?

Medical treatment for the injury paid directly, weekly payments while you cannot work, travel to and from appointments, return to work support, and a lump sum where the injury results in lasting impairment.

Weekly payments typically run at 80% to 95% of your normal weekly wages, stepping down over time in some states, and continue while the injury affects your ability to work subject to state maximums. The scheme is state based, so the detail differs between New South Wales, Victoria, Queensland and the rest, and the state is where you work, not where the employer's head office is.

## How does this interact with not having Medicare?

It replaces the question for the injury itself. Workers compensation is the primary payer for treatment of a work injury and you should not be billed for it, which matters for the majority of working holiday makers who are not entitled to Medicare.

A broken wrist from a fall at work is covered even for someone with no Medicare entitlement and no travel insurance in force. Our guide to [Medicare for working holiday makers](/blog/what-is-medicare-working-holiday-makers) covers where the entitlement question sits.

## What has to happen for a claim to run?

Four things, in order, and the first two are the ones people delay. Report the injury to the employer as soon as it happens, in writing if possible. See a doctor and get a workers compensation medical certificate, which is a specific certificate rather than an ordinary sick note.

The claim is then lodged with the employer's insurer, and the employer must pass it on within a short statutory period, commonly five working days. Continuing certificates are needed for any period you remain unable to work. An employer cannot lawfully refuse to lodge a claim, and refusing is itself a breach reportable to the state regulator.

## What if you are threatened over it?

The threats are not real, and they are common enough to name. Working holiday makers report being told that a claim will get them sacked, deported or have their visa cancelled.

Dismissal because of a workers compensation claim is unlawful in every state. Making a claim is not a ground for visa cancellation, and an employer has no power over your visa status whatever they imply. If you are being pressured, the state regulator and the Fair Work Ombudsman are both available.

## What if you were working under an ABN?

Then cover is not automatic, and this is the real gap. A genuine contractor is generally not covered by the principal's workers compensation insurance and is expected to arrange their own.

But many people on ABNs in hospitality and farm work are misclassified employees, and reclassification restores the cover along with award rates and superannuation. Set hours, supervision, employer supplied equipment and a single client are the indicators. Our guide to [the employee versus contractor test](/blog/employee-vs-contractor-australia) sets out how it is decided, and it is worth resolving before assuming there is no claim.

## What does an injury do to your tax year?

It usually lowers your income, but at the flat 15% working holiday rate that does not by itself create a refund: tax withheld simply falls with the pay. What changes the return is how any compensation you received is treated.

Compensation payments are treated differently depending on their nature, with weekly wage replacement generally assessable and lump sums for permanent impairment generally not. Getting that classification right matters.

## What is payable, and for how long?

The entitlement is not the variable. What you receive and how straightforward it is depends on the facts below.

- Which state you were working in, since each runs its own scheme with its own rates and limits.
- Whether you were an employee or engaged under an ABN, and whether that classification was correct.
- Whether the injury was reported promptly and in writing.
- Whether you obtained a workers compensation medical certificate rather than an ordinary one.
- How long you were unable to work, which decides the weekly payments and the step downs.
- Whether the payments you received were wage replacement or impairment lump sums, which are treated differently at tax time.

A year interrupted by injury is reconciled in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) from what you actually earned.
`,
 }, {
 slug: "unfair-dismissal-working-holiday-australia",
 title: "Fired Unfairly? You Have 21 Days to Claim",
 description:
   "Casuals with regular patterns past 6 months can claim unfair dismissal; general protections have no minimum period. The strict deadline and the process.",
 category: "Work Rights",
 date: "23 January 2026",
 readTime: 5,
 body: `
An unfair dismissal claim goes to the Fair Work Commission within 21 days of the dismissal taking effect, and that deadline is close to absolute. Visa status is irrelevant to eligibility. What decides whether you can claim at all is how long you were there and how many people the business employs.

## Who is actually eligible to claim?

Anyone who completed the minimum employment period, which is six months at a business with 15 or more employees and twelve months at a small business with fewer than 15. That threshold rules out a large proportion of working holiday makers before the dismissal itself is considered.

Casual employees are not excluded. A casual employed on a regular and systematic basis with a reasonable expectation of continuing work can claim, and the test looks at the actual pattern of shifts rather than the word casual on the contract. Someone rostered four nights a week for eight months is in a stronger position than the paperwork suggests.

- 15 or more employees: six months minimum service
- Fewer than 15 employees: twelve months minimum service
- Casual with a regular, systematic pattern: counts towards the period
- Earnings must be under the high income threshold, which almost every working holiday maker is

## What makes a dismissal unfair?

That it was harsh, unjust or unreasonable, which covers both the reason and the process. A valid reason handled badly can still be unfair: being sacked for something you did is not automatically fair if you were never told about it and never given a chance to respond.

Termination for performance issues that were never raised. Dismissal shortly after a safety complaint or a workers compensation claim. A redundancy that turns out to have been a replacement. And, for small businesses, a dismissal that does not follow the Small Business Fair Dismissal Code, which sets out a shorter but still real process.

## What if you were there less than six months?

You cannot make a standard unfair dismissal claim, but the alternative route is often stronger. A General Protections claim covers dismissal for a prohibited reason, and no minimum employment period applies.

Prohibited reasons are wider than most people expect: exercising a workplace right, making a complaint or enquiry about your employment, temporary absence through illness or injury, or a protected characteristic such as race, sex, age or pregnancy. Being dismissed the week after you asked why your super had not been paid is the shape of a General Protections case rather than an unfair dismissal one. Discrimination law adds a parallel route with no service requirement either.

## How hard is the 21 day deadline?

Hard. An application must reach the Fair Work Commission within 21 calendar days of the dismissal taking effect, and extensions are granted only in genuinely exceptional circumstances. Not knowing about the deadline is not exceptional.

Dismissal often happens in the final weeks of a stay, with the flight already booked. The claim can be pursued from overseas once lodged, so the priority is getting the application in before departure rather than resolving anything first. General Protections claims involving dismissal run to the same 21 day limit.

## What can you actually get?

Compensation, in most cases, capped at 26 weeks of pay and at half the high income threshold. Reinstatement is the primary remedy in the legislation, but it is rarely what a working holiday maker wants and rarely practical near the end of a visa.

Most matters settle at conciliation rather than at a hearing, a telephone conference run by the Commission early in the process. That changes what preparation is useful: a clear account of what happened, dates, and any documents are more valuable than legal argument.

## What are you owed regardless of the claim?

Everything that had accrued by the date you finished, separate from whether the dismissal was fair. It is the part most often left behind.

- All wages for hours worked up to the final day
- Accrued annual leave, for permanent employees
- Payment in lieu of notice, where notice was required and not given
- Any [unpaid super](/blog/super-employer-not-paying-what-to-do), which is pursued through the ATO rather than Fair Work

These are recoverable whether or not you have a dismissal claim and whether or not you are still in the country. Our guide on [an employer not paying correctly](/blog/employer-not-paying-correctly) covers how the wage side is pursued.

Any pay you recover, and any final pay or leave paid out, belongs on the [working holiday tax return](/tax-return) for the year it is paid.
`,
 }, {
 slug: "bullying-harassment-workplace-working-holiday",
 title: "Workplace Bullying: Options Beyond Quitting",
 description:
   "The Fair Work Commission can order bullying to stop while you keep working. What counts, evidence that helps, and the free complaint paths available.",
 category: "Work Rights",
 date: "25 January 2026",
 readTime: 5,
 body: `
Workplace bullying, discrimination and sexual harassment are unlawful in Australia, and a working holiday maker has the same protections as an Australian worker. Visa status, length of service and industry make no difference. What changes your options is which of the three you are dealing with.

## What actually counts as bullying?

Repeated unreasonable behaviour towards a worker that creates a risk to health and safety. All three parts have to be present under the Fair Work Act. A single incident, however bad, is not bullying under this definition, though it may be harassment, assault or discrimination instead.

Unreasonable means behaviour a reasonable person would see as victimising, humiliating, threatening or intimidating: shouting and verbal abuse, humiliation in front of colleagues, deliberate isolation, unjustified criticism, impossible workloads set up to fail, and rumours spread about you. It does not cover reasonable management action carried out reasonably, so performance feedback, changes to your duties and lawful directions are not bullying even when unwelcome. That distinction decides most complaints.

## How is sexual harassment treated differently?

It does not need to be repeated. Sexual harassment is any unwelcome conduct of a sexual nature that a reasonable person would anticipate might make you feel offended, humiliated or intimidated, and one incident is enough to found a complaint.

There is also no minimum service period, which matters for a workforce that changes jobs every few months. Someone harassed in their second week has the same standing as someone in their second year. The conduct covered is broad: unwelcome touching, sexual comments and jokes, images sent or shown, repeated requests for dates, remarks about your body, and following or stalking. Where it involves assault or stalking it is also a criminal matter, and reporting to police runs alongside the workplace complaint rather than instead of it.

## What can actually be done about it?

Four routes, leading to different outcomes. Which is right depends on whether the behaviour is ongoing, whether you have been dismissed, and how long you have left in the country.

- **An anti-bullying order** from the Fair Work Commission, designed to stop behaviour that is still happening rather than compensate for past conduct. It requires you to still be employed there.
- **A General Protections claim**, if you were dismissed or treated badly for raising a complaint. No minimum service period applies.
- **A discrimination complaint** under federal or state anti-discrimination law, which can produce compensation and orders for change.
- **A sexual harassment claim** under the Sex Discrimination Act, again with no minimum service period.

The branch point is time. Anti-bullying orders only help while you are still there, so leaving the job closes that door and opens the others. If you are close to the end of your visa, resolve the timing before you fly.

## Can an employer threaten your visa?

No, and this threat keeps working holiday makers silent more than any other. An employer has no power over your visa: the Department of Home Affairs decides visa matters, a workplace complaint triggers no visa review, and making one is protected conduct under the Fair Work Act.

Retaliation for raising a complaint is a separate breach with its own remedies, so an employer who threatens you has usually strengthened your position. Keep the evidence. Text messages and emails are the most useful because they are dated and unambiguous.

## What should you write down, and when?

Everything, at the time, in whatever form is easiest to keep. Dates, times, what was said or done, where it happened and who else was there. A note made the same evening carries far more weight than a reconstruction three months later.

Keep the record somewhere that is not the employer's system, because access to a work email or roster app disappears the moment you leave. Be careful with recordings: the law on recording a conversation without consent differs between states, so a recording lawful in Queensland may not be in Victoria. Written notes carry no such risk.

## Does bad treatment usually come with other breaches?

Frequently. A workplace prepared to break one set of rules is often breaking others, and the ones that cost you money are quieter than the ones that make you miserable.

Check whether you have been paid the award rate for the hours worked, whether 12% [super](/superannuation) has reached your fund for each pay period, and whether payslips have been issued at all. Those are separate claims with separate processes, and they survive your leaving the job. Our guides on [an employer not paying correctly](/blog/employer-not-paying-correctly) and [unpaid super](/blog/super-employer-not-paying-what-to-do) cover how each is pursued.

If the job ended early, the income you did earn still goes on your [working holiday tax return](/tax-return).
`,
 }, {
 slug: "unpaid-trial-shifts-australia-legal",
 title: "Are Unpaid Trial Shifts Legal in Australia?",
 description:
   "A short skills demonstration can be unpaid; a working shift cannot. Where the line sits, industry norms, and how to recover pay for an unpaid trial.",
 category: "Work Rights",
 date: "26 January 2026",
 readTime: 4,
 body: `
Mostly no. Under the Fair Work Act, anyone doing productive work that benefits a business must be paid at least the award or minimum rate, whatever the shift is called. A genuine unpaid trial is a short supervised demonstration of a skill. A shift where you served customers is work, and it is owed wages.

## What separates a lawful trial from an unpaid shift?

Four things, and they have to hold together. A lawful trial is short, usually under an hour. It is directly supervised. It exists to assess a skill that cannot be assessed at interview. And it does not produce output the business sells.

Thirty minutes demonstrating knife work under a chef's eye, or a short typing test for an office role: those can be lawful. A full day picking on a farm, or an evening behind a bar serving real customers: those are work, and the length alone usually settles it.

The phrase employers use is not the test. "Come in Saturday and we will see how you go" describes an unpaid shift whatever it is called.

## Why are working holiday makers the usual target?

Because the arrangement relies on the worker not knowing the rule and not being around long enough to pursue it. Hospitality and retail are where it concentrates, presented as an industry norm to someone who has been in the country a few weeks and wants the job.

The Fair Work Ombudsman has published clear guidance that unpaid trials beyond a brief skills demonstration are unlawful, and has taken action against employers in hospitality, retail and farm work for exactly this. Penalties for the employer include back payment of everything owed plus separate penalties per breach.

## How much is an unpaid trial actually worth?

More than people assume, because a trial shift is usually rostered on a busy day and busy days carry penalties. The calculation starts from the award rate for the classification, not the national minimum, then applies the 25% casual loading and any weekend, evening or public holiday penalty. In hospitality awards the casual weekend rates already include the loading, so the two are not added together.

A full Saturday in a hospitality venue comes to a meaningful sum, before any public holiday multiplier. Our guide to [penalty rates in Australia](/blog/penalty-rates-australia) sets out how the loadings combine. As a reference point for the base, the national minimum from 1 July 2026 is $26.44 an hour, or $33.05 casual, and most awards sit above it.

## Does it matter whether you got the job?

No. The obligation attaches to the work performed, not to the outcome of the recruitment. Someone who did a full trial shift and was never called back is owed exactly what someone who was hired would have been owed.

The Fair Work Ombudsman has recovered wages for workers in that position. Not being hired is often what makes people decide the claim is not worth making.

## What do you need to have kept?

Evidence that you were there and how long, because the legal position is rarely the argument. A message arranging the trial plus a message afterwards is usually enough to establish both.

Text messages, rosters, the job advertisement, the name of the person who supervised you, and the dates and hours. Put the request in writing to the employer with the hours and the amount before escalating: many are resolved at that step, and the written request becomes evidence if they are not.

## What happens to the tax side if you are paid out later?

A back payment is income in the year it is received, not the year the shift was worked, and it should be reported to the ATO through payroll with tax withheld like any other wage. Super should also be paid on it, since it is ordinary time earnings.

A payment that arrives without a Tax File Number Declaration in place can be withheld at 45% rather than 15%. Our guide to the [Tax File Number Declaration form](/blog/tax-file-number-declaration-form) covers the window that governs that.

## How long did your trial run?

The rule is not ambiguous. What varies is how much you are owed and how straightforward recovery is.

- How long the trial ran, since duration is the clearest line between assessment and work.
- Whether you produced anything the business sold, which is what makes it productive work.
- Which award covers the venue and which classification you would have sat at, since that sets the rate.
- Which day and time the shift fell on, because weekend and public holiday rates can add 50% or more to the figure.
- Whether you have written evidence of the arrangement, which is what usually decides a disputed claim.
- Whether other workers were put through the same thing, since a pattern strengthens a Fair Work complaint considerably.

Any wages eventually recovered are taxable income in the year you receive them and go on that year's [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know what was actually paid.
 `,
 }, {
 slug: "uniform-laundry-deductions-illegal-australia",
 title: "Can your boss deduct uniform costs from your pay? Usually no",
 description:
   "Usually not. A wage deduction needs your written consent and must mainly benefit you, so uniform and laundry charges generally fail. Getting it back.",
 category: "Work Rights",
 date: "29 January 2026",
 readTime: 4,
 body: `
An employer can only deduct from your wages where you authorised it in writing and the deduction is principally for your benefit, or where the law requires it. Uniform charges, laundry fees, breakages, till shortages and training bonds fail that test. A contract clause authorising them does not make them lawful.

## Which deductions are actually legal?

The lawful categories are short and closed. Anything outside them, taken without your specific written authorisation, is unlawful whatever you signed when you started.

- PAYG tax, which the law requires
- Salary sacrifice into [superannuation](/superannuation), where you specifically arranged it
- Court orders such as child support or a garnishee
- Union dues, where you joined
- Payments you asked the employer to make on your behalf, in writing

That is the list, and it is short deliberately: wages are protected differently from other money in Australian law.

## What is the test that decides it?

Two conditions have to be met together, and the second defeats almost every deduction a backpacker meets. The deduction must be authorised in writing by you, specifying the amount and the purpose, and it must be principally for your benefit.

A laundry charge benefits the employer, who gets clean uniforms in a controlled state. A till shortage deduction transfers a business risk onto staff. Neither passes the benefit test, so written authorisation does not save them. The ones that do pass are a salary sacrifice or a gym membership you chose.

## Which charges are the common unlawful ones?

The pattern is consistent across hospitality, retail and farm work, aimed at people assumed not to complain. Recognising the list is most of the protection.

- Charging you for a uniform the job requires
- A weekly or per shift laundry charge
- Breakages, for glasses, plates or equipment
- Till shortages, often deducted across a whole shift's staff
- Customer walk outs
- Training fees or a bond for time spent learning the job
- Equipment loaned to you
- Withholding final wages because you did not give notice

Unpaid wages are not a penalty an employer gets to impose for short notice, and it is the version most often used against departing backpackers.

## What about a refundable uniform deposit?

A deposit is still a deduction from wages and has to clear both tests. Calling it refundable does not change what it is, and most uniform bond schemes fail the benefit test even where documented.

Where the arrangement is otherwise lawful, the bond must be returned in full when the uniform is returned. The returns are where these schemes fall apart, because the money is claimed against wear, cleaning or a missing item and the worker has already left the state.

## How do you get the money back?

The recovery process is free and does not need a lawyer. It begins with arithmetic rather than argument: total the deductions across every pay period, so the request is for a specific amount rather than a grievance.

1. Calculate the total deducted across all pay periods
2. Request repayment in writing, with the breakdown attached
3. Lodge a complaint with the Fair Work Ombudsman if the employer refuses
4. Provide payslips and bank records as evidence

The Fair Work Ombudsman can recover the wages directly and pursue penalties against the employer, and your visa status is irrelevant. Doing it while you are still in the country is easier than doing it from home.

## Why does this reach your tax return?

Because an unlawful deduction usually distorts more than the pay packet. Where the deduction is taken before the wage is reported, the gross figure sent to the ATO is understated, the 12% super is calculated on that understated figure, and the DASP you eventually claim is smaller.

That compounding is why a $15 weekly laundry charge is worth more attention than it looks. Where we prepare a [tax return](/tax-return) we compare what was reported to the ATO against the payslips, which is where a consistent pattern of under-reporting becomes visible.

## What if the employer never called it a deduction?

Some arrangements avoid the word and produce the same result. Being told to buy the uniform yourself from a nominated supplier, or to pay a third party for laundering, moves the cost off the payslip without changing who bears it.

Those are harder to challenge because nothing was deducted from wages, and they are where a tax deduction may become available instead. A compulsory uniform with a logo or distinctive design that you paid for yourself is deductible, along with the cost of laundering it, a smaller recovery than the wage claim but a real one.

## What decides whether you can recover it?

Three facts. Whether you have payslips or bank records covering the period, because an undocumented deduction is much harder to prove than one printed on a slip. Whether the deduction came out of gross or net pay, which changes whether super and tax were affected. And whether the employer is still trading, which decides how straightforward recovery is.

Our part is the tax and super side; wage recovery runs through Fair Work. The two are worth doing together, because correcting the wage without the super leaves the larger loss in place. [Get in touch](/contact) if your payslips show deductions you did not agree to.
`,
 },

// ─── MEDICARE & OTHER ─────────────────────────────────────────────────────
 {
 slug: "uk-medicare-reciprocal-agreement-australia",
 title: "Medicare for UK citizens in Australia: what is covered",
 description:
   "The UK agreement gives limited Medicare: public hospital care and subsidised medicine when treatment cannot wait. What is not covered, and the levy.",
 category: "Medicare & Other",
 date: "3 February 2026",
 readTime: 6,
 body: `
The Reciprocal Health Care Agreement between the UK and Australia is narrower than most British travellers assume. It is not the NHS transplanted and it is not health cover. It buys public hospital treatment and subsidised medicine when something cannot wait until you are home, and it is relevant to the 2% Medicare levy for the year, whether or not you ever see a doctor. In short, a British working holiday maker who is a foreign resident for tax purposes does not pay the levy at all, and one who is a resident and entitled to Medicare generally cannot claim the exemption.

## What does the agreement actually cover?

Treatment that is medically necessary, meaning care a doctor considers cannot reasonably wait until you return to the UK. That is a narrower standard than NHS cover, and the point British travellers most often misread.

- Emergency hospital treatment as a public patient
- GP visits at the Medicare rebate, which is free at a bulk billing clinic and leaves a gap at others
- Subsidised medicines under the Pharmaceutical Benefits Scheme
- Out-patient hospital treatment
- Maternity care where the pregnancy was not known before arrival

The rebate is not the fee. Many Australian GPs do not bulk bill, so the visit costs you the difference between the doctor's fee and the Medicare rebate.

## What is not covered?

The exclusions are substantial and cover most of what a backpacker actually needs. Ambulance is the expensive one: not funded by Medicare for anyone in most states, and a single callout runs into several hundred dollars.

- Ambulance in most states
- Dental treatment, beyond limited public dental in some circumstances
- Optical treatment, glasses and contact lenses
- Physiotherapy and allied health outside hospital admission
- Elective treatment, or anything booked before you travelled
- Private hospital treatment, or private patient status in a public hospital
- Treatment outside Australia, including a side trip to Bali or New Zealand
- Repatriation to the UK

## How does this change your Medicare levy position?

This is where tax comes in, and where the intuition can run backwards. The 2% Medicare levy applies to Australian residents for tax purposes, and a resident who is not entitled to Medicare can claim an exemption. The agreement is relevant to that entitlement, but whether the levy or the exemption applies to you depends on your individual circumstances, and the ATO makes the final decision.

What counts is entitlement, not whether you ever enrolled, saw a doctor or used the card. Our guide to [the Medicare levy for working holiday makers](/blog/medicare-levy-working-holiday-makers) sets out how the exemption works in general terms, and our team reviews your position as part of preparing the return.

## How do you enrol?

Enrolment is handled by Services Australia and needs your UK passport, your visa grant notice and your UK and Australian addresses. It is free, and the card is posted to the Australian address within a few weeks.

Do it in the first weeks rather than after something goes wrong. Until the card arrives the enrolment record works at hospitals and bulk billing practices; an unenrolled patient is billed and left to reclaim afterwards.

## Do you still need insurance on top?

Yes, because of the gaps. Ambulance, dental, optical, physiotherapy and repatriation are all outside the agreement, and repatriation for a serious injury is the one that reaches five figures.

State ambulance cover deals with the most likely large bill for a few tens of dollars a year. Our guide to [travel insurance versus OVHC](/blog/travel-insurance-vs-health-insurance-working-holiday) covers which product fills which gap; the two are not interchangeable.

## What does a GP visit actually cost you?

Nothing at a bulk billing practice, because the doctor accepts the Medicare rebate as full payment. At a practice that does not bulk bill, you pay the fee and Medicare refunds the rebate, leaving a gap of a few tens of dollars.

Bulk billing is far less universal in Australia than British visitors expect, and scarcer in city centres and some regional towns than in outer suburbs. Asking when booking is normal. Prescriptions are charged at Pharmaceutical Benefits Scheme prices, the same as an Australian resident pays.

## Where does the agreement leave you at a hospital?

In a public hospital emergency department you are treated as a public patient, which is what the agreement is designed to produce. Admission as a public patient carries no charge, and treatment decisions are clinical rather than financial.

What it does not give you is a choice. You cannot elect to be a private patient, cannot choose your surgeon, and are not covered in a private hospital at all. Anything elective generally waits until you are home, which is what medically necessary means in this context.

## What decides your position in a given year?

Three facts. Whether your country has a reciprocal agreement at all, which for the UK it does. Whether you are therefore entitled to Medicare, which follows from the agreement rather than from enrolment. And whether anything changed part way through the year, because a part year of entitlement produces a partial levy position and the dates have to be right.

Part year cases are the ones worth flagging. Someone who arrived in March is entitled from arrival and not before, and someone who left in November is entitled only for that portion of the year. Getting those dates right on a [tax return](/tax-return) matters, and a return prepared in a hurry is where they tend to go wrong. The wider tax picture for British travellers, including the Addy question, is in our guide to [Australian tax for UK passport holders](/uk-working-holiday-tax).
`,
 }, {
 slug: "german-european-health-insurance-australia-working-holiday",
 title: "German backpackers and Medicare: no reciprocal agreement",
 description:
   "No. Germany has no reciprocal health agreement with Australia, so German backpackers pay privately. Insurance options, typical costs and the levy.",
 seoTitle: "Does Germany have a Medicare agreement with Australia? No",
 category: "Medicare & Other",
 date: "6 February 2026",
 readTime: 5,
 body: `
No. Germany has no Reciprocal Health Care Agreement with Australia, so German working holiday makers are generally not entitled to [Medicare](/medicare) and pay for treatment privately. That is relevant to whether the 2% Medicare levy exemption can be claimed at tax time, which depends on individual circumstances.

## Which countries have an agreement, and which do not?

Australia has Reciprocal Health Care Agreements with eleven countries. There is no partial cover, no EU wide arrangement and no reciprocity through a third country.

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

Germany is not on it, and neither are France, Spain, Austria, Switzerland, the United States, Canada or Japan. What that means for a German tax return is set out on our [page for German working holiday makers](/german-working-holiday-tax). Our guide to [countries with a Medicare agreement](/blog/countries-with-medicare-agreement-australia) sets out what each agreement covers, because they are not identical.

## What does that mean at a doctor's surgery?

You are a private patient paying the full fee, with no Medicare rebate and no PBS subsidy on prescriptions. In genuine emergencies treatment is provided regardless of ability to pay, and the bill follows afterwards.

The statutory system at home gives no preparation for paying at the counter. Ambulance is the sharpest version: it is not covered by Medicare for anyone in most states, so a single callout is a direct cost.

## Does German statutory cover follow you?

No. Cover under the gesetzliche Krankenversicherung does not extend to Australia. The statutory system reaches EU countries and a small number of treaty countries, and Australia is not among them.

Some private German policies include international travel cover, but typically cap at around six weeks per trip, short of a working holiday visa. The usual approach is Anwartschaftsversicherung or another way of managing the German cover while away, plus separate cover for Australia. That is a personal financial question rather than a tax one, and easier to settle before leaving Germany.

## What cover does the visa require?

Where condition 8501 appears on your visa grant, you must hold adequate health cover for the whole stay, without a specified product, and Home Affairs recommends cover even where it does not. It must be valid for the full visa period, cover medical treatment in Australia, and cover repatriation.

Most meet it with comprehensive travel insurance, Australian Overseas Visitors Health Cover from a private health fund, or both. Travel insurance covers wider risks including cancellation and repatriation but usually caps at twelve months. OVHC is built for medical cover in Australia, renews indefinitely while you are here, and does not cover non medical travel risks. Our guide to [travel insurance versus OVHC](/blog/travel-insurance-vs-health-insurance-working-holiday) sets out which fills which gap.

## How does this change your tax position?

The 2% Medicare levy applies to Australian residents for tax purposes, and foreign residents do not pay it. For a resident, the lack of a reciprocal agreement with Germany is relevant to whether an exemption can be claimed, but the outcome depends on your individual circumstances and the ATO makes the final decision.

An exemption is not automatic. It is claimed on the return and involves a Medicare Entitlement Statement from Services Australia, one for each financial year claimed. Services Australia commonly takes weeks to issue one, which is why many people never get it. Our guide to [the Medicare levy](/blog/medicare-levy-working-holiday-makers) covers the background.

Nationality alone does not settle the levy position, and our team reviews it as part of preparing the return.

## What is the real financial exposure without cover?

The exposure is not the GP visit, it is the admission. Surgery and a hospital stay are the scenario the visa condition exists for, with air evacuation from a remote area or a medical repatriation flight to Germany at the top end.

That matters more on a working holiday than on a two week trip. Farm work, construction and station work carry real physical risk and take people hundreds of kilometres from a major hospital. Our guide to [emergency care without Medicare](/blog/emergency-medical-care-working-holiday-no-medicare) covers what an uninsured presentation costs.

## When does the Medicare Entitlement Statement matter?

Early. The statement is issued per financial year and commonly takes weeks rather than days, so it is worth raising long before the return.

Leaving it until the return is due can mean lodging without the exemption being applied, or waiting. We handle the statement as part of preparing the return, and the sooner it is started the less likely the timing is to cause a problem.

## What decides your position?

Three facts. Your individual circumstances, which bear on the entitlement question and therefore the levy. Whether you obtained the Medicare Entitlement Statement, which decides whether the exemption is claimed rather than merely available. And whether your cover matches the work you do, since a policy written for sightseeing is not one that pays out after a fall on a construction site.

Our guide to [amending a return](/blog/amending-tax-return-australia) covers the alternative of lodging without it and amending afterwards, which works but is slower. When we prepare a [tax return](/tax-return) the Medicare position is reviewed before anything is lodged, because it is one of the items on a working holiday return that can make a real difference.
`,
 }, {
 slug: "private-health-insurance-working-holiday-australia",
 title: "Health Insurance on a WHV: Who Needs It",
 description:
   "RHCA-country backpackers get Medicare basics; everyone else risks five-figure hospital bills. What OVHC covers, typical prices, and visa considerations.",
 category: "Medicare & Other",
 date: "15 February 2026",
 readTime: 4,
 body: `
Whether you need private health cover on a working holiday visa is decided by two things: the conditions on your visa grant and your passport. Some visa grants, on either subclass, carry condition 8501, which requires adequate health insurance for the whole stay. A passport outside Australia's reciprocal health agreements leaves insurance as your only cover.

## Is health insurance a condition of your visa?

Condition 8501 requires you to maintain adequate arrangements for health insurance during your stay. It can be imposed on either the subclass 417 or the subclass 462, and it is applied case by case, so the only reliable answer is whether condition 8501 appears on your own visa grant letter. If it does, it is binding; if it does not, Home Affairs still recommends cover. Check your grant notice or VEVO rather than relying on the subclass alone.

Nobody checks it at the airport, which is why the requirement is widely assumed not to exist. It can still come up where it matters, such as a further visa application, and a hospital will ask who is paying.

## Does your passport change what you need?

More than the visa does. Australia has a Reciprocal Health Care Agreement with eleven countries, and a national of one can enrol in [Medicare](/medicare) and use the public system for medically necessary treatment while here.

The eleven are the United Kingdom, Ireland, New Zealand, Italy, Malta, the Netherlands, Belgium, Finland, Norway, Sweden and Slovenia. If you hold one of those passports, private cover tops up a public system you already have access to. If you hold a German, Japanese, French, Spanish, American or Canadian passport, there is no public system underneath you and private cover is the whole of your protection, which changes how much cover you need and how carefully you read the exclusions.

- RHCA passport: Medicare enrolment available, private cover fills the gaps
- Non-RHCA passport: private cover is the only cover, and it needs to be comprehensive
- Either way, no Australian arrangement pays to fly you home

## What is the difference between travel insurance and OVHC?

They are built for different risks, and many people buy one believing it does the job of both. Travel insurance is a trip product: emergency treatment, ambulance, repatriation home, cancellation, theft and baggage, usually sold for a fixed twelve to eighteen months with the option to extend.

Overseas Visitors Health Cover is Australian private health insurance sold to visitors, and behaves like a domestic health policy: hospital treatment public and private, GP and specialist consultations, pharmaceuticals, and optional extras such as dental, optical and physiotherapy. It renews indefinitely while you are in the country, which suits anyone going for a second year, and does not usually cover trip risks or the flight home.

- Travel insurance: broad, time limited, strong on repatriation, capped on medical
- OVHC: medical only, renewable, closer to a substitute for Medicare
- Many working holiday makers end up holding both, deliberately

## What in the fine print actually catches people out?

Work exclusions, more than anything else. Many travel policies exclude or limit manual labour, with farm work, construction and anything involving machinery the usual named categories, so a policy that felt adequate in London does nothing on a harvest job in Mildura. Read that clause before the first farm shift.

The other four to check: the excess you pay before cover starts, waiting periods, since pre existing conditions are commonly excluded for twelve months, mental health, where cover varies and waiting periods are long, and adventure activities, because diving, skydiving and bungee jumping are frequently sold as add ons.

- Manual and agricultural work exclusions
- Excess payable per claim
- Twelve month waiting periods on pre existing conditions
- Mental health limits, which are often the strictest part of a policy
- Pregnancy and maternity, usually excluded outright

## Is ambulance included?

Not automatically, and it is the single most common gap. Medicare does not cover ambulance transport in most of Australia, so it is charged separately regardless of your nationality or Medicare enrolment.

Where you are when it happens changes the answer. Queensland and Tasmania run state schemes providing ambulance free or at low cost to residents, while other states treat it as a private cost. Most OVHC and travel policies include some ambulance cover, but the level differs enough to be worth confirming.

## Does any of this change your tax?

Only in one direction, and it is the opposite of what people expect. Private cover does not reduce your Australian tax: whether any private health insurance rebate applies depends on your individual circumstances, and it should not be assumed for overseas visitor cover.

What does affect your [tax return](/tax-return) is Medicare entitlement. The 2% levy applies to Australian residents for tax purposes, and whether the [Medicare levy exemption](/blog/medicare-levy-working-holiday-makers) applies depends on your individual circumstances, assessed case by case. The exemption is not automatic and involves a Medicare Entitlement Statement from Services Australia, which takes weeks to obtain, so it is worth raising early with us.
`,
 }, {
 slug: "emergency-medical-care-working-holiday-no-medicare",
 title: "Emergency Care Without Medicare: The Cost",
 description:
   "An uninsured emergency department visit commonly costs hundreds to thousands of dollars. What hospitals charge, payment plans, and reducing the risk.",
 category: "Medicare & Other",
 date: "16 February 2026",
 readTime: 5,
 body: `
An Australian public hospital will treat you in an emergency whether or not you have [Medicare](/medicare), insurance or money. It will then bill you as a private patient. Whether that bill is survivable comes down to your passport and your insurance, both settled long before the ambulance is called.

## What number do you call in an emergency?

Triple zero, dialled as 000, for anything genuinely urgent. It is the Australian equivalent of 999 in the United Kingdom and 112 in Germany, works from any mobile with or without credit, and the operator asks which of police, fire or ambulance you need.

For situations that are worrying but not life threatening, healthdirect on 1800 022 222 gives free advice from registered nurses around the clock. For a doctor out of hours in most metropolitan areas, the National Home Doctor Service on 13 SICK, dialled as 137 425, visits your accommodation. Both are worth having in a phone before they are needed.

## Does your passport change what emergency care costs?

Substantially. Australia has a Reciprocal Health Care Agreement with eleven countries, and a national of one of them is generally entitled to Medicare for medically necessary treatment while in Australia, which covers public hospital emergency care and subsidised medicines.

The list is the United Kingdom, Ireland, New Zealand, Italy, Malta, the Netherlands, Belgium, Finland, Norway, Sweden and Slovenia. A British backpacker arrives with a route into the public system that a German, Japanese, French or Canadian backpacker does not have. Medicare entitlement is also relevant to the [Medicare levy](/blog/medicare-levy-working-holiday-makers) on your [tax return](/tax-return), which is assessed on your individual circumstances.

- RHCA passport: public hospital emergency treatment and subsidised medicines
- Non-RHCA passport: billed as a private patient
- Neither route covers repatriation home, which is insurance territory only

## What does insurance actually cover?

It depends which of the two products you bought, and they are not interchangeable. Overseas Visitors Health Cover is Australian private health insurance sold for visitors, built around hospital treatment: emergency department attendance, admission as a private patient, surgery, inpatient medicines, and most imaging and pathology.

Travel insurance is built around the trip. It typically covers emergency treatment, ambulance and repatriation, plus cancellation and lost baggage, but the medical cover is often capped and frequently excludes anything connected to a pre-existing condition or to alcohol. The two gaps that catch working holiday makers are ambulance cover, which varies by state and by policy, and mental health, which is limited or excluded on a great many policies.

- Ambulance: charged separately in most states and not always included
- Repatriation: travel insurance usually, Medicare and RHCA never
- Dental: limited under almost everything
- Working while insured: some travel policies exclude manual work entirely, which is worth reading before a farm job

## What happens if you cannot pay the bill?

The treatment still happens, because Australian hospitals do not condition emergency care on payment. Billing is dealt with afterwards, and a public hospital will generally negotiate a payment plan, sometimes over a long period, rather than pursue an immediate lump sum.

It does not forget. Hospitals pursue unpaid accounts, including through international debt collection after you have gone home, so leaving the country is not a resolution. The costs that turn a bad week into a life altering one are air retrieval from a remote area and a medically escorted flight home. That is why insurance for a non-RHCA passport holder is closer to essential than to optional.

## Should you go to a public or a private hospital?

For a serious emergency, the public hospital, and for most working holiday makers the ambulance decides. Public emergency departments are free for Medicare eligible patients, which includes RHCA nationals, and where you are billed as a private patient the rates are still lower than the private equivalent.

Private emergency departments charge from the first minute regardless of who you are. The trade is waiting time for cost, which is reasonable for a broken finger and poor for anything that needs a large hospital behind it.

## What should you keep afterwards?

Everything on paper. The discharge summary, the medication list, the imaging results and every bill are what an insurer needs to assess a claim, and reconstructing them months later from a hospital you have already left is difficult.

The consequences also run past the medical file. An extended period unable to work changes your income for the year, which can change your refund, and it can change your [super](/superannuation) position and your DASP timing if you end up leaving Australia earlier than planned. If the recovery pushes past the visa expiry, raise that with Home Affairs early rather than late.
`,
 }, {
 slug: "travel-insurance-vs-health-insurance-working-holiday",
 title: "Travel Insurance vs OVHC: Which Covers You",
 description:
   "Travel policies often exclude injuries at work - the reason many backpackers need OVHC instead. The differences, gaps, and how to combine them properly.",
 category: "Medicare & Other",
 date: "21 February 2026",
 readTime: 5,
 body: `
They cover different things, and most working holiday makers want both. Travel insurance covers emergencies, repatriation, cancellation and theft. Overseas Visitors Health Cover is an Australian health product covering treatment inside Australia. The gap that matters most sits between them, and it is work.

## What does travel insurance actually cover?

The risks of travelling, with medical emergency treatment attached. A comprehensive policy covers emergency hospital and doctor treatment in Australia, repatriation home if you are seriously ill or injured, trip cancellation and interruption, lost or stolen baggage, personal liability, and emergency evacuation from remote areas.

Cover periods are usually capped at twelve to eighteen months with renewal options. The exclusions are where the detail sits: pre existing conditions commonly, high risk activities frequently, and work related injury very often.

## What does OVHC cover?

Treatment in Australia, structured like Medicare cover but bought from a private fund. A typical policy covers public and private hospital admission, emergency department visits, GP consultations usually with a gap, specialist consultations, subsidised pharmaceuticals, imaging and pathology, with optional extras for dental, optical and physiotherapy.

It is renewable indefinitely while you are in Australia. What it does not do is anything outside Australian treatment: no repatriation, cancellation or baggage, and nothing on a side trip to New Zealand or Bali.

## Why do both usually make sense?

Because each is the wrong product for what the other handles, and a twelve month working holiday reliably produces both kinds of event.

- An emergency in Sydney: both respond, and OVHC usually claims faster with lower gaps
- Repatriation to Germany after a serious injury: travel insurance only
- A stolen laptop and phone in a hostel: travel insurance only
- A routine GP visit for a chest infection: OVHC, or travel insurance with a high excess that often exceeds the bill
- A lost passport in Cairns: travel insurance only
- A trip to Bali partway through the year: travel insurance only

## What is the work related injury gap?

The largest and least understood problem here. Most travel insurance is written for tourists rather than for people earning wages, and many policies exclude injury sustained while working.

A fall on a farm, a burn in a kitchen or a cut on a construction site can be declined by the travel policy. Workers compensation through your employer covers it instead: compulsory in every state, and applying regardless of visa status or length of service, with OVHC picking up treatment it does not.

So the answer to whether you are covered at work is almost never the travel policy. Our guide to [workplace injury rights](/blog/workplace-injury-working-holiday-rights) sets out how the workers compensation claim actually runs.

## Where does Medicare fit?

Only for people entitled to it, and entitlement follows the passport. Nationals of the eleven Reciprocal Health Care Agreement countries, which include the United Kingdom and Ireland, are generally entitled to Medicare and can enrol.

Everyone else generally is not, and for them insurance is the entire safety net outside workers compensation. Entitlement is also relevant to the 2% Medicare levy, which is assessed on your individual circumstances. Our guide to [the Medicare levy](/blog/medicare-levy-working-holiday-makers) covers that side.

## What should you actually check in a policy?

The exclusions rather than the headline cover, because the headline cover is broadly similar across products and the exclusions are not.

- The excess, and whether it exceeds the cost of the events you are likely to have
- Waiting periods for pre existing conditions, pregnancy and mental health
- Whether work related injury is excluded, and in what terms
- Activity exclusions, particularly farm work, working with animals and adventure sports
- Geographic scope, since some policies cover Australia only
- Repatriation limits, and whether they are realistic for the distance home
- The claims process and how long payment actually takes

## Does any of it affect your tax?

Very little. Premiums are not deductible against working holiday income, and claim payouts are generally not taxable.

The Medicare levy surcharge, which pushes higher earning Australians toward private hospital cover, does not usually apply to working holiday makers, and whether any private health rebate applies depends on your individual circumstances. What affects your return is the 2% Medicare levy and whether an exemption is claimed, which turns on entitlement rather than on whether you bought insurance.

## When should you buy each one?

Travel insurance before you fly, because cancellation cover only works if it existed before the reason to cancel did. OVHC can be arranged once you have arrived and know how long you are staying, though waiting periods mean earlier is better.

The common sequence is a twelve month travel policy bought at home, then OVHC added once the stay turns into a year of working and living somewhere.

## Where are the gaps in your own cover?

The products are the same for everyone. Which gaps matter is decided by your passport and your year, and the work related exclusion is the one most people discover too late.

- Which passport you hold, since it bears on Medicare entitlement and the baseline.
- Whether you will be working, which is where the travel insurance exclusion bites.
- What kind of work, since farm and adventure activity exclusions are common.
- How long you are staying, since travel policies cap at twelve to eighteen months and OVHC does not.
- Whether you will leave Australia during the visa, which OVHC does not follow you on.
- Whether you have a pre existing condition, the exclusion most likely to matter in practice.

Your insurance status does not change the tax, but your Medicare entitlement does, and that is resolved in the [working holiday tax return](/tax-return). You can [estimate your tax refund](/calculator) to see how your year may look.
 `,
 },

// ─── NEW POSTS - BATCH 2 (10 articles) ───────────────────────────────────

// ─── WORK RIGHTS - AWARDS ────────────────────────────────────────────────
 {
 slug: "hospitality-award-working-holiday-makers",
 title: "Hospitality Award: What Cafes and Bars Pay",
 description:
   "Minimum hourly rates by level under MA000009, casual loading, weekend and public holiday penalties - and how to check your payslip against them.",
 category: "Work Rights",
 date: "24 February 2026",
 readTime: 5,
 body: `
The Hospitality Industry (General) Award, MA000009, sets minimum rates, classifications, penalties and allowances for hotels, pubs, hostels, nightclubs, function centres and the venues attached to them. It covers working holiday makers on the same terms as anyone else. Whether it covers your job depends on the venue type, not on what you do there.

## Which venues does it actually cover?

Accommodation and licensed venues, and the food service inside them. Hotels, motels, serviced apartments and resorts, caravan parks and hostels, function centres and convention facilities, nightclubs, most casinos, and labour hire companies placing workers into any of those.

A stand alone restaurant or cafe is covered by the Restaurant Industry Award instead, and a fast food outlet by the Fast Food Industry Award. A waiter in a hotel restaurant and a waiter in the restaurant next door are on different awards doing the same job, with different rates and different Sunday penalties. Our guide to [the Restaurant Industry Award](/blog/restaurant-industry-award-working-holiday) sets out the other side of that line.

## Which classification are you actually on?

One of six grades, following your duties rather than your job title. Introductory level covers the first period in the industry with no prior experience. Level 1 covers kitchen hands, room attendants, porters, glass collectors and food and beverage attendants without responsibility. Level 2 covers bar attendants holding an RSA, cook grade 1 and waiters carrying responsibility. Level 3 covers cook grade 2, head waiter for a section, and security.

Introductory level is time limited. After a defined initial period the employer must move you to Level 1 unless there is a genuine reason for continued training. Leaving a backpacker there for six months is a common quiet underpayment.

## How are the rates built up?

In layers, and the flat rate many venues offer replaces all of them with one lower number. The base is the classification rate, reviewed each 1 July in the Annual Wage Review. A casual adds the 25% loading on ordinary hours. On weekends and public holidays the award sets one casual rate that already includes the loading, then any allowance applies.

- Saturday: 150% of the base rate for casuals, casual loading included
- Sunday: 175% for casuals, casual loading included
- Public holidays: 250% for casuals, casual loading included
- Evening work from 7pm to midnight: a flat extra amount per hour, the same at every level
- Midnight to 7am: a higher flat amount per hour

Exact percentages and start times sit in the current version of the award and vary between classifications. A flat hourly rate said to cover everything is the clearest indicator the layers were not applied.

## What allowances are commonly missed?

Several, missed more often than penalty rates because nobody expects them. The award provides a meal allowance for overtime worked without a break, a split shift allowance where a shift is broken by an unpaid period, a uniform allowance where the employer requires one and does not provide it, a laundry allowance for a required uniform, a first aid allowance for the designated officer, and travel allowances in some short notice circumstances.

The split shift allowance matters most to backpackers, because split shifts are standard in hotel food service and the allowance almost never appears on the payslip.

## Why is this award breached so often?

It is among the most complex modern awards in Australia, applied to a workforce that turns over constantly. That produces genuine payroll error as well as deliberate underpayment, and from the worker's side they look identical.

The Fair Work Ombudsman has run repeated campaigns into hospitality compliance for that reason. Raising it with the employer first is worth doing, because many of these are configuration errors that get corrected once identified.

## What does underpayment do to your tax and super?

It understates both. If the wages you should have received are higher than the wages reported to the ATO, the income on your return is understated and the 12% superannuation calculated on those wages with it.

Recovering underpaid wages increases three things at once: the assessable income in the year the back payment is received, the super the employer owed, and eventually the DASP balance you claim when you leave. The wages themselves run through Fair Work, not the tax system, and our guide to [unpaid super](/blog/super-employer-not-paying-what-to-do) covers the super half.

## What decides your rate under the Hospitality Award?

The award is a public document. What it entitles you to is decided by facts about your particular job.

- Whether the venue is an accommodation or licensed venue, which decides whether this award applies at all.
- Which classification your duties correspond to, and whether you were left at introductory level too long.
- Whether you are casual, which brings the 25% loading on ordinary hours and is already built into the casual weekend and holiday rates.
- Which hours you worked, since evening, weekend and holiday penalties are separate.
- Whether an enterprise agreement applies, which is common in larger hotel groups and overrides the award.
- Whether allowances such as split shift and uniform were paid at all.
- Whether you are engaged under an ABN, in which case no award covers you.

Whatever was withheld across every venue you worked at reconciles in your [working holiday tax return](/tax-return) at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 }, {
 slug: "horticulture-award-working-holiday-makers",
 title:
 "Horticulture Award pay rates for farm work (MA000028)",
 description:
 "The Horticulture Award MA000028 sets a minimum hourly rate that applies even on piece rates, plus 25% casual loading. What to check if you are paid less.",
 category: "Work Rights",
 date: "26 February 2026",
 readTime: 5,
 body: `
Pay on an Australian farm is set by a legal instrument, not by the farm. The Horticulture Award MA000028 governs picking, packing and general work on fruit and vegetable properties, and no handshake, flat rate or per bin arrangement overrides it.

## What work does the award actually cover?

Horticulture: growing, harvesting and packing fruit, vegetables, vines, trees, mushrooms and flowers, and the general farm labour that goes with it. If your 88 days are being earned on a fruit or vegetable farm, this is almost certainly the award that governs your pay.

- Fruit and vegetable picking and harvesting
- Pruning, planting, weeding, vine and tree work
- Packing in farm based sheds
- Mushroom growing and harvesting
- Flower growing and cutting

It does not cover broadacre cropping such as wheat and barley, livestock work on cattle and sheep stations, or aquaculture. Those sit under the Pastoral Award and others, at different rates, so identifying the right award comes first.

## What is the minimum hourly rate guarantee?

However you are paid, your earnings for the time worked must come to at least the minimum hourly rate for your classification. A piece rate is a method of calculating pay, not a way around the floor beneath it.

Where a day of picking produces less than the hourly minimum for the hours worked, the employer must top up the difference. Farms that do not are the most common underpayment in Australian horticulture, and the target of repeated Fair Work Ombudsman campaigns. Our guide to [piece rates on farms](/blog/piece-rates-farm-work-working-holiday) sets out how the protection is meant to work.

## Which classification are you actually on?

Decided by the work you do, not by the level written on your payslip, and this is where a quiet underpayment usually hides. The award runs from Level 1 to Level 5, and most working holiday makers sit at Level 1 or Level 2.

- **Level 1**: new employees in the first three months with no prior farm experience
- **Level 2**: workers past three months, or with prior experience
- **Level 3**: skilled work requiring specialised knowledge
- **Level 4**: tractor operators, chemical applicators, supervisors of small teams
- **Level 5**: leading hands and skilled supervisors

Staying on Level 1 past three months when the award moves you to Level 2 is a common and recoverable underpayment that never shows up unless someone checks the start date against the rate.

## What penalty rates and loadings apply?

Narrower than hospitality, but not none, and that assumption is what makes flat rates so easy to sell. Casual loading of 25% applies on top of the base rate, and overtime, public holiday and in some classifications weekend loadings apply too.

- Casual loading of 25% on the base hourly rate
- Overtime above 38 hours a week, or 304 hours over an eight week cycle
- A higher rate on public holidays
- Weekend loading in some classifications

Allowances are routinely missing from farm payslips: travel between sites during a working day, a tool allowance where you supply your own, wet weather work and cold storage work. Each is paid on top of the base rate.

## How does award pay connect to your 88 days?

Through the same paperwork. Specified work counts toward a second year visa by the day, not the hour, and the evidence Home Affairs relies on is the record of you having been properly employed and reported.

Paid under the award and reported to the ATO through Single Touch Payroll, the visa evidence assembles itself from payslips and income statements. Cash in hand, it is much harder to establish, and the second visa application is where that becomes a real problem. That is the practical reason to refuse cash on a farm, ahead of the tax reason.

## What does underpayment cost beyond the wage?

An underpaid wage is three losses, not one. The wage itself is short, the 12% [superannuation](/superannuation) is calculated on the short figure so it is short too, and the DASP payment you eventually claim is smaller as a result.

Recovering the wage through the Fair Work Ombudsman is free and the process works, but the super and the eventual DASP only correct themselves if the underlying wage is corrected. Our guide to [unpaid super](/blog/super-employer-not-paying-what-to-do) covers the recovery side.

## What should you check in your first week on a farm?

The first week is when a problem is cheap to fix. Ask which award applies to the crop, what classification you have been placed on, whether the rate includes casual loading, and whether pay is hourly or piece rate.

Get a piece rate agreement in writing: the minimum guarantee only functions where there is a documented agreement to measure against. Tracking your own bins and hours for the first few days converts a vague sense of being short into a figure you can put to the farm.

## What decides whether your farm year was paid correctly?

Four things you can check yourself, and one you probably cannot. Whether the right award applies to the crop, whether your classification matches your actual start date and experience, whether the casual loading is in the rate, and whether the piece rate top up was ever paid on the slow days.

The harder one is reconciling what was reported to the ATO against what should have been paid: the two live in different places and neither the farm nor the labour hire agency volunteers the comparison. That reconciliation is part of preparing a farm worker's [tax return](/tax-return), and farm work is where the widest gaps show up.
`,
 }, {
 slug: "restaurant-industry-award-working-holiday",
 title: "Restaurant Award Rates by Level",
 description:
   "What restaurants must pay under MA000119 - hourly minimums, casual loading, split shifts and penalties - and what to do if your rate falls short.",
 category: "Work Rights",
 date: "27 February 2026",
 readTime: 4,
 body: `
The Restaurant Industry Award, MA000119, sets minimum rates, classifications and penalties for stand alone restaurants, cafes and similar food service venues. It is not the same instrument as the Hospitality Award, and the difference shows up most on a Sunday. Which one covers you is decided by the venue, not by the job you do in it.

## What does this award cover, and what does it not?

Food service venues that stand on their own. Stand alone restaurants not attached to a hotel, cafes, coffee shops and brunch venues, tea rooms, catering businesses, and reception and function centres not connected to accommodation. Takeaway food businesses fall inside it in some circumstances.

It does not cover restaurants inside hotels, which sit under the [Hospitality Award](/blog/hospitality-award-working-holiday-makers), fast food outlets, which have their own award, or any workplace covered by an enterprise agreement that displaces the award. Our guide to [award classifications](/blog/award-classifications-working-holiday-australia) sets out which instrument applies when it is not obvious.

## Which classification applies to you?

One of six grades, and the grade tracks duties rather than titles. Introductory covers the first period with no relevant experience. Level 1 covers setting and clearing tables and collecting glasses. Level 2 covers pouring drinks, taking orders, serving food and basic cooking. Level 3 covers supervising a small section or cook grade 1. Levels 4 to 6 run through cook grade 2, chef de partie, head chef and restaurant manager.

Most working holiday makers in front of house sit at Level 1 or Level 2, and experienced baristas at Level 2 or Level 3. Duties drift upward faster than classifications do, which is how this award is quietly underapplied: someone taking orders and pouring drinks is not a Level 1 worker whatever the roster calls them.

## How do the rates and penalties build up?

From the classification base, reviewed each 1 July. Casuals get the 25% loading on ordinary hours, but on weekends and public holidays the award sets one casual rate that already includes the loading, so the two are not added together.

- Monday to Friday from 10pm to midnight: a flat extra amount per hour
- Saturday: 150% of the base rate for casuals, casual loading included
- Sunday: 150% for casuals at Introductory to Level 2, 175% from Level 3, casual loading included
- Public holidays: 250% for casuals, casual loading included
- Monday to Friday from midnight to 6am: a higher flat amount per hour

The exact figures and cut off times sit in the current version of the award. Restaurant penalties are not identical to hotel penalties, so an employer applying the wrong award is paying the wrong Sunday rate.

## What allowances does it carry?

More than most people claim. A meal allowance where overtime is worked without a break, a uniform allowance where the employer requires a uniform and does not supply it, a laundry allowance for washing a required uniform, a first aid allowance for the designated officer, and a tools allowance where you must provide your own equipment such as knives.

The tools allowance matters in kitchens, because chefs and cooks frequently supply their own knives and are entitled to be compensated rather than only to deduct the cost at tax time.

## What happens if the wrong award has been applied?

You have been paid against the wrong rate schedule, and the shortfall accumulates every week rather than once. It is a consistent pattern of underpayment in food service, partly deliberate and partly because small venue payroll is set up once and never revisited.

Identifying the correct award is the first step, not a detail. Comparing your payslip against Hospitality Award rates when the Restaurant Award applies produces the wrong answer in both directions.

## What does it do to your tax and super?

Underpaid wages understate everything downstream. The income reported to the ATO is lower than it should have been, and the 12% superannuation calculated on it is lower with it.

Wages recovered later are assessable in the year you receive them, not the year you earned them, and super on the corrected figure is recoverable separately. Our guide to [unpaid super and what to do about it](/blog/super-employer-not-paying-what-to-do) covers that side; the wages themselves run through the Fair Work Ombudsman.

## What decides your rate under the Restaurant Award?

The award is public and the rates are published. What you were owed depends on the venue and your roster, and the first point below decides all the rest.

- Whether the venue stands alone or sits inside a hotel, which decides the award entirely.
- Which classification your actual duties correspond to, rather than the title you were given.
- Whether you were left at introductory level beyond the point it applies.
- Whether you are casual, which changes every weekend and holiday rate, since the casual rates there already include the loading.
- Which hours you worked, since Saturday, Sunday, evening and holiday penalties differ from the Hospitality Award.
- Whether allowances for uniform, laundry and your own tools were paid.
- Whether an enterprise agreement applies instead of the award.

Everything withheld across each venue reconciles in your [working holiday tax return](/tax-return) at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 }, {
 slug: "award-classifications-working-holiday-australia",
 title: "Find Your Award and Classification Level",
 description:
   "Every job maps to a modern award and classification that sets your minimum pay. How to identify yours and verify your hourly rate is legal.",
 category: "Work Rights",
 date: "1 March 2026",
 readTime: 5,
 body: `
Your award is decided by the industry your employer operates in, and your classification by the duties you actually perform. Job titles decide nothing. There are over 120 modern awards, and almost every working holiday maker job is covered by one, which sets the minimum whatever the contract says.

## How is an award identified?

By its coverage clause, which defines the businesses it applies to. Each award has a name, a reference code such as MA000009 for Hospitality or MA000028 for Horticulture, a coverage clause, and a classification structure.

The Fair Work Ombudsman maintains the public list and the current rates, free. Almost every pay dispute in this audience is really a dispute about which document applies.

## What is the three step test?

Industry, then role, then level. Skipping straight to the level produces confident wrong answers, because the same level on two different awards is entirely different money.

First, the industry the employer operates in. A hotel is accommodation and hospitality. A stand alone cafe is the restaurant industry. A fruit farm is horticulture. Second, the principal purpose of your work: a hotel receptionist and a head office administrator at the same company are on different awards. Third, the classification matching the duties you actually perform.

A working holiday maker doing three jobs in a year is often covered by three different awards, each with its own rates and penalties.

## Which awards cover most working holiday work?

A short list covers the overwhelming majority of 417 and 462 employment. Search the code beside each one for the current rates.

- [Hospitality Industry (General) Award, MA000009](/blog/hospitality-award-working-holiday-makers): hotels, motels, hostels, hotel bars, function centres, caravan parks
- [Restaurant Industry Award, MA000119](/blog/restaurant-industry-award-working-holiday): stand alone restaurants, cafes, brunch venues
- Fast Food Industry Award, MA000003: fast food chains, takeaway outlets, food courts
- [Horticulture Award, MA000028](/blog/horticulture-award-working-holiday-makers): fruit picking, vegetable harvesting, packing, vine and tree work
- General Retail Industry Award, MA000004: shops, supermarkets, department stores
- Pastoral Award, MA000035: livestock work, broadacre cropping, shearing
- Cleaning Services Award, MA000022: contract cleaning and hotel cleaning through labour hire
- Building and Construction General On-site Award, MA000020: construction labouring and trades assistant work

## What if your employer says no award applies?

It is almost always wrong. An award applies by default. There are three genuine exceptions: an enterprise agreement approved by the Fair Work Commission, a senior management role above the award's highest classification, or a genuine independent contracting arrangement under an ABN.

The third is where most real disputes sit. Our guide to [the employee versus contractor test](/blog/employee-vs-contractor-australia) sets out how the line is drawn. Being handed an ABN does not by itself put you outside the award.

## How is your classification decided?

By skill level, responsibility, whether you supervise anyone, and in some awards by industry experience. Classification follows duties, not titles.

A supervisor doing the same tasks as a Level 2 employee is a Level 2 employee. The reverse is more common: someone regularly running a section, prepping food or training new starters has outgrown the entry classification and must be paid the level the work corresponds to.

Most awards carry an introductory level for the first period in the industry, after which you must be moved up unless there is a genuine reason for further training. Keeping a backpacker at introductory rates for a whole visa is a breach in most cases, and it is widespread.

## What does an enterprise agreement change?

It replaces the award for that workplace and must leave every employee better off overall. The Fair Work Commission applies that test on approval, and an agreement leaving workers worse off is not enforceable.

Agreements usually adopt the award structure and add higher base pay, extra leave or better penalties. They are common in large supermarket and hotel groups, so comparing a Coles or Woolworths payslip against the retail award rates can mislead in either direction.

## What does the classification do to your tax and super?

It sets the wages you should have received, and everything else follows from that figure. Underclassification understates the income reported to the ATO and the 12% superannuation calculated on it.

Recovering the difference recovers both amounts, and increases the eventual DASP balance. Wages recovered are assessable in the year they are received, not the year they were earned.

## Which award and which level are yours?

Both are determined by facts you can establish today. Getting them wrong is what makes an underpayment claim collapse before it starts.

- What industry the employer actually operates in, which decides the award.
- What your duties genuinely are, as opposed to your job title.
- Whether an enterprise agreement applies, which displaces the award entirely.
- How long you have been in the industry, which decides whether introductory rates still apply.
- Whether you are casual, which adds the 25% loading to every rate.
- Whether you are genuinely engaged as a contractor under an ABN, in which case the award may not cover you and that is the first thing to resolve.

Whatever was withheld across each job reconciles in your [working holiday tax return](/tax-return) at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 },

// ─── TAX RETURN - PENALTIES & DEDUCTIONS ─────────────────────────────────
 {
 slug: "late-tax-return-penalty-working-holiday",
 title: "Late tax return penalty in Australia: the real rules",
 description:
   "The penalty is $364 per 28 days late, up to $1,820, but the ATO generally does not apply it when a late return results in a refund. Catching up old years.",
 seoTitle: "Late tax return penalty: up to $1,820, rarely on a refund",
 category: "Tax Return",
 date: "3 March 2026",
 readTime: 4,
 body: `
The Failure to Lodge penalty is one penalty unit for each 28 days a [tax return](/tax-return) is overdue, capped at five. At $364 a unit, the value from 1 July 2026 (it was $330 before), the maximum is $1,820. The ATO says it generally does not issue the penalty when a late return results in a refund or nil result, with some exceptions. What decides whether you pay it is mainly whether the return produces a debt, and your compliance history.

## When is the return actually due?

31 October following the end of the financial year if you lodge it yourself, so a 2024-25 return was due by 31 October 2025 and a 2025-26 return by 31 October 2026, a date that has now passed. A late return can still be lodged. The [2026 deadline guide](/blog/tax-return-deadline-31-october-working-holiday) covers this year's dates. The financial year runs 1 July to 30 June, and the deadline does not move because you have left the country.

Lodging through a registered tax agent changes the date substantially. Agents work to a concessional lodgement programme running into the following May, provided you were on the agent's client list before the standard October deadline. Signing up with an agent in February does not retrospectively extend a deadline that passed in October.

## How does the penalty build up?

In steps of 28 days, not daily, so two days late and twenty days late cost the same. Each 28 days, or part of 28 days, adds a penalty unit until the cap of five, a little over four months.

- 1 to 28 days late: 1 unit, $364
- 29 to 56 days: 2 units, $728
- 57 to 84 days: 3 units, $1,092
- 85 to 112 days: 4 units, $1,456
- 113 days or more: 5 units, $1,820, the maximum

## Does the penalty apply if you are owed a refund?

Generally not. The duty to lodge is separate from whether tax is payable, so a refund return lodged late is still a late return, but [the ATO says](https://www.ato.gov.au/individuals-and-families/paying-the-ato/interest-and-penalties/penalties/failure-to-lodge-on-time-penalty) it generally does not issue a Failure to Lodge penalty notice when a late return results in a refund or nil result. There are exceptions, for example where a penalty was applied before the return was lodged.

The pattern also matters rather than the single year. A first late return from someone with no other history is treated very differently from a third consecutive year of nothing being lodged. Several unlodged years discovered at once, or a return that produces a debt, is where penalties are more likely.

## When does interest get charged as well?

Only when the late return produces a debt. The General Interest Charge runs on unpaid tax from the original due date, compounds daily, and is set well above the cash rate, so a small debt left alone for a few years grows considerably.

A refund or nil outcome carries no interest, because there is nothing outstanding to charge it on. A late refund return is a much smaller problem than a late return with an ABN year behind it. Work out which of the two you have before deciding how urgent this is.

## Can the penalty be cancelled?

It can be remitted, which means reduced or removed, and the ATO exercises that discretion reasonably often where there is a genuine reason. Illness or hospitalisation around the deadline, a bereavement, a natural disaster, or an ATO system failure that prevented lodgement are all recognised grounds.

Remission is not automatic and has to be asked for with something supporting it. A first offence against an otherwise clean record is the most commonly granted case, which is an argument for dealing with one late year now rather than letting three accumulate.

## What happens if you have already left Australia?

The obligation follows you, and so does the debt. An unlodged return sits on the ATO record indefinitely, and the record has consequences that surface at inconvenient moments.

An outstanding ATO amount can be offset against a later refund, including in some circumstances against a [DASP payment](/superannuation). An unresolved compliance position can cause Home Affairs to look more closely at a second or third year visa application. And tax withheld during the year stays unreconciled until a return is lodged, which is the more common situation by a long way. Lodging late is usually better than not lodging, because the penalty is capped and the refund is not.

## What if several years are unlodged?

Then the years interact, and not in your favour. The Failure to Lodge penalty is assessed per return rather than across the whole position, so three overdue years can each carry their own five units, and the pattern shifts the ATO from applying the penalty selectively to applying it as a matter of course.

The order you deal with them in matters too. Lodging the oldest first establishes a starting position for each later year, and a refund from one year can be offset against a debt from another, so the net outcome of several years lodged together is often very different from what any single year suggested. Refunds from earlier years are still payable, and unclaimed ones from a working holiday two or three years ago are recovered regularly. [Lodging past years' tax returns after a working holiday](/blog/past-years-tax-returns-working-holiday) covers how far back myTax goes and what the ATO needs for each year.

## What is the difference between lodging late and amending?

Two different processes with two different limits. Lodging late means the return was never filed, and there is no cut off date for filing it, which is why a 2022-23 return can still be lodged today.

Amending means a return was filed and something in it was wrong. For individuals the standard amendment window is two years from the date the notice of assessment was issued, after which the position is generally fixed. So a return lodged quickly but carelessly can end up worse than one lodged late but correctly: the late one can still be got right, and the wrong one eventually cannot.
`,
 }, {
 slug: "past-years-tax-returns-working-holiday",
 title:
 "Lodging past years' tax returns after a working holiday",
 description:
 "Yes, you can lodge old Australian tax returns after a working holiday, even from overseas. What the ATO needs, how far back, late penalties and the refund.",
 category: "Tax Return",
 date: "5 November 2026",
 readTime: 6,
 body: `
Yes. You can lodge one or more past years' Australian tax returns after your working holiday has ended, including from overseas. The ATO takes prior year returns through myTax for 2016 and later years, it generally does not issue a late lodgement penalty when a late return results in a refund, and any refund is paid only into an Australian bank account. Each financial year, 1 July to 30 June, is its own return, so one long working holiday can mean two or three of them.

## Can you still lodge a tax return for a year that has passed?

Yes. The ATO's page on [lodging a prior year tax return](https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-a-prior-year-tax-return) gives three ways to do it: online with myTax, through a registered tax agent, or on a paper return. It also says it is important to get up to date as soon as possible, to reduce the risk of penalties and interest.

Each year is lodged on its own. If you worked from March 2024 to February 2025, March to June 2024 falls in the 2023-24 year and the rest in 2024-25, so that is two returns. The [Australian financial year guide](/blog/australian-financial-year-dates) shows how a working holiday splits across years.

## Can you lodge past years from overseas?

Yes. The ATO says that if you link the ATO to your myGov account, you can [lodge your tax return online with myTax from overseas](https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-before-leaving-australia), as long as you have myGov sign-in options you can use from overseas. A registered tax agent can also lodge for you, and a paper return can be posted.

The harder part from abroad is usually identity rather than the return. To confirm who you are, the ATO asks for your tax file number and other identifying details, such as a previous notice of assessment, so dig those out first. [Lodging your tax return from overseas](/blog/how-to-lodge-tax-return-from-overseas) covers the practical side, from verification codes to post that goes to an old address.

## How far back can you lodge?

Further back than most working holiday makers need. The ATO sets out the routes by income year, where the 2016 year is the one that ended on 30 June 2016:

- 2016 and later: online with myTax
- 2014 and 2015: with myTax if you meet that year's eligibility criteria
- 2013 and earlier: not online, so through a registered tax agent or on a paper return

For a working holiday in the last few years, every year can go in through myTax.

## What if you did not need to lodge for one of the years?

Then you tell the ATO instead of leaving the year blank. The ATO says that if you do not need to lodge, you usually still need to lodge a non-lodgment advice. The quickest way is through ATO online services in myGov, it can be done online for income years back to 2000, and paper forms are also available.

## What does the ATO need for each year?

Income figures for every employer, and something behind them. For wages, your income statement is in ATO online services through myGov or in the ATO app. One that is not marked tax ready is one your employer has not finished.

If an older year has no income statement or payment summary you can find, the ATO's page on a [lost or missing payment summary](https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-statements/lost-or-missing-payment-summary) lists the alternatives:

- Ask the employer or payer for a copy, or for a letter stating your income and the tax withheld
- Use the pre-fill in myTax
- Work from your payslips, timesheets and bank statements
- If none of that gives accurate figures, estimate your income and tax withheld, and keep your workings, because the ATO may ask for written evidence of how you reached them

A statutory declaration is no longer needed when a payment summary is missing. Beyond the income figures, you need your TFN, an Australian bank account for any refund, and records for any deductions you plan to claim.

## Is there a penalty if a late return results in a refund?

Generally not. The ATO says it generally won't issue a [failure to lodge penalty](https://www.ato.gov.au/individuals-and-families/paying-the-ato/interest-and-penalties/penalties/failure-to-lodge-on-time-penalty) notice for a late tax return when lodging it produces a refund or a nil result, and that it generally does not penalise isolated cases of late lodgement. The exception to know: if a penalty was already applied before you lodged, the refund rule does not apply.

Where the penalty does apply, which is mostly a return that produces a debt, it is one penalty unit for every 28 days or part of 28 days the return is overdue, capped at five units. The ATO lists a [penalty unit](https://www.ato.gov.au/individuals-and-families/paying-the-ato/interest-and-penalties/penalties/penalty-units) at $364 on or after 1 July 2026, and $330 from 7 November 2024 to 30 June 2026.

You can ask for the penalty to be remitted, but the ATO expects your outstanding returns to be lodged first. It says requests based on severe illness, information you could not get from others despite genuine efforts, a disaster, or vulnerability such as family violence are likely to be accepted, while holidays, work commitments, short term illness and not receiving ATO reminders are likely to be declined. The [late tax return penalty guide](/blog/late-tax-return-penalty-working-holiday) covers how the penalty builds up and when interest is added.

## Where is the refund paid?

Into an Australian bank account, and nowhere else. The ATO's [financial institution details](https://www.ato.gov.au/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/supporting-documents-for-my-tax/financial-institution-details) instructions say: "We'll only pay tax refunds into recognised financial institution accounts located in Australia." An overseas account cannot receive it, and without bank details, lodging online through myTax might not be possible.

So check that your old Australian account is still open before you lodge, and keep it open until anything owed to you has landed. If it has already been closed, deal with that before the return goes in, not after. Whether a year produces a refund at all depends on that year's figures, and nothing is settled until the ATO has assessed the return.

## Should you lodge the years yourself?

myTax suits a year with one or two employers and finalised income statements. Several years, a missing employer, ABN income or a closed bank account make it slower, and that is where help is worth having. A [working holiday tax return](/tax-return) with us can cover earlier years you never lodged, one return per year. Each return is reviewed and signed off by a registered tax agent before it is lodged with the ATO.

## What decides how simple your catch up is?

Catching up on old years is routine. How long it takes depends on these points:

- How many financial years are unlodged, since each one is its own return
- Whether every employer finalised your income statement, or you will need copies, letters or an estimate
- Whether your myGov sign-in still works from overseas
- Whether any year is before 2016, which limits or rules out myTax
- Whether a year produces a debt rather than a refund, which is where penalties and interest come in
- Whether an Australian bank account is open to receive anything owed to you

However many years are open, each one is settled through its own [tax return](/tax-return).
`,
 }, {
 slug: "tax-return-deadline-31-october-working-holiday",
 title: "Tax Return Deadline 2026 for Working Holiday Makers",
 description:
   "Self-lodgement of 2025-26 returns was due 31 October 2026. Missed it, or already left Australia? A late return can still be lodged. Here is what changes.",
 category: "Tax Return",
 date: "21 October 2026",
 readTime: 5,
 body: `
If you lodge it yourself, the due date for your 2025-26 Australian tax return was 31 October 2026, which has now passed. A late return can still be lodged. The year it covers runs 1 July 2025 to 30 June 2026, and the deadline is the same whether you are still in Australia or already home.

## Which tax year was due on 31 October 2026?

The 2025-26 year, which is every dollar paid to you between 1 July 2025 and 30 June 2026. The Australian financial year does not follow the calendar, so the month you arrived decides how your working holiday splits.

- Worked November 2025 to May 2026: one return, the 2025-26 one, due 31 October 2026.
- Worked March to September 2026: two returns. March to June is 2025-26 and was due 31 October 2026; July to September is 2026-27 and not due until 31 October 2027.
- Left Australia before 1 July 2025: that year was due in October 2025, and it can still be lodged.

The [Australian tax year guide](/blog/australian-financial-year-dates) walks through the split in more detail, including the early return for people leaving before 30 June.

## Is the deadline later if a registered tax agent lodges it?

Often, yes. Many registered tax agents run a lodgement program that lets them lodge for their clients after 31 October, typically into the following May, provided the client was on the agent's list before 31 October. Whether that applies to you depends on your own situation and the agent's program.

The ATO is explicit that the exact date depends on your own situation and on when you engaged the agent, so the condition that matters is timing. Joining an agent's client list after the October deadline has passed does not reach back and extend it. The [guide to tax agents](/blog/what-is-a-tax-agent) explains what else changes when an agent is involved.

## What actually happens if you miss 31 October?

Nothing dramatic happens the day after, and for most working holiday makers who are owed money, the larger cost of a late return is usually time rather than a fine. The ATO can apply a Failure to Lodge penalty of one penalty unit for each 28 days (or part of 28 days) a return is overdue, capped at five units. The ATO says it generally does not issue that penalty when a late return results in a refund or nil result, with some exceptions. A late return that produces a debt is treated differently. The [late lodgement guide](/blog/late-tax-return-penalty-working-holiday) covers when the penalty is applied, when interest is added, and how remission works.

## Does a refund expire if you lodge after the deadline?

No. There is no cut off date for lodging a past year, and a refund owed on a 2025-26 return is still payable after 31 October. A return from a working holiday two or three years ago can still be lodged today.

What a late return does cost is access to your own money. Any tax over-withheld during the year stays with the ATO until the return is lodged and processed, and the longer the return waits, the longer the money does.

## You have already left Australia. Does any of this change?

The deadline does not move because you have gone home, and neither does the return. What changes is practical, and one point catches people out every year.

The ATO pays a tax refund only into an Australian bank account. Superannuation through [DASP](/superannuation) can be paid overseas, but a tax refund cannot. If your Australian account is still open, keep it open until the refund has landed. If it is already closed, deal with that before the return is lodged, not after.

## What should you check before lodging?

Three things, because a return lodged in a hurry with one of them wrong has to be amended later, and an amendment takes longer than getting it right the first time.

- Every employer has finalised your income statement. An employer that has not finalised can be missing from the return entirely.
- Your residency position for the year. It can change the rate the year is assessed at, it depends on the facts of your year, and the ATO makes the final call.
- Whether the Medicare levy applies to you. Some people can be exempt, but only with the right certificate and it is decided case by case. The [Medicare page](/medicare) has more.

## Do you even need to lodge?

It depends on your taxable income. The ATO says a working holiday maker must lodge if their taxable income for the year was $45,001 or more. Below that you may not be required to, but lodging is still the only way to have the year assessed and the only way any over-withheld tax comes back. The [short stay guide](/blog/do-you-need-to-lodge-tax-return-short-stay) covers the exceptions.

## Would you rather not do it yourself?

Message us on WhatsApp with roughly where and when you worked. Working holiday tax is the only thing we do: we read your ATO record, prepare the [tax return](/tax-return), and nothing is lodged until you have read it and signed. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.
`,
 }, {
 slug: "understating-income-ato-penalty-working-holiday",
 title: "Understating Income: What the ATO Charges",
 description:
   "The ATO data-matches every employer, bank and platform. Penalty tiers for carelessness vs evasion, and how voluntary disclosure cuts them dramatically.",
 category: "Tax Return",
 date: "9 March 2026",
 readTime: 4,
 body: `
If a [tax return](/tax-return) under-reports income or over-claims deductions, the penalty is a percentage of the tax shortfall: 25%, 50% or 75% depending on how the ATO reads the cause. Interest runs on top from the original due date. Which tier applies is decided by intent.

## How much does the ATO already know?

Nearly all of it, before you lodge. Single Touch Payroll gives it a direct feed of every wage payment, the tax withheld from each pay run and the [super](/superannuation) contributions reported to each fund.

The ABN side is covered too. Gig platforms including Uber, DoorDash, Airtasker and Menulog report what they paid you under the Sharing Economy Reporting Regime. Businesses in construction, cleaning, courier, road freight, IT and security report payments to contractors under taxable payments reporting. Banks report interest, and share and crypto platforms report disposals. So omitted income is not hidden, it is mismatched, and the mismatch is found automatically.

## What decides which penalty tier applies?

The ATO's view of why the return was wrong. The tiers are separated by state of mind rather than amount: failure to take reasonable care attracts 25% of the shortfall, recklessness 50%, and intentional disregard 75%.

For working holiday makers most cases land in the first tier, because the usual cause is a forgotten employer or a deduction claimed without records. That is also the tier where remission is most often granted.

- Failure to take reasonable care: 25%, the ordinary backpacker case
- Recklessness: 50%, where a substantial risk of being wrong was obvious
- Intentional disregard: 75%, omitted income or invented deductions

## What does a shortfall actually cost?

More than the tax. A shortfall of $2,000 assessed at the 25% tier adds a $500 penalty, giving $2,500 before interest. The same $2,000 at the 75% tier adds $1,500, giving $3,500.

The General Interest Charge then runs on the unpaid tax from the original due date, compounds daily and sits well above the cash rate. Data matching discrepancies commonly surface a year or two after lodgement, so interest is usually a meaningful share of the final figure.

## What actually triggers a review?

A mismatch between two records that should agree, which is narrower than the phrase ATO audit suggests. Most reviews of working holiday maker returns begin automatically, within weeks of lodgement, and open with a letter asking for information.

- Reported income lower than the Single Touch Payroll record
- Platform income reported by Uber, DoorDash or Airtasker that is absent from the return
- An employer in the ATO record who does not appear on the return at all
- A deduction well outside the range for that occupation and income level
- A return lodged before employers finalised, so the figures moved afterwards

## What if you have already left Australia?

The debt stays, and so does the ability to collect it. An ATO amount owing does not lapse because you flew home, and the General Interest Charge continues to run on it.

Three consequences follow. Future refunds can be held against the debt, including in some circumstances a [DASP payment](/superannuation) you were relying on. Larger amounts can be referred for international collection. And an unresolved position sits on your record where Home Affairs can see it if you apply for another Australian visa.

## What keeps a return defensible?

Completeness first, then substantiation. Every employer for every job, however short, plus all ABN and platform income, removes the most common cause of a shortfall.

The second half is claiming only what you can support. A deduction with a record behind it survives a review; the same deduction without one becomes a shortfall with a penalty attached. A larger refund that unravels two years later, with penalty and compounding interest on top, is worth less than a smaller one that holds.

That is also why anyone promising an inflated refund in exchange for your TFN and passport is worth avoiding. The scheme works by claiming what is not true, and the penalty is assessed against you rather than them. Our guide to [protecting your TFN](/blog/tfn-security-protect-from-fraud) covers who is entitled to ask for your details.

## Is it cheaper to correct it before they find it?

Substantially, and the difference is built into the penalty regime. A voluntary disclosure made before the ATO begins an examination attracts a significant reduction in the shortfall penalty, and one made after an examination starts attracts a smaller reduction.

So discovering an omission is not the disaster it feels like. An employer you forgot, platform income you did not realise was reported, or a deduction you cannot substantiate are all fixable by amending the return, and doing it before a letter arrives keeps the cost near the tax itself.

## How long does the ATO have to look?

Two years for most individuals, running from the date the notice of assessment was issued, after which the assessment is generally final in both directions. That is the same window inside which you can amend a return in your own favour.

The exception makes deliberate omission a different category of risk. Where there has been fraud or evasion, there is no time limit at all, and the ATO can reopen a year indefinitely. That is the distinction between an untidy return, which becomes safe after two years, and a knowingly false one, which never does.
`,
 }, {
 slug: "tools-equipment-under-300-instant-deduction-whv",
 title:
 "Work tools under $300: claim the full cost in one year",
 description:
 "Any work item costing $300 or less can be claimed in full in the year you buy it. What qualifies on a farm, a site or in a kitchen, and the proof you need.",
 seoTitle: "Tools under $300: claim the full cost on your tax return",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 4,
 body: `
Any single work item costing $300 or less is deductible in full in the year you buy it, rather than depreciated over years. Boots, knives, secateurs, hard hats, high visibility shirts, tool belts and hand tools all qualify. From the 2026-27 income year a separate $1,000 standard deduction also exists for eligible people, but it is not available for 2025-26 returns.

## What are the three conditions?

All three have to hold together, and it is the second and third that break claims. Most people check the price and stop there, which is why the set rule catches so many otherwise genuine deductions.

The item must cost $300 or less on its own, not $300 in total across everything you bought. It must be used predominantly to earn assessable income. And it must not form part of a set that together costs more than $300.

Six kitchen knives bought together for $450 is a set, and no individual knife in it counts as a sub $300 item, so the whole thing is depreciated. The same chef buying one knife at $80 in October, another at $90 in January and a third at $100 in March has three separate deductible items, because those were genuinely separate purchases rather than a set split up on paper.

## What actually qualifies in the work backpackers do?

Almost anything you had to buy in order to do the job, and the list is longer than most people claim. What the ATO expects to see on a farm return differs from a construction or hospitality one.

- Farm and horticulture: picking buckets, secateurs, pruning shears, gloves, work boots, high visibility shirts, broad brimmed hats and sun protection
- Construction: steel capped boots, hard hats, tool belts, hand tools, measuring tapes, gloves
- Hospitality: kitchen knives, chef whites, slip resistant shoes, aprons
- Delivery and rideshare: delivery bags, phone mounts, dash cams, bike accessories
- Cleaning: protective gloves, equipment and consumables

Sun protection is genuinely deductible for outdoor work and almost nobody claims it. A season picking in the Riverland or Bundaberg involves real spending on hats, sunscreen and long sleeved protective clothing.

## What does predominantly for work mean?

That the item's main use is the job; where it is not, the claim is limited to the work proportion. Items absurd to use otherwise are the easy cases: high visibility clothing, a hard hat, chef whites, steel caps. Those are a full claim.

Mixed use items are where judgement applies. Boots you also wear socially, a backpack that carries picking gear and also goes travelling, a phone mount used for rideshare and personal navigation. Each is claimable at the work percentage, and that percentage needs a basis you could explain.

## What evidence do you actually need?

A receipt showing the cost, the date, the supplier and what was bought, plus a basis for the work use if it is not obviously 100%. Photographs of receipts are accepted, and digital records are as good as paper.

Without evidence the deduction is not claimable however genuine it was, and this is where seasonal workers lose most. Farm and site purchases are frequently cash, at a rural hardware or farm supply store, on days when paperwork is the last thing on your mind. A bank card statement, a photograph of the item in use or written confirmation from the supplier can support a claim, but they are weaker than a receipt and contested more often.

Photographing the receipt at the counter and mailing it to yourself takes ten seconds and survives a washing machine, which a paper receipt in a work trouser pocket does not.

## What if an item cost more than $300?

The cost is still deductible, it is just claimed over time. Items above the threshold are depreciated over their effective life, generally three to five years for hand tools and small power equipment, so a $400 chainsaw is claimed across several years rather than in one.

That sits alongside the $1,000 standard deduction that starts with the 2026-27 income year. It does not raise the item threshold, but it can change the arithmetic for anyone buying a decent power tool or an e-bike. The [$1,000 standard deduction guide](/blog/1000-dollar-instant-deduction-rule-2026) sets out how the two fit together.

## Where do good purchases fail this rule?

The $300 rule sounds simple and fails on details rather than on principle.

- Whether items were bought as a set or genuinely separately, which is the difference between an immediate deduction and depreciation.
- Whether you kept receipts, which decides whether an honest expense is a claimable one.
- Whether the item is used only for work, or also personally, and whether you can justify the split.
- Which financial year the purchase falls in, since the $1,000 standard deduction only starts with 2026-27.
- Whether you are an employee or on an ABN, which changes where the expense is claimed and what else can be claimed alongside it.
- What industry you worked in, since farm, site and kitchen work each have a different set of items the ATO expects to see.

Deductions are claimed through your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you have added up the year's work spending.
 `,
 }, {
 slug: "1000-dollar-instant-deduction-rule-2026",
 title: "The $1,000 Standard Deduction From 2026-27",
 description:
   "A flat $1,000 work-related deduction, no receipts, from the 2026-27 income year, not 2025-26 returns. Who it suits, and when actual costs are worth more.",
 category: "Tax Return",
 date: "21 March 2026",
 readTime: 4,
 body: `
From the 2026-27 income year (1 July 2026 to 30 June 2027) the ATO's new standard deduction lets eligible people claim $1,000 for work related expenses without receipts. It is separate from the long standing rule for low cost work items, it does not apply to 2025-26 returns, and the ATO says it is for Australian residents for tax purposes who earn labour income such as wages. It does not cover business income or ABN business expenses. Whether that describes you depends on the facts of your year, and the ATO makes the final call.

## What does the flat $1,000 replace?

The requirement to substantiate, not the deduction itself. The ATO says the $1,000 can be claimed without having spent the money or kept records.

It is aimed at ordinary work expenses such as protective clothing and its laundry, tools and small equipment, the work share of a phone plan and similar costs. Items outside that category, such as donations or investment expenses, keep their own rules, so confirm the current ATO list before relying on this summary.

## When is the flat $1,000 the better choice?

When your real work expenses came to less than $1,000, the ordinary position for hospitality, retail and cafe work. Someone whose only costs were a couple of black shirts, laundry and a share of their phone claims more than they spent, lawfully.

It also wins when the expenses were real but the records are not. Receipts lost in a hostel move, a phone replaced mid year, dozens of small purchases: all irrelevant if the flat amount exceeds what you could have proved.

## When are actual costs better?

When the job required equipment. A construction labourer buying boots, hard hat, high visibility gear and hand tools across a season, or an employee driving their own car between work sites, can pass $1,000 quickly, and a car on its own often does. Rideshare and delivery on an ABN are business income, where the standard deduction does not apply at all.

Vehicle use most often decides it. At 91c per kilometre under the cents per kilometre method, a driver covering a few thousand work kilometres passes $1,000 before anything else is counted, and that claim needs the records that go with it.

- Tools and equipment beyond incidental purchases
- Protective gear bought rather than supplied
- Work related vehicle kilometres at 91c each
- A phone and data plan used substantially for work

## Can you take the flat amount and add to it?

Not on top. The ATO says the expenses you claim reduce the standard deduction dollar for dollar, and once they pass $1,000 the standard deduction falls to nil and you need written evidence for what you claim.

So the choice has to be made after the arithmetic. Expenses of $1,200 with receipts are claimed in full; the same year without receipts is limited to the $1,000. Where the two land close together, the flat amount can still be simpler once the record keeping is weighed against the difference.

## Which financial year does it apply to?

The 2026-27 year, which runs from 1 July 2026 to 30 June 2027 and is lodged from July 2027 onwards. The ATO says it is not available for Tax Time 2025-26, so a 2025-26 return or any earlier year is prepared under the existing rules, including [the $300 rule for tools and equipment](/blog/tools-equipment-under-300-instant-deduction-whv).

Timing decides it. Someone whose working holiday spans both years has income split across two financial years under two different sets of deduction rules, and the same expense can be treated differently depending on which side of 30 June 2026 it fell. The ATO's rules on this are still being finalised, so check the current position before relying on any figure here.

## What is the deduction actually worth to you?

Less than the headline, because a deduction reduces taxable income rather than tax. What it is worth in dollars depends on the tax rate that applies to your income, which varies from person to person and is something our team reviews as part of preparing your [tax return](/tax-return). Whether the standard deduction applies to you at all is also a case by case question for the ATO.

## What still needs records even under the flat rate?

Everything outside the work related expenses category. Charitable donations, the cost of managing your tax affairs including last year's agent fee, and income protection premiums keep their own record keeping rules.

The same is true on the income side. Cash income, ABN receipts and platform payments still need to be recorded and declared.

## Does it change what you should keep during the year?

Not immediately. You cannot know which is better until the year is over, so throwing receipts away in October forecloses the choice.

Photograph receipts as they happen and decide when the year is over. For a light year the flat amount may be enough. For a construction or driving year the total may well exceed $1,000, and the photographs are the difference between claiming the real figure and the capped one.
`,
 }, {
 slug: "bicycle-motorcycle-vehicle-deductions-working-holiday",
 title:
 "Delivery rider tax deductions: bike, scooter or car",
 description:
 "Riders can claim the work share of a bike, e-bike, scooter or motorbike: cost, repairs and running costs. Cars use two set methods. What riders miss most.",
 seoTitle: "Delivery rider tax deductions: bike, e-bike, scooter or car",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 7,
 body: `
More than most riders think. A bicycle, e-bike, scooter or motorcycle used to earn income is a work asset, and its cost, repairs and running expenses are deductible in the work use proportion. Cars have two simplified methods. Everything else uses actual costs.

## What decides whether you can claim a vehicle at all?

Whether the vehicle earns you income, and whether you are an employee or working under an ABN. That decides everything else on this page.

A delivery rider on an ABN riding for Uber Eats, DoorDash or Menulog is producing income, and the bike is a business asset. An employee riding to a fixed workplace is commuting, private travel that has never been deductible however far or however early. The ATO checks this distinction first on a rider's return.

## What can a delivery rider actually claim?

Both the vehicle itself and what it costs to run, in the proportion you use it for work. The asset is claimed in full or over its effective life depending on what it cost; running costs are claimed as you incur them.

- The bicycle, e-bike or scooter itself. Under $300 it is generally deductible in full immediately (in the work use proportion). Above that it is depreciated over its effective life, typically three to five years.
- Repairs and consumables: tubes, tyres, chains, brake pads, servicing.
- Equipment: helmet, lights, lock, panniers, delivery bag, phone mount.
- Electricity to charge an e-bike battery, on a reasonable estimate of the work portion.
- Insurance specifically covering the vehicle.

A bike used 80% for delivery and 20% for getting around is an 80% claim across all of it. That percentage needs a basis, not a guess, and a few weeks of representative records normally establishes one.

## How are cars different?

Cars are the only vehicle class with simplified methods, and there are two. A car here carries fewer than nine people and under one tonne.

**Cents per kilometre** pays a flat rate per work kilometre, capped at 5,000 kilometres per car per year. It needs a reasonable basis for the estimate rather than every receipt, making it the low effort option.

**The logbook method** records twelve continuous weeks of use to establish a work percentage, then applies that percentage to your actual costs for the year: fuel, servicing, registration, insurance and depreciation. The logbook stays valid for five years.

For a rideshare driver the logbook usually produces the larger deduction, because 5,000 kilometres is a low ceiling for someone driving for a living. The trade is that the twelve weeks must actually have been kept, and cannot be reconstructed afterwards.

## What about motorcycles and heavy utes?

Neither is a car for these purposes, so neither gets cents per kilometre or the logbook. Both use actual costs apportioned to work use: fuel, registration and compulsory third party, insurance, servicing, tyres, tolls and parking, and riding gear genuinely required for the work.

Records are the constraint. Actual cost claims need evidence for each item, and a rider or tradesperson running a ute in Perth or Darwin without receipts has a real deduction and no way to substantiate it.

## What do people miss most often?

The small recurring costs, because they never feel like a claim at the time. Tolls on work trips, which in Sydney, Melbourne and Brisbane add up over a year. Parking during work activity. Vehicle cleaning for rideshare drivers. E-bike charging. Riding gear.

Bicycle depreciation is the most missed item, because riders assume the ATO does not care about a bike. It does, and a $1,800 e-bike used mostly for delivery is one of the larger deductions a rider will have.

## What decides how much of your vehicle you can claim?

Vehicle deductions vary more between two riders than almost any other claim, because the rules turn on employment status and vehicle class rather than on what you spent.

- Whether you are an employee or on an ABN. Commuting is private for an employee, and this is the biggest single branch.
- Which vehicle class it is. A motorcycle or a heavy ute is claimed on actual costs, with a receipt behind every item.
- Whether a twelve week logbook exists, because it cannot be created retrospectively.
- What proportion of use is genuinely work, and whether you have a defensible basis for that number.
- Whether the vehicle cost sits under or over the $300 immediate deduction limit.
- Whether most of your ABN income comes from one payer, since personal services income rules can restrict what is deductible against it.

Vehicle claims are made through your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you have a rough figure for the year's costs.
 `,
 },

// ─── SUPER ────────────────────────────────────────────────────────────────
 {
 slug: "dasp-vs-leaving-super-in-australia-pros-cons",
 title:
 "Leave super in Australia or take a DASP? What waiting costs",
 description:
 "For most working holiday makers leaving for good, claiming is better: the 65% applies whenever you claim, so waiting adds fees. When leaving it is right.",
 category: "Super",
 date: "24 March 2026",
 readTime: 6,
 body: `
For most working holiday makers leaving for good, claiming is the better answer. The 65% withholding applies whenever you claim, so waiting does not reduce the tax, it only exposes the balance to fees. The one genuine exception is permanent residency.

## What does the comparison actually look like?

Take $5,000 sitting in an Australian fund on the day you fly home. Claiming now produces about $1,750, paid to an overseas account if your fund offers that, typically within 28 days of a complete application, since 65% is withheld on the taxable component and for a working holiday maker that is essentially the whole balance.

Leaving it does not preserve $5,000. The account keeps paying fees, rises or falls with the investment option, and stays inaccessible from overseas until you claim, when the same 65% applies. The tax follows the money, not the moment.

## What happens to super you leave behind?

It shrinks, because three separate costs run against the balance while no contributions run for it. On a small balance they can consume the whole account within a few years.

- Administration fees, commonly $50 to $130 a year regardless of balance
- Insurance premiums, deducted automatically unless cancelled, commonly $300 to $800 a year
- Asset based fees of roughly 0.5% to 1.5% of the balance annually

On a typical working holiday balance of $2,000 to $10,000 the fee load outruns any realistic investment return. Insurance is the killer: $500 a year for death and disability cover in a country you have left is a tenth of the balance gone to a policy nobody will claim on.

Once at least six months have passed since you left and your visa ceased, the fund transfers the balance to the ATO as unclaimed super. There it is out of reach of fund fees and insurance premiums, it no longer moves with an investment option, and the same 65% applies whenever it is claimed. It can then only be paid to an Australian bank account in your name or by cheque, which matters once your Australian account is closed.

## When is leaving it genuinely the right call?

When you are pursuing permanent residency, and only really then. If you become an Australian permanent resident, the balance becomes ordinary superannuation with ordinary and vastly better tax treatment. That is worth waiting for if the pathway is credible.

Everything else falls apart under examination. A likely return within two or three years on another temporary visa is no reason: new work builds new super while the old balance pays fees. A large balance is weaker than it looks, because the 65% applies to the larger number too.

## When is claiming clearly right?

When you are leaving and not coming back on a permanent pathway, which is most people. The case is strongest where fees would erode the balance, where you can use the money now, and where your bank details, address and passport are still current. If that is you, here is [how to claim your super after leaving Australia](/superannuation).

The people who never claim almost never decided not to. They meant to do it later, then changed address, changed banks, renewed a passport and stopped being findable. The claim is much harder in year three than in month one.

## Is it reversible?

No. Once claimed, the money is out and cannot be put back, and a later Australian visa starts a fresh account. That is the honest downside, and the reason the permanent residency case matters.

There is no deadline the other way. A claim can be lodged from overseas any time once your visa has ceased and you have left, years afterwards, at the same rate.

## Does a second visa change anything?

Not in the way people hope. The 65% attaches to super accrued during a working holiday visa period and keeps attaching even where later contributions are made under a different temporary visa. Returning on a student or skilled visa does not launder the earlier balance into a lower rate.

The rate follows the visa you were on when the contributions were made, not the visa you hold when you claim.

## Do you plan to come back?

The tax is the same whenever you claim, so this decision is about fees, time and your own plans.

- Whether permanent residency is a real prospect. This is the only strong case for waiting.
- Whether insurance is still being deducted from the account, which is the fastest way a balance disappears.
- How many funds hold contributions for you, since fees are charged per account and multiple small balances are the worst case.
- Whether the balance has already been transferred to the ATO, which stops the fee bleed but stops the returns too.
- Whether your bank account, address and passport are still the ones the fund has on record.
- Whether your final year tax return is also outstanding, which is a separate claim with its own rules.

The eligibility rules, documents and timing are set out where you [claim your superannuation after leaving Australia](/superannuation), and the final year [working holiday tax return](/tax-return) is a separate claim you can [estimate](/calculator) on its own.
 `,
 },

// ─── NEW POSTS - BATCH 3: JOBS (12 articles) ─────────────────────────────

// ─── FARM / AGRICULTURE ──────────────────────────────────────────────────
 {
 slug: "fruit-picking-jobs-working-holiday-australia",
 title: "Fruit picking pay: piece rates, hourly floor and 88 days",
 description:
   "Picking is paid by the hour or per bin, and the Horticulture Award guarantees an hourly floor either way. How days count toward your 88, and what to keep.",
 category: "Work Rights",
 date: "26 March 2026",
 readTime: 6,
 body: `
Fruit picking is paid either by the hour or by piece rate, per bin, bucket or kilogram, and since 2022 every pieceworker must earn at least the minimum hourly rate, plus casual loading, for the hours actually worked. Beyond that, which farm you pick on decides more about your year than which fruit you pick. How a grower pays, what they put in writing, and whether the days are reported set what you earn and whether your 88 days stand up later. The [Horticulture Award](/blog/horticulture-award-working-holiday-makers) is the floor beneath all of it.

## What does picking actually pay?

Pay comes in two forms. An hourly rate must be at or above the award minimum for your classification, with 25% casual loading on top for casual workers. A piece rate pays per bin, bucket, tray or kilogram.

Since the 2022 award change, a pieceworker must be paid at least the minimum hourly rate, plus the casual loading for casuals, for every hour worked, however slow the day. The piece rate itself must still be set so an average competent picker earns 15% above that minimum. Farms advertising a few dollars a bucket that works out to a fraction of the minimum are unlawful. Our guide to [piece rates](/blog/piece-rates-farm-work-working-holiday) covers how the guarantee is meant to operate.

## Where and when is the work?

The harvest calendar moves around the continent through the year, so following it is a viable way to complete the 88 days quickly.

- Mangoes: Northern Territory and north Queensland, September to January
- Bananas: Queensland year round, peaking December to May
- Strawberries: Queensland April to October, Victoria and Tasmania in summer
- Apples: Tasmania, Victoria, NSW and WA, February to May
- Citrus: Riverina, Sunraysia and South Australia, May to October
- Stone fruit: Victoria, NSW and South Australia, November to March
- Wine grapes: South Australia, Victoria and NSW, January to April

Regions fill up, and the farms with the worst pay practices are the ones still hiring late.

## What makes a day count toward the 88?

Four conditions, all of which must hold. The work must be in a designated regional postcode, in an eligible industry, paid rather than volunteered, and documented well enough to prove.

Days are counted as full working days, a day being the standard hours for that industry, so short days are added together rather than each counting as a full day, and every day must have been paid. Documentation is where claims fail: Home Affairs relies on payslips, employer letters and ATO reported income, and cash work generates none of them.

That is the reason to refuse cash on a farm, ahead of the tax reason: an unreported eight weeks is eight weeks you cannot prove.

## Are you an employee or a contractor?

Most fruit pickers should be employees, with tax withheld, 12% [superannuation](/superannuation) paid, and the award applying. Some farms put pickers on an ABN instead, which removes the super obligation and the employee minimum guarantee, shifts the whole tax bill onto you, and usually removes workers compensation cover.

Classification is decided by the facts of the work, not the paperwork. If the farm decides when you start, where you pick and how, supplies the equipment, and you cannot send someone else in your place, you are an employee whatever the contract says. Our guide to [employee versus contractor status](/blog/employee-vs-contractor-australia) sets out the test.

## What should you keep, and why?

Farm records serve both the ATO and Home Affairs. Keeping them as you go beats reconstructing them later.

- Every payslip from every farm and labour hire company
- Bank statements showing the wages arriving
- A simple diary: date, farm, hours
- Photographs of yourself at the worksite
- Receipts for boots, gloves and sun protection

The diary is the one people skip and later need. A season across four farms blurs within months.

## What can a picker claim at tax time?

Deductions are small individually and add up across a season. All the ordinary work related kind: you bought it, it earned your income, nobody reimbursed you, and you kept the record.

- Sun protection: hats, sunscreen and long sleeved shirts
- Work boots and protective footwear
- Gloves
- Your own picking equipment, where you supplied it
- A share of vehicle running costs for moving between farms during a working day
- The work share of phone costs

Accommodation deducted from your pay is a different question. On farm charges can be lawful, but only within limits and where properly agreed. Inflated charges are a recognised underpayment pattern.

## What separates a good farm from a bad one?

The Fair Work Ombudsman has run repeated national campaigns in horticulture and keeps finding the same behaviours.

- Piece rates set below the minimum guarantee, with no top up on slow days
- Inflated accommodation charges deducted from wages
- Wages withheld until the 88 days are complete, then the count disputed
- No payslips issued
- Only part of the wages reported to the ATO
- ABN classification used to avoid super and workers compensation

One of these is a warning. Three is a farm to leave, and leaving early is usually cheaper than staying to argue.

## How do labour hire arrangements change things?

A labour hire company employs you and places you on a farm, so your employer is the agency, not the grower, even though the grower directs your day. The agency owes the award rate, the payslips and the 12% super, and appears on your income statement.

That matters when something goes wrong, because the farm will point at the agency and the agency at the farm. Labour hire licensing schemes operate in several states, and a legitimate operator will answer immediately when asked whether it is licensed.

## What decides how your season turns out?

Three facts, and none of them is how fast you pick: whether the pay is hourly or piece rate and whether that agreement is in writing, whether you are employed or on an ABN, and whether the days are being reported.

Tracking your own kilos and hours for the first week converts a vague sense of being underpaid into a number. If the effective hourly rate lands below the casual minimum, the farm owes the difference, and recovery through the Fair Work Ombudsman is free. The wages, the super and the [tax return](/tax-return) all follow from what was actually reported, so they are worth sorting out before you leave the region.
`,
 }, {
 slug: "farm-hand-jobs-working-holiday-australia",
 title: "Farm Hand Jobs: Pay and Second Year Days",
 description:
   "What farm hands earn under the awards, typical hours, accommodation deals to scrutinise, and how the work counts toward your visa extension.",
 category: "Work Rights",
 date: "2 April 2026",
 readTime: 6,
 body: `
Farm hand is the general term for agricultural work that is not fruit picking: livestock, fencing, machinery, cropping and property maintenance. Most of it counts towards the 88 days for a second year visa. Which award covers you, and therefore what you should be paid, depends on the principal activity of the farm rather than on your job title.

## What does the work actually involve?

Whatever the property needs, which is why the role is described so vaguely in advertisements. Livestock care, mustering, drenching and calving on a station; planting, weeding and harvesting broadacre crops; fencing, water troughs and general maintenance; tractor and machinery work; shearing shed support; hay and dairy work.

The property changes the job more than the title does. A cattle station in the Northern Territory, a wheat farm in Western Australia and a dairy in Victoria all advertise for farm hands and mean something different by it. Ask what the daily tasks and hours are before accepting.

## Which award covers you?

The one matching the principal activity of the business, not the task you happen to be doing that day. A mixed enterprise running livestock and crops sits under whichever activity is dominant, and that sets your classification, your rate and your penalty entitlements.

- Pastoral Award MA000035: livestock, broadacre cropping such as wheat, barley and oats, shearing
- [Horticulture Award MA000028](/blog/horticulture-award-working-holiday-makers): fruit, vegetables, vines and tree crops

Classification within the award sets your rate, and the levels rise with responsibility. Someone operating machinery and handling stock unsupervised is not on the entry classification, and being paid as though they were is the most common farm underpayment after the piece rate problem. Our guide to [award classifications](/blog/award-classifications-working-holiday-australia) covers how to identify the right level.

## What should you be paid?

At least the national floor, and in practice more, because award rates for farm classifications sit above it. From 1 July 2026 the casual minimum across all work is $33.05 an hour, being the national minimum wage of $26.44 plus the 25% casual loading, and rates are reset every 1 July by the Fair Work Commission's Annual Wage Review.

Two things move it from there: your classification level, which rises with skill and responsibility, and penalty rates for weekend, public holiday and overtime work, which apply on farms as anywhere else. The Fair Work Pay Calculator gives the current figure for any award and classification.

## Does farm hand work count towards the 88 days?

Most of it does, provided four conditions are met at once. The work has to be in a designated regional postcode, fall inside the specified work categories which include plant and animal cultivation, be paid, and be documented in a way that ties you to the dates and the location.

What does not count catches people out. Office work for an agricultural business, retail work selling farm produce at a gate or a market, and most roles that are not physically agricultural fall outside the definition even though the employer is unmistakably a farm. Payslips settle any dispute about this, which is why remote work with informal pay arrangements is where 88 day evidence problems concentrate. Our guide to [farm work rights](/blog/farm-work-rights-working-holiday-australia) covers what evidence stands up.

## What should you check in a live-in arrangement?

The net figure, before you accept. Accommodation and meals are commonly bundled into station and remote farm jobs, and deductions for them are lawful only if agreed in writing, reasonable and properly documented on the payslip.

Work out the wage less the stated deductions, divided by the hours you will genuinely work including early starts, and compare that with town work minus hostel costs. The difference is usually in the hours rather than the rate. Undocumented deductions at the farm's discretion are the warning sign: one that cannot be pointed to on a payslip can grow.

## Are you covered if you are injured out there?

Yes, as an employee, and remoteness makes no difference. Every state and territory runs a compulsory workers compensation scheme covering medical treatment, weekly payments while you cannot work and lump sums for permanent impairment, and it applies from the first shift regardless of visa.

If you are engaged as a contractor on an [ABN](/blog/farm-work-and-abns), automatic cover generally does not apply, which on a property hours from the nearest hospital is a substantial thing to be without. Whether the classification is correct depends on how the work actually runs, and our guide to [employee versus contractor](/blog/employee-vs-contractor-australia) sets out the test. Our guide to [workplace injury rights](/blog/workplace-injury-working-holiday-rights) covers what to do if it happens.

## What can farm hands claim at tax time?

The gear the job made you buy, which on a farm is a longer list than in most roles. Protective and waterproof boots, work clothing including high visibility gear, sun protection, gloves, small hand tools and knives you supplied, a work share of your phone, and vehicle running costs for movement between separate work locations.

Whether to itemise depends on the total. From the 2026-27 income year the [$1,000 standard deduction](/blog/1000-dollar-instant-deduction-rule-2026) may be available without receipts, where it applies to you, and for many farm hands the real total lands close enough to $1,000 that the comparison is worth making. Our guide to [deductions for working holiday makers](/blog/tax-deductions-working-holiday-makers) covers what qualifies either way.

What you can claim for this work is worked out on your [working holiday tax return](/tax-return), together with every job you held that year.
`,
 },

// ─── HOSPITALITY ─────────────────────────────────────────────────────────
 {
 slug: "bartender-jobs-working-holiday-australia",
 title: "Bartending on a WHV: RSA First, Then Pay",
 description:
   "Bar work pays well thanks to weekend and night penalties - once you hold the state RSA. Realistic pay, tips tax, and getting hired without experience.",
 category: "Work Rights",
 date: "9 April 2026",
 readTime: 6,
 body: `
Bartending pays better than most entry level hospitality because the shifts fall where the penalty rates are. You need an RSA certificate before you can serve alcohol anywhere in Australia. Your rate comes from the Hospitality Award if the bar is in a hotel, or the Restaurant Industry Award if it is inside a stand alone restaurant.

## Why does the venue type change your pay?

Because the two awards carry different rates and different weekend penalties. A bar inside a hotel, pub or club sits under the [Hospitality Award](/blog/hospitality-award-working-holiday-makers). A bar inside a stand alone restaurant sits under the [Restaurant Industry Award](/blog/restaurant-industry-award-working-holiday).

Same job, same drinks, different Sunday rate. Identifying the award is the first step in checking a payslip, and the most common reason an employer's figures and yours disagree.

## What classification should you be on?

Level 2 once you hold an RSA and are actually serving alcohol. The Hospitality Award classifies a bar attendant with an RSA at Food and Beverage Attendant Grade 2, while Level 1 covers glass collecting, clearing tables and restocking without service responsibility.

Employers frequently leave people at Level 1 after they have started serving, which is a classification breach and is recoverable. Classification follows the duties you actually perform, not the title you were given.

## Where does the money actually come from?

Penalties, not the base rate. Bars concentrate hours where loadings apply: evenings, Fridays, Saturdays, Sundays and public holidays, with the 25% casual loading on top of each.

A casual bartender working Thursday through Sunday nights is on loaded rates most of the week, which is why the same base classification pays more behind a bar than in a weekday cafe. From 1 July 2026 the casual floor across all work is $33.05 an hour, and award rates with evening and weekend penalties run well above it.

## How does the RSA work, and who pays for it?

It is required before you serve alcohol, takes a few hours, is usually available online and is issued at state level, so a Victorian certificate does not automatically let you pour drinks in Sydney. Our guide to [the RSA certificate](/blog/rsa-certificate-australia-working-holiday) covers which states recognise which.

Ask before paying for it. Many venues cover the cost when they hire, and where the employer paid or reimbursed you it is not your deduction. Where you paid for it in connection with work you are doing, the fee is deductible.

## What happens with tips?

Tipping in Australia is far less prevalent than in the United States, because base wages are higher and not built around gratuities. Tips are voluntary additional payments, not part of your legal wage.

They are still taxable income, whether kept in cash or pooled and distributed by the venue, and they should be declared. They do not count toward award compliance: an employer cannot use tips to cover a shortfall against the rate you were owed. Our guide to [tax on tips](/blog/do-working-holiday-makers-pay-tax-on-tips) sets out how they are reported.

## What goes wrong most often in bars?

A well documented set of patterns, each recoverable once identified and evidenced. All of them are visible from a payslip and a roster held side by side.

- A flat hourly rate said to cover everything, with no penalty rates applied
- Experienced bartenders left at Level 1 after taking on service duties
- Public holiday loading simply not paid
- Cash payment with no payslip and no superannuation
- Charges for uniform, breakages or till shortages, which are generally unlawful
- Unpaid set up before the shift and unpaid clean down after close

Close is not the end of the shift, and a roster written to close rather than to actual finish underpays every night by the same margin. Our guide to [unlawful uniform and laundry deductions](/blog/uniform-laundry-deductions-illegal-australia) covers the charges.

## What can a bartender claim at tax time?

Modest amounts. The RSA course fee where you paid it and were not reimbursed, non slip shoes where the venue requires them, your own bar equipment where you supply it, the work share of phone costs, and vehicle running costs where shifts are in locations without transport.

From the 2026-27 income year a $1,000 standard deduction may be available without receipts where it applies to you (not for 2025-26 returns), which for bar staff can exceed what could be substantiated item by item.

## Can you start without bar experience?

Yes, and most working holiday makers do. Busy venues run glassies and barbacks who collect glasses, restock fridges, change kegs and keep the bar clear during service; those roles need no experience and no RSA if you are not serving.

The move up happens fast in a short staffed venue, often within weeks. Holding the RSA before the opportunity appears is what makes it happen, because a manager filling a Friday night gap gives the shift to whoever can already pour.

## Why do two bartenders earn different money?

The role is the same everywhere; what you are paid depends on the venue and the roster. Two bartenders on the same nominal rate can be several hundred dollars apart across a month.

- Whether the bar sits inside a hotel or a stand alone restaurant, which decides the award.
- Whether you hold an RSA and are serving, which should put you at Level 2.
- Whether you are casual, which brings the 25% loading, built into the casual weekend and holiday rates under either award.
- Which nights you work, since evening, weekend and holiday penalties are where the earnings concentrate.
- Whether an enterprise agreement applies, which is common in large pub groups.
- Whether set up and clean down time is rostered and paid.
- Whether any charge for breakages, till shortages or uniform has been taken from your pay.

Withholding across every venue you worked at reconciles in your [working holiday tax return](/tax-return) at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 }, {
 slug: "barista-coffee-shop-working-holiday-australia",
 title: "Barista jobs on a working holiday visa: pay and awards",
 description:
   "Barista pay is set by your award level and weekend penalty rates, not experience. Which award applies, unpaid trials, and what you can claim at tax time.",
 category: "Work Rights",
 date: "11 April 2026",
 readTime: 6,
 body: `
Barista work is covered by the Restaurant Industry Award in a stand alone cafe and by the Hospitality Award in a hotel cafe. What you are actually paid is decided by your classification level and by weekend penalties, not by how good your latte art is.

## What does the job involve day to day?

Australian cafes run high volume espresso service, so speed and consistency matter more than the range of drinks. Most roles include food service and cleaning as well.

- Operating espresso machines and grinders
- Steaming milk to specification
- Preparing the standard drinks range
- Taking orders and processing payments
- Preparing simple food in many cafes
- Cleaning equipment and restocking

Senior baristas also train staff, manage a shift and handle bean ordering, which is where the classification and the pay should move up.

## Which classification are you on, and does it match the work?

Classification is set by the duties you actually perform, not the job title on the roster. Under the Restaurant Industry Award a new barista with no experience sits at Food and Beverage Attendant Grade 1, an experienced barista working the full drinks range and taking orders sits at Grade 2, and a senior barista supervising a section higher again.

Being kept at Grade 1 while doing Grade 2 work is the most common and least visible underpayment in Australian cafes. Someone three months in, running the machine unsupervised through a Saturday rush, is not a trainee. Our guide to [award classifications](/blog/award-classifications-working-holiday-australia) explains how to identify the correct level.

## What does the work actually pay?

Pay is the base rate for your classification, plus 25% if you are casual. On weekends and public holidays the Restaurant Industry Award sets a single casual rate that already includes the loading: 150% of the base on Saturday, 150% on Sunday at Introductory to Level 2 and 175% from Level 3, and 250% on a public holiday.

Cafes are Saturday and Sunday businesses, so that weekend structure decides most of a cafe worker's income. A flat rate that sounds generous on a Tuesday is usually a significant loss across a roster weighted to the weekend.

## Are unpaid trial shifts legal?

A brief unpaid demonstration of skills, measured in minutes rather than hours, can be lawful. A full shift of productive work cannot, and it must be paid at award rates whether or not you were subsequently hired.

Cafes are the worst offender on this in Australia, and the wages are recoverable through the Fair Work Ombudsman for free, including where you did not get the job. Our guide to [unpaid trial shifts](/blog/unpaid-trial-shifts-australia-legal) sets out where the line falls.

## Do you need a certificate to get hired?

Generally no. Most Australian cafes hire on demonstrated machine hours rather than a formal barista qualification, so a one day course adds less than experience does. A food safety certificate is sometimes required by the employer, and an RSA is needed where the cafe serves alcohol in the evening.

Prior barista experience from another country travels well here. A certificate without volume behind it does not.

## What are the underpayment patterns to watch for?

The Fair Work Ombudsman has found the same practices repeatedly in Australian cafes. They cluster, so a venue doing one is usually doing several.

- A flat rate said to cover everything, with no weekend or public holiday penalties
- Unpaid trial shifts of a full day
- Indefinite Level 1 classification despite full duties
- Charging staff for coffee, food or uniform, which is generally unlawful
- Cash payment with no payslip and no [superannuation](/superannuation)
- Unpaid pre-opening set up time

The last is worth naming because it is so normalised. If you are expected on site at 6am to set up for a 7am open, that hour is work and it is paid.

## What can a barista claim at tax time?

Modest but real. They follow the same test as everywhere else: you paid for it yourself, it earned your income, nobody reimbursed you, and you kept the record.

- Non slip work shoes
- An apron the employer did not provide
- Barista or food safety course fees you paid yourself for the job you already had, not to get it
- The work share of a phone used for shift communication

Ordinary black clothing is not deductible even where the cafe requires it. Our guide to [tax deductions](/blog/tax-deductions-working-holiday-makers) covers where that line sits.

## Where is cafe work best paid?

Melbourne and Sydney have the deepest specialty coffee markets and the most competition for machine operators, which lifts what a skilled barista can command above the award floor. Regional tourist towns pay less on paper and often more in practice, because the roster is fuller and weekend penalties land on more hours.

Compare the weekly figure rather than the hourly rate. Twenty five hours in a busy Melbourne cafe and forty hours in a Byron Bay cafe at the award produce very different weeks, and the second fills faster toward the six month mark with a single employer.

## What decides whether a cafe job is worth taking?

Three things, and the hourly rate quoted at interview is the least reliable. Whether the classification matches the duties, which decides the base. Whether weekend and public holiday penalties are applied, which decides most of the income. And whether the venue pays super and issues payslips, because a cafe paying cash is also removing the 12% super you would claim as DASP.

The quiet route into better paid cafe work is to start on the register at a busy venue, take machine time in the quiet hours, and move to a barista classification within a few months. Check that the payslip classification moved when the duties did. It rarely does on its own.

What you can claim for this work is worked out on your [working holiday tax return](/tax-return), together with every job you held that year.
`,
 }, {
 slug: "waiter-waitress-working-holiday-australia",
 title: "Waiting Tables: Award Pay, Tips and Rights",
 description:
   "Restaurant and hospitality award minimums, how tips are taxed, split-shift rules, and the underpayment patterns to watch for in hospitality.",
 category: "Work Rights",
 date: "15 April 2026",
 readTime: 6,
 body: `
Waiting tables in Australia pays a real wage rather than a tipped one, because the base rate is set by an award. Which award depends on the venue: the [Restaurant Industry Award](/blog/restaurant-industry-award-working-holiday) for restaurants, the [Hospitality Award](/blog/hospitality-award-working-holiday-makers) for hotels. Your classification is where the money is won.

## What does the job involve?

Greeting and seating guests, taking orders, carrying food and drinks, clearing and resetting tables, handling payments, and cleaning and restocking the floor. In a small venue it also quietly expands into barista work, bar service and basic food preparation.

Your award classification is determined by the range of duties you actually perform, so a waiter who also pulls beers and runs the coffee machine is doing higher graded work than one who only carries plates, whatever the roster calls the shift.

## Which classification should you be on?

The one matching your duties, and there are four that concern most working holiday makers. Introductory level applies for the first three months with no industry experience. Grade 1 covers setting and clearing tables, collecting glasses and basic service. Grade 2 covers taking orders, pouring drinks with an RSA and full table service. Grade 3 covers supervising a section.

Two rules stop this being open ended. After three months at Introductory level you move to Grade 1 automatically unless there is a genuine training reason to stay. And if you are doing the same work as Grade 2 staff, you should be paid at Grade 2 regardless of how long you have been there. Keeping experienced waiters on the lowest grade is one of the most common underpayments in Australian hospitality, because it is invisible without knowing the levels exist.

## What decides your actual take home?

Which days you work, more than which venue you work at. Base rates rise with classification, casual employment adds a 25% loading in place of leave, and then penalty rates apply as multiples of the ordinary rate for Saturdays, Sundays, public holidays and, in some classifications, evenings past a set hour.

A Friday and Saturday dinner roster is worth substantially more than the same number of midweek lunch hours. A payslip showing an identical hourly figure across a week that included a Sunday shows a breach in one line, and it is the fastest check available. Our guide to [penalty rates](/blog/penalty-rates-australia) sets out the multipliers by day and award.

## What about split shifts and short shifts?

Both are covered by rules most workers never hear about. A split shift, where you work a lunch service, go away for four hours and come back for dinner, attracts an allowance under most hospitality awards because the day is broken.

Minimum engagement is the other one. Every time you are called in there is a minimum period you must be paid for, so being sent home after ninety minutes because the venue is quiet does not mean ninety minutes of pay. Being asked to come in for a two hour shift does not avoid it either. These provisions are among the most commonly ignored.

## How are tips treated?

As taxable income, whatever form they arrive in, and they do not reduce what the employer owes you. Tipping in Australia is voluntary and modest by international standards, so it supplements a wage rather than substituting for one.

The distinction that matters is how the tip reached you. Card tips and service charges run through the venue's payroll, so tax is withheld and they appear in your income statement automatically. Cash handed to you directly is reported by nobody, so declaring it on your [tax return](/tax-return) is your responsibility, and a weekly note is enough of a record. Our guide to [tax on tips](/blog/do-working-holiday-makers-pay-tax-on-tips) covers both.

## Which underpayments are most common?

The Fair Work Ombudsman has found the same pattern in restaurant service for years. Each item is separately recoverable and easy to miss on its own.

- A flat hourly rate paid across all days, with no penalty rates at all
- Workers held at Introductory level past three months
- Experienced waiters classified at Grade 1
- Public holiday loading refused or quietly omitted
- Pre shift setup and post shift clean up not paid
- Charges for uniforms, laundry or breakages, which are generally unlawful
- Cash payment with no payslip and no [super](/superannuation)
- Unpaid trial shifts running to a full evening

The weekly check that catches most of them takes two minutes: shifts worked, at the correct loaded rates, plus allowances, compared against the payslip. Our guide to [unlawful deductions](/blog/uniform-laundry-deductions-illegal-australia) covers the uniform and breakage side.

## Does serving alcohol change your position?

Yes, twice over. You need an RSA certificate before you can serve alcohol at all, which is a short course you generally pay for yourself. It is deductible only if you take it for work you are already doing, not when you take it to get the job.

It also affects your classification. Pouring drinks is Grade 2 work under the Restaurant Industry Award, so a waiter with an RSA who covers the bar should be paid at Grade 2 even when the roster describes the shift as waiting. The RSA is documentary proof of the capability the grade is built around. Our guide to [RSA certificates](/blog/rsa-certificate-australia-working-holiday) covers what it costs.
`,
 }, {
 slug: "kitchen-hand-working-holiday-australia",
 title: "Kitchen Hand Jobs: Pay and How to Start",
 description:
   "No certificates needed - kitchen hands start fast and earn award minimums plus penalties. Typical duties, pay rates and moving up to cook roles.",
 category: "Work Rights",
 date: "19 April 2026",
 readTime: 5,
 body: `
Kitchen hand work is the most accessible way into Australian hospitality, needing no qualification and available in almost every venue. Pay is set by the Restaurant Industry Award or the Hospitality Award depending on the venue, at the lowest classification in either. Penalty rates still apply, and they are where the money actually is.

## What does the job actually involve?

Back of house support during service: dishwashing plus whatever the kitchen needs. Operating the commercial dishwasher, basic preparation such as peeling, chopping and portioning, receiving deliveries and stocking the cool room, cleaning down surfaces and floors, and supporting the chefs through the rush.

It is physical, hot and relentless during service, and where most working holiday makers start.

## Which award covers you, and at what level?

Whichever award covers the venue. Restaurants generally sit under the Restaurant Industry Award, pubs, hotels and clubs under the Hospitality Industry (General) Award, and the classification structures differ.

- Introductory level, for the first period with no industry experience
- Kitchen Attendant Grade 1, covering dishwashing, cleaning and simple preparation
- Kitchen Attendant Grade 2, covering more responsible preparation and working a station with the chefs

Classification follows duties rather than job titles. If you are regularly prepping food or running a section, Grade 1 is no longer the correct classification, and the difference is paid for every hour you work.

## What does it pay once penalties are included?

The base is the lowest in the award, the actual earnings are not, because kitchen hands work exactly the hours that carry penalties. Evenings, Saturdays, Sundays and public holidays each carry a penalty, and under the Restaurant Industry Award the casual weekend and public holiday rates already include the 25% casual loading.

From 1 July 2026 the casual floor across all work is $33.05 an hour, being the $26.44 national minimum with the loading, and award rates sit above that. A casual on Friday and Saturday dinner service earns well above the headline base rate, and a public holiday shift at up to double time and a half is the highest paid work available with no qualifications.

## Why is this role underpaid so often?

Because the shift boundaries are blurry and the workers are usually new to the country. The Fair Work Ombudsman has repeatedly identified hospitality as high risk for underpayment, and the patterns are consistent.

- A flat hourly rate said to cover everything, with no penalty rates applied
- Public holiday loading simply not paid
- Cash payment with no payslip and no superannuation
- Unpaid set up time before the rostered start
- Unpaid clean down after service, which can run an hour after front of house has gone home
- Breaks recorded as taken when they were worked through
- Experienced kitchen hands left at the entry classification indefinitely

Clean down time is the one specific to this job. Kitchen hands finish last, and an employer rostering to service end rather than actual finish underpays every shift by the same amount.

## What are the safety and injury rules?

Kitchens carry higher than average injury rates, and every injury sustained during paid work is covered by workers compensation regardless of visa status. Cuts, burns, slips on wet floors, back strain from stock and repetitive strain from prolonged dishwashing are the common ones.

An employer cannot lawfully pressure you not to claim, and a working holiday visa does not affect the entitlement. Our guide to [workplace injury rights](/blog/workplace-injury-working-holiday-rights) sets out how a claim works.

## What can a kitchen hand claim at tax time?

Less than a tradesperson and more than nothing. Non slip work shoes, an apron or work clothing where it is required and not provided, knife sharpening if you supply your own knives, and the work related share of phone costs.

From the 2026-27 income year there is also a $1,000 standard deduction without receipts for eligible people (not for 2025-26 returns), which can exceed what a kitchen hand could substantiate. Our guide to [the $1,000 standard deduction](/blog/1000-dollar-instant-deduction-rule-2026) explains who it is for and when itemising may be better.

## How do you move up from kitchen hand?

By taking on duties and then insisting the classification follows them. Progression runs kitchen hand to Kitchen Attendant Grade 2 with real preparation responsibility, then Cook Grade 1 once you are running a station, and front of house roles open up once you hold an RSA.

Note what you actually do across a fortnight, compare it against the award's classification descriptions, and ask payroll for a reclassification in writing. Each step is a different rate for every hour worked, and it does not happen automatically.

## What separates your pay from the next hand?

The role is the same everywhere, and what you are paid for it is decided by your venue and roster.

- Which award covers the venue, since restaurants and pubs sit under different instruments.
- Which classification your actual duties correspond to, rather than the title on the roster.
- Whether you are casual, which brings the 25% loading, already built into the casual weekend and holiday rates under the Restaurant Industry Award.
- Which hours you work, since evenings, weekends and holidays are where most of the earnings sit.
- Whether clean down time after service is rostered and paid.
- Whether an enterprise agreement applies, which is common in larger hotel groups.

The withholding across every venue you worked at reconciles in your [working holiday tax return](/tax-return) at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 },

// ─── CONSTRUCTION ─────────────────────────────────────────────────────────
 {
 slug: "construction-laborer-working-holiday-australia",
 title: "Construction Labouring: White Card and Pay",
 description:
   "Construction pays among the best backpacker wages - after the mandatory White Card. Award rates, site rules, safety rights and tax deductions for gear.",
 category: "Work Rights",
 date: "29 April 2026",
 readTime: 6,
 body: `
Construction labouring pays better than almost anything else open to a working holiday maker without a trade, and a White Card is required before you set foot on a site. Your rate is set by the Building and Construction General On-site Award (MA000020). What actually decides your pay is your classification under it, plus allowances most backpackers never see.

## What is the work?

General site labour, which covers carrying and moving materials, concreting, site clean up, demolition, scaffolding assembly, earthworks support and trades assistant work alongside carpenters, plumbers and electricians. It is physical, outdoors, and paced by whoever is running the site.

Construction carries higher injury rates than almost any other sector working holiday makers enter, which is why the induction is compulsory, why the personal protective equipment is not optional, and why workers compensation matters more here than in a cafe.

## Why do you need a White Card first?

Because it is unlawful to be on a construction site without one, for you and for the employer. It is issued on completion of the General Construction Induction course, which runs as a full day in person or as an online equivalent, and it is recognised in every state and territory once issued.

The card does not expire, but it lapses if you do no construction work for two years, which matters only if you come back later. The course fee is set by the training organisation rather than by the government, so it varies by state and provider and is worth comparing. The fee is deductible only where you take the course for construction work you already have, not to get your first site job. Our guide to [White Card requirements](/blog/white-card-australia-working-holiday) covers the state by state detail.

## What decides your hourly rate?

Your classification level under the award, and it is the number nobody tells you. The Building and Construction General On-site Award sets rates by Construction Worker level, rising with the skills and responsibilities the role actually involves. Being paid at CW1 while doing CW3 work is a common and entirely invisible underpayment.

Then the loadings apply on top. Casual employment carries a loading in place of leave, Saturday, Sunday and public holiday work attract penalty rates, and overtime is paid at a multiple of the ordinary rate. A week with a Saturday in it should look materially different on a payslip from one without, and if it does not, that is the first thing to ask about. Our guide to [award classifications](/blog/award-classifications-working-holiday-australia) covers how to find the level that matches your actual duties.

## Which allowances go unpaid?

The industry allowance, more than any other. It is paid to every construction worker on the award rather than to a select few, so there is no qualifying test to fail, and its absence from a payslip is the single most reliable sign that the award is not being applied properly.

Several others attach to particular circumstances rather than to everyone.

- Tool allowance, where you supply your own tools
- Site allowance, on some major projects
- Height allowance, for work above set heights
- Wet weather allowance, where work continues through heavy rain
- First aid allowance, for the designated first aid officer
- Travel allowance, where the site is distant from the depot

## What happens if you are put on an ABN?

Everything that protects you stops applying. Labour hire on construction sites is common and some of it is genuine contracting, but a labourer with set hours, supplied tools, a supervisor directing the work and no other clients is an employee whatever the invoice says.

Misclassification costs you the 12% [super](/superannuation), workers compensation cover if you are hurt, the casual loading, penalty rates and award allowances. On a site where injury risk is genuinely elevated, the workers compensation half is the one that matters most. Our guide to [employee versus contractor](/blog/employee-vs-contractor-australia) sets out the test, and the [labour hire](/blog/labour-hire-agencies-working-holiday-australia) guide covers who legally employs you when an agency is involved.

## What happens if you are injured on site?

Workers compensation covers you from the first shift, with no minimum service period and no relevance to your visa. It covers medical treatment, weekly payments while you cannot work, and lump sums for permanent impairment.

Both things that go wrong happen in the first 48 hours. An injury not reported to the employer at the time is much harder to establish later, and treatment sought without mentioning that it happened at work starts a medical record that does not connect to the claim. An employer discouraging a claim is acting unlawfully, and visa status is not a relevant consideration at any point. Our guide to [workplace injury rights](/blog/workplace-injury-working-holiday-rights) covers the framework.

## What can you claim at tax time?

More than most working holiday maker roles, because construction requires you to buy things. Steel capped boots, high visibility clothing, a hard hat and gloves where you supply them, sun protection for outdoor work, hand tools, and the White Card course fee where you took it for a job you already had, are all work related expenses.

Whether you itemise them depends on the financial year. For 2026-27 onwards the [$1,000 standard deduction](/blog/1000-dollar-instant-deduction-rule-2026) may be an alternative to substantiating the actual amount where it applies to you, and construction is one of the few backpacker occupations where the real total genuinely exceeds $1,000, so keeping receipts from day one is worth doing. Travel between two sites in a day is deductible; the commute from home to the first site is not.

What you can claim for this work is worked out on your [working holiday tax return](/tax-return), together with every job you held that year.
`,
 },

// ─── GIG ECONOMY ─────────────────────────────────────────────────────────
 {
 slug: "uber-eats-delivery-rider-working-holiday-australia",
 title:
 "Uber Eats on a working holiday visa: ABN, tax and claims",
 description:
 "Delivery riding is contracting, so you need an ABN and nothing is withheld. What to set aside, when GST applies, and what the bike is worth at tax time.",
 category: "Work Rights",
 date: "12 May 2026",
 readTime: 6,
 body: `
Food delivery is contracting, not employment. You need an [ABN](/abn), nothing is withheld from your payouts, and the tax arrives as a single bill at assessment. GST does not apply to delivery until turnover passes $75,000, unlike passenger rideshare, where it applies from the first dollar.

## Why is delivery treated as contracting rather than a job?

The platform buys a completed delivery, not your time, so it pays you as a business rather than as an employee. That classification decides everything else: no PAYG withheld, no employer superannuation, no award rate, no workers compensation by default, and an ABN required before you can be paid.

Without an ABN on the account, the payer must withhold at 47% under the no ABN withholding rule, a higher rate than the 45% that applies to wages without a TFN. Our guide to [what an ABN is](/blog/what-is-an-abn) covers when the classification is legitimate and when it is being used to avoid employing you.

## How is delivery income actually taxed?

Delivery income is taxed through your return in the same way as wages, at the rates that apply to your circumstances for the year, which the ATO decides and our team reviews when preparing the return. The difference is timing, not rate: nothing is withheld through the year, so the whole amount falls due when the [tax return](/tax-return) is assessed.

Wages arrive already taxed, so the money in the account is yours. Platform payouts arrive untaxed, so part of the balance belongs to the ATO and has simply not been collected yet.

## When does GST actually apply to you?

GST applies to delivery only once turnover from the work exceeds $75,000 in a financial year, which very few working holiday riders reach. Passenger rideshare is the exception in Australian GST law: driving passengers requires GST registration from the first dollar, regardless of turnover.

The trap is doing both. Driving passengers as well as delivering food pulls your whole gig income into the GST system, so a few Uber passenger trips can change the treatment of a year of delivery work. Our guide to [driving Uber on a WHV](/blog/uber-driver-working-holiday-australia) sets out that boundary.

## What can a delivery rider claim?

Deductions are where delivery work becomes worth doing, because the gross figure on a platform statement bears little relation to what you are taxed on. Vehicle, equipment and phone are all partly or wholly deductible, and platform service fees deductible in full.

- **Bicycle or e-bike**: depreciation over its effective life, repairs, tyres, chains, brake pads, and charging for an e-bike
- **Motorcycle or scooter**: fuel, registration, insurance, maintenance and depreciation, at the work percentage
- **Car**: cents per kilometre up to 5,000 km, or the logbook method, which our guide to [the 12 week logbook](/blog/vehicle-logbook-abn-working-holiday) explains
- **Equipment**: delivery bag, helmet, lights, lock, panniers, phone mount
- **Phone**: the work share of the plan and of the handset cost
- **Platform service fees** deducted by Uber, DoorDash or Menulog

The income side of a delivery return is fixed, because platforms report your earnings to the ATO under the sharing economy reporting regime and the data is matched against what you lodge. The deduction side is where anything is decided.

## What records make the difference?

The ones that turn a plausible percentage into a defensible one. Platform annual statements establish the income; the kilometre log and the receipts establish everything you subtract from it.

- The annual statement from each platform you rode for
- Bank statements showing the payouts
- Receipts for the bike, the equipment and the phone
- A logbook or a representative period for work use of anything shared with private life
- Total kilometres ridden for delivery

The riders with the worst outcome are not the ones who claimed too much. They are the ones who kept nothing, took the conservative figure to be safe, and paid tax on income they never really had.

## Are you covered if you are injured?

Riders with an ABN are contractors, so workers compensation does not apply automatically as it would to an employee. Cover depends on what the platform provides and what you bought yourself, and is generally narrower than an employee would have for the same accident.

Some platforms carry an injury insurance product that operates while you are on an active delivery. Personal accident cover and the bicycle itself are separate purchases. Our guide to [workplace injury rights](/blog/workplace-injury-working-holiday-rights) explains where the line falls.

## How do the platforms differ for tax?

They pay differently and report identically. Uber Eats, DoorDash and Menulog all report annual earnings to the ATO, so what differs is the fee structure and how each statement presents the numbers. Some show gross earnings before the service fee and some show net, so adding three statements together without checking which basis each uses is a common way to misstate a year.

Riding for several platforms at once, which most riders do, needs one habit: keep each platform's annual statement separately rather than working from bank deposits. Deposits net off fees, adjustments and incentives in ways that cannot be unpicked afterwards, while the ATO holds the gross figures.

## What decides whether your year ends well or badly?

Four things, and none of them is how many hours you rode. Whether you set money aside as you went, because the bill lands in one piece. Whether you also had wage income with tax withheld, since that withholding can absorb some or all of the ABN liability. Whether you drove passengers at any point, which changes your GST position. And whether you kept the records that support the deductions.

Setting aside 15% to 25% of every payment, in a separate account, is the difference between a year that closes cleanly and one that closes with a debt you are trying to clear from another country. Our guide to [ATO payment plans](/blog/ato-payment-plan-tax-debt-australia) covers what happens if that is where you already are.
`,
 }, {
 slug: "uber-driver-working-holiday-australia",
 title: "Driving Uber: ABN and GST From Dollar One",
 description:
   "Rideshare requires an ABN and GST registration regardless of income, unlike delivery. What you need to drive, quarterly BAS, car deductions and visa rules.",
 category: "Work Rights",
 date: "15 May 2026",
 readTime: 6,
 body: `
Rideshare carries the strictest tax rules of any gig work in Australia. You need an ABN, you must register for GST from the first fare regardless of turnover, and you must lodge quarterly Business Activity Statements. That first dollar GST rule is what separates rideshare from food delivery, and it is what builds unexpected debts.

## Why does rideshare have its own GST rule?

Because passenger transport is treated as taxi travel for GST, and taxi travel has no registration threshold. Ordinary ABN work needs GST registration only once turnover passes $75,000 a year. Rideshare needs it from the first fare, whether you earn $500 or $50,000.

It applies to Uber, Ola, Didi and any platform carrying passengers for a fare. It does not apply to Uber Eats, other food delivery, or parcel and logistics work, which follow the standard threshold. Our guide to [delivery riding](/blog/uber-eats-delivery-rider-working-holiday-australia) covers that side.

The rule catches multi appers: carry passengers at all and the obligation is triggered, then sits over your whole enterprise.

## What does GST registration actually require of you?

One eleventh of every fare belongs to the ATO, remitted through a quarterly Business Activity Statement. GST credits on business expenses bring the net cost well below the headline fraction.

You do not add GST to a price: the platform sets the fare and reports the gross. You remit the GST component of what you were paid and claim credits on fuel, servicing, parts and vehicle finance. For an active driver the net cost after credits is usually well below one eleventh of fare income.

Ignoring it creates the debts people arrive with. A driver who worked six months without lodging a statement can face backdated liability on every fare taken.

## When are the statements due?

Quarterly, on a fixed calendar. July to September is due 28 October, October to December is due 28 February, January to March is due 28 April, and April to June is due 28 July.

Lodging through a tax agent typically extends those dates. Missing one triggers failure to lodge penalties on the same basis as a late return, charged per 28 days overdue. Our guide to [late lodgement penalties](/blog/late-tax-return-penalty-working-holiday) covers how those are calculated.

## What do you need before you can drive at all?

Two things beyond the ABN: a compliant vehicle and a state driver authorisation. The platform sets vehicle requirements, generally a four door sedan, hatchback, SUV or wagon under a maximum age, registered, roadworthy, comprehensively insured and inspected.

The authorisation is a state matter, separate from your ordinary licence. New South Wales requires a Passenger Transport Authorisation, Victoria a Commercial Passenger Vehicle accreditation, Queensland a Driver Authorisation, South Australia a General Passenger Transport Accreditation, Western Australia a PTD authorisation and the ACT a Public Vehicle Licence. Each generally involves a police check, a medical assessment and a fee, and the fee is deductible.

Drivers without a suitable car sometimes rent one through a rideshare rental scheme, and the rental cost is deductible.

## What can you deduct?

More than almost any other backpacker work, because the vehicle is the business.

- Fuel, servicing, repairs, tyres and oil
- Vehicle finance interest, at the work related portion
- Registration, compulsory third party and comprehensive insurance, at the work related portion
- Depreciation, or the rental cost if the car is leased
- Tolls and parking incurred while driving
- Mobile phone and data, plus the device, at the work related percentage
- Phone holder, dash cam and in car accessories
- Vehicle cleaning
- Platform service fees taken by the app
- Driver authorisation and medical fees

Vehicle costs go through the cents per kilometre method, capped at 5,000 kilometres a year, or the logbook method, uncapped but requiring twelve continuous weeks of records. Full time drivers clear the cap within months, so the logbook is almost always worth substantially more. Our guide to [vehicle logbooks](/blog/vehicle-logbook-abn-working-holiday) covers what one has to contain.

## Does the ATO already know what you earned?

Yes. Platforms report driver earnings directly under the Sharing Economy Reporting Regime, so the gross figure sits in ATO systems before you lodge anything and is matched against your return.

The record you need is not proof of income, which already exists, but proof of expenses, which exists nowhere except in what you kept.

## How much should you set aside as you go?

Enough for two separate obligations. The GST component of your fares belongs to the ATO and is remitted quarterly. The income tax on your profit is a second amount, assessed at the end of the year.

Neither is withheld for you. A driver who treats the whole platform deposit as earnings has spent both, and finds out at the first Business Activity Statement rather than at lodgement. Setting aside from each week, into an account you do not touch, is what works when you earn weekly and pay quarterly.

## What has to happen when you stop driving?

Two closures, and people usually do neither. The GST registration has to be cancelled with a final Business Activity Statement, and the ABN cancelled, dated to when you actually stopped rather than the day you remembered.

An open GST registration keeps generating quarterly obligations for a person who has left the country, and those accumulate failure to lodge penalties in your absence. Our guide to [cancelling an ABN](/blog/how-to-cancel-your-abn) sets out what should be finished before the cancellation date.

## What decides what a year of rideshare driving costs you in tax?

The registration rules are not optional, but what the year costs depends on how you drove it. The first two points create debts rather than refunds.

- Whether you carried passengers at all, which triggers GST from the first fare.
- Whether you registered for GST and lodged the quarterly statements, or accumulated a backdated liability.
- Whether a twelve week logbook exists, which decides how much of the car is claimable.
- Whether the vehicle is owned, financed or rented, which changes what enters the pool.
- Whether you also had wages, whose withholding often absorbs the tax on the driving income.
- How much you set aside as you went, given nothing was withheld from any fare.
- Whether the ABN and the GST registration were cancelled when you stopped.

The whole position is worked out in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know what the driving actually earned.
 `,
 },

// ─── SEASONAL / TOURISM ──────────────────────────────────────────────────
 {
 slug: "ski-resort-jobs-working-holiday-australia",
 title: "Ski Season Jobs in VIC and NSW",
 description:
   "Resort jobs run the southern winter - lifts, hospitality, instructing. Pay under the awards, staff housing realities, and applying from March.",
 category: "Work Rights",
 date: "16 May 2026",
 readTime: 6,
 body: `
Australia's ski season runs June to September across Thredbo, Perisher and Charlotte Pass in New South Wales and Hotham, Falls Creek and Buller in Victoria. Hiring happens in one autumn wave, months before the snow. Two things decide whether a season pays: which award covers your role, and what the staff accommodation costs you.

## What roles do resorts hire for?

More than the obvious ones, and the pay differs sharply. Lift operations, ski and snowboard instruction, ski patrol, hospitality across bars and restaurants, accommodation housekeeping and reception, retail in hire and clothing shops, snowmaking and grooming on overnight shifts, and ticketing and bookings.

Two require qualifications before you apply: instruction, which needs Australian Professional Snowsport Instructors certification or a recognised international equivalent, and patrol, which needs both medical and snow qualifications. Everything else is trainable on site, which is why lift operations and hospitality take the largest share of working holiday makers.

## When do you have to apply?

March and April, for a season starting in June. Resorts recruit in a single autumn wave and most positions are filled before the first snow, so an application in May competes for whatever is left.

Staff accommodation is allocated with the early offers. Housing on or near the mountain is scarce, and an offer without it turns a profitable season into an expensive one. What improves your odds is an RSA already in hand for hospitality roles, prior snow experience for lift operations, and flexibility about which department you land in.

## Which award covers you?

The one that matches the work, not the fact that it happens on a mountain. The same resort employs people under three or four different instruments at once.

- Hospitality roles: the [Hospitality Award](/blog/hospitality-award-working-holiday-makers), with evening, weekend and public holiday penalties
- Retail in hire and clothing shops: the General Retail Industry Award
- Lift operations: commonly the Amusement, Events and Recreation Award, or a resort enterprise agreement
- Instruction: arrangements specific to the resort or ski school
- Snowmaking and grooming: overnight and shift loadings apply

Weekends are the resort's peak, so casual staff commonly work Friday through Sunday, precisely when penalty rates are highest. A roster loaded towards the weekend is worth materially more than the same hours midweek.

## What should you check about staff accommodation?

The deduction, in writing, before you accept. Some resorts provide accommodation free or heavily subsidised, some charge a weekly rent taken out of wages, and some leave you to find your own where there is almost nothing available.

Where rent is deducted it has to be a lawful deduction: agreed in writing, reasonable, and shown on the payslip. Work out the net figure before you commit, the wage less the accommodation charge divided by the hours you will genuinely be rostered, against a job in town. Our guide to [what deductions from wages are lawful](/blog/uniform-laundry-deductions-illegal-australia) covers the test.

## Does ski work count towards the second year visa?

Generally no, and this is where people are most often misinformed. Tourism and hospitality work counts as specified work only in northern Australia or in designated remote and very remote areas, and the alpine resorts in New South Wales and Victoria do not sit in those zones.

So a season pulling beers at Thredbo is unlikely to advance your 88 days. Some construction and maintenance work at a resort can fall into an eligible category on its own terms. Because the postcode lists and eligible categories are set by Home Affairs and change, verify your specific role and location against their current lists before you rely on a ski season for a second year.

## Are you covered if you are hurt on the mountain?

Yes, as an employee. Workers compensation covers medical treatment, weekly payments while you cannot work and lump sums for permanent impairment, from the first shift, with no relevance to your visa.

The injuries are not only the dramatic ones. Falls during instruction or patrol, slips inside resort buildings, lifting injuries in hire shops fitting gear all day, and cold related injuries on overnight snowmaking shifts are the pattern. Report anything at the time rather than at the end of the season, because an injury not recorded when it occurred is far harder to establish later. Our guide to [workplace injury rights](/blog/workplace-injury-working-holiday-rights) covers the framework.

## What can you claim at tax time?

More than most seasonal roles if you instruct, and very little if you do not. The ordinary ones are sun protection, non slip footwear for indoor roles, uniform items you had to buy, a work share of your phone, and travel between separate mountain locations during a working day.

Instructors are the exception. Fees for renewing or upgrading an instructing qualification you already work under (not the first one that got you the job), goggles and eyewear used for the role, and your own skis or board used in instruction are deductible, with apportionment for personal use. Equipment used 60% for instruction and 40% for your own runs is 60% deductible, and the apportionment has to be honest and recorded. A concentrated three or four month season can also sit alongside other income in the same financial year, worth knowing before the [tax return](/tax-return) is prepared.
`,
 },

// ─── RETAIL ──────────────────────────────────────────────────────────────
 {
 slug: "supermarket-work-coles-woolworths-working-holiday",
 title: "Coles and Woolworths Jobs: Award Pay",
 description:
   "Supermarket work offers steady hours and reliable award wages - a rarity in backpacker jobs. Rates, night/weekend penalties and how to apply.",
 category: "Work Rights",
 date: "23 May 2026",
 readTime: 6,
 body: `
Supermarket work is covered by the General Retail Industry Award (MA000004), but at Coles and Woolworths an enterprise agreement usually applies instead. Which instrument covers you decides your rate, your penalties and what a missing loading is measured against. Your classification level within it decides the rest, and it follows your duties rather than your job title.

## What roles do the supermarkets hire for?

A wider range than the checkout, and the shifts pay differently. Checkout and customer service, grocery filling during trading hours, overnight replenishment, the fresh departments of deli, bakery, butcher and seafood, liquor where an RSA is required, online order picking, receiving and dock work, trolley collection and in store cleaning.

The chains hire continuously across most of these in every city, which is why supermarket work is the fallback that is nearly always available. Online order picking and trolley collection turn over constantly, and availability on evenings and weekends is what gets an application looked at.

## What decides your pay rate?

Two things in sequence. First, whether the store is covered by the General Retail Industry Award or an enterprise agreement: Coles and Woolworths both operate under agreements that replace the award, while ALDI applies the award more directly. Second, your classification level within whichever applies.

The classification is where working holiday makers lose money quietly. Level 1 covers standard duties, Level 2 broader responsibilities, Level 3 delegated authority and training others, and the level follows what you actually do rather than how long you have been there. Someone training new starters and running a department while classified at Level 1 is being underpaid, and it is invisible on a payslip unless you know the levels. Our guide to [award classifications](/blog/award-classifications-working-holiday-australia) sets out the test.

## What does an enterprise agreement change?

It replaces the award entirely for the workers it covers, and can restructure the penalty rates rather than simply lifting the base. Agreements generally set base rates above the award and adjust the loadings up or down, along with different rules for breaks and overtime.

The protection is the Better Off Overall Test, which requires each employee to be better off under the agreement than under the award. It is applied by the Fair Work Commission at approval, which is why an agreement with a lower Sunday loading can still be lawful if the base rate more than compensates. So comparing your Coles payslip against the General Retail Award proves nothing: the agreement is the document to check, and it is published on the Fair Work Commission website.

## Why do overnight shifts pay so much better?

Because the loadings stack. Overnight replenishment, typically running from around 10pm to 6am, attracts shift loadings well above daytime rates, and in some agreements a daily allowance on top of that.

Overnight shifts also run as one continuous block rather than the split patterns common in hospitality, so eight paid hours is eight hours rather than a lunch shift, a four hour gap and a dinner shift. That combination of higher rate and unbroken hours is usually worth more than a daytime roster at a nominally similar job.

## What goes wrong even at the big chains?

Less than in hospitality, but not nothing. Payroll at the majors generally works: super arrives, payslips are itemised, rosters appear in advance. The problems are in classification and at the edges of the penalty structure.

- Public holiday loading missed where the holiday fell on a normal rostered day
- Classification left at Level 1 while the duties have long since expanded
- Pre shift setup or post shift time not paid
- Overnight loading not applied to a shift that crossed the trigger time
- State specific public holidays not recognised for a worker who moved interstate

Most of these are fixed through the employer's own payroll process once raised with the payslip in hand, and Fair Work is the route if that fails.

## Are you covered if you are injured?

Yes, from the first shift, with no minimum service and no relevance to your visa. Retail injuries are less dramatic than construction ones and no less real: back injuries from lifting stock, slips on wet floors, cuts in deli and bakery work, repetitive strain from scanning.

Report it at the time. An injury recorded in the store's incident book the day it happened supports a claim; the same injury raised three weeks later is much harder to connect to work. Our guide to [workplace injury rights](/blog/workplace-injury-working-holiday-rights) covers the framework.

## What can supermarket workers claim?

Not much. Supermarket work supplies most of what you need, so the genuine deductions are non slip shoes, any required clothing not provided, laundry of a provided uniform where the employer does not launder it, an RSA renewal you paid for while already working in liquor, and a work share of phone costs for shift coordination.

Staff discounts are not a tax matter in either direction. They are a minor benefit rather than taxable income, not deductible as a cost saved, and do not count towards award compliance, so a discount card is not a substitute for the correct hourly rate. Our guide to [deductions for working holiday makers](/blog/tax-deductions-working-holiday-makers) covers what does qualify.

Supermarket wages, penalty rates included, go on your [working holiday tax return](/tax-return) with every other job you held that year.
`,
 },

// ─── REMOTE / OUTBACK ─────────────────────────────────────────────────────
 {
 slug: "station-hand-cattle-station-working-holiday-australia",
 title: "Station Hand Jobs: Pay, Board and Visa Days",
 description:
   "Cattle station work bundles wages with meals and lodging - check the deductions are lawful. Pay under the Pastoral Award and second-year visa rules.",
 category: "Work Rights",
 date: "26 May 2026",
 readTime: 7,
 body: `
Station work is covered by the Pastoral Award, MA000035, counts toward the 88 days of specified work for a second year visa, and almost always comes with accommodation and meals included. The pay looks low against city work until you account for the package.

## What does the work actually involve?

Livestock and infrastructure, in whatever proportion the season demands. Mustering on horseback, motorbike or buggy, cattle handling in the yards including drafting, drenching, branding and vaccinating, calving and newborn care, fencing, bore and water trough maintenance, machinery and tractor operation, and general property upkeep.

Larger stations also carry a camp cook role and, less commonly, station administration. What you do depends on the type of property, the region and the season.

## Where are the stations, and when do they hire?

The four main regions each run on their own calendar. The Northern Territory covers the Barkly Tableland, the Victoria River District and the Top End. Western Australia covers the Kimberley, the Pilbara, the mid west and the southern wheatbelt. Queensland covers the Channel Country, the north west and the Gulf. South Australia covers the far north and Eyre Peninsula.

The north runs on wet and dry seasons, and mustering happens in the dry. The south runs on hot summers and cooler winters. That difference determines when work is available.

## What does the Pastoral Award set?

Minimum hourly rates by classification, along with conditions. Farm and Livestock Hand Level 1 covers new workers on basic tasks under supervision, Level 2 experienced workers with some autonomy, and Level 3 skilled workers operating machinery or leading small teams, with higher levels through leading hands and head stockmen. Separate classifications exist for shearing, shed work and broadacre cropping.

The award rate is a floor, not a going rate. From 1 July 2026 the casual minimum across all work is $33.05 an hour, being the $26.44 national minimum plus the 25% loading, and pastoral classifications run above that as experience is recognised. Many stations operate under enterprise agreements or individual arrangements, which must still leave you better off overall than the award.

## How does the all found arrangement work?

The station provides a room in staff quarters or the homestead, meals from the station kitchen or rations for remote camps, and pays a cash rate for everything else. That is the all found arrangement, standard in rural Australia.

Where accommodation and meals are deducted from wages, the deduction has to be lawful and within award limits. Where they are genuinely provided, remote area fringe benefits concessions frequently apply to properties in genuinely remote locations, which can make the package more tax efficient than the cash figure suggests. Living away from home allowances apply in some classifications.

## Does it count toward the second year visa?

Yes, provided four conditions hold. The work must be in a designated regional postcode, which most stations are. It must fall within the specified work categories, and animal cultivation including livestock does. It must be paid. And it must be documented, with payslips and with income reported to the ATO.

Documentation is where second year applications fail, not the work. A station that pays partly in cash, or never issued payslips, leaves you with the days worked and no evidence of them.

## What happens if you are injured out there?

Workers compensation covers every employee on a station regardless of remoteness or length of service, and it covers evacuation costs. It pays medical treatment, weekly payments while you cannot work, and lump sums for permanent impairment.

Station work carries higher injury rates than most industries: animal handling injuries from kicks, crushing and falls, vehicle and machinery incidents on rough ground, heat illness, snake encounters, and the isolation that makes any of them worse. The Royal Flying Doctor Service is sometimes the only access to care. Our guide to [workplace injury rights](/blog/workplace-injury-working-holiday-rights) covers how a claim runs.

## What can a station hand claim at tax time?

More than most working holiday roles, because station hands supply real gear. Work boots and riding boots, a protective hat, long sleeved work clothing and sun protection, gloves, personal tools such as a knife or fencing tools, and saddle and tack where you provide your own.

The test is whether the item is principally for the work rather than personal use. From the 2026-27 income year a $1,000 standard deduction may also be available without receipts where it applies to you (not for 2025-26 returns), which can be simpler than itemising.

## What should you settle before you accept a job?

The terms, in writing, because renegotiating from a property four hours from the nearest town is not a real option. Confirm the classification and hourly rate, whether accommodation and meals are provided or deducted, what the deduction is, the expected hours and days, and how and when you will be paid.

Ask specifically about payslips and superannuation. Both are legal requirements rather than favours. Confirm too that the postcode qualifies for specified work if the second year visa is part of your reason for going.

## How does the isolation affect getting paid correctly?

It makes verification harder rather than making the rules different. Mobile coverage is patchy, banking is intermittent, and checking a payslip against an award clause is a different exercise when the internet works for an hour a day.

So photograph every payslip as it arrives and keep a daily log of hours from the first week. Reconstructing four months of a muster season after you have left is close to impossible.

## What decides what a station job actually pays?

The award is the same everywhere. What you are paid is decided by the arrangement on the particular property.

- Which classification your duties correspond to, since Level 1 and Level 3 are materially different rates.
- Whether an enterprise agreement applies instead of the award.
- Whether accommodation and meals are provided or deducted, and whether any deduction is within award limits.
- Whether the property is remote enough for the fringe benefits concessions to apply.
- Whether the postcode and the work type qualify for the 88 days, and whether it is documented.
- Whether payslips were issued at all, which decides both the visa evidence and any wage claim.
- Whether 12% superannuation was paid on the cash component.

The year is reconciled in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) from what was actually withheld.
 `,
 },

// ─── NEW POSTS - BATCH 4: SUPER RATE UPDATE ──────────────────────────────
 

// ─── NEW POSTS - BATCH 5: MONEY TRANSFER + TAX DEBT (2 articles) ─────────
 {
 slug: "bringing-money-into-australia-10000-reporting-threshold",
 title: "Bringing $10,000 or more into Australia: declaring cash",
 description:
   "There is no limit and no tax on bringing money into Australia, but cash of A$10,000 or more must be declared at the border. What counts, and AUSTRAC.",
 seoTitle: "Bringing $10,000 into Australia: no tax, but declare cash",
 category: "Tax Return",
 date: "1 June 2026",
 readTime: 4,
 body: `
There is no limit on how much money you can bring into Australia, and bringing it in is not taxed. Physical currency of A$10,000 or more must be declared at the border, and international transfers are reported to AUSTRAC by the bank or transfer service. Reporting is monitoring, not taxation.

## What is the $10,000 rule actually about?

An anti money laundering rule administered by AUSTRAC, Australia's financial intelligence agency, to track flows of physical cash rather than to collect tax. Any movement of A$10,000 or more in notes and coins, or the foreign currency equivalent, into or out of Australia has to be reported.

The threshold covers cash carried on you, in luggage, in the post or by courier, and applies to everyone crossing the border. The report is made on a Cross-Border Movement Report.

International electronic transfers are reported by the bank or transfer service, and the $10,000 threshold is specifically about physical cash. You do nothing; the provider handles it.

## Does declaring create a tax bill?

No. AUSTRAC and the ATO are separate agencies, but the ATO can access AUSTRAC data, so a report is not hidden from it. A report does not itself create tax: bringing $25,000 of savings from Germany to start a working holiday is reported at the border and taxed nowhere.

The savings were earned before you arrived and are not Australian source income. Australian tax attaches to what you earn here. Our guide to [transferring money out of Australia](/blog/transferring-money-overseas-australia-tax) covers the same principle in the other direction.

## What if you keep the amount under $10,000?

Then no report is made, which is fine if that is simply how much you are moving. The threshold applies to each movement of cash rather than per year, so carrying $9,000 in notes needs no report and carrying $11,000 does. Bank transfers are different: international transfers are reported to AUSTRAC whatever the amount.

Deliberately splitting a larger amount to stay below the threshold is structuring, a criminal offence under the anti money laundering laws, with consequences far more serious than the report you were avoiding. The report itself costs you nothing.

## What about the bank interest side?

This is where an Australian bank account genuinely connects to your tax return. Australian banks report interest paid to the ATO, and the interest is declarable however small.

Without a TFN recorded, the bank must withhold tax on interest at the top rate, recoverable when the return is lodged. On an account earning a few dollars that is a rounding error, but it is why banks keep asking.

## What records are worth keeping?

Enough to answer one question: where the money came from. A home country bank statement clears that bar.

- A statement from your home bank showing the savings before transfer
- The AUSTRAC declaration receipt, if you declared cash at the border
- Documentation for a gift, a vehicle sale or an investment sale that funded the trip

The ATO can access AUSTRAC reports and receives Australian bank records, so a mismatch between visible funds and declared income can prompt a question. Ordinary explanations are easy to substantiate. The real difficulty is unreported Australian income, most often cash work that was never declared.

## How should you actually bring the money?

Through a regulated channel, which matters more for security than for tax. A bank transfer or licensed money transfer service leaves a record, arrives safely, and usually beats the exchange rate on carried notes. Currency of A$10,000 or more still has to be declared whichever way you carry it.

## Where does the real risk sit?

Not with the reporting or the tax. It sits with the scams targeting new arrivals, which cost backpackers far more than any AUSTRAC threshold.

The patterns recur: someone asking for your bank details and TFN in order to send you money, an unusually good exchange rate conditional on sending cash first, a job offer requiring an upfront payment, romance scams ending in transfers overseas. Regulated providers and licensed currency exchanges make all of these unnecessary. Our guide to [protecting your TFN](/blog/tfn-security-protect-from-fraud) sets out who is entitled to ask for your details.

## What counts as physical currency?

Notes and coins, in any currency, converted to Australian dollars at the time of movement. It is narrower than people assume.

- Notes and coins in any currency, including your home currency
- Cash in luggage, in the post, or sent by courier

Bearer negotiable instruments such as travellers cheques and money orders sit under a separate rule that applies only when you are asked. A debit card loaded with $30,000 is not physical currency and is not declared at the border, though the transfer that funded it was reported by the bank.

## What happens if you do not declare?

Undeclared currency over the threshold can be seized at the border on the spot, not fined later. Recovering it means explaining the source through a process far more demanding than the declaration.

The declaration itself creates no tax liability and no follow up in the ordinary case.

The same applies on the way out. Departing working holiday makers carrying wages, a refund and a super payment home in cash are sometimes over the threshold without realising. The outbound declaration works the same way.

## What decides whether any of this touches your tax return?

One fact: whether the money is savings or income. Savings brought in, gifts from family and proceeds of selling something at home stay outside the Australian tax system however they arrive. Money earned in Australia is inside it, whether it arrived as a bank transfer, as cash, or as an envelope from a farm.

Where it stops being simple is a year that mixes both, particularly cash work that was never reported alongside declared wages, and that is worth resolving properly when the [tax return](/tax-return) is prepared.
`,
 }, {
 slug: "ato-tax-debt-failure-to-pay-penalty-australia",
 title: "ATO Tax Debt: How the Interest Charge Works",
 description:
   "Unpaid tax grows through the General Interest Charge plus penalties. How interest accrues, remission requests, and payment plans that stop the bleeding.",
 category: "Tax Return",
 date: "6 June 2026",
 readTime: 4,
 body: `
An unpaid ATO debt grows through the General Interest Charge, which compounds daily from the original due date. The ATO can also offset the debt against refunds and refer it to a debt collector. Leaving Australia does not stop the interest, and the debt can be taken out of your super payment.

## Where do working holiday tax debts come from?

Almost never from wages, which arrive with tax already withheld. Debts come from income that arrived untaxed.

- ABN or contracting income with nothing withheld during the year
- An unpaid Business Activity Statement for a GST registered rideshare driver
- An amended assessment that increased the tax after the original return
- A penalty assessment for late lodgement or understated income

The most common version is a rideshare or delivery year where every payout was treated as spendable. Our guide to [driving Uber on a working holiday](/blog/uber-driver-working-holiday-australia) covers why a portion has to be set aside as it arrives.

## What is the General Interest Charge?

Daily compounding interest on an unpaid tax debt, set quarterly well above the cash rate and running at 11.51% a year for October to December 2026. It runs from the original due date until the debt is cleared and does not pause.

A $1,000 debt left for a year gathers roughly $115. Left for three years it gathers roughly $370, accruing while you live in another country.

## Is there a separate penalty for paying late?

For most individuals the cost of paying late is the General Interest Charge above, which keeps running. The ATO can also offset the debt against any refund and refer it to a debt collector.

This follows substantial debts, repeated non payment, and above all silence. Engaging with the ATO puts you in a very different position from ignoring three notices.

## How is this different from a late lodgement penalty?

They are independent systems that can both apply to the same year. Failure to Lodge is charged when the return itself is late, at $364 per 28 days up to five units. Interest is charged when the money is not paid by the due date.

Lodging late and paying late attracts both the penalty and the interest, and the combined total can exceed the tax originally owed. Our guide to [late return penalties](/blog/late-tax-return-penalty-working-holiday) explains where lodgement penalties actually bite, which is rarely when a refund was due.

## When is the debt actually due?

For an individual lodging through a registered agent, payment is generally due 21 days after the notice of assessment is issued. For self lodgers the date is typically 21 November following the end of the financial year. BAS debts are due when the BAS is due, 28 days after the end of the quarter for most lodgers.

The 21 day window catches people who lodge in April expecting a refund and get a bill. Know the position before the return goes in.

## What happens if you leave Australia owing money?

The debt does not travel with your passport but it does not disappear either. Interest keeps accruing daily, the debt can be offset against any future Australian refund, and it sits on your record when any future Australian visa is assessed.

The offset that hurts most is against your super. The ATO can set an outstanding tax debt against a DASP payment. DASP is already withheld at 65%, so less is left to absorb the debt than the gross balance suggests. A $4,000 super balance pays out about $1,400 after DASP withholding, and a $2,000 debt consumes all of it and leaves $600 outstanding. Resolving the debt before claiming is usually the better order.

## Can the interest or penalty be remitted?

Yes. The ATO has discretion to reduce or cancel the interest and any penalties where there are grounds.

- Genuine financial hardship that prevented payment
- An ATO administrative error that caused or contributed to the debt
- Circumstances outside your control, such as serious illness or a natural disaster
- A first instance of non payment against an otherwise clean history

A remission request has to be made specifically and supported with evidence. A general complaint about the amount is not a request.

## How do you find out what you actually owe?

The debt on a notice of assessment is a snapshot, not a running total, because interest accrues daily from the original due date. A figure quoted in a letter from four months ago is already wrong.

The current position also depends on every return and statement being lodged. An outstanding BAS quarter or earlier year leaves the debt on file incomplete, and sometimes overstated, since an unlodged refund year sits unclaimed and cannot offset anything.

## What does a payment plan actually change?

A payment plan stops collection action and converts the debt into instalments you can meet. It does not stop the interest, which keeps accruing on the declining balance, so a plan is a cash flow arrangement rather than a discount.

Short plans under twelve months are generally available on request. Longer ones require more documentation, and hardship arrangements exist separately. A plan requested before the due date is routine administration; the same request after eighteen months of silence is a much weaker negotiation.

## What order should you deal with this in?

Lodge everything first, establish the real figure, then deal with it. Reversing that order is how people pay interest on a wrong assessment, or clear a debt while an unlodged year that would have covered it sits unclaimed. Resolve the debt before any super claim.

## What decides how badly this goes?

Not the size of the original debt. It is how early you engage, and whether every outstanding return and statement has been lodged. Our guide to [ATO payment plans](/blog/ato-payment-plan-tax-debt-australia) covers the first, and the second is settled by getting the [tax return](/tax-return) and any BAS complete before you fly.
`,
 },
 {
 slug: "tax-back-australia-working-holiday",
 title: "Tax Back in Australia on a Working Holiday",
 description:
 "How working holiday makers claim tax back in Australia: what decides the size of a refund, what can be claimed, deadlines, and how it works from overseas.",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 8,
 body: `
Tax back is the amount withheld from your pay above what you actually owed, recovered by lodging a [tax return](/tax-return) after 30 June, or earlier if you leave Australia permanently. Your correct liability depends on the facts of your year, and whether anything comes back, and how much, depends on that year rather than on your visa.

## Why is there anything to claim back at all?

Because withholding is an estimate applied pay by pay, while your actual liability is calculated once, at the end of the year, on the whole picture. The two only match if nothing unusual happened, and for working holiday makers something unusual often does happen.

The way withholding is calculated depends on your individual circumstances, and the rate applied during the year is not always the rate your return is assessed at. Errors in it, a missing TFN, an unregistered employer, an early departure, can mean the wrong amount was taken.

## Which parts of your year create the refund?

Four specific things, each a fact about your own circumstances rather than a general entitlement.

- **A period at 45%.** Any weeks before your TFN reached the employer were withheld at 45% instead of 15%, and the difference may be dealt with through the return.
- **An employer not registered as a working holiday maker employer.** They must withhold at foreign resident rates, currently 30%, and the excess is reviewed when the return is prepared. Common on farms and with small businesses.
- **The Medicare levy exemption.** Some 417 and 462 holders are not entitled to Medicare and may be able to remove the 2% levy, depending on their circumstances, but it needs a Medicare Entitlement Statement from Services Australia rather than a tick box.
- **Work related deductions.** Tools, compulsory uniforms and their laundry, sun protection for outdoor work, RSA and White Card courses taken for a job you already had, and travel between two workplaces on the same day.

## How much should you expect?

Nobody can tell you before seeing what was withheld, and anyone who quotes a figure without that is guessing at your expense. The arithmetic is simple once the numbers exist: the tax withheld compared with the tax actually assessed, adjusted for any levy exemption and deductions.

The size of your refund is decided by how wrong your withholding was, not by how much you earned. Someone who earned $40,000 with correct withholding all year has less to reclaim than someone who earned $20,000 with six weeks at 45%. Our [tax refund calculator](/calculator) does the same sum if you have the payslip totals.

## When and how do you lodge?

The Australian tax year runs 1 July to 30 June, self lodgement is normally due by 31 October (the date for the 2025-26 year has now passed, and a late return can still be lodged), and an agent's lodgement program can extend that into the following May, but only if you were on the agent's client list before 31 October. Start mid July rather than 1 July, because income statements are not final until employers complete their reporting.

Lodging your own return is free. What it does not settle is the two items that move the number most: the residency position, which depends on your circumstances and has to be properly reviewed, and the Medicare levy position, which depends on your individual situation and supporting documents. An agent fee is itself deductible on the following year's return. From overseas the obstacles are identity verification and an open Australian bank account, neither a tax problem. The ATO says most online returns are processed in about 12 business days, and longer through the July to September peak.

## Can you claim for years you have already left?

Yes. A late return can still be lodged, and earlier working holiday years are reviewed regularly, including for people who left Australia years ago and assumed it was too late.

Two things before you assume it is free of consequence. The ATO generally does not apply a Failure to Lodge penalty where a late return ends in a refund, but several years left unlodged is where it does. And the income statements still exist in ATO systems regardless of what you kept, so missing paperwork is not the obstacle it feels like. Our guide on [late lodgement and the penalty rules](/blog/late-tax-return-penalty-working-holiday) covers where the line falls.

## What about your super?

A separate claim, and often the larger one. Your employers paid 12% of your ordinary earnings into a super fund throughout the year, and none of that is part of your tax refund.

The [Departing Australia Superannuation Payment](/superannuation) becomes available once you have left and your visa has ceased, and it pays out the balance less 65% withholding on the taxable component. Two people with identical tax outcomes can have very different super balances, depending on how much they earned and how many funds it was split between. It is the money most commonly left behind.
`,
 },
 {
 slug: "average-tax-refund-working-holiday",
 title: "How Much Tax Refund Do Backpackers Get?",
 description:
 "What decides the size of a backpacker tax refund, if there is one: how your tax was withheld, your circumstances and the deductions you can support.",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 8,
 body: `
There is no average worth quoting, because a refund is not a payment for being a backpacker. It is the gap between what your employers withheld and what you actually owed, which depends on the facts of your year. If the withholding was right all year, the gap is close to nothing. In many years it was not quite right.

## What actually decides the size of your refund?

Three figures, two of which you already hold. Your total income for the financial year running 1 July to 30 June, the total tax withheld across every employer, and the offsets, exemptions and deductions that reduce what you owed. The refund is the second minus the tax due on the first, adjusted by the third.

Quoted averages are meaningless here. How withholding compares with the tax actually assessed depends on the individual facts of your year, and it is worked out case by case when the return is prepared. Errors in withholding, where there are any, are what a return can correct.

## Which situations produce a large refund?

The ones where part of your year was withheld at the wrong rate. Large refunds come from finding weeks or months where somebody took 45% or 30% instead of 15%, not from clever deductions.

Four situations account for most of them.

- **Weeks before your TFN reached the employer.** Withholding is 45% instead of 15% until the [declaration form](/blog/tax-file-number-declaration-form) is completed, a difference of 30 cents in every dollar.
- **An employer not registered with the ATO to employ working holiday makers.** They must withhold at foreign resident rates rather than 15%. That is not your error, and it is something the return can address.
- **A declaration answered as a foreign resident.** That puts payroll on 30% from the first dollar instead of 15%. Leaving part way through the year does not by itself cause over-withholding, because working holiday maker withholding is a flat 15% of each pay up to $45,000.
- **The Medicare levy exemption never claimed.** Up to 2% of taxable income where you are not entitled to Medicare, and it needs a Medicare Entitlement Statement rather than a tick box.

## Which situations produce a small one?

One employer, registered correctly, your TFN on file from week one, and a full year worked. Then the tax taken through the year can be close to what is owed at the end of it, and the outcome comes down to the Medicare levy exemption and whatever deductions you can substantiate.

That is normal, not evidence anything went wrong. In that year the real money is in [superannuation](/superannuation) rather than tax, because super accrues at 12% whether or not the withholding was correct.

## How do you get a realistic number?

It starts with income and tax withheld across every job, which our team compares with the tax assessed for your year, before the Medicare levy position and deductions. Our [tax refund calculator](/calculator) gives a rough idea if you have the payslips in front of you. The actual figure only exists once your [working holiday tax return](/tax-return) has been prepared from your ATO record and assessed.

The complication is missing information, not difficult sums. Income statements sit in ATO systems rather than with the employer, so a job you left on bad terms, a labour hire company that has since closed, or a payslip you never received does not put that income out of reach. The figures just have to be retrieved first.

## Does everyone get money back when they leave?

No. You are refunded the amount withheld above your correct liability, not the tax itself, so someone taxed accurately all year has little or nothing to reclaim.

Super is a separate system. A DASP claim pays out the balance less 65% withholding on the taxable component, regardless of how your income tax landed. Two people with no refund at all can have very different super balances, depending on how much they earned and how many funds it went into.
`,
 },
 
 {
 slug: "working-holiday-visa-tax-guide-417-462",
 title: "417 and 462 Visa Tax: Rates and Refunds",
 description:
 "The complete working holiday maker tax guide: the 15% rate on the first $45,000, what happens above it, Medicare levy exemption, super, and refunds.",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 10,
 body: `
Where the working holiday maker rates apply, 15% is charged on the first $45,000 earned in Australia, and higher rates apply above that. Whether they apply to your year depends on your individual facts. The 15% only reaches you if your employer is registered to withhold it, and any difference between what was withheld and what was owed is dealt with in your [tax return](/tax-return).

## What are the working holiday maker rates?

Where they apply, 15% runs from the first dollar to $45,000. Most working holiday makers stay inside the first bracket for a single financial year, so that is the rate that matters most.

How the tax free threshold and the rates apply to you depends on the individual facts of your year. It is assessed case by case, the ATO makes the final decision, and it is not something to assume either way.

- First $45,000: 15%
- $45,001 to $135,000: 30%
- $135,001 to $190,000: 37%
- Above $190,000: 45%

## Can a working holiday maker ever get the tax free threshold?

That depends on a residency question decided on the facts of your year, never on the strength of the visa alone. The issue has been contested as far as the High Court.

Residency depends on your own circumstances and has to be properly reviewed, and it is misjudged in both directions. Our guide to [tax residency for working holiday makers](/blog/tax-residency-working-holiday-makers) covers why it is assessed rather than assumed.

## Why does your employer's registration matter?

Because it decides which rate they are allowed to apply. A business must register with the ATO as an employer of working holiday makers before it can withhold at 15%, and one that has not registered is required to use foreign resident rates instead, currently 30% on the relevant bracket.

You cannot tell from the outside, and the employers who most often have not registered are farms and small regional hospitality businesses. The excess is reconciled when the return is assessed, though the outcome depends on your year. The difference between 30% and 15% on a season of harvest work can be a large item in that year's return, and finding it requires looking at each employer separately rather than at the total.

## What does your TFN change?

The rate, immediately and completely. Without a Tax File Number recorded through a Tax File Number Declaration, an employer must withhold 45% whatever their registration status, which is 30 cents in every dollar more than you should be paying.

You must be in Australia to apply for a [TFN](/tfn), the number itself is free, and the ATO's outer limit for issuing one is 28 days. The declaration form is where the money is lost: every employer needs their own, and the most common quiet loss in a backpacker's year is one job at 15% while a second runs at 45% for months because nobody completed a second form.

## What is the Medicare levy exemption worth?

Two per cent of taxable income, which is about $800 on $40,000, and most people who qualify never claim it. Whether the Medicare levy applies to you depends on your individual circumstances and is assessed case by case.

Whether you can remove it depends on your entitlement to Medicare, which varies from person to person and sometimes runs in the opposite direction to what people expect. Our team reviews it as part of preparing the return.

It is not automatic in any case. The exemption needs a Medicare Entitlement Statement from Services Australia, which takes weeks to obtain, and that lead time is the whole reason it goes unclaimed. Our [Medicare levy exemption guide](/blog/medicare-levy-working-holiday-makers) covers the detail.

## What happens to your superannuation?

Your employer pays 12% of your ordinary earnings into a super fund on top of your wages, and it is untouchable while you are in Australia. It is not part of your tax refund and is not affected by how your return lands.

Once you have left and your visa has ceased, it is claimed as a Departing Australia Superannuation Payment, taxed at 65% on the taxable component, and the ATO says it is generally paid within 28 days of a complete application. How much there is depends on how much you earned and how many funds it was split across, since each employer who did not ask you to nominate one opened another account. Our [superannuation service](/superannuation) covers the claim.

## Does it matter which subclass you hold?

Not in the way people expect. Tax treatment depends on your circumstances rather than on the subclass number, and the DASP withholding and lodgement dates are the same. Anyone telling you one visa is simply taxed better than the other is oversimplifying.

Where the subclasses differ is in visa mechanics. The 417 covers the United Kingdom, Ireland, much of Europe, Japan, Korea and Taiwan among others, and extends through specified regional work. The 462 covers the United States, China, Israel and much of Latin America, carries education requirements and country caps, and has its own specified work rules including northern Australia options.

Chasing an extension pushes people towards regional postcodes and agricultural employers, which is precisely where [unregistered employer withholding](/blog/backpacker-tax-rate-australia) and [ABN farm arrangements](/blog/farm-work-and-abns) concentrate.

## What are the dates that matter?

The Australian financial year runs 1 July to 30 June, returns can be lodged from July once employers have finalised their reporting, and self lodgement is normally due by 31 October (that date has now passed for 2025-26, and a late return can still be lodged). Lodging through a registered agent can extend that into the following May, provided you were on their books before October.

One date is different if you are leaving for good. A working holiday maker departing Australia permanently part way through a financial year may be able to lodge an early return for that year rather than waiting until July, though the ATO processes early returns in 50 business days and pre-fill is generally not available. [When an early return before leaving makes sense](/blog/early-tax-return-leaving-australia) sets out the conditions. Any refund is paid into an Australian bank account, so keep one open. Our [refund calculator](/calculator) gives a rough figure if you have your payslip totals to hand.
`,
 },
 {
 slug: "diy-tax-return-vs-tax-agent-working-holiday",
 title: "DIY Tax Return vs Tax Agent on a WHV",
 description:
 "Lodging your own return is free. What makes a working holiday year hard to get right, the five places refunds are lost, and what a review involves.",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 8,
 body: `
Lodging your own Australian return costs nothing. The question is not whether you can fill in a form. It is whether your year contains any of the five things that quietly cost working holiday makers money, because each of them is invisible from inside the form.

## What makes a working holiday year hard to get right?

The free lodgement tools are built for Australian residents. Residency status, the working holiday maker income item and the Medicare levy section all assume a taxpayer who knows where they stand, and those are the three answers a backpacker is most likely guessing at. Residency depends on your own circumstances and has to be properly reviewed rather than assumed.

A wrong answer does not fail. It lodges cleanly and is still wrong, and the correction arrives months later as an amended assessment.

## Where does the money actually get lost?

In five places, none of which announce themselves. A return will carry each of them blank or answered incorrectly without complaint.

- **The Medicare levy exemption, skipped.** It needs a Medicare Entitlement Statement ordered from Services Australia weeks in advance, so it cannot be claimed on the day you decide to lodge. Missing it can cost up to 2% of taxable income.
- **Residency answered wrong.** A common backpacker error, and one that can produce an amended assessment later.
- **Deductions never claimed.** RSA and White Card courses taken for a job you already had, sun protection for outdoor work, tools, laundry of compulsory uniforms, and last year's agent fee.
- **An employer left out of the reconciliation.** Over-withholding at a job you left in September is easy to miss, and it is often where the largest single difference sits.
- **ABN income mishandled.** Delivery or farm contracting brings business items, possible GST questions and a different deduction basis. Our [ABN guides](/blog/category/abn) cover that side.

## Are there years with nothing to find?

Yes. A year with one employer registered with the ATO as a working holiday maker employer, your TFN on file from the first shift, withholding at 15% throughout, no ABN income and no departure from Australia tends to reconcile close to zero.

Most working holiday years are not that year. A change of employer, a farm season, a gap before the TFN landed or a flight home in March all move the number rather than the paperwork.

## When does an agent change the outcome?

When any part of the year was irregular: a period at 45% before your TFN landed, more than two employers, farm work, an employer who was not registered, a Medicare levy exemption you want claimed, ABN income alongside wages, or a departure part way through the year. In each the correct treatment is not obvious from the form.

There is also a structural difference. A registered tax agent works from the same ATO record you see in myGov, and checks each income statement against the jobs you remember, including ones an employer finalised late. Agents also carry professional obligations and, if you are on their list before 31 October, extended lodgement deadlines beyond it, and the fee is deductible on the following year's return.

## What does a review of the year actually involve?

Reconstructing the year rather than transcribing it: every employer who reported income against your TFN, the periods at each withholding rate, residency treated as a question to be reviewed rather than assumed, the Medicare position, and the deductions that belong to the work you actually did. Where there was ABN income alongside wages, or a cash heavy season with incomplete records, that reconstruction is most of the work.

Avoid percentage of refund pricing, whoever does it. It pays the preparer more when the number goes up. A [fixed fee](/tax-return) agreed before the work starts does not have that problem.

## Can it still be lodged after you leave Australia?

Yes. Remote lodgement is routine, including retrieving income statements you never collected and running the [superannuation claim](/superannuation) alongside the return.

The obstacles from overseas are identity and access, not tax. Australian identity verification is far easier to satisfy while you are still here, and an Australian bank account has to stay open long enough to receive the refund. Both are cheap to sort out in your last month in Australia and slow to fix from the other side of the world.
`,
 }
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
 title: "TFN guides for working holiday makers",
 description:
 "Every TFN question on a working holiday: how to apply, how long it takes (about two weeks, 28 days at most), delays, working while you wait, lost numbers and scams.",
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
 "Yes. There is no government fee for a tax file number. What costs money is the gap around it: every pay run before your employer has the number is withheld at 45% instead of 15%, and any difference is only reconciled through a tax return.",
 },
 {
 question: "Can you start working in Australia without a TFN?",
 answer:
 "Yes, you can start work without a TFN, but your employer must withhold tax at 45% until you provide one. Any excess tax is reconciled when your annual tax return is prepared.",
 },
 ],
 relatedServicePath: "/tfn",
 relatedServiceLabel: "Apply for your TFN",
 },
 {
 category: "ABN",
 slug: "abn",
 title: "ABN Guides for Working Holiday Makers",
 description:
 "When you actually need an ABN, free registration, invoicing rules, deductions, GST thresholds - and the sham-contracting traps to avoid.",
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
 "There is no government fee to register an ABN. The cost of an ABN is on the tax side: nothing is withheld from an invoice, so the whole liability sits with you until the return is lodged, and an ABN taken out when you were really an employee costs you super and award entitlements as well.",
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
 title: "Backpacker tax return guides",
 description:
 "Tax return guides for 417 and 462 visa holders: deadlines, what decides a refund, deductions, late and past years' returns, and lodging from overseas.",
 intro: `The Australian financial year runs from 1 July to 30 June. A working holiday maker must lodge a tax return if their taxable income for the year was $45,001 or more, and below that a return is still how any over-withheld tax comes back. Whether there is a refund depends on how much tax was withheld compared with what was owed for your year. These articles cover deadlines, deductions, what to do when you have left Australia, and how to handle complications.`,
 faq: [
 {
 question: "When do working holiday makers need to lodge a tax return?",
 answer:
 "The Australian financial year ends on 30 June. The standard deadline is 31 October that year (31 October 2026 has now passed for 2025-26), and a late return can still be lodged. Lodging through a tax agent can extend the deadline.",
 },
 {
 question: "Do working holiday makers get a tax refund?",
 answer:
 "Some do, if more tax was withheld than was actually owed, but it depends on your year and the ATO makes the final decision. Any refund is paid to your Australian bank account.",
 },
 {
 question:
 "Can you lodge an Australian tax return after leaving the country?",
 answer:
 "Yes. You can lodge your tax return from anywhere in the world. We can manage the process remotely. Keep your Australian bank account open until the refund is paid.",
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
 title: "Super guides: funds, lost accounts and DASP",
 description:
 "How super works on a WHV, checking employers pay the 12%, finding lost funds, the DASP documents and timing, and how the payment is taxed.",
 intro: `Superannuation (super) is Australia's compulsory retirement savings system. Your employer pays 12% of your wages into a super fund on top of your pay, and after you leave Australia it is paid out as a Departing Australia Superannuation Payment (DASP). These articles cover how super works, how to track it, and the individual steps of a DASP.`,
 faq: [
 {
 question: "Do working holiday makers get superannuation in Australia?",
 answer:
 "Yes. Every working holiday maker is entitled to superannuation contributions from their employer. The current rate is 12% of your ordinary time earnings, paid on top of your wages directly into a super fund.",
 },
 {
 question:
 "When does a DASP become available to working holiday makers?",
 answer:
 "Once your visa has expired or been cancelled and you have left the country. The payment is taxed at 65% for working holiday makers. The whole claim, step by step, is on our superannuation page.",
 },
 {
 question: "How much tax is taken from super withdrawals?",
 answer:
 "The DASP tax rate for working holiday makers is 65% of the taxable component of your super balance. That is much higher than the rate that applied before 1 July 2017.",
 },
 {
 question: "How do you find lost or unclaimed super?",
 answer:
 "Lost or unclaimed super can be traced by checking your TFN against the funds on record. Our service does this for you, and the Australian Taxation Office or a tax agent can search across all funds as well.",
 },
 ],
 relatedServicePath: "/superannuation",
 relatedServiceLabel: "How to claim superannuation after leaving Australia",
 },
 {
 category: "Work Rights",
 slug: "work-rights",
 title: "Work Rights Guides for Backpackers",
 description:
 "Your rights are identical to Australian workers: $26.44 minimum wage, award penalty rates, payslip checks, and free recovery paths for underpayment.",
 intro: `Working holiday makers in Australia have the same legal rights at work as Australian citizens. The Fair Work Ombudsman enforces minimum wages, conditions, and protections under industry awards. These articles cover what you are entitled to, how to read your payslip, how to spot underpayment, and what to do if your employer breaks the rules.`,
 faq: [
 {
 question:
 "What is the minimum wage for working holiday makers in Australia?",
 answer:
 "The national minimum wage in Australia is $26.44 per hour for full-time and part-time employees (effective from 1 July 2026). Casual employees receive a 25% loading on top, bringing the casual minimum to $33.05 per hour. Most workers are covered by industry awards that set higher rates.",
 },
 {
 question: "Are working holiday makers entitled to public holiday pay?",
 answer:
 "Yes. If you work on a public holiday, you are entitled to penalty rates, often 225% of your ordinary rate (double time and a quarter) or more, depending on your award. If you do not work, you may be entitled to your base rate, depending on your employment type.",
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
 title: "Medicare and Insurance Guides",
 description:
 "Medicare eligibility, the 2% levy exemption, health insurance options, and claiming GST back at the airport.",
 intro: `Working holiday makers face a range of tax and administrative questions outside the core areas of TFN, ABN, tax returns, and super. These articles cover Medicare access, the Medicare Levy and Medicare Levy Surcharge, claiming GST back on goods you take home, and other general topics that affect backpackers living and working in Australia.`,
 faq: [
 {
 question: "Do working holiday makers pay the Medicare Levy?",
 answer:
 "It depends on your individual circumstances, in particular your entitlement to Medicare. Some working holiday makers are not entitled and may be able to claim an exemption from the 2% levy, which needs a Medicare Entitlement Statement from Services Australia, commonly several weeks to issue. Our team reviews it as part of preparing your return.",
 },
 {
 question: "Can working holiday makers use Medicare?",
 answer:
 "Some working holiday makers can enrol in Medicare for limited cover under a Reciprocal Health Care Agreement between Australia and their home country. Whether that applies to you depends on your situation, and private health insurance is worth having either way.",
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
 "Usually worth having. Private health insurance (condition 8501) is a visa condition on some working holiday visas, so check your grant letter, and it is essential for backpackers who are not covered by a Reciprocal Health Care Agreement with Australia.",
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

export function getCategoryColor(category: Category): {
 bg: string;
 text: string;
 border: string;
} {
 switch (category) {
 case "TFN":
 return { bg: "#F2FAF7", text: "#0B5240", border: "#DCE0DE" };
 case "ABN":
 return { bg: "#F2FAF7", text: "#7A4A00", border: "#0B5240" };
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
