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

The consequence is that a TFN problem is never just a TFN problem. It surfaces as a wrong percentage on a payslip, as a super account nobody can match to you, or as a refund that cannot be processed, and the cause is the same in each case.

## What does not having one on file actually cost?

Thirty cents in every dollar. With a TFN recorded, a working holiday maker's wages are withheld at 15%. Without one, the employer must withhold at 45%, and they have no discretion about it.

- $1,000 a week: $150 withheld at 15%, $450 at 45%, a difference of $300
- $1,500 a week: $225 against $675, a difference of $450
- $2,000 a week: $300 against $900, a difference of $600

Nothing is lost permanently, because over-withheld tax comes back when the return is lodged. What is lost is access to the money for the months in between, which for anyone paying rent out of each pay is the part that hurts.

## Who can get one, and how hard is it?

Anyone with the right to work in Australia, which covers 417 and 462 working holiday visas, student visas with work rights and most temporary skilled visas. The application is free, takes about ten minutes online, and requires you to be in Australia.

It is genuinely easy and you should not pay anyone for it. Where it stops being easy is the declaration form your employer hands you on day one, because the residency box on that form is the same question that decides your refund at the end of the year, and it is the item most often answered wrongly.

## Why does the declaration form matter more than the number?

Because the form is what actually sets your rate. Handing a manager your TFN verbally, or showing them a photo of the letter, does not change payroll. The Tax File Number Declaration does, and it does two things at once: it records your number and it records your status as a working holiday maker.

Every employer needs its own. Giving your TFN to a packing shed near Shepparton does nothing for a bar in Melbourne, and the most common quiet loss on a backpacker's year is one job correctly at 15% and a second running at 45% for months because nobody completed a second form.

## How long does it take and what if you are already working?

Up to 28 days is the ATO's ceiling, about two weeks is typical, and it arrives as a posted letter to an Australian address. You can start work before it arrives.

You have 28 days from your first day to supply it. Record on the declaration that the application is in progress and the working holiday maker rate applies through that window. Say nothing and the 45% starts immediately. Anything over-withheld before the number lands comes back at tax time rather than through payroll.

## How careful do you need to be with it?

Careful. A TFN alongside a passport scan is a workable identity kit, and working holiday makers are targeted specifically because they are new, unsure what is normal, and reachable through hostel noticeboards and social media.

The list of people entitled to ask is short: an employer after you have been hired, your bank, your super fund, a registered tax agent acting for you, Services Australia, and the ATO. Landlords, hostels, recruiters before hiring and anyone in a group chat are not on it, and refusing them costs you nothing. The [full list and the scam patterns](/blog/who-can-ask-for-your-tfn) are worth reading once.

## Where could your own paperwork cost you?

Getting a TFN is the same short task for everyone. What varies is whether you already have one and whether the paperwork around it was completed correctly, and those are what cost money.

- Whether you have ever worked in Australia before, since the number is permanent and applying again creates a duplicate that delays everything.
- Whether the postal address on your application will still hold mail in a month, which is the main cause of delay.
- How many employers you have, since each one needs its own declaration form.
- Whether the residency and threshold questions were answered correctly on that form, which is the difference between a refund and a debt.
- Whether your super fund has your TFN, since a fund without it taxes contributions higher and struggles to match the account to you later.

The number is what makes your [working holiday tax return](/tax-return) and any [superannuation claim after leaving Australia](/superannuation) possible, and you can [estimate your tax refund](/calculator) at any point in the year.
 `,
 }, {
 slug: "how-to-apply-for-a-tfn",
 title: "How to Apply for a TFN, Free in 10 Minutes",
 description:
 "Apply for your Tax File Number free on the ATO website once you are in Australia. The exact steps, documents needed, and mistakes that delay the letter.",
 category: "TFN",
 date: "7 July 2024",
 readTime: 5,
 body: `
Applying for a TFN is genuinely easy. It is free, the online application takes about ten minutes, and the number arrives by post within 28 days. You can apply as soon as the visa is granted, provided you have an Australian postal address. What actually costs people money is what happens in the weeks before it arrives.

## What do you need before you start?

Three things, and all of them have to match. Your passport exactly as it is printed, including the spelling and the date of birth, an Australian address the letter can be posted to, and an email address that will still work in a month.

No documents are uploaded. The ATO verifies the passport against immigration records electronically, which is why a transcription mismatch between what you typed and what the passport says is the most common single cause of an application failing. Our guide to [TFN identity documents](/blog/tfn-identity-documents-required) covers what the verification actually checks.

## Which address should you give?

The one you will still be at in a month, not the one you are at today. The TFN arrives as a physical letter, and a returned letter restarts the process rather than being redirected, which makes the address the single biggest determinant of how long this takes.

A hostel address works if you are confident about staying. A hostel you leave in ten days does not, and a friend's address or a longer term share house is the better choice even if you have not moved in yet. This is not a technicality: an address that stopped being yours is the most common reason a 28 day process turns into a two month one.

## Can you start work before it arrives?

Yes, and this is where the money is actually decided. Your employer is required to withhold 45% rather than 15% until a TFN is on file, but a Tax File Number Declaration that records an application in progress keeps you on the working holiday rate through a 28 day window.

So the sequence that matters is not the application, it is telling the employer on day one that the application is in progress and completing the declaration accordingly. Say nothing and the 45% starts immediately. The difference on a $1,000 week is $300, every week, until it is corrected.

Any excess withheld comes back when the return is lodged, so nothing is permanently lost. What is lost is the use of the money for the months in between, which is the part that matters when rent is weekly.

## What happens once it arrives?

Complete a Tax File Number Declaration for every employer separately. A TFN given to one employer is not shared with another, and each payroll needs its own declaration before it can apply the right rate.

Then check the next payslip rather than assuming. The declaration also carries the residency question, which is the same question that later decides your refund, and it is the field working holiday makers most often complete incorrectly. Our guide to the [Tax File Number Declaration form](/blog/tax-file-number-declaration-form) covers what each box actually asks.

## Do you need to pay anyone for this?

No. The application is a free government service and anyone charging you a fee for the application alone is reselling something you can do yourself in ten minutes. That is worth saying plainly, because the opposite is often implied.

The paid work that is genuinely worth having sits either side of it: the declaration form and the 28 day window on the way in, and the return that recovers over withheld tax on the way out. Those are where money is won and lost. The application itself is not.

## What if it does not arrive?

Keep the reference number from the confirmation email, because it is what any follow up runs on. If 28 days pass with nothing, the cause is almost always the address rather than the assessment, and the second most common cause is a name or date of birth that did not match the passport.

An application that was rejected rather than delayed is a different problem with different causes, set out in our guide to [a rejected TFN application](/blog/tfn-application-rejected).

## How much would a delay cost you?

The application is the same for everyone. How much a delay costs you is not. The difference between a costless wait and an expensive one comes down to the points below, all of which are settled in your first week.

- Whether you had started work before applying, since the 45% period runs from the first pay rather than from the application.
- Whether you told the employer the application was in progress and it was recorded on the declaration.
- Whether the postal address will still be yours when the letter arrives.
- Whether your passport details were entered exactly as printed.
- Whether the employer is registered with the ATO as a working holiday maker employer, since an unregistered one withholds at foreign resident rates even after the TFN lands.
- How many employers you take on, because each needs its own declaration.

Anything over withheld during the wait is recovered through the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) at any point in the year.
 `,
 }, {
 slug: "how-long-does-it-take-to-get-a-tfn",
 title:
 "How Long Does a TFN Take? 2 to 4 Weeks",
 description:
 "Most TFNs arrive in about two weeks and the ATO's limit is 28 days. What decides whether the letter beats your first pay run, and what if it does not.",
 category: "TFN",
 date: "20 July 2026",
 readTime: 6,
 body: `
Your Tax File Number arrives as a physical letter, posted to an Australian address, never by email and never by SMS. Two weeks is normal, 28 days is the ATO's ceiling, and the wait itself is rarely what causes trouble. The trouble is the address you gave and the date of your first pay, because an employer without your number on file must withhold 45% instead of 15%.

## Why does the 28 day figure matter more than the two week one?

Two separate 28 day clocks run at the same time, and people confuse them constantly. The first is the ATO's processing ceiling for issuing your Tax File Number. The second is the window you have from your first day of work to give an employer your TFN before they must withhold at 45% instead of the 15% working holiday maker rate. They start on different days, and the one that costs money is the second.

If you land in Cairns in October, pick up bar work in your first week and apply for your TFN the same week, both clocks are running roughly together and you will almost certainly never see a 45% pay. If you spend three weeks travelling the coast before applying and then start work immediately, the employment clock is well ahead of the ATO clock, and that gap is where the money goes.

## What actually decides how long your TFN takes?

Two facts about your own application account for nearly every delay past 28 days, and both are within your control. The first is the postal address you gave. The second is whether your passport and visa details match what the Department of Home Affairs holds.

**Your postal address.** Your TFN is a letter. A hostel you leave in ten days, a friend's place where nobody checks the mail, a share house with eight names on the box, a wrong postcode digit: all of these end the same way, with the letter returned to the ATO and the wait starting again. In the applications we chase up for people, an address problem is by a wide margin the most common cause, and it is the one nobody suspects.

**Whether your details match immigration records.** A passport number transcribed with a slip, a name that appears differently on your visa grant than in your passport, or a previous TFN issued under your name on an earlier visa will all put the application into manual review. Manual review is not a rejection, but it adds weeks and it will not resolve itself.

**Where you are staying.** Regional and remote delivery genuinely runs longer than metropolitan delivery. A station address outside Katherine or a farm outside Mildura is not the same postal proposition as an inner Melbourne apartment, and the ATO's 28 days does not include Australia Post's own timeline in any meaningful sense.

## Does the wait cost you money?

Only if it overlaps with paid work and you have not told your employer the application is in progress. If you record on the Tax File Number Declaration that you have applied for a TFN, your employer withholds at the working holiday maker rate through the 28 day window rather than at 45%. Say nothing, and the 45% starts on the first pay.

Even in the worst case nothing is lost permanently. Over-withheld tax is credited back when your return is lodged, because your actual liability is worked out on your income for the whole year and not on what was taken week by week. What you lose is the use of the money for the months in between, which for anyone paying hostel rent out of each pay is the part that actually hurts.

## Can you start work before your TFN arrives?

Yes, and most people do. There is no law preventing you from being employed before your Tax File Number is issued, and no employer is entitled to refuse you work on that basis alone. The declaration form is what carries you through the gap.

The practical version is short. Tell the employer the application is in progress, show them the ATO confirmation email if you have it, and complete the Tax File Number Declaration recording that you have applied. When the letter arrives, give the employer the number.

## Can you make it go faster?

No. There is no paid fast track, no priority processing and no online status tracker for a TFN application, whatever a third party site tells you. Anyone offering to expedite a TFN for a fee is selling you something the ATO does not sell.

What you can do is remove the two causes of delay before you apply: give an address you will still be reachable at in a month, and check your passport details character by character against the passport itself rather than from memory.

## What if 28 days pass and nothing has arrived?

Past day 28 the application stops being a waiting game and becomes a phone call. The ATO can be reached on 13 28 61 within Australian business hours, or on +61 2 6216 1111 from overseas, and you will need the reference number from your application confirmation email and your passport.

Do not lodge a second application. A duplicate is the single most reliable way to turn a three week delay into a two month one, because it creates a conflicting record that then has to be resolved manually before either application can proceed. Resolve the original.

## Does the wait cost you anything?

The wait is close to identical for everyone. The cost of it is not, and these are the facts about your own year that decide it.

- Whether you are working during the wait at all. A traveller who applies on arrival and starts work six weeks later has nothing at stake.
- Whether your employer recorded the in progress application on your declaration form.
- Whether your employer is registered with the ATO as a working holiday maker employer. An unregistered one withholds at foreign resident rates even after your TFN lands, which is a separate over-withholding that also comes back at tax time.
- Whether your address holds mail for a month. Seasonal work moves you, and harvest towns move you fastest.
- Whether you have held a TFN before on an earlier Australian visa. You keep it for life, and applying again creates the duplicate problem above.

If you have already worked a period at 45%, that money is sitting with the ATO waiting to be claimed back through your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) before you lodge anything.
 `,
 }, {
 slug: "can-you-start-work-without-a-tfn",
 title:
 "Work Without a TFN? Yes, You Have 28 Days",
 description:
 "You can start work in Australia before your TFN arrives. The declaration form keeps you on 15% for 28 days, and four things decide what happens after.",
 category: "TFN",
 date: "20 July 2026",
 readTime: 6,
 body: `
Yes. Nothing prevents you starting work before your Tax File Number arrives, and no employer can require it before hiring you. You have 28 days from your first day to supply it. Record on the declaration form that you have applied, and the working holiday maker rate applies through that window.

## What is the 28 day rule, exactly?

The 28 days run from the day you start with that employer, not from the day you applied for your TFN and not from the day you arrived in Australia. During those 28 days an employer who has a Tax File Number Declaration recording that your application is in progress withholds at the ordinary working holiday maker rate of 15%. If the 28 days lapse and no TFN has been supplied, they must withhold at 45% on every pay from then on.

The clock is per employer. Start at a Perth cafe in March and a packing shed near Shepparton in May, and each one starts its own 28 days and needs its own declaration form.

## What does the declaration form actually do?

The Tax File Number Declaration is the document that decides your withholding rate, and it does more than record a number. It is where you state that you are a working holiday maker, and it is where you either supply a TFN or record that you have applied for one. Payroll reads that form and applies the rate accordingly.

This is why showing a manager a photo of your TFN letter, or telling them the number verbally, does not change your pay. The rate follows the form. It is also why the residency box on that same form matters so much: it is the same question that decides your refund at the end of the year, and it is ticked wrong more often than any other item on the page.

## Does the 45% apply to everything if you miss the window?

No, and this is worth being precise about because the fear is worse than the rule. If the 28 days lapse, the higher rate applies to each subsequent pay in full. It is not applied retrospectively to pays you have already received, and no employer claws money back out of past wages.

Hand in the TFN and the correct rate resumes from the next pay run. The over-withheld portion from the gap is not fixed in payroll; it comes back through the ATO when your return is lodged, along with anything else over-withheld that year.

## What should you actually say to your employer on day one?

Say that your TFN application is in progress, offer the ATO confirmation email as evidence, and ask to complete the Tax File Number Declaration recording the application. That is the whole conversation, and a hospitality or labour hire payroll office in Australia has had it a hundred times.

In practice the employers that get this wrong are not the large ones. Big hospitality groups and the labour hire firms that supply harvest work run this correctly by default. The gaps we see are small independent operators and single site farms, where payroll is one person doing it around everything else, and where nobody notices that a rate is wrong until someone reads a payslip in June.

## Do you need a TFN for anything else while you wait?

You can open an Australian bank account without a TFN, and you can be paid into it. What you should not leave unresolved is your super fund. A fund without your TFN on file taxes contributions at a higher rate and cannot accept some contributions at all, and it also makes the account harder to find later when you are claiming it.

Superannuation is paid on your wages from your first dollar regardless, at 12%, and a working holiday maker can [claim your superannuation after leaving Australia](/superannuation). An account your fund cannot match to you is the most common reason people leave super behind.

## How expensive is your own 28 day window?

The 28 day rule is identical for everyone, so the rule itself is never the variable. What differs is how much the window costs you, and that turns on five facts about your own start date and your own employers.

The 28 day rule is the same for everyone. What it costs you turns on facts only you know.

- Whether you applied before or after starting work. Applying first almost always means no 45% pay at all.
- Whether the declaration recorded the in progress application. Without that record the 45% starts immediately rather than after 28 days.
- Whether the address on your application holds mail for a month. Seasonal work moves people, and a returned letter restarts the wait past the 28 days.
- Whether your employer is ATO registered as a working holiday maker employer. If not, they withhold at foreign resident rates even with your TFN on file, which is a separate over-withholding you also get back.
- How many employers you had in the year. Each one is its own form and its own clock.

Any period withheld above 15% is money you claim back through your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) before deciding anything.
 `,
 }, {
 slug: "what-happens-without-your-tfn",
 title:
 "No TFN on File? 45% Withheld, Not Lost",
 description:
 "Without a TFN your employer must withhold 45% instead of 15%, about $7.50 an hour on a $25 job. What gets it back and what decides how long it lasts.",
 category: "TFN",
 date: "20 July 2026",
 readTime: 6,
 body: `
Thirty cents in every dollar, for as long as it lasts. With a TFN on file your employer withholds 15%; without one they must withhold 45%. On $1,000 a week that is $300 going to the ATO instead of your account, and on a $25 an hour job it is about $7.50 an hour.

## Why does your employer take 45% and not 15%?

Your employer has no discretion here and it is not a judgement about you. Australian tax law requires an employer who does not hold an employee's Tax File Number to withhold at the top marginal rate of 45%, and an employer who ignores that is the one exposed to the ATO, not you. The 15% working holiday maker rate is unlocked by a document, not by a visa.

That document is the Tax File Number Declaration. Handing over your visa, your passport or a photo of your TFN letter in a group chat does not do it. Until the declaration is with payroll, the payroll system applies the rate it is legally required to apply.

## What does 45% withholding actually cost you?

The gap between the two rates is 30 percentage points, so the arithmetic is simple and it is worth doing on your own wage rather than a generic one. Below are the weekly differences at wages that are realistic for full time seasonal and hospitality work.

- $800 a week: $120 withheld at 15% against $360 at 45%, a difference of $240
- $1,000 a week: $150 against $450, a difference of $300
- $1,500 a week: $225 against $675, a difference of $450
- $2,000 a week: $300 against $900, a difference of $600

A month of full time farm work in the Bundaberg or Mildura seasons at those rates is comfortably four figures of over-withholding.

## Do you get the money back?

Yes, in full.

This is the part people miss in the panic: over-withheld tax is not a penalty and it is not lost. When your return is lodged the ATO works out what you actually owed across the whole financial year and refunds the difference to an Australian bank account, and for most working holiday makers who spent months at the wrong rate that refund is the largest single payment of their year in Australia.

What you lose is access to the money in the meantime. If you are paying hostel rent week to week out of each pay, several months without $300 a week is a genuine problem even though the ledger balances in the end. That is the real cost, and it is why fixing the declaration is worth more per hour than most of the shifts it affects.

## How do you stop it?

Give your employer a completed Tax File Number Declaration carrying your TFN. The correct rate then applies from the next pay run, which is worth understanding clearly: your employer will not go back and re-run earlier pays at 15%, and they are not required to. The earlier over-withholding is corrected by the ATO at tax time, not by payroll.

If your application is still in progress, record that on the declaration. An employer who has that on file applies the working holiday maker rate through the 28 day window instead of 45%, which usually means you never see a high pay at all.

## What decides how long you sit at 45%?

Four things decide how long the higher rate lasts, and none of them is about the ATO being slow, which is why the length of the 45% period varies so widely between people who applied on the same day. You already know all four about yourself.

**Whether you told your employer the application was in progress.** The declaration records it, and that record is what carries the working holiday rate through the 28 day window.

**Whether your postal address was right on the application.** Your TFN arrives as a letter. A wrong address is the most common cause of a delay past 28 days by a wide margin, and every extra week is another week at 45%.

**Whether your employer is registered with the ATO as a working holiday maker employer.** An unregistered employer must withhold at foreign resident rates even once your TFN is on file. That is a different rule and a separate over-withholding, it is not your mistake, and it also comes back at tax time. It is worth checking your payslip percentage rather than assuming the TFN fixed everything.

**How many employers you had.** Each employer needs its own declaration. Giving your TFN to the packing shed does not give it to the pub, and a common pattern is one job correctly at 15% and another quietly running at 45% for two months.

## Does this apply to cash in hand work?

Cash work sits outside this rule because there is usually no payroll applying a rate at all, which is a different and larger problem. Wages paid in cash are legal only where tax is still withheld and super is still paid, and where neither is happening you have no withholding to reclaim and no income statement to lodge from.

If some of your year was cash, that income still belongs on your return, and how it was paid changes what evidence is needed rather than whether it is declared. See [cash in hand work in Australia](/blog/can-your-employer-pay-you-cash-in-hand) for what that means in practice.

## Can you claim the money back before the end of the year?

Usually you wait for the end of the financial year on 30 June. The exception that matters for working holiday makers is leaving Australia permanently: if you are departing and will not earn Australian income again that year, an early return can be lodged before 30 June rather than waiting until you are home.

Whether that is the right move depends on your residency position for the year, whether you have super to claim at the same time, and whether any employer is still to issue a final income statement. You can [estimate your tax refund](/calculator) first, and a period at 45% is exactly the situation where the estimate and the final figure diverge most.
 `,
 }, {
 slug: "tfn-vs-abn-difference",
 title:
 "TFN or ABN? The Difference That Costs Money",
 description:
 "A TFN is for employment, where tax is withheld for you. An ABN is for contracting, where nothing is withheld until assessment. Plenty of people need both.",
 category: "TFN",
 date: "31 July 2024",
 readTime: 6,
 body: `
A TFN is your personal tax number, used when an employer pays you wages and withholds tax for you. An ABN identifies you as a business, used when you invoice for work and nothing is withheld at all. Most working holiday makers need only a TFN. Plenty end up needing both.

## What is a TFN for?

A TFN is your permanent identity with the ATO, and everyone earning income in Australia needs one whether they are employed or self employed. It is what connects your wages, your withholding, your [superannuation](/superannuation) and your refund to the same person, and it never expires or changes.

You need a TFN for anything on a payroll: wages, PAYG withholding at the working holiday maker rate, employer super contributions and lodging a return at the end of the year. That covers most hospitality, retail, warehouse and employed farm work.

## What is an ABN for?

An ABN is an eleven digit business identifier, used when you are trading as a sole trader rather than working as an employee. It is what lets you invoice a client, and it comes with the whole of the tax responsibility that an employer would otherwise carry for you.

- You invoice for the work rather than being paid through payroll
- Nothing is withheld, so the tax falls due at assessment
- No employer superannuation is paid on your behalf
- You carry the commercial risk and generally supply your own equipment

It is common in gig work, delivery, some piece rate farm arrangements, and any job where the business asks for an invoice instead of putting you on the books. Our guide to [what an ABN is](/blog/what-is-an-abn) sets out when that is legitimate.

## Can you hold both at once?

Yes, and a large number of working holiday makers do. The TFN is always required because it is your personal identifier, and the ABN sits alongside it for the contracting portion of your income. Holding both is normal and creates no conflict.

What it does create is a single return with two kinds of income in it. Wages arrive with tax already withheld and ABN income arrives with none, so the withholding on the wage side is often what absorbs the liability on the ABN side. Our guide to [holding a TFN and an ABN together](/blog/can-you-have-tfn-and-abn) covers how that interacts.

## How do you tell which one applies to your job?

The test is control, not the wording of the job ad. If the business decides when you start, how the work is done and what equipment you use, that is employment and it needs a TFN, whatever the arrangement is called. If you decide those things, invoice for a result and carry the risk of fixing your own mistakes, that is contracting and it needs an ABN.

- **Employee**: on the payroll, tax withheld, super paid on top, the business directs the work
- **Contractor**: invoices issued, gross payments, your own tax and super, you direct the work

An advertisement requiring an ABN for supervised shift work at set hours is describing employment. That is sham contracting, and our guide to [employee versus contractor status](/blog/employee-vs-contractor-australia) explains the test and what it costs you.

## What does the wrong number actually cost you?

Being on an ABN when you should be an employee costs you the 12% super your employer would have paid, the award minimum rate, penalty rates, and any workers compensation cover, and it moves the entire tax bill onto you at the end of the year. That is the single most expensive misclassification available to a backpacker.

The reverse error is cheaper but not free. Working without your TFN recorded means 45% withheld instead of 15%, which comes back on the return but only after you have gone months without it, and no ABN on an invoice means 47% withheld by the payer.

## What decides which one you need this year?

Three facts about the work itself, and none of them is what the employer prefers. Who controls how the work is done. Who supplies the equipment and carries the risk. And whether you are paid for hours or for a result.

Most working holiday years contain a mix, because a bar shift in Melbourne and a delivery round in the same month genuinely are different arrangements. That is fine, and it is why both numbers coexist. What is not fine is a farm or an agency deciding for you that shift work is contracting, and that is worth checking before the first pay run rather than at the end of the year, when the super is the part that cannot be recovered easily. [Get in touch](/contact) if the arrangement you have been offered does not match the work you are actually doing.
`,
 }, {
 slug: "apply-for-tfn-before-arriving",
 title:
 "Can You Apply for a TFN Before You Land?",
 description:
 "Working holiday makers must be in Australia to apply for a TFN. Everything else can be ready in advance so it is lodged on day one, which is what counts.",
 category: "TFN",
 date: "20 July 2026",
 readTime: 6,
 body: `
No. The ATO's online TFN application for foreign passport holders requires you to be in Australia, so a working holiday maker cannot lodge it from home. What you can do beforehand is have every detail ready so it goes in on day one, which is what decides whether you ever see a 45% pay.

## Why does it have to wait until you arrive?

The online TFN application for foreign passport holders is built around your arrival being recorded against your visa, and it also needs an Australian postal address to send the number to. Those two requirements are what make it an on arrival task rather than a pre departure one.

You can hold the granted visa for months beforehand and it makes no difference to this. The application is not gated on the grant, it is gated on you being here.

## Does applying on day one actually matter?

Yes, more than the processing time does. From your first day of work you have 28 days to give an employer your TFN before they must withhold 45% instead of the 15% working holiday maker rate, and the ATO takes up to 28 days to issue it. Those two clocks are almost exactly the same length, so the only real variable is how many days you let pass between landing and applying.

Apply on day one and start work in week two, and the letter is very likely to arrive inside the employment window. Spend a month driving up the coast first and then start work the day after you apply, and you have engineered a gap that costs 30 cents in every dollar until it closes.

## What should be ready before you fly?

Everything except the submission itself. The application takes about ten minutes and it is free, and none of the ten minutes is the hard part.

- Your passport details, saved as a photo of the identity page rather than from memory. Details entered from memory are how applications end up in manual review.
- Your visa grant notice, accessible offline.
- A decision about your Australian postal address, which is the one thing worth thinking about properly before you land.
- An email address you will actually check, since the confirmation carries the reference number you will need if anything goes wrong.

## What address should you use?

Somewhere that will still hold your mail in four weeks, which is a different question from where you are sleeping on night one. This is the decision that causes more delays than everything else combined, because your TFN arrives as a letter and only as a letter.

A hostel is fine if it is a hostel with a mail system and you are booked in for a few weeks. A hostel you are leaving on Friday is not. If you have a friend or a relative anywhere in Australia with a stable address, that is usually the better answer even if you never go there, because a letter that arrives somewhere reliable beats a letter that arrives where you were.

## Is your TFN affected if your visa changes?

No. A Tax File Number is issued once and kept for life, and it does not expire with a visa, change with a second working holiday visa, or need renewing if you come back years later on a different visa entirely. The number is yours.

What does need to stay current is the address the ATO holds against it, because that is where correspondence and any paper refund goes. This is also why anyone who has been in Australia before on a student or working holiday visa should assume they already have a TFN and treat this as a retrieval rather than a new application.

## Your arrival dates decide the cost.

Everyone faces the same rule about applying from inside Australia, so the variable is how much the gap between landing and applying costs you. Five facts about your own arrival decide whether that gap matters at all.

- Whether you have been in Australia before on any visa with work rights. If so you already have a TFN and applying again creates a duplicate that delays everything.
- How soon you intend to work. Someone starting at a Thredbo or Falls Creek ski season in June with a job already lined up has a much tighter margin than someone travelling first.
- Whether you have a stable Australian address, or anyone in the country who can be one for you.
- Whether your first employer is registered with the ATO as a working holiday maker employer, because an unregistered one withholds at foreign resident rates even once your TFN is on file.

Once you are working, the tax withheld before the number was on file comes back through your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) at any point in the year.
 `,
 }, {
 slug: "tfn-application-delayed",
 title:
 "TFN Delayed Past 28 Days? 3 Things to Check",
 description:
 "Most TFN delays are a wrong address or a mismatch with immigration records. What to check, and why a second application makes it considerably worse.",
 category: "TFN",
 date: "20 July 2026",
 readTime: 6,
 body: `
If your TFN has not arrived after 28 days, the cause is almost always an address the letter could not reach, details that do not match immigration records, or a duplicate application. The ATO's 28 days run from when it received the application, so check that first. Many delays turn out not to be delays.

## Has 28 days actually passed?

The processing window runs from the date the ATO received your application, not from the date you decided to apply and not from your arrival in Australia. Online applications are normally received the same day, so the confirmation email is the document that settles it.

If it has been under 28 days, the application is inside the ordinary window and there is nothing to escalate. Regional and remote postal delivery genuinely runs longer than metropolitan delivery, so a station address in the Kimberley or a farm outside Renmark is a different proposition from an address in inner Sydney.

## Why is the address the first thing to check?

Your TFN is a physical letter and nothing else. There is no email delivery, no SMS and no online copy to download, so an address the letter cannot reach is a total failure rather than an inconvenience. This is the single most common cause of a TFN that never turns up.

The failures are mundane. A postcode digit transposed. A hostel where mail for former guests goes into a box nobody empties. A share house with eight names and no system. An address you gave in your first week that you left in your third. If you have moved since applying, the useful thing to do is contact the old address before contacting anyone else, because the letter is frequently sitting there.

## What else puts an application into review?

The second cause is a mismatch between your application and the records the Department of Home Affairs holds. A passport number entered with a slip, a name that appears in a different order on your visa grant than in your passport, or a middle name included in one place and omitted in the other are all enough to stop automatic processing.

The third is a previous TFN. A Tax File Number is issued once and kept for life, so an applicant who held one on an earlier student or working holiday visa already has a number, and a new application conflicts with it rather than replacing it. If you have been in Australia before on any visa with work rights, assume you already have a TFN and that the task is retrieving it rather than applying again.

## Why should you not apply a second time?

Because it is the most reliable way to make a three week delay into a two month one. A duplicate application creates a conflicting record that has to be resolved manually before either application can proceed, and manual resolution is slower than the queue you were already in.

This is the mistake we see most often, and it is entirely understandable: nothing has arrived, the form is free, applying again feels like doing something. It is the one action that reliably makes it worse. Resolve the original application instead.

## How do you get a stalled application moving?

Past day 28 it stops being a waiting game and becomes a phone call. The ATO can be reached on 13 28 61 during Australian business hours, or on +61 2 6216 1111 from outside Australia, and the two things you need in front of you are your passport and the reference number from your application confirmation email.

What you are asking is narrow and worth being clear about: has the TFN been issued, and to what address. If it was issued and the letter went astray, the address on record is corrected and it is re-sent. If it was never issued, you find out what is holding it. A tax agent can make that call on your behalf, which mostly saves you the hold time and the identity verification, which is designed around documents an Australian resident has and a backpacker three weeks off the plane often does not.

## Can you keep working while it is unresolved?

Yes, and you should. The delay does not affect your right to work and it does not have to affect your pay rate either. Your employer keeps you on the working holiday maker rate of 15% through the 28 day employment window if the Tax File Number Declaration records that your application is in progress, and the confirmation email is your evidence that it is.

If your own 28 day employment window is about to lapse while the ATO application is still open, tell payroll that plainly. Some employers will hold the rate on the strength of the ATO correspondence. Others apply 45% because that is what the rule says, and the excess then comes back through your [working holiday tax return](/tax-return).

## Which cause is behind your delay?

A delay past 28 days is almost always caused by something specific rather than by a queue, and the cause determines whether the fix is a phone call or simply waiting. These are the facts about your own application that decide which one you are in.

- Whether you have held an Australian TFN before, on any visa. If so this is a retrieval, not an application, and applying again is what is blocking it.
- Whether the address you gave still holds your mail. Harvest and hospitality work moves people faster than the post moves letters.
- Whether your passport details on the application match the visa grant exactly, including name order and middle names.
- Whether a second application exists. If it does, that is very likely the whole problem.
- Whether you are working during the delay, and whether the declaration records the application. This is what decides whether the delay costs you anything at all.

If a stretch of pays has already run at 45%, none of it is lost, and you can [estimate your tax refund](/calculator) to see what the year looks like once it is reconciled.
 `,
 }, {
 slug: "do-you-need-new-tfn-second-visa",
 title:
 "Do You Need a New TFN for a Second Visa?",
 description:
 "A Tax File Number is issued once and never expires, so a second visa needs no new application. What does need updating is your address and bank details.",
 category: "TFN",
 date: "20 July 2026",
 readTime: 5,
 body: `
No. A Tax File Number is issued once and kept for life. It does not expire with a visa, does not change on a second or third working holiday visa, and does not need reactivating after years away. The same nine digits apply. What does need attention is the information the ATO holds against them.

## Why does the TFN survive the visa?

Because it identifies you, not your visa. The number is attached to a person in the ATO's records, and every employer, super fund, bank and tax return you have ever had in Australia is linked back through it. Issuing a second one would fracture that history rather than refresh it.

This is also why a second application is actively harmful rather than merely unnecessary. It creates a duplicate record that has to be resolved manually before anything can proceed, which is how a returning backpacker turns a five minute retrieval into a six week problem.

## Where do you find a TFN you have lost?

It is on more documents than people expect, and finding it is almost always faster than any process involving the ATO. Start with anything paper or electronic from your first stint.

- The original letter the ATO posted when it was issued
- Any payslip or income statement from an Australian employer
- Any Australian tax return you have lodged
- Superannuation fund correspondence, which carries it if you supplied it
- Any earlier ATO correspondence at all

If none of those survive, a tax agent can retrieve it for you, and so can the ATO on 13 28 61 once you have verified your identity. What you must not do is apply again.

## What actually needs updating when you come back?

Three records, and none of them is the TFN itself. Getting these right before your first pay is what makes the second year uneventful.

**Your address.** The ATO still holds whatever you gave it on your first visit, which for most people is a hostel they left years ago. Everything posted follows that address until it is changed.

**Your bank account.** A refund directed to an Australian account you closed on the way to the airport does not disappear, but it bounces and sits as a credit until someone tells the ATO where to send it. Returning backpackers frequently have money waiting from a first year they never lodged for.

**A declaration form for each new employer.** Your TFN being permanent does not mean it travels between employers. Every new employer needs its own Tax File Number Declaration, answering the working holiday questions for the visa you are on now.

## What about super from your first visit?

This is the part worth checking properly, because a large amount of money gets abandoned here. If you claimed a departing Australia superannuation payment when you left, that account is closed and your second visit will accumulate into a new one, probably with a different fund chosen by your new employer.

If you did not claim it, it is still yours. It is either sitting with the original fund, or, if the fund lost contact with you, it has been reported as unclaimed and transferred to the ATO. Either way it is recoverable, and it is tied to the same TFN you are about to start using again. If you are planning to leave again at the end of this visa, both stints can be dealt with together when you [claim your superannuation after leaving Australia](/superannuation).

## Do the tax rules work the same the second time?

Broadly yes. The financial year runs 1 July to 30 June, a return is due for any year in which you earned Australian income, the standard lodgement deadline is 31 October, and the working holiday maker rate of 15% applies up to $45,000 provided your employers hold your TFN and are registered as working holiday maker employers.

The thing that is different is that you now have history. A prior year you never lodged for is still outstanding, and it usually contains a refund rather than a debt, because most first year backpackers are over-withheld rather than under.

## What did your first visit leave behind?

The TFN itself never changes, so the work on a return visit is entirely about the records attached to it. What is worth checking depends on how your first visit ended.

- Whether you lodged a return for your first visit. An unlodged year is money sitting still, not a problem going away.
- Whether super from the first visit was claimed, left with a fund, or transferred to the ATO as unclaimed.
- Whether the bank account your last refund was aimed at still exists.
- Whether you can still get into an old myGov account, since a lost email or phone number makes recovery a separate job.
- Whether your two stints fall in the same financial year or different ones, which changes how the income and any residency position is assessed.

Prior year returns can still be lodged, and a [working holiday tax return](/tax-return) covering an earlier year is routine rather than exceptional. You can [estimate your tax refund](/calculator) for either year.
 `,
 }, {
 slug: "how-to-find-lost-tfn",
 title:
 "Lost Your TFN? Four Places to Find It",
 description:
 "A TFN is permanent, so a lost one is a retrieval rather than a new application. It is already on your payslips, super statements and past returns.",
 category: "TFN",
 date: "29 July 2026",
 readTime: 4,
 body: `
Your TFN is not gone. It is permanent, it was issued once, and it is almost certainly already written on something you still have: a payslip, a super fund statement, a notice of assessment, or the original ATO letter. A second application does not replace it, it conflicts with it.

## Where is it already written down?

Four places cover nearly everyone, and searching all of them takes less time than any process involving a phone call or an identity check. Your TFN was written down more often than you remember, usually by an employer or a super fund rather than by you.

- Payslips and income statements from any Australian employer, many of which display it
- Superannuation fund statements and welcome letters, if you gave the fund your number
- Any Australian tax return you have lodged, and the notice of assessment that followed it
- The original letter the ATO posted when the number was issued

The fastest single move is searching your email for the phrase tax file number. Most people who believe they have lost it find it within a few minutes, usually in an onboarding email from an employer or in fund correspondence they never opened.

If you set up an online government account while you were in Australia and can still get into it, the number is visible there too.

## Why must you not simply apply again?

Because a Tax File Number is issued once per person for life, and a second application does not create a fresh start. It creates a conflicting record that has to be resolved manually before either application can proceed, which turns a retrieval into a delay of weeks.

This is the most common self inflicted problem among returning backpackers, and it is entirely understandable. The old number is missing, the form is free, applying again feels like progress. It is the one action that reliably makes it worse.

## What if you genuinely have nothing?

Then it is a retrieval through the ATO, which can be reached on 13 28 61 within Australian business hours or on +61 2 6216 1111 from overseas, or through a tax agent acting for you. Either way the process is identity verification rather than a new application.

Have your full legal name exactly as it appears on your passport, your date of birth, your passport number, the passport you held when you first applied if you have since renewed it, and your Australian address history. The renewed passport point catches people out often: the record was created against the old document, and both may be needed.

Doing this yourself from overseas is harder than doing it from Australia, because the identity checks are built around documents and phone numbers an Australian resident has and someone who left two years ago frequently does not.

## Where does this bite hardest?

At the point where you actually need it, which is usually one of two moments. Starting a new job, where not having it means 45% withholding until it is supplied. Or claiming superannuation after leaving, where the fund cannot release money to someone it cannot identify.

The super case is the more expensive one, because it stacks with everything else that goes wrong once you are out of the country: a changed address, a closed bank account, a fund that has already reported the balance as unclaimed. Anyone planning to [claim your superannuation after leaving Australia](/superannuation) should locate their TFN before the flight rather than after it.

## How do you not lose it again?

Store it somewhere that survives a stolen phone and a lost wallet, which for most people means a password manager or an encrypted note rather than a photo in the camera roll. A paper copy is fine as long as it is kept separately from your passport, since the combination of the two is exactly what identity fraud needs.

What to avoid is emailing it to yourself in plain text or leaving it in an unlocked notes app. A TFN on its own cannot empty an account, but with a passport scan alongside it, it is enough to open one.

## Five minute search or a phone call?

Finding a TFN is usually a five minute search and occasionally a phone call, and which one you are facing depends on your own history in Australia. These are the facts that decide it.

- Whether you have ever worked in Australia before, since that is what determines whether a number already exists.
- Whether you have renewed your passport since, which changes what is needed to verify you.
- Whether you are in Australia or overseas, which changes how hard the identity check is.
- Whether you have super sitting with a fund, since that is usually what makes finding it urgent.
- Whether there are prior years you never lodged, which need the same number and are usually refunds waiting.

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

Because several of the jobs most available to working holiday makers are genuinely structured as contracting. Delivery and rideshare platforms engage riders and drivers as contractors, piece rate harvest work is often contracted through labour hire, and freelance trade, photography and content work is contracting by nature.

There is also a second, less honest reason, and it is worth naming. Some employers push an ABN onto ordinary employment because it removes their obligation to pay superannuation, workers compensation and award rates. The saving is theirs and the cost is yours, and it is the single most common way a working holiday maker loses money without noticing.

## What happens if you invoice without one?

The business is required to withhold 47% from the payment before it reaches you. That is the no ABN withholding rule, and it exists to make invoicing without registration pointless rather than to punish you.

You get it back. The withheld amount is credited when you lodge your return, in the same way over withheld PAYG is, so nothing is permanently lost. What you lose is access to almost half of that payment until the return is processed, which for someone paying weekly rent is the part that actually bites.

## What changes about your tax once you have one?

Nothing is withheld for you, and that is the whole difference. On wages your employer takes tax out before you see the money. On ABN income the full invoice lands in your account and the tax is still owed, assessed at the end of the year when you lodge.

The working holiday maker rate of 15% on the first $45,000 applies to ABN income in the same way it applies to wages, so the amount is not the surprise. The timing is. Someone who earned $20,000 through an ABN and set nothing aside has a real bill at lodgement rather than a refund, and that is a very different July from the one most backpackers expect.

## What can you claim against ABN income that you could not claim on wages?

Genuine business expenses, and this is the compensation for the obligations. Fuel and vehicle running costs where a logbook supports them, phone and data apportioned to business use, equipment, insurance, platform commissions and bank fees all reduce the income the tax is calculated on.

Deductions are also where ABN returns go wrong most often, because the substantiation rules are stricter than most people assume. A logbook is not a receipt, apportionment has to be defensible, and a car claim without records is the most commonly disallowed item in this whole category.

## When does GST enter the picture?

Once your turnover reaches $75,000 in a year, registration is compulsory, and below that it is optional for most work. There is one exception that catches backpackers constantly: rideshare driving requires GST registration from the first dollar, with no threshold at all.

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
 title: "How to Register an ABN, Free on the ABR",
 description:
 "Registering an ABN on the ABR website is free, and paid ABN sites are middlemen. The steps, the questions that confuse people, and when not to register.",
 category: "ABN",
 date: "22 September 2024",
 readTime: 5,
 body: `
Registering an ABN is free on the Australian Business Register and takes about fifteen minutes. Most applications return a number immediately. What decides whether yours does is the entitlement question, because an ABN is only issued to someone genuinely carrying on an enterprise, not to anyone who has simply been told to get one.

## Who is actually entitled to an ABN?

Someone carrying on an enterprise in Australia, which means running a business activity on their own account rather than working under someone else's direction. A delivery rider choosing their own hours, a freelance designer with several clients and a harvest contractor invoicing a labour hire company all qualify. An employee does not, no matter what the employer prefers.

This is the question that decides everything else about the application, and it is the one most commonly answered without thought. If a business is telling you to get an ABN before your first shift on a job that is rostered, supervised and equipped by them, the honest answer to the entitlement question is that you are not carrying on an enterprise, and the arrangement is likely to be sham contracting rather than contracting. Registering anyway does not make the arrangement legal and does not stop the [super and award entitlements](/blog/employee-vs-contractor-australia) from being owed to you.

## What do you need before you start?

A [Tax File Number](/tfn) is the item that holds people up, because an ABN application without one is far more likely to be pushed into manual review. Everything else is information you already carry: your legal name exactly as it appears on your passport, an Australian address, an Australian phone number and an email address you will still be reading in six months.

You also need to have decided what the enterprise actually is before you begin, since the description you give shapes how the application is assessed. Vague answers cause more trouble than unusual ones.

- Your TFN, which is what links the ABN to you at the ATO
- Your full legal name as printed in the passport, including middle names
- An Australian address, a hostel included, and Australian contact details
- A plain description of the work: fruit harvesting, delivery services, cleaning
- The date the enterprise starts, which is when you begin the work

## Which questions on the form catch people out?

Three of them, and each is written for established businesses rather than for a backpacker with a scooter. The main business activity field expects a description of the work, so delivery services or fruit harvesting is right and backpacker or general labour is not, because a description the register cannot classify is one of the most common reasons an application is held for review.

The turnover question is the second. It asks whether you expect to exceed $75,000, and for almost every working holiday maker the truthful answer is no, which keeps [GST](/blog/gst-and-abn-for-working-holiday-makers) out of your life entirely. Answering yes by accident invites a GST registration and the quarterly Business Activity Statements that come with it. The third is the start date, which is when the work actually begins and not the day you landed in Australia.

## What does the ABN change once you have it?

It changes who is responsible for your tax, and it changes it completely. Nothing is withheld from an invoice, so the whole liability sits with you until the [tax return](/tax-return) is lodged, at the working holiday maker rate of 15% on the first $45,000 of combined income. Against that, genuine business expenses are deductible, which is the compensation for carrying the risk.

It also changes what your invoices have to carry. A payer who receives an invoice with no valid ABN on it is required to withhold 47% of the payment, which is a rule about the missing number rather than about you, and the excess is recovered at tax time. Quoting the number correctly on every invoice avoids the whole situation.

- Your name, and any business name you trade under
- Your ABN, quoted in full
- The date of issue and a description of the work done
- The amount payable and your contact details

## When should you cancel it?

When the enterprise ends, which for most working holiday makers is when they stop contracting rather than when they leave the country. An ABN left active after you go keeps you on the register as a business, and any GST registration attached to it keeps generating Business Activity Statement obligations whether or not any income exists.

The timing interacts with the rest of your exit. Cancelling too early can cause problems if a final invoice is still outstanding, and cancelling late is untidy rather than expensive. Our guide to [cancelling an ABN before leaving Australia](/blog/how-to-cancel-your-abn) sets out what has to be settled first.
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
You need an ABN for farm work only if the farm or labour hire company is engaging you as a contractor. If they are putting you on payroll, your [TFN](/tfn) is all you need and an ABN would be pointless. Ask which it is before the first shift, because the answer sets your tax, your super and your entitlements.

## Why does farm work involve an ABN so often?

Because most large farms do not hire pickers and packers directly. They contract a labour hire company, and a proportion of those companies pass the arrangement straight down the line by asking workers to invoice rather than putting them on payroll. That shifts the tax, the super and the workers compensation exposure off the company and onto you.

The arrangement is legal when it is genuine. It stops being legal when the work has every feature of employment, which is common in horticulture: rostered start times, a supervisor telling you which row to pick, the farm's bins and the farm's transport, and no ability to work for anyone else that week. Being asked to get an ABN is not itself a warning sign. Being asked to get one for a job that runs exactly like employment is.

- Labour hire contractor: you invoice, nothing is withheld, no super is paid, an [ABN](/abn) is required
- Direct farm employment: payroll, 15% withheld, 12% super, award rates apply, no ABN needed

## What decides whether piece rates make you a contractor?

Nothing about piece rates decides it on their own. Piece rate is a way of calculating pay, and it exists in both employment and contracting, so being paid per bin or per kilogram tells you very little about your legal status.

Under the Horticulture Award, pieceworkers who are employees are entitled to a guaranteed minimum floor for the hours worked, which means a slow day in bad fruit still has to be topped up to the award rate. A contractor on a piece rate has no such floor and simply earns what the bins earn. That difference is usually the largest single sum at stake on a harvest job, and it turns entirely on which arrangement you are actually in.

- Employee on piece rates: award floor applies, super paid, payslips issued
- Contractor on piece rates: no floor, no super, invoices instead of payslips
- Same fruit, same bin, same shed: the paperwork is the only difference

## When should you be suspicious of an ABN arrangement?

When the features of employment are all present and the paperwork says otherwise. If your hours are dictated, your equipment is supplied, you work for that business and no one else, and a colleague doing the identical job is on payroll with super, then the label on your arrangement is doing work the facts do not support.

That is sham contracting, and it is prohibited under the Fair Work Act. The practical effect on a backpacker is that the missing 12% super, the missing award floor and the missing workers compensation cover all sit with you until someone challenges it. The Fair Work Ombudsman takes these complaints without charge, and being on a 417 or 462 visa does not reduce your standing to make one.

- Vagueness about whether you are employed or contracted
- Pressure to register an ABN quickly, before anything is explained
- Identical work to payroll staff who receive super and leave
- Your hours, tools and location all controlled by the business

## What are your tax obligations on ABN farm income?

Nothing is withheld, so the whole tax bill arrives at once at the end of the financial year. The working holiday maker rate of 15% on the first $45,000 applies to your total income, ABN and wages combined, so a season of harvest contracting still sits inside that bracket for most people.

What changes is who holds the money in the meantime. On payroll the ATO already has your 15%; on an ABN you do, and it needs to still be there in October. Setting aside a fixed share of every payment as it lands is the only method I have seen work reliably, because the alternative is finding the money after the season and after the road trip. Genuine business expenses reduce the figure, which is the one advantage the ABN side carries.

- All ABN income is declared on the same [tax return](/tax-return) as any wages
- No PAYG is withheld, so nothing is prepaid against the bill
- Labour hire clients generally pay no super on contractor invoices
- An invoice without a valid ABN gets 47% withheld by the payer

## Does ABN farm work count towards the second year visa?

It can, because specified work is defined by what the work is and where it is done, not by how you were paid. Genuine harvest or agricultural contracting in an eligible postcode counts on the same terms as payroll work in the same shed.

The evidence burden is what changes, and it changes against you. Payroll work generates payslips that tie dates, hours and locations together automatically. ABN work generates only what you keep, so you need invoices, bank records and employer references that place you in the right postcode on the right dates. Where a sham arrangement is later unpicked, both things are at risk at once: the visa evidence and the pay claim rest on the same set of facts. If a farm will only engage you on an ABN, invoice properly, bank every payment rather than taking cash, and keep a dated work log with locations.
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

The substance of the arrangement decides it, and the ATO and the Fair Work Ombudsman both weigh the same handful of factors rather than applying one clean test. Control is the heaviest of them: if the business decides when you start, where you go and how the job is done, that points hard at employment no matter what your paperwork says.

Six factors carry most of the weight, and they are all things you already know about your own job. Who sets the hours. Whose tools and equipment you use. Whether you could send someone else in your place. Whether you can lose money on a job or only ever earn from it. Whether you work for that business exclusively. Whether you are presented to customers as part of the business or as an outside supplier.

- Control: rostered by them, or scheduled by you
- Tools: their ute, their gear, their software, or yours
- Delegation: could you lawfully send a substitute
- Risk: can a job cost you money, or only pay you
- Exclusivity: one business all year, or several clients
- Integration: their uniform and their name badge, or your own invoice

No single factor settles it. In practice, four or more pointing at the business means employee, whatever the [ABN](/abn) on the invoice says.

## How do you tell which side your own job falls on?

Look at the payment method first, because it separates the two faster than anything else. An employee is paid a rate for time, has PAYG withheld before the money lands, and can see [super](/superannuation) on the payslip. A contractor is paid against an invoice for an agreed piece of work, receives the gross amount, and is responsible for the tax afterwards.

Then look at what happens when you are sick or when the work runs out. Employees accrue paid leave or, if casual, a loading in place of it, and they are covered by workers compensation. Contractors carry both risks themselves, which is the trade for charging more per hour.

- Paid hourly or daily, tax already taken out: employee
- Paid per bin, per job or per invoice, nothing withheld: usually contractor
- Told when to arrive and what to wear: employee indicators
- Free to accept or decline work and to work elsewhere the same week: contractor indicators

## What does the classification change in money terms?

It changes four things at once, and three of them are worth real money over a working holiday year. An employee receives 12% superannuation on top of wages, accrues leave, is covered by workers compensation, and has the award minimum as a floor under their rate. A contractor gets none of those and must fund their own tax bill out of what lands in the account.

The fourth is withholding. An employee on a [TFN](/tfn) with a completed declaration is withheld at 15% as a working holiday maker. A contractor who invoices without quoting a valid ABN has 47% withheld by the payer, which is a rule about the missing number rather than about the person, and the excess comes back when the return is lodged.

- Super: 12% of ordinary time earnings for employees, generally nothing for contractors
- Leave: accrued or loaded for employees, none for contractors
- Rate floor: award minimums apply to employees only
- Injury: workers compensation for employees, own insurance for contractors

## What is sham contracting, and how would you know?

Sham contracting is a business dressing an employment relationship up as contracting so it does not have to pay super, leave or award rates. It is illegal under the Fair Work Act, and the giveaway is always the same: your day looks identical to that of a colleague who is on payroll, but you were told to get an ABN before your first shift.

The pattern I see most often on backpacker jobs is a labour hire arrangement where the worker is rostered, supervised, supplied with all the equipment and paid per hour, yet asked to invoice. That is not contracting in any sense the law recognises, and the fact that you signed something agreeing to it does not change the analysis.

Two branch points decide what this is worth to you. If you were genuinely an employee, unpaid super and the gap between what you were paid and the award rate can both be recovered, and the Fair Work Ombudsman handles the complaint free. If the arrangement was genuine contracting, none of that applies, and the money comes back instead through deductions against your ABN income. Visa status does not weaken either claim.

## Can you be an employee and a contractor at the same time?

Yes, and a lot of working holiday makers are. Employment at a cafe on a [TFN](/tfn) and delivery work on an [ABN](/abn) is a completely ordinary combination, and each stream keeps its own rules: 15% withheld on the wages, nothing withheld on the invoices, super on the wages only.

Both streams land on one [tax return](/tax-return) at the end of the financial year. That is where the two halves interact, because the withholding already taken from your wages is credited against the total bill, and a year with heavy ABN income and light wages is the case where a refund can turn into an amount owing. Knowing which way that lands is worth checking before June rather than after October.
`,
 }, {
 slug: "can-you-have-tfn-and-abn",
 title:
 "TFN and ABN Together? Yes, Here Is How",
 description:
 "Working holiday makers can hold both. The TFN covers employment, the ABN covers contracting, and nothing is withheld on ABN income until assessment.",
 category: "ABN",
 date: "20 July 2026",
 readTime: 5,
 body: `
Yes. A working holiday maker can hold a Tax File Number and an Australian Business Number at the same time, and you need the TFN first because it is required to register an [ABN](/abn). The TFN covers employment income. The ABN covers contracting income. Both are declared on the same tax return.

## What does each number actually do?

They are not two versions of the same thing and they are not interchangeable. The TFN is your identity with the ATO as a person: it sits behind your employment, your tax return, your superannuation account and your bank interest. The ABN is your identity as a business: it goes on invoices you issue, and it is what tells a payer they are buying a service rather than employing someone.

The practical difference is one thing and it matters more than everything else on this page. Employment income arrives already taxed, because your employer withholds. ABN income arrives whole, with nothing taken out, and the tax on it is settled once, at assessment.

## Is holding both normal on a working holiday visa?

Completely. A common year looks like ten months of hospitality or farm work through payroll under a TFN, with delivery riding, a stall, some photography or a few weeks of contracted labour invoiced under an ABN alongside it.

The seasons make it more common than people expect. A summer in Cairns waiting tables, a Uber Eats or DoorDash account running on weekends, and a stretch of vintage work in the Barossa or Margaret River billed as a contractor is three income shapes in one financial year, and all three go on one return.

## What is the trap that catches people in October?

Nothing is withheld from ABN income during the year, so the money feels like it is all yours as it arrives, and then the assessment arrives afterwards. The working holiday maker rates apply across your combined income, so ABN earnings stack on top of your wages rather than being taxed in isolation.

The habit that prevents it is putting aside roughly 15 to 20 cents of every ABN dollar as it comes in. Riders and contractors who do that never have a problem. The ones who have a problem are almost always the ones who had a good three months and treated the gross as income.

## When should you not be using an ABN?

When the work is employment. This is the most consequential thing on this page, because being paid through an ABN for what is really a job strips out three things at once: no tax is withheld, no superannuation is paid for you, and no leave entitlements accrue.

The pattern to watch for is being moved from payroll onto invoicing for the same job, the same hours, the same supervisor and the same roster. That is sham contracting, it is unlawful, and the reason it happens is that it is cheaper for the operator. If the job looks like employment, it legally is employment regardless of what the paperwork says, and the [employee versus contractor distinction](/blog/employee-vs-contractor-australia) is decided on how the work is actually done.

## What are you responsible for that an employee is not?

Your own records, essentially. Your employer reports your wages to the ATO automatically through payroll, so employment income turns up on your return whether you track it or not. ABN income does not, and you are the only person who knows what came in.

That means keeping a copy of every invoice you issue and every payment received, and keeping the expense records that support what you claim against it. It also means watching the GST threshold: registration becomes compulsory once your business turnover reaches $75,000 in a year, and it is compulsory from the first dollar for rideshare driving, which is a rule that surprises people.

## What does your ABN half do to the bill?

Holding both numbers is straightforward. What varies enormously is what the ABN half of your income does to your assessment, and these are the facts that decide it.

- Whether your ABN work is genuinely contracting or is employment wearing a different hat. This changes your super, your leave and who carries the tax.
- Whether most of your ABN income comes from a single payer. Where 80% or more comes from one source, personal services income rules can restrict what you deduct against it.
- Whether you crossed the GST threshold, or are driving rideshare, where GST applies from the first fare.
- Whether you set money aside during the year. This is the difference between an October assessment being routine and being a shock.
- Whether you had a period on wages before your TFN was on file, which puts part of the year at 45% and pulls in the opposite direction.

Both income streams settle in the same [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know roughly what each stream came to.
 `,
 }, {
 slug: "how-to-cancel-your-abn",
 title: "How to Cancel an ABN Before You Fly Home",
 description:
 "Cancel your ABN free via the ABR before you leave - or risk ATO letters and lodgment demands later. The steps, and what to file for your final year.",
 category: "ABN",
 date: "9 October 2024",
 readTime: 4,
 body: `
Cancel it when you stop contracting, not when you happen to remember. Cancellation is free, takes minutes through the Australian Business Register, and takes effect from the date you specify rather than the date you file. Leaving one open after you fly home is what creates lodgement expectations you will still be answering from another country.

## Why does an open ABN matter after you have gone?

Because the ABN is a registration with ongoing obligations, not a certificate you earned. While it is active the ATO can reasonably expect activity statements and returns, and where you registered for GST it will expect a BAS whether or not you invoiced anything.

Correspondence also keeps going to whatever Australian address is on file, which for most backpackers is a hostel or a share house they left months earlier. Nothing gets forwarded, notices go unanswered, and the first you hear about it is when something has escalated. An open registration with an untended address is also a soft target for identity fraud.

## What has to be finished before you cancel?

Everything that runs through the ABN, because cancelling closes the registration rather than the obligations attached to it. Once cancelled, late invoicing becomes awkward, so the order matters.

- Issue every outstanding invoice while the ABN is still active
- Collect payments you are owed, since chasing them from overseas is harder
- Lodge any BAS due if you were registered for GST, and cancel that registration separately
- Note the ABN income earned to the cancellation date, which still belongs in your return
- Keep the records for the deductions you intend to claim against that income

The GST registration is the one people forget. Cancelling the ABN does not automatically end a GST registration in every case, and a live GST registration generates quarterly obligations of its own.

## Does cancelling remove your obligation to lodge?

No, and this is the misunderstanding that causes the most trouble. Cancelling ends the registration going forward. Income already earned under it remains assessable, and the return covering that year still has to be lodged.

If the financial year has not ended when you leave, the return is lodged after 1 July from wherever you are. Our guide to [lodging from overseas](/blog/how-to-lodge-tax-return-from-overseas) covers what that needs, and the short answer is an open Australian bank account more than anything else.

## Which date should you choose?

The date you actually stopped the activity, not today's date. The two are frequently different, and a backpacker who last invoiced in March and remembers to cancel in June should cancel effective March.

The date matters because it defines the period the ATO regards you as carrying on an enterprise. A cancellation dated later than the real end suggests months of activity that produced no income and no reporting, which is exactly the pattern that generates queries.

## Should you keep it open in case you come back?

Almost never. An ABN is permanent in the sense that the number stays associated with you, and it can be reactivated if you return and start contracting again, so keeping it live buys nothing.

What keeping it live does cost is a continuing set of lodgement expectations for years in which you were not in the country. If you do return and need one, reactivating is a short process, and the paperwork of a dormant registration in between is not worth avoiding it.

## Is there anything else to close on the way out?

Superannuation, though it works the other way around. ABN contracting generally produces no super, because contractors are not paid the guarantee, but most working holiday makers also had employment alongside it and that employment did.

Super can only be claimed once your visa has ceased and you have left Australia. A DASP claim is typically approved within about 28 days, and the taxable component is taxed at 65% for working holiday makers. Our [superannuation guide](/superannuation) covers the timing, which is worth getting right because it cannot be undone once claimed.

## Settle these before the cancellation date.

Cancelling is simple. What needs to happen around it depends on how the ABN was actually used. The list below is what should be closed off before the cancellation date rather than after it.

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
Most working holiday makers with an [ABN](/abn) never touch GST. Registration is compulsory once turnover reaches $75,000 in a twelve month period, and almost nobody on a 417 or 462 visa gets near that. The one group that must register from the first dollar is drivers carrying passengers for money, whatever they earn.

## What does the $75,000 threshold actually measure?

It measures gross turnover from your business activities over any rolling twelve month period, before any expenses are taken out. It does not measure profit, and it does not include wages you earn on a [TFN](/tfn), so a year of cafe work plus a small amount of freelance income sits nowhere near the threshold even if the combined total looks large.

The test is forward looking as well as backward looking. You must register within 21 days of the month in which your turnover reaches $75,000, or of the point at which you reasonably expect it to. For a working holiday maker that expectation almost never arises, because the visa itself limits how long the enterprise can run.

- Under $75,000 of ABN turnover: registration is optional for most activities
- $75,000 or more: registration is compulsory within 21 days
- Employment income paid through payroll never counts towards the threshold
- Turnover is gross, so fuel, tools and platform fees do not reduce it

## Who has to register regardless of income?

Anyone providing taxi travel or ride sourcing, which means carrying paying passengers. If you drive for Uber, DiDi, Ola or a taxi network, the threshold does not apply to you and GST registration is required from your first trip, even if you only ever do a handful.

Food delivery is the distinction people get wrong, and platforms rarely explain it. Delivering meals for Uber Eats, DoorDash or Menulog is not passenger transport, so the ordinary $75,000 threshold applies and most delivery riders never need to register at all. Drivers who do both passenger work and delivery are caught by the passenger side and must register for everything.

- Passengers for a fare: GST from the first dollar, no threshold
- Food and parcel delivery only: ordinary $75,000 threshold applies
- Both in the same ABN: registration required, covering all of it

## What happens if you are not registered?

Nothing happens, which is the point. You issue invoices without GST on them, you lodge no Business Activity Statements, and your only obligation under the ABN is to declare the income on your [tax return](/tax-return) and pay income tax on the net figure at the working holiday maker rate of 15% on the first $45,000.

This is the ordinary position for the large majority of backpackers with an ABN, and it is worth being clear that staying unregistered below the threshold is compliant rather than a shortcut. The mistake I see far more often than late registration is the opposite one, described below.

## What does registering actually commit you to?

It commits you to collecting 10% on top of what you charge, holding it, and handing it to the ATO on a schedule. The 10% is never your money at any point, which is what makes an unregistered spend of it so painful to unwind, and it has to be reported on a Business Activity Statement quarterly for most people.

Registration also lets you claim back the GST you paid on genuine business purchases, which is the argument in its favour. For a working holiday maker whose costs are fuel and a phone plan, the credits rarely come close to justifying four BAS lodgements a year and the record keeping behind them.

- Charge 10% on invoices and keep it separate from your own money
- Lodge a BAS quarterly, or monthly at higher turnover
- Claim credits for GST paid on genuine business expenses
- Cancel the registration when the enterprise ends, and lodge any outstanding BAS

## What is the most common GST mistake backpackers make?

Registering when there was no need to. People tick the GST box during an ABN application because it looks more professional or because someone at a job site told them to, and the obligation that follows is real: BAS lodgements start immediately, and they keep falling due whether or not any income arrives.

The fix is not complicated once it is identified. The registration can be cancelled from the date the enterprise ended or from the date it began where it should never have existed, and outstanding statements are lodged as nil where that is true. What decides how much work it takes is how long it ran unnoticed, because each quarter that passed is a separate lodgement that still has to be accounted for.
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
The Australian financial year runs 1 July to 30 June, not January to December. You lodge a return for any year in which you earned Australian income, and the self lodgement deadline is 31 October. A return lodged under a registered tax agent generally gets longer. Which year a pay belongs to is decided by when it was paid.

## Why does the July to June boundary matter so much to a backpacker?

Because a twelve month working holiday almost never sits inside one financial year, and that split is usually worth money rather than being an inconvenience. Arrive in September, work through to the following August, and you have two part years rather than one full one.

Each year is assessed on its own. Withholding is calculated pay by pay as though the rate will continue all year, so a part year of earnings is very often over withheld, and that shows up as a refund at the end of each of the two years rather than one.

## Which year does a given pay belong to?

The year in which it was paid to you, not the year you did the work. A shift worked in late June and paid in early July falls into the new financial year, and a final pay that lands after 30 June sits in the following year's return even though the job ended before it.

- Arrived October 2025 and worked to April 2026: all of it falls in the 2025-26 year, which ended 30 June 2026.
- Started work in March 2026 and continued past July: March to June 2026 sits in 2025-26, and July onwards sits in 2026-27.

This is also why your income statement, not your own recollection, is the authority on what belongs where. It is compiled from what the employer actually reported to the ATO by payment date.

## What actually happens at the end of the year?

The ATO compares the tax you should have paid on the year's total income against the tax your employers withheld from each pay. If more was withheld than owed, the difference is refunded. If less was withheld, the difference is payable.

For most working holiday makers the balance falls on the refund side, and it does so for structural reasons rather than luck: any weeks before your TFN reached the employer were withheld at 45% instead of 15%, part year earnings are over withheld by design, and deductions and the Medicare levy exemption are only applied at assessment.

## When is the deadline, and what moves it?

31 October following the end of the financial year, for anyone lodging their own return. The 2025-26 year ended 30 June 2026, so its self lodgement deadline is 31 October 2026, and the 2026-27 year runs to 31 October 2027.

Returns lodged with the ATO under a registered tax agent generally fall under a later concessional date, often well into the following year. That is worth knowing if your records are incomplete or you have already passed October, because a missed October deadline is not the end of the matter and penalties are not automatic.

## What if you left Australia before the year ended?

You can still lodge, and in some circumstances you can lodge early. A return can be prepared and lodged from anywhere, and a refund is paid into an Australian bank account, which is the reason to keep that account open until the money clears rather than closing it at the airport.

Closing the account is the single most common self inflicted problem for departed backpackers, because a refund that cannot be paid sits with the ATO until an alternative is arranged from overseas. Our guide to [lodging a tax return from overseas](/blog/how-to-lodge-tax-return-from-overseas) covers what changes once you have gone.

## What decides whether you have to lodge at all?

Whether tax was withheld from your pay, in almost every case. If any employer withheld anything, a return is how you find out whether it was too much, and for working holiday makers with any Australian earnings the practical answer is that a return is required.

There are narrow situations where no return is needed, generally where there was no income and no withholding at all. There is a separate and more common situation worth naming: a year you earned in and never lodged for does not disappear. It remains lodgeable, and prior year refunds are frequently still claimable.

## Two returns or one?

The dates are fixed. What they mean for your money is not, and most working holiday makers have two returns rather than one. These are the facts that decide what each of them is worth.

- Which side of 30 June your first and last pays landed on, which sets how many returns you have.
- Whether either year was a part year, since part year withholding routinely overshoots.
- Whether there was a period before your TFN reached the employer, withheld at 45% rather than 15%.
- Whether you are lodging yourself or under a registered tax agent, which changes the deadline.
- Whether an Australian bank account is still open to receive the refund.
- Whether any earlier year was never lodged, which is usually still recoverable.

Both years are worked out in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) for each year separately.
 `,
 }, {
 slug: "backpacker-tax-rate-australia",
 title: "Backpacker Tax Rate: 15% to $45,000",
 description:
 "Working holiday makers pay 15% on the first $45,000 with no tax free threshold. The 2025-26 and 2026-27 brackets, and what triggers a refund.",
 category: "Tax Return",
 date: "27 October 2024",
 readTime: 5,
 body: `
The working holiday maker rate is a flat 15% on the first $45,000 of income each financial year, for both subclass 417 and 462 visas. It replaces the resident brackets, so there is no tax free threshold and no rate free step at the bottom. Getting that rate applied depends on two things being in place, not one.

## What has to be true before 15% is actually applied?

Three conditions, and most people only know the first. Your TFN has to be with the employer, the Tax File Number Declaration has to record you as a working holiday maker, and the employer has to be registered with the ATO as an employer of working holiday makers.

If the TFN is missing, withholding is 45%. If the employer is not registered, withholding is 30% even with a correct TFN and a correct declaration, because an unregistered employer must apply foreign resident rates. That third condition is invisible from your side and is the most common cause of a payslip that looks wrong for no apparent reason.

## What does the rate look like in practice?

A flat rate means the arithmetic is simple and the same every week, with no step and no tapering across the first $45,000.

- $1,000 a week: $150 withheld, $850 to you
- $1,500 a week: $225 withheld, $1,275 to you
- $2,000 a week: $300 withheld, $1,700 to you

Above $45,000 the rate rises: 30% from $45,001 to $135,000, 37% to $190,000, and 45% above that. Very few working holiday makers reach those levels in one year, though mining, specialist trades and long stretches of high paid construction do occasionally get there.

## How does it compare with resident and ordinary foreign resident rates?

It sits between the two, which is why the comparison confuses people. An Australian tax resident pays nothing on the first $18,200 and then rising rates. An ordinary foreign resident pays 30% from the first dollar. A working holiday maker pays 15% from the first dollar.

So at typical backpacker earnings a working holiday maker does better than a foreign resident and worse than a resident. There is a narrow exception where a year is assessed differently and better treatment follows, but it hangs on a residency judgement that is easy to call wrongly in both directions, and a position is only taken after the whole year has been reviewed. Our guide to [tax residency for working holiday makers](/blog/tax-residency-working-holiday-makers) covers why it is not a box you can tick yourself.

## Why do people with correct 15% withholding still get refunds?

Because 15% withheld correctly all year is the exception rather than the rule for this audience. The typical year has at least one period where something else applied, and that period is where the refund comes from.

- Weeks before the TFN reached the employer, withheld at 45% rather than 15%
- Work for an employer who was not registered as a working holiday maker employer, withheld at 30%
- A declaration completed as foreign resident rather than working holiday maker
- Deductions for work related expenses that are only applied at assessment
- The 2% Medicare levy, which is only removed if the exemption is claimed

Take a year in which someone earned $37,000 but spent three weeks with a new employer before the TFN was recorded. The tax properly payable on that income at 15% is $5,550. If $4,000 of it was withheld at 45% rather than 15%, $1,200 more was taken than was owed, and that is what the return recovers before any deduction is considered.

## What is not true about the backpacker tax?

Four claims circulate constantly in hostels and backpacker groups, and each one costs somebody money every year. They persist because each contains a grain of something true, which is what makes them convincing.

- That backpackers pay no tax at all. The 15% applies from the first dollar, with no threshold.
- That correct withholding means there is nothing to claim. Deductions, the Medicare levy exemption and any mis withheld period all remain.
- That the rate varies by state. It does not. It is a federal rate, though payroll errors are more common with smaller regional employers.
- That leaving Australia ends the matter. A return can be lodged from overseas and the refund paid to an Australian account.

## Does the Medicare levy sit on top of the 15%?

Generally not, but only if it is claimed. The 2% levy applies to people entitled to Medicare, and most working holiday makers are not entitled, so it should not apply. It is not removed automatically.

The exemption is claimed at item M1 of the return and is evidenced by a Medicare Entitlement Statement from Services Australia, which commonly takes weeks to issue. Entitlement follows the passport: a British passport holder is generally entitled to Medicare and therefore pays it, while German and Japanese passport holders generally are not and therefore should not.

## What happens when your stay crosses two financial years?

You get two assessments rather than one, and each is calculated as though it were a whole year. That is why a stay that feels like twelve months of steady work produces two part year returns, and part year earnings are systematically over withheld.

The reason is mechanical. Payroll withholds from each pay as though that rate of earning will continue for the full year, so someone who worked eight months and earned $30,000 has been withheld as though heading for a much larger annual figure in the year the work started. The correction happens at assessment, in your favour, in both years.

## Does ABN income get taxed at the same rate?

Yes, and that catches people out precisely because the rate is identical. Income invoiced under an ABN is assessed at the same 15% on the first $45,000, but nothing was withheld from it along the way, so the tax arrives as an amount payable rather than as something already handled.

Someone with both wages and ABN income in one year usually finds the PAYG withheld from the wages absorbs the tax owed on the ABN side. Someone with ABN income only, who set nothing aside, is the person who receives a bill in a year they expected a refund.

## The rate is fixed. Your refund is not.

The rate is fixed by statute. What you actually paid, and what comes back, is decided by facts specific to your year. These are the ones that move the number, and each is something your payslips will already tell you.

- Whether every employer had your TFN from the first pay, and how long any gap ran.
- Whether each employer was registered with the ATO as a working holiday maker employer.
- How the residency and working holiday maker boxes on each declaration were completed.
- Which passport you hold, which decides the Medicare levy question and can matter elsewhere in ways that are assessed case by case.
- Whether you also had ABN income, which carries no withholding at all.
- Whether the year was a part year, since part year withholding routinely overshoots.

All of it is reconciled in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know what each employer actually withheld.
 `,
 }, {
 slug: "how-to-lodge-tax-return-working-holiday",
 title: "How to Lodge a Working Holiday Tax Return",
 description:
 "A working holiday return needs every income statement, the working holiday income item and your Medicare position. Those three decide the refund.",
 category: "Tax Return",
 date: "29 October 2024",
 readTime: 7,
 body: `
An Australian [tax return](/tax-return) covers the year to 30 June and is due by 31 October if you lodge it yourself. You can do it from anywhere in the world. What decides how straightforward it is is whether every employer has finalised, and whether you can still prove who you are.

## When can you actually lodge?

Not on 1 July, whatever the hostel says. Employers have until mid July to finalise their payroll reporting, and until they do, your income statement is marked as not tax ready, which means the figures in it can still change.

Lodging before that point is the most common self inflicted error of the season. The return goes in against incomplete data, the employer finalises a week later with a different total, and the assessment has to be amended, which takes considerably longer than waiting would have done. The exception is a return lodged early because you are leaving Australia permanently part way through the year, which is a different process with its own rules.

## What do you actually need to have?

Less than most people assume, because the income side comes from the ATO rather than from you. Income statements are lodged by employers directly, so payslips are a cross check rather than a requirement, and a job you have no paperwork for is still in the system.

What you must supply is everything the ATO does not already hold.

- Your TFN and identity documents
- An Australian bank account for the refund, which is the item people lose first
- Records for any deductions you intend to claim
- A Medicare Entitlement Statement if you are claiming the levy exemption, ordered from Services Australia weeks in advance
- Details of any ABN or contractor income, which is not pre-filled

## What decides whether you can lodge from overseas?

Access rather than eligibility. There is no rule preventing a return being lodged after you have left, and doing it from your parents' kitchen in Manchester is entirely ordinary. The obstacles are identity verification and the refund destination.

Establishing or recovering a myGov identity from overseas is materially harder than doing it here, because the verification routes are built around Australian documents and an Australian mobile number. A closed bank account is the other one: the refund has to land somewhere, and reopening an account from abroad is slow. Both are cheap to prepare in your last month in Australia and expensive to fix afterwards, which is the single most useful thing to know before you fly. Lodging through a registered agent removes the myGov half of the problem but not the bank account half.

## What happens after it goes in?

The ATO compares what was withheld across the year against what you actually owed and issues a notice of assessment. Refunds are usually paid about 14 business days after lodgement, and longer through the July to September peak when most of the country lodges at once.

Two things extend that. A return that does not match the pre-filled data goes to manual review, which is not an audit and not a problem, but it does add time. And a return lodged with a bank account the ATO cannot pay into simply stops, so a wrong BSB is a much bigger delay than a complicated deduction.

## What changes if you had several employers?

The reconciliation becomes the work, rather than the lodgement. Every employer who reported income against your TFN has to appear, and the risk in a multi employer year is not that you declare too much, it is that you forget one and the ATO adjusts your assessment afterwards.

It is also where the money usually is. Over-withholding concentrates at one employer rather than spreading evenly, so the job that ran at 45% for six weeks or the labour hire company that was never registered is the one that determines the size of the refund. Working out which employer sat meaningfully above 15% is the part of a multi employer return that is worth doing carefully, and it is a different exercise from simply adding the totals up.

## What if you also had ABN income?

Then you have two income types on one return, and only one of them had tax taken out along the way. Wages arrive with PAYG already withheld and pre-filled; [ABN](/abn) income arrives with nothing withheld and nothing pre-filled, so it has to be declared from your own records.

That combination is the case most likely to produce an amount owing rather than a refund, because the withholding on the wage side was calculated without knowing about the contracting side. Whether it lands as a refund or a bill depends on the ratio between the two and on what deductions the ABN work supports, and it is worth working out before June rather than discovering in October.
`,
 }, {
 slug: "what-is-payg-payment-summary",
 title:
 "PAYG Summary Is Now an Income Statement",
 description:
 "The paper PAYG payment summary is now the income statement, held in ATO systems rather than by your employer. Why finalisation decides when you lodge.",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 5,
 body: `
The PAYG payment summary no longer exists as a paper document. It was replaced by the income statement, which reports your total wages and total tax withheld for each employer across a financial year. It sits in ATO systems rather than with your employer, and it is what a return is built from.

## What is the difference between PAYG withholding and a payment summary?

They are the ongoing process and the year end record of it, and the two get used interchangeably in a way that confuses people. PAYG withholding is the system: your employer takes tax out of each pay and sends it to the ATO on your behalf, every pay cycle, all year.

The income statement, formerly the PAYG payment summary and before that the group certificate, is the annual total of that. One employer, one financial year, one statement showing gross wages and total tax withheld. The names are historical rather than meaningful, and Australians still say group certificate out of habit.

## Where does an income statement actually live?

In ATO systems, populated directly by your employer's payroll software under single touch payroll. Your employer does not hand you anything, there is nothing to collect on your last shift, and there is no paper version to lose.

This is a genuine improvement for a backpacker, because it means the record survives you leaving the country, losing touch with an employer, or never having set up an online account in the first place. A tax agent can retrieve every income statement across every employer directly, which is the standard route for anyone lodging from the United Kingdom, Germany or Japan after going home, and it routinely surfaces an employer the person had forgotten.

## Why does the finalisation date decide when you can lodge?

Because an income statement is not usable until the employer marks it finalised, and until then it is explicitly flagged as not tax ready. Employers finalise between 14 July and 31 July in the ordinary course.

Lodging before finalisation is the most common self inflicted problem in July. The return goes in against incomplete figures, the employer finalises afterwards with different numbers, and what should have been one lodgement becomes a lodgement plus an amendment. Waiting until late July or early August avoids it entirely, and there is no advantage to being first.

## What if an employer never finalised?

It happens, and it clusters exactly where you would expect: single site operators, small farms and packing sheds running casual payroll through a season, and venues where one person does the books around everything else. Past 31 July, an income statement still showing as in progress means the employer has not completed their obligation.

Your obligation does not disappear because theirs was not met. The income is still declarable, and the way through is to reconstruct it from your own evidence: payslips, bank deposits showing the wages landing, and rosters. This is the single strongest argument for keeping payslips in one folder as they arrive, because reconstructing a season of farm work from bank statements alone is possible but unpleasant.

## What should you check before your return goes in?

Whether every employer you worked for is actually on the list, and whether the figures match what you were paid. The ATO's data is usually accurate, and it is not always accurate, and a discrepancy is far cheaper to resolve before lodgement than after.

The two failures worth looking for specifically are a missing employer, which is the finalisation problem above, and a withholding percentage that does not match what you expect. An employer running at 45% because your TFN never reached them, or at foreign resident rates because they are not registered as a working holiday maker employer, both show up here as a percentage that is not 15%, and both mean a larger refund concentrated in that one employer.

## Is your income statement ready to lodge from?

An income statement is generated for you rather than by you, so what varies is whether it is complete and whether it is finalised. These are the facts that decide when you can safely lodge.

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
 "Tax Deductions on a Working Holiday",
 description:
 "Protective clothing, tools, travel between job sites, work phone use and agent fees are all claimable. What decides each one is the record you kept.",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 5,
 body: `
Working holiday makers claim work related deductions on the same terms as anyone else in Australia. Uniforms and protective clothing, tools, travel between work sites, the work share of a phone bill and tax agent fees are all deductible. What decides each one is whether the expense earned your income and whether you kept a record.

## What makes an expense deductible at all?

An expense is deductible when you paid for it yourself, it directly relates to earning your income, and you were not reimbursed for it. Those three conditions do the work in almost every case, and the third is the one people forget. If the farm handed you the gloves, the gloves are not yours to claim.

The fourth condition is evidence. Without a receipt, a bank line or a diary note, a genuine expense is still not claimable, which is why the year you can substantiate is usually smaller than the year you actually spent.

## What work clothing can you claim?

Clothing is deductible when it is protective, compulsory and distinctive, or a genuine uniform, and it is not deductible when it is ordinary clothing you happen to wear to work. This is where working holiday makers most often claim something they cannot, because hospitality dress codes feel compulsory even when they are not.

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

Tools you buy yourself to do the job are deductible, and the size of the purchase decides whether you claim it at once or over several years. Knife rolls, chef whites, work boots, trade tools and equipment for contracting work all qualify where the employer did not supply them.

Items costing $300 or less each are claimed in full in the year you buy them. Larger items are written off over their effective life, and from 1 July 2026 the immediate write off threshold rises to $1,000 for eligible items, which is covered in our guide to [the $1,000 instant deduction](/blog/1000-dollar-instant-deduction-rule-2026).

## Which travel can you claim, and which is private?

Travel between two different workplaces on the same day is deductible. Travel between home and your regular workplace is private, however long it is and however early the shift starts. That single line resolves most backpacker travel questions before they begin.

- Deductible: driving from a morning cafe shift to an afternoon catering job
- Deductible: travel to training or a work meeting away from your usual site
- Not deductible: the daily trip from the hostel to the same packing shed

There is a narrow exception where you must carry bulky equipment that cannot be secured at the workplace. It is genuine, and it is claimed far more often than it applies.

## How much of your phone bill counts?

You can claim the work related share of your phone, internet and devices, but you have to be able to justify the percentage rather than picking one. The accepted method is a representative four week diary of work versus private use, applied to the year.

For a backpacker whose phone is used for rosters, shift swaps and contact with a labour hire agency, a modest percentage is easy to support. A high percentage on a phone that is also the only way you speak to your family at home is not, and it is the kind of claim that invites questions on an otherwise clean return.

## What do working holiday makers claim most often?

The pattern is consistent across the returns we prepare, and it follows the work rather than the visa. Outdoor and farm workers claim sun protection, boots and hi vis. Kitchen workers claim knife rolls and chef whites. Almost everyone has a defensible phone percentage, and the tax agent fee itself is deductible in the following year.

- Sunscreen, sunglasses and a sun hat for outdoor work
- Work boots and hi vis for farm and construction work
- Knife rolls and chef uniforms for kitchen work
- The work share of a phone plan
- Tax agent fees
- Self education directly related to the work you are already doing

## What is never deductible, whatever the circumstances?

Some costs feel work related and are not, and they account for most rejected claims. Visa costs are the clearest example: the visa is what lets you be in the country, not what earns your income, so neither the application fee nor the flight is deductible.

- Visa application fees and travel to Australia
- Meals, unless you were travelling away from home overnight for work
- Anything your employer reimbursed
- Home to work travel
- Everyday clothing

## What decides the size of your deduction claim?

Three things, and only one of them is what you spent. The first is your line of work, because the same $400 of boots and gloves is ordinary for a construction labourer and unusual for a receptionist. The second is what you can substantiate. The third is whether the expense was yours or the employer's.

There is a limited concession that lets you claim up to $300 of work related expenses in total without receipts, and it is widely misunderstood as a free $300. It is not. You still have to have spent the money and be able to explain how you worked out the figure, and once your total claim passes $300 the concession falls away for the whole claim, not just the excess.

## Where does this stop being a list and start being a judgement?

It stops being a list when the same expense could sit in two places, which is where most of the value is won or lost. A vehicle used for two jobs, a laptop used for contracting and for booking flights, a phone that runs a delivery app and a group chat: each of those is a percentage rather than a yes or no, and the percentage is a judgement about your year that no article can make for you.

The other judgement is which employer the expenses attach to. A year with four employers, one of them under an ABN, produces deductions that belong in different parts of the return, and putting them in the wrong place is the most common reason a self lodged return is amended later. That analysis is part of preparing your [tax return](/tax-return), alongside the residency and Medicare items that usually move more money than the deductions do.
`,
 }, {
 slug: "do-you-need-to-lodge-tax-return-short-stay",
 title:
 "Worked a Few Months? You Still Must Lodge",
 description:
 "Even a short working stint usually needs a tax return, and short stays are often over withheld, so lodging pays. The rules and the non-lodgment advice.",
 category: "Tax Return",
 date: "7 November 2024",
 readTime: 5,
 body: `
Yes, almost certainly. The obligation to lodge follows income, not length of stay: two weeks of wages creates the same requirement as two years. Short stays are also where the refund percentages are highest, because withholding assumed a full year that never happened.

## What triggers the obligation?

Earning wages in Australia during a financial year, which runs 1 July to 30 June, is what creates the requirement. Nothing about the duration, the visa or the amount changes that, and the ATO already holds the employer's report of what you were paid.

- A two week casual role
- A single harvest season
- Brief contracting under an [ABN](/abn)
- Cash work that should have been reported

Cash work is the one people assume falls outside this. It does not. The income is taxable whether or not it was reported, and our guide to [lodging with cash income](/blog/cash-in-hand-tax-return) covers reconstructing a period with no payslips.

## When might you genuinely not need to lodge?

The exceptions are narrow. If you earned no Australian income at all in the year, there is nothing to lodge. If your only income was a small amount of bank interest with the correct withholding applied, a non lodgement advice may be the right answer instead of a return.

That is close to the whole list. For anyone who worked in a wage paying role for any period, the requirement applies, and a non lodgement advice is a formal statement to the ATO rather than a decision you make privately by doing nothing.

## Why are short stays where the refunds are?

Because withholding is calculated as though each pay period repeats for the whole year. Three months of work is taxed as though it were twelve, so the total withheld is measured against a liability you never incurred.

That arithmetic is the reason the shortest stints often produce the highest proportion of tax back. Eight weeks of harvest, taxed week by week at working holiday maker rates, commonly leaves most of the withheld tax recoverable, and the amounts run into four figures more often than people expect from a job they thought was too small to matter.

## What else lifts a short stay refund?

Three items, and the first two are the ones nobody claims on their own. A period before your TFN reached the employer, withheld at 45% instead of 15%, is 30 cents in the dollar waiting to be claimed. An employer not registered with the ATO as a working holiday maker employer withholds at foreign resident rates, which is a separate over-withholding.

The third is the Medicare position. The 2% levy applies to people entitled to Medicare, so someone whose passport gives no entitlement should not be paying it, and reclaiming it needs a Medicare Entitlement Statement from Services Australia. That is worth about $500 on $25,000 of earnings, and our guide to [the Medicare levy](/blog/medicare-levy-working-holiday-makers) covers who qualifies.

## Can you lodge after you have gone home?

Yes, and most short stay returns are lodged exactly that way. Income statements come from ATO systems rather than from your former employers, which matters when the employer was a packing shed you left in March.

The standard deadline is 31 October after the year ends, and returns lodged through a registered agent generally carry an extended deadline into the following May. The refund pays into an Australian bank account, so keeping that account open is the practical constraint rather than the lodgement itself.

## Should you lodge early if you are leaving mid year?

Possibly. Someone leaving Australia permanently part way through a financial year can lodge an early return for the part year rather than waiting for the following July, which brings the refund forward by months.

It is not automatically better. An early return is prepared before employer reporting is finalised, so the figures come from your own payslips rather than from ATO records, and it has to be amended if you come back and work again in the same year. It suits a clean departure with complete records and suits an uncertain one poorly.

## What decides whether it is worth doing?

Whether anything was withheld, and how the year was shaped. A short stay with tax withheld at any rate almost always produces something back, and a short stay where the employer withheld at 45% for the whole period almost always produces a lot.

The years that go unclaimed are the ones people talk themselves out of: three weeks of promotional work, a month of packing, a single season. Those are precisely the years with the highest proportion of over-withholding in them. If you worked in Australia at all and never lodged, the [tax return](/tax-return) for that year is still open, and there is generally no penalty where a refund was owed rather than a debt. Our guide to [late returns](/blog/late-tax-return-penalty-working-holiday) explains where the penalties actually apply.
`,
 }, {
 slug: "how-to-lodge-tax-return-from-overseas",
 title:
 "Lodging Your Tax Return From Overseas",
 description:
 "You can lodge an Australian return after you fly home, and go back through unlodged years. What changes is how the refund reaches a foreign account.",
 category: "Tax Return",
 date: "12 November 2024",
 readTime: 6,
 body: `
You do not need to be in Australia to lodge. An Australian return can be prepared and lodged from anywhere, for any year you earned Australian income, including years you have already left. The refund is paid into an Australian bank account, which is why closing that account on the way to the airport is the mistake worth avoiding.

## What actually gets harder once you have left?

Access, not the return itself. The tax position is identical whether you are in Brisbane or Berlin. What changes is that every verification step assumes an Australian phone number, an Australian address and an Australian identity document to hand.

That is the real reason overseas lodgement goes wrong. A myGov account tied to a dead Australian SIM cannot receive its codes, an ATO letter goes to a hostel that has forwarded nothing, and a call centre queue is an hour of hold music at 3am your time. None of these are tax problems, and all of them stop returns from being lodged.

## What do you actually need to have?

Less than most people assume, because the income record already exists in ATO systems. Employers report wages and withholding under Single Touch Payroll, so a shoebox of lost payslips is rarely the obstacle it feels like.

- Your TFN, which is permanent and does not expire when you leave
- Passport details for identity verification
- An Australian bank account that is still open, for the refund
- Details of any ABN or contractor income, which carries no reporting behind it
- Receipts for any deductions you intend to claim

The one genuinely irreplaceable item on that list is the bank account. A refund the ATO cannot pay sits assessed but undelivered until an alternative is arranged from overseas, which is slower and more paperwork than simply leaving the account open for a few more months.

## When is the deadline, and does it move?

31 October following the end of the financial year for self lodgement. A return lodged with the ATO under a registered tax agent generally falls under a concessional date well into the following year, which is why an October deadline missed from another continent is not the problem it appears to be.

There is also the opposite case. If you left partway through a financial year and are not returning, an early return covering a part year is sometimes possible before 30 June, which brings the refund forward rather than waiting for the year to end.

## How long does the refund take?

About 14 business days from lodgement in a straightforward case, paid in Australian dollars into an Australian account. It can be quicker, and it can be considerably slower where the ATO applies a manual check.

Overseas addresses attract more of those checks than domestic ones, particularly on a first return or where the TFN was recently issued. That is a delay rather than a refusal, and consistent identity details across passport, visa and TFN are what shorten it.

## What about years you never lodged?

They are still lodgeable, and for departed working holiday makers they are often where the largest amounts sit. An unlodged year does not expire, and several years can be lodged in one pass rather than sequentially.

This matters most for anyone who worked a first year, went home, and never dealt with it. Those years usually contain a 45% period before the TFN landed and an unclaimed Medicare levy exemption, and nothing has happened to either in the intervening time.

## What if you end up owing rather than receiving?

It happens, and it is worth knowing which situations produce it rather than assuming a refund. ABN income with nothing withheld, a declaration on which the tax free threshold was wrongly claimed, and a year of mostly cash work are the three that turn a return into an amount payable.

If that is the outcome, the ATO issues a notice with a due date and a payment plan can be arranged. It does not disappear because you have left the country, and an outstanding tax debt is something you would rather not carry into a future Australian visa application. Our guide to [ATO payment plans](/blog/ato-payment-plan-tax-debt-australia) covers how those work.

## Did you leave the right things in place?

Lodging from overseas is routine. How smooth it is depends almost entirely on what you left in place. The points below are the ones worth settling before you fly, because each is far harder to arrange afterwards.

- Whether an Australian bank account is still open to receive the refund.
- Whether the ATO holds a current address for you, rather than a hostel you left two years ago.
- Whether your identity details are consistent across passport, visa and TFN record.
- How many financial years are unlodged, since they can generally be dealt with together.
- Whether any of those years included ABN income, which changes a refund into a possible liability.
- Whether the super is also still sitting there, since departure is what makes a DASP claim available.

Each year is worked out separately in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) for each of them before deciding what to do.
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
A tax agent is registered under Australian law to prepare and lodge returns for other people. Anyone charging for tax work must hold that registration. For a working holiday maker the practical differences are a later lodgement deadline, no direct dealing with the ATO, and someone who knows which deductions and offsets a 417 or 462 year actually carries.

## What does a tax agent do that you cannot do yourself?

Three things, and only one of them is the lodgement itself. An agent retrieves your income record directly from ATO systems rather than relying on you remembering every employer, applies the deadline concession that comes with being on an agent's lodgement program, and stands between you and the ATO if anything is questioned afterwards.

Pressing submit is not the hard part and never was. The hard part is deciding what goes into the return before it is submitted: which residency position is actually true for your year, whether the Medicare levy exemption is available on your passport, and which of your expenses meet the substantiation rules rather than merely feeling work related.

## Who prepares your return, and who signs it off?

Two different people, deliberately. Your return is prepared by our team, who work only on 417 and 462 tax and see the same situations every day. It is then reviewed and signed off by a registered tax agent before it is lodged with the ATO.

That separation is what gives you both the specialist knowledge and the professional accountability, and it is checkable rather than a claim, because the agent's registration is listed on the government's public register of tax practitioners.

## How do you check that anyone offering tax help is legitimate?

By finding their registration on the government's public register of tax practitioners, which is the only authoritative source and takes under a minute. The register shows whether a registration is current, whether it is subject to conditions, and whether it covers tax agent services rather than only BAS services.

There is a second test that catches almost everything the register does not. A legitimate agent never needs your myGov password, because they reach your records through their own agent channel. Anyone asking for it is not operating as an agent, whatever they call themselves, and that single question is the cleanest scam detector in this industry.

Working holiday makers are targeted for this specifically, in Facebook groups and messaging communities, because they are new to the system and unsure what normal looks like. Never send a TFN, passport or visa grant to someone who cannot produce a registration number.

## What actually changes once an agent is appointed?

You move onto their lodgement program, which carries a concessional deadline well past the 31 October self lodgement date. Communication with the ATO runs through the agent, including any query, adjustment or review that arises after lodgement.

The difference shows up most in retrieval work rather than in the return itself. Income statements from an employer whose name you have forgotten, a TFN you never received, an unlodged year from two summers ago and a DASP claim all sit in systems that are far easier to reach from inside an agent channel than from a call centre queue in a different timezone.

## When is an agent genuinely not needed?

When the year is simple and you know it is. One employer for the whole year, a TFN in place from the first week, 15% withheld correctly throughout, no ABN income, no deductions worth substantiating and a passport with no Medicare question attached to it. That return is close to a formality and the honest answer is that you can lodge it yourself.

The years where it stops being a formality are the common ones for this audience: several employers, a gap before the TFN landed, a period on an ABN, an unclear residency position, a passport that changes the Medicare answer, or a year you have already left the country for. Our comparison of [lodging yourself versus using an agent](/blog/diy-tax-return-vs-tax-agent-working-holiday) sets out exactly where the money is lost.

## Is the agent fee deductible?

Yes, in the following year's return. Fees for managing your tax affairs are deductible in the year they are paid, so a fee paid in October for the year just ended is claimed in the return covering the year in which you paid it.

For a working holiday maker whose stay spans two financial years, that means the first year's fee generally reduces the second year's assessable income. For someone lodging one final return on the way out, there is no following year to claim it in, which is a small point but worth knowing before you assume it.

## Is your year the kind that needs one?

Whether an agent is worth it is not a general question, it is a question about your particular year. The more of the points below that describe your year, the further the return moves from being a formality.

- How many employers you had, since income from a forgotten one is the most common omission on a self lodged return.
- Whether there was a period before your TFN reached the employer, withheld at 45% instead of 15%.
- Which passport you hold, which decides whether the 2% Medicare levy exemption is even available.
- Whether your residency position is genuinely clear, since it is a judgement about your whole year and no day count settles it.
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

The declaration form, first. Your employer's payroll applies a rate based on what the Tax File Number Declaration says about you, so telling a manager your number verbally or showing a photo of the letter changes nothing until the form is completed. Until then the law requires 45%.

Second, and less well known, is the employer's own registration. A business must register with the ATO as an employer of working holiday makers before it can apply the 15% rate. An unregistered employer is required to withhold at foreign resident rates instead, currently 30% on the relevant bracket, and that happens regardless of your paperwork being perfect.

- TFN declaration completed, employer registered: 15%
- TFN not yet on file with that employer: 45%
- Employer not registered as a WHM employer: foreign resident rates, currently 30%
- Tax free threshold ticked in error: too little withheld, and a bill later

## How do you read the rate off your own payslip?

Divide the tax withheld by the gross pay for the same period. That is the whole check, it takes a few seconds, and it is the only reliable way to catch a wrong rate before months of it have accumulated.

A payslip should show gross pay, tax withheld, super and net pay as separate lines. Super at 12% is paid by the employer on top of your wages rather than deducted from them, so it should never reduce the net figure, and a payslip where super appears to come out of your pay is showing you something that needs a question asked about it. If the withheld figure divides out at 45% and your declaration form went in weeks ago, that is a payroll problem to raise immediately rather than a tax problem to sort out in October.

## Is over-withheld tax lost?

No. Every dollar withheld is a prepayment credited against what you actually owe, so if 45% was taken and 15% was due, the difference comes back when the [tax return](/tax-return) is lodged. Nothing disappears.

What is genuinely lost is the use of the money in the meantime. Thirty cents in every dollar sitting with the ATO from February until August is the difference between affording a trip up the coast and not, and for someone paying hostel rent weekly that gap is the real cost rather than the tax itself. This is the reason to fix a wrong rate now rather than treat it as a larger refund later.

## What happens to the figures at the end of the year?

Your employer finalises payroll reporting after 30 June, and the year's total wages and total tax withheld are reported to the ATO under your TFN. Those figures become your income statement, and they are what a return is built from rather than your payslips.

The consequence is that income sits in ATO systems even when your own records do not. A job you left abruptly, an employer that has since closed, or a payslip you never received does not remove that income from your return, and it does not put it out of reach either. It does mean the total has to be retrieved rather than remembered.

## Which PAYG problems are worth chasing?

The ones that changed the rate for a sustained period, rather than a single odd payslip. A month at 45% before a declaration form was processed, a whole harvest season with an unregistered labour hire company, or a second job that ran at the wrong rate all year are each worth real money and each is recovered the same way, through the return.

Two others are worth knowing because they run the other way. Claiming the tax free threshold on a declaration form as a working holiday maker means too little was withheld, which produces a bill rather than a refund, and cash in hand work has nothing withheld at all, so the tax on it falls due in full at year end. Both are easier to plan for in advance than to discover in October. Checking [what the tax withheld line on your payslip means](/blog/what-does-tax-withheld-mean-payslip) each pay period is what stops any of these from running for months.
`,
 }, {
 slug: "australian-financial-year-dates",
 title:
 "Australian Tax Year: 1 July to 30 June",
 description:
 "The Australian financial year runs 1 July to 30 June, so a working holiday crossing 30 June is two tax returns rather than one. When to lodge each.",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 4,
 body: `
1 July to 30 June. The Australian financial year is not the calendar year and is not the year used in the United Kingdom, Germany or Japan, so a working holiday that crosses 30 June produces two separate tax returns rather than one. The current year, 2026-27, runs 1 July 2026 to 30 June 2027.

## Why does the date split matter more here than at home?

Because working holidays rarely line up with it. A year that starts in November and ends the following September sits across two financial years, and each of them is a separate assessment with its own income, its own withholding and its own outcome.

That is not a formality. Part year income is the single biggest reason working holiday refunds are larger than people expect, because withholding is calculated as though your rate of pay continues all year. Six months of full time work assessed as six months of income, rather than as a full year, is where a large share of a typical refund comes from.

## Which financial year does my work fall into?

Whichever one the money was earned in, and that is determined by the date you were paid rather than the date you worked. Three patterns cover most cases.

- Arrived November, worked through to May: all one financial year, lodged after 30 June.
- Arrived May, left the following August: two financial years, two returns, one covering May and June and the other covering July and August.
- Arrived July, worked through the following June: exactly one financial year, and the cleanest case there is.

If you worked in a past financial year and never lodged, that year is still open and the refund does not expire because time has passed. Unlodged prior years are extremely common among second visa holders and are usually money owed rather than money owing.

## When can you lodge, and when should you?

Lodgement opens on 1 July, and lodging on 1 July is usually a mistake. Employers finalise income statements through the first half of July, and a return lodged before yours is finalised may be missing an employer entirely, which then has to be amended.

Late July or early August is the practical window. The standard deadline for lodging yourself is 31 October, and lodging through a tax agent extends it, which matters if you are still chasing an employer who has not finalised.

## What if you are leaving Australia before 30 June?

Then you may be able to lodge an early return rather than waiting until you are home. This is the option most backpackers never hear about, and it is worth knowing: if you are departing permanently and will not earn further Australian income that year, the return can be lodged before the year ends.

Whether it is the right move depends on whether every employer has issued a final income statement, whether you have superannuation to claim at the same time, and how your residency position for the year is assessed. Leaving in April with three employers, one of whom has not finalised, is exactly the case where lodging early creates an amendment later.

## What other dates run on the same calendar?

Two other sets of dates matter to a departing working holiday maker, and both are commonly missed because they sit outside the return itself. One decides whether your final super contributions exist yet, and the other decides when you can claim them.

Superannuation is paid quarterly, due 28 October, 28 January, 28 April and 28 July. If you are leaving in May, your final quarter's contributions have not been paid yet and will not be until late July, which is a common reason a super claim comes up short.

Your visa end date starts its own clock. It governs when you become eligible to [claim your superannuation after leaving Australia](/superannuation), and a fund that loses contact with you eventually transfers the balance to the ATO as unclaimed.

## When can you lodge, and how many times?

The dates are the same for everyone, but how many returns you owe and when you can lodge them is not. These are the facts about your own arrival and departure that decide it.

- Whether your stay crosses 30 June. If it does, this is two returns and both are yours to lodge.
- Whether you are leaving before 30 June, which opens the early lodgement option.
- Whether every employer has finalised your income statement, which decides whether it is safe to lodge yet.
- Whether you have prior unlodged years from an earlier visa, which are usually refunds sitting still.
- Whether your final quarter of super has been paid yet, which is a July event even if you leave in April.

The year you lodge for decides which rates and thresholds apply to your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) separately for each year you worked.
 `,
 }, {
 slug: "cash-in-hand-tax-return",
 title:
 "Worked Cash in Hand? You Can Still Lodge",
 description:
 "Cash income without payslips can and must be declared. How to reconstruct earnings, what the ATO cross checks, and why declaring protects you.",
 category: "Tax Return",
 date: "27 November 2024",
 readTime: 5,
 body: `
Yes. Cash wages are taxable income exactly like wages paid into a bank account. The difference is that nothing was withheld along the way, so the tax is settled at lodgement rather than pay by pay, and the income has to be declared from your own records rather than from an employer's reporting.

## What changes when you are paid in cash?

Only the mechanics, not the obligation. No PAYG is withheld at the time, no Single Touch Payroll record is created, and you receive the whole amount. The tax liability moves from your employer's payroll to you, payable when the year is assessed.

For a working holiday maker that means the 15% rate applies to cash income in the same way it applies to wages, but it arrives as an amount owing rather than as something already taken care of. Someone who worked entirely in cash and set nothing aside can therefore face a bill rather than a refund, and that is a very different position from the one most backpackers expect.

## Is your employer allowed to pay you in cash?

Yes, and this is worth being clear about because the two things get confused constantly. Paying wages in cash is legal. What is not legal is failing to withhold tax, failing to report the wages, failing to pay superannuation, or failing to give a payslip.

So a cash arrangement is not by itself evidence of anything. A properly run cash job comes with a payslip, PAYG withheld, super paid and reporting to the ATO. When those are all absent, the missing obligations are the employer's, and it is the employer who carries the exposure for them.

## What records make an honest return possible?

Your own contemporaneous notes, because nothing else exists. Dates worked, hours per shift, the agreed rate, the amount received each time and who paid you are the whole evidence base, and they are far more convincing recorded as you go than reconstructed a year later.

- Bank deposits, including partial banking of cash, which establish a pattern
- Text messages or app notifications about shifts and pay
- Rosters, photographs at the workplace, names of people you worked alongside
- The business name and ABN of whoever paid you

Keep it somewhere that survives a lost phone. The ATO can ask about a return for several years after it is lodged, and by then a WhatsApp thread from a Cairns hostel is usually gone.

## What if the figures are not exact?

Declare an honest best estimate and be consistent about how you reached it. Cash income is reported as salary and wages without an income statement, and both self lodgement and agent lodgement support that.

The distinction that matters is between good faith estimation and deliberate omission. An imprecise but honest figure supported by a method you can explain is a very different thing from leaving income out, and it is the omission rather than the imprecision that creates a problem. Under declaring income has its own consequences, covered in our guide to [understating income and ATO penalties](/blog/understating-income-ato-penalty-working-holiday).

## What about the superannuation on cash work?

If you were an employee rather than a contractor, 12% superannuation was owed on your ordinary time earnings whether you were paid in cash or by transfer. Cash payment does not remove the obligation, and in practice this is where most of the money in a cash job actually went missing.

Recovering it depends on the same records the income declaration depends on, which is the practical argument for keeping them. Our guide to [unpaid super and what to do about it](/blog/super-employer-not-paying-what-to-do) sets out how the Superannuation Guarantee Charge process works.

## Does declaring it create trouble for you?

Declaring income is what protects you. An honest return is a clean record, and it is the employer's failure to withhold, report and pay super that sits on the employer's side of the ledger rather than yours.

The reverse is where the risk lives. An unlodged year, or a lodged year with income left out, is the position that becomes difficult later, particularly for anyone who intends to apply for another Australian visa. Reporting the employer to the Fair Work Ombudsman is a separate decision you can make or not make, and our guide to [wage theft in Australia](/blog/wage-theft-working-holiday-australia) covers what that involves.

## Refund or bill? Your other income decides.

Whether cash income has to be declared is not in question. What it costs you, and whether the year ends in a refund or a bill, turns on the rest of the picture.

- Whether you also had ordinary employment in the same year, since withholding from that job often covers the tax on the cash.
- Whether you were genuinely an employee or engaged under an ABN, which decides super and award entitlements.
- How much of the cash you can evidence, which decides how defensible the figure is.
- Whether the employer reported anything at all, which changes how the return is built.
- Whether deductions are available against the work, which reduce the amount assessed.
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
 "12% of your ordinary time earnings, paid at least quarterly, on top of your wages. How to check it landed and what to do when it did not.",
 category: "Super",
 date: "2 December 2024",
 readTime: 5,
 body: `
Twelve per cent of your ordinary time earnings, paid at least quarterly into a super fund, on top of your wages rather than out of them. That has been the rate since 1 July 2025 and it is the final legislated step, so it stays at 12%. On $8,000 earned in a quarter, $960 should appear.

## What counts as ordinary time earnings?

Ordinary time earnings is a narrower base than gross pay, and the difference is where quiet underpayment lives. It covers your regular wages for ordinary hours, most allowances, commissions, bonuses, loadings and in most cases annual leave loading.

It does not cover overtime, reimbursed expenses or genuine redundancy payments. For a working holiday maker on standard shifts the distinction rarely matters, because almost everything you earn is ordinary time earnings. It matters most in hospitality and on farms where penalty rates, loadings and overtime blur together on a payslip and a payroll system has been set up to calculate super on base hours alone.

## When should the money actually appear?

Quarterly, which is the fact that causes most false alarms. Employers must pay by 28 October, 28 January, 28 April and 28 July for the preceding quarter, so work done in July may not show in your fund until late October.

That lag has a specific and expensive consequence for anyone leaving. If you fly home in May, your final quarter's contributions are not due until 28 July, and a super claim lodged in June will simply not include them. This is one of the most common reasons a departing payment comes up short, and it is entirely avoidable by timing the claim rather than rushing it.

## How do you check it was paid?

Two records, compared against each other. Your payslip should show the super accrued for that period as a separate line, and your fund's account should show the contribution arriving. Divide the super figure by your ordinary time earnings for the period and you should get 0.12.

If the result is 0.115 or 0.11, the employer is using a superseded rate. Payroll systems were slow to update through the step increases and some employers set rates manually, so this is a real and recoverable shortfall rather than a rounding issue. The rate history matters if your work spans the changes: 11% in 2023-24, 11.5% in 2024-25 and 12% from 2025-26 onward, and each rate applies to the period in which the earnings accrued.

## Which fund did your super go to, and why does it matter?

Whichever one your first Australian employer defaulted you into, most likely, because of the stapling rule introduced in November 2021. Under stapling, a new employer must check whether you already have a fund and pay into that one rather than defaulting you into their own.

For an Australian who started work as a teenager this works as intended. For a working holiday maker it half works, and the reason is worth understanding.

- On arrival you have no Australian fund, so your first employer's default becomes your fund by accident rather than by choice.
- Backpackers change employers fast, and the stapling record does not always update between a job in March and a job in April, so employers two and three may default you into their own funds anyway.
- Small balances transferred to the ATO as unclaimed break the chain entirely.

The net result is that a typical working holiday maker still ends up with two or three accounts, each paying its own administration fee and often its own insurance premium against a balance of a few thousand dollars. If you want to avoid that, nominate the same fund on the standard choice form at every job rather than leaving the box blank. Existing split balances are not combined retrospectively, and [consolidating super across funds](/blog/super-multiple-funds-consolidation) is a separate exercise worth doing before you leave.

## What if the super is missing entirely?

Start with payroll, in writing, because a genuine administrative error is more common than deliberate non payment and is fixed in a week. Give the pay periods, the ordinary time earnings and the fund details, and ask what was remitted and when.

If it does not resolve, unpaid super is recoverable through the superannuation guarantee charge process, which is a formal enforcement mechanism rather than a complaint, and it can be pursued well after the work ended and after you have left the country. What it needs is evidence: payslips showing the super line, fund statements showing what arrived, employment dates and hours, pay rates and gross earnings, and the employer's name and ABN. See [what to do when an employer is not paying super](/blog/super-employer-not-paying-what-to-do).

Cash paid work is where this fails most often, because there is no payslip trail and frequently no fund at all. The obligation is identical regardless of how the wages were paid.

## Was it your base or your timing?

Twelve per cent is the rate for everyone, so a shortfall is usually about the base it was calculated on or the timing of the payment rather than the percentage. These are the facts that decide yours.

- Whether your earnings include overtime, which is outside ordinary time earnings and correctly attracts no super.
- Which quarter you are checking, since contributions are due up to four months after the work.
- When you are leaving, because the final quarter is usually still unpaid on your departure date.
- How many employers you had, which is how many funds you probably have and how many separate claims that becomes.
- Whether any employer paid you cash without a payslip, which is where super most often simply does not exist.
- Which financial year the work falls in, since the rate stepped up through 11%, 11.5% and 12%.

Everything paid in is claimable when you [claim your superannuation after leaving Australia](/superannuation), where working holiday maker balances are withheld at 65% before payment.
 `,
 }, {
 slug: "how-long-does-dasp-take",
 title:
 "How Long Does DASP Take? About 28 Days",
 description:
 "Most complete DASP applications are approved within 28 days, and bank clearing adds days on top. What decides the timing in your own case.",
 category: "Super",
 date: "20 July 2026",
 readTime: 6,
 body: `
About 28 days for a complete application. That is the working expectation once the fund has everything it needs, and international bank clearing adds days on top of it. Applications that run longer almost always have a specific, identifiable cause rather than a queue problem.

## What has to happen before the money moves?

Three parties check three different things, and the application waits for the slowest of them. The ATO confirms your visa has ceased and that you have departed. Your fund confirms that the person applying is the person the account belongs to. Then the fund calculates the payment, applies the 65% withholding that applies to working holiday maker super, and releases the net amount.

The 28 days is the fund's side, and the fund is where nearly all delay lives. The ATO's records either show what they need to show or they do not, and that is usually resolved in days rather than weeks. Identity matching is the slow part, and it is slow for a reason worth understanding: super funds are releasing money permanently overseas to someone they cannot see.

## What actually causes a DASP to take longer?

Every extended claim we look at falls into one of a small number of buckets, and none of them is the fund simply being busy. Each has a different cause and a different fix, so identifying which one applies is most of the work.

**Your visa or departure has not yet been recorded.** Lodging within days of your visa ceasing, or within days of flying out, means the Department of Home Affairs record has not caught up. Movement records typically update within 7 to 14 days of departure. There is no way to hurry this and there is no point lodging into it.

**Your name does not match.** This is the most common one by a distance, and it is almost never your mistake. Employers set up super accounts by typing a name off a passport at speed, and a missing middle name, a transposed given and family name, or an accented character dropped is enough to stop the match. It is why so many claims stall at exactly the same point.

**Your date of birth was entered wrong** by the same employer, in the same hurry.

**You applied to a fund that holds nothing.** Working holiday makers with four employers routinely have super in funds they have never heard of, and applying to the one they remember returns nothing because the money is somewhere else.

**Your certified documents were not accepted.** Funds differ on who counts as an approved certifier, and certification obtained in your home country after you have left is where this most often fails.

## Does having several super funds change the timing?

Yes, and it is worth planning around. Each fund is a separate application with its own timeline, and they finish at different speeds. A traveller with four employers across a year in hospitality and harvest work commonly has three or four accounts, and the practical answer is four to six weeks from the first lodgement to the last payment.

Super that has already been transferred to the ATO as unclaimed follows a different and generally faster path, because there is no fund verification step. That applies to accounts the fund lost contact with, which is common for anyone who left more than six months ago without updating an address.

## How long does the money take to arrive after approval?

Approval and arrival are two different dates. An Australian bank account usually sees it within a couple of business days. A major bank in the United Kingdom, Europe or Japan is commonly two to five business days after release. Smaller and regional banks can take up to ten.

Currency conversion adds its own step. If you want the money in a particular currency, that is a decision to make before the application goes in rather than after, because the receiving account details are part of the claim.

## Why might yours run past 28 days?

Twenty eight days is the expectation for a complete application, and most claims that run longer are incomplete in a way the applicant did not know about. These are the facts about your own situation that decide the timeline.

- Whether your visa has actually ceased and your departure is recorded. Lodging too early is the most common self inflicted delay.
- Whether your name on the fund's records matches your passport exactly, including middle names and accents.
- How many employers you had, which is how many funds you probably have.
- Whether any of your super has already been transferred to the ATO as unclaimed, which changes the route and usually shortens it.
- Which bank you are being paid into and in what currency.
- Whether your tax return for your final year is also outstanding, since the two are usually best dealt with together.

The full eligibility and withholding position is set out where you [claim your superannuation after leaving Australia](/superannuation), and any final year [working holiday tax return](/tax-return) is a separate claim on separate money.
 `,
 }, {
 slug: "tax-on-super-withdrawal-backpacker",
 title:
 "Super Tax When Leaving Australia: 65%",
 description:
 "Superannuation tax when leaving Australia: the 65% DASP rate. How much super you receive, with worked examples: a $10,000 balance pays out $3,500.",
 category: "Super",
 date: "29 July 2026",
 readTime: 7,
 body: `
A Departing Australia Superannuation Payment to a 417 or 462 visa holder is taxed at 65% of the taxable component, withheld before the money reaches you. The rate is fixed by law. What is worth deciding is when you claim, and whether you have found every fund first.

## What exactly is the 65% applied to?

The taxable component of the balance, which for a working holiday maker is effectively all of it. Super splits into a taxable component, made up of employer contributions and the earnings on them, and a tax free component made up of personal contributions you made from money that had already been taxed.

Almost no backpacker has a tax free component, because almost nobody makes voluntary contributions during a working holiday. Where one exists it is paid out without withholding, so the practical position is that the whole balance is taxed at 65% and the net figure is 35% of what the fund holds. On a balance of $10,000 that is a payment of about $3,500.

## Why is the rate higher for working holiday makers?

Because it was raised specifically for this visa class in 2017. The DASP rate for temporary residents generally was 35%, and from 1 January 2017 a separate 65% rate was introduced for holders of subclass 417 and 462 visas as part of the same package of changes that set the 15% income tax rate on working holiday maker wages.

The stated logic was that the 15% wage rate is concessional relative to what a foreign resident would otherwise pay, and the higher super rate offsets it. Whether that trade is fair is a question about policy; what matters practically is that it applies to the visa rather than to the person, so the rate you get depends on which visa you held when the contributions were made.

- Subclass 417 and 462: 65% on the taxable component
- Other temporary visas, such as a student visa: generally 35%
- A mixed visa history: the fund assesses the components separately

## Can the 65% be reduced or claimed back?

No. It is a final withholding rather than a prepayment, so it does not appear on your Australian [tax return](/tax-return) and there is nothing to offset it against. Tax treaties do not reach it either, and no residency position changes it.

Three things get confused with reduction and are worth separating. If part of your super was earned under a different temporary visa, that portion may be assessed at 35%, which the fund works out from your visa history rather than from anything you claim. The DASP is not included in your Australian taxable income, so it is not taxed twice here. And whether your home country taxes the payment is a question of local law, with many treating it as foreign pension income, which is worth asking about at home rather than assuming.

## Is it still worth claiming a small balance?

Yes, because the alternative is not keeping the money. Super left in a fund by someone who has left Australia does not wait for them; after six months from the visa ceasing it is transferred to the ATO as unclaimed super, where it stops earning and stops being eroded by fund fees but also stops being anywhere you will trip over it.

The arithmetic is simple enough to run on your own balance. Whatever the fund holds, the DASP pays 35% of it, so a $1,500 balance returns about $525 and a $4,000 balance about $1,400. Every one of those is money an employer paid on top of your wages, and none of it comes home by itself.

## When should you actually lodge the claim?

After your visa has ceased or been cancelled and after you have left Australia, which are both conditions of eligibility rather than preferences. Approval typically takes around 28 days once lodged, and the payment follows.

The timing question that actually matters is the last quarter. Super is paid quarterly, so if you stop work in May and fly out in June, your employer's contribution for April to June is not due until 28 July. Claiming before that date means claiming against a balance your employer has not finished paying into, and the leftover then has to be chased separately. Against that, every month the balance sits in the fund is another month of administration fees on money you are no longer adding to. The right answer depends on how much the outstanding quarter is worth relative to the fees, and it is worth working out rather than defaulting to whichever is sooner.
`,
 }, {
 slug: "what-happens-to-unclaimed-super",
 title: "Unclaimed Super: The ATO Holds It for You",
 description:
 "Unclaimed super stays yours. Inactive accounts are transferred to the ATO, which holds the money indefinitely, and a DASP claim retrieves it years later.",
 category: "Super",
 date: "22 December 2024",
 readTime: 5,
 body: `
Nothing bad. After a period of inactivity a fund transfers your balance to the ATO, where it is held against your TFN as unclaimed super. It is still yours, it can still be claimed through the ordinary Departing Australia Superannuation Payment process, and there is no deadline after which it stops being claimable.

## What triggers the transfer?

Losing contact, mostly. A fund is required to transfer a balance to the ATO when it cannot reach you, when mail is returned and communications go unanswered, when the account has been inactive for a period, or when a DASP application was attempted and could not be paid.

For working holiday makers the usual sequence is mundane. The fund has a hostel address, statements bounce, contributions stop when the job ends, and after a while the balance moves. Nobody did anything wrong and nothing was lost, but the money is now in a place you would not think to look.

## Can you still claim it once it has moved?

Yes, through the same DASP mechanism, with the claim directed at the ATO rather than at a fund. The documents are the same, the eligibility is the same, and the 65% withholding on the taxable component for working holiday makers is the same.

If anything it is often slightly simpler, because there is no fund verification round trip in the middle. There is also no time limit. Balances from visas that ended many years ago are claimed successfully, and the passage of time does not reduce your entitlement to it.

## How do you find out whether yours has moved?

By searching against your TFN, which covers both funds and ATO held balances in one step. That search is the only reliable way to know, because nobody notifies you when a transfer happens and the fund you remember may no longer hold anything.

If you have been out of Australia for more than six months, assume at least part of your super may have moved and search rather than writing to the old fund. Our guide to [finding lost superannuation](/blog/how-to-find-lost-superannuation) covers what the search needs.

## Does it grow while the ATO holds it?

Barely. The ATO applies an interest adjustment intended to keep pace with inflation, which is materially less than an invested balance in a fund would have earned over the same period.

The compensation is that it is not being eroded either. A small balance sitting in a fund is charged administration fees and often insurance premiums, and a few hundred dollars can be consumed entirely over a few years. Money held by the ATO is fee free, so for a small balance the transfer is not necessarily the worse outcome.

## Why claim it rather than leave it?

Because it is not doing anything where it is, and the practical obstacles to claiming only grow. Identity verification gets harder the longer you have been out of the country, contact details go stale, and an Australian phone number attached to a lapsed SIM stops receiving verification codes.

The number people struggle with is the 65% withholding, and it is worth stating plainly. After it you receive 35% of the balance. That is a poor rate and it is the only rate available, and the alternative is not a better one, it is leaving the whole amount behind. For someone who worked several months at 12% super on their wages, 35% of the balance is still a real sum.

## What if some of it was never matched to you at all?

That is a different problem and a more common one than the transfer. Contributions made before your TFN reached the fund frequently cannot be attached to a person, and they sit unallocated rather than being held against your name.

Those do not appear in a TFN search, which is why the employer list matters. If your payslips show super for a job that no fund and no ATO balance reflects, the money either was never paid or was never matched, and the two are resolved differently. Our guide to [an employer not paying super](/blog/super-employer-not-paying-what-to-do) covers the first case.

## How many balances exist in your name?

Whether your super is with a fund or with the ATO does not change what you receive. Other things do. The points below decide how many balances exist and how straightforward the claim will be.

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
 title: "How to Find Lost Super Before You Leave",
 description:
 "Find lost superannuation before you leave Australia by searching every fund linked to your TFN. Multiple accounts, unclaimed super, and the DASP claim.",
 category: "Super",
 date: "29 December 2024",
 readTime: 5,
 body: `
Lost super is found by searching against your TFN, which surfaces every fund holding contributions in your name plus anything already transferred to the ATO as unclaimed. Most working holiday makers have more accounts than they think. Doing the search before you leave Australia is far easier than doing it afterwards.

## Why does a backpacker end up with several accounts?

Because every employer that did not ask which fund you wanted opened one for you. Three jobs with three default funds is three accounts, each holding a few hundred dollars and each charging fees against it.

Then the contact details go stale. Statements are posted to a share house you left in March, the fund loses touch, and after a period of inactivity the balance is transferred to the ATO as unclaimed super. It is still yours at that point, it is simply no longer where you would think to look.

## What actually gets lost, as opposed to merely forgotten?

Two different things, and the distinction changes how they are recovered. Money in a fund you have forgotten about is findable through a TFN search immediately. Money that never got matched to you in the first place is harder.

The second case is specific to this audience. Contributions made before your TFN reached the fund often cannot be attached to a person at all, and end up held by the ATO without your name confidently on them. That is the most common reason a departing backpacker's super is smaller than their payslips say it should be, and it is why the payslips are worth checking against the fund rather than assumed to agree.

## What information makes the search complete?

Your TFN does most of the work, and your own employment history closes the gap. The search finds accounts linked to your TFN; it cannot find contributions that were never linked to it.

- Every Australian employer you worked for, by company name
- Approximate start and finish dates for each
- Any fund name you remember being mentioned or receiving a letter from
- Any correspondence you kept from a fund
- Payslips showing super amounts, which establish what should have been paid

The employer list matters most. If the search returns three accounts and you remember five jobs, the two missing ones are where either unpaid super or unmatched contributions are sitting.

## Should you consolidate before claiming?

It depends on how many accounts there are and what they hold. Consolidating into one fund means one Departing Australia Superannuation Payment application, one verification process and one payment instead of several, which is simpler.

Against that, consolidation takes time and each fund has its own process, so where there are only two accounts and both are straightforward, claiming separately is often faster. Neither approach affects the amount you receive. Our guide to [consolidating multiple super funds](/blog/super-multiple-funds-consolidation) covers what the process involves.

## Why does waiting cost you?

Not through any deadline, but through drag. Balances held by the ATO earn a low rate of return compared with an active fund, small accounts are eroded by fees, and identity verification gets harder the longer you have been out of the country and the more your contact details have gone stale.

There is also the practical problem that a phone number attached to an Australian SIM stops receiving verification codes the moment that SIM lapses. Doing the search while you are still in Australia, with working contact details, avoids the largest single obstacle to recovering super from overseas.

## What happens once you have found it all?

It stays in the fund until your visa has ceased and you have left Australia, which is what makes a DASP claim available. The taxable component is then taxed at 65% for working holiday makers, and applications are commonly approved within about 28 days.

Sixty five per cent is a high rate and it is the figure people find hardest to accept. The alternative is not a lower rate, it is leaving the balance behind entirely, which is what happens to a considerable amount of working holiday super every year. Our [superannuation guide](/superannuation) covers the claim itself.

## How much of yours is still findable?

How much is out there, and how easily you get it, depends on how the working years actually ran. These are the facts that decide how many accounts exist and how much of the balance is actually attached to your name.

- How many employers you had, since each may have opened its own account.
- Whether you nominated a fund or were defaulted at each job.
- Whether your TFN reached each fund, which decides whether contributions were matched to you.
- Whether any balance has already been transferred to the ATO as unclaimed.
- Whether your contact details with each fund are current.
- Whether any employer simply did not pay, which is a recovery rather than a search.
- Whether you are still in Australia, which makes verification considerably easier.

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

Australians choose a fund for a forty year horizon, where a fraction of a percent in returns compounds into a great deal of money. You are choosing for eighteen months, after which the entire balance leaves the country through the Departing Australia Superannuation Payment.

Over that horizon investment performance is close to irrelevant and two other things are not: what the fund charges while the money sits there, and how competently it handles a claim from someone who is no longer in Australia. Those are the criteria that actually decide what you receive.

## What is superannuation, in the short version?

Super is money your employer pays into a fund in your name, at 12% on top of your wages rather than out of them. It is not a deduction from your pay and your gross wage is the same whether it is paid or not. For a working holiday maker it is a forced savings account that you unlock on departure.

- Contributions are the employer's obligation, on top of your wage
- The fund holds and invests the balance
- The whole balance is claimable through [DASP](/superannuation) once your visa has ceased and you have left
- DASP is withheld at 65% for working holiday maker contributions

That 65% is the single most important number here, and it is worth understanding before choosing anything. A $10,000 balance pays out about $3,500. Nothing about fund choice changes that rate.

## Which fees actually matter over eighteen months?

Flat dollar administration fees are the ones that hurt a small balance, and percentage based fees are the ones that do not. A few dollars a week charged regardless of balance is a meaningful proportion of $3,000 and an irrelevance on $300,000, which is exactly backwards from what the fund's marketing is designed for.

The larger and more avoidable leak is default insurance. Many funds automatically attach life and income protection cover and deduct the premiums from your balance, which for someone withdrawing everything within two years is money spent on cover that will never be claimed. It can usually be switched off through the fund's member portal in a few minutes.

## Which funds handle DASP well?

The large industry and major retail funds process departure claims routinely and have systems built for identity verification from overseas. Small employer default funds are where claims stall, because a claim from a former member in Berlin with an expired visa is an exception rather than a process.

That is the practical distinction rather than a ranking. What you are buying is a fund that has seen your situation a thousand times before, because the DASP application requires visa verification through Home Affairs and identity documents assessed from abroad, and approval commonly takes around 28 days once the paperwork is complete.

## What happens if you never nominate a fund?

Two mechanisms run in order. Your employer first checks for a stapled fund, meaning any existing fund already linked to your TFN from earlier work, and pays into it if one exists. If none does, contributions go to the employer's default fund.

This works, and it is why nobody ends up with no super. What it produces over a four employer year is fragmentation: several accounts, several sets of fees, several DASP claims. Our guide to [consolidating multiple funds](/blog/super-multiple-funds-consolidation) covers whether to merge them or claim each separately.

## What is Payday Super, and does it change anything?

From 1 July 2026 employers must pay super at the same time as wages, generally within seven business days of each payday, instead of quarterly. It is an employer compliance change, but it has a genuine benefit for anyone on a short stay.

Under quarterly payment, a missing contribution was invisible for up to three months, by which time you had often left the job and sometimes the state. Paid per pay run, a gap shows up within a fortnight while you are still there to raise it. Our guide to [unpaid super](/blog/super-employer-not-paying-what-to-do) covers what to do when one appears.

## What should you do at your first job?

Nominate one fund on the super choice form and then give the same details to every employer afterwards. That single habit prevents the entire problem this guide describes, and it takes about two minutes at the point where nobody is thinking about super.

- Nominate one well known fund at the first job
- Give the same fund details on every later super nomination form
- Switch off default insurance through the fund's app in the first month
- Keep the member number somewhere you will still have it in a year

The member number is the part people lose. A fund can be traced through your TFN, but a claim from overseas moves considerably faster when you can quote the account, and a photograph of the welcome letter costs nothing.

## What decides your outcome here?

Four decisions, all of them made in the first week of your first job and none of them revisited afterwards. Whether you nominated one fund and then gave the same details to every subsequent employer. Whether you turned off default insurance. Whether the fund charges flat or percentage based administration fees. And whether the fund is one that processes overseas claims as routine.

The compounding version of getting this wrong is not dramatic, it is just quiet: three small balances in three funds, each paying insurance premiums for cover nobody wanted, each requiring its own claim, and one of them forgotten entirely because the job lasted three weeks in a town you cannot now name. Our guide to [finding lost super](/blog/how-to-find-lost-superannuation) exists because that is the common ending rather than the rare one.
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

Because it only applies where no award or enterprise agreement covers the job, and in the industries backpackers actually work in, one almost always does. Hospitality, retail, horticulture, construction, cleaning and aged care all have modern awards with their own minimum rates, and those rates sit above the national minimum before any penalty rate is added.

The practical consequence is that being paid exactly $26.44 in a cafe is not proof of compliance. It is closer to evidence of underpayment, because the Hospitality Industry (General) Award sets its own rates by classification and they are not the national floor.

## How is the figure set, and when does it change?

The Fair Work Commission reviews it once a year and announces the result in mid year, with the increase taking effect from the first full pay period on or after 1 July. The 2026 review raised the national minimum by 6% and award minimum rates by 4.75%.

That split matters if you are lodging for a year that has already ended. For the 2025-26 year the national minimum was $24.95 an hour, or $31.19 casual, and those are the figures your payslips from that year should be measured against, not the current ones.

## What does the casual loading actually buy you?

An extra 25% on the base rate, in exchange for having no paid annual leave, no paid sick leave and no notice of termination. It is not a bonus and it is not discretionary, and a casual paid the permanent base rate with no loading is being underpaid even if the headline number looks like the minimum.

This is worth checking before anything else on a payslip, because it is the most common single error in backpacker pay and it is visible in one line. Casual rates for 2026-27 start at $33.05 an hour under the national minimum, and higher again under most awards.

## Where do the rates you are actually owed come from?

From your award and your classification within it, and both need naming before any figure means anything. Every modern award has several classification levels reflecting experience and responsibility, and two people in the same kitchen can lawfully be on different rates.

- Hospitality Industry (General) Award, covering cafes, restaurants, pubs and hotels
- General Retail Industry Award, covering shops and retail
- Horticulture Award, covering fruit picking, harvest and agricultural work
- Building and Construction General On-site Award, covering construction
- Cleaning Services Award, covering commercial cleaning

Ask which award covers you and which level you sit at. An employer who cannot answer that is usually not applying one, and that is a more useful finding than any hourly comparison.

## What about weekends, nights and public holidays?

In most award covered work, hours outside ordinary time attract penalty rates, and for a casual those stack on top of the loading. Saturday, Sunday, public holiday and late night rates vary by award, and in hospitality and retail they are where a large share of a backpacker's actual earnings come from.

A casual hospitality worker on a Sunday can be legitimately earning close to double the headline national minimum. Our guide to [penalty rates in Australia](/blog/penalty-rates-australia) sets out how the loadings combine.

## What should you do if the numbers do not add up?

Work out the correct rate before raising anything, because a claim built on the national minimum when an award applies will understate what you are owed. Identify the award, find your classification, apply the loading and any penalties, and compare against the payslips week by week.

Keep the evidence as you go rather than reconstructing it later. Rosters, payslips and any written confirmation of your classification are what turn a disagreement into a claim, and the Fair Work Ombudsman handles unresolved complaints. There is no visa based barrier to recovering underpaid wages, and working holiday makers have the same entitlements as anyone else in the workplace.

## The national floor is rarely your rate.

The national figure is fixed. What you are owed is not, and it turns on facts about your own job. These are the points that decide the number, and the national minimum is rarely the one that applies to you.

- Which award covers your employer, since that sets the base rate rather than the national minimum.
- Which classification level you were placed at, which can differ between two people doing similar work.
- Whether you are casual or permanent, which decides the 25% loading.
- Which hours you worked, since weekend, evening and public holiday penalties often exceed the base pay.
- Whether an enterprise agreement applies, which can set rates above the award.
- Whether you are engaged on an ABN, in which case none of this applies to you at all and that is usually the real problem.

Whatever the rate, the tax withheld from those pays reconciles at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 }, {
 slug: "how-many-hours-can-you-work-on-whv",
 title:
 "How Many Hours Can You Work on a WHV?",
 description:
 "There is no weekly hour limit on a 417 or 462 visa. The real constraint is six months with one employer, and the exemptions cover most of this work.",
 category: "Work Rights",
 date: "29 July 2026",
 readTime: 5,
 body: `
There is no weekly hour limit on a 417 or 462 visa. You can work full time, take overtime and hold several jobs at once. The constraint that actually exists is visa condition 8547, which limits you to six months with any one employer unless an exemption applies, and the exemptions cover most of the work backpackers do.

## Why do people think there is an hour limit?

Because student visas have one and the two get conflated constantly. A student visa carries a fortnightly cap on work hours during study periods. A working holiday visa does not carry anything equivalent, and the Department of Home Affairs sets no weekly maximum at all.

What limits your hours in practice is your award and your body. Awards set maximum ordinary hours and required breaks, and hours beyond them attract overtime or penalty rates, which is a right rather than a restriction.

## What is condition 8547?

It limits you to six months of work with any one employer, counted in calendar months from your start date rather than by hours worked. It applies to every working holiday visa holder, it is mandatory rather than advisory, and it resets when a new working holiday visa is granted.

Breaching it is a visa matter rather than a tax matter, and the consequence can be cancellation. That makes it the one rule on this page worth being careful about, particularly for anyone who found a good job in their second month and simply stayed.

## Which work is exempt from the six month limit?

A long list, and it covers most of what working holiday makers actually do, which is why the six month rule binds far fewer people than expect it to. You can work beyond six months with the same employer without seeking permission where the work falls into any of these sectors.

- Plant and animal cultivation, meaning agriculture and horticulture
- Fishing and pearling
- Tree farming and felling
- Mining
- Construction
- Tourism and hospitality, in any location
- Health, aged care and disability care
- Childcare
- Food processing
- Natural disaster recovery

Different locations of the same employer also count separately, so long as no single location exceeds six months. A hospitality group moving you from a Melbourne venue to a Byron Bay one is a different position from staying in the same kitchen for a year.

## What if your work is not exempt?

You can ask the Department of Home Affairs for written permission to continue, and the request should be made before the six months elapses rather than after. Permission is discretionary and is not guaranteed, so it is not something to plan a job around.

The practical alternative is usually simpler: change employers. For most working holiday makers the six month rule is not the binding constraint on their year, it is a reason to move on that they were going to have anyway.

## How does the 88 day rule fit in?

It does not, and confusing the two is common. Condition 8547 is about how long you can stay with one employer. The specified work requirement is about qualifying for a second visa, and it needs 88 days of specified work in an eligible area during your first visa. A third visa requires six months of specified work during the second.

Many specified work industries are also exempt from the six month rule, which is why a season in the Riverland or the Bundaberg region can run past six months and still count. They are separate rules that happen to overlap.

## What do long hours do to your tax?

They move you up the working holiday maker scale, which is the one genuine tax consequence of working hard. The rate is 15% up to $45,000 and 30% on the portion above it. Two jobs at once reach that point faster than most people expect, because neither employer's payroll knows about the other.

That is the mechanism behind the most common year end surprise for high earning backpackers: each employer withholds correctly on its own figures, and the combined income crosses a threshold neither of them can see. Superannuation follows earnings rather than hours, at 12% on top of your wages with no minimum monthly earnings requirement since 2022, so more hours means more super as well as more tax.

## Does the six month rule bind you?

There is no hour limit for anyone, so nothing here turns on how hard you work. What varies is whether the six month rule binds you and what your combined income does to your rate.

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
 "Sundays commonly pay 150-200% and public holidays up to 250% under awards. The rates by industry and how to check your payslip is honouring them.",
 category: "Work Rights",
 date: "10 February 2025",
 readTime: 5,
 body: `
Penalty rates are the higher rates that apply to hours worked outside ordinary time: weekends, public holidays, evenings and early starts. They come from the award covering your job, not from your employer's goodwill. Saturdays commonly run around 125 to 150% of the ordinary rate, Sundays 150 to 175%, and public holidays 225 to 250%.

## Where do your penalty rates actually come from?

From the modern award or enterprise agreement covering your industry, which is a legal instrument rather than a workplace policy. The Fair Work Commission sets and reviews them, and an employer cannot pay below them by agreement, by contract or by a flat rate arrangement you were asked to accept.

That is why the first question is never "what does my boss pay on Sundays". It is "which award covers this venue and which classification am I on", because those two answers produce every figure that follows.

## What do penalty rates look like in hospitality?

The Hospitality Industry (General) Award covers cafes, restaurants, pubs and hotels, and it is the award most working holiday makers are covered by. Ordinary rates rise through the week into significant multiples at the weekend, and casuals get the 25% loading in addition rather than instead.

- Weekday evening after 7pm: around 110 to 115% of the ordinary rate
- Saturday: around 125%
- Sunday: around 175%
- Public holiday: around 225%

Exact figures depend on your classification level and your shift pattern, and the award itself is the authority. A casual on a Sunday in hospitality is on a materially different hourly rate from the same person on a Tuesday, which is the single biggest lever a backpacker has over their own earnings.

## And in retail?

The General Retail Industry Award follows the same structure with lower Sunday loading. Saturdays run around 125%, Sundays around 150% and public holidays around 225%, with late night penalties keyed to the store's closing time rather than to a fixed hour.

Retail also has more variation from enterprise agreements than hospitality does, particularly in the large supermarket chains, where the agreement rather than the award sets the rate. If you work for a national chain, ask which agreement applies, because it will differ from the award figures above in both directions.

## How do penalties and casual loading combine?

They stack. The 25% casual loading applies to the ordinary rate, and the penalty applies as well, so a casual weekend shift is meaningfully above both the loaded weekday rate and the permanent weekend rate.

This is where a flat rate arrangement quietly costs the most. An employer paying one figure across every day of the week is paying under the award on Saturdays and Sundays even if that figure looks generous against the weekday rate, and a flat hourly number on a payslip that covered a Sunday is the clearest single sign of underpayment there is.

## How do you check whether yours are right?

Read the payslip rather than the total. A compliant payslip separates the hours by rate: ordinary hours at one figure, Saturday hours at another, Sunday and public holiday hours at their own, with the loading identified.

If every hour in a week that included a Sunday appears at one rate, the penalty was not paid. That is a documentation question rather than a legal argument, and it is resolvable by comparing the roster against the payslip for a handful of weeks.

## What if the penalties were not paid?

Work out the correct figure before raising it, because a claim based on the national minimum will understate what is owed where an award applies. Identify the award, the classification, the loading and the applicable penalty for each shift, and total the shortfall across the period rather than for one week.

Raise it with the employer first in writing, since a share of these are genuine payroll configuration errors rather than deliberate underpayment. The Fair Work Ombudsman handles it where that does not resolve it, the process is free, and working holiday makers have exactly the same standing as anyone else.

## Your roster answers this, not the multipliers.

The multipliers are set by instruments you can look up. What you were owed depends on things only your own roster answers. Each of the points below changes the multiple applied to your hours, and several of them apply at once.

- Which award or enterprise agreement covers the venue, since the Sunday rate in particular differs.
- Your classification level within it, which changes the base every multiple is applied to.
- Whether you are casual, since the 25% loading applies on top of the penalty rather than instead of it.
- Which specific hours you worked, because evening, weekend and public holiday penalties are all separate.
- Whether the payslip separates hours by rate or shows a single flat figure.
- Whether you are engaged on an ABN, in which case no award covers you and that is the underlying issue.

Penalty income is taxed the same way as the rest of your wages at the working holiday rate, and you can [estimate your tax refund](/calculator) once you know what the year actually came to.
 `,
 }, {
 slug: "can-your-employer-pay-you-cash-in-hand",
 title:
 "Is Cash in Hand Legal in Australia?",
 description:
 "Paying wages in cash is legal. Skipping the tax, the super and the payslip is not, and all three of those losses are yours rather than the employer's.",
 category: "Work Rights",
 date: "29 July 2026",
 readTime: 5,
 body: `
Paying wages in cash is legal in Australia. No law requires a bank transfer. What is not legal is what usually travels with it: no tax withheld, no superannuation paid, and no payslip issued. The payment method changes nothing about the employer's obligations, and every one of those failures costs you rather than them.

## What does a lawful cash arrangement look like?

Exactly like any other job, except the money is physical. Your employer still withholds PAYG tax at 15% with your TFN on file or 45% without, still pays 12% superannuation on top of your wages, still issues a payslip for every pay period, still meets the minimum wage and the relevant award, and still pays penalty rates for weekends, public holidays and late nights.

If all of that is happening and you are simply handed notes on a Friday, nothing is wrong. That arrangement is rare, but it exists, particularly in small family run venues that have never moved to electronic payments.

## What does the unlawful version actually cost you?

Four things, and every one of them is your loss rather than the employer's, which is the whole reason the arrangement is offered. Three of the four are invisible until you need them, which is usually months later.

**Your superannuation.** Twelve per cent of your wages, gone. Over a six month season on decent hospitality money that is a four figure sum that should have been sitting in an account you could claim on departure.

**Your workers compensation position.** An off books worker injured on a site or in a kitchen is in a genuinely difficult position, and kitchen and farm work is where injuries actually happen.

**Your evidence for a second visa.** Specified work has to be demonstrated, and payslips and payment records are how it is demonstrated. Eighty eight days of cash farm work with no paper trail is eighty eight days you may not be able to prove.

**Your refund.** No withholding means nothing over-withheld, and over-withholding is where most backpacker refunds come from.

The employer saves money on all four. You carry all four.

## Do you still have to declare it?

Yes, and this is not a technicality. All income earned in Australia is assessable regardless of how it was paid, and cash wages belong on your return the same as any other wages.

The practical difficulty is that there is no income statement to lodge from, so the figures have to be reconstructed from your own records. Bank deposits if you banked the cash, a diary of shifts, rosters, messages arranging work, and anything showing the rate agreed. This is workable and it is done routinely. See [declaring cash income on a tax return](/blog/cash-in-hand-tax-return) for how the reconstruction is put together.

The ATO identifies undeclared income through bank data, industry benchmarking and third party reports, and the penalties for evasion are serious. Declaring reconstructed figures honestly is a much better position than not declaring at all, and it is frequently a refund position anyway.

## What are the warning signs before you take the job?

The signs are consistent and they show up early, usually in the first conversation rather than in the first pay. An employer intending to do this properly asks for your TFN and hands you a declaration form; one that does neither has already told you what to expect.

- Cash is presented as the only option, with no bank transfer available
- You are asked not to mention the arrangement
- Payslips are not provided and are treated as unnecessary when asked for
- The rate is below the award, which in hospitality and horticulture it very often is
- Nobody asks for your TFN or gives you a declaration form
- Super is not mentioned at all

The last two are the clearest tells. An employer who never asked for your TFN is an employer who was never planning to report you.

## What records protect you?

Your own, because there will be nobody else's. The minimum useful set is the date and hours of each shift, the rate agreed, the amount received, the employer's business name and address, and any messages or rosters relating to the work.

Photographs of yourself at the workplace help more than people expect, because the first thing disputed in an underpayment or unpaid super claim is whether you worked there at all. Unpaid super in particular can be pursued years after the fact through the superannuation guarantee charge process, and the claim stands or falls on evidence that the employment relationship existed.

## Lawful arrangement or expensive one?

Cash itself is neutral. What decides whether you have a problem is what was and was not done alongside it, and these are the facts that separate a lawful arrangement from an expensive one.

- Whether tax was actually withheld and super actually paid, which is the difference between a lawful arrangement and an unlawful one.
- Whether you have any record of the shifts, since that is what makes both the return and any claim possible.
- Whether you are relying on the work for second visa evidence, which raises the stakes considerably.
- Whether the cash work sat alongside payroll work in the same year, which is the most common shape and the easiest to reconstruct.
- Whether you were injured during it, which is a separate and more urgent problem.
- How long ago it was, since unpaid super can be pursued well after the fact.

Cash income is declared alongside everything else in your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you have added the reconstructed figures to your payroll income.
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
The Fair Work Act 2009 applies to working holiday makers exactly as it applies to Australian citizens. Your visa changes nothing about minimum rates, penalty rates, notice of termination or protection from unfair dismissal. What varies between one backpacker and another is which award covers the job and how long they were in it.

## What does the Act actually guarantee?

A floor of minimum entitlements called the National Employment Standards, which apply to every employee regardless of visa status and cannot be contracted out of. They cover maximum weekly hours of 38 plus reasonable additional hours, annual leave and personal leave for permanent employees, public holidays, notice of termination, redundancy pay for qualifying employees, parental and community service leave, and the requirement that every new employee be given a Fair Work Information Statement.

Alongside the standards sits the wage floor: at least the national minimum wage, or the higher award rate where an award covers the job, which in the industries backpackers work in is almost always the case.

## Which of those matter on a working holiday?

Only some of them, because most working holiday jobs are casual and short. Ranking them honestly is more useful than listing all eleven.

- The correct rate for your award and classification, which is where nearly all the money is
- Penalty rates for evenings, weekends and public holidays, since those are the shifts backpackers work
- The 25% casual loading, which should be visible on every payslip
- Notice of termination, or payment in lieu, when a permanent job ends
- Protection from being required to work unreasonable additional hours
- Superannuation at 12% of ordinary time earnings, paid on top of wages

Annual leave rarely accrues meaningfully because it needs a permanent role held for a substantial period. The wage and condition protections, by contrast, apply from the first shift, and from 1 July 2026 the national minimum is $26.44 an hour or $33.05 casual.

## What does the Fair Work Ombudsman actually do?

It enforces the Act, and it does so free of charge. It investigates complaints, mediates disputes, takes legal action against employers who breach the Act, publishes translated material for migrant workers, and runs targeted campaigns into industries with poor compliance records, which has repeatedly included horticulture and hospitality.

It is not a court and it does not act on every complaint, but it is the correct first channel for underpayment. A complaint supported by rosters, payslips and messages is dealt with as a factual question rather than a legal argument, which is why the record keeping matters more than knowing the law.

## Does complaining put your visa at risk?

No, and the belief that it does is the single reason most underpayment of working holiday makers goes unreported. There are formal protections precisely because silent exploited workers are the outcome the system is designed to avoid.

Temporary visa holders have specific provisions allowing them to remain in Australia to pursue a workplace complaint, and visa status is not lawful grounds for retaliation. Reporting underpayment or unsafe conditions is an entitlement rather than a risk, and the practical protections that matter are keeping records, raising issues in writing, and using the free Fair Work channels rather than accepting an informal cash settlement.

## Where does the Act not protect you?

Where you are not an employee. A contractor engaged under an ABN falls outside the Fair Work Act almost entirely: no award, no minimum rate, no penalty rates, no casual loading, no notice, no superannuation and no unfair dismissal protection.

That is why so much backpacker exploitation runs through ABNs rather than through underpaid wages. The label is not decisive, though. If the arrangement has the substance of employment, being supervised, rostered, hourly paid and using the employer's equipment, then it is employment whatever the paperwork says, and the entitlements follow. Our guide to [the employee versus contractor test](/blog/employee-vs-contractor-australia) sets out how it is decided.

## What is worth keeping while you are working?

Rosters, payslips and any written communication about hours or pay, saved somewhere that survives a lost phone. Rostering apps overwrite rather than archive, and a screenshot taken the week it happened is worth more than a recollection twelve months later.

Most underpayment claims are not disputes about the law. They are disputes about what actually happened, and the person with the records generally prevails.

## Does the Act reach your particular job?

The Act covers you either way. What it is worth to you depends on how the job was structured. The list below is the one that decides how much of the Act actually reaches you.

- Whether you are an employee or engaged under an ABN, which decides whether any of it applies.
- Which award covers the employer and which classification you sit at, since that sets the rate.
- Whether you are casual or permanent, which decides loading, leave and notice.
- How long you were in the role, since notice and redundancy scale with service.
- Which hours you worked, because penalty rates are where the difference concentrates.
- Whether you kept rosters and payslips, which decides how straightforward any claim is.

Whatever was withheld from those pays reconciles at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
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
Work out the correct figure first, then raise it in writing, then escalate to the Fair Work Ombudsman if it is not fixed. Most recoveries are settled by the first two steps. Underpayment claims run for six years, so leaving Australia does not forfeit the money and a claim can proceed from overseas.

## How do you establish what you should have been paid?

By finding the instrument that covers the job rather than by comparing against the national minimum. That is the step almost everyone skips, and skipping it produces a claim that understates the shortfall and is easy for an employer to dismiss.

Identify the modern award or enterprise agreement covering the employer. Find the classification your actual duties correspond to. Apply the 25% casual loading if you are casual, then the penalty for each shift's day and time, then any allowance the award provides. Compare that total against the payslips week by week rather than in aggregate.

Our guide to [reading an Australian payslip](/blog/how-to-read-a-payslip-australia-working-holiday) sets out what each line should show, and a payslip that shows one flat rate across a week containing a Sunday has already told you the penalties were not applied.

## Is it usually deliberate?

Often it is not, and starting from that assumption gets more money back faster. Small venue payroll is frequently set up once, by someone who is not a payroll specialist, and never revisited when the award rates change on 1 July.

The reaction to being shown the numbers is what distinguishes the two cases. An employer who corrects it and back pays had a configuration problem. An employer who becomes hostile, disputes your classification, or suggests your visa makes this complicated has told you what kind of situation this is, and that is the point to stop negotiating and start documenting.

## How should you raise it?

In writing, once, factually. Set out the dates, the hours worked, what was paid, what should have been paid, and the award clause or rate you are relying on. Keep it short and keep it free of accusation.

The written form matters for two reasons. It gives a well intentioned employer something payroll can act on, and it becomes evidence if the matter goes further. A conversation in a kitchen at the end of a shift is neither.

## What does the escalation actually look like?

Four steps, and most cases end at the second. Check the number against the award. Ask in writing. If that fails, the Fair Work Ombudsman takes anonymous tip offs as well as full complaints, is free, can compel an employer to produce records and can recover wages. For clear cut amounts there is also a small claims track in the courts that handles wage claims without lawyers.

The Ombudsman route works best when the facts are documented, because it is a factual inquiry rather than a legal argument. It has broad powers including ordering back payment, requiring written commitments and prosecuting serious cases.

## What records decide it?

Whatever establishes what you actually worked, which is almost always the disputed point rather than the law. Payslips, rosters, the contract or letter of offer, messages about shifts and pay, a diary of hours actually worked and bank statements showing what was deposited.

Screenshot rosters when they are published, because rostering apps overwrite rather than archive and the roster you need is the one from four months ago. Where the employer never issued payslips, your own good faith records are accepted, and the failure to provide payslips is itself a breach that weakens the employer's position.

## Does reporting put your visa at risk?

No, and this belief is the single largest reason underpayment of working holiday makers goes unrecovered. There are formal protections for temporary visa holders precisely because silence is the outcome the system is designed to avoid.

Provisions exist allowing temporary visa holders to remain in Australia to pursue a workplace complaint, visa status is not lawful grounds for retaliation, and the Fair Work Ombudsman maintains specific safeguards for migrant workers. What actually protects you is documentation, written communication and using the free official channels rather than accepting an informal cash settlement that closes off the rest.

## What does recovered money do to your tax?

Back paid wages are assessable in the year you receive them, not the year you earned them, and should be reported through payroll with tax withheld like any other wage. Superannuation at 12% is owed on the corrected figure as well, and it is frequently the larger of the two amounts.

That means an underpayment claim usually has a super claim behind it, and the two are worth pursuing together rather than sequentially. Our guide to [unpaid super](/blog/super-employer-not-paying-what-to-do) covers how that side works.

## What turns your complaint into a claim?

Whether you are owed anything, and how easy it is to recover, depends on the specifics of the job. Working through them before you raise anything is what turns a complaint into a claim.

- Which award or enterprise agreement covers the employer, since that sets every figure.
- Which classification your duties actually correspond to, rather than your job title.
- Whether you are casual, which decides the 25% loading.
- Which hours you worked, since weekend, evening and holiday penalties are where most shortfalls sit.
- Whether payslips were issued at all, which shifts the evidential position in your favour when they were not.
- Whether you are engaged under an ABN, in which case no award applies and the classification itself is the claim.
- How long ago it happened, since underpayment claims run for six years.

Any wages eventually recovered are taxed in the year received, and you can [estimate your tax refund](/calculator) from what you were actually paid.
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

Under the National Employment Standards, full time employees accrue four weeks of paid annual leave and ten days of paid personal and carer's leave each year, with part timers accruing the same on a pro rata basis. Compassionate leave is two days per occasion, and public holidays are paid at base rate if you do not work and at penalty rates if you do.

Accrued annual leave that has not been taken is paid out in the final pay when the job ends. That is the part working holiday makers most often leave behind, because they resign expecting only hours worked and do not check the last payslip against what had accrued.

## What do casuals get instead?

The 25% loading, applied to the award rate for every hour worked, in exchange for having no paid leave and no notice of termination. From 1 July 2026 the casual minimum is $33.05 an hour, being the $26.44 national minimum with the loading applied, and most awards sit above that.

Calling in sick as a casual means an unpaid shift, and there is no accrual building quietly in the background to be paid out later. The compensation was already paid, hour by hour, which is why a casual payslip showing the bare base rate with no loading is an underpayment rather than a rounding issue.

## How do you tell which one you actually are?

By how the work runs, not by the word on the contract. A genuinely casual arrangement has no guaranteed hours and a roster that varies, and either side can decline. A fixed weekly pattern of the same shifts over months, with an expectation on both sides that it continues, looks like part time employment regardless of what the paperwork says.

The distinction is worth money in both directions. Someone labelled casual but working a fixed permanent pattern may be owed accrued leave. Someone labelled permanent but paid the casual loaded rate is a different problem again. Our guide to [full time, part time and casual](/blog/full-time-part-time-casual-australia) sets out how the categories are actually tested.

## What happens to leave when you quit?

Unused annual leave is paid out in full at your ordinary rate, plus any leave loading the award provides. Personal and sick leave is not paid out at all, and neither is anything a casual might feel they accrued.

For a working holiday maker in a permanent role for six months, that payout can be meaningful, and it is one of the more common exit underpayments precisely because nobody checks. Read the final payslip line by line against your start date rather than trusting the total.

## How is a leave payout taxed?

As ordinary income in the year it is received, at the working holiday maker rate. A lump sum landing in a final pay can look as though it has been withheld heavily, because payroll systems sometimes apply a rate calculated as though that pay period repeated all year.

That over withholding is temporary and comes back at assessment, which is a good reason not to close the Australian bank account when the job ends. Our guide to [tax on your final pay and leaving Australia](/blog/tax-obligations-after-leaving-australia) covers what else lands in that last payslip.

## Does long service leave ever apply?

Almost never on a working holiday. It generally requires seven to ten years with one employer depending on the state, which is well beyond what a 417 or 462 visa allows for.

It is worth a sentence only because a small number of people return to Australia repeatedly on other visas and stay with the same employer, and in those cases prior continuous service can count. If that is your situation the entitlement is paid out on departure and taxed as income.

## Did anything accrue for you at all?

Your entitlements are decided by your employment category and by your award, and both are facts you can check today. The points below decide whether anything accrued at all, and whether it was paid out when you left.

- Whether you are genuinely casual or working a permanent pattern under a casual label.
- Whether the 25% loading actually appears on your payslip, which is the first thing to check.
- Which award covers you, since annual leave loading and public holiday treatment vary by award.
- How long you were with a single employer, which decides whether meaningful annual leave accrued.
- Whether accrued leave was paid out in your final pay, and at the right rate.
- Whether you are engaged under an ABN, in which case none of these entitlements exist at all.

Leave payouts are taxed with the rest of your wages, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 }, {
 slug: "what-is-a-tax-invoice",
 title: "Tax Invoices: The Seven Required Elements",
 description:
 "Invoices over $82.50 must include specific details to be valid - and GST lines only if registered. What to include and the mistakes that delay payment.",
 category: "Work Rights",
 date: "2 March 2025",
 readTime: 5,
 body: `
A tax invoice is the document you issue to a business to be paid for contracting work. It has to carry your name, your ABN, the date, a description of what you did and the amount. The ABN is the part with money attached: invoice without one and the business must withhold 45% before paying you.

## When do you have to issue one?

Whenever the sale is $82.50 or more including GST, and whenever the buyer asks for one. In practice most business clients require an invoice before their accounts system will release a payment at all, so the threshold is rarely the operative rule.

Issue one anyway for smaller jobs. It records what was agreed and what was delivered, it settles payment disputes without argument, and it is the record your return is built from at the end of the year. An invoice takes two minutes in a notes app and is the only evidence that the work happened on the terms you remember.

## What has to be on it?

Six things for someone not registered for GST, which is most working holiday makers doing delivery, farm or freelance work.

- Your name, and your business name if you trade under one
- Your ABN
- The date of the invoice
- A description of the services or goods provided
- The total amount payable
- Your contact details

If you are not registered for GST, do not put a GST line on it and do not head it "Tax Invoice". Adding 10% GST while unregistered is unlawful, and it is the error that accounts departments catch immediately. If you are registered, the GST amount has to be shown separately and the document is properly headed as a tax invoice.

## Why does the ABN on it matter so much?

Because of the no ABN withholding rule. Where an invoice carries no valid ABN, the paying business is required to withhold 45% of the payment and remit it to the ATO, leaving you with 55% of what you invoiced.

It comes back at assessment, so nothing is lost permanently, but it is your money sitting elsewhere for months. The rule exists to make invoicing without registration pointless rather than to punish you, and quoting the ABN on every invoice is the whole compliance requirement.

## How should you keep the records?

Sequentially and somewhere that survives a lost phone. Number invoices in order, save each as a PDF, and keep a simple list of date, client, amount and whether it was paid.

Keep them for five years, since that is the period over which the ATO can ask about a return. Where records are missing, contractor income has to be reconstructed from bank deposits, which is less accurate and harder to defend if the return is queried.

## Does invoicing mean you get no superannuation?

Usually, and that is the trade rather than an oversight. An employee has 12% superannuation paid on top of wages. A contractor is paid what the invoice says and nothing else.

There is an important exception. Where the substance of the arrangement is employment, being supervised, rostered, hourly paid and working for one client with their equipment, the classification is wrong regardless of who issued an invoice, and superannuation and award rates are owed. That is sham contracting, and our guide to [the employee versus contractor test](/blog/employee-vs-contractor-australia) sets out how it is decided.

## What does invoicing change at tax time?

Everything about the timing. Nothing was withheld from any invoice you issued, so the tax on that income is owed in a single amount at assessment rather than absorbed pay by pay.

The working holiday maker rate of 15% on the first $45,000 applies to invoiced income exactly as it applies to wages, so the rate is not the surprise. Someone who invoiced $20,000 across the year and set nothing aside has a real bill, and someone who also had ordinary employment usually finds the withholding from those wages covers it.

## Employee or contractor changes everything here.

Invoicing is mechanical. What it means for you depends on how the work is structured. The points below decide whether the year ends with a refund or a bill, and none of them is visible from the invoices themselves.

- Whether you hold a valid ABN, since without one 45% is withheld from every payment.
- Whether you are registered for GST, which changes the document and adds a quarterly obligation.
- Whether the arrangement is genuinely contracting or is misclassified employment.
- Whether you kept copies, since the return is built from your records rather than from anyone's reporting.
- Whether you also had wages in the same year, whose withholding often absorbs the tax on the invoiced income.
- How much you set aside as you went, given nothing was taken out for you.

The combined position is worked out in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) to see whether the year lands as a refund or an amount owing.
 `,
 }, {
 slug: "can-you-work-for-multiple-employers",
 title: "Can You Work Two Jobs on a WHV?",
 description:
 "You can work several jobs at once on a working holiday visa. The 6-month rule per employer, and the withholding trap when two employers tax you at 15%.",
 category: "Work Rights",
 date: "9 March 2025",
 readTime: 4,
 body: `
Yes. There is no limit on how many jobs a 417 or 462 visa holder can hold at once. The six month limit applies per employer, not overall. What matters for money is that each employer holds a Tax File Number Declaration, because without one they must withhold at 45%.

## What does each new employer need from you?

Every employer needs their own Tax File Number Declaration, and the number itself is not enough. Telling a manager your TFN verbally, or showing them the letter, does not change payroll. The form is what does.

- Your TFN, which is the same number for every job
- A completed Tax File Number Declaration for that employer
- Working holiday maker selected as your status
- No selected for the tax free threshold question

This is the quiet loss we see most often in a multi employer year: one job correctly at 15% and a second running at 45% for months because nobody completed a second form. The excess comes back at tax time, but only after months without it.

## How does the six month rule interact with several jobs?

The six month restriction on 417 and 462 visas applies to each employer separately, so three concurrent jobs are three separate six month clocks rather than one shared limit. Two years with one employer would breach it; two years across four employers would not.

The exemptions matter here too, because several industries and regions allow longer with the same employer. Our guide to [the six month employer rule](/blog/six-month-employer-rule-working-holiday-visa) sets out where the limit binds and where it does not.

## What happens to your tax with several jobs?

Because the working holiday maker rate is flat at 15% to $45,000, several jobs do not create the bracket problems an Australian resident would face. Each registered employer withholds 15% from their share, all the income combines into a single return, and the total is taxed at the same rate it would have been from one employer.

The complication runs the other way, which is the part that surprises people. Multiple employers make it more likely that one of them is set up wrongly, and a single job withholding at 45% or at foreign resident rates quietly over-taxes you all season while the others look fine.

## What is the withholding trap in a multi job year?

The trap is not under-withholding, it is an over-withheld job you never noticed. Two employers both withholding 15% produce a clean result. One employer missing your declaration form, or not registered with the ATO as a working holiday maker employer, produces a rate you are not entitled to be charged.

Both are recoverable on the return, and both are invisible unless someone compares the withholding percentage across employers. Dividing tax withheld by gross for each job, once, takes two minutes and is the single most useful check available to someone working several jobs.

## What happens to super across several employers?

Each employer independently owes 12% on top of your wages, and each will pay it into whatever fund is nominated or stapled to you. Working four jobs across a year very often means more than one fund, which is where super quietly fragments.

That matters at departure rather than during the year. Each fund holds a separate balance and each requires its own DASP claim, so the person who remembers one fund and forgets two leaves money in Australia permanently. Our guide to [finding lost super](/blog/how-to-find-lost-superannuation) covers tracing them before you fly.

## What should you keep track of?

A single line per job, written down as you go, is worth more than a shoebox of payslips collected retrospectively. Employer name, start and end dates, the fund the super went to, and roughly what was withheld.

- Payslips from every employer
- Start and end dates for each
- The super fund used by each
- The withholding percentage each was applying

The reason is memory rather than paperwork. A year with five employers across three states genuinely does blur, and the forgotten job is almost always a short one, which is also the one most likely to have been withheld at the wrong rate.

## Where does this stop being straightforward?

At the point where one of the jobs is not employment at all. A working holiday year that mixes wages with ABN contracting produces one return with two kinds of income in it, taxed at the same rates but arriving with completely different withholding, and the wage side often absorbs the liability from the ABN side.

The other genuine complication is a job that crossed 30 June. Wages are taxed in the year they were paid rather than the year they were earned, so a job running from May to August splits across two returns, and the withholding does not divide evenly between them. Both of those are worth flagging when the [tax return](/tax-return) is prepared rather than discovered afterwards.
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
Casual work pays a 25% loading on the base rate and accrues no paid leave. Full-time and part-time pay the base rate and accrue annual and sick leave instead. All three are taxed identically at the working holiday maker rates, so the choice is about pay shape and security, not tax.

## What does full-time employment mean in Australia?

Full-time means a regular pattern of ordinary hours, typically 38 a week, with a guaranteed schedule and the full set of entitlements under the National Employment Standards. There is no casual loading, because the leave is the compensation instead.

- Four weeks of paid annual leave a year
- Ten days of paid personal and carer's leave a year
- A guaranteed roster rather than offered shifts
- Notice of termination and access to unfair dismissal after the qualifying period

Few working holiday makers hold full-time roles, mostly because the six month employer limit sits awkwardly against a permanent job rather than because employers refuse.

## What does part-time employment mean?

Part-time is the same arrangement as full-time on fewer hours, with an agreed regular schedule and every entitlement accruing pro rata. It is the least understood of the three and often the best deal available on a working holiday visa.

The reason is the combination of predictability and accrual. A part-time worker on 25 hours a week accrues annual leave on those hours, and untaken annual leave is paid out when the job ends. For someone doing a settled six month block in one city, that payout can be worth more than the casual loading would have been.

## What does casual employment mean?

Casual means no guaranteed hours and no leave accrual, compensated by a 25% loading on top of the base hourly rate. It is by far the most common arrangement for working holiday makers, particularly in hospitality, retail and harvest work.

- No annual leave or paid sick leave
- 25% loading on the base rate
- Shifts offered rather than rostered, and refusable
- Less security, more flexibility

The national casual minimum is $33.05 an hour from 1 July 2026, being the national minimum wage of $26.44 plus the loading. If your casual rate is at or near the base rate rather than above it, the loading is missing, and that is an underpayment rather than a negotiation.

## How do you tell which one you actually are?

The contract should say, but the reality of the work decides it if the two disagree. A fixed weekly roster with the same shifts every week is the pattern of part-time employment, whatever the paperwork calls it, and being labelled casual while working an unchanging roster is a recognisable misclassification.

- A stated classification in the letter of engagement
- A fixed weekly schedule points to part-time
- Variable shifts week to week point to casual
- A 25% loading in the rate points to casual

After six months of a regular pattern, casual conversion rights can arise, which is the mechanism for correcting a long running misclassification without a fight. Our guide to [shift cancellation rules](/blog/casual-shift-cancellation-rules-australia) covers what protection casuals do have when a shift is pulled.

## Does the classification change your tax?

No. All three are taxed at the working holiday maker rates, at 15% on the first $45,000, and the 25% casual loading is ordinary taxable wages like everything else. Superannuation at 12% is payable on all three from the first dollar.

What does change is the shape of your income across the year, and that has an indirect tax effect worth knowing. A casual with wildly uneven fortnights can be over withheld in the busy ones, because each pay run is taxed as though it were typical, and the correction comes back on the [tax return](/tax-return) rather than in the pay.

## Which should you actually choose?

Casual suits most working holiday years, and the reason is the loading plus the freedom to leave for the next place without giving notice. If the plan involves moving every few months, the leave you would have accrued would mostly have gone unused anyway, and the 25% is money now.

Part-time wins in one specific case: a settled block of five or six months in one city with a predictable roster. There the accrued annual leave pays out at the end, the sick days are real, and the roster is what lets you sign a lease rather than rebook a hostel.

## Where does this genuinely change your money?

Three branch points, and none is about the label. Whether the 25% loading is actually in your casual rate, because a flat rate described as covering everything usually covers nothing. Whether your classification level under the relevant award matches the work, since a Level 1 rate for Level 2 duties costs more than the casual question ever will. And whether accrued leave was paid out when a part-time job ended, which is frequently missed on a final pay.

The last one is worth a specific check. A final pay that ends a part-time role should include the balance of untaken annual leave, and it is the item most commonly left out when a backpacker gives notice and leaves the state a week later.
`,
 },

 // ─── MEDICARE & OTHER ────────────────────────────────────────────────────────
 {
 slug: "what-is-medicare-working-holiday-makers",
 title:
 "Are You Covered by Medicare on a WHV?",
 description:
 "Most working holiday makers are not covered by Medicare. Your passport decides it, and it decides whether you can claim the 2% levy exemption too.",
 category: "Medicare & Other",
 date: "20 July 2026",
 readTime: 6,
 body: `
Usually not. [Medicare](/medicare) covers Australian citizens and permanent residents, and a 417 or 462 visa does not make you either. The exception is your passport: eleven countries hold a Reciprocal Health Care Agreement with Australia, and their nationals get limited cover. Everyone else pays privately.

## What decides whether you are covered?

One fact, and it is your passport rather than your visa. Australia has Reciprocal Health Care Agreements with the United Kingdom, the Republic of Ireland, New Zealand, Sweden, the Netherlands, Finland, Norway, Belgium, Slovenia, Malta and Italy, and nationals of those eleven countries can enrol for limited Medicare benefits while their visa is valid.

If your passport is German, French, Japanese, Korean, Taiwanese, Canadian, American, Israeli, Spanish or anything else, there is no agreement and there is no Medicare. That is roughly two thirds of the working holiday population in Australia, and it is the whole German and Japanese market. The [full agreement country list](/blog/countries-with-medicare-agreement-australia) is worth checking rather than assuming, because people regularly assume the wrong way in both directions.

## What does an agreement actually get you?

Less than the word Medicare suggests. Reciprocal cover is for medically necessary treatment, meaning something that arises while you are here and cannot reasonably wait until you go home. In practice that is a subsidised GP visit, public hospital treatment as a public patient, and prescriptions at the subsidised rate.

It does not cover ambulance transport, which in most states is billed separately and runs into hundreds of dollars for a single trip. It does not cover dental, optometry, physiotherapy, elective procedures, private hospitals or, in most cases, pre-existing conditions. This is why British and Irish backpackers who technically have cover still commonly carry insurance, and it is why the ambulance gap is the single most common expensive surprise.

## What does it cost if you are not covered?

You are treated as a private patient and you pay the published fee. A GP consultation is commonly $80 to $120. A specialist appointment runs from $200 upward. Prescriptions are full retail rather than subsidised. Public hospital emergency departments will treat you, but the follow up and any admission is chargeable.

Health insurance is a condition of the 462 visa and is strongly expected on the 417, and this is the reason. A broken wrist falling off a ladder in a Mildura packing shed, or an ankle on a Thredbo season, is a manageable expense with cover and a genuinely serious one without.

## How does this affect your tax?

Directly, and this is where it turns into money rather than risk. The Medicare levy is 2% of taxable income charged to people who are entitled to Medicare. If you are not entitled, the levy should not apply to you, and on $25,000 of earnings that is about $500.

The exemption is not automatic. It has to be claimed on your return, and claiming it requires a Medicare Entitlement Statement from Services Australia, applied for on form MS015, which commonly takes up to six weeks to issue and is needed separately for each financial year. Six weeks is the whole problem: most people learn the document exists in October, when the return is already due.

## Does having private insurance change the exemption?

No, and this trips people up in both directions. The exemption turns on whether you are entitled to Medicare, not on whether you bought anything else. Buying private cover does not create an exemption and it does not remove one.

The mirror of that is more painful. A British or Irish traveller who never enrolled in Medicare and never used it is still generally entitled to it, and entitlement is what the exemption tests. The levy applies. That is a genuinely counterintuitive outcome and it is one of the more common disappointments at lodgement.

## Your passport decides both halves of this.

Coverage and the levy exemption are decided by the same fact, which is your passport, and they move in opposite directions. These are the circumstances that change either half of the answer.

- Your passport, which is the whole question. Eleven countries in, everyone else out.
- Whether you enrolled part way through the year, which produces a partial exemption for the days you were not covered rather than an all or nothing result.
- Whether you ordered the Medicare Entitlement Statement in time. Six weeks of lead time is what stands between most people and about $500.
- Whether you hold dual nationality. The agreement follows the passport you are here on, and a second passport can change the answer completely.
- Whether you already lodged a year without claiming it, since the levy can usually be recovered by amending the return, generally within two years of the original lodgement.

The exemption is claimed as part of your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) with and without it to see what it is worth on your income.
 `,
 }, {
 slug: "countries-with-medicare-agreement-australia",
 title:
 "11 Countries That Get Medicare in Australia",
 description:
 "Eleven countries hold a Reciprocal Health Care Agreement with Australia. What the cover includes, and why being on the list removes your levy exemption.",
 category: "Medicare & Other",
 date: "29 July 2026",
 readTime: 5,
 body: `
Eleven. Australia holds Reciprocal Health Care Agreements with the United Kingdom, the Republic of Ireland, New Zealand, Sweden, the Netherlands, Finland, Norway, Belgium, Slovenia, Malta and Italy. Nationals of those countries on a valid working holiday visa can access limited [Medicare](/medicare) benefits. Nationals of every other country cannot.

## Which countries are on the list, and which are not?

The eleven named above are the whole list. Nothing regional or linguistic holds them together, so read it rather than guess at it.

The countries people most often assume are on it and are not include Germany, France, Spain, Canada, the United States, Japan, South Korea, Taiwan and Hong Kong. Germany and Japan are the two that matter most in practice, because they are large working holiday populations whose travellers frequently assume European or developed country reciprocity exists when it does not.

## What does the cover actually include?

Medically necessary treatment as a public patient, meaning a condition that arises during your stay and cannot reasonably wait until you go home. That gets you a GP consultation at the subsidised rate, treatment in a public hospital as a public patient, and prescriptions at the subsidised rate under the Pharmaceutical Benefits Scheme.

It is a safety net rather than health cover, and the exclusions are where people get caught.

- Ambulance transport, which is billed separately in most states and runs to hundreds of dollars for a single trip
- Dental treatment of any kind
- Optometry, glasses and physiotherapy
- Most specialist consultations
- Private hospital treatment
- Elective and cosmetic procedures
- Pre-existing conditions, in most cases

The ambulance gap is the one that surprises British and Irish travellers most, because it does not exist at home. A single ambulance trip after a fall on a farm outside Bundaberg or an incident on a Whitsundays boat is a bill, agreement or no agreement.

## How do you enrol?

In person at a Services Australia service centre, with your passport, your visa grant evidence and proof of citizenship of the agreement country if that is not obvious from the passport. You are issued a Medicare card valid for the eligible period of your visa.

Enrolling is worth doing if you are eligible, because the card is what makes a bulk billing GP free at the point of use rather than a hundred dollar consultation. It does not replace insurance and it should not be treated as though it does.

## What does an agreement do to your tax?

This is the part that costs money and it works in the direction people do not expect. The 2% Medicare levy applies to people entitled to Medicare, and entitlement is what an agreement creates. So an agreement passport generally removes your ability to claim the levy exemption, whether or not you ever enrolled and whether or not you ever saw a doctor.

For a German or Japanese traveller with no agreement, the [levy exemption](/blog/medicare-levy-working-holiday-makers) is usually available and is worth about $500 on $25,000 of earnings. For a British or Irish traveller, the levy usually simply applies. Same income, same visa, different passport, different assessment.

## More than your passport decides this.

The eleven country list is fixed, but what it means for you depends on more than which passport you carry. These are the circumstances that change the outcome on either the health cover or the levy.

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
 "Do Working Holiday Makers Pay the 2% Levy?",
 description:
 "Most 417 and 462 holders are not entitled to Medicare, so the 2% levy should not apply. That is about $500 on $25,000, and your passport decides it.",
 category: "Medicare & Other",
 date: "20 July 2026",
 readTime: 6,
 body: `
Usually not. The 2% Medicare levy is charged to people entitled to Medicare, and most 417 and 462 holders are not entitled, so the levy should not apply. On $25,000 of earnings that is about $500. It is not applied automatically and it is not removed automatically either, which is where the money is lost.

## What decides whether you get the exemption?

Your passport, and one piece of paper most backpackers never learn exists. Entitlement to Medicare is the test, and entitlement comes from holding a passport from one of the eleven Reciprocal Health Care Agreement countries: the United Kingdom, Ireland, New Zealand, Italy, Malta, the Netherlands, Belgium, Finland, Norway, Sweden and Slovenia.

Germany, Japan, France, Korea, Taiwan, Canada, the United States and everywhere else are not on that list, so their nationals are usually in the clear and the exemption usually applies. That covers the great majority of working holiday makers, and it means for most readers of this page the levy is money that should never have been charged.

## What is the piece of paper?

A Medicare Entitlement Statement from Services Australia, applied for on form MS015. It is the evidence that you were not entitled to Medicare for a given period, and the exemption is claimed at item M1 of the return using it. A separate statement is needed for every financial year you claim.

The statement commonly takes up to six weeks to issue, and that lead time is the entire practical problem with this exemption. Most people find out it exists in October, when the return is already due, and quietly give up on about $500 rather than start a six week process. Ordering it in July, before you think about lodging, is the single change that makes the difference.

## How much is it actually worth?

Two per cent of taxable income, which scales with what you earned rather than being a flat amount. At working holiday income levels it lands in a range that is genuinely worth the paperwork.

- $15,000 earned: about $300
- $25,000 earned: about $500
- $35,000 earned: about $700
- $45,000 earned: about $900

That money comes back through the refund rather than through your payslip, because the levy is assessed at the end of the year rather than withheld pay by pay.

## What if you are from an agreement country?

Then the answer usually goes the other way, and it is worth being blunt about it because the disappointment is common. If you hold a passport from one of the eleven agreement countries you are generally entitled to Medicare whether or not you ever enrolled and whether or not you ever used it. Entitlement is the test, not use.

The exemption is therefore off the table for most British and Irish travellers, and the levy simply applies as part of the assessment. There are still partial cases: someone whose entitlement began part way through the year, or whose circumstances changed, can be exempt for the days they were not entitled, and the dates have to be right.

## What if you already lodged without claiming it?

It can usually be recovered by amending the return. The general amendment window is two years from the date the original assessment issued, which means a first year backpacker who lodged in the previous October is very often still inside it.

This is a common and worthwhile check for anyone who lodged their first Australian return themselves, because the levy exemption is one of the two items most often missed by a self lodged working holiday return, alongside residency. It is also worth checking every year separately: a two year stay is two returns, two statements and two possible amendments.

## Can you claim the exemption at all?

The exemption is worth about $500 on $25,000, but whether you can claim it at all turns on facts you already know. These are the ones that decide it.

- Your passport, which decides entitlement and therefore the whole question.
- Whether you enrolled in Medicare part way through the year, which produces a partial exemption for the days you were not covered.
- Whether the Medicare Entitlement Statement was ordered in time. Six weeks of lead time is why this gets abandoned.
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
 "The residency and tax-free threshold questions decide your withholding rate. How working holiday makers complete the form correctly, line by line.",
 category: "Medicare & Other",
 date: "2 April 2025",
 readTime: 5,
 body: `
The Tax File Number Declaration is the form you give a new employer so they can withhold at the right rate. Three answers on it set your tax: whether you are an Australian resident for tax purposes, whether you are a working holiday maker, and whether you are claiming the tax free threshold. Everything else on it is identification.

## Why does this form decide more than the TFN itself?

Because the employer's payroll reads the form, not your intentions. Without a completed declaration on file the default is 45% withholding, which on a $1,000 week is $300 held back instead of $150. The correct working holiday maker treatment is 15% on the first $45,000, and only the form triggers it.

That is why the declaration, not the TFN application, is where the money is actually decided. The application is a free ten minute government process. The form is the one that changes your payslip, and it is handed to you on your first day, usually when you are least equipped to think about it.

## What do the three answers do?

Each one moves the rate to a different place, and two of the three wrong combinations create a debt rather than a delay.

- Working holiday maker, answered yes, is what produces the 15% rate. This is the answer for a 417 or 462 visa holder.
- Foreign resident, selected instead, produces 30% withholding from the first dollar. Over withholding, recoverable at assessment.
- Australian resident with the tax free threshold claimed produces too little withholding across the year, and the shortfall becomes an amount owing when the return is assessed.

The last one is the expensive mistake, because it feels like more money in every pay and arrives as a bill months later. Our guide to [the tax free threshold and working holiday visas](/blog/tax-free-threshold-working-holiday-visa) explains why the threshold does not sit alongside working holiday maker rates.

## What if your TFN has not arrived yet?

You can still complete the declaration, and doing so is the whole point of the 28 day window. Recording that an application is in progress, with the reference number, keeps you on the working holiday rate through that window rather than starting at 45% on day one.

Say nothing and the higher rate applies immediately, and every week at 45% is a week of your wages sitting with the ATO until the return is lodged. Our guide to [working before the TFN arrives](/blog/tfn-reference-number-before-tfn-arrives) covers what to give the employer in the meantime.

## Does one form cover every job?

No. Every employer needs their own declaration, including short casual roles and a two week harvest job. A TFN given to one payroll is not shared with another, and a previous employer holding your form does nothing for the new one.

This is the mechanical reason multi employer years go wrong so often. Four jobs means four declarations, and the one that was never completed is usually the one withholding at 45%, which is also usually the one whose income the person forgets when lodging.

## What does the residency question on the form actually ask?

The same question that later decides your refund, asked at the worst possible moment. Residency for tax purposes is not immigration residency and it is not a day count. It is a judgement made on the whole of a year, and the details that swing it are rarely the ones people expect.

For most working holiday makers the working holiday maker answer is the right one and the residency box is straightforward. For someone in a second or third year it genuinely may not be, and calling it wrongly is expensive in either direction. Our guide to [tax residency for working holiday makers](/blog/tax-residency-working-holiday-makers) covers why it is not a question to answer on instinct.

## What if it was filled in wrong?

Submit a corrected declaration to the employer. Payroll updates from that point forward rather than retrospectively, so the correction fixes future pays and the earlier difference is settled through the return.

Where too much was withheld, that comes back as part of the refund. Where too little was withheld because the threshold was claimed, the shortfall is payable, and finding that out in July rather than in October at least gives you time to plan for it. Check the next payslip after any correction rather than assuming it took effect.

## What was true the day you signed it?

The form is short. What it costs you depends on your circumstances at the moment you signed it. The points below are the difference between a refund at the end of the year and an amount payable.

- Whether the working holiday maker box was ticked, which is the single field that produces the 15% rate.
- Whether the tax free threshold was claimed, which is the mistake that builds a debt rather than a refund.
- Whether your TFN had arrived, and whether an application in progress was recorded with its reference number.
- How many employers you gave a declaration to, since each is separate.
- Whether the employer is registered with the ATO as a working holiday maker employer, because an unregistered one withholds at foreign resident rates regardless of your form.
- Whether your residency position is genuinely as simple as the form assumes, which for a longer stay it may not be.

Any over withholding is reconciled in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) to see what a wrongly completed form actually cost.
 `,
 }, {
 slug: "what-does-tax-withheld-mean-payslip",
 title:
 "Tax Withheld on Your Payslip: What It Means",
 description:
 "Tax withheld is what your employer sends the ATO before paying you. On a working holiday visa it should be about 15%. What each wrong percentage means.",
 category: "Medicare & Other",
 date: "20 July 2026",
 readTime: 5,
 body: `
Tax withheld is the income tax your employer sends to the ATO out of your gross pay before the rest reaches your account. On a working holiday visa it should be about 15% of gross earnings up to $45,000. Divide the tax withheld by the gross figure on your payslip and you should get roughly 0.15.

## What are the three numbers on a payslip and how do they relate?

Every compliant Australian payslip shows gross pay, tax withheld and net pay, and the relationship between them is simply that the first minus the second equals the third. Gross is what you earned, tax withheld is what your employer forwarded to the ATO on your behalf, and net is what lands in your bank account.

Tax withheld is a prepayment, not a final bill. It is an estimate collected pay by pay against a liability that is only actually calculated once, at the end of the financial year, across your whole income. That is why over-withholding produces a refund rather than a loss, and why under-withholding produces a bill.

## How do you check the rate is right?

Divide tax withheld by gross pay on any single payslip. A working holiday maker with a Tax File Number Declaration correctly completed and a properly registered employer should land near 0.15.

- Gross $600 a week: about $90 withheld
- Gross $900 a week: about $135 withheld
- Gross $1,200 a week: about $180 withheld
- Gross $2,000 a week: about $300 withheld

Do it on more than one payslip, and do it on each employer separately. The most common real world pattern is not a payslip that is wrong across the board, it is one employer correct and another quietly wrong for months.

## What does each wrong percentage mean?

The percentage tells you which rule went wrong, and each one has a different cause and a different fix. This is the most useful diagnostic on your payslip.

**Around 45%.** Your Tax File Number Declaration has not reached payroll, or the 28 day window lapsed without your TFN. This is the most expensive and the most common. It resolves the moment the declaration is on file, from the next pay run onward.

**Around 30% or a bit above.** Your employer is not registered with the ATO as an employer of working holiday makers, so they are applying foreign resident rates instead of the working holiday maker schedule. This is not your mistake and there is nothing on your declaration form to fix. The excess comes back at tax time.

**Noticeably under 15%, or close to nothing on ordinary wages.** The tax free threshold was claimed on your declaration. This one is different from the others in an important way: it is the only one on this list that creates a debt rather than a refund, because too little was withheld all year and the shortfall is payable at assessment.

**Nothing at all, with no super line either.** You are being paid outside payroll, whether or not anyone called it that. There is no withholding to reclaim and no income statement to lodge from, and the income is still declarable.

## Where does the money go once it is withheld?

Your employer holds it briefly and remits it to the ATO on their own reporting cycle, and at the end of the financial year they finalise the totals as your income statement. That statement is what your return is built from, not your payslips.

This matters practically. If an employer never finalises, or finalises with figures that do not match what you were paid, your payslips are the only evidence of the difference. That is the whole argument for keeping them.

## Why keep payslips if the ATO already has the data?

Because the ATO has what the employer reported, which is not always what you were paid. Payslips are how a discrepancy gets resolved, and they are the only record that shows super separately from tax, which is the line most likely to be missing entirely.

Payroll errors on backpacker wages are not rare and they are not usually malicious. They cluster in small single site operators, in farms and packing sheds using casual paper systems through a harvest, and in venues where one person does payroll around everything else. Keeping the emailed payslips in one folder costs nothing and settles the question later.

## Why does your payslip read differently?

The 15% benchmark applies to every working holiday maker, so a payslip that reads differently is telling you something specific about your own setup. These are the situations that produce a different percentage, and they do not all point the same way.

- How many employers you had. Each is a separate declaration, a separate rate and a separate income statement, and over-withholding is usually concentrated in one of them.
- Whether any employer was unregistered as a working holiday maker employer, which produces foreign resident withholding you cannot fix on your end.
- Whether the tax free threshold was ticked. This is the branch that produces a bill rather than a refund.
- Whether any of your income was ABN work, where nothing is withheld at all and the tax is settled entirely at assessment.
- Whether a period ran before your TFN was on file, which puts a block of pays at 45% and concentrates your refund there.

Anything withheld above what you actually owed comes back through your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 }, {
 slug: "what-is-an-income-statement",
 title:
 "What Is an Income Statement in Australia?",
 description:
 "The income statement replaced the paper payment summary. Your employer files it through payroll reporting, and it is only final once marked as tax ready.",
 category: "Medicare & Other",
 date: "20 April 2025",
 readTime: 4,
 body: `
You get one income statement for each employer, for each financial year, and it carries the two numbers your return is built on: gross pay and tax withheld. It is the digital successor to the PAYG payment summary that used to arrive on paper at the end of the year. Nobody hands it to you now. It sits in ATO systems, and a working holiday year with five employers produces five of them.

## Where does an income statement come from?

It comes from your employer's payroll software, not from a form anyone fills in at the end of the year. Under Single Touch Payroll every pay run reports your gross wages, the tax withheld and your superannuation to the ATO as it happens, and the income statement is the accumulated total of those reports.

That has one consequence worth understanding: the record belongs to the ATO's systems rather than to your former employer. A farm in Mildura that no longer answers emails has already reported your wages, and the figures can be retrieved without them.

## When does it become usable?

The year ends on 30 June, employers begin finalising from around 14 July, and most have finished by 31 July. Until an employer finalises, the statement shows year to date figures that are not yet declared to be complete, and the status changes to tax ready once they do.

Lodging against a statement that is not tax ready is one of the most reliable ways to get a wrong assessment and an amendment later. The figures can still change, and if they do the return no longer matches what the ATO holds. Waiting until every employer has finalised is worth more than lodging in the first week of July.

## What are the three numbers to check?

Gross payments, tax withheld, and the super shown alongside them. Those three tell you whether your year was taxed the way it should have been, and any one of them being off changes what the return is worth.

- **Gross payments.** Compare against your own running total from payslips. A gap means either a missing pay period or an underpayment.
- **Tax withheld.** Divide it by gross. Around 15% is right for a working holiday maker at a registered employer. Substantially more means a period without your TFN on file, or an employer who never registered.
- **Super.** Contributions are quarterly, so a figure that looks light in July may simply not have been paid yet.

## What if an employer is missing?

A missing employer is the most common defect and it has three causes, which need different answers. The employer may not have finalised yet, in which case waiting resolves it. They may have reported you under a wrong name or date of birth, in which case the record exists but is not attached to you. Or they may never have reported the wages at all, which is the cash in hand case.

Either way, the income you earned is taxable and belongs in the return whether or not a statement exists for it. Our guide to [lodging with cash income](/blog/cash-in-hand-tax-return) covers reconstructing a period where no record was filed.

## What if the figures are wrong?

Errors in the statement are corrected by the employer, not by adjusting the return to match your payslips. Common ones are a gross total that does not reconcile, a withholding figure that reflects the wrong residency status, and duplicated pay periods after a payroll system change.

Where an employer is responsive, a correction is usually made within a pay cycle or two. Where they are not, the return can be lodged on a properly supported estimate and amended once the reporting is fixed, and there is a two year window for that amendment. What does not work is quietly using a figure the ATO does not hold, because that is precisely the mismatch that puts a return into manual review.

## What decides how complete your return is?

Whether every employer for the year has been identified, and nothing else comes close. A working holiday year commonly runs to three, four or five employers across two states and often two financial years, and the one people forget is almost always the short one: three weeks of packing in February, a fortnight of promotional work, an agency shift.

Lodging without accounting for every one of them is the single most common self lodgement error, and it cuts both ways. A forgotten employer with heavy withholding is refund you never claimed. A forgotten employer with income you did not declare is an amendment and an interest charge later. When we prepare a [tax return](/tax-return) the full list is pulled from ATO systems before anything else happens, precisely because memory is unreliable about a year spent moving.

## What should you keep yourself?

Keep payslips, bank statements showing wages arriving, and anything in writing about your pay rate. The income statement tells you what was reported. Your own records are the only thing that tells you whether what was reported is what you were actually owed.

That distinction matters most in farm work and hospitality, where the reported figure can be perfectly accurate as a record of an underpayment. The return is prepared on the reported figures either way, but the gap is worth knowing about, because recovering it through Fair Work is a separate and free process.
`,
 }, {
 slug: "what-is-the-ato",
 title:
 "What Is the ATO? A Backpacker's Guide",
 description:
 "The Australian Taxation Office issues your TFN, receives your employer's reports, pays your refund and releases your super. Four interactions, one number.",
 category: "Medicare & Other",
 date: "29 July 2026",
 readTime: 4,
 body: `
The Australian Taxation Office is the federal agency that runs Australia's tax system. For a working holiday maker it does four things: it issues your TFN, it receives what your employers and super funds report about you, it processes your tax return and pays the refund, and it releases super after you leave.

## What does the ATO actually do that affects you?

Everything routes through your Tax File Number, which is why that number matters far beyond the first month. The ATO issues it, then uses it as the thread connecting every wage report, every super contribution, every bank interest payment and every return you lodge.

Its wider remit is much larger, covering income tax, GST, the business register and the superannuation guarantee system. Almost none of that touches a backpacker directly. The four interactions above are the whole of it for most people.

## How does the ATO know what you earned?

Automatically, before you tell it anything. Employers report your wages and the tax withheld with every pay run through single touch payroll, super funds report contributions made for you, banks report interest on Australian accounts, and share registries report dividends.

That is why a return can be lodged from another country without a single payslip. It is also why an employer who never finalised their reporting creates a real problem: the income exists, you know about it, and the ATO's record does not show it. Your payslips are what closes that gap.

## When would the ATO contact you?

Most working holiday makers never hear from it directly. The reasons it does make contact are narrow: it needs more information to process a return, its figures do not match what was declared, tax is owed and unpaid, identity verification is holding up a refund, or, rarely, a review has been opened.

Legitimate contact comes by post to the address on file, or through a tax agent acting for you. This is why an out of date address matters more than it appears to: a letter you never saw is still a letter you were treated as having received.

## How do you tell a real contact from a scam?

By what is being asked for and how urgently. The ATO does not phone demanding immediate payment, does not accept payment in gift cards or cryptocurrency, does not threaten arrest or deportation, and does not ask you to stay on the line while you go to a shop.

Working holiday makers are targeted specifically for this, and the reason is obvious once stated: you are new to the country, you are not sure what is normal, and the threat of a visa problem is credible in a way it would not be to a local. The right response to any of it is to hang up. Nothing genuine is ever lost by ending a call and checking independently.

## What is the ATO's role in getting your super back?

It is the gatekeeper rather than the payer, in most cases. When a departing Australia superannuation payment is claimed, the ATO verifies that your visa has ceased and that you have left, then the claim passes to your super fund, which applies the 65% withholding and releases the balance.

The exception is super the ATO already holds. Where a fund lost contact with you, the balance is transferred to the ATO as unclaimed super, and in that case the ATO pays it directly. Anyone who left Australia more than six months ago without updating an address has a decent chance of being in that position. Either route is set out where you [claim your superannuation after leaving Australia](/superannuation).

## Your records decide how smoothly this goes.

Most working holiday makers deal with the ATO through four routine interactions and nothing else. What decides whether those go smoothly is the state of the records it holds about you.

- Whether the address and bank details the ATO holds are current, which decides whether anything reaches you.
- Whether every employer finalised their reporting, which decides whether the ATO's picture of your year is complete.
- Whether you still have access to any online account you set up, which becomes a problem only once you are overseas.
- Whether your super sits with funds or has already been transferred to the ATO as unclaimed.
- Whether you have prior years that were never lodged, which the ATO's records will still show.

Your annual reconciliation with the ATO is your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) before lodging anything.
 `,
 }, {
 slug: "gross-pay-vs-net-pay-australia",
 title:
 "Gross vs Net Pay: Where the Money Goes",
 description:
 "Gross is before tax, net is what lands in your account. About 15% sits between them on a WHV, and super is paid on top rather than out of your wages.",
 category: "Medicare & Other",
 date: "10 May 2025",
 readTime: 4,
 body: `
Gross pay is what you earned before tax. Net pay is what reaches your bank account. On a working holiday visa with a TFN on file, about 15% of gross sits between the two. Superannuation is not part of that gap: it is paid on top of your wages, into a fund, not deducted from them.

## What do the numbers on your payslip actually mean?

An Australian payslip separates four figures, and confusing any two of them is how people conclude they have been underpaid when they have not. Gross pay is hours multiplied by rate, plus penalties, loading and allowances. Tax withheld is what your employer sends to the ATO on your behalf, and net pay is simply gross minus that withholding.

- **Gross pay**: total earnings before anything is taken out
- **Tax withheld**: PAYG sent to the ATO in your name
- **Net pay**: gross minus tax withheld, the amount transferred to you
- **Super**: a separate line, paid by the employer into your fund

On $1,000 of gross wages at a registered working holiday maker employer, $150 is withheld at 15%, $850 lands in your account, and $120 of super at 12% goes to your fund. The super never appears in the $850 and never should.

## Why is superannuation not a deduction?

Superannuation is an employer cost sitting on top of your wage, not a slice of it. It is calculated on your gross ordinary earnings at 12% and paid into a fund in your name, and your gross pay is exactly the same whether the employer remembers to pay it or not. This is the single most common misreading of an Australian payslip we see from arrivals.

If a payslip shows super being subtracted from gross to arrive at a lower gross, that is not a presentation quirk. It means either a payroll error or an employer treating a wage as though it already included super, which changes what you are owed. Our guide on [unpaid super](/blog/super-employer-not-paying-what-to-do) covers what to do about it.

## Which figure does your tax return use?

Your tax return and your income statement both use gross pay, never net. The ATO calculates your liability on gross earnings for the year and then credits the tax already withheld, and the difference in either direction is your refund or your bill. Net pay does not appear anywhere in the calculation.

This catches people who have been tracking their year in their banking app. The figure that reaches your account is roughly 85% of the number the ATO will use, so the year always looks smaller from the bank side than it does on the return.

## What decides how much of your gross you actually keep?

Three facts about your year decide the gap between gross and net, and none of them is fixed. Your withholding rate is the biggest: 15% with a TFN on file at a registered working holiday maker employer, 45% without one, and foreign resident rates if the employer never registered as a WHM employer. Each of those produces a very different net figure on the same gross.

- **Whether your TFN was on file from day one.** Weeks at 45% before the declaration form was processed show up as a much thinner net pay, and the excess comes back at tax time rather than in the pay run.
- **Whether the employer is ATO registered to employ working holiday makers.** An unregistered employer withholds at foreign resident rates, which are higher than 15% from the first dollar.
- **Whether penalties, loading and allowances were paid at all.** A casual rate that quietly omits the 25% loading lowers gross before withholding ever enters the picture, and that loss does not come back in a refund.

## How can you check the gross figure is right?

Rebuilding gross from first principles takes about five minutes and it is worth doing once for each employer, early, while you can still remember the shifts. Multiply ordinary hours by your award rate, add penalty rates for weekends, evenings and public holidays, add overtime at the correct multiplier, then add any allowances for uniform, tools or travel.

1. Ordinary hours multiplied by your hourly rate
2. Plus penalty rates for weekend, evening and public holiday shifts
3. Plus allowances such as uniform, tool or travel
4. Plus overtime at the correct rate
5. Compare the total against the gross line on the payslip

Where the numbers do not reconcile, the cause is usually a classification one level too low under the award rather than deliberate theft. That is worth raising in writing with payroll, because it is also the version employers fix quickly.

## Where does this stop being a payslip question?

It stops being a payslip question the moment the gap between gross and net is caused by your tax position rather than by arithmetic. Over-withholding at 45%, an unregistered employer, a Medicare levy charged to someone not entitled to Medicare, and a residency item answered wrongly all shrink net pay during the year and are all recovered, or not, on the return.

That is the part the payslip cannot tell you. It shows the amount taken; it says nothing about whether it should have been taken. Working out which of those applied to your year is what a [tax return](/tax-return) is for, and it is the reason two backpackers with identical gross pay can end up thousands apart.
`,
 }, {
 slug: "do-working-holiday-makers-pay-tax-on-tips",
 title: "Are Tips Taxable in Australia? Yes",
 description:
 "Cash and card tips both count as assessable income. How tips flow through payslips, what the ATO expects you to declare, and record-keeping that suffices.",
 category: "Medicare & Other",
 date: "13 May 2025",
 readTime: 4,
 body: `
Yes. Tips are assessable income in Australia whatever form they arrive in, and they are taxed at the working holiday maker rate of 15% on the first $45,000 alongside your wages. What changes from person to person is not whether the tax applies but who reports the money, and that depends entirely on how the tip reached you.

## Which tips are already reported for you?

Anything that passes through the venue's till reaches the ATO without you doing anything. Card tips, service charges added to a bill and pooled tips distributed through a tronc arrangement are all run through payroll, so PAYG is withheld at the time and the amounts appear in your end of year income statement with the rest of your wages.

That means the reporting is already done and the tax is already paid on that portion. The only thing worth doing is checking a payslip to see whether tips show as a separate line or are absorbed into gross wages, because a venue that says it distributes tips and shows nothing on any payslip is worth a question.

## Which tips are yours to declare?

Cash handed to you directly. Nobody records it, no PAYG is withheld against it, and it does not appear in your income statement, so the obligation to declare it sits with you and only with you at the end of the financial year.

The amount involved decides how much this matters. A quiet suburban cafe generates almost nothing in cash tips and the whole question is academic. A busy city bar on Friday and Saturday nights can generate a meaningful sum across a season, and that is the case where the difference between declaring and not declaring becomes real money on the [tax return](/tax-return).

- Cash tips from customers: your responsibility, no tax withheld at the time
- Tips split at the end of a shift in cash: same treatment, still declarable
- Card and tronc tips: reported through payroll, nothing further to do

## What records do you actually need?

A running total is enough. The ATO does not expect a working holiday maker to log every individual tip, so a weekly figure noted somewhere durable, with the date and the venue, satisfies the record keeping requirement and takes seconds a week.

What makes this worth doing is that the alternative is guessing in October about a season that ended in March. In my experience the people who declare nothing are almost never being dishonest on purpose; they simply have no idea what the figure was and the safest looking answer becomes zero. A note on a phone removes the problem entirely.

## What happens if you do not declare cash tips?

The risk is not an audit letter arriving the week after you lodge. It is that hospitality is a data matched industry, and undeclared income surfaces later through venue level reporting and bank deposit patterns rather than immediately.

The consequence when it does surface is the tax that should have been paid plus a shortfall penalty and interest, applied to the year in question. Against that, the tax on a declared season of tips at 15% is smaller than most people assume before they work it out. There is also a practical point for anyone planning a second or third year: an unresolved ATO position is a loose end you carry into every future dealing with Australian government systems.

## Does super get paid on tips?

Sometimes, and it turns on the same distinction as the tax reporting. Tips distributed through the employer's payroll can form part of ordinary time earnings, in which case 12% [super](/superannuation) is payable on them like any other component of your pay. Cash handed over by a customer is not paid by the employer at all, so no super obligation attaches to it.

Where it lands in a particular job depends on the award and on how the venue has classified the payments, which is not something you can read off a payslip with certainty. The useful check is whether your super contributions look consistent with your total earnings including tronc distributions, because a gap there is the same conversation as any other case of [super not being paid](/blog/super-employer-not-paying-what-to-do).
`,
 }, {
 slug: "tax-obligations-after-leaving-australia",
 title:
 "Tax After Leaving Australia: What Is Left",
 description:
 "Leaving Australia does not close your tax file. The final return, the super claim and any ABN cancellation outlive the flight, and can be done remotely.",
 category: "Medicare & Other",
 date: "15 May 2025",
 readTime: 5,
 body: `
A boarding pass is not a tax event. Everything you built up while working in Australia sits with the ATO after you fly out, and it waits: a return for every financial year you earned income in, a super balance nobody claims on your behalf, an ABN that stays registered until you cancel it. None of it requires you to be in the country, and none of it expires because you left.

## What is still outstanding once you have gone?

Four things remain, and they are independent of each other, so doing one does not clear the others. The final return has to be lodged, the [superannuation](/superannuation) has to be claimed, any [ABN](/abn) has to be cancelled, and the ATO needs contact details that still reach you.

- Lodge a return for every Australian financial year in which you earned income
- Claim your super through the Departing Australia Superannuation Payment
- Cancel any ABN you registered as a sole trader
- Keep an email address and a bank account that still work

The ATO holds your income records from every employer regardless of where you are, so a year that goes unlodged does not go unnoticed. It sits open.

## How does lodging from overseas actually work?

Lodging from overseas is the same return, prepared the same way, from a different postcode. Income statements are retrieved from ATO systems rather than from your former employers, which matters because chasing a Queensland packing shed for paperwork from Berlin is not a realistic plan.

The standard deadline is 31 October following the end of the financial year. Returns lodged through a registered agent generally carry an extended deadline into the following May, which is one of the few practical advantages of agent lodgement that has nothing to do with the return itself. Our guide to [lodging from overseas](/blog/how-to-lodge-tax-return-from-overseas) covers the mechanics.

## When can you claim your super?

The DASP claim opens once two conditions are both met: your visa has ceased to be in effect, and you have left Australia. Not one or the other. Someone who leaves while the visa is still live has to wait for the visa to expire or be cancelled before the claim can proceed.

The payment is withheld at 65% for working holiday maker contributions, so a $10,000 balance pays out about $3,500. Approval commonly takes around 28 days once the application is complete, and the net amount can be paid to an Australian or an overseas account depending on the fund. Our [superannuation guide](/superannuation) covers the process and the documents.

## What happens if you leave the super sitting there?

If a fund has not heard from you for six months after you have left and your visa has expired, it transfers the balance to the ATO as unclaimed super. The money does not disappear and it does not stop being yours, but the claim becomes an ATO claim rather than a fund claim, with different paperwork.

The version that genuinely costs people money is having several funds and claiming from only the one they remember. Four employers across a year very often means more than one fund, and each holds a separate balance requiring a separate claim. Our guide to [finding lost super](/blog/how-to-find-lost-superannuation) covers tracing them.

## Can you lodge before 30 June if you are leaving for good?

Yes, and it is the option almost nobody knows about. Someone leaving Australia permanently part way through a financial year can lodge an early return for that part year rather than waiting until July, which brings the refund forward by months.

It is not automatically the better choice. An early return is prepared before employer reporting is finalised, so the figures have to be built from payslips rather than retrieved, and if you return to Australia later in the same year the return has to be amended. It suits a clean departure with complete records and does not suit an uncertain one.

## What decides whether this is simple or messy?

Three facts about how you left. Whether your Australian bank account is still open, because both the refund and the DASP payment pay into an account and reopening one from overseas is genuinely difficult. Whether you know every employer for the year, since a forgotten job is the usual cause of an amendment months later. And whether the visa has actually expired, which gates the super claim.

The account is the one that causes real damage. We routinely see people who closed everything the week before flying, which turns a straightforward refund into a months long exercise in re-establishing payment details from another continent. Keep it open for three to four months after departure, until the refund and the super have both landed.

## Does it matter if you simply do not lodge?

It matters more later than it does now, which is why so many people find out at an inconvenient moment. An unlodged year stays on file indefinitely, and where a refund was owed it simply goes unpaid, which is the most common outcome and the quietest one.

Where tax was owed rather than refunded, interest accrues and the debt follows the tax file rather than the person, and it surfaces when there is a reason to look, including a future Australian visa application. Our guide to [late returns and penalties](/blog/late-tax-return-penalty-working-holiday) covers where the penalties actually bite, which is rarely where people fear. [Get in touch](/contact) if you have left with a year outstanding.
`,
 }, {
 slug: "tax-residency-working-holiday-makers",
 title:
 "Are You a Tax Resident of Australia?",
 description:
 "Residency can change the rates applied to your whole year. It is a judgement rather than a checkbox, and it is easy to get wrong in both directions.",
 category: "Tax Return",
 date: "24 May 2025",
 readTime: 6,
 body: `
Tax residency is the question with the widest reach on a working holiday tax return. It can change the rates applied to your entire year, which is why it deserves more care than any other item on the return, and why it is the item most often answered wrongly by people who were sure of their answer.

Most working holiday makers are taxed at the working holiday maker rates: 15% on the first $45,000. A minority are assessed differently, and for some of them the difference is worth thousands. Which side of that line you fall on is a judgement, not a lookup, and every return prepared here is reviewed and signed off by a registered tax agent before a position is taken.

## What are the working holiday maker rates?

They apply to wage income earned on a 417 or 462 visa. The scale is 15% on the first $45,000, 30% from $45,001 to $135,000, 37% from $135,001 to $190,000, and 45% above that. The rates were set by the 2017 working holiday maker reform package, and for a straightforward year of wages they are the whole story.

What residency changes is everything around them. For a small number of people it changes the rate too.

## Why is residency so hard to pin down?

Because it is a judgement that has been fought over at the highest level. The question of how working holiday makers should be taxed went all the way to the High Court of Australia in Addy v Commissioner of Taxation, and the fact that experienced judges disagreed with each other on the way up tells you what kind of question this is. It is not one you resolve with a search and a checklist.

Residency turns on details of your year that most people never think to check, weighed together rather than ticked off one by one. No single fact settles it, and the facts that end up mattering are frequently not the ones people guess.

## What do people get wrong about it?

Two assumptions do most of the damage, and both are unreliable.

The first is that the visa decides it. It does not. Holding a 417 or 462 tells you almost nothing about how your year will be assessed.

The second is that a day count decides it. People arrive convinced that some number of days in the country settles the matter, and it does not. There is no count you can do on a calendar that answers the question.

Both myths survive because they are simple. The real assessment is not, and answering the item on either assumption is how returns end up wrong in both directions: people who claim a position they cannot hold, and people who quietly overpay by never realising a better position existed.

## How close can two years be and still land differently?

Very close. Two travellers can arrive in the same month, earn similar money, leave in the same week, and be correctly assessed on opposite sides of the line, because the assessment weighs parts of their years that look identical from the outside and are not. That is the honest reason self assessed residency answers go wrong so often: the difference is invisible until someone who knows what to look for goes through the year.

## Does the tax free threshold apply or not?

For almost everyone the answer on the withholding declaration is that it does not apply, because answering otherwise creates a debt during the year regardless of how the residency question eventually resolves. The residency position is settled at assessment, not in payroll, and never by the form you fill in on your first day.

## What else does residency change?

More than most people expect, even where the wage rate does not move. Some deductions are only available to residents. Capital gains and investment income are treated differently. Whether foreign income has to be declared at all turns on it. And on the years where the finding goes the other way, it can be the single largest number on the return.

## Which side of the residency line are you on?

That is not a question this page can answer, and it is not a question you can safely answer about yourself, in either direction. What can be said is what the stakes are: the rates applied to your whole year, the deductions available to you, and the treatment of everything you earned outside your wages.

The way a defensible position is reached is by going through your year in full, weighing the details that actually carry weight, and taking a position that stands up if the ATO asks about it. That is how the residency item is handled in every [working holiday tax return](/tax-return) prepared here, reviewed and signed off by a registered tax agent. You can [estimate your tax refund](/calculator) on the ordinary working holiday rates as a baseline while the position is worked out.
 `,
 },

 // ─── NEW: TFN ──────────────────────────────────────────────────────────────
 {
 slug: "how-to-update-address-with-ato",
 title:
 "Change Your ATO Address: 3 Ways That Work",
 description:
 "Your ATO address can be changed online, by phone or through a tax agent. What turns on it is your TFN letter, your refund and your super statements.",
 category: "TFN",
 date: "20 July 2026",
 readTime: 5,
 body: `
Your address can be updated with the ATO online through its own services, by phone on 13 28 61, or by a tax agent acting for you. All three take effect on your record quickly. What matters is doing it before the next thing is posted, because mail already in transit follows the old address.

## Why does the ATO hold an address at all if refunds go to a bank account?

Because several things that decide whether you get paid still travel by post or are gated on an address the ATO can verify. Your TFN letter is posted and only posted. Identity verification correspondence is posted. Notices of assessment, amendment letters and any request for information are sent to the address on file, and a letter you never see is still a letter you were deemed to have received.

Refunds themselves are paid electronically to an Australian bank account in almost every case, so a stale address does not usually stop the money. It stops everything that has to happen before the money.

## What actually goes wrong when the address is old?

The single most expensive failure is the TFN letter, because a returned letter restarts a 28 day wait while you may be working at 45% instead of 15%. That is the case where an out of date address has a weekly dollar cost attached to it.

The second is superannuation. Your fund and the ATO both hold an address for you, and a fund that cannot reach you is a fund that eventually reports the account as unclaimed and transfers it to the ATO. That money is still yours and still claimable, but it is now one more step away from you at the exact moment you are leaving the country.

The third is the quiet one. An ATO letter asking a question about your return, unanswered because it went to a hostel in Byron you left in March, becomes an assessment made without your input.

## Which address should you give if you are moving every few weeks?

Somewhere that will still hold your mail in four weeks, which is rarely where you are sleeping tonight. This is a real problem for anyone doing seasonal work, because harvest and hospitality move people faster than the post moves letters.

- A friend's or relative's permanent Australian address is the best answer, even if you never go there.
- A long stay hostel works if it genuinely holds mail for departed guests, which many do not.
- A post office box is accepted and is the most reliable option for anyone spending a season moving between farms.
- A hostel you are leaving on Friday is the worst answer, and it is the one most people give.

The ATO records a postal address and a residential address separately. If you are using a mail holding address, set the postal one to it and leave the residential one as where you actually live, because the TFN letter follows the postal address.

## Does your address matter once you have left Australia?

Yes, and this is the point at which most people stop thinking about it. An overseas address can be recorded with the ATO, and it should be, because post departure correspondence is exactly the correspondence you cannot afford to miss: anything about a refund under review, anything about a departing Australia superannuation payment, anything asking you to confirm your identity.

Your bank details matter as much. A refund directed to an Australian account you closed on the way to the airport does not vanish, but it bounces back and becomes a credit sitting on your ATO account until someone tells the ATO where to send it.

## Is this housekeeping or urgent for you?

Updating an address is the same task for everyone, but the urgency is not. These are the circumstances that turn it from housekeeping into something with a weekly dollar cost attached.

- Whether you are still waiting on a TFN letter. If you are, this is urgent and it is the only thing on this page with a weekly cost attached.
- Whether you have superannuation with a fund that has an old address. Unreachable accounts end up transferred to the ATO as unclaimed super.
- Whether you are about to leave Australia. The address and the bank account both need to be right before you fly, not after.
- Whether you have more than one super fund from more than one employer. Each fund holds its own address, and updating the ATO does not update them.
- Whether an old myGov account is still reachable. If the email or phone attached to it is gone, recovering that account is a separate job and it is easier to do before you need it.

If you are leaving with super still in Australia, the address is one of the details that decides how smoothly you [claim your superannuation after leaving Australia](/superannuation), and you can [estimate your tax refund](/calculator) before you lodge anything.
 `,
 },

 // ─── NEW: Tax Return ───────────────────────────────────────────────────────
 {
 slug: "what-is-a-tax-refund-australia",
 title:
 "Tax Refund or Super Refund? You Claim Both",
 description:
 "A refund is the gap between what your employers withheld and what you owed. Most working holiday years are over withheld, because it assumes a full year.",
 category: "Tax Return",
 date: "5 June 2025",
 readTime: 5,
 body: `
Nobody works out your tax during the year. Your employer withholds an amount each payday against a guess about the twelve months ahead, and the real figure is settled once, when the return is lodged. The refund is what falls out of that comparison, and on a working holiday year it usually falls in your favour.

## Why is a working holiday year so often over withheld?

Withholding is a running estimate, not a calculation. Payroll deducts each week as though this week repeats for twelve months, so any year that starts late, ends early or changes shape produces a total that does not match the real liability. A working holiday year does all three.

- Arriving or leaving part way through the financial year, which runs 1 July to 30 June
- Weeks worked before the TFN reached the employer, withheld at 45% rather than 15%
- An employer not registered with the ATO to employ working holiday makers, withholding at foreign resident rates
- Deductions that reduce taxable income and were never accounted for during the year
- A 2% Medicare levy charged to someone not entitled to Medicare

## How do you know whether you are owed anything?

You do not know until the year is reconstructed, and no rule of thumb substitutes for it. The calculation compares the tax that should have applied to your actual income against the total already withheld across every employer, and then adds the items withholding never sees.

There is no average refund worth quoting, and anyone quoting one is describing a different person's year. Two backpackers who earned identical wages can finish thousands apart on the strength of a residency position, a Medicare entitlement and a 45% period, and none of those is visible from the payslips alone.

## What decides the size of your refund?

Five facts about your own year decide almost all of it, and you already know four of them without looking anything up. The fifth, your residency position, is the one that has to be worked out rather than recalled.

- **Whether there was a period without a TFN on file.** Every week at 45% instead of 15% is 30 cents in the dollar sitting with the ATO waiting to be claimed.
- **Whether every employer was registered as a working holiday maker employer.** An unregistered one withholds at foreign resident rates, and the excess is recoverable.
- **When you arrived and when you left.** A part year is the single most reliable source of over-withholding there is.
- **Your Medicare position.** Entitlement to Medicare is what makes the 2% levy apply, so a passport from a country without a reciprocal agreement usually means the levy should not have been charged at all.
- **What you can substantiate in deductions.** Boots, tools, sun protection, the work share of a phone, and last year's agent fee.

## Where does it stop being arithmetic?

It stops being arithmetic at the residency item, which is where the largest differences on this site are decided and where no calculator helps. Residency is a judgement about a year as a whole, it turns on details most people never think to check, and it is easy to get wrong in both directions.

For some people a residency finding changes the rates applied to everything they earned, which is why the item is treated with so much care and why a position is only taken after the year has been gone through properly. Our guide to [tax residency on a working holiday visa](/blog/tax-residency-working-holiday-makers) covers why it cannot be self assessed with confidence.

## When does the refund arrive?

Refunds on electronically lodged returns are generally paid 7 to 14 business days after lodgement, into a nominated Australian bank account. It runs a few days longer through the July to September peak, and considerably longer if the return was lodged before employer income statements were finalised.

The account is the part worth planning. The refund pays to an Australian account and nowhere else, so anyone leaving the country needs that account alive for at least four to six weeks after lodgement. Our guide to [how long a refund takes](/blog/how-long-does-tax-refund-take-australia) covers what holds one up.

## Can you still claim after you have gone home?

Yes, and a surprising number of people never do. A return can be lodged from overseas for the year you left, and unlodged earlier years can still be lodged after the fact. Nothing about being in another country closes the file.

The years that go unclaimed are almost always the short ones, where someone worked three months, assumed the amount was too small to bother with, and left. Those are precisely the years with the highest proportion of over-withholding in them, because a three month year taxed as though it were a twelve month one is over-taxed by construction.

## What actually changes the outcome?

Two things, and neither of them is effort. The first is whether every employer for the year is accounted for, because a forgotten job is both the most common cause of a later ATO amendment and a common cause of a refund being understated. The second is whether the items that withholding cannot see were claimed at all: the Medicare position, the residency position and the deductions.

That is the honest answer to how you maximise a refund. Not aggressive claims, which come back at you, but a complete picture of a year that was worked across several employers, several states and often two financial years. Running the numbers through the [calculator](/calculator) gives you an indication, and preparing the [tax return](/tax-return) properly is what settles it.
`,
 }, {
 slug: "how-long-does-tax-refund-take-australia",
 title:
 "How Long Does an ATO Tax Refund Take?",
 description:
 "Most electronically lodged refunds are paid 7 to 14 business days after lodgement. It runs longer in the July to September peak, longer again on paper.",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 4,
 body: `
The clock does not start when you press send. It starts when the ATO can match your return against the income data it already holds, which is why the date a refund lands is mostly decided before lodgement rather than after. A clean electronic return takes 7 to 14 business days from there. Paper runs to eight weeks or more.

## What does a normal refund timeline look like?

A clean electronically lodged return moves through in stages, and the whole sequence is usually complete inside a fortnight. The ATO receives and begins processing within a few days, most refunds are released between day 7 and day 14, and the slower ones land between day 14 and day 21.

Outside the peak, from October to June, it is often quicker than that. From July to September the same return takes a few days longer for no reason other than volume, because that is when most of the country lodges.

## What actually decides your refund speed?

Six things move a refund date, and only two of them are within anyone's control after lodgement. The largest by far is whether the return was lodged before the employer income statements were finalised, because a return built on data the ATO has not yet confirmed goes into a queue rather than through the system.

- **Lodgement method.** Electronic lodgement is measured in days, paper in months.
- **Income statement status.** Employers finalise their reporting after the year ends, and lodging before that is done invites a mismatch.
- **First time lodgers.** An initial identity check adds time once and never again.
- **Data mismatches.** A figure that disagrees with what the ATO already holds moves the return into manual review.
- **Bank details.** A wrong BSB or account number is the single most expensive small error available, because the payment bounces and then has to be re-issued.
- **Time of year.** July to September is slower for everyone.

## Why does an incorrect bank account cause so much trouble?

A refund pays to a nominated Australian bank account and nowhere else, and the ATO does not make international transfers comfortably. When the account is closed or the digits are wrong the payment bounces back and sits as a credit on your ATO record until correct details are supplied.

This is the number one cause of the question we are asked most often, which is where a refund has gone. Almost always it has not gone anywhere: it was issued, rejected, and is waiting. For anyone leaving Australia, keeping the Australian account open for at least four to six weeks after lodgement avoids the entire problem.

## What does it mean when a return is under review?

Under review means a person is looking at the return rather than a system, and it is routine rather than a sign of trouble. The usual triggers are a residency answer that does not match the rest of the return, income the ATO can see that the return does not include, or bank details changed close to lodgement.

Larger refunds relative to the income reported are somewhat more likely to be selected, which is an integrity check and not an accusation. It adds time; it rarely changes the outcome where the return was right in the first place.

## Why has your refund not arrived after two weeks?

Two weeks is a typical timeline, not a guarantee, and the overwhelming majority of returns that pass it are held up by one of three things: an income statement that was not final when the return went in, a bank detail mismatch, or a manual review queue. Each of those normally resolves within another one to two weeks.

Past 28 days, something specific is holding it and it is worth having someone look. Where we lodge a return we can see the processing status directly through a registered agent's channel, identify where it is stuck, and deal with the ATO on the client's behalf rather than leaving them to it.

## Does leaving Australia change the timing?

Lodging from overseas does not slow the return itself. The same 7 to 14 business days apply, and returns for earlier years can still be lodged after you have gone home. What changes is the destination, because the refund still pays into an Australian account.

That is the practical constraint on departure planning, and it is worth reading alongside our guide to [tax after leaving Australia](/blog/tax-obligations-after-leaving-australia). The refund and the DASP super payment both arrive after you have left, so the account they pay into needs to outlive the flight.

## What decides whether your refund is quick or slow?

Four facts about your own year, and all four are settled before lodgement rather than after. Whether every employer had finalised their income statement, which is generally from mid July onward. Whether the return matches what the ATO already holds. Whether the account details are current. And whether the return contains an item that invites a closer look, which usually means residency, a large deduction claim, or a Medicare levy exemption.

None of those is a reason to rush a return in early July. A return lodged in the first week of July against unfinalised data is not faster; it is first into the review queue. The [tax return](/tax-return) that arrives quickly is the one that was complete when it was sent.
`,
 },

 // ─── NEW: Super ────────────────────────────────────────────────────────────
 {
 slug: "super-for-casual-and-part-time-workers",
 title:
 "Do Casual Workers Get Super? Yes, 12%",
 description:
 "Casual and part time workers are paid 12% super from the first dollar earned, with no monthly minimum. Whether it actually arrives is a separate question.",
 category: "Super",
 date: "9 June 2025",
 readTime: 5,
 body: `
Yes. Superannuation is owed on all ordinary time earnings from the first dollar, for casual, part time and full time employees alike. The rate is 12%, paid by the employer on top of your wages rather than out of them. Being casual, being temporary and being on a working holiday visa change none of it.

## Why do people still think there is a minimum before super starts?

Because there was one until 1 July 2022. An employer owed nothing on a month in which you earned under $450 with them, and casual backpackers with shifts scattered across several venues lost real money to that threshold entirely lawfully.

It is gone. Since then every dollar of ordinary time earnings attracts the guarantee regardless of the monthly total, which matters most to exactly this audience: two shifts at one pub, a week of harvest work, a single trial period at a cafe all now generate a super obligation. The one remaining exception is workers under 18, who still need to work more than 30 hours in a week before the guarantee applies.

## Does casual status change anything?

No. The 25% casual loading and the 12% super guarantee are separate things that both apply, and an employer cannot treat the loading as covering the super. One shift a week generates super on that shift's earnings; five shifts generate super on all of them.

The confusion usually comes from the loading being described as compensation for what casuals do not get, which is paid leave and notice. Super is not on that list. It is paid to casuals on the same terms as to anyone else.

## What is super actually calculated on?

Ordinary time earnings, which is not the same as everything on your payslip. It covers your ordinary hours including casual loading, and it generally covers penalty rates and allowances tied to ordinary hours, but it excludes overtime paid at overtime rates.

This is where a payslip check gets interesting for someone working weekends. A hospitality casual whose Sunday penalty hours are ordinary rostered hours should be accruing super on the loaded amount, not on a notional base rate, and an employer calculating super on the base is underpaying it.

## How do you tell whether it is actually being paid?

By checking the fund, not the payslip. A payslip line showing super is a statement of what the employer intends to pay, not evidence that it arrived, and the two diverge more often than most people realise.

Super is only required to be paid quarterly, by 28 October, 28 January, 28 April and 28 July, so a gap of a few weeks between the payslip and the money appearing is normal rather than a problem. A gap that survives the quarterly deadline is not. Comparing the fund's contribution history against your payslips for a full quarter is the check that actually settles it.

## What happens to it when you leave?

It stays yours and it is claimable as a Departing Australia Superannuation Payment once your visa has ceased and you have left the country. The taxable component of a working holiday maker's DASP is taxed at 65%, which is high and is the figure people find hardest to accept, but the alternative is receiving none of it.

Small balances from short casual stints are still worth claiming, and multiple balances from multiple employers can be dealt with together. Applications are commonly approved within about 28 days. Our [superannuation guide](/superannuation) covers the claim and its timing.

## What is the specific risk for casual work across many employers?

Lost accounts. A casual working holiday maker who did not nominate a fund will have had one chosen for them at each employer, and after four jobs that is potentially four accounts, each quietly charging fees against a small balance.

Worse, contributions made before your TFN reached the fund often cannot be matched to you at all, and end up held by the ATO rather than by any fund. That money is recoverable but invisible, and it is the single most common reason a departing backpacker's super is smaller than the payslips say it should be. Our guide to [finding lost superannuation](/blog/how-to-find-lost-superannuation) covers how it is traced.

## Did it reach a fund in your name?

Entitlement to super is not the variable. What you end up with is, and these are the facts that decide it. Each one changes either how much was owed or how much of it actually reached a fund with your name on it.

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
 "Working past the 6-month employer limit risks your visa - not the employer. Your options, the exemptions that may apply, and how to say no safely.",
 category: "Work Rights",
 date: "15 June 2025",
 readTime: 4,
 body: `
Condition 8547 limits you to six months with one employer on a working holiday visa, but a long list of sectors is exempt. Whether your boss can legally keep you past six months depends on what the work is, not on how badly they want you. Most people asking are already exempt.

## What does condition 8547 actually restrict?

Employment with a single employer beyond six months, counted in calendar months from your start date rather than in hours or shifts worked. It applies identically whether you are full time, part time or casual, so working two days a week for eight months is a breach in exactly the way five days a week for eight months is.

It restricts one relationship, not your total work. You can work for as many employers as you like across the visa, and the six months resets only on the grant of a new working holiday visa rather than at the start of a calendar year or at any other point. The separate Fair Work rule that full time employees should not regularly work beyond 38 hours a week plus reasonable additional hours is a different thing entirely, and it is about your weekly hours rather than your months.

## Which work is exempt from the limit?

A broad list, and it covers most of what working holiday makers actually do. If your work falls inside it, the exemption applies automatically and there is nothing to apply for, which is why the majority of people asking this question have no problem at all.

- Plant and animal cultivation, which covers agriculture and horticulture
- Fishing and pearling
- Tree farming and felling
- Mining
- Construction
- Tourism and hospitality
- Health, aged care and disability care
- Childcare
- Food processing
- Natural disaster recovery work
- Different locations of the same employer, where no single location exceeds six months

The list is set by Home Affairs and has been adjusted more than once, so it is worth confirming the current version against their published conditions rather than relying on what someone told you in a hostel two years ago.

## What if your work is not exempt?

Then you have three options and only one of them is comfortable. You can change employers at the six month mark, which is the cleanest and the one that requires nothing from anybody. You can ask Home Affairs in writing for permission to continue, which has to be done before the six months elapses and is granted at their discretion rather than as of right. Or you can move to a genuinely different employer.

The important part is what happens while a permission request is pending. Permission is not retrospective, so you must stop at the six month mark and wait rather than continuing on the assumption that approval will come. Working past the limit without an exemption or an approval is the breach, whatever the paperwork behind it eventually says.

## What are the consequences of getting it wrong?

Visa cancellation is the formal risk, and it is real, though for an unintentional overrun it is not the usual outcome. The more common consequence is quieter and longer lasting: a breach sits on your immigration record and gets weighed when you apply for anything else Australian, including a second or third year visa.

The employer is exposed too, which is worth knowing because it changes the conversation. A business that keeps a non exempt worker past six months faces its own civil penalties, so an employer pressing you to continue is asking you to carry a risk they also hold. That is a reasonable thing to say out loud, and a legitimate employer will already know it.

## Can an employer make you do it?

No, and the pressure usually comes dressed up as a favour. Visa conditions are legal limits rather than terms you can negotiate with the person paying you, and no employer has the authority to waive one or the standing to promise it will not matter.

Two things protect you if it turns unpleasant. Refusing to breach a visa condition is not misconduct, and an adverse response to it is the kind of thing a General Protections claim exists for. And an employer who implies they can affect your visa is wrong: only Home Affairs decides visa matters, and workplace complaints made in good faith do not trigger any visa review. Get the request in writing where you can, because a text message asking you to stay on is evidence in a way that a conversation in a store room is not.

## How do you extend your stay legitimately?

Through a further visa rather than through a longer job, and the two are commonly confused. A second year visa requires 88 days of specified work in a designated regional area during your first year; a third year requires six months of specified work during the second.

That work has to meet the definition and be in the right postcode, which is a separate test from the six month employer limit and does not interact with it. Extending your relationship with one employer does not extend your stay by a day, and completing 88 days on a farm does not exempt you from condition 8547 in a later non exempt job. They are two different rules and both apply at once.

## Does any of this change your tax?

No, and it is worth saying plainly because it comes up. Staying with one employer for a full year under an exemption produces exactly the same tax position as three jobs of four months each: 15% on the first $45,000, 12% [super](/superannuation) on top of wages, and all of it combined on one [tax return](/tax-return).

If anything, one long job is the simpler tax year, because there is one employer to reconcile rather than several and one declaration form rather than three. The situation that costs money is the opposite one, where several short jobs mean several chances for the wrong withholding rate to be applied without anyone noticing.
`,
 }, {
 slug: "farm-work-rights-working-holiday-australia",
 title:
 "Farm Work Rights: Pay, Piece Rates, 88 Days",
 description:
 "Minimum rates apply on every farm - piece rates need a written agreement guaranteeing average earnings. Your rights while earning the second-year visa.",
 category: "Work Rights",
 date: "16 June 2025",
 readTime: 6,
 body: `
Farm work carries the same protections as any other Australian job: award rates, safe conditions, payslips and 12% superannuation on top of wages. Most of it sits under the Horticulture Award. What is specific to farm work is how piece rates meet the hourly minimum, and how much of your visa rests on paperwork the farm may not keep.

## What protections apply?

All of them. The Fair Work Act covers farm workers on working holiday visas identically to Australian workers: minimum wage, the relevant award, safe working conditions, payslips within one day of payday, superannuation, and protection from unlawful dismissal or retaliation.

Visa status reduces none of it, and the belief that it does is what makes this sector the one with the longest record of underpayment. The Fair Work Ombudsman has run repeated campaigns into horticulture for exactly that reason.

## What does the Horticulture Award set?

Minimum hourly rates by classification, rules for piece rate agreements, penalty rates for overtime, weekends and public holidays, and the top up obligation that makes piece rates lawful in the first place.

The award applies to fruit picking, vegetable harvesting, packing and vine and tree work. Pastoral work such as livestock and broadacre cropping sits under a different award. Our guide to [the Horticulture Award](/blog/horticulture-award-working-holiday-makers) covers the classifications in detail.

## How do piece rates and the hourly minimum interact?

Piece rates are lawful, and they do not displace the hourly floor. A worker paid per bin or per kilogram must still earn at least the applicable casual minimum for every hour worked, and where the piece earnings fall short the employer is required to top the pay up to it.

The top up is an obligation rather than a courtesy, and it is the single most commonly ignored provision in farm work. From 1 July 2026 the casual minimum across all work is $33.05 an hour, being the $26.44 national minimum plus the 25% loading, and horticulture classifications run from there.

The practical test is simple and almost nobody applies it: divide what you were paid for a day by the hours you actually worked, including the time spent waiting for bins and moving between rows. If the result is below the casual minimum, a top up was owed. Our guide to [piece rates in farm work](/blog/piece-rates-farm-work-working-holiday) sets out how the agreements are supposed to be written.

## Can the farm deduct for accommodation and transport?

Only within limits, and only with your agreement in advance and in writing. Deductions must reflect actual costs, must be reasonable, and must never take your pay below the minimum.

Deductions that fail any of those conditions are unlawful, and overcharging for hostel beds and bus runs is one of the recurring patterns in this sector. Keep the written agreement and keep the payslips showing what was taken, because a deduction with no agreement behind it is recoverable.

## What about superannuation?

An employee on a farm is owed 12% superannuation on ordinary time earnings, paid quarterly into a fund, regardless of how few hours were worked. Piece rate earnings are wages, so the guarantee applies to them.

Farm employers skip it more often than employers in any other sector this audience works in. It is recoverable through the Superannuation Guarantee Charge process, and it is claimable as a Departing Australia Superannuation Payment once your visa has ceased and you have left. If you were engaged on an ABN, none of that applies, which is why the classification question matters: our guide to [farm work and ABNs](/blog/farm-work-and-abns) covers it.

## What evidence should you build from day one?

Everything that proves where you worked, when, and for whom, because it does double duty. The same file that satisfies a second year visa application is exactly what recovers underpaid wages, and farms are frequently poor at paperwork.

- Every payslip, which is the primary evidence immigration looks for
- Employment dates confirmed in writing, even a text message about your start date
- The farm's legal name, ABN and address
- Evidence that the location sits in an eligible postcode
- Your own daily log of hours worked and tasks performed
- The written piece rate agreement, if you are on one

The people who lose both a visa application and a wage claim are almost always the ones who arrived with nothing but a recollection of the season.

## Does complaining risk your visa or your 88 days?

No. Protections exist specifically for temporary visa holders pursuing workplace complaints, including provisions allowing you to remain in Australia to pursue one, and visa status is not lawful grounds for retaliation.

The days you actually worked remain the days you worked. What can jeopardise a second year application is not a complaint, it is an absence of evidence, which is the argument for keeping the file rather than for staying quiet.

## The season, not the award, decides your pay.

Your entitlements are fixed by the award. What you are actually owed depends on how the season ran. These are the facts that decide it, and they are also the ones a second year visa application will ask you to evidence.

- Whether you are an employee or engaged under an ABN, which decides whether any of it applies.
- Which award covers the property, since horticulture and pastoral work differ.
- Whether you are on piece rates, and whether the hourly top up was ever calculated.
- Whether deductions for accommodation or transport were agreed in writing and within limits.
- Whether payslips were issued, which decides both wage claims and visa evidence.
- Whether 12% superannuation was paid at all.
- Whether the postcode and work type qualify toward the 88 days.

Whatever was withheld across each farm reconciles at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 },

 // ─── NEW: Medicare & Other ─────────────────────────────────────────────────
 {
 slug: "what-is-superannuation-guarantee-charge",
 title:
 "SGC: When an Employer Skips Your Super",
 description:
 "Miss a quarterly super payment and employers owe the Super Guarantee Charge - with interest and penalties. How to report unpaid super and get it recovered.",
 category: "Medicare & Other",
 date: "20 June 2025",
 readTime: 5,
 body: `
The Superannuation Guarantee Charge is what an employer owes the ATO when they pay your [super](/superannuation) late, short, or not at all. It is deliberately more expensive than paying on time, and it is not tax deductible to the employer. For you, it is the mechanism that gets the money back.

## What triggers the charge?

Missing a quarterly deadline, by any margin. Super is due four times a year and an employer who pays a day late is technically liable for the charge on the whole quarter, not just on the delay, which is why the deadlines matter more than they look.

The four dates are fixed and worth knowing, because they are what tells you whether a gap in your fund is a problem or simply early. Contributions for July to September are due by 28 October, October to December by 28 January, January to March by 28 April, and April to June by 28 July. A quarter with nothing in it a week after the deadline is a genuine gap. Before the deadline, an empty quarter tells you nothing at all.

- Paying nothing at all
- Paying less than 12% of ordinary time earnings
- Paying after the quarterly deadline
- Paying into a fund you did not nominate, in some circumstances

## Why is the charge worse for an employer than just paying?

Because it is built to be. The charge is the shortfall itself, plus a nominal interest component of 10% a year running from the start of the quarter, plus an administration component for each employee for each quarter involved, and none of it is deductible against the employer's own tax.

That last point is what gives the rule its teeth. An ordinary super contribution reduces an employer's taxable income; the charge does not, so a business that skips super and gets caught pays more in real terms than one that paid on time, on top of the interest. It is one of the few enforcement mechanisms in Australian employment law that is genuinely painful for the business rather than merely inconvenient.

## Where does the money end up?

With you, through your fund. The ATO collects the charge from the employer, and the shortfall and the interest are directed into your nominated super fund, or held by the ATO where no current fund details exist, which is common for backpackers who have already left.

The interest belongs to you as well, which is the part people do not expect. The purpose of the rule is to restore your position as if the employer had paid correctly and on time, so the earnings you would have had are replaced rather than kept by the ATO. Where the money is held by the ATO rather than a fund, it still counts towards your [DASP claim](/superannuation) when you leave.

## How would you know your employer is behind?

By comparing two things you already have. Your payslips state a super figure for each pay period; your fund statement states what actually arrived and when. If the payslip line has been showing super all quarter and the fund shows nothing after the deadline has passed, the money was accrued but not paid.

Two branch points change what you are looking at. A payslip with no super line at all usually means the employer is treating you as a contractor, in which case the question is not unpaid super but whether the [classification is right](/blog/employee-vs-contractor-australia). And a fund account you have never logged into may be receiving payments you have simply never seen, which is why checking is worth doing before assuming the worst.

## What happens once unpaid super is reported?

A defined process starts, and it runs on data rather than on your persuasiveness. The ATO holds the wages an employer reports through single touch payroll and the contributions funds report receiving, so the comparison that proves a shortfall is one it can make itself once your report tells it where to look.

What it does not do is keep you informed. Assessments are raised against the employer, debt recovery powers the ATO has and you do not are used to collect, and the recovered amount reaches your fund with the interest attached. The timeline runs in months rather than weeks, and the report survives your departure from Australia, which matters because most backpackers only discover a gap when they go looking for the money on the way out.

- Payslips covering the period, showing the super line
- Fund statements showing what arrived and when
- Employment dates, hours and pay rates
- The employer's legal name and ABN, which is on the payslip
`,
 },

 // ─── TFN - NEW ─────────────────────────────────────────────────────────────
 {
 slug: "tfn-reference-number-before-tfn-arrives",
 title:
 "What Is a TFN Reference Number For?",
 description:
 "The reference number proves your application is in progress, which keeps you on 15% through the 28 day window. It is not a TFN and is not used as one.",
 category: "TFN" as const,
 date: "29 July 2026",
 readTime: 6,
 body: `
The reference number arrives the moment you submit your TFN application, and it is the evidence that the application is in progress. That evidence is what keeps you on the working holiday maker rate of 15% during the 28 day window instead of 45%. It is not your TFN and it cannot be used as one.

## What is the reference number and where does it come from?

It appears on the confirmation screen at the end of the online application and is sent to the email address you gave. It is a tracking number for the application rather than an identifier for you, and it looks nothing like the nine digit TFN that follows.

Think of it as a receipt. It proves the application exists, it lets the ATO find that application instantly if you have to call, and it is what an employer can point to when asked why a new starter has no TFN on file yet.

## What does it actually do for your pay?

It supports the answer you give on the Tax File Number Declaration. That form has a box for recording that you have applied for a TFN but not yet received it, and an employer with that recorded applies the working holiday maker rate through the 28 day window rather than the 45% no TFN rate.

Being precise about the mechanism matters here, because the reference number itself is not magic. It is the declaration that changes the rate. The reference number is the evidence that the declaration is honest, and a payroll office that has never seen one before will usually want to see it.

## What can it not do?

Three things, and each one is a mistake that gets made regularly because the reference number looks official enough to be mistaken for the real number. Using it in the wrong place creates a mismatch that has to be unwound later.

It does not go in the TFN field on any form. A reference number typed into a payroll system as a TFN produces a mismatch that has to be unwound later.

It cannot be used to lodge a tax return. Only the real number can.

It cannot be given to a super fund in place of a TFN. A fund without your TFN taxes contributions at a higher rate and struggles to match the account back to you when you eventually claim it, which is one of the main reasons backpacker super gets lost.

## How long until the real number arrives?

Up to 28 days is the ATO's stated ceiling and about two weeks is typical. It arrives as a letter posted to the Australian address on your application, and only as a letter, which is why that address is worth thinking about properly before you apply.

The reference number stops mattering the day the letter arrives. Until then, keep the confirmation email rather than deleting it, because it is what you will need if the 28 days pass and nothing has come.

## What do you do when the TFN arrives?

Give it to every employer with an updated declaration, not just the current one. Each employer holds its own record and its own declaration, so the packing shed knowing your TFN does nothing for the pub.

From that point the correct rate applies going forward. Anything withheld above 15% before the number was on file is not corrected in payroll and comes back through your return instead, along with anything else over-withheld that year.

## Is the reference number any use to you?

The reference number does the same job for everyone, but whether it matters at all depends on what you are doing during the wait. These are the facts that decide it.

- Whether you are working during the wait at all. If you are not, none of this costs anything.
- Whether the declaration records the in progress application, which is what the reference number supports.
- Whether your employer accepts it. Larger hospitality groups and labour hire firms handle this routinely; small single site operators sometimes apply 45% regardless, which is their right and is recoverable.
- Whether the address on the application will still hold your mail in a month, which is what decides whether 28 days is enough.
- Whether you have held an Australian TFN before, in which case there is no application to reference and the task is retrieving the old number.

Anything withheld above the correct rate comes back through your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know how long the gap ran.
 `,
 }, {
 slug: "tax-free-threshold-working-holiday-visa",
 title:
 "Do You Get the Tax-Free Threshold on a WHV?",
 description:
 "Working holiday makers pay 15% from the first dollar, so ticking the tax-free threshold box creates a debt rather than a saving. The narrow exception.",
 category: "TFN" as const,
 date: "29 July 2026",
 readTime: 5,
 body: `
Working holiday makers do not get the $18,200 tax free threshold. A narrow exception exists, it is uncommon, and whether it applies cannot be judged from the outside.

So for almost everyone the answer on the withholding declaration is no. Ticking yes creates a debt rather than a saving.

## What is the threshold and who is it for?

It is a concession for Australian tax residents that lets the first $18,200 of income in a financial year be received without tax. It exists because Australia's resident rates are progressive, and low income residents are given relief at the bottom of the scale. Working holiday makers are taxed under a different schedule entirely: 15% from the first dollar up to $45,000. There is no zero rate band anywhere in that schedule. That is the whole reason the threshold and the working holiday rates do not sit together, and it is also why the declaration form asks the question in the first place.

## Why does ticking it cause a problem rather than saving money?

Because it changes what your employer withholds, not what you owe.

Answering yes tells payroll to apply resident scales with a zero rate band at the bottom, so noticeably less tax comes out of each pay and your weekly take home rises. It feels like a win for a few months.

None of that changes your actual liability, which is calculated at the end of the year on the working holiday maker rates. The shortfall between what was withheld and what was owed is payable at assessment. What should have been a refund becomes a bill, and the size of it tracks how long the error ran.

On $1,000 a week, correct withholding is about $150. With the threshold wrongly claimed it can be materially less or, at lower weekly earnings, nothing at all. Six months of that is a debt in the high hundreds; a full year can pass a thousand.

## What is the exception, exactly?

Narrower than almost everyone who has heard of it assumes. It traces back to the High Court's decision in Addy v Commissioner of Taxation [2021] HCA 34, and it hangs on a residency judgement that turns on details most people never think to check. Most claims to it fail, and they usually fail on facts the claimant felt confident about.

See [tax residency for working holiday makers](/blog/tax-residency-working-holiday-makers) for why the question resists self assessment, and expect the final call to be made when the return is prepared and reviewed by a registered tax agent, rather than settled by you in July.

Either way it is settled at assessment, not in payroll. Even someone who might ultimately qualify should answer no during the year.

## How do you fix it if the box is already ticked?

Give your employer a new withholding declaration with the answer corrected, and payroll applies the right rate from the next pay run. It is not corrected retrospectively in payroll, so the earlier it is caught the smaller the catch-up.

Then plan for the gap. The under-withheld amount for the period already run does not disappear and it is not waived, it is reconciled when the return is lodged, and knowing roughly how big it is before October is the difference between a manageable adjustment and a shock. If you have more than one employer, check every one of them. This error is usually made once, on the first declaration form somebody filled in on their first day in Australia, and then copied faithfully onto every form after it.

## How do you tell from a payslip?

Divide tax withheld by gross pay. A working holiday maker at the correct rate lands near 0.15. Materially below that, on ordinary wages, points at the threshold having been claimed, and it is the only common error that produces too little withholding rather than too much.

The other directions tell you something different. Around 45% means your TFN is not on file. Around 30% means your employer is not registered as a working holiday maker employer. Both of those produce refunds. Only the threshold produces a debt.

## Are you the narrow exception?

For almost everyone the answer on the declaration is no, and the exception is narrow enough that it should not change how you fill the form in during the year. These are the facts that decide both halves.

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
 "White Card Cost, Course and State Rules",
 description:
 "You cannot set foot on an Australian construction site without one. A few hours, valid for life. Your first card is not deductible, a renewal is.",
 category: "Work Rights" as const,
 date: "29 July 2026",
 readTime: 5,
 body: `
You cannot legally work on an Australian construction site without one. The White Card, formally the general construction induction card, is issued by a registered training organisation after a course of a few hours, costs around $100, and does not expire. Every state recognises every other state's card.

## What is it and what does it actually prove?

It proves you have completed general construction induction training, unit CPCWHS1001, covering site hazards, emergency procedures and your rights and duties as a worker. It is a safety credential and nothing more: it does not qualify you for any trade, and it does not make you employable on its own.

It is a legal requirement under work health and safety law rather than an employer preference, which is why a site supervisor cannot wave you through on the strength of experience. No legitimate builder will let you past the gate without one, and one that does is telling you something about the site.

## Who needs one, and who does not?

Anyone performing construction work: labourers, carpenters, scaffolders, painters, landscapers on construction sites, trades assistants, and anyone regularly on site for work. If a job description involves a site, assume it involves a card.

You do not need one for hospitality, farm work, retail, cleaning or office work. The moment someone offers you a few weeks of labouring, which happens a lot in Perth, Darwin and the Queensland coast where site work absorbs a lot of backpacker labour, you need the card before your first shift rather than after it.

## What does the course involve and can you do it online?

A few hours, in one sitting, ending in an assessment. Most states accept accredited online delivery with a supervised webcam assessment, which is how most backpackers do it, and the card follows within a few days.

Queensland is the exception worth checking, since it has historically been stricter about verified delivery formats. Western Australia has also historically run its own arrangements, so if you are heading west it is worth confirming acceptance with the employer or the training organisation before assuming a card issued in Sydney will be waved through in Karratha.

## Does it expire?

No, in most states it is issued for life and needs no renewal. In practice a long period out of the industry can prompt an employer or a state regulator to ask for a refresher, but the card itself does not carry an expiry date.

Photograph it the day it arrives. Losing the physical card is common, replacement is a nuisance from another state, and a photo on your phone will get you onto most sites while a replacement is issued.

## Can you claim it as a tax deduction?

This is where nearly everyone gets it wrong, and the answer turns on a single fact about your own timeline. Your first White Card is generally not deductible, because it is the cost of becoming eligible to do the work rather than a cost of doing it, and the ATO treats it the way it treats a first driver's licence.

A renewal or a replacement, obtained while you are already working in construction, is deductible as a work related expense. The same first against subsequent logic applies to a forklift ticket, a heavy vehicle licence and most other tickets.

Keep the receipt regardless. Even where the card itself is not claimable, the boots, the hard hat, the tool belt and the hand tools you bought at the same time generally are, and most of them fall under the [instant write off for items under $300](/blog/tools-equipment-under-300-instant-deduction-whv).

## Where you trained decides more than you expect.

The card requirement is identical everywhere, so the variables are where you trained, where you intend to work, and whether the cost is deductible. These are the facts that decide each of those.

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
An RSA is legally required before you can serve alcohol anywhere in Australia. The course takes three to five hours, costs around $90, and can usually be done online. It is issued at state level, so a certificate from one state does not always work in the next one, and the fee is deductible.

## What does the RSA course actually cover?

Responsible Service of Alcohol training covers the legal obligations that sit on the person pouring the drink, not just on the licensee. It teaches how to recognise intoxication, how to refuse service safely and lawfully, and what the liquor licensing rules require of staff.

- Identifying signs of intoxication
- Refusing service legally and without escalation
- The legal obligations of staff and of the venue
- Preventing alcohol related harm
- State liquor licensing rules

Without one you cannot legally serve a drink at a licensed venue, and the penalties fall on both you and the venue, which is why no reputable employer will roster you before the certificate exists.

## Who actually needs one?

Anyone whose role involves serving, selling or supplying alcohol, which is a wider group than bar staff. Waiting tables in a licensed restaurant counts, as does bottle shop work, event work and cellar door work at a winery.

Back of house roles such as kitchen work and cleaning do not legally require one, but a large share of hospitality employers ask for it regardless because it makes you rosterable anywhere in the venue. For a backpacker looking for hospitality work, that is usually the real argument for getting it early.

## Does your certificate work in every state?

No, and this is the detail that costs people money. RSA is issued and regulated at state level, so a Victorian certificate does not automatically let you pour drinks in Sydney, and mutual recognition exists between some states and not others.

New South Wales, Victoria and Queensland each require their own state approved course and competency card. South Australia, Western Australia, Tasmania, the Northern Territory and the ACT accept nationally accredited units with recognition between most of them. If your route runs from Melbourne to Sydney, budget for a second course rather than assuming.

## How long does it last?

Validity depends on the state, and the range is wide enough to matter for a two year working holiday. In three states the certificate has no expiry at all, and in the rest it runs for three to five years.

- New South Wales: five years
- Victoria, Queensland, Tasmania, ACT and Northern Territory: three years
- Western Australia and South Australia: no expiry

Renewal is generally a short refresher rather than the full course again. For most working holiday makers the certificate outlasts the visa, so it is a one off decision rather than a recurring cost.

## Can you claim the cost back?

Yes, provided the course relates to work you are already doing or about to do in hospitality. The fee is a work related self education expense and it belongs in your [tax return](/tax-return) alongside the rest of your deductions, with the receipt kept.

The nuance is timing. A course taken to get into an occupation you are not yet working in is harder to justify than one taken while working in it, which for most backpackers means getting the RSA after landing the first hospitality job is cleaner than getting it before. Our guide to [tax deductions for working holiday makers](/blog/tax-deductions-working-holiday-makers) sets out the general test.

## Should you pay for it yourself?

Ask before you do. A meaningful number of venues cover the course cost when they hire, particularly larger pub groups and hotel chains, and paying for it two days before an interview at a venue that would have paid is a small and avoidable loss.

Where the employer pays, it is not your deduction, because you did not incur the cost. Where you pay and are later reimbursed, it is not your deduction either. Only an expense you actually bore is claimable, and that principle catches more people out on RSA and White Card fees than on anything else.

## What decides how this plays out for you?

Three facts about your plans, all of which you know before you book a course. Which state you will work in first, because that decides the syllabus and the card. Whether you are moving between the eastern states, which decides whether you need a second one. And whether you already have a hospitality job offer, because that decides both who pays and whether the deduction is available.

The practical routine is unglamorous and it works: complete the state card for where you are, keep the PDF on your phone because venues ask on the first day, and keep the receipt for the return. Our guide to [bartending on a working holiday](/blog/bartender-jobs-working-holiday-australia) covers what the certificate actually opens up once you have it.
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
A Working With Children Check is a state issued background screening you need before any work with children in Australia. It costs around $80 for paid work and is usually free for volunteers, and it takes a few weeks. Which state you work in decides the card, the cost and whether it travels with you.

## What does a Working With Children Check actually screen for?

It is a risk assessment run by a state government agency, not a simple criminal record printout. It examines criminal history, findings of inappropriate behaviour involving children, and other records held by the state, and it is designed to identify people who present an unacceptable risk in child related work.

The part most people miss is that it is ongoing rather than a snapshot. Once issued, your record continues to be monitored, and a check can be revoked if new information appears. That is why a general police check, which many backpackers already have from home, does not substitute for it.

## Which jobs need one, and which only ask for one?

Any paid or volunteer role involving regular contact with children requires one by law, and that is a wider group than childcare. Teaching assistants, tutors, music teachers, sports coaches, camp counsellors, youth program staff, after school care workers, nannies and au pairs all fall inside it.

Au pair work is the one that surprises people. It happens in a private home rather than an institution, and it still triggers the requirement in most states, which matters because au pair arrangements are often informal and arranged at short notice.

Some employers also ask for a check where the law does not strictly require it, usually because a venue or school site has a blanket policy. Holding one makes you rosterable across more roles, which for a backpacker chasing hospitality or holiday camp work in a school holiday period is often the real reason to get it.

## Does your check work in another state?

No, and this is the detail that costs money. Each state runs its own scheme with its own card, its own fee and its own validity period, and they are not automatically transferable. New South Wales issues through the Office of the Children's Guardian, Victoria runs its own Working with Children Check, and Queensland uses the Blue Card system.

A summer camp in New South Wales followed by a swim school in Victoria means two applications, two fees and two waiting periods. If your route is already planned, apply in the state where the first job is and budget for a second card rather than assuming recognition you may not get.

## How long does it take, and can you work while it processes?

A few weeks is the realistic planning figure, and the practical bottleneck is usually the identity verification step rather than the assessment. Most states require you to attend in person, commonly at an Australia Post outlet, with original identity documents, and the clock does not really start until that is done.

Whether you can work while the application is pending is genuinely state dependent. Some states allow supervised work once the application is lodged and a receipt number issued; others prohibit any child related work until the card is in hand. Ask the specific state authority rather than the employer, because employers get this wrong in both directions and the penalty falls on the venue as well as on you.

## How long does the card last?

Three to five years in most states, which for a two year working holiday means the card almost always outlasts the visa. New South Wales and Victoria both issue for five years. Queensland's Blue Card and several other schemes run shorter.

The consequence is that this is a one off decision rather than a recurring cost, so the question is not really renewal, it is whether you will need a second state's card during the same trip.

## Can a working holiday maker get one?

Yes. A 417 or 462 visa is no barrier, and there is no citizenship or permanent residence requirement. What the application does need is an Australian residential address for correspondence, identity documents that match across the set, and in most states an in person verification appointment.

The address is the thing worth thinking about. A hostel you will leave in ten days is a poor choice for a card that will be posted to you, and a returned card is the most common self inflicted delay on these applications.

## Is the fee deductible?

Where the work you are already doing requires the check, the fee is a work related expense and belongs in your tax return with the receipt kept. Where you obtained it speculatively before having any child related work, it is harder to justify, because the test looks at the connection to income you are actually earning.

The same principle catches people out on White Cards and RSA certificates. If the employer paid for it, or reimbursed you, it is not your deduction, because you did not bear the cost.

## Which state's rules bind you?

The check itself is straightforward. What is not straightforward is which state's rules bind you and whether you can start before the card arrives, and those turn on facts about your own plans.

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
 "Public Holiday Pay: Up to 250% of Base",
 description:
 "Working a public holiday commonly pays 225% to 250% under an award. Which days count depends on your state, and substitute days move the entitlement.",
 category: "Work Rights" as const,
 date: "20 July 2025",
 readTime: 6,
 body: `
Public holidays attract the highest penalty rates in Australian employment, commonly 225 to 250% of the ordinary rate. Working holiday makers are entitled to them on the same terms as anyone else. Which holidays apply to you depends on the state you are working in, and what you are paid depends on the award covering the job.

## Which public holidays apply everywhere?

Seven are observed nationally, and the rest are set state by state. The national ones are New Year's Day on 1 January, Australia Day on 26 January, Good Friday and Easter Monday on dates that move each year, Anzac Day on 25 April, Christmas Day on 25 December and Boxing Day on 26 December.

The King's Birthday is national in name but not in date. Most states observe it on the second Monday in June, while Queensland and Western Australia observe it at other times, which matters if you are moving between states during that period.

## What does each state add?

Enough that a backpacker working across three states in a year will encounter holidays they have never heard of, each paying penalty rates.

- Victoria: Melbourne Cup Day on the first Tuesday in November, and the Friday before the AFL Grand Final
- New South Wales: the August Bank Holiday, which applies to banks rather than generally
- Queensland: the Royal Queensland Show, observed in the Brisbane area
- South Australia: Adelaide Cup Day and Proclamation Day
- Western Australia: WA Day on the first Monday in June
- Tasmania: Royal Hobart Show Day and Eight Hours Day

Labour Day falls on different dates in different states as well. Check the calendar for wherever you are actually working rather than for wherever you were last month.

## What are you paid for working one?

Between 225 and 250% of the ordinary rate in most awards, which is double time and a quarter to double time and a half, and it applies to every hour worked on the day rather than to hours beyond a threshold. For a casual, the loading and the holiday penalty interact according to the award rather than simply adding.

On a $25 ordinary rate, 225% is $56.25 an hour and 250% is $62.50. Across a full shift the difference between a public holiday and an ordinary Tuesday is larger than any other single decision a casual worker makes about their roster, which is why volunteering for the shifts locals avoid is the most reliable way to lift a month's earnings.

## What if you do not work the holiday?

For permanent full time and part time employees, a public holiday falling on a day you would normally work is paid at your base rate as a day off. No penalty applies because no work was done, but the day is not unpaid.

Casuals get nothing for a public holiday they do not work. That is deliberate rather than an oversight, and it is part of what the 25% loading compensates for, which is also why a casual who does work the day should see a clearly higher rate on the payslip.

## Can your employer make you work it?

An employer can request it, and you can refuse if the request is unreasonable. Reasonableness takes into account the nature of the business, how much notice you were given, your personal circumstances and whether the role is one that ordinarily involves holiday work.

A refusal of an unreasonable request is not lawful grounds for termination. In practice a casual declining a public holiday shift rarely creates a problem, while a permanent employee in hospitality refusing Christmas Day is a harder argument, because holiday trade is intrinsic to the industry.

## Does overtime stack on top?

Generally not. The public holiday rate is already at the top of the penalty structure and it usually absorbs overtime rather than compounding with it, so a long shift on a holiday is paid at the holiday rate throughout.

Some awards handle this differently, and a few provide for additional treatment beyond a certain number of hours. It is one of the few places where reading the actual award clause is worth the ten minutes, because the amounts involved on a double time and a half day are not trivial.

## What should the payslip show?

The public holiday hours separated out at their own rate, not folded into the week's total at a flat figure. That separation is what makes the penalty verifiable, and its absence is the single clearest sign it was not paid.

Substituted days count too. Where a holiday falls on a weekend and is observed on the following Monday, the penalty attaches to the substituted day. Our guide to [an employer not paying correctly](/blog/employer-not-paying-correctly) covers what to do when the numbers do not match the roster.

## Were you rostered on the days that pay?

Which holidays you get and what they pay are both decided by things specific to your job rather than by a national rule. The points below decide both which days pay a penalty and whether you were actually paid it.

- Which state you are working in, since more than half the calendar is state specific.
- Which award or enterprise agreement covers the venue, because 225% and 250% are both common.
- Whether you are casual or permanent, which decides both the unworked day and how the loading interacts.
- Whether the day was substituted from a weekend, since the penalty follows the observed day.
- Whether the payslip separates holiday hours at their own rate or shows a flat figure.
- Whether you are engaged under an ABN, in which case no award applies and none of this is owed to you.

Holiday earnings are taxed like the rest of your wages at the working holiday rate, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 }, {
 slug: "casual-shift-cancellation-rules-australia",
 title:
 "Shift Cancelled Late? You May Still Be Paid",
 description:
 "Most awards require casuals to be paid 2 to 3 hours if a shift is cancelled on arrival or cut short. Which award covers you decides the exact number.",
 category: "Work Rights" as const,
 date: "20 July 2026",
 readTime: 6,
 body: `
Often, yes. An employer can cancel a casual shift, but most modern awards require a casual who turns up as rostered, or is sent home early, to be paid a minimum engagement of 2 to 3 hours regardless. Which award covers your job decides the number, and that is the fact worth knowing.

## What is a minimum engagement, and why does it exist?

A minimum engagement is the shortest period a casual can be paid for once they have been engaged for a shift. It exists because turning up is itself a cost: you travelled, you arranged your day around it, and you turned down other work. Awards price that at a couple of hours rather than at nothing.

The number is set by the award covering your industry, not by your employer and not by your contract. This is the most useful single number a casual worker in Australia can know about their own job, and almost nobody knows it.

- Hospitality Industry (General) Award: 2 hours
- General Retail Industry Award: 3 hours for most casuals
- Cleaning Services Award: 3 hours
- Horticulture Award: 2 hours

If you show up for a rostered eight hour shift at a Gold Coast restaurant and are told at the door that it is quiet, the employer has not saved eight hours of wages. They have saved six.

## Does the rule cover a shift cancelled before you leave home?

This is the genuinely uncertain part, and it is where honest advice differs from the confident version you will read elsewhere. A cancellation made before the shift begins sits outside the minimum engagement clause in most awards, because the engagement never started.

What can still apply is your award's rostering and roster change provisions. Several awards require notice before a roster is changed, or consultation where changes are regular, and a pattern of cancelling by text the night before can breach those even where a single instance would not. Enterprise agreements sometimes go further than the award and are worth reading if you are covered by one.

## What if you are sent home part way through?

The same minimum applies from the start of the engagement. If your award sets three hours and you are sent home after one, you are generally owed the three, and the reason for the early finish does not usually matter. Slow trade, a quiet dining room, an unexpected closure and a manager overstaffing the roster are all the employer's commercial risk rather than yours.

The common version in hospitality is being sent home after the lunch rush on a shift rostered through to close. That is exactly the situation the clause is written for.

## Do casuals get sick pay if they cannot attend?

No. Casual employees do not accrue paid sick leave or paid annual leave, and a shift you cannot work is a shift you are not paid for. That is the deliberate trade behind the 25% casual loading on your hourly rate.

It is worth knowing that the loading is not optional generosity. If your payslip shows an hourly rate at the base award rate with no loading applied and you are engaged as a casual, that is an underpayment in itself and it is more common than the shift cancellation issue.

## Is your employer required to give you any shifts at all?

No. Casual employment carries no guaranteed hours, and a roster that thins out from four shifts a week to one is not in itself a breach of anything. This is the flexibility that runs in both directions: you can decline shifts too, and declining is not lawful grounds for retaliation.

Long term regular casuals can in some circumstances have a pathway to permanent employment, but that is generally a longer arrangement than a working holiday visa allows for, so it rarely applies to this audience.

## What should you keep if you think you are owed money?

Evidence of the roster and evidence of the cancellation, because those two together are the whole case. Screenshot the roster when it is published, since rostering apps overwrite rather than archive, and keep the text message or app notification that cancelled it.

Then compare against your payslip. Most underpayment claims of this kind are not disputes about the law, they are disputes about what happened, and a screenshot settles them. The Fair Work Ombudsman handles unresolved complaints, and a pattern of unpaid cancellations is one of the more straightforward things to evidence.

## When was the shift cancelled?

Minimum engagement is not one number, it is whichever number your award sets, and whether it applies at all turns on when the shift was cancelled. These are the facts that decide what you are owed.

- Which award covers your job, since that sets the minimum engagement and the rostering rules.
- Whether an enterprise agreement applies, which can be more generous than the award.
- Whether the shift was cancelled before it started or ended early, which is the line the minimum engagement clause turns on.
- Whether you are genuinely a casual or have been engaged through an ABN, because a contractor has no award, no minimum engagement and no loading.
- Whether the 25% casual loading is actually on your payslip, which is worth checking before anything else.

Underpaid or not, everything withheld from those pays reconciles at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 }, {
 slug: "six-month-employer-rule-working-holiday-visa",
 title:
 "The 6-Month Employer Rule on 417/462 Visas",
 description:
 "Condition 8547 caps you at six calendar months with one employer. Hospitality, agriculture and construction are exempt, which covers most backpacker work.",
 category: "Work Rights" as const,
 date: "29 July 2026",
 readTime: 5,
 body: `
Visa condition 8547 limits 417 and 462 holders to six calendar months with the same employer. It is measured in calendar time, not hours worked. A long list of industries is exempt, and those exemptions cover most of the work backpackers actually do, so for most people the rule never bites.

## What exactly does the rule restrict?

The restriction is six calendar months with one employer, counted from your start date regardless of how many hours you worked in that period. Two days a week for six months uses the same allowance as full time for six months.

- Measured in calendar months, not days or hours worked
- Applies per employer, not to your total time in Australia
- Breach can lead to visa cancellation
- The clock resets only when a new working holiday visa is granted

The condition exists to keep the visa about travel rather than employment, which is also why the exemptions are drawn around industries with genuine seasonal labour shortages.

## Who counts as the same employer?

The employer is the legal entity behind the ABN, not the building you work in. That distinction decides several situations that otherwise look ambiguous.

- The same company across different branches is generally the same employer
- Related businesses trading under different ABNs are different employers
- Franchises under different owners are different employers
- In labour hire, the host business where you actually work is treated as the employer
- For contractors, each end client is a separate employer

Checking the ABN on your payslip is the reliable way to know which entity you are actually employed by, and it takes seconds. Two venues with the same name and different ABNs are two employers.

## Which work is exempt?

The Department of Home Affairs exempts a long list of sectors, and between them they cover the substantial majority of working holiday employment. If your work is on this list, you can stay with the same employer beyond six months without asking anyone.

- Plant and animal cultivation, including agriculture and horticulture
- Fishing and pearling
- Tree farming and felling
- Mining
- Construction
- Tourism and hospitality, anywhere in Australia
- Health, aged care and disability care
- Childcare
- Food processing
- Natural disaster recovery
- Different locations of the same employer, where no single location exceeds six months

Tourism and hospitality being exempt nationwide is the one worth knowing, because it removes the concern entirely for the largest single group of working holiday workers.

## What if your work is not exempt?

Then permission has to be requested in writing from the Department of Home Affairs before the six months ends, not after. You can continue working while the request is being decided, and you must stop if it is refused.

Approval is discretionary and the grounds that succeed are practical rather than sympathetic: a new visa application already lodged that would allow full time work, a priority sector with employer support, or a genuine operational reason. Leaving the request until week 25 is the most common reason it does not go smoothly.

## How does this interact with the 88 days?

They are separate rules that happen to overlap, and conflating them causes unnecessary worry. The 88 days of specified work for a second year visa is an immigration requirement about the type and location of work. Condition 8547 is a limit on time with one employer.

In practice most specified work industries are also exempt from the six month rule, so completing all 88 days with a single farm is usually fine. For a third visa the requirement rises to six months of specified work during the second visa year, which is why the exemptions matter more at that stage than at the first.

## What does a breach actually cost?

More later than immediately, which is why it is underestimated. The immediate risk is visa cancellation, which is real but not the usual outcome. The durable cost is the record: a breach sits against you when any future Australian visa is assessed, including a second working holiday visa or a skilled visa years later.

There is a separate exposure on the employer's side, which is worth knowing because it explains why some employers refuse to keep you past six months even where an exemption applies. They are not being difficult, they are managing their own compliance.

## What decides whether this is an issue for you?

Three facts, and you can settle all three this afternoon. Which industry the work is in, since the exemptions are broad. Which legal entity employs you, which is on the payslip as an ABN. And when you actually started, because the clock is calendar based and people routinely misremember by weeks.

Where none of the exemptions applies, the simplest answer is usually to change employers rather than to seek permission, and the tax and super consequences of doing so are minor. The same 15% rate applies throughout, [superannuation](/superannuation) continues to accrue at 12%, and all the wages combine into one [tax return](/tax-return) at the end of the year. The one thing worth managing is the super: each new employer means a new nomination, and giving every one of them the same fund details is what stops a year producing four accounts and four claims.
`,
 },

 // ─── GENERAL / PRACTICAL - NEW ────────────────────────────────────────────
 {
 slug: "opening-bank-account-australia-working-holiday",
 title: "Opening an Australian Bank Account on a WHV",
 description:
 "All four major banks open accounts on a passport, and most let you apply before you fly. What matters is when you close it, not which bank you pick.",
 category: "Medicare & Other" as const,
 date: "4 August 2025",
 readTime: 6,
 body: `
You need an Australian bank account for wages, and later for your tax refund and your super payment. All four major banks open accounts for working holiday makers on a passport, and most let you apply online before you arrive. The important decision is not which bank, it is when you close it.

## Which bank should you choose?

For everyday use there is very little between Commonwealth Bank, Westpac, ANZ and NAB. All four offer low fee everyday accounts, apps, debit cards and wide ATM networks, and all four are used to opening accounts for arrivals on a working holiday visa.

The one criterion that actually varies is coverage along your route. A bank with branches and ATMs in the regional towns you are heading to is worth more than a marginally better fee structure, because fee free ATM access in Mildura or Bowen is not a given.

## What do you need to open one?

Less than people expect, which is why this is one of the easier first week tasks. A valid passport, an Australian address that can be temporary, and ideally an Australian phone number are enough for most banks.

- A valid passport
- An Australian residential address, including a hostel
- An Australian phone number
- A second form of identity in some cases
- Your TFN, which is useful but not required

Most banks let you begin the application online before you fly, with identity verification completed at a branch in the first days after arrival. Doing the online half in advance is worth the twenty minutes, because the branch visit is then short.

## Do you have to give them your TFN?

No, and you can open and operate an account without one. The consequence is confined to interest: without a TFN recorded, the bank must withhold tax from interest earned at the top rate.

On a transaction account earning cents that is irrelevant, which is why the requirement is presented as more urgent than it is. Add the TFN when the letter arrives, and do not let its absence delay opening the account, because you need a BSB and account number before your first shift far more than you need the interest treatment to be right.

## What do the fees actually cost?

Most major banks charge a monthly account fee of around $5, usually waived if a minimum amount is deposited each month, commonly around $2,000. Anyone working regular hours clears that easily, and the fee only bites in a month you were travelling rather than working.

Several banks also run fee free accounts aimed at new arrivals and students, which sidestep the threshold entirely. Asking directly is worth doing, because these are not always the default offered at the counter.

## Should you use a transfer service instead?

A transfer service is a complement, not a replacement. Services like these generally deliver a better exchange rate than a bank on a four figure transfer home, but they do not give you what an Australian employer's payroll needs, and they are not where the ATO pays a refund.

The workable setup is both: an Australian bank account to receive wages, tax refunds and super, and a transfer service to move money home when the time comes. Our guide to [transferring money out of Australia](/blog/transferring-money-overseas-australia-tax) covers the tax position, which is that there isn't one.

## When should you close the account?

Not when you fly. This is the single most consequential banking decision on a working holiday, and it is made casually by almost everyone, usually in the last week when they are closing everything else.

Both your tax refund and your DASP super payment arrive weeks or months after departure, and both pay into an Australian account. Keep it open for three to four months after you leave, until the refund and the super have both landed, then transfer the balance and close it.

- Lodge the [tax return](/tax-return) and apply for [DASP](/superannuation) before or shortly after leaving
- Keep the account open for three to four months after departure
- Transfer the balance home once both payments have cleared
- Close the account last

We see the consequences of the other order regularly. The money is not lost, but re-establishing payment details with the ATO and a super fund from another country turns a two week wait into a several month one, and some people simply give up.

## How do you avoid the scams that target new arrivals?

Assume that any message asking you to click a link and enter banking details is a scam, because it is. The ATO does not ask you to update bank details by text or email link, does not demand payment in gift cards or cryptocurrency, and does not threaten arrest or visa cancellation.

Working holiday makers are targeted deliberately, because a recent arrival does not yet know what normal ATO contact looks like and a threat about a visa lands harder on someone whose visa is the reason they are here. If something is uncertain, the safe move is to check independently rather than to engage with the message. Our guide to [protecting your TFN](/blog/tfn-security-protect-from-fraud) covers who is actually entitled to ask for your details.
`,
 }, {
 slug: "trs-tourist-refund-scheme-australia",
 title:
 "TRS: Claim the 10% GST Back at the Airport",
 description:
 "Spend $300 or more with one business within 60 days of leaving and the 10% GST comes back at the airport. A $1,000 laptop refunds about $91.",
 category: "Medicare & Other" as const,
 date: "8 August 2025",
 readTime: 6,
 body: `
The Tourist Refund Scheme returns the 10% GST on goods you buy in Australia and carry out with you. The invoice must total $300 or more from a single business, dated within 60 days of departure, and you must have the goods with you at the airport. A $1,000 laptop refunds about $91.

## What is the Tourist Refund Scheme actually for?

GST is a tax on consumption in Australia, so goods leaving the country with you were never meant to carry it. The Tourist Refund Scheme is the mechanism that gives it back, run by the Australian Border Force at international airports and some seaports. It refunds the 10% GST, and 14.5% Wine Equalisation Tax on wine.

It is open to every departing traveller, including working holiday makers. Nothing about your visa affects eligibility, and using it has no bearing on your tax return or your [super](/superannuation) claim.

## Which purchases actually qualify?

A purchase qualifies when it meets every one of five conditions, and failing any single one disqualifies the claim entirely. The condition that catches people is the single business rule: $300 has to come from one ABN, not from $300 of spending across a shopping centre.

- Goods bought from a single business trading under a single ABN
- A total invoice of $300 or more, including GST
- Purchased within 60 days of your departure date
- The goods with you and available for inspection
- Physical goods, not services

Electronics, cameras, phones, laptops, watches, jewellery, luggage, clothing and sporting goods all qualify. Services do not, so accommodation, tours and massages are out, and so are tobacco, GST free items, anything you have already consumed, and anything you posted home.

## What do you need to bring to the desk?

You need four things: your passport, your boarding pass, the original tax invoices, and the goods themselves. Missing any one of them ends the claim, and the invoices are the item most often left in a hostel or thrown away weeks earlier.

The invoice itself has to show the seller's name and ABN, the GST paid or a total including GST, a description of the goods and the purchase date. For invoices over $1,000 your own full name must appear on the invoice, which the retailer has to add at the time of purchase rather than afterwards.

## How does the claim work at the airport?

You check in as normal, keep the goods in your hand luggage, and go to the TRS facility after security in the international terminal. Staff check the passport, boarding pass and invoices, inspect the goods, and process the refund to the payment method you nominate.

Allow real time for it. Queues run long in the departure peaks and the desks close well before your gate does, so arriving 90 minutes before the flight rather than the usual 60 is the difference between a refund and a story about one. The MyTRS app lets you lodge the details in advance, which shortens the desk time but does not remove the inspection.

## How and when is the money paid?

The refund is paid to a credit card, to an Australian or overseas bank account, or by cheque, and you choose at the desk. Credit card is both the most common and the fastest, usually landing within about five business days.

This is where a departing backpacker has to think a step ahead. If you are closing your Australian bank account before you fly, nominate a card rather than that account, because a refund sent to a closed account has nowhere to land.

## Is it worth the time for a working holiday budget?

On a single large purchase it is clearly worth it, and on a scattered year of small spending it is not. The 10% comes back on the GST inclusive price, so $1,000 of electronics returns about $91 and $3,000 returns about $273, against roughly half an hour of queueing.

- A $1,000 laptop refunds about $91
- A $2,000 camera refunds about $182
- A $500 watch refunds about $45

Buying the laptop, camera or phone you were going to buy anyway in your final fortnight, specifically so the invoice falls inside the 60 days, is entirely legitimate and extremely common.

## What decides whether your claim succeeds?

Four facts about how you shopped, and all of them are settled long before you reach the airport. Whether the $300 sat with one business, since multiple receipts from the same retailer combine and ten shops at $30 do not. Whether the purchase date falls inside 60 days of departure, counted back from the flight. Whether you still have the original invoice. And whether the goods are physically with you rather than in the hold, mailed home, or already worn out.

Oversized items are the genuine edge case. A surfboard or a large instrument cannot go through the cabin, so the inspection has to be arranged with the airline and the TRS desk before check in, and that is a conversation to have days ahead rather than on the morning.

## Where does the TRS sit in the rest of your departure?

The TRS is the one part of leaving Australia that cannot be done afterwards. Once you have passed through the gate the claim is gone permanently, whereas your [tax return](/tax-return) and your DASP super claim can both be lodged from your kitchen table at home months later.

That is worth knowing in the right order. The refund at the airport is worth tens or low hundreds of dollars. The return and the super claim are usually worth considerably more, and they are the ones that survive the flight.
`,
 }, {
 slug: "transferring-money-overseas-australia-tax",
 title:
 "Sending Money Home From Australia: Taxed?",
 description:
 "No. Moving your own after-tax wages out of Australia is not income and is not taxed. Transfers of $10,000 or more are reported, which is a different thing.",
 category: "Tax Return" as const,
 date: "11 August 2025",
 readTime: 5,
 body: `
No. Moving your own money out of Australia is not a taxable event. Wages are taxed when you earn them, not when you spend or transfer them, so an after tax balance can leave the country freely. Transfers of $10,000 or more are reported to AUSTRAC, which is monitoring, not taxation.

## Why is a transfer not taxed?

Tax attaches to income, and a transfer is not income. Sending Australian dollars to an account in your own name at home, converting currency, or moving savings you brought in with you are all movements of money that has already been through the tax system or was never in it.

What the ATO taxes is what you earned here: wages at the working holiday maker rates, contractor income under an [ABN](/abn), tips, interest on an Australian account, and cash work, which is taxable whether or not it appeared on a payslip. Once the [tax return](/tax-return) has settled that, what happens to the balance is your business.

## What is actually reported when you send money home?

Two separate reporting rules exist and neither creates a liability. Banks and money transfer services report international transfers to AUSTRAC, generally at $10,000 or more, automatically and without any action from you. Physical cash of $10,000 or more crossing the border must be declared to the Australian Border Force.

Both are anti money laundering measures. Visibility is not taxation, and honest wage money moves without difficulty. What is an offence is deliberately splitting a transfer into smaller amounts to stay under the reporting threshold, which is called structuring and is treated far more seriously than the transfer would have been.

## Will you be taxed again at home?

That depends on your own country's rules rather than Australia's, and it is the question most worth asking before you land. Most of the countries working holiday makers come from have a double tax agreement with Australia, which generally lets Australian tax already paid be credited against any home liability on the same income.

The treatment varies more than people expect. Some countries treat a year of Australian working holiday earnings as ordinary foreign income and want it declared; others largely disregard it once you were not tax resident there. A tax adviser in your own country is the right person for that half, and it is a genuinely different question from the Australian one.

## What order should you do things in before you fly?

The order matters far more than the tax treatment does, because two payments arrive after you have gone. Both your tax refund and your DASP super payment are paid into a nominated account weeks or months after lodgement, so the account has to still exist when they land.

1. Lodge the Australian [tax return](/tax-return) for your final year
2. Apply for the [superannuation](/superannuation) payment through DASP
3. Cancel any ABN you registered
4. Wait for the refund and the super payment to arrive
5. Transfer the balance home
6. Close the Australian account last

Closing the bank account early is the most common and most expensive mistake we see in departing clients. The money is not lost, but recovering it means re-establishing payment details with the ATO or a super fund from overseas, and that turns a two week wait into a several month one.

## What decides how much actually arrives at the other end?

Not tax, but the exchange rate and the fee structure, and the two are often presented so the worse deal looks cheaper. A bank quoting a low flat fee frequently builds a wider margin into the rate itself, so on a four figure transfer the headline fee is the smaller half of what you pay.

Compare on the amount that lands in your home account, not on the fee. That is the only number that means anything, and it is the one comparison the quotes are designed to make awkward.

## Does money you brought into Australia change anything?

No. Savings you arrived with are yours, bringing them in was not income, and taking them out again is not a taxable event either. The Australian system only ever looks at what you earned while you were here.

The distinction becomes practical if you brought in a large sum and want to send it back out. The transfer will be reported at the usual thresholds and there is nothing to answer for, but being able to show where the money came from is worth the two minutes it takes to keep the original bank statement.

## What still ties you to Australia after the money has gone?

Moving your funds home settles nothing with the ATO. The obligation to lodge for your final Australian financial year exists independently of where the money sits, and it runs to 31 October after the year ends whether or not you are still in the country. Our guide to [tax after leaving Australia](/blog/tax-obligations-after-leaving-australia) covers what is still outstanding once you have gone.

There is usually a reason to want that final return lodged rather than forgotten. A year that ends part way through, in December or February, is a year where too much was withheld against the income actually earned, and that overpayment only comes back if someone claims it.
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
Two methods, and how far you drive for work decides which suits you. Cents per kilometre pays 91 cents a kilometre up to 5,000 kilometres a year with no logbook, capped at $4,550. The logbook method has no cap but requires twelve continuous weeks of records, and it fails most often for lack of them.

## What counts as business travel?

Travel with a genuine business purpose, which is narrower than most people assume and wider in one important respect. Driving between job sites on the same day is business. So is travel to buy equipment or supplies, travel to a client, travel for training directly related to the work, and travel from your accommodation to a temporary work site where the location varies.

What is not business travel is the daily commute from home to one regular workplace, however early it starts and however far it is. Nor is personal travel, and the first and last trip of the day to and from your main work base is generally private.

For a backpacker with a car this splits cleanly. The drive from your hostel to a farm for ABN work is business. The Sydney to Cairns road trip is not, whatever you did at either end.

## How does the cents per kilometre method work?

You claim a set rate for each business kilometre with no receipts for running costs at all. The rate is 91 cents, the limit is 5,000 business kilometres a year, and the maximum deduction is therefore $4,550.

You still need a reasonable basis for the kilometres, which means a simple record of date, distance and purpose for each trip. It does not require odometer readings or a formal logbook, which makes it the practical choice for occasional driving.

## How does the logbook method work?

You establish a business use percentage over twelve continuous weeks, then apply that percentage to every vehicle cost for the whole year. During those twelve weeks you record every trip, business and private, with date, start and end odometer readings, and purpose.

The percentage then applies to fuel, insurance, registration, servicing, repairs and depreciation. Sixty per cent business use against $8,000 of total vehicle costs is a $4,800 deduction, and there is no cap, so a driver with high running costs clears the cents per kilometre maximum comfortably.

The logbook remains valid for five years, or until your usage pattern changes significantly. For a working holiday maker that means twelve weeks of admin covers the rest of the visa, which is the argument for doing it early rather than deciding in June that you should have.

## Where is the crossover?

At around 5,000 business kilometres, which full time rideshare and delivery drivers pass within months. Below that, cents per kilometre is usually both simpler and comparable. Above it, the logbook method is worth substantially more and the gap widens with every kilometre.

Financing or leasing the vehicle pushes the calculation further toward the logbook, because interest and depreciation are captured by the percentage method and are not reflected in a per kilometre rate at all.

## What records does either method need?

More than most people keep, which is why vehicle claims are the most commonly disallowed item in this whole category. Keep receipts for every vehicle expense, the logbook or trip records for whichever method you used, odometer readings at the start and end of the financial year, and the purchase invoice if you bought the car during the year.

Keep all of it for five years from the date the return claiming the expenses is lodged. A claim that was genuinely incurred but cannot be evidenced is, for practical purposes, not a deduction.

## Does the method carry across cars?

The business use percentage attaches to how you use a vehicle rather than to a particular car, so it generally carries when you change vehicles as long as the pattern of use has not materially changed. The expenses themselves are of course specific to whichever car you actually ran.

That matters for backpackers more than for most people, because selling one car and buying another partway through a stay is common. Twelve weeks of records established in a first car do not have to be redone from scratch in a second one used the same way.

## Logbook or cents per kilometre for you?

Both methods are available to any ABN holder. Which one is worth more, and whether it survives review, depends on your own driving.

- How many business kilometres you drive in a year, since 5,000 is the point the cap bites.
- Whether you kept twelve continuous weeks of logbook records, which is what unlocks the uncapped method.
- What your total running costs are, since the logbook percentage applies to all of them.
- Whether the vehicle is financed or leased, which adds interest and depreciation to the pool.
- How clearly your business and private travel are separated in the records.
- Whether the trips you counted are genuinely business rather than commuting.

The method that produces the larger legitimate deduction is chosen when the [working holiday tax return](/tax-return) is prepared, and you can [estimate your tax refund](/calculator) once you know roughly what your ABN income and costs came to.
 `,
 }, {
 slug: "small-business-tax-offset-working-holiday-abn",
 title:
 "Small Business Tax Offset on ABN Income",
 description:
 "The offset refunds up to $1,000 of tax on sole-trader income - and working holiday makers with ABN income are frequently eligible. How it is calculated.",
 category: "ABN" as const,
 date: "16 August 2025",
 readTime: 5,
 body: `
It reduces the tax payable on ABN income by 16% of that tax, capped at $1,000 a year. Sole traders qualify; companies and trusts do not. It is non refundable, so it can reduce tax to zero but cannot create a refund on its own, and it is not applied automatically. It has to be claimed.

## What is it actually discounting?

The tax attributable to your business income, not the income itself and not your whole assessment. That distinction is the source of most of the confusion about how small the figure ends up being.

The calculation runs in three steps. Take your net small business income, being ABN receipts less ABN deductions. Identify the tax attributable to that slice within your assessment. Apply 16% to that tax, capped at $1,000. So $12,000 of delivery income less $2,500 of deductions leaves $9,500 net, tax on that slice at working holiday maker rates is $1,425, and the offset returns $228.

## Who qualifies?

Individuals with business income under an ABN, either as a sole trader or as a partner in a partnership, with aggregated annual turnover under $5 million. For a working holiday maker the turnover test is never the issue, so in practice having ABN income is the qualification.

Companies and trusts are excluded, because the offset exists specifically to give unincorporated businesses something in place of the lower company tax rate. That is why it is sometimes called the unincorporated small business tax discount.

## What is worth at typical backpacker income levels?

Modest, and worth having. The offset scales with the tax on the business slice, so the more of your year ran through the ABN the larger it gets, up to the cap.

- $5,000 of net ABN income: an offset in the region of $120
- $15,000: around $360
- $30,000: around $720
- Above that: capped at $1,000

The pattern worth noticing is that deductions reduce the offset as well as the tax, because a smaller net business income means less tax attributable to it. That is not a reason to claim fewer deductions, since a dollar of deduction saves more than the 16% the offset gives back on it, but it does explain why the two figures move together.

## Can it be combined with other offsets?

Yes, and for a working holiday maker with mixed income it usually is. Each offset is calculated separately and applied to the final position.

- The small business tax offset, on the tax attributable to business income, capped at $1,000
- The low income tax offset, which applies where you are assessed as a resident, worth up to $700
- The Medicare levy exemption, which removes the 2% levy where you are not entitled to Medicare

The interaction between them is where mixed income years get complicated, because the residency position decides whether the low income offset is even available, and the passport decides the Medicare question. Our guide to [the low income tax offset](/blog/low-income-tax-offset-working-holiday) sets out that side.

## What happens when you had both wages and ABN income?

Both are taxed at working holiday maker rates, both go on one return, and only the ABN portion attracts this offset. Deductions and other offsets apply across the whole assessment.

That combination is very common and it works in your favour more often than people expect, because the PAYG withheld from wages frequently covers the tax owed on the untaxed ABN income. The offset then reduces the remaining business tax, which can turn a small amount payable into nothing owing.

## What voids it?

Income that is not genuinely business income. If an arrangement is reclassified as employment rather than contracting, the income stops being small business income and the offset goes with it, along with the deductions claimed against it.

That is not a hypothetical for this audience. Sham contracting, where a worker is put on an ABN for what is really a supervised hourly job, is widespread in hospitality and farm work, and the reclassification brings back award rates, superannuation and workers compensation while removing the offset. Our guide to [the employee versus contractor test](/blog/employee-vs-contractor-australia) sets out how the line is drawn.

## What if you already lodged without it?

It can generally be claimed by amending the return, and the standard amendment window is two years from the date the original assessment issued. A first year backpacker who lodged the previous October is very often still inside it.

Self lodged returns miss this offset regularly, because nothing prompts for it and the ATO does not apply it on your behalf. It is worth checking any year in which you had ABN income at all.

## What is the offset worth to you?

The rate and the cap are fixed. What the offset is worth to you is decided by the shape of your year. These are the facts that determine both the amount and whether the offset survives at all.

- How much of your income ran through the ABN rather than through wages.
- What your deductions came to, since the offset applies to tax on net business income.
- Whether you also had wages, whose withholding often absorbs the business tax before the offset is even reached.
- Whether the contracting was genuine, since reclassification removes it.
- Whether you are assessed as a resident, which decides whether the low income offset stacks alongside it.
- Whether a prior year was lodged without claiming it, which is usually amendable within two years.

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
Sole trader, almost always. A sole trader is you, operating under an ABN, with the business income flowing onto your personal return at working holiday maker rates. A company is a separate legal entity with its own tax at 25%, its own filings and its own costs. At backpacker income levels the company loses on every measure.

## What is the actual difference?

Legal separation, and everything else follows from it. A sole trader is not separate from the business: the income is your income, it goes on your individual return, and you are personally liable for what the business owes. Registration is the ABN and nothing more.

A company has its own ABN, its own tax obligations, and limited liability that protects personal assets. It also requires registration with ASIC, annual review fees, separate financial accounts, a company tax return, a director identification number and ongoing director obligations. That overhead exists whether the company trades or not.

## How do the tax rates actually compare?

Badly for the company, at these income levels. A sole trader who is a working holiday maker pays 15% on the first $45,000 of business income and 30% above it. A company pays a flat 25% on every dollar from the first.

On $30,000 of ABN income the sole trader position is $4,500 of tax and the company position is $7,500, before any of the company's running costs. Then the money still has to come out of the company as salary or dividends, which is taxed again in your hands. There is no arrangement at this scale where the company wins.

## What would a company actually cost?

Enough to make the comparison one sided. ASIC registration is in the region of $600, the annual review fee is a few hundred more, a company tax return has to be prepared separately from your personal one, and the director obligations include identity verification.

The standing problem for this audience is the exit. A visa limited director who leaves Australia with a dormant company still has ASIC obligations, and they accrue in your absence. A sole trader closes the whole thing by [cancelling the ABN](/blog/how-to-cancel-your-abn), which is free and takes minutes.

## When would a company genuinely make sense?

In situations that essentially never describe working holiday work. Multiple owners sharing a business, liability heavy contracting where insurance is not sufficient protection, or income high enough that the tax and structuring advantages outweigh the running costs, which is a threshold far above what a 417 or 462 year produces.

Licensed specialist trades such as electrical and plumbing are the closest real case, and those require qualifications most working holiday makers do not hold. Delivery riding, farm contracting, cleaning and freelance work do not come near it.

## What if a platform or employer insists on one?

Treat the requirement as the thing to investigate rather than as an instruction. There are legitimate contexts where a principal will only engage incorporated contractors, usually for insurance reasons on large sites.

There are also arrangements where the demand exists to push obligations further away from the person who should be carrying them. If someone wants you incorporated for what is plainly hourly supervised work, the classification question comes first, and our guide to [the employee versus contractor test](/blog/employee-vs-contractor-australia) covers how that is decided.

## What about personal liability as a sole trader?

Real but usually small, and cheaper to insure than to structure around. For cleaning, hospitality, delivery and basic trades the exposure is limited, and public liability insurance covers most of it at a modest cost.

The comparison worth making is between an insurance premium and the total cost of forming and maintaining a company for a stay of a year or two. For almost every working holiday maker, the premium wins comfortably.

## Are partnerships or trusts ever relevant?

Rarely, and for the same reasons. A partnership is two or more people sharing business income, with its own return and its own complications about how income is split and who is liable for what. A trust holds income or assets for beneficiaries and exists mainly for asset protection and distribution flexibility.

Both add administration to a situation that does not have the scale to justify it. If two backpackers are genuinely running something together, that is worth advice rather than a default answer, but it is not the ordinary case.

## Does the structure change what you can deduct?

Barely, which removes the last argument people make for incorporating. A sole trader deducts the same genuine business expenses a company would: tools, vehicle costs on a logbook or per kilometre basis, the work share of phone and internet, insurance, licences and fees for managing your tax affairs.

What the company adds is not deductions but administration, and the administration itself becomes a cost you would not otherwise have. Our guide to [ABN deductions](/blog/abn-deductions-business-expenses) sets out what is claimable either way.

## Would anything move you off sole trader?

The default is clear. The facts that would move it are specific and uncommon. If none of the points below describes your situation, sole trader is the answer and there is nothing further to weigh.

- How much you expect to earn under the ABN, since the working holiday maker rate beats company tax throughout the realistic range.
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
 "PSI or Business Income? The ABN 80% Rule",
 description:
 "Where 80% of your ABN income comes from one payer, personal services income rules restrict what you can deduct. What that means for riders and labourers.",
 category: "ABN" as const,
 date: "3 September 2025",
 readTime: 5,
 body: `
Almost all working holiday [ABN](/abn) income is personal services income, because you are paid for your own labour rather than for goods, assets or other people's work. PSI is not a penalty and it is not a problem. It restricts a small set of deductions that backpackers rarely have anyway.

## What counts as personal services income?

Personal services income is income earned mainly from your own skills, effort or expertise rather than from selling something. If the person paying you is really buying your hands and your hours, the income is PSI, whatever the invoice says at the top. That covers most of what a working holiday maker does under an ABN.

- Tradespeople paid for their labour
- Cleaners paid for their cleaning
- Fruit pickers paid by the bin or by the hour
- Freelancers and consultants paid for their own work
- Delivery riders paid per drop

A carpenter invoicing a construction company is being paid for the carpenter's hours and skill, so that is PSI. So is a picker invoicing a labour hire contractor, even where the picker supplies their own gloves and secateurs.

## What would make your ABN income business income instead?

Business income comes from something other than your personal effort: goods you produce, assets you own, or people you employ. The test is whether the money would still arrive if you personally were not there to do the work. For nearly every backpacker on an ABN, the answer is no.

- Producing and selling goods, such as a bakery
- Income from business assets, such as leasing equipment
- Employing others to do the work you have contracted for
- Reselling products bought from suppliers

## How does the 80% rule actually work?

The 80% rule is the first test the ATO applies: if more than 80% of your personal services income in a year comes from one client and their associates, you cannot self assess out of the PSI rules, no matter what your other circumstances look like. Below 80%, three further tests can take you out of PSI, and you only need to pass one of them.

- **Results test**: you are paid for a specific outcome, supply your own tools, and are liable to fix defects at your own cost
- **Unrelated clients test**: you have two or more unrelated clients won through public advertising or a similar offer
- **Employment test**: you pay someone else to do at least 20% of the principal work
- **Business premises test**: you work from premises that are physically separate from your home and your client's

In practice most working holiday makers fail all four. One farm, one labour hire agency or one platform supplies nearly all the income, the tools are the client's, and there is no separate premises. That result is normal and expected.

## Which deductions does PSI actually restrict?

PSI restricts deductions that only make sense inside a real business structure, and it leaves the ordinary work related deductions completely intact. The everyday claims a backpacker makes, for boots, tools, phone use and travel between sites, are unaffected. What goes is the ability to shift income or costs onto other people.

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

For riders, pickers, cleaners and labourers, PSI changes almost nothing about the return. The bike, the boots, the phone plan share and the kilometres between sites are all still claimable, and those are where the money is. The restricted deductions are ones this group does not have in the first place.

We see the anxiety far more often than the consequence. Someone reads that their income is PSI, assumes deductions are being taken away, and either overclaims to compensate or gives up and claims nothing. Both cost money.

## When does the classification genuinely change your outcome?

The classification starts to matter when the ABN work is a real second business rather than dressed up wages, and that is where a working holiday year occasionally lands. If you subcontracted other backpackers, split invoices with a partner, or ran two genuinely unrelated client bases, the tests can produce a different answer and the deduction set widens.

It also matters when the ABN was never appropriate in the first place. Where the arrangement looks like employment, with set hours, supervision and the client's equipment, the real issue is not PSI but sham contracting, and that changes who owes your super and your minimum rates. Our guide on [employee versus contractor status](/blog/employee-vs-contractor-australia) sets out that test.

## What decides it in your case?

Four facts about your year settle the treatment, and you already know all four: how many clients paid you, whether any one of them accounted for more than 80% of the ABN income, whether you supplied the tools and carried the risk of fixing your own mistakes, and whether anyone worked for you. Together those decide which tests you can pass.

The reason this is worth getting right is that PSI, sham contracting and ordinary contracting all look identical on a bank statement. They produce different returns. When we prepare a [tax return](/tax-return) with ABN income in it, describing the work accurately, who paid you, how you were paid and whose equipment you used, is what tells us which set of rules applies.
`,
 },

 // ─── TAX RETURN ADVANCED - NEW ────────────────────────────────────────────
 {
 slug: "low-income-tax-offset-working-holiday",
 title:
 "Can You Claim the Low Income Tax Offset?",
 description:
 "LITO is for Australian tax residents - most working holiday makers do not qualify. The residency exception, and the offsets and exemptions you can claim.",
 category: "Tax Return" as const,
 date: "15 September 2025",
 readTime: 5,
 body: `
The Low Income Tax Offset is worth up to $700 and it belongs to Australian tax residents. Income taxed at working holiday maker rates does not attract it. Whether any of it reaches you depends entirely on your residency position for the year, which is a question of facts rather than of visa.

## What is an offset, and why is it worth more than a deduction?

An offset reduces the tax you owe. A deduction reduces the income the tax is calculated on. That difference sounds technical and is worth real money, because the same dollar figure produces very different outcomes.

- A $700 deduction against income taxed at 15% saves you $105
- A $700 offset reduces your tax bill by the full $700

LITO is worth up to $700 for taxable income up to $37,500, shading down through $37,500 to $66,667 and disappearing above that. It is also non-refundable, meaning it can reduce tax to zero but never turns into a payment on its own.

## Why can most working holiday makers not claim it?

Because LITO is a resident concession and working holiday maker income is taxed under its own schedule. A person taxed at 15% from the first dollar under the working holiday maker rates is not being taxed as a resident on that income, and the offset does not attach to it.

That is the honest answer, and it is worth saying plainly rather than hedging. For most people reading this, LITO is not available and no amount of care at lodgement changes it.

## When does it become available?

It becomes available when you are an Australian tax resident for the year, which a minority of working holiday makers genuinely are. Residency is a judgement rather than a technicality, it is not settled by your visa or by anything you can count on a calendar, and it is easy to call wrongly in both directions.

What a resident finding is then worth varies more than people expect. For some it is worth considerably more than LITO, for others LITO of up to $700 is the whole of it, and which outcome applies is assessed case by case when the return is prepared. Our guide to [tax residency](/blog/tax-residency-working-holiday-makers) covers why the question is harder than it looks.

## What can you claim instead?

The relief that reaches working holiday makers comes through exemptions and deductions rather than through the resident offset system. The list is worth knowing, because between them these items are worth considerably more than LITO would have been.

- The [Medicare levy exemption](/blog/medicare-levy-working-holiday-makers), worth about $500 on $25,000 of earnings for someone not entitled to Medicare
- The [small business income tax offset](/blog/small-business-tax-offset-working-holiday-abn) on ABN sole trader income, worth up to $1,000
- Recovery of any period withheld at 45% before your TFN reached the employer
- Work related deductions, which are proportionally more valuable on a working holiday return than on a resident one

The pattern is consistent. Chasing LITO is wasted effort for most people. Chasing the Medicare position and a complete deduction list is where the same attention actually pays.

## What happens if an offset exceeds your tax?

Nothing is paid out. LITO is non-refundable, so if your liability is $500 and the offset is $700, the tax becomes zero and the remaining $200 disappears rather than being refunded.

This is why offsets and refunds are often confused. Your refund comes from the tax already withheld from your pay during the year, not from the offset. The offset reduces the final liability, and reducing the liability is what leaves more of the withheld tax to come back to you.

## Can several offsets apply to the same return?

Yes, and they are calculated separately before being applied against total tax payable. A year with both wages and ABN income can carry the small business offset on the business portion while the Medicare position is handled separately.

The combination is where a return stops being a form and starts being a calculation, particularly where residency changed part way through the year. A part year resident has part of the year under one set of rules and part under another, and the offsets follow the periods rather than the whole.

## What decides your position?

Mostly one question: whether you were an Australian tax resident for the year or any part of it. That is a judgement that turns on details most people never think to check, and what a resident finding is then worth depends on circumstances that are weighed case by case rather than read off a table.

It is not a box you tick with confidence on a first reading. Residency is a holistic judgement with no numeric threshold, which is precisely why it is the item most often answered wrongly on a self lodged return, and why it moves more money than every offset in this guide combined. It is worth resolving properly when the [tax return](/tax-return) is prepared.
`,
 }, {
 slug: "appealing-ato-decision-australia",
 title: "Disagree With the ATO? How to Object",
 description:
 "You can object to an ATO decision for free. The window is two years from a standard income tax assessment and 60 days for most other decisions.",
 category: "Tax Return" as const,
 date: "20 September 2025",
 readTime: 5,
 body: `
You can object to an ATO decision, and it costs nothing to lodge. For a standard individual income tax assessment the window is generally two years from the date on the notice. For most other decisions it is 60 days. Working holiday makers have exactly the same rights as anyone else.

## When is an objection the right tool?

An objection challenges an ATO position you think is wrong on the law or on the facts. It is not the tool for correcting your own mistake, which is an amendment, and confusing the two wastes the deadline on the wrong process.

- An assessment showing tax owed that you believe is incorrect
- A deduction disallowed that you say is legitimate
- A penalty applied where you say it should not have been
- A residency status determined against you
- Income figures in the assessment that do not match your records
- A refund reduced or refused without explanation

The two that come up most often with working holiday makers are residency treatment and refunds assessed before late arriving exemption paperwork, particularly a Medicare Entitlement Statement that turned up after lodgement. Both are routinely successful when documented.

## What deadline actually applies to you?

The deadline depends on the type of decision, and this is where people either panic unnecessarily or miss a genuine cutoff. For an individual income tax assessment the objection period is generally two years from the date of the notice of assessment, which is considerably more room than most people assume they have.

For most other decisions, including many penalty and private ruling decisions, the period is 60 days. If the applicable window has already closed, a late objection can still be lodged with a written explanation for the delay, at the ATO's discretion, and it is always worth asking rather than assuming.

## What makes an objection succeed?

Structure, not eloquence. The reviewer needs to find four things within about a minute, and an objection that buries them in narrative is one that comes back with a request for clarification and loses months.

1. Which decision is being challenged, by notice identifier and date
2. Which specific items are disputed, named precisely rather than as a general disagreement
3. What the correct treatment is, and the rule that supports it
4. The evidence, attached rather than described

The difference between disputing the whole assessment and disputing the residency determination, or the deduction at a named item, is the difference between an objection that is decided and one that is bounced.

## What does it cost?

Nothing to lodge. There is no ATO filing fee for an objection, and the process is designed to be usable without representation. Costs arise only if you engage someone to prepare it, or if the matter eventually escalates to the Administrative Appeals Tribunal, which has its own fee.

That matters for the decision about whether to bother. Where the disputed amount is a few hundred dollars, a free objection is worth lodging and a tribunal application usually is not.

## What happens while the dispute runs?

Interest keeps accruing on any disputed amount through the General Interest Charge, and the ATO can continue collection action unless it agrees to pause it. This is the practical reason not to leave an objection sitting on a hostel desk for three months.

If the objection succeeds, interest and penalties on the disputed portion can be remitted. If it fails, the original amount is still owed plus the interest that accumulated while it was argued. A deferral of collection can be requested while the matter is under review, and it is usually granted where the objection is genuine.

## What if the objection is disallowed?

The ATO issues one of three outcomes: allowed in full, allowed in part, or disallowed, generally within about 60 business days. If it is disallowed, the next step is independent review by the Administrative Appeals Tribunal, and beyond that the Federal Court.

For working holiday makers the tribunal is the realistic ceiling. Federal Court proceedings carry costs that make no sense for an individual refund dispute, and the overwhelming majority of legitimate backpacker disputes end months earlier at a corrected assessment.

## Can you do this after leaving Australia?

Yes, and a good share of them are. Nothing in the objection process requires you to be in the country. Documents are lodged and correspondence handled remotely, which is how objections proceed for people who went home in November and received the assessment in February.

The complication is not the objection, it is the correspondence reaching you. An ATO letter sent to a hostel address you left eight months ago is how a two year window quietly becomes an argument about why you responded late.

## What decides whether you should object at all?

Two things, and the first is whether the ATO is actually wrong. Sometimes it is not, and the honest answer is to accept the assessment rather than spend three months confirming it. Reading the reasoning in the notice before reacting to the number is worth doing.

The second is where the error came from. Most disputes we see trace back to how the original [tax return](/tax-return) was prepared: a residency item answered without thought, a Medicare position taken by default, a deduction claimed without the substantiation behind it. An objection is the expensive way to fix a decision that was made in ten seconds at lodgement, which is the argument for getting the return right the first time rather than the argument against objecting.
`,
 }, {
 slug: "amending-tax-return-australia",
 title: "How to Amend an Australian Tax Return",
 description:
 "An Australian tax return can be amended within two years of the assessment, in your favour or against it. The ATO works to the same two year clock.",
 category: "Tax Return" as const,
 date: "22 September 2025",
 readTime: 5,
 body: `
An Australian tax return can be amended after it has been assessed, generally within two years of the date on the notice of assessment. Amendments run in both directions: you can add a deduction you missed, and you can add income you left out. The ATO works to the same two year clock.

## What is an amendment for?

An amendment is the ordinary way a lodged return gets put right, and it costs nothing to lodge. It is not a dispute and it is not an argument, which is why it is routine, and why most working holiday maker amendments simply produce a larger refund.

- A deduction that was never claimed
- Income from an employer that was left out
- An offset or exemption that was missed
- Figures entered incorrectly
- A Medicare position taken before the paperwork arrived

The last one is the most common single reason we amend a working holiday return. A Medicare Entitlement Statement from Services Australia commonly takes weeks to issue, and a return lodged in the meantime was lodged without it.

## How long do you have?

Two years from the date of the original notice of assessment, for individuals and small businesses. Four years applies to some other taxpayers, and there is no limit at all in cases of fraud or evasion.

Two years is more room than most people assume and less than it sounds when you are in another country. The clock runs from the assessment, not from the end of the financial year, so a return assessed in September 2026 can be amended until September 2028.

## What is the difference between amending and objecting?

They answer different questions and confusing them wastes a deadline. An amendment fixes something that was wrong in the return you lodged. An objection challenges a decision the ATO made about it.

- You forgot the Medicare exemption: amend
- You disagree with how the ATO assessed your residency: object
- The ATO has written proposing changes: respond with records rather than pre-emptively amending

Our guide to [objecting to an ATO decision](/blog/appealing-ato-decision-australia) covers the second path, which has its own deadlines and its own structure.

## What happens to your money?

If the amendment increases the refund, the additional amount is paid to your nominated account, generally within a few weeks to a couple of months. If it reduces the refund, the ATO issues a revised assessment and the difference becomes payable, usually within 21 days.

The second case is worth being unsentimental about. An amendment that adds forgotten income creates a debt, and it is still the right thing to do, because the alternative is the ATO finding it through data matching and adding interest and a penalty to the same amount.

## Does amending draw attention to you?

No, and this is worth saying because the fear stops people claiming money they are owed. Amendments are an ordinary part of the system, and a genuine correction supported by records is not a flag. Voluntary disclosure of an error is treated more favourably than the same error found by the ATO.

What does attract attention is a pattern of large unsupported claims, which is a different thing entirely. A single amendment adding a Medicare exemption or a forgotten set of work boots is invisible.

## Can you amend after leaving Australia?

Yes. Nothing about the process requires you to be in the country, and the two year window applies wherever you are. Amendments are lodged remotely and any additional refund pays into an Australian account.

The account is again the practical constraint rather than the amendment. Where the Australian account has been closed, arranging an alternative payment route adds time to something that would otherwise be straightforward, so it is worth keeping the account alive until the year is genuinely finished rather than until you fly.

## What decides whether an amendment is worth lodging?

Two things: the size of the correction and whether it can be substantiated. An amendment for a $40 deduction with no receipt is not worth the time. An amendment adding a Medicare Entitlement Statement to a year where the 2% levy was charged is worth about $500 on $25,000 of earnings and takes the same effort.

The pattern in the returns we amend is consistent, and it is not exotic. Medicare exemptions unclaimed because the statement arrived late. Deductions overlooked because the receipts were in a different phone. ABN income reported in the wrong place. A period at 45% before the TFN landed that was never recovered. Almost all of them are upward, and almost all of them are from returns that were lodged quickly rather than completely. If you lodged a [tax return](/tax-return) yourself and it did not deal with residency, Medicare and every employer, it is worth a second look while the two years are still open.
`,
 }, {
 slug: "ato-payment-plan-tax-debt-australia",
 title: "Can't Pay Your Tax Bill? ATO Payment Plans",
 description:
 "A tax debt can be put on an instalment plan, but interest keeps running. Leaving Australia clears neither the debt nor the interest that accrues on it.",
 category: "Tax Return" as const,
 date: "30 September 2025",
 readTime: 5,
 body: `
Yes. If you cannot pay an ATO bill by the due date, a payment plan lets you clear it in instalments. Interest continues to accrue through the General Interest Charge, so a plan costs more than paying outright, and considerably less than silence. Tax debts do not lapse when you leave Australia.

## Why does a working holiday maker end up owing at all?

Because something in the year had no tax withheld behind it, and there are only a few candidates. ABN or contractor income is the most common, since the full invoice reached you and nothing was taken out. A declaration on which the tax free threshold was wrongly claimed is the second. A year of cash work with no withholding is the third.

None of those is a mistake you notice at the time. All three feel like slightly more money each week and arrive as a single figure months later, which is why a tax debt for this audience is almost always a surprise rather than a decision.

## What is a payment arrangement, and when will the ATO agree?

A formal agreement to pay in instalments rather than as a lump sum, usually weekly or fortnightly by direct debit, with the debt typically cleared inside two years. While it is in place and being met, it protects you from active collection action.

The ATO generally agrees where the amount is proportionate, where you can show a genuine inability to pay in full, where there is an income source behind the instalments, and where you have not defaulted on a previous arrangement. It is more accommodating to someone who approaches before the due date than to someone it has had to chase, and that difference is larger than most people expect.

## What does it cost to take longer?

The General Interest Charge, which compounds daily on the outstanding balance and is set well above the cash rate. It runs from the original due date rather than from the date the plan starts, so the clock has usually already been going for a while.

There is a separate penalty for lodging late rather than paying late. Failure to lodge is charged at one penalty unit for every 28 days a return is overdue, currently $330, capped at five units or $1,650. That penalty attaches to not lodging, so lodging on time and paying late is a materially cheaper position than doing neither. Our guide to [late lodgement penalties](/blog/late-tax-return-penalty-working-holiday) covers when it is actually applied.

## What happens if you simply leave?

The debt stays and keeps growing. The General Interest Charge continues to accrue, the balance offsets automatically against any future Australian refund, including the final return most backpackers lodge after leaving, and it remains on your ATO record.

That record is the part with the longest tail. An outstanding tax debt is not something you want surfacing against a future Australian visa application, and it is a poor trade for a sum that would have been manageable with a plan. Small balances are occasionally written off, but that is a decision the ATO makes and not one to plan around.

## What should you do before you fly?

Set the arrangement up while your Australian banking still works, because that is the whole difficulty of doing it later. Direct debit from an open Australian account is the mechanism that keeps functioning from overseas, and closing that account is what turns a working plan into an unpayable one.

Check the balance before you go rather than assuming there is nothing there. Hardship and remission requests can be handled by correspondence from another country, but establishing the plan in the first place is far easier from inside Australia.

## Can penalties ever be reduced?

Sometimes, and it is worth asking rather than assuming. Remission is considered for first time errors, genuine misunderstanding of an obligation, serious illness or other extraordinary circumstances, and where you have complied properly since.

Remission is discretionary rather than automatic, and partial remission is a more common outcome than full. What consistently does not help is delay, because the case for a genuine misunderstanding weakens each month you leave it unaddressed.

## What if you think the amount is wrong?

Dispute it rather than paying it, but do both in parallel where you can. An assessment you believe is incorrect can be amended, generally within two years of the original assessment issuing, and a decision you disagree with can be objected to formally.

The trap is that neither step pauses the General Interest Charge by itself. Interest keeps accruing on the disputed amount while the objection is considered, so where the sum is large it is usually worth arranging a plan and disputing at the same time rather than waiting for an outcome. Our guide to [amending a tax return](/blog/amending-tax-return-australia) covers which route applies to which kind of error.

## Short inconvenience or two year arrangement?

Whether a plan is available, and what it will cost, turns on facts specific to your position. A debt of the same size can be a short inconvenience or a two year arrangement depending on the answers below.

- What produced the debt, since ABN income, a wrongly claimed threshold and unlodged years lead to different fixes.
- Whether the return is lodged, because the failure to lodge penalty is separate from the debt itself.
- How large the balance is relative to what you can pay, which decides whether the ATO accepts the schedule.
- Whether an Australian bank account remains open to service the direct debit.
- Whether you are still in Australia, which makes setting the plan up considerably easier.
- Whether any refund from another year is due, since it will offset against the debt automatically.
- Whether there are grounds for remission, which are worth raising early rather than late.

A debt usually starts with a return that was not prepared with the full picture, and the [working holiday tax return](/tax-return) is where the position is put right. You can [estimate your tax refund](/calculator) for other years to see whether an offset is coming.
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

You are paid for output rather than for time, so the money follows what you pick, weigh or pack rather than the hours you stand in the row. Per kilogram of strawberries, per bin of apples, per tray of blueberries, per row weeded, per item packed.

The system rewards speed, which is why farms like it and why experienced pickers often do well out of it. A first week is a different matter: technique takes time to acquire, and someone learning on unfamiliar fruit will pick a fraction of what a returning worker does. That gap between a fast picker and a new one is exactly what the guaranteed floor exists to handle.

## What is the guaranteed floor?

The minimum hourly rate for your classification under the award, applied across the hours you actually worked in the pay period. If your piece earnings divided by your hours come out below it, the employer must top the difference up. This is not discretionary and it is not something a farm can contract out of.

From 1 July 2026 the casual minimum across all work is $33.05 an hour, being the $26.44 national minimum wage plus the 25% casual loading, and award classification rates sit above that. The floor is calculated per pay period rather than per day, so a fast Friday can offset a slow Tuesday within the same period, but the period as a whole has to clear the line.

## How does the top up calculation work?

Total your piece earnings for the period, total the hours worked, and divide one by the other. If the result is below the applicable hourly minimum, the shortfall is the difference between what the hours should have paid and what the pieces did pay.

Worked at $33.05 an hour, the arithmetic is straightforward. Twenty hours at that rate is $661.00. If those twenty hours produced $400 in piece earnings, the effective rate was $20.00 an hour and the employer owes a top up of $261.00 for that period. An employer who pays only the $400 is in breach of the Fair Work Act, whatever was agreed verbally beforehand.

## What is wrong with a verbal piece agreement?

It is not valid. Piece rate agreements under the Horticulture Award must be in writing, and a rate offered across a shed floor as four dollars a tray, take it or leave it, fails the award at the point of formation rather than on the arithmetic afterwards.

That matters practically as well as technically. A written agreement records what the rate is, which stops it moving downwards mid season, and it is the document that makes a later claim straightforward. Where no written agreement exists, the ordinary hourly rate applies by default, which is usually better for the worker than whatever was said out loud.

## Which practices should you watch for?

The ones that reduce your recorded output or your recorded hours without reducing the work. Each of these is common enough in horticulture to be worth checking specifically rather than assuming.

- Undercounting, where the tally or weight recorded is below what you actually picked
- Unpaid sorting, packing or setup time, which is working time and counts towards the hours in the calculation
- Deductions for accommodation, transport or meals that push the effective rate below the minimum
- No top up applied at all, which is the single most common breach in piece rate work
- Rows or blocks allocated so sparsely that the target is unreachable, which does not remove the floor

## How do you audit your own week?

Keep a daily log, because the guarantee only protects pickers who can show what happened. Record start and finish times, breaks, and the units picked or the tally tickets issued, and photograph anything the farm writes down before it goes into a drawer.

At the end of the period, run the two numbers. Earnings divided by hours gives your effective rate; comparing it with the hourly minimum for your classification gives the shortfall. Persistent results below the floor mean one of two things: the rate per unit was set too low to be lawful, or the conditions made the target impossible. Either way the conversation starts with your log, and the Fair Work Ombudsman recovery process runs on exactly that evidence. Our guide to [wage theft and recovery](/blog/wage-theft-working-holiday-australia) covers where it goes from there.

## How is piece rate income taxed?

Exactly like any other employment income, which surprises people who assume the unusual payment method changes something. PAYG is withheld at 15% with your TFN on file, 12% [super](/superannuation) is paid on top of gross earnings, and the whole amount appears in your income statement and on your [tax return](/tax-return).

The one branch that does change things is whether you are an employee at all. Piece rate work engaged through an [ABN](/abn) has nothing withheld, attracts no super, and carries no guaranteed floor, which is precisely why some operators prefer it. Whether that classification is genuine depends on how the work runs rather than what the paperwork says, and our guide to [farm work and ABNs](/blog/farm-work-and-abns) sets out the test.
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

The agency, in every respect that matters. It pays you, it withholds your tax, it owes your [super](/superannuation), it issues your payslips and it carries the obligations under the award. The host business tells you what to do and where to stand, and owes you none of those things.

That split is why agency arrangements go wrong more often than direct employment. When pay is short, the host says talk to the agency and the agency says the host sets the hours, and a worker with no written terms has nobody obviously accountable. Establishing in writing who your employer is, before you start, removes most of that problem before it arises.

## What does agency work get you?

Speed, mainly, and it is a real advantage rather than a marketing one. Agencies place workers within days rather than weeks, cover several industries at once, and require far less than a direct hiring process, which matters when you have just arrived somewhere and need work this week rather than next month.

They also handle the payroll mechanics across multiple placements, so three different host sites in a month still produce one employer, one TFN declaration and one super fund rather than three of each. For someone moving around Australia that genuinely simplifies the year, and it is the reason so many backpackers use them despite the risks below.

## Where does agency work go wrong?

In deductions, mostly. Charging for accommodation and transport is lawful where it is agreed in writing and reasonable, and it becomes wage theft the moment the deductions bring your effective rate below the minimum. Bundled packages where a weekly figure is taken for a room and a van seat, with no itemisation, are where exploitation in this sector concentrates.

The other failures are recognisable once you know to look. Being put on an ABN as a contractor when the work is plainly employment, penalty rates never applied to weekend shifts, payslips not issued at all, and wages withheld until you complete a placement, which is not lawful at any point. If an agency tells you different rules apply to labour hire, that is simply untrue: the Fair Work Act applies in full.

## What are you actually entitled to?

Exactly what you would get working directly for the host, with no discount for the arrangement. That includes the award rate for the classification the host site work falls under, penalty rates for weekends, public holidays and overtime, and payslips within one working day of each pay.

- The award rate for the work, with the casual floor from 1 July 2026 being $33.05 an hour
- 12% super into your nominated fund
- Payslips itemising hours, rate, tax and deductions
- Written terms before you start a placement
- A safe workplace, which is the host's duty as well as the agency's

## Is the agency licensed?

Worth checking before you sign anything, because several states now require it. Victoria, Queensland, South Australia and the Australian Capital Territory operate mandatory labour hire licensing schemes with public registers, and operating without a licence in those jurisdictions is an offence.

A licence is not a guarantee of good behaviour, but its absence in a state that requires one tells you a great deal quickly. Combined with the basics, whether they pay into a known super fund, whether the terms come in writing, whether payslips are itemised, whether payment arrives on the same day each cycle, it is enough to sort the legitimate operators from the rest in an afternoon.

## What should you ask before you sign?

Five questions, and the answers should come in writing rather than across a counter. An agency that cannot or will not answer them is telling you something more useful than any answer would have been.

- Are you licensed, and in which state
- Who pays my super, and into which fund
- Which award and classification covers the work at the host site
- Will payslips be itemised by site and shift
- What deductions will be taken, and at what rate

Deductions are the one to press on. Transport and housing packages are where the money goes, and a figure quoted per week rather than per item is the shape that makes underpayment hard to see.

## What if you think you are being underpaid?

Work out your effective rate first, because that is the number any claim turns on. Total everything you were actually paid across a pay period, including any top ups, divide it by the hours you genuinely worked including unpaid waiting time, and compare the result with the award rate for the work.

If it falls short, the claim is against the agency rather than the host, which is the practical consequence of the employment relationship set out at the top. The Fair Work Ombudsman handles underpayment complaints without charge, unpaid super goes to the ATO instead, and being on a 417 or 462 visa does not weaken either. Our guide to [wage theft and recovery](/blog/wage-theft-working-holiday-australia) covers what evidence makes a claim work.
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

Because it is the only place where the hours, the rate, the tax and the super appear together, and because it is the evidence if any of them turns out to be wrong. Your bank statement shows one number and tells you nothing about how it was arrived at.

It is also the record that disappears first. Payslips delivered through a rostering app or a work email vanish the moment your employment ends, often before you have thought about needing them, and reconstructing a year of pay without them is far harder than saving each one as it arrives. Emailing them to yourself as they come is thirty seconds a fortnight and is the single most useful habit on this page.

## What should gross pay look like?

Your hours multiplied by your rate, plus penalty rates for weekend, evening, overtime or public holiday work, plus any allowances the award attaches to the job. Check this line before anything else, because every other figure on the payslip is calculated from it and a wrong hours figure makes everything below it wrong too.

The check worth doing is against your own record of hours rather than against the roster, since the two often differ. Time spent setting up before a shift or cleaning down after it is working time, and it is where hours quietly go missing. A week that included a Sunday should look materially different from one that did not, and if every hour on the payslip is paid at the same rate across a week with weekend work in it, the award is not being applied.

## How do you check the tax line?

Divide tax withheld by gross pay. For a working holiday maker whose Tax File Number Declaration has been processed and whose employer is registered, the answer should be close to 15%.

Anything materially above that has a specific cause, and each one is worth identifying because they are fixed differently.

- Around 45%: your TFN is not yet recorded with that employer, usually because the declaration form has not been processed
- Around 30%: the employer is not registered with the ATO as a working holiday maker employer
- Well below 15%: the tax free threshold may have been claimed in error on the declaration, which produces a bill later rather than a refund

None of the over-withholding is lost, since it is credited back when the [tax return](/tax-return) is lodged, but the money sits with the ATO until then. That is why a wrong rate is worth raising in the first fortnight rather than at the end of the year.

## How do you check the super line?

Divide the super figure by gross pay and expect 12%, which has been the rate since 1 July 2025. Super is paid by the employer on top of your wages, so it should never reduce your net pay, and a payslip where super appears to come out of your earnings is showing something that needs a question asked about it.

The important distinction is between accrued and paid. A super figure on a payslip records what the employer owes for that period, not what has reached your fund, and the two are separated by up to three months because super is paid quarterly. Checking the fund itself after each quarterly deadline is what tells you whether the money actually arrived. Our guide to [unpaid super](/blog/super-employer-not-paying-what-to-do) covers what to do when it has not.

## What does net pay tell you?

Whether the arithmetic holds together. Net pay is gross pay minus tax withheld and any lawful deductions, and it should match the amount deposited in your account to the cent. Super does not appear in this calculation at all.

Where a deduction has been taken, for accommodation or equipment or anything else, it has to be shown on the payslip, agreed in advance and lawful. An unexplained gap between gross less tax and what actually landed is the clearest sign of an unlawful deduction there is, and it is visible in one subtraction.

## What are the year to date figures for?

Tracking your position without waiting for July. Most payslips carry cumulative year to date totals for gross pay, tax withheld and often super, running from 1 July, and they let you see the shape of your year while there is still time to correct it.

They are also a cross check against the income statement your employer eventually files with the ATO. If the year to date gross on your final payslip and the figure that appears in your income statement do not agree, one of them is wrong, and having the payslip is what lets you say which.

## What if your employer does not issue payslips at all?

That is a breach in itself, and it is rarely the only one. Australian employers must issue a payslip within one working day of paying wages, in electronic or hard copy form, whether or not the employee asks for one.

In practice, no payslips means no record of hours, rate, tax or super, which is exactly the position an employer avoiding those obligations wants you in. Keep your own dated record of hours worked from that point on, save every bank deposit, and treat the absence as the warning sign it is. Our guide on [an employer not paying correctly](/blog/employer-not-paying-correctly) covers where that goes next.
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

Anything that leaves you below the rate the award or the national minimum sets for the hours you actually worked. It is a wider category than a low hourly rate, and several of the most common forms look like something else entirely at the time.

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

Then check the pattern rather than the total. Penalty rates mean weekend and public holiday hours should pay a multiple of the ordinary rate, so a payslip where every hour is paid identically across a week that included a Sunday is showing you something wrong even if the average looks acceptable. Our guide to [penalty rates](/blog/penalty-rates-australia) sets out the multipliers by day and by award, and the [award classifications](/blog/award-classifications-working-holiday-australia) guide covers finding the right rate for the work you actually do rather than the job title you were given.

## What should you do about it?

Raise it in writing first, because most claims that go anywhere start with a paper trail rather than a confrontation. A short message setting out the hours, the rate paid and the rate you believe applies gives a genuinely mistaken employer a way to fix it and gives a deliberate one something they now have to answer.

If that fails, the Fair Work Ombudsman handles underpayment complaints without charge, and being on a 417 or 462 visa does not weaken the claim. The branch point worth understanding is that super goes somewhere else: unpaid super is recovered by the ATO through the [Superannuation Guarantee Charge](/blog/what-is-superannuation-guarantee-charge), not by Fair Work, so a job with both problems produces two separate claims. Staying employed while you raise it makes the case stronger where that is safe, because the pattern of shifts continues to build evidence.

## Will reporting it affect your visa?

Reporting an employer for underpayment does not put your working holiday visa at risk. That fear is the single most effective thing keeping underpaid backpackers quiet, and it is not founded on anything in Australian law.

The protections are deliberate rather than incidental. Workplace complaints made in good faith do not trigger visa review, an employer has no power over your visa status whatever they imply, and the Workplace Justice visa arrangements exist specifically so that temporary visa holders can pursue exploitation claims without their immigration position being used against them. The people who benefit from you believing otherwise are the employers doing it.

## What records make a claim work?

Anything that ties hours to money, kept somewhere the employer cannot take away. The strength of an underpayment claim is almost entirely a function of evidence, and the evidence is easiest to gather while you are still there.

- Every payslip, saved as a file rather than left in a work app
- The published roster, and your own note of the hours you actually worked
- Any contract or letter of offer, however informal
- Text messages and emails about pay, shifts and deductions
- Super fund statements showing what arrived and when
- Bank statements showing what was actually deposited

A daily note of start and finish times takes seconds and is the record that most often decides a dispute, because without it the argument reduces to your word against a payroll system. Photograph or save everything as you receive it rather than at the end.

## Can you still recover after leaving?

Yes, and this is worth knowing before you write the money off. Underpayment claims through the Fair Work Ombudsman and unpaid super reports to the ATO both survive your departure from Australia, and neither requires you to be in the country to pursue them.

What gets harder is evidence and contact. Rosters and payslips left in a system you no longer have access to are difficult to retrieve from another continent, and an Australian bank account closed on the way out complicates payment of anything recovered. Both are cheap to sort out in your last fortnight here and expensive to fix afterwards.
`,
 },

 // ─── TAX - BATCH 2 ─────────────────────────────────────────────────────────
 {
 slug: "backpacker-tax-history-australia",
 title: "The Backpacker Tax: From High Court to 15%",
 description:
 "The 15% backpacker tax started in 2017 and was tested in the High Court in 2021. The rate survived, with consequences that are still assessed case by case.",
 category: "Tax Return" as const,
 date: "14 October 2025",
 readTime: 6,
 body: `
The backpacker tax is the flat rate applied to subclass 417 and 462 income: 15% on the first $45,000, with no tax free threshold. It has been that rate since 1 January 2017. The part that still decides individual cases is what the High Court said about it in 2021, and that turns on your passport.

## What is the rate today?

Fifteen per cent from the first dollar up to $45,000, then the foreign resident scale above it. Both visa subclasses are treated identically, and almost every working holiday maker earns inside the first bracket, so 15% is the number that matters in practice.

The absence of a tax free threshold is the structural feature that separates this from ordinary Australian taxation. A resident pays nothing on the first $18,200; a working holiday maker pays 15% on it. That single difference is worth about $2,730 a year to anyone it applies to, which is why the residency question below is not academic.

- 15% on income up to $45,000
- 30% from $45,001 to $135,000
- 37% from $135,001 to $190,000
- 45% above $190,000

## What was the position before 2017?

Residency decided everything. A working holiday maker assessed as an Australian tax resident paid ordinary resident rates with the $18,200 threshold, and one assessed as a non-resident paid 32.5% from the first dollar, so two people doing identical work could face very different bills. Which side a given backpacker fell on was a judgement, and it was contested then for the same reasons it is contested now.

A large number of backpackers did qualify as residents, and the government regarded the resulting low tax bills as an unintended outcome rather than a policy. That view is what produced the 2016 proposal.

## How did the 2017 rate come about?

As a compromise after a fight. The government's original 2016 proposal was to tax all working holiday maker income at 32.5% from the first dollar by deeming every backpacker a non-resident, and the response from agriculture and tourism was immediate, because harvest labour in particular depends on people for whom that rate would have changed the arithmetic of coming at all.

The settlement was the 15% rate from 1 January 2017. It did not arrive alone: the same package raised the Departing Australia Superannuation Payment rate for working holiday makers from 35% to 65%, leaving 35% in place for other temporary visa holders such as students. So the concession on wages was paid for on the [super](/blog/tax-on-super-withdrawal-backpacker) side, and it still is.

## What did the High Court decide in Addy?

That the 15% rate could not lawfully be applied to the particular taxpayer before it. In *Addy v Commissioner of Taxation* [2021] HCA 34 the High Court found for the taxpayer on grounds that turn on how an individual's whole year is assessed, which is precisely why the decision cannot be read as a general rule about backpacker tax.

The case ran for years and did not go one way throughout: the taxpayer succeeded at first instance in 2019, lost in the Full Federal Court, and won in the High Court in 2021. The legislation was not amended afterwards, so the position stands as the court left it and is applied case by case rather than through a change in the rate.

## Who does Addy actually help?

Fewer people than the headlines suggested, and rarely the people who assume it covers them. Whether the decision reaches a particular working holiday maker depends on an assessment of their whole year, and that assessment goes wrong in both directions when people attempt it on their own.

The analysis usually stops too early for people who read about the case and expect a refund. The question is a judgement about your own circumstances, turning on details most people never think to check, and it is not something the rate table or the case name can answer. A position is taken only after the year has been gone through in full.

## What does any of this change on your return?

For most people, nothing, and it is worth saying so plainly. Most working holiday makers are not Australian tax residents, the 15% rate applies, and the refund comes from over-withholding and the Medicare levy exemption rather than from *Addy*.

Where it does change things it changes them substantially, and in ways that differ from person to person for reasons that are not obvious from the outside. That is the branch worth having checked before a [tax return](/tax-return) is lodged, because amending later is harder than getting it right once, and the position taken has to be one that can be defended.
`,
 }, {
 slug: "how-to-check-super-balance-working-holiday",
 title:
 "How to Check Your Super Balance on a WHV",
 description:
 "Your super sits with a fund, not with your employer. Contributions are paid quarterly, so a balance can look empty months after the work was actually done.",
 category: "Super" as const,
 date: "16 October 2025",
 readTime: 4,
 body: `
Your super balance sits with the fund your employer paid into, and you reach it with the member number that fund sent you. What decides whether the balance you see is the whole balance is how many jobs you have had, because each employer opened another account.

## Why does the balance need checking at all?

Because super is the only money you earn in Australia that never appears in your bank account. It is paid on top of your wages, straight into a fund, quarterly rather than per pay, so nothing about your day to day banking would ever tell you it is short.

That is also why unpaid [super](/superannuation) goes unnoticed for so long. An employer who underpays wages gets found out within a fortnight because the deposit is visibly wrong. An employer who never pays super can go a full season without anyone noticing, and for a working holiday maker the discovery usually comes at the point of leaving, when it is hardest to chase.

## When should contributions actually appear?

After the quarterly deadline, not after each payday. Employers are required to pay super quarterly, so a gap of up to three months between working and seeing the money in your fund is completely normal and is the single most common reason people think super is missing when it is not.

The four deadlines are 28 October for the July to September quarter, 28 January for October to December, 28 April for January to March, and 28 July for April to June. Money generally lands in the fund within a few days either side. A quarter still empty a week or two after its deadline is the point at which the gap is real, and that is when comparing the payslip line against the fund statement becomes worth doing.

## What if you do not know which fund you are with?

You almost certainly do have one, and there are three places the name is written down. Your payslip carries the fund name and often the member number, which is the fastest route. Your email will have a welcome message from the fund, filed under a name you may not recognise as a super fund at the time. And the ATO holds a record of every fund that has ever received a contribution against your TFN.

That last one is the important one for anyone who has worked several jobs, because it is the only source that shows accounts you have forgotten. Australian funds most working holiday makers end up in are the large industry funds tied to hospitality, retail and construction, and a year of moving between jobs commonly produces three or four separate accounts without a single deliberate decision being made.

- The super fund name and member number printed on any payslip
- The welcome email sent when the account was opened
- ATO records, which list every fund holding money against your TFN
- Old super moved to the ATO as unclaimed money, which still belongs to you

## Why do multiple accounts cost you money?

Because each one charges its own administration fees and often its own insurance premiums, deducted from a balance that is not growing between jobs. Four small accounts sitting idle for six months lose more to fees in total than one account holding the same money, and on backpacker sized balances the proportion lost is significant.

Whether consolidating is the right move depends on your timing. If you are staying and working, [combining the accounts](/blog/super-multiple-funds-consolidation) stops the duplicate fees. If you are leaving within weeks, the accounts are all going to be claimed through DASP anyway and consolidating first can delay the claim rather than help it. The one thing that is always wrong is leaving an account you have forgotten about, because that is how super ends up transferred to the ATO as unclaimed money and quietly left behind.

## What should be confirmed before you claim DASP?

That every account has been found and that the final quarter has actually been paid. A Departing Australia Superannuation Payment claim closes the account it is made against, so any contribution that arrives after the claim has to be chased separately, and the last quarter of work is the one most likely to still be outstanding when someone leaves.

The timing question is the branch point. If you finish work in May and fly home in June, the April to June contribution is not due until 28 July, so claiming immediately means claiming before your own employer is required to pay. Waiting until after the deadline usually collects more, which has to be weighed against the [65% withholding](/blog/tax-on-super-withdrawal-backpacker) applied to the payment either way and the roughly 28 days a DASP approval takes once lodged.
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

An electronic match against immigration records rather than a human reading your documents. Nothing is uploaded, so the application succeeds or fails on whether the fields you typed line up exactly with what the government already holds about you.

That explains the failure pattern. Middle names left out, hyphens and accents dropped, a transliterated name entered the way people say it rather than the way the passport prints it, a passport renewed after the visa was granted. Each is a mismatch to the system even though it is obviously the same person to you.

## What are the four causes worth checking first?

Most rejections resolve into one of four, and identifying which one you have decides the route back rather than simply prompting a retry.

- A typing error in the passport number, name or date of birth. Correct it and reapply with the details exactly as printed.
- Applying before your arrival was recorded. If you applied within hours of landing, the movement record may not have existed yet, and waiting a few days is the fix.
- A visa not yet activated by entering Australia, which is a timing problem rather than a data one.
- A TFN that already exists from an earlier visa. This is not a rejection so much as a recovery, and creating a second number would be the wrong outcome.

That last one matters most for anyone returning to Australia. A TFN is permanent and lifetime, so the right step is to [find the existing number](/blog/how-to-find-lost-tfn) rather than to apply again and generate a duplicate trail that causes its own delays.

## What is it costing you while it is unresolved?

Thirty cents in every dollar, for as long as it lasts. Without a valid TFN on file your employer withholds 45% instead of 15%, which on a $1,000 week is $300 a week held back rather than paid.

The money is not lost. It is credited when the return is lodged, so the cost is timing rather than amount, and for someone paying rent weekly the timing is the part that matters. That is the only real argument for resolving a rejection quickly rather than leaving it until the end of the year.

## Does the rejection also affect the declaration you gave your employer?

Yes, and this is the part people miss. The Tax File Number Declaration records an application in progress and keeps you on the working holiday rate through a 28 day window. A rejection restarts that clock, and once the window has passed the employer must withhold at 45% regardless of what you told them.

So tell the employer that the application was rejected and is being resubmitted, and update the declaration when the number issues. Our guide to the [Tax File Number Declaration form](/blog/tax-file-number-declaration-form) covers what payroll actually needs.

## Is a phone call better than another online attempt?

For some causes, yes, and knowing which is the useful part. A straightforward typing error is fixed fastest by reapplying cleanly. A name mismatch, a married name, a transliteration, or a suspected duplicate is usually better handled by speaking to the ATO, because an officer can reconcile records that an automated check cannot.

Have the reference number from the original confirmation email available. Every route runs faster with it, and it is the one thing people routinely delete.

## What should you do once the number finally issues?

Give it to every employer separately on a fresh declaration, then check the next payslip rather than assuming payroll updated. And treat the number the way you would treat a bank account number from then on.

Working holiday makers are targeted for TFN theft specifically, because a stolen TFN allows a fraudulent return to be lodged with the refund directed elsewhere, and the victim often only discovers it when their own return is rejected as a duplicate. Anyone offering tax help who cannot show a registration on the government's public register of tax practitioners should not receive your documents.

## Which of the four caused yours?

A rejection is a data problem, and which data caused it decides both the fix and how long it takes. The points below narrow it to one cause, and the cause decides whether you reapply, wait, or recover an existing number.

- Whether your full name was entered exactly as the passport prints it, middle names and hyphens included.
- Whether your passport was renewed after the visa was granted, which produces a number that no longer matches.
- How soon after arriving you applied, since the movement record has to exist first.
- Whether you have held a TFN before, in which case recovery rather than reapplication is the correct route.
- Whether the employer's 28 day declaration window has already expired.
- How many weeks of 45% withholding accumulate before it is resolved, which is what the eventual refund is made of.

Everything over withheld during the delay comes back through the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know how long the period ran.
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
For most working holiday makers, the passport that carries the visa is the whole document requirement. Nothing is uploaded. The application verifies your passport electronically against immigration records, so what matters is not which documents you hold but whether what you type matches what the government already has.

## What does the application actually ask for?

Identity details rather than evidence. Your full legal name exactly as printed on the passport, date of birth, country of citizenship and country of birth, the passport that carries your current 417 or 462 visa, your date of arrival on that visa, an Australian residential address, and contact details.

The absence of an upload step is the thing to understand. There is no officer reading your visa grant notice. There is an automated match, and it either succeeds or it does not, which is why a detail that looks trivial to you can stop the application entirely.

## Which passport, if you hold more than one?

The one you entered Australia on and the one the visa was granted against. Dual nationals routinely apply with the passport they think of as their main one and are matched against nothing, because the immigration record is attached to the other document.

The same trap catches anyone who renewed a passport after the visa was granted. The new booklet has a new number, the visa record still carries the old one, and the match fails on a document you are holding in your hand.

## What address should you give?

Somewhere mail will reliably reach you in a month, because the TFN arrives as a physical letter and a returned letter restarts the wait rather than being forwarded. A rental or share house, a friend or relative, a hostel where you have permission to receive mail, or a workplace with the employer's agreement all work.

A hostel you are leaving in ten days does not, and this is the most common self inflicted delay on the whole process. If you move before the letter arrives, updating the address with the ATO is possible, and our guide to [updating your address with the ATO](/blog/how-to-update-address-with-ato) covers what that involves.

## What happens with names that are not simple?

They are the leading cause of rejection, and the reason is mechanical rather than discriminatory. Hyphens, apostrophes, accented characters, multiple middle names, transliterated names and married names all create differences between how a name is printed, how it was recorded at the visa stage, and how a person naturally types it.

If the passport reads Francois with a cedilla and Muller with an umlaut, entering the unaccented forms is a mismatch to a system that is comparing strings. So is dropping a middle name that appears on the visa grant. Enter it character for character as printed and resist the urge to tidy it.

## When does the ATO ask for more?

When the automated match fails. Then the conversation moves to documents, and depending on the cause the ATO may ask for certified copies or for in person identity verification at a service centre.

That path is available but slow, particularly from overseas, which is the practical argument for applying early in your stay rather than later. A name complication that is a phone call while you are in Australia becomes international correspondence once you have gone.

## What does a delay actually cost?

Thirty cents in every dollar you earn in the meantime. Without a TFN on file the employer withholds 45% instead of 15%, which on a $1,000 week is $300 held back rather than paid, and it continues until the number is recorded.

The 28 day declaration window is the mitigation. Telling your employer the application is in progress, and having that recorded on the Tax File Number Declaration, keeps you on the working holiday rate through the window. Everything over withheld is recovered at assessment, so the cost is timing rather than amount.

## What should you do with the number once it arrives?

Give it to every employer separately, and then protect it. Working holiday makers are specifically targeted for TFN theft, because a stolen TFN allows a fraudulent return to be lodged with the refund sent elsewhere, and the victim usually finds out when their own return is rejected as a duplicate.

Never send a TFN, passport or visa grant to anyone who cannot show a current registration on the government's public register of tax practitioners. People presenting themselves as accountants in backpacker groups and messaging apps are a recurring problem, and a verifiable registration number is the whole test.

## Will yours clear on the first try?

The documents are the same for everyone. Whether the application clears first time depends on details specific to you. Each of the points below is a common failure and each is avoidable before you press submit.

- Whether the passport you apply with is the one the visa was granted against.
- Whether that passport has been renewed since the visa was granted.
- Whether your name contains characters or middle names that were recorded differently at any stage.
- Whether your arrival has been recorded, which it may not be if you apply within hours of landing.
- Whether the postal address will still be yours in a month.
- Whether you have held a TFN before, in which case recovery rather than a fresh application is correct.

Anything over withheld during the wait comes back through the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know how long the period ran.
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
Five parties may ask for your TFN: your employer once you have started, your bank, your super fund, your tax agent, and government agencies administering payments you are entitled to. Nobody else has any right to it. Anyone outside that list asking for it is either mistaken or attempting fraud.

## Why is a TFN worth stealing?

Because it is permanent and it unlocks money in your name. Someone holding your TFN plus basic identity details can lodge a return as you and direct the refund to their own account, attempt to access your superannuation, or create ABN registrations linked to you.

The damage is slow to unwind precisely because the number cannot simply be cancelled like a card. It is a lifetime identifier, and a fraudulent return lodged in your name usually only surfaces when your genuine return is rejected as a duplicate, months later, with the refund frozen while it is investigated.

## Why are working holiday makers targeted specifically?

Because they are new to the system, unsure what normal looks like, and moving through environments built on informal trust. Hostels, backpacker Facebook groups, WhatsApp communities and noticeboards are exactly where someone unfamiliar with Australian tax will look for help, and the people offering it are not screened.

The pattern is consistent. An offer to lodge your return or claim your super for a small fee, a request for a photo of your passport and visa grant, your TFN, date of birth and address, and sometimes bank details. Then the return is lodged with the refund pointed elsewhere and the account disappears.

## What are the warning signs?

The first one settles most cases on its own: no verifiable registration on the government's public register of tax practitioners. Registration is public, checkable in under a minute, and anyone unwilling to give you a number has answered the question.

- Payment requested in cash, cryptocurrency or gift cards
- No business address, operating only through a messaging app
- A large refund promised before anyone has looked at your circumstances
- A request for your account passwords, or to share your screen
- Pressure to act immediately, usually invoking a deadline

The password request deserves emphasis. A registered agent reaches your records through their own agent channel and never needs your myGov credentials. Anyone asking for them is not operating as an agent whatever they call themselves, and that single question is the cleanest test available.

## How did the leak usually happen?

Rarely through anything sophisticated. The recurring causes are job scam onboarding forms that ask for full identity documents before any work exists, documents photographed or left on shared hostel computers, and TFNs sent over WhatsApp to someone described as payroll.

The common thread is a request that seems administratively normal arriving at a moment when you have no basis for comparison. That is why knowing the list of five is more protective than any amount of caution, because it converts a judgement call into a fact check.

## What do you do if it has already happened?

Act the day you suspect it rather than waiting for evidence. Contact the ATO's client identity support line and tell them you have a compromised TFN. They can place a marker on your record that requires additional verification before anything is processed in your name, and in some circumstances issue a new number.

Then secure everything attached to it. Change your myGov credentials and enable the strongest sign in available, notify your superannuation fund because balances are a target in their own right, and check whether a return has already been lodged in your name for the current year. The marker costs nothing and remains protective for years.

## What if a fraudulent return was already lodged?

The genuine return still gets lodged and the refund is still yours, but it moves onto a slower path while the duplicate is investigated. That is a delay of months rather than a loss, and it is resolved through the ATO rather than through the police in most cases.

Report it, keep every piece of correspondence, and expect additional identity verification on everything that follows. This is one of the situations where being outside Australia makes the process materially harder, which is an argument for checking before you leave rather than after.

## How exposed are you right now?

The protective rules are the same for everyone. Your exposure is not. The points below are worth checking now rather than after something has happened, because remediation from overseas is considerably slower.

- Whether you have ever sent identity documents to someone you could not verify.
- Whether your myGov account uses a phone number that still works, since a dead Australian SIM locks you out of your own record.
- Whether super fund contact details are current, because funds are a separate target.
- Whether you have already left Australia, which makes remediation slower.
- Whether a return has been lodged in your name this year that you did not lodge.
- Whether any ABN is registered against your details that you did not register.

Returns lodged as part of the [working holiday tax return](/tax-return) go through a verifiable professional channel rather than an anonymous account, and you can [estimate your tax refund](/calculator) yourself before dealing with anyone at all.
 `,
 }, {
 slug: "who-can-ask-for-your-tfn",
 title:
 "Who Can Legally Ask for Your TFN?",
 description:
 "Only six groups may lawfully ask: your employer, the ATO, your super fund, your bank, a registered tax agent and Services Australia. Not hostels.",
 category: "TFN",
 date: "29 July 2026",
 readTime: 6,
 body: `
Six groups may lawfully ask for your Tax File Number: your employer once you are hired, the ATO, your superannuation fund, your bank, a registered tax agent acting for you, and Services Australia if you are claiming a payment. Everyone else may ask, and you may refuse, and refusing cannot lawfully be held against you.

## Why is the list this short?

Because a TFN plus a passport is a workable identity kit, and Australian privacy law treats it accordingly. Collection is restricted to organisations with a genuine tax reason to hold it, and each of them has to explain why it needs the number, store it securely and use it only for that purpose.

The short list is the protection. It means you never have to judge whether a request is reasonable. If the asker is not on the list, the answer is no, and no explanation is required.

## When is your employer entitled to ask?

After you have been hired, not before. The legitimate request comes as a Tax File Number Declaration during onboarding, which is a standard ATO form, and the employer uses the number to apply the correct 15% working holiday maker rate and to report your income.

A request before you have accepted a job is the warning sign, and it is the single most common way backpackers get caught. A recruitment agency does not need your TFN to put you forward for work, and a job that does not exist yet cannot have payroll paperwork. If you have not accepted an offer, there is nothing to complete a declaration for.

## Who is not entitled to it?

Anyone whose reason for wanting it is not tax. In practice the requests working holiday makers actually receive come from a fairly predictable set.

- Landlords and real estate agents, including on rental applications
- Hostels, for any purpose
- Phone, internet and utility providers
- Recruitment agencies, before you have been hired
- Other travellers, friends, or anyone in a group chat
- Anyone offering tax help who cannot produce a current registration

Refusing any of these is not a criminal matter and cannot lawfully be used to deny you a tenancy, a service or a job.

## What do the scams actually look like?

They are not sophisticated and they do not need to be, because they target people in their first weeks in a new country who do not yet know what normal looks like. The recurring shapes are worth recognising on sight.

**The fake job.** An offer that arrives unprompted, asks for your TFN and a photo of your passport before any interview, and never proceeds to actual work. The output is an identity kit, not a job.

**The social media refund agent.** An account offering to lodge your return, asking for your TFN and your government account login, and frequently promising a figure before seeing any of your income. Returns are lodged to bank accounts the victim does not control.

**The hostel noticeboard payroll form.** A paper form collecting TFNs for cash work that never materialises, left where a hundred people will fill it in.

The consistent tell is a promise of a specific refund amount before anyone has seen your income statements. Nobody can know that number in advance, and anyone claiming to is not doing tax work.

## How do you check someone before handing anything over?

Every tax agent operating in Australia is on the government's public register of tax practitioners, and it is searchable. The check takes a minute and it settles the question, and a legitimate practice will expect you to do it.

Two things a genuine agent will never need are your government account password and your bank login. Access to your ATO records is obtained through a professional channel, not by logging in as you, and any request for those credentials is a fraud regardless of how the rest of the conversation has gone. Returns prepared for you here are reviewed and signed off by a registered tax agent before lodgement, and that registration is checkable on the same public register.

## What if you have already given it to the wrong person?

Nothing catastrophic happens automatically, and a TFN alone is not enough to empty a bank account. The risk is a fraudulent tax return lodged in your name, or an account opened using your identity, and both are detectable.

The ATO can place a flag on your record after an identity compromise, which is worth doing rather than waiting to see. Contact it on 13 28 61 and say plainly what was disclosed and to whom. If you also handed over a government account login, change it before you do anything else.

## Is the request in front of you legitimate?

The list of who may lawfully ask is fixed, but whether a particular request is legitimate turns on context. These are the circumstances that decide it in practice.

- Whether you have accepted the job yet. This is the whole test for an employer request.
- Whether the person asking is a registered practitioner, which is checkable in a minute on the public register.
- Whether anyone has your government account credentials as well as your TFN, which is a materially worse situation than the TFN alone.
- Whether you are claiming a Services Australia payment, which is the one government context outside the ATO where the request is legitimate.
- Whether you gave it to a super fund. That one is not a risk, it is necessary, and a fund without your TFN taxes contributions at a higher rate and struggles to match the account to you when you [claim your superannuation after leaving Australia](/superannuation).
 `,
 }, {
 slug: "tfn-australian-address-no-fixed-address",
 title:
 "No Fixed Address? How to Get a TFN Anyway",
 description:
 "Your TFN arrives as a letter, so you need an Australian address that holds mail for about four weeks. A hostel, a friend's place or a PO box all work.",
 category: "TFN",
 date: "29 October 2025",
 readTime: 5,
 body: `
A TFN application needs an Australian address because the TFN arrives as a posted letter. It does not need a lease. A hostel, a friend's place, a workplace or a mail holding service all work, provided mail is reliably collected for about four weeks after you apply.

## What does the ATO accept as an address?

The ATO asks for an Australian residential or postal address and does not verify that you live there. What it needs is somewhere a letter from Australia Post will be collected rather than returned to sender, which is a lower bar than most applicants assume.

- A rental, share house or sublet
- A hostel or backpacker accommodation
- A friend's or relative's home
- A workplace address, with the employer's agreement
- A mail holding service with a street address

The application form is easier with a street address than with a PO box, which is worth knowing before you pay for one.

## Why is a hostel address the risky option?

A hostel is the most common choice and the most common failure. Large hostels handle hundreds of items of mail a week, letters are lost, binned or returned, and almost none of them forward mail to a guest who has checked out.

If a hostel is the only realistic option, ask the front desk directly whether they hold mail by guest name, get the answer from someone who works there rather than from a sign, and start checking after ten days. The ATO's outer limit is 28 days but the letter usually arrives inside two weeks.

## What happens if you move before the letter arrives?

Moving before the letter lands is the single biggest cause of a working holiday maker never receiving their TFN. Once the letter has been posted to the old address the ATO does not automatically send another, and the returned letter does not trigger a reissue on its own.

The number itself is not lost, because a TFN is issued once and permanently. It is the delivery that failed, and recovering it is a matter of correcting the address on the ATO record and having the number confirmed rather than applying again. Applying a second time is the wrong move and creates a duplicate record that takes longer to untangle than the original problem. Our guide to [updating your address with the ATO](/blog/how-to-update-address-with-ato) covers the correction.

## Which address should you actually use?

Rank the options by whether a human being will notice the letter. A friend's or relative's established home is the best answer available, because real households open their post. A workplace comes next where the employer agrees, and farms do this routinely for seasonal staff.

- A friend's or relative's established residence
- A workplace address with the employer's agreement
- A hostel where you have booked four weeks or more and confirmed they hold mail by name
- A mail forwarding service with a street address

What breaks deliveries is consistent and predictable: checking out before the letter arrives, hostels that clear unclaimed mail weekly, and a wrong unit number on the form.

## Does the delay actually cost you anything?

Not directly, and this is where the panic is usually misplaced. The TFN application is free, the number is permanent, and over-withheld tax comes back on the return, so a late letter does not lose you money in the end.

What it costs is cash flow during the months in between, and that depends on something separate from the letter. From your first day of work you have 28 days to give your employer a TFN before they must withhold at 45% instead of 15%, and the declaration form records that an application is in progress. Whether you told your employer that is what decides your pay, not whether the letter has arrived. Our guide to [the TFN reference number](/blog/tfn-reference-number-before-tfn-arrives) covers what you can use in the meantime.

## What decides whether your application goes smoothly?

Three facts, and all three are yours to control on the day you apply. Whether the address will still be collecting your mail in four weeks. Whether the details on the application match your passport exactly, since a mismatch with immigration records is the usual reason an application is rejected outright. And whether your employer has been told the application is in progress, which is what protects your withholding rate while you wait.

We handle TFN applications with a verified address that holds mail for the life of the application and confirm the number back to the client directly, which removes the failure point entirely for anyone still moving every few weeks. Once the number arrives, treat the letter as a high value document: our guide to [protecting your TFN](/blog/tfn-security-protect-from-fraud) sets out exactly who is entitled to ask for it.
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

Five items are required on any invoice, whatever the amount, and they are the ones a payer's accounts system looks for before it will process a payment. The name has to be the legal name registered against the ABN rather than a trading name you invented.

- Your name, exactly as registered against the ABN
- Your ABN
- The date of issue
- A description of the goods or services
- The total amount payable

Once the invoice reaches $75 excluding GST and you are registered for GST, more is needed: the words Tax Invoice displayed clearly, the GST amount or a statement that the total includes GST, and for invoices of $1,000 or more, the buyer's name or ABN.

## Do you need to show GST at all?

Only if you are registered, and most working holiday makers are not. GST registration is required once turnover passes $75,000 in a financial year, and the great majority of backpacker ABN income sits well below that.

Showing GST on an invoice when you are not registered is a real problem rather than a cosmetic one, because you are charging a tax you cannot remit and the payer is claiming a credit they are not entitled to. Passenger rideshare is the exception to the threshold and requires registration from the first dollar, which our guide to [GST and ABNs](/blog/gst-and-abn-for-working-holiday-makers) explains.

## What happens if you leave the ABN off?

The no ABN withholding rule requires a business paying for goods or services without a quoted ABN to withhold 47% of the payment and send it to the ATO. It applies even where you hold a perfectly valid ABN and simply forgot to put it on the invoice.

The money is not lost. It is credited against your liability and the excess comes back when the [tax return](/tax-return) is lodged. What it costs is access: on a $2,000 invoice that is $940 sitting with the ATO for months, which for someone paying rent weekly is the part that actually hurts.

## Why do invoices get rejected?

Rejections are almost never about the tax rules and almost always about small mismatches that stop an automated system dead. Payers verify an ABN through the public ABN Lookup tool, and if the name against the ABN does not match the name on the invoice, the invoice does not proceed.

- A trading name on the invoice where the ABN is registered to your personal name
- One wrong digit in the ABN, which makes it fail lookup entirely
- No invoice number, where the payer needs a unique reference
- A date written the American way rather than as DD/MM/YYYY
- No bank details, leaving a willing payer unable to pay

## What actually gets you paid?

Compliant fields get an invoice accepted. Habits get it paid, and the two are different problems. The strongest habit is issuing the invoice on the day the work finishes, because an invoice that arrives three weeks late from someone who has already left the region is the easiest debt in Australia to ignore.

- Invoice the day the work is completed
- State payment terms explicitly, since seven days is normal for labour and silence invites thirty
- Quote the purchase order or the supervisor's name where the site uses them
- Chase in writing on the first day overdue, politely, with the invoice attached again
- Run an ABN Lookup on an unfamiliar payer before a large job, which takes seconds and shows deregistered entities

## What decides whether the invoice or the arrangement is the real problem?

The invoice is a paperwork question. Whether you should be invoicing at all is a much larger one, and it is worth separating them before spending time on templates. If the business sets your hours, supervises the work and supplies the equipment, that is employment, and an invoice does not change it.

Being asked to invoice for supervised shift work is sham contracting, and it costs you the 12% [superannuation](/superannuation), the award rate, penalty rates and workers compensation cover. Our guide to [employee versus contractor status](/blog/employee-vs-contractor-australia) sets out the test that decides it, and it is worth applying before the first invoice rather than after the season.

## What should you do before you leave Australia?

Two things, and neither is the invoicing. Unpaid invoices remain legally collectable after you have gone, but recovering them from another country at backpacker scale is close to impossible in practice, so short terms and fast chasing while you are still here is the only system that works.

The second is the ABN itself, which should be cancelled when the contracting stops. An ABN left open generates ATO correspondence and lodgement expectations for years, and it is the reason people hear from the ATO long after they have gone home. Our guide to [cancelling an ABN](/blog/how-to-cancel-your-abn) covers what to close off first.
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
An ABN holder deducts genuine business expenses from income before tax is calculated, which is the compensation for having nothing withheld along the way. Tools, protective gear, vehicle running costs, the work share of phone and internet, licences and agent fees all qualify. The substantiation rules are stricter than for employees, and that is where claims fail.

## What is the actual test for a deduction?

That the expense was incurred in earning your ABN income, and that you can show it. Two parts, and the second one is what most claims fall down on rather than the first.

The ATO does not disallow expenses because they seem unreasonable. It disallows them because there is no record of the cost, no record of the work connection, or no defensible basis for the split between work and private use. An expense that genuinely happened but cannot be evidenced is, for practical purposes, not a deduction.

## What can a working holiday maker on an ABN claim?

The categories are broad, and which of them matter depends entirely on the kind of contracting you are doing. A delivery rider and a farm contractor with their own equipment have almost nothing in common on this list beyond the phone.

- Tools and equipment required for the work, such as a chainsaw for tree work or a delivery bag for courier work
- Protective clothing and safety gear: high visibility vests, steel capped boots, gloves, hard hats
- Vehicle running costs for work travel, being fuel, registration, insurance and maintenance apportioned to work kilometres
- The work related percentage of mobile phone and internet costs
- Licences and tickets the work actually requires, such as a White Card or an RSA
- Bank and merchant fees on a business account, including platform commissions
- Fees for managing your tax affairs

Anything used for both work and private purposes is claimable only at the work percentage. A phone used 60% for work is 60% deductible, and the 60% has to come from somewhere other than a guess.

## What records does the ATO actually require?

A receipt or tax invoice showing the supplier, the date, the amount and what was bought, for every claim. For apportioned items you also need a basis for the percentage, which for vehicles means a logbook and for phone and internet means a representative period of usage.

Two thresholds change what is needed. An item costing $300 or less is deductible in full in the year you buy it rather than depreciated. And from 1 July 2026 a flat $1,000 work related deduction is available with no receipts at all, which for lighter contracting will beat what could be substantiated item by item. Our guide to [the $1,000 instant deduction](/blog/1000-dollar-instant-deduction-rule-2026) sets out when to take the flat figure and when to itemise.

## What cannot be claimed, however much it feels like it should be?

Several things that look deductible and are not, and between them they account for most of the disallowed claims in this category. The common thread is that each one is a private cost that happens to occur around work rather than a cost of doing the work.

- Travel between home and a regular work location, which is private travel however early the start
- Clothing that is ordinary rather than protective or a branded uniform
- Food and drink during the working day, which is private for contractors just as it is for employees
- Accommodation at your own base, including where you work from it
- Costs incurred before the ABN was registered and before the activity started

The vehicle rules are the ones with the most money attached and the most misunderstanding. Our guide to [vehicle logbooks on an ABN](/blog/vehicle-logbook-abn-working-holiday) covers what a logbook has to contain to be accepted.

## Why do deductions matter more on an ABN than on wages?

Because nothing was withheld. On wages the employer has already taken tax out, so a deduction increases a refund. On ABN income the full invoice reached you and the tax is still owed, so a deduction reduces an amount payable.

That changes the stakes rather than the arithmetic. A wage earner who misses deductions gets a smaller refund. A contractor who misses deductions has a larger bill, and if nothing was set aside during the year that bill arrives without funds behind it.

## Why do so many claims never get made?

Because the records were never kept, not because the expenses were not incurred. Someone doing farm contracting with their own gear, or delivery work with their own vehicle, incurs real deductible costs continuously and keeps almost none of the paperwork.

There is also a genuine knowledge gap between the two regimes. People who worked as employees before going onto an ABN carry over the employee rules, which are narrower in some places and looser in others, and the vehicle and equipment treatment in particular is not the same.

## Which of these apply to your year?

Which deductions are available, and whether they survive scrutiny, depends on how the work was structured and what you kept. The categories below are the ones that decide it, and every one of them is something you already know about your own year.

- What kind of contracting it was, since the categories differ enormously between delivery, farm work and trades.
- Whether you kept receipts as you went, which is what makes a claim defensible.
- Whether a logbook exists for any vehicle claim, since that is the single most commonly disallowed item.
- Whether individual items cost more or less than $300, which decides immediate deduction or depreciation.
- Whether the flat $1,000 deduction from 1 July 2026 exceeds what you could itemise.
- Whether you had wages in the same year, since the withholding from those often absorbs the ABN tax.
- Whether you registered for GST, which changes whether amounts are claimed inclusive or exclusive of it.

The combined position is worked out in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know roughly what each side of the year came to.
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
Platform work is contracting, not employment. You need an ABN, nothing is withheld from what the platform pays you, and no superannuation is paid on it. The rule that catches people is GST: rideshare requires registration from the first dollar with no threshold, while food delivery follows the ordinary $75,000 threshold.

## Why is platform work treated as contracting?

Because the platform pays you for completed jobs rather than for your time, and does not control your hours in the way an employer does. Uber, DoorDash, Menulog and the rest engage riders and drivers as independent contractors, which is a genuine classification here rather than the disguised employment you see in cafes and farms.

The practical consequences follow from that. You need an ABN before you can be onboarded, you set aside your own tax because none is withheld, you receive an annual platform statement rather than an income statement, and you can deduct the costs of doing the work. You also receive no superannuation, no award rate and no workers compensation, which is the other half of the bargain.

## What is the GST rule that catches almost everyone?

Ordinary ABN work only requires GST registration once turnover passes $75,000 in a financial year. Rideshare does not follow that rule. Passenger transport services, which includes Uber, Ola, Didi and their equivalents, require GST registration from the first fare regardless of how little you earn.

Food delivery is different. Uber Eats, DoorDash and Menulog sit under the standard $75,000 threshold, so a rider doing delivery only usually has no GST obligation at all. The distinction follows the work rather than the app, which matters for anyone doing both: add passenger rides to a delivery week and the rideshare registration requirement is triggered.

Registration brings a Business Activity Statement obligation, usually quarterly, and it persists until you cancel it. A driver who registered and then ignored the statements can face backdated liability for the GST component of every fare taken, which for months of full time driving is a substantial figure rather than a nuisance.

## What can you deduct against platform income?

Everything genuinely incurred in doing the work, and for driving that is a large list because the vehicle is the business.

- Fuel, servicing, registration, insurance and depreciation, apportioned to work kilometres
- Interest on a vehicle loan, at the same apportionment
- Mobile phone and data for the app
- Tolls and parking incurred while working
- Vehicle cleaning
- Delivery equipment: bag, helmet, bike maintenance and repairs for couriers
- Platform commissions and service fees, which are a real cost of earning the income

Vehicle costs can be claimed on a cents per kilometre basis or by actual costs supported by a logbook. The logbook method usually produces a larger deduction for anyone driving serious hours, and it is also the method that fails most often for lack of records. Our guide to [vehicle logbooks](/blog/vehicle-logbook-abn-working-holiday) sets out what one has to contain.

## Does the ATO already know what you earned?

Yes. Platforms report annual earnings directly to the ATO under the Sharing Economy Reporting Regime, so the income figure exists in ATO systems before you lodge anything, matched against your record.

That makes under reporting platform income the least effective omission available. It is also the reason multi apping is simpler than it looks: every platform reports separately, and a return that includes three platforms is matched against three reports without difficulty.

## How does multi apping work for tax?

As one business, not three. Running Uber Eats, DoorDash and Menulog at once is standard practice and it is a single sole trader enterprise: one ABN, income summed across platforms, expenses pooled, one set of business items in the return.

Expenses need no allocation between apps, because the bike or car serves the enterprise rather than any one platform. One spreadsheet with date, platform, gross earnings and kilometres carries everything downstream, and it is the difference between a straightforward return and a reconstruction from bank statements a year later.

## Why does this go wrong so often for working holiday makers?

Because nothing is withheld and nothing prompts you. Someone earning $25,000 through delivery in a year has had no tax taken at any point, and the working holiday rate of 15% on that income is still owed, payable in a single amount at lodgement rather than absorbed weekly.

Someone who also had ordinary wages in the same year is usually in a better position, because the PAYG withheld from those wages frequently absorbs the tax on the platform income. Someone who did platform work only, and set nothing aside, is the person who gets a bill.

## How was your platform year made up?

Platform work is straightforward once the registrations are right. What you owe, and what you get back, depends on how the year was actually made up.

- Whether you drove passengers or delivered food, which decides the GST question entirely.
- Whether you also had wages, since the withholding from those often covers the platform tax.
- Whether a logbook exists, which decides how much of the vehicle cost is claimable.
- How much you set aside as you went, given nothing was withheld.
- Whether you registered for GST and lodged the activity statements that came with it.
- Whether the ABN and any GST registration were cancelled when you stopped.

The combined position is worked out in the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) to see whether your year lands as a refund or an amount owing.
 `,
 },

// ─── TAX RETURN ───────────────────────────────────────────────────────────
 {
 slug: "tax-return-without-tfn-australia",
 title: "Worked Without a TFN? Reclaim the 45%",
 description:
   "No TFN during the year means 45% withholding - but you can get a TFN now, lodge, and recover the difference. The steps for late-TFN tax returns.",
 category: "Tax Return",
 date: "21 November 2025",
 readTime: 5,
 body: `
You can, and the return is usually the most valuable one of your stay. Without a TFN on file your employer had to withhold 45% instead of 15%, and the difference comes back through the return. You need a TFN before anything can be lodged, and it can still be obtained after you have left.

## How much does a no TFN period actually cost you?

Thirty cents in every dollar earned, for as long as it lasted. With a TFN recorded the working holiday rate of 15% applies to the first $45,000. Without one, 45% is withheld from the first dollar, and on a $1,000 week that is $300 a week held back rather than paid to you.

None of it is lost. Over withheld tax is credited when the return is lodged, so the money is deferred rather than forfeited. What it costs in the meantime is cash flow, which for someone paying hostel rent weekly is the part that actually hurts, and it is why the return for a no TFN year is usually the largest refund a working holiday maker sees.

## Why can you not lodge without a TFN?

Because the TFN is the identifier that connects the employer's reported income to you. The ATO holds the reported wages and the withheld tax under the employer's reporting, but until a TFN exists to attach them to, there is no assessment to make.

This is the reason people abandon the money. They assume that because they never had a number, the tax vanished into the system. It did not. It sits against the employer's reporting waiting to be matched, and applying for the TFN is what matches it. The application is free and can be made from overseas with identity verification.

## What happens to the records if you kept nothing?

Most of what is needed already exists in ATO systems rather than in your drawer. Employers report wages and withholding under Single Touch Payroll, and that reporting is what the return is built from, which is why a shoebox of lost payslips is a much smaller problem than it feels like.

Where it becomes a real problem is where an employer never reported at all, which happens in cash paying industries. Then the income has to be reconstructed from what you do have, and our guide to [cash in hand tax returns](/blog/cash-in-hand-tax-return) covers how that is done and what evidence carries weight.

## What if the year has already passed?

A prior financial year remains lodgeable. There is no point at which an unlodged year becomes uncollectable simply because time has gone by, and working holiday makers routinely lodge for a year they left the country in.

Two things change with time rather than one. Employer records get harder to chase where reporting was patchy, and identity verification gets slower from overseas. Neither closes the door, and the refund does not shrink because you waited.

## What changes about the return if you have already left?

The mechanics are the same and the friction is different. A return can be prepared and lodged from anywhere in the world, but the refund is paid to an Australian bank account, so an account closed on the way to the airport becomes the obstacle rather than the tax.

A first return, combined with a newly issued TFN, combined with an overseas address, is also the combination most likely to attract manual identity checking at the ATO. That is a delay rather than a rejection, and complete and consistent documents are what shortens it.

## What else is usually sitting in a no TFN year?

More than the withholding difference, because the years people work without a TFN are also the years where nothing else was set up either. Superannuation is the common one: contributions made without a TFN attached often sit unmatched in a fund or with the ATO, and they are still yours.

The Medicare levy exemption is the other. A German or Japanese passport holder generally is not entitled to Medicare, so the 2% levy should not apply, but it is only removed if it is claimed. Neither of these appears on any payslip, which is why neither gets noticed.

## How big is your own over withholding?

Recovering the over withholding is the straightforward part. The size of it, and how quickly you see it, depend on your own facts.

- How many weeks ran before your TFN reached the employer, which sets the size of the over withholding.
- Whether the employer reported your income under Single Touch Payroll, which decides how much has to be reconstructed.
- Whether the employer was registered with the ATO as a working holiday maker employer, since an unregistered one withholds at foreign resident rates even with a TFN on file.
- Whether an Australian bank account is still open to receive the refund.
- Whether super was paid to a fund that could not match it to you.
- Whether more than one financial year is involved, since each is a separate return with its own refund.

The reconciliation is done as part of the [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you know roughly what was withheld.

## Who should you actually hand your documents to?

People who worked without a TFN are the most targeted group in this whole audience, because they are already unsure how the system works. Backpacker Facebook groups and messaging communities carry a steady supply of people offering to sort your tax out.

Never send a TFN, passport or visa grant to anyone who cannot show you a registration on the government's public register of tax practitioners. A verifiable registration number is the whole test, and anyone unwilling to provide one has told you what you need to know.
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
Every job in a financial year goes on one [tax return](/tax-return), including the week you did in a kitchen and never went back to. Each employer reports separately to the ATO, so the return has to reconcile against the combined total. Your refund sits with whichever employer had the wrong rate.

## How does the ATO already know where you worked?

Through Single Touch Payroll, which requires every Australian employer to report wages, tax withheld and [super](/superannuation) to the ATO at each pay run rather than once a year. By the time you come to lodge, the ATO holds the complete list.

That has two consequences worth separating. The first is that forgetting an employer is not a way of leaving income off a return; it is a way of lodging a return that does not match the record. The second, more useful, is that a job you have no payslips for is not lost income, because the reporting came from the employer and not from you. A festival shift paid through a temp agency six months ago is in there whether or not you remember the agency's name.

## What goes wrong when an employer is left off?

The return is usually processed at the figure you reported, the refund is paid, and the correction arrives afterwards. The ATO compares the lodged return against its own record, spots the gap, and issues an amended assessment adding the missing income, commonly weeks or months later.

By then the refund is generally spent, which is what turns an administrative correction into a real problem. The amended assessment creates a debt, the General Interest Charge runs on it from the original due date, and a substantial omission can attract a penalty on top. Lodging once against the full record avoids all of it, and the effort involved is checking a list rather than doing anything clever.

## Where is the refund actually concentrated?

At one employer, almost always, rather than spread evenly across them. The useful exercise on a multi employer year is not adding the totals up but comparing them: divide tax withheld by gross wages for each employer separately and see which one sits meaningfully above 15%.

Two patterns produce that. An employer not registered with the ATO as a working holiday maker employer must withhold at foreign resident rates rather than 15%, which is common on farms and with small regional businesses, and the excess is fully recoverable. And a first job where your TFN arrived late will show weeks at 45%, which is a difference of 30 cents in every dollar for that period. Identifying which employer it was tells you where your year's money went, and it is the single most useful thing you can know before lodging.

- One employer well above 15%: an unregistered employer or a late TFN, and a substantial refund
- All employers at 15%: the refund comes from the Medicare levy exemption and deductions instead
- Combined income above $45,000: the rate steps to 30% and the withholding may have been short

## Can multiple jobs leave you owing money?

Yes, and it catches people who assume more jobs means a bigger refund. Each employer withholds against the income they pay you, without knowing about the others, so the withholding is calculated as though each job were your only one.

Working holiday makers have no tax free threshold, so the usual Australian version of this problem does not arise, but the bracket effect does. Combined income above $45,000 moves into the 30% bracket while each individual employer may still have been withholding at 15%, and the shortfall appears at the end of the year as an amount owing. Three concurrent casual jobs through a busy summer is the shape that most often produces it.

## What is worth keeping when you work several jobs?

Anything that is not already in the ATO record, which is a shorter list than most people expect. The income side comes through Single Touch Payroll, so payslips are a cross check rather than the source, and their real value is proving what should have been reported if an employer never finalised.

- Payslips or final summaries, as a check against the ATO figures
- Details of any cash payments never reported through payroll, which still have to be [declared](/blog/cash-in-hand-tax-return)
- Work related expenses, recorded against the job they belong to
- Travel between two workplaces on the same day, which can be deductible where travel from home is not

## When can a multi employer return be lodged?

Once every employer has finalised, and not before. Income statements show as not tax ready until the employer completes its end of year reporting, and one employer finalising late is enough to make the whole return premature.

This is where multi employer years get amended unnecessarily. Lodging in early July against three finalised employers and one that has not finished means the fourth arrives afterwards and the assessment changes. Waiting for all of them costs a fortnight; amending afterwards costs considerably more, and it is the most avoidable amendment in the whole system.
`,
 }, {
 slug: "second-third-year-visa-tax-implications",
 title: "Second Year Visa Tax: Same Rate, Same TFN",
 description:
   "Extending to a second or third year changes nothing about your 15% rate - but super, residency drift and employer registration deserve a fresh check.",
 category: "Tax Return",
 date: "24 November 2025",
 readTime: 6,
 body: `
The rate does not change. A second or third year 417 or 462 visa is still taxed at working holiday maker rates, 15% on the first $45,000. What can change is your residency position, because a longer stay turns a question that was once a formality into a genuine judgement, and that is where the money moves.

## Why does the rate stay the same when everything else has changed?

Because the working holiday maker rate attaches to the visa subclass rather than to time served. A third year on a 417 is taxed identically to the first week of the first year, and 30% applies above $45,000 up to $135,000 on every visa year. Our guide to [the backpacker tax rate](/blog/backpacker-tax-rate-australia) sets out the full structure.

That is the part people assume they already know and get right. What they get wrong is assuming the rest of the return is a copy of last year's, and in several specific places it is not.

## Where does residency genuinely start to shift?

In a second or third year, quietly and without any obvious moment where it happens. Tax residency is not settled by your visa or by a day count, and a longer stay produces exactly the kind of year where the judgement can genuinely land either way. Two multi year backpackers whose years look almost identical from the outside can be correctly assessed on opposite sides of the line.

If residency is established, what that finding is worth varies from person to person, for reasons that are assessed case by case. The area has been fought all the way to the High Court in Addy v Commissioner of Taxation, which is a fair measure of how far from obvious the answers are.

None of it is automatic and none of it is a yes or no on a single fact. Our guide to [tax residency for working holiday makers](/blog/tax-residency-working-holiday-makers) covers why it has to be assessed rather than assumed.

## Do you need a new TFN?

No. A TFN is issued once and is permanent, and it follows you across visas, across years and across a departure and return. Applying again creates a duplicate record rather than a second number, and duplicates cause exactly the kind of identity mismatch that delays refunds.

If you cannot find the old one, recovering it is a different process from applying for a new one, and it is the right process. Our guide to [whether you need a new TFN on a second visa](/blog/do-you-need-new-tfn-second-visa) covers it.

## What happens to super across visa years?

It stays where it is, and the timing of the DASP claim becomes the decision. Super can only be claimed once your visa has ceased and you have left the country, so a first year balance left in place simply accumulates alongside the second year's contributions and is claimed together at the end.

The irreversible version is worth naming. If you claimed DASP after your first visa and then returned on a second, that money is gone at 65% withholding and contributions start fresh. Nobody can undo it, and it is the most expensive avoidable decision in this whole area for someone who intended to come back.

Multiple visa years also usually mean multiple funds, because each new employer defaults you into their own unless you nominate. Consolidating is covered in our guide to [super across multiple funds](/blog/super-multiple-funds-consolidation).

## What do the 88 and 179 day requirements do to your tax records?

They are immigration requirements rather than tax ones, but they generate tax records, and those records are what your next visa application is evidenced with. Eighty eight days of specified work in a regional area qualifies you for a second year visa, and a further 179 days during the second year qualifies you for a third.

That makes the paperwork double purpose. Every regional employer needs your TFN on file, reports your income to the ATO under Single Touch Payroll, and produces payslips that serve as evidence of the days worked. Regional work is also where employers are most likely to be unregistered as working holiday maker employers or to engage people on ABNs, so it is where withholding errors concentrate.

## What does a multi year backpacker end up carrying?

More returns than they expect. Because the financial year runs 1 July to 30 June, a two or three year stay usually produces three or four separate returns rather than one per visa, each with its own income, its own residency question and its own refund.

The people who leave with clean records collect their final refund and their DASP without much friction. The ones carrying an unlodged year from two summers ago, four super accounts and an ATO address that is a hostel in Cairns spend months on it from the other side of the world.

## What is different about your second year?

The rate is fixed across visa years. Almost everything else about a second or third year return is decided by facts specific to you.

- Whether your residency position deserves a fresh look, which after a longer stay it usually does.
- What a residency finding would be worth in your particular case, which varies more than people expect.
- Whether any earlier financial year was left unlodged, which is still recoverable.
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

Three conditions have to hold together, and lodging before they do is the most common wasted application. You accumulated super while working on a temporary visa, which includes 417 and 462. You have left Australia. And your visa has expired or been cancelled.

You cannot claim while the visa is still active, even from your home country. If you intend to come back on another temporary visa you can still claim, because eligibility turns on the visa the super was accumulated under having ended rather than on you never returning.

## What identity documents does a fund want?

The passport used on your working holiday visa, and if you have renewed since, both passports, so the chain of identity is visible. Funds commonly require certified copies rather than photographs, particularly above balance thresholds around $5,000.

Certified means an authorised person has sighted the original and endorsed the copy, and which people count varies by fund: an Australian notary or justice of the peace, an Australian consulate abroad, or a locally recognised equivalent the fund accepts. This is the requirement that most often stalls a claim from overseas, because a solicitor in Manchester or a notary in Osaka may or may not appear on a particular fund's accepted list, and you find out after submitting rather than before. Some funds accept digital identity verification instead, which removes the problem entirely where it is available.

## What proves your visa has ceased?

Evidence from the Department of Home Affairs, in one of three forms. A visa grant notice showing an expiry date that has already passed. A cancellation notice if the visa was cancelled early. Or a VEVO extract showing current status as expired, which is the most common because it shows live status.

A VEVO extract has to be generated after the visa has actually ceased. One pulled a week early shows an active visa and proves the opposite of what you need.

## What proves you have departed?

The movement record maintained by Home Affairs, which logs every entry and exit. Funds also commonly accept a departure boarding pass together with a passport exit stamp, or an entry stamp into another country dated after the visa expiry.

The date relationship is what matters and it catches people out. The departure has to be after the visa ceased. Flying out mid visa and returning later does not trigger eligibility, so a trip to Bali in your ninth month is not a departure for these purposes.

## Which route should you claim through?

Three routes exist and the paperwork burden differs sharply between them, even though the 65% withholding is identical in all three. Which one suits you depends on how many funds hold your money and how long ago you left Australia.

**Direct through the ATO's application.** Free, and it works well where you have exactly one fund, your identity documents are in order and that fund does not demand certified copies. It becomes difficult when a fund asks for additional verification while you are on another continent.

**Through an agent.** There is a fee, and what it buys is the parts that actually go wrong: locating every fund rather than the one you remember, meeting fund specific document standards, arranging certification, chasing funds that go silent, and combining the claim with your final year [working holiday tax return](/tax-return). It is worth most where there are multiple funds or where you have already left.

**From the ATO, once the balance has been transferred.** Roughly six months after your visa ends and you depart, funds must transfer unclaimed balances to the ATO. It is not lost, and the ATO route usually involves less paperwork friction and no further fee erosion, but you first have to discover where the money went.

## What goes wrong most often?

The same short list every time, and none of it is exotic. Passport details on the application that do not match what the fund holds, because an employer typed your name in a hurry when the account was opened. A visa expiry date entered incorrectly. A departure date that predates the visa expiry. Certification the fund will not accept. And an application sent to a fund holding no balance, because the contributions went somewhere else entirely.

That last one is the most common of all. A traveller with three employers usually has three funds, and each has to be identified and claimed from separately. See [finding lost superannuation](/blog/how-to-find-lost-superannuation) for how the central record works.

## How hard will your three documents be?

Every fund wants the same three things, but how hard they are to produce varies enormously with where you are and how long ago you left. These are the facts that decide your paperwork.

- How long ago you left, which decides whether your money is still with funds or already with the ATO.
- Whether you have renewed your passport since working in Australia.
- What each fund's balance is, since certification requirements commonly tighten above around $5,000.
- Where you are certifying documents, because acceptance varies by country and by fund.
- How many employers you had, which is how many separate applications this becomes.
- Whether your final year return is also outstanding, which is separate money and usually better taxed.

The eligibility rules, withholding and timing are set out where you [claim your superannuation after leaving Australia](/superannuation).
 `,
 }, {
 slug: "dasp-tax-rate-65-percent-explained",
 title:
 "DASP Taxed at 65%: What You Actually Get",
 description:
 "Working holiday super is taxed at 65% on withdrawal, so a $10,000 balance pays out about $3,500. Why the rate exists and why claiming anyway is right.",
 category: "Super",
 date: "11 December 2025",
 readTime: 4,
 body: `
Sixty five per cent, on the taxable component. A $10,000 balance pays out about $3,500. The rate was set by federal law in 2017 specifically for super contributed while on a 417 or 462 visa, and it cannot be reduced, deducted against or planned around. Other temporary visa holders pay 35%.

## What does the 65% actually apply to?

The taxable component of the balance, which for a working holiday maker is essentially all of it. Your account is made up of employer contributions paid under the superannuation guarantee, currently 12% of your wages, plus whatever those contributions earned while invested. Both are taxable component.

A non-taxable component exists in principle and comes from personal after tax contributions, which almost no working holiday maker makes. If yours is one of the rare accounts with one, that portion is not hit by the 65%. Everything else is.

## Why is the rate so much higher than for other visas?

It was a deliberate trade in the 2017 working holiday maker reform package. That legislation set the income tax rate at 15% from the first dollar, which is lower than the foreign resident rates that would otherwise apply, and simultaneously raised the DASP rate from 35% to 65% on super contributed while on those visas.

The rate does not vary with how long you were here, how much you accumulated, which fund it sat in or what you earned. It is applied at withdrawal by the fund before the money is released, so nothing arrives that you then have to set aside.

## What does this look like on real balances?

Super accrues at 12% of your wages, so the balance tracks what you earned and the net payment tracks the balance. The figures below assume the whole account is taxable component, which for a working holiday maker it almost always is.

- $20,000 of wages: roughly $2,400 of super, roughly $840 after the withholding
- $40,000 of wages: roughly $4,800 of super, roughly $1,680 after
- $60,000 of wages: roughly $7,200 of super, roughly $2,520 after
- A $10,000 balance: about $3,500 after

Fund fees and investment returns move these figures a little in both directions. A year of hospitality work in Sydney and a harvest season in the Riverland is a fairly typical two account version of the middle row.

## Is it still worth claiming at that rate?

Yes, and the reason is that the alternative is not keeping the money, it is losing access to it. Unclaimed accounts are eventually reported as lost and transferred to the ATO, where the balance sits without investment earnings and is still subject to the same 65% if it is ever claimed later.

So the choice is not 65% now against 0% later. It is 35% of your balance in your account against a balance you have to come back for, from another country, years afterwards, with a passport that may have been renewed in between. Most people who never claim did not decide not to. They just left.

## Can anyone get it out at a lower rate?

No. The rate is statutory, it is applied by the fund at the point of release, and it is identical whoever lodges the claim. There is no deduction, no offset, no structure and no agent channel that changes it.

This matters because the claim gets made. Offers on social media and messaging apps to handle a super claim at a better rate are either a misunderstanding of the law or a straightforward fraud, and what they actually collect is a passport, a TFN and enough identity to open accounts. A claim needs your passport, your TFN and your bank details in one place, which is exactly what makes it an attractive target. The [TFN fraud patterns](/blog/tfn-security-protect-from-fraud) are worth reading before sharing anything with anyone.

## What decides your figure rather than the rate?

The 65% rate itself is fixed by statute and nothing changes it. What varies is how much of your balance it reaches and how much of it survives the wait, and these are the facts that decide both.

- Whether any of the balance is non-taxable component, which is rare but is the only thing the 65% does not reach.
- Whether some of your contributions were made on a different visa. Super contributed while on a student or skilled visa is taxed at 35%, not 65%, and a mixed history is assessed accordingly.
- How many funds you have, since fees have been eroding each small balance separately the whole time.
- Whether your super has already been transferred to the ATO as unclaimed, which changes the route but not the rate.
- Whether you are also owed a tax refund for your final year, which is separate money, taxed separately, and frequently larger.

The eligibility rules, timing and documents are set out where you [claim your superannuation after leaving Australia](/superannuation), and you can [estimate your tax refund](/calculator) for the income side separately.
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
Four employers usually means four [super](/superannuation) accounts, because each one defaults you into its own fund unless you say otherwise. Whether you should consolidate them or simply claim each separately turns on one thing: how long you are staying. Consolidation is worth doing while you are in Australia and awkward once you have gone.

## Why does one person end up with four super accounts?

Because the default sits with the employer and the choice sits with you, and almost nobody exercises it on their first day. A new employee who does not nominate a fund is put into whichever fund that business uses, and the next employer does the same thing with a different fund, so the accounts accumulate without a single decision being made.

Super stapling, introduced in 2021, was meant to solve exactly this by tying you to your first fund and following you between jobs. It works reasonably well for Australians and less well for working holiday makers, because the stapling lookup often finds nothing for someone who has just arrived, and by the time a record exists the first employer has already paid into a different default.

## What does holding several accounts actually cost?

More than the balances justify, and the damage is proportional rather than absolute. Every fund charges its own flat administration fee irrespective of how little is in the account, and several also deduct default insurance premiums automatically, so four small balances pay four sets of the same charges.

On a large balance those fees are trivial. On a few thousand dollars split four ways they are not, and the accounts that hurt most are the ones from a job you did for three weeks in your first month, which then sit untouched for a year quietly paying for insurance you will never claim on. This is the reason to check what you have rather than the reason to panic about it.

- A flat administration fee per fund, charged whatever the balance
- A percentage fee on the balance itself
- Default insurance premiums, deducted unless cancelled
- No offsetting contributions once you stop working for that employer

## When is consolidating the right move?

When you are still in Australia and still working. Choosing one fund, giving that fund's details to every current and future employer on a Standard Choice form, and rolling the other balances into it stops the duplicate fees, ends the duplicate insurance and leaves you with one account to deal with when you leave.

When you are leaving within weeks it is usually the wrong move. A rollover takes time to settle, and a DASP claim made against an account while a transfer is in flight is the classic way to end up with a fragment left behind in a fund you thought was closed. In that situation claiming each fund separately is slower on paper and faster in practice. If you are staying and want to make an active choice, our guide on [choosing a super fund](/blog/how-to-choose-super-fund) sets out what matters for a working holiday maker as opposed to a career.

## Can you consolidate after you have left Australia?

Technically yes, practically rarely. Most funds authenticate rollovers through identity checks built around Australian credentials and an Australian mobile number, and both of those are usually the first things a departing backpacker loses.

The realistic route from overseas is to lodge a separate [DASP claim](/superannuation) with each fund rather than trying to merge them first. It is more paperwork and it produces several payments instead of one, but each claim is independent and none of them depends on a rollover completing first. Keeping an Australian phone number alive for a few months after departure is the cheapest thing you can do to keep the other options open.

## What if you do not know how many accounts you have?

Assume there are more than you remember, because the ATO record is the only complete list and almost nobody has looked at it. Every fund that has ever received a contribution against your TFN appears there, including accounts opened by an employer you worked for briefly and never thought about again.

Balances that go unclaimed long enough stop being held by the fund at all and are transferred to the ATO as unclaimed super, which is not a loss but does change where you have to look. Our guide to [finding lost superannuation](/blog/how-to-find-lost-superannuation) covers what that transfer means and how the money is recovered from there.

## Who should you not give your details to?

Anyone who approaches you offering to find or consolidate your super. It is a well established scam aimed at exactly this audience, and it works because the offer sounds like a favour: they need your TFN, a passport scan and often your fund login, and those three things are enough to move a balance into an account they control.

The rule that protects you costs nothing. Anyone charging for tax or super services in Australia must appear on the government's public register of tax practitioners, and looking someone up takes a minute. A super fund password is never required by any legitimate process, and being asked for one is the end of the conversation.
`,
 }, {
 slug: "dasp-rejected-what-to-do",
 title:
 "DASP Rejected? Five Reasons and the Fixes",
 description:
 "A rejected DASP claim is not lost money. It is almost always a visa record that has not updated, a name mismatch, or a fund holding none of your super.",
 category: "Super",
 date: "22 December 2025",
 readTime: 4,
 body: `
A rejected DASP is not lost money. The balance stays in the fund and the claim can be lodged again once the cause is fixed. Five things account for nearly every rejection, and four of them are administrative rather than substantive.

## What are the five reasons?

They are predictable enough that a rejection notice, which is usually unhelpfully vague, can normally be decoded without asking anyone. Four of the five are administrative rather than substantive, which means the money is not in question and only the paperwork is.

**Your visa is not yet recorded as ceased.** A claim lodged within days of expiry or cancellation is checked against a Department of Home Affairs record that still shows the visa as active. This is the most common rejection and it is purely a timing problem.

**Your departure is not yet recorded.** The movement record follows airline data and typically updates within 7 to 14 days of you flying out. Claiming from the airport lounge does not work.

**Your identity does not match the fund's record.** Your passport says one thing and the super account, set up by an employer in a hurry, says something slightly different.

**The fund holds none of your money.** You applied to a fund you remember rather than the fund your contributions went to.

**Your certified documents were not accepted.** The certifier you used is not one that fund recognises, which is a much bigger problem once you are overseas.

## How do you tell which one you have?

The rejection notice frequently just says the application was declined, so the diagnosis comes from checking the underlying records rather than from the letter. Four records settle it between them: your visa status, your movement record, the list of funds actually linked to your TFN, and the fund's own identity requirements.

That list of funds is the one people underestimate. A working holiday maker with four employers across a year usually has three or four super accounts, several with funds they have never heard of, because the employer chose the fund and nobody told them.

## What do you do about a record that has not updated?

Wait and re-lodge, because there is genuinely nothing else. Visa cessation records update the day after expiry. Movement records typically update within a fortnight of departure. A claim lodged into a record that has not caught up will fail again for exactly the same reason.

If more than 30 days have passed since departure and the movement record still does not show it, that is no longer a timing issue and it needs to be raised with Home Affairs directly. It happens, usually where a departure was on a code shared or rebooked flight.

## What do you do about a name mismatch?

The fund's record has to be corrected before the claim will pass, and the fund is the one who has to do it. This is the rejection that frustrates people most, because it is not their error: employers set up super accounts by typing a name off a passport at speed, and dropped middle names, reversed given and family names, and stripped accents are all routine.

Two specific variants are worth knowing about. If you renewed your passport since working in Australia, both the old and the new document are usually needed, because the account was opened against the old number. And if you have been in Australia twice, you may have two member numbers with the same fund.

## What do you do if the fund holds nothing?

Find the fund that does. Every fund that has ever received a contribution linked to your TFN is recorded centrally, so the money is not actually missing even when it feels like it, and the answer to which fund is a lookup rather than a search. See [finding lost superannuation](/blog/how-to-find-lost-superannuation) for how the records work.

If you left Australia more than six months ago, there is a reasonable chance the answer is that the fund lost contact with you and the balance has already been transferred to the ATO as unclaimed super. That is a different claim route, and it is generally faster because there is no fund verification stage.

## A week of waiting or a fund correction?

Which of the five causes you have determines whether this is a week of waiting or a fund correction that has to be requested. These are the facts about your own departure and your own records that decide it.

- How long ago your visa ceased and how long ago you actually left. Both have to be recorded before anything can succeed.
- Whether you have renewed your passport since working in Australia.
- How many employers you had, which is how many funds you probably have and how many separate claims this is.
- Whether you are applying from overseas, which makes certification the binding constraint rather than an afterthought.
- Whether the balance has already moved to the ATO, which changes the route entirely.
- Whether your final year tax return is still outstanding, which is separate money on a separate timetable.

The eligibility rules and documents are set out where you [claim your superannuation after leaving Australia](/superannuation), and if a final year return is also outstanding you can [estimate your tax refund](/calculator).
 `,
 }, {
 slug: "super-employer-not-paying-what-to-do",
 title: "Employer Not Paying Super? How to Report It",
 description:
   "Check your fund's transactions, raise it with payroll, then lodge an unpaid-super report with the ATO. The recovery process and realistic timelines.",
 category: "Super",
 date: "29 December 2025",
 readTime: 5,
 body: `
Unpaid [super](/superannuation) is recoverable, and the ATO rather than you is the one who recovers it. Employers must pay 12% of ordinary time earnings into your fund at least quarterly, and a missed quarter creates a debt the ATO can pursue with powers no individual worker has. The question is whether you find it before you leave.

## How do you tell whether super has actually been paid?

By looking at the fund, not the payslip. A payslip showing a super line means the amount was accrued against your pay; it does not mean anything was transferred, and the gap between those two things is the most common shape unpaid super takes in Australia.

The only proof of payment is the fund statement or the ATO's record of contributions. If a quarter has closed, its deadline has passed by a week or two, and the fund still shows nothing for that period, the super is unpaid rather than late. Before that point, an empty quarter is normal, because super is paid on a quarterly cycle and not with each pay.

## What is the employer actually obliged to do?

Pay 12% of your ordinary time earnings into your nominated fund by four fixed dates a year, for every employee including casuals, under the Superannuation Guarantee (Administration) Act. There is no minimum earnings threshold below which it stops applying, and being on a 417 or 462 visa makes no difference to the obligation.

Missing a deadline does not simply create a late payment. It creates a liability for the [Superannuation Guarantee Charge](/blog/what-is-superannuation-guarantee-charge), which is the shortfall plus interest plus an administration component and is not deductible against the employer's tax, which is what makes it worth reporting rather than absorbing.

- 1 July to 30 September, due by 28 October
- 1 October to 31 December, due by 28 January
- 1 January to 31 March, due by 28 April
- 1 April to 30 June, due by 28 July

## What decides how you get it back?

Whether the employer is still trading and whether the omission looks deliberate. A small business that missed a quarter through disorganisation will often fix it once asked in writing, and that is the fastest route by a wide margin because it does not involve anyone assessing anything.

Where a written request goes unanswered, the ATO route is the one with teeth. Reporting unpaid super gives the ATO a place to look, and it already holds both halves of the comparison: the wages your employer reported through single touch payroll and the contributions your fund reported receiving. Where the pattern includes other breaches, such as underpaid wages or missing payslips, the Fair Work Ombudsman handles that side, and the two claims can run alongside each other.

## What if the employer has closed down?

The claim survives, which surprises people. When a business goes into liquidation the ATO becomes a creditor of it for the super charge, and contributions can be recovered through that process rather than being written off with the company.

What changes is the timeline, which runs in months rather than weeks and sometimes considerably longer. Note also that the Fair Entitlements Guarantee, the federal safety net that covers some unpaid wages and entitlements when an employer collapses, does not cover superannuation. That gap is a reason to raise unpaid super while the employer is still trading, if you have the choice.

## Why does this matter more if you are leaving?

Because DASP pays out only what is actually sitting in the fund. Super the employer never transferred is not in the fund, so it is not in the payment, and the money does not follow you home automatically.

That creates a genuine timing decision rather than a procedure. Delaying the [DASP claim](/superannuation) until the ATO has recovered the contributions puts everything in one payment, but it can mean waiting a long time from overseas. Claiming now for what is in the fund gets that money moving and leaves the rest to be pursued separately, which means a second payment later and more admin. Which is better depends on the size of the gap and on how long you can leave an Australian bank account open.

## How do you avoid the scam that targets this?

By being sceptical of anyone who contacts you about super rather than the other way round. Unpaid super and lost super are both known hooks, and the offer to chase it is a way of collecting a TFN, a passport scan and fund login details, which is everything needed to roll a balance somewhere else.

The check is simple and it is worth applying every time. Anyone providing paid tax services in Australia must be listed on the government's public register of tax practitioners, and a genuine one will not object to being looked up before you send anything. No legitimate process ever requires you to hand over a super fund password.
`,
 }, 

// ─── WORK RIGHTS ──────────────────────────────────────────────────────────
 {
 slug: "workplace-injury-working-holiday-rights",
 title: "Injured at Work? Workers Comp Covers You",
 description:
   "Workers compensation applies regardless of visa - medical costs and lost wages included. What to do in the first 48 hours and how claims work by state.",
 category: "Work Rights",
 date: "20 January 2026",
 readTime: 5,
 body: `
Yes. A working holiday maker injured during paid employment can claim workers compensation through the state or territory scheme. It covers medical treatment, rehabilitation and a share of lost wages. The right does not depend on your visa, on how long you have been in the job, or on whether the employer actually holds the insurance.

## What does the scheme actually cover?

Any injury or illness arising out of, or in the course of, paid employment. That is broader than most people assume and it includes several things that do not look like accidents.

- Acute injuries such as cuts, breaks, sprains and burns
- Repetitive strain from ongoing work activity
- Mental health conditions caused or aggravated by work
- Diseases contracted because of the work, including skin conditions from chemical exposure
- Injuries during work related travel, and in some states travel to and from work

It is a no fault scheme, which is the point most often missed. The injury does not have to be anybody's fault, and it does not have to be the employer's. If it happened because of work, the claim stands.

## What do the benefits amount to?

Medical treatment for the injury paid directly, weekly payments while you cannot work, travel to and from appointments, return to work support, and a lump sum where the injury results in lasting impairment.

Weekly payments typically run at 80% to 95% of your normal weekly wages, with the percentage stepping down over time in some states, and cover continues while the injury affects your ability to work subject to state maximums. The scheme is state based, so the detail differs between New South Wales, Victoria, Queensland and the rest, and the state is the one where you work rather than where the employer's head office is.

## How does this interact with not having Medicare?

It replaces the question entirely for the injury itself. Workers compensation is the primary payer for treatment of a work injury, and you should not be billed for it, which matters enormously for the majority of working holiday makers who are not entitled to Medicare.

That is the practical significance of the scheme for this audience. A broken wrist from a fall at work is covered even for someone with no Medicare entitlement and no travel insurance in force, and our guide to [Medicare for working holiday makers](/blog/what-is-medicare-working-holiday-makers) covers where the entitlement question actually sits.

## What has to happen for a claim to run?

Four things, in order, and the first two are the ones people delay. Report the injury to the employer as soon as it happens, in writing if possible. See a doctor and get a workers compensation medical certificate, which is a specific certificate rather than an ordinary sick note.

The claim is then lodged with the employer's insurer, and the employer is legally required to pass it on within a short statutory period, commonly five working days. Continuing certificates are needed for any period you remain unable to work. An employer cannot lawfully refuse to lodge a claim, and refusing is itself a breach reportable to the state regulator.

## What if you are threatened over it?

The threats are not real, and they are common enough to name. Working holiday makers report being told that a claim will get them sacked, deported or have their visa cancelled.

Dismissal because of a workers compensation claim is unlawful in every state. Visa cancellation is not triggered by a workers compensation claim. And an employer has no power over your visa status whatever they imply. If you are being pressured, the state regulator and the Fair Work Ombudsman are both available and the protections are stronger than most people in this position believe.

## What if you were working under an ABN?

Then cover is not automatic, and this is the real gap. A genuine contractor is generally not covered by the principal's workers compensation insurance, and is expected to arrange their own.

But a great many people on ABNs in hospitality and farm work are misclassified employees, and reclassification restores the cover along with award rates and superannuation. Set hours, supervision, employer supplied equipment and a single client are the indicators. Our guide to [the employee versus contractor test](/blog/employee-vs-contractor-australia) sets out how it is decided, and it is worth resolving before assuming there is no claim.

## What does an injury do to your tax year?

It usually lowers your income, which changes the arithmetic in your favour at assessment. A year with several unpaid or partly paid weeks is a year where withholding calculated on full time pay overshot, and that surfaces as a larger refund.

Compensation payments themselves are treated differently depending on their nature, with weekly wage replacement generally assessable and lump sums for permanent impairment generally not. Getting that classification right matters, and it is one of the few areas where an injury genuinely complicates a return rather than simplifying it.

## What is payable, and for how long?

The entitlement is not the variable. What you receive and how straightforward it is depends on the facts. The points below decide what is payable, for how long, and how the payments are treated at tax time.

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

Anyone who completed the minimum employment period, which is six months at a business with 15 or more employees and twelve months at a small business with fewer than 15. That single threshold rules out a large proportion of working holiday makers before anything about the dismissal itself is considered.

Casual employees are not excluded, which surprises people. A casual employed on a regular and systematic basis with a reasonable expectation of continuing work can claim, and the test looks at the actual pattern of shifts rather than the word casual on the contract. Someone rostered four nights a week for eight months is in a much stronger position than the paperwork suggests.

- 15 or more employees: six months minimum service
- Fewer than 15 employees: twelve months minimum service
- Casual with a regular, systematic pattern: counts towards the period
- Earnings must be under the high income threshold, which almost every working holiday maker is

## What makes a dismissal unfair?

That it was harsh, unjust or unreasonable, which covers both the reason and the process. A valid reason handled badly can still be unfair, and this is the point most people miss: being sacked for something you did is not automatically fair if you were never told about it and never given a chance to respond.

The recurring patterns are recognisable. Termination for performance issues that were never raised. Dismissal shortly after a safety complaint or a workers compensation claim. A redundancy that turns out to have been a replacement. And, for small businesses, a dismissal that does not follow the Small Business Fair Dismissal Code, which sets out a shorter but still real process.

## What if you were there less than six months?

You cannot make a standard unfair dismissal claim, but that is not the end of it, and the alternative route is often the stronger one anyway. A General Protections claim covers dismissal for a prohibited reason, and no minimum employment period applies to it at all.

Prohibited reasons are wider than most people expect: exercising a workplace right, making a complaint or enquiry about your employment, temporary absence through illness or injury, or a protected characteristic such as race, sex, age or pregnancy. Being dismissed the week after you asked why your super had not been paid is the shape of a General Protections case rather than an unfair dismissal one. Discrimination law adds a parallel route with no service requirement either.

## How hard is the 21 day deadline?

Hard. An application must reach the Fair Work Commission within 21 calendar days of the dismissal taking effect, counted in calendar days rather than business days, and extensions are granted only in genuinely exceptional circumstances. Not knowing about the deadline is not exceptional.

For a working holiday maker this creates a specific problem, because dismissal often happens in the final weeks of a stay and the flight is already booked. The claim can be pursued from overseas once lodged, but it has to be lodged in time, so the priority in that situation is getting the application in before departure rather than resolving anything first. General Protections claims involving dismissal run to the same 21 day limit.

## What can you actually get?

Compensation, in most cases, capped at 26 weeks of pay and at half the high income threshold. Reinstatement is the primary remedy in the legislation, but it is rarely what a working holiday maker wants and rarely practical near the end of a visa.

Most matters settle at conciliation rather than proceeding to a hearing, which is a telephone conference run by the Commission fairly early in the process. That is worth knowing because it changes what preparation is useful: a clear account of what happened, dates, and any documents are more valuable than legal argument at that stage.

## What are you owed regardless of the claim?

Everything that had accrued by the date you finished, and this is separate from whether the dismissal was fair. It is also the part most often left behind, because people focus on the dismissal and forget the money.

- All wages for hours worked up to the final day
- Accrued annual leave, for permanent employees
- Payment in lieu of notice, where notice was required and not given
- Any [unpaid super](/blog/super-employer-not-paying-what-to-do), which is pursued through the ATO rather than Fair Work

These are recoverable whether or not you have a dismissal claim and whether or not you are still in the country. Our guide on [an employer not paying correctly](/blog/employer-not-paying-correctly) covers how the wage side is pursued.
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
Workplace bullying, discrimination and sexual harassment are unlawful in Australia, and a working holiday maker has exactly the same protections as an Australian worker. Visa status, length of service and industry make no difference to that. What does change your options is which of the three you are dealing with, because they run through different processes.

## What actually counts as bullying?

Repeated unreasonable behaviour towards a worker that creates a risk to health and safety. All three parts of that have to be present under the Fair Work Act, and the first is the one that most often decides whether a complaint fits: a single incident, however bad, is not bullying under this definition, though it may well be harassment, assault or discrimination instead.

Unreasonable means behaviour a reasonable person would see as victimising, humiliating, threatening or intimidating. That covers shouting and verbal abuse, humiliation in front of colleagues or customers, deliberate isolation, unjustified criticism, impossible workloads set up to fail, and rumours spread about you. What it does not cover is reasonable management action carried out reasonably, so genuine performance feedback, changes to your duties and lawful directions are not bullying even when they are unwelcome. That distinction is where most complaints are actually decided.

## How is sexual harassment treated differently?

It does not need to be repeated. Sexual harassment is any unwelcome conduct of a sexual nature that a reasonable person would anticipate might make you feel offended, humiliated or intimidated, and one incident is enough to found a complaint.

There is also no minimum service period, which matters a great deal for a workforce that changes jobs every few months. Someone harassed in their second week has the same standing as someone in their second year. The conduct covered is broad: unwelcome touching, sexual comments and jokes, images sent or shown, repeated requests for dates, remarks about your body, and following or stalking. Where it involves assault or stalking it is also a criminal matter, and reporting to police runs alongside the workplace complaint rather than instead of it.

## What can actually be done about it?

Four routes exist, and they lead to different outcomes rather than being alternatives to the same one. Which is right depends on whether the behaviour is ongoing, whether you have been dismissed, and how long you have left in the country.

- **An anti-bullying order** from the Fair Work Commission, which is designed to stop behaviour that is still happening rather than to compensate for past conduct. It requires you to still be employed there.
- **A General Protections claim**, if you were dismissed or treated badly for raising a complaint. No minimum service period applies.
- **A discrimination complaint** under federal or state anti-discrimination law, which can produce compensation and orders for change.
- **A sexual harassment claim** under the Sex Discrimination Act, again with no minimum service period.

The practical branch point is time. Anti-bullying orders only help while you are still there, so leaving the job closes that door and opens the others. If you are close to the end of your visa, the timing question is worth resolving before you fly rather than after.

## Can an employer threaten your visa?

No, and this is the threat that keeps working holiday makers silent more than any other. An employer has no power over your visa: the Department of Home Affairs decides visa matters, a workplace complaint does not trigger any visa review, and making one is itself protected conduct under the Fair Work Act.

Retaliation for raising a complaint is a separate breach with its own remedies, so an employer who threatens you has usually strengthened your position rather than weakened it. If it happens, keep the evidence. Text messages and emails are the most useful because they are dated and unambiguous, and a threat in writing is worth considerably more than one remembered from a kitchen at midnight.

## What should you write down, and when?

Everything, at the time, in whatever form is easiest to keep. Dates, times, what was said or done, where it happened and who else was there. A note made the same evening carries far more weight than a reconstruction made three months later, and it is the single thing that most often decides whether a complaint goes anywhere.

Two practical points. Keep the record somewhere that is not the employer's system, because access to a work email or roster app disappears the moment you leave. And be careful with recordings: the law on recording a conversation without consent differs between states, so a recording that is lawful in Queensland may not be in Victoria. Written notes carry no such risk.

## Does bad treatment usually come with other breaches?

Frequently, and it is worth checking rather than assuming. A workplace prepared to break one set of rules is often breaking others, and the ones that cost you money are quieter than the ones that make you miserable.

The three worth checking are whether you have been paid the award rate for the hours actually worked, whether 12% [super](/superannuation) has reached your fund for each completed quarter, and whether payslips have been issued at all. Those are separate claims with separate processes, and they survive your leaving the job. Our guides on [an employer not paying correctly](/blog/employer-not-paying-correctly) and [unpaid super](/blog/super-employer-not-paying-what-to-do) cover how each is pursued.
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

Four things, and they have to hold together rather than individually. A lawful trial is short, usually under an hour. It is directly supervised. It exists to assess a skill that cannot be assessed at interview. And it does not produce output the business sells.

Thirty minutes demonstrating knife work under a chef's eye, a brief role play of a customer interaction, a short typing test for an office role: those can be lawful. A full day picking on a farm, an evening behind a bar serving real customers, a morning making coffees that paying customers drink: those are work, and the length alone usually settles it.

The phrase employers use is not the test. "Come in Saturday and we will see how you go" describes an unpaid shift whatever it is called.

## Why are working holiday makers the usual target?

Because the arrangement relies on the worker not knowing the rule and not being around long enough to pursue it. Hospitality and retail are where it concentrates, and it is presented as an industry norm rather than as a request, usually to someone who has been in the country a few weeks and wants the job.

The Fair Work Ombudsman has published clear guidance that unpaid trials beyond a brief skills demonstration are unlawful, and has taken action against employers in hospitality, retail and farm work for exactly this. Penalties for the employer include back payment of everything owed plus separate penalties per breach.

## How much is an unpaid trial actually worth?

More than people assume, because a trial shift is usually rostered on a busy day and busy days carry penalties. The calculation starts from the award rate for the classification, not the national minimum, then adds the 25% casual loading, then adds any weekend, evening or public holiday penalty.

A full Saturday in a hospitality venue, calculated properly, comes to a meaningful sum rather than a token one, and that is before any public holiday multiplier. Our guide to [penalty rates in Australia](/blog/penalty-rates-australia) sets out how the loadings combine. As a reference point for the base, the national minimum from 1 July 2026 is $26.44 an hour, or $33.05 casual, and most awards sit above it.

## Does it matter whether you got the job?

No, and this is the point most people get wrong in their own favour and then abandon. The obligation attaches to the work performed, not to the outcome of the recruitment. Someone who did a full trial shift and was never called back is owed exactly what someone who was hired would have been owed.

The Fair Work Ombudsman has recovered wages for workers in precisely that position. Not being hired is often what makes people decide the claim is not worth making, which is part of why the practice persists.

## What do you need to have kept?

Evidence that you were there and evidence of how long, because the legal position is rarely the argument. The argument is almost always about what actually happened, and a message arranging the trial plus a message afterwards is usually enough to establish both.

Text messages, rosters, the job advertisement, the name of the person who supervised you, and the dates and hours. Put the request in writing to the employer with the hours and the amount before escalating, because a share of these are resolved at that step, and the written request itself becomes evidence if they are not.

## What happens to the tax side if you are paid out later?

A back payment is income in the year it is received, not the year the shift was worked, and it should be reported to the ATO through payroll with tax withheld like any other wage. Super should also be paid on it, since it is ordinary time earnings.

That matters more than it sounds for someone lodging a return in the same period, because a payment that arrives without a Tax File Number Declaration in place can be withheld at 45% rather than 15%. Our guide to the [Tax File Number Declaration form](/blog/tax-file-number-declaration-form) covers the window that governs that.

## How long did your trial run?

The rule is not ambiguous. What varies is how much you are owed and how straightforward recovery is, and those turn on the specifics.

- How long the trial ran, since duration is the clearest line between assessment and work.
- Whether you produced anything the business sold, which is what makes it productive work.
- Which award covers the venue and which classification you would have sat at, since that sets the rate.
- Which day and time the shift fell on, because penalties and casual loading often double the figure.
- Whether you have written evidence of the arrangement, which is what usually decides a disputed claim.
- Whether other workers were put through the same thing, since a pattern strengthens a Fair Work complaint considerably.

Any wages eventually recovered are taxable income in the year you receive them, and you can [estimate your tax refund](/calculator) once you know what was actually paid.
 `,
 }, {
 slug: "uniform-laundry-deductions-illegal-australia",
 title: "Can Your Boss Deduct Uniform Costs?",
 description:
   "Deductions from wages need your written consent and must benefit you. Which uniform and laundry charges are unlawful and how to get the money back.",
 category: "Work Rights",
 date: "29 January 2026",
 readTime: 4,
 body: `
An employer can only deduct from your wages where you authorised it in writing and the deduction is principally for your benefit, or where the law requires it. Uniform charges, laundry fees, breakages, till shortages and training bonds fail that test. A contract clause authorising them does not make them lawful.

## Which deductions are actually legal?

The lawful categories are short and closed. Anything outside them, taken without your specific written authorisation, is unlawful regardless of what you signed when you started.

- PAYG tax, which the law requires
- Salary sacrifice into [superannuation](/superannuation), where you specifically arranged it
- Court orders such as child support or a garnishee
- Union dues, where you joined
- Payments you asked the employer to make on your behalf, in writing

That is the list. It is short deliberately, because wages are protected differently from other money in Australian law.

## What is the test that decides it?

Two conditions have to be met together, and the second is the one that defeats almost every deduction a backpacker meets. The deduction must be authorised in writing by you, specifying the amount and the purpose, and it must be principally for your benefit.

A laundry charge benefits the employer, who gets clean uniforms in a controlled state. A till shortage deduction benefits the employer, who transfers a business risk onto staff. Neither passes the benefit test, so written authorisation does not save them. The deductions that do pass are things like a salary sacrifice or a gym membership you chose.

## Which charges are the common unlawful ones?

The pattern is consistent across hospitality, retail and farm work, and it is aimed at people assumed not to complain. Recognising the list is most of the protection.

- Charging you for a uniform the job requires
- A weekly or per shift laundry charge
- Breakages, for glasses, plates or equipment
- Till shortages, often deducted across a whole shift's staff
- Customer walk outs
- Training fees or a bond for time spent learning the job
- Equipment loaned to you
- Withholding final wages because you did not give notice

The last one is worth naming separately. Unpaid wages are not a penalty an employer gets to impose for short notice, and it is the version most often used against departing backpackers.

## What about a refundable uniform deposit?

A deposit is still a deduction from wages, and it has to clear both tests like any other. Structuring it as refundable does not change what it is, and most uniform bond schemes fail the benefit test even where they are documented.

Where the arrangement is otherwise lawful, the bond must be returned in full when the uniform is returned. In practice the returns are where these schemes fall apart, because the money is claimed against wear, cleaning or a missing item and the worker has already left the state.

## How do you get the money back?

The recovery process is free, does not need a lawyer, and works. It begins with arithmetic rather than argument: total the deductions across every pay period, so the request is for a specific amount rather than a grievance.

1. Calculate the total deducted across all pay periods
2. Request repayment in writing, with the breakdown attached
3. Lodge a complaint with the Fair Work Ombudsman if the employer refuses
4. Provide payslips and bank records as evidence

The Fair Work Ombudsman can recover the wages directly and pursue penalties against the employer, and your visa status is irrelevant to your entitlement. Doing it while you are still in the country is considerably easier than doing it from home.

## Why does this reach your tax return?

Because an unlawful deduction usually distorts more than the pay packet. Where the deduction is taken before the wage is reported rather than after, the gross figure sent to the ATO is understated, the 12% super is calculated on the understated figure, and the DASP you eventually claim is smaller.

That is the compounding version, and it is the reason a $15 weekly laundry charge is worth more attention than it looks. Where we prepare a [tax return](/tax-return) we compare what was reported to the ATO against the payslips, which is where a consistent pattern of under-reporting becomes visible.

## What if the employer never called it a deduction?

Some arrangements avoid the word entirely and produce the same result. Being told to buy the uniform yourself from a nominated supplier, or to pay a third party for laundering, moves the cost off the payslip without changing who is bearing it.

Those arrangements are harder to challenge because nothing was deducted from wages, and they are also where a tax deduction may become available instead. A compulsory uniform with a logo or a distinctive design that you paid for yourself is deductible, along with the cost of laundering it, which is a smaller recovery than the wage claim but a real one.

## What decides whether you can recover it?

Three facts, and the first is simply evidence. Whether you have payslips or bank records covering the period, because a deduction that was never documented is much harder to prove than one printed on a slip. Whether the deduction came out of gross or net pay, which changes whether super and tax were affected too. And whether the employer is still trading, which decides how straightforward recovery is.

Our part is the tax and super side, and the wage recovery runs through Fair Work rather than through us. The two are worth doing together, because correcting the wage without correcting the super leaves the larger of the two losses in place. [Get in touch](/contact) if your payslips show deductions you did not agree to.
`,
 },

// ─── MEDICARE & OTHER ─────────────────────────────────────────────────────
 {
 slug: "uk-medicare-reciprocal-agreement-australia",
 title: "UK Medicare in Australia: What Is Covered",
 description:
   "British backpackers get Medicare under the reciprocal agreement. It covers medically necessary treatment, and the 2% levy applies.",
 category: "Medicare & Other",
 date: "3 February 2026",
 readTime: 6,
 body: `
The Reciprocal Health Care Agreement between the UK and Australia is narrower than most British travellers assume and costs more than they expect. It is not the NHS transplanted and it is not health cover. It buys you public hospital treatment and subsidised medicine when something cannot wait until you are home, and it puts you inside the 2% Medicare levy for the year, whether or not you ever see a doctor.

## What does the agreement actually cover?

The agreement covers treatment that is medically necessary, meaning care a doctor considers cannot reasonably wait until you return to the UK. That is a narrower standard than NHS cover and it is the point British travellers most often misread.

- Emergency hospital treatment as a public patient
- GP visits at the Medicare rebate, which is free at a bulk billing clinic and leaves a gap at others
- Subsidised medicines under the Pharmaceutical Benefits Scheme
- Out-patient hospital treatment
- Maternity care where the pregnancy was not known before arrival

The rebate is not the same as the fee. A great many Australian GPs do not bulk bill, so the visit costs you the difference between the doctor's fee and the Medicare rebate.

## What is not covered?

The exclusions are substantial, and they cover most of what a backpacker actually needs. Ambulance is the expensive one, because ambulance is not funded by Medicare for anyone in most states and a single callout runs into several hundred dollars.

- Ambulance in most states
- Dental treatment, beyond limited public dental in some circumstances
- Optical treatment, glasses and contact lenses
- Physiotherapy and allied health outside hospital admission
- Elective treatment, or anything booked before you travelled
- Private hospital treatment, or private patient status in a public hospital
- Treatment outside Australia, including a side trip to Bali or New Zealand
- Repatriation to the UK

## How does this change your Medicare levy position?

This is where the money is, and where the intuition runs backwards. The 2% Medicare levy is charged to people who are entitled to Medicare, and the exemption exists for people who are not. Because the agreement gives British nationals that entitlement, the exemption generally is not available and the levy applies.

It is the entitlement that counts, not whether you ever enrolled, ever saw a doctor, or ever used the card. A British backpacker who never went near a clinic is still entitled, and the levy still applies. This is the opposite of the position for German and Japanese nationals, who have no such agreement, are generally not entitled, and can therefore claim the exemption if they obtain the paperwork. Our guide to [the Medicare levy for working holiday makers](/blog/medicare-levy-working-holiday-makers) sets out the exemption process for those who do qualify.

## How do you enrol?

Enrolment happens in person at a Services Australia office with your UK passport, your visa grant notice, a UK address and an Australian address. It is free, usually completed the same day, and the card is posted to the Australian address within a few weeks.

Do it in the first weeks rather than after something goes wrong. Until the card arrives the enrolment record can be used at hospitals and bulk billing practices, whereas an unenrolled patient is billed and left to reclaim afterwards, which is a much worse position to be in from a hospital bed.

## Do you still need insurance on top?

Yes, and the gaps are the reason rather than the cover. Ambulance, dental, optical, physiotherapy and repatriation are all outside the agreement, and repatriation for a serious injury is the one that reaches five figures.

Cheap state ambulance cover deals with the most likely large bill for a few tens of dollars a year, which is the best value purchase available to a British backpacker in Australia. Our guide to [travel insurance versus OVHC](/blog/travel-insurance-vs-health-insurance-working-holiday) covers which product fills which gap, and the two are not interchangeable.

## What does a GP visit actually cost you?

A GP visit costs nothing at a bulk billing practice, because the doctor accepts the Medicare rebate as full payment. At a practice that does not bulk bill, you pay the fee and Medicare refunds the rebate, leaving a gap of a few tens of dollars.

Bulk billing is far less universal in Australia than British visitors expect, and it is scarcer in city centres and in some regional towns than in outer suburbs. Asking when booking is normal and nobody is offended by it. Prescriptions are charged at Pharmaceutical Benefits Scheme prices, which is the same as an Australian resident pays.

## Where does the agreement leave you at a hospital?

In a public hospital emergency department you are treated as a public patient, which is the position the agreement is designed to produce and it works well. Admission as a public patient carries no charge, and the treatment decisions are clinical rather than financial.

What the agreement does not do is give you a choice. You cannot elect to be a private patient, cannot choose your surgeon, and are not covered in a private hospital at all. For anything elective the answer is generally that it waits until you are home, which is exactly what medically necessary means in this context.

## What decides your position in a given year?

Three facts, and the first two are fixed by your passport. Whether your country has a reciprocal agreement at all, which for the UK it does. Whether you are therefore entitled to Medicare, which follows from the agreement rather than from enrolment. And whether anything changed part way through the year, because a part year of entitlement produces a partial levy position and the dates have to be right.

The part year cases are the ones worth flagging. Someone who arrived in March is entitled from arrival and not before, and someone who left in November is entitled only for that portion of the year. Getting those dates right on a [tax return](/tax-return) is worth real money, and it is a detail that a return prepared quickly tends to round to the wrong whole number.
`,
 }, {
 slug: "german-european-health-insurance-australia-working-holiday",
 title: "Do German Backpackers Get Medicare?",
 description:
   "Germany has no reciprocal agreement with Australia, so cover is on you. Incoming insurance vs Australian OVHC, typical costs, and the levy exemption.",
 category: "Medicare & Other",
 date: "6 February 2026",
 readTime: 5,
 body: `
No. Germany has no Reciprocal Health Care Agreement with Australia, so German working holiday makers are not entitled to [Medicare](/medicare) and pay for treatment privately. The same fact has a second consequence at tax time: not being entitled is what makes the 2% Medicare levy exemption available to you.

## Which countries have an agreement, and which do not?

Australia has Reciprocal Health Care Agreements with eleven countries, and the list is the whole of the answer. There is no partial cover, no EU wide arrangement and no reciprocity through a third country.

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

Germany is not on it, and neither are France, Spain, Austria, Switzerland, the United States, Canada or Japan. Our guide to [countries with a Medicare agreement](/blog/countries-with-medicare-agreement-australia) sets out what each agreement actually covers, because they are not identical.

## What does that mean at a doctor's surgery?

It means you are a private patient and you pay the full fee, with no Medicare rebate and no PBS subsidy on prescriptions. In genuine emergencies treatment is provided regardless of ability to pay, and the bill follows afterwards.

That is the practical gap German travellers most consistently underestimate, because the German statutory system gives no preparation for a country where the payment happens at the counter. Ambulance is the sharpest version: it is not covered by Medicare for anyone in most states, so a single callout is a direct cost.

## Does German statutory cover follow you?

No. Cover under the gesetzliche Krankenversicherung does not extend to Australia. The statutory system reaches EU countries and a small number of treaty countries, and Australia is not among them.

Some private German policies include international travel cover, but these typically cap at around six weeks per trip, which does not cover a working holiday visa. The usual approach is to arrange Anwartschaftsversicherung or otherwise manage the German cover for the period away, and to buy separate cover for Australia. That is a personal financial question rather than a tax one, but it is far easier to settle before leaving Germany than afterwards.

## What cover does the visa require?

The visa requires adequate health cover for the duration of the stay as a condition of grant, without specifying a product. It must be valid for the full visa period, cover medical treatment in Australia, and cover repatriation.

In practice German working holiday makers meet it with comprehensive travel insurance, with Australian Overseas Visitors Health Cover bought from a private health fund, or with both. Travel insurance covers a wider range of risks including cancellation and repatriation but usually caps at twelve months. OVHC is built for medical cover in Australia, renews indefinitely while you are here, and does not cover non medical travel risks. Our guide to [travel insurance versus OVHC](/blog/travel-insurance-vs-health-insurance-working-holiday) sets out which fills which gap.

## How does this change your tax position?

This is the part that is worth money and that almost nobody claims. The 2% Medicare levy is charged to people who are entitled to Medicare. A German national with no reciprocal agreement is generally not entitled, so the levy should not apply, and the exemption is worth about $500 on $25,000 of earnings.

The exemption is not automatic and the ATO will not apply it for you. It is claimed on the return, and to claim it you need a Medicare Entitlement Statement from Services Australia, applied for on form MS015, with a separate statement for each financial year claimed. Services Australia commonly takes weeks to issue one, which is the entire reason most people never get it: they discover the document exists in October, when the return is already due. Our guide to [the Medicare levy](/blog/medicare-levy-working-holiday-makers) covers the process.

Being German is one of the clearer positions in this whole area. A British backpacker is entitled through the agreement and generally pays the levy whether or not they ever saw a doctor. A German backpacker is generally not entitled and can claim the exemption, provided the paperwork is in hand.

## What is the real financial exposure without cover?

The exposure is not the GP visit, it is the admission. A serious injury requiring surgery and a hospital stay is the scenario the visa condition exists for, and air evacuation from a remote area or a medical repatriation flight to Germany sit at the top end of it.

That matters more for a working holiday than for a two week trip, because of where the work is. Farm work, construction and station work carry real physical risk, and they are exactly the jobs that take people hundreds of kilometres from a major hospital. Our guide to [emergency care without Medicare](/blog/emergency-medical-care-working-holiday-no-medicare) covers what an uninsured presentation actually costs.

## When should you apply for the Medicare Entitlement Statement?

Early, and this is the single most actionable line in this guide. The statement is applied for on form MS015 through Services Australia, it is issued per financial year, and it commonly takes weeks rather than days.

Applying in your first months means the document is in hand well before the return is due. Applying in October, when most people first hear of it, means either lodging without the exemption or waiting, and the version where people give up on several hundred dollars is by far the most common outcome of that timing.

## What decides your position?

Three facts. Your nationality, which settles the entitlement question and therefore the levy. Whether you obtained the Medicare Entitlement Statement, which decides whether the exemption is actually claimed rather than merely available. And whether your cover matches the work you are doing, since a policy written for a backpacker who sightsees is not the same as one that pays out after a fall on a construction site.

The statement is the one to act on early. Applying for it in your first months costs nothing and takes it off the critical path, whereas applying in October means lodging without it and amending afterwards. Our guide to [amending a return](/blog/amending-tax-return-australia) covers that route, and it works, but it is the slower version of an outcome you could have had first time. When we prepare a [tax return](/tax-return) the Medicare position is settled before anything is lodged, because it is one of the few items on a working holiday return worth a fixed several hundred dollars.
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
Whether you need private health cover on a working holiday visa is decided by two things: your visa subclass and your passport. Many of the bilateral arrangements behind the subclass 462 require adequate health insurance for the whole stay. And a passport outside Australia's reciprocal health agreements leaves insurance as your only cover.

## Is health insurance a condition of your visa?

It depends on the subclass, and the two are not treated the same way. The subclass 417 Working Holiday visa generally does not impose insurance as a strict condition for most nationalities, although Home Affairs recommends it. Many of the country by country arrangements behind the subclass 462 Work and Holiday visa do require adequate health insurance for the period of stay, and the exact wording varies by which agreement you came in under.

Nobody checks it at the airport, which is why the requirement is widely assumed not to exist. A condition that is never checked on entry can still be raised later, and it is checked in the places that matter most: when a further visa is assessed, and when a hospital asks who is paying.

## Does your passport change what you need?

More than the visa does. Australia has a Reciprocal Health Care Agreement with eleven countries, and a national of one of them can enrol in [Medicare](/medicare) and use the public system for medically necessary treatment while here.

The eleven are the United Kingdom, Ireland, New Zealand, Italy, Malta, the Netherlands, Belgium, Finland, Norway, Sweden and Slovenia. If you hold one of those passports, private cover is a top up over a public system you already have access to. If you hold a German, Japanese, French, Spanish, American or Canadian passport, there is no public system underneath you and private cover is the whole of your protection, which changes both how much cover you need and how carefully you read the exclusions.

- RHCA passport: Medicare enrolment available, private cover fills the gaps
- Non-RHCA passport: private cover is the only cover, and it needs to be comprehensive
- Either way, no Australian arrangement pays to fly you home

## What is the difference between travel insurance and OVHC?

They are built for different risks and a lot of people buy one believing it does the job of both. Travel insurance is a trip product: emergency treatment, ambulance, repatriation home, cancellation, theft and baggage, usually sold for a fixed period of twelve to eighteen months with the option to extend.

Overseas Visitors Health Cover is Australian private health insurance sold to visitors, and it behaves like a domestic health policy: hospital treatment public and private, GP and specialist consultations, pharmaceuticals, and optional extras such as dental, optical and physiotherapy. It renews indefinitely while you are in the country, which is why it suits anyone going for a second year, and it does not usually cover the trip risks or the flight home.

- Travel insurance: broad, time limited, strong on repatriation, capped on medical
- OVHC: medical only, renewable, closer to a substitute for Medicare
- Many working holiday makers end up holding both, deliberately

## What in the fine print actually catches people out?

Work exclusions, more than anything else. A good number of travel policies exclude or limit manual labour, and farm work, construction and anything involving machinery are the usual named categories, which means the policy that felt adequate in London does nothing on a harvest job in Mildura. Read that clause before the first farm shift rather than after it.

The other four to check are the excess, which is what you pay before cover starts, the waiting periods, since pre existing conditions are commonly excluded for twelve months, mental health, where cover varies enormously and waiting periods are long, and adventure activities, because diving, skydiving and bungee jumping are frequently sold as add ons rather than included.

- Manual and agricultural work exclusions
- Excess payable per claim
- Twelve month waiting periods on pre existing conditions
- Mental health limits, which are often the strictest part of a policy
- Pregnancy and maternity, usually excluded outright

## Is ambulance included?

Not automatically, and it is the single most common gap. Medicare does not cover ambulance transport in most of Australia, so it is charged as a separate service regardless of your nationality or your Medicare enrolment.

Where you are when it happens changes the answer. Queensland and Tasmania run state schemes that provide ambulance free or at low cost to residents, while other states treat it as a private cost. Most OVHC and most travel policies include some ambulance cover, but the level differs enough that it is worth confirming rather than assuming.

## Does any of this change your tax?

Only in one direction, and it is the opposite of what people expect. Private cover does not reduce your Australian tax, because the private health insurance rebate is available to Medicare eligible Australian residents and does not extend to working holiday maker OVHC.

What does affect your [tax return](/tax-return) is Medicare entitlement itself. The 2% Medicare levy is charged to people entitled to Medicare, so a non-RHCA passport holder is usually able to claim the [Medicare levy exemption](/blog/medicare-levy-working-holiday-makers), and a British or Irish passport holder with access to the public system usually is not. The exemption is not automatic and it needs a Medicare Entitlement Statement from Services Australia, which takes weeks to obtain and is the reason most people who qualify never claim it.
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
An Australian public hospital will treat you in an emergency whether or not you have [Medicare](/medicare), insurance or money. It will then bill you as a private patient. What decides whether that bill is survivable is your passport and your insurance, both of which are settled long before the ambulance is called.

## What number do you call in an emergency?

Triple zero, dialled as 000, for anything genuinely urgent. It is the Australian equivalent of 999 in the United Kingdom and 112 in Germany, it works from any mobile with or without credit, and the operator asks which of police, fire or ambulance you need.

For situations that are worrying but not life threatening, healthdirect on 1800 022 222 gives free advice from registered nurses around the clock and will tell you what level of care you actually need. For a doctor out of hours in most metropolitan areas, the National Home Doctor Service on 13 SICK, dialled as 137 425, visits your accommodation. Both are worth having in a phone before they are needed, because the moment you need them is not the moment to research them.

## Does your passport change what emergency care costs?

Substantially, and this is the branch point that matters most. Australia has a Reciprocal Health Care Agreement with eleven countries, and a national of one of them is generally entitled to Medicare for medically necessary treatment while in Australia, which covers public hospital emergency care and subsidised medicines.

The list is the United Kingdom, Ireland, New Zealand, Italy, Malta, the Netherlands, Belgium, Finland, Norway, Sweden and Slovenia. A British backpacker therefore arrives with a route into the public system that a German, Japanese, French or Canadian backpacker does not have. The same entitlement is what removes the [Medicare levy exemption](/blog/medicare-levy-working-holiday-makers) at tax time, so it cuts both ways: the countries whose nationals are covered in a hospital are the countries whose nationals pay the 2% levy on their [tax return](/tax-return).

- RHCA passport: public hospital emergency treatment and subsidised medicines, levy generally payable
- Non-RHCA passport: billed as a private patient, levy generally exempt with a Medicare Entitlement Statement
- Neither route covers repatriation home, which is insurance territory only

## What does insurance actually cover?

It depends which of the two products you bought, and they are not interchangeable. Overseas Visitors Health Cover is Australian private health insurance sold for visitors, and it is built around hospital treatment: emergency department attendance, admission as a private patient, surgery, inpatient medicines, and most imaging and pathology.

Travel insurance is built around the trip rather than the hospital. It typically covers emergency treatment, ambulance and repatriation, and it usually covers cancellation and lost baggage as well, but the medical cover is often capped and frequently excludes anything connected to a pre-existing condition or to alcohol. The two gaps that catch working holiday makers are ambulance cover, which varies by state and by policy, and mental health, which is limited or excluded on a great many policies.

- Ambulance: charged separately in most states and not always included
- Repatriation: travel insurance usually, Medicare and RHCA never
- Dental: limited under almost everything
- Working while insured: some travel policies exclude manual work entirely, which is worth reading before a farm job

## What happens if you cannot pay the bill?

The treatment still happens, because Australian hospitals do not condition emergency care on payment. The billing is dealt with afterwards, and a public hospital will generally negotiate a payment plan, sometimes over a long period, rather than pursue an immediate lump sum.

What it does not do is forget. Hospitals pursue unpaid accounts, including through international debt collection after you have gone home, so leaving the country is not a resolution. The costs that turn a bad week into a life altering one are the ones nobody plans for: air retrieval from a remote area and a medically escorted flight home. Those are the specific reasons that going uninsured is not a strategy, and they are the reason insurance for a non-RHCA passport holder is closer to essential than to optional.

## Should you go to a public or a private hospital?

For a serious emergency, the public hospital, and for most working holiday makers the question does not really arise because the ambulance decides. Public emergency departments are free for Medicare eligible patients, which includes RHCA nationals, and where you are billed as a private patient the rates are still lower than the private equivalent.

Private emergency departments charge from the first minute regardless of who you are, and they are the more expensive route in every case. The trade is waiting time for cost, which is a reasonable trade for a broken finger and a poor one for anything that needs a large hospital behind it.

## What should you keep afterwards?

Everything on paper, and it matters more than people expect at the time. The discharge summary, the medication list, the imaging results and every bill are what an insurer needs to assess a claim, and reconstructing them months later from a hospital you have already left is difficult.

The consequences also run past the medical file. An extended period unable to work changes your income for the year, which usually means a larger refund rather than a smaller one, and it can change your [super](/superannuation) position and your DASP timing if you end up leaving Australia earlier than planned. If the recovery pushes past the visa expiry, that is a separate problem to raise with Home Affairs early rather than late, and it is one of the few areas where waiting genuinely costs you options.
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
They cover different things and the honest answer is that most working holiday makers want both. Travel insurance covers emergencies, repatriation, cancellation and theft. Overseas Visitors Health Cover is an Australian health product covering treatment inside Australia. The gap that matters most sits between them, and it is work.

## What does travel insurance actually cover?

The risks of travelling, with medical emergency treatment attached. A comprehensive policy covers emergency hospital and doctor treatment in Australia, repatriation home if you are seriously ill or injured, trip cancellation and interruption, lost or stolen baggage, personal liability, and emergency evacuation from remote areas.

Cover periods are usually capped at twelve to eighteen months with renewal options, and the exclusions are where the detail sits. Pre existing conditions are commonly excluded or limited, high risk activities frequently are, and work related injury very often is.

## What does OVHC cover?

Treatment in Australia, structured like Medicare cover but bought from a private fund. A typical policy covers public and private hospital admission, emergency department visits, GP consultations usually with a gap, specialist consultations, subsidised pharmaceuticals, imaging and pathology, with optional extras for dental, optical and physiotherapy.

It is renewable indefinitely while you are in Australia and can be your ongoing medical cover for a long stay. What it does not do is anything outside Australian treatment: no repatriation, no cancellation, no baggage, and nothing on a side trip to New Zealand or Bali.

## Why do both usually make sense?

Because each one is exactly the wrong product for what the other handles, and a twelve month working holiday reliably produces both kinds of event.

- An emergency in Sydney: both respond, and OVHC usually claims faster with lower gaps
- Repatriation to Germany after a serious injury: travel insurance only
- A stolen laptop and phone in a hostel: travel insurance only
- A routine GP visit for a chest infection: OVHC, or travel insurance with a high excess that often exceeds the bill
- A lost passport in Cairns: travel insurance only
- A trip to Bali partway through the year: travel insurance only

## What is the work related injury gap?

The largest and least understood problem in this whole area. Most travel insurance is written for tourists rather than for people earning wages, and a great many policies exclude injury sustained while working.

That means a fall on a farm, a burn in a kitchen or a cut on a construction site can be declined by the travel policy. What covers it instead is workers compensation through your employer, which is compulsory in every state and covers you regardless of visa status or length of service, with OVHC picking up treatment that workers compensation does not.

So the correct answer to "am I covered at work" is almost never the travel insurance policy. Our guide to [workplace injury rights](/blog/workplace-injury-working-holiday-rights) sets out how the workers compensation claim actually runs, and it is the one worth understanding before you need it.

## Where does Medicare fit?

Only for people entitled to it, and entitlement follows the passport. Nationals of the eleven Reciprocal Health Care Agreement countries, which include the United Kingdom and Ireland, are generally entitled to Medicare and can enrol.

Everyone else, including German and Japanese passport holders, generally is not entitled, and for them insurance is not a supplement to Medicare, it is the entire safety net outside workers compensation. That same entitlement question also decides the 2% Medicare levy on your tax return, in the opposite direction: being entitled is what makes the levy payable, and not being entitled is what makes the exemption available. Our guide to [the Medicare levy](/blog/medicare-levy-working-holiday-makers) covers that side.

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

Very little, and knowing which little matters. Premiums are not deductible against working holiday income, and claim payouts are generally not taxable.

The Medicare levy surcharge, which pushes higher earning Australians toward private hospital cover, does not usually apply to working holiday makers because it follows residency, and the private health rebate does not apply to OVHC for this group. What does affect your return is the 2% Medicare levy itself and whether an exemption is claimed, which turns on entitlement rather than on whether you bought insurance.

## When should you buy each one?

Travel insurance before you fly, because cancellation cover only works if it existed before the reason to cancel did. OVHC can be arranged once you have arrived and know how long you are staying, though waiting periods mean earlier is better than later.

The common sequence is a twelve month travel policy bought at home, then OVHC added once it becomes clear the stay is not a holiday but a year of working and living somewhere. That order is sensible rather than wasteful, because the two products are answering different questions at different points in the trip.

## Where are the gaps in your own cover?

The products are the same for everyone. What you need is decided by your own passport and your own year. The points below decide which gaps actually matter for you, and the work related exclusion is the one most people discover too late.

- Which passport you hold, since that decides Medicare entitlement and therefore what the baseline is.
- Whether you will be working, which is where the travel insurance exclusion bites.
- What kind of work, since farm and adventure activity exclusions are common.
- How long you are staying, since travel policies cap at twelve to eighteen months and OVHC does not.
- Whether you will leave Australia during the visa, which OVHC does not follow you on.
- Whether you have a pre existing condition, which is the exclusion most likely to matter in practice.

Your insurance status does not change the tax, but your Medicare entitlement does, and that is resolved in the [working holiday tax return](/tax-return). You can [estimate your tax refund](/calculator) to see what the 2% is worth against your own income.
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
The Hospitality Industry (General) Award, MA000009, sets minimum rates, classifications, penalties and allowances for hotels, pubs, hostels, nightclubs, function centres and the venues attached to them. It covers working holiday makers on the same terms as anyone else. Whether it covers your job at all depends on the venue type rather than on what you do there.

## Which venues does it actually cover?

Accommodation and licensed venues, and the food service inside them. Hotels, motels, serviced apartments and resorts, caravan parks and hostels, function centres and convention facilities, nightclubs, most casinos, and labour hire companies placing workers into any of those.

What it does not cover is the thing people get wrong. A stand alone restaurant or cafe is covered by the Restaurant Industry Award instead, and a fast food outlet by the Fast Food Industry Award. A waiter in a hotel restaurant and a waiter in the restaurant next door are on different awards doing the same job, with different rates and different Sunday penalties. Our guide to [the Restaurant Industry Award](/blog/restaurant-industry-award-working-holiday) sets out the other side of that line.

## Which classification are you actually on?

One of six grades, and the grade follows your duties rather than your job title. Introductory level covers the first period in the industry with no prior experience. Level 1 covers kitchen hands, room attendants, porters, glass collectors and food and beverage attendants without responsibility. Level 2 covers bar attendants holding an RSA, cook grade 1 and waiters carrying responsibility. Level 3 covers cook grade 2, head waiter for a section, and security.

The introductory level is time limited. After a defined initial period the employer must move you to Level 1 unless there is a genuine reason for continued training, and leaving a backpacker at introductory rates for six months is one of the more common quiet underpayments in this industry.

## How are the rates built up?

In layers, and the flat rate that many venues offer replaces all of them with one number that is almost always lower. The base is the classification rate, reviewed each 1 July in the Annual Wage Review. A casual adds the 25% loading. Then the penalty for the day and time applies on top, then any allowance.

- Saturday: typically a 25% loading on the base, alongside the casual loading
- Sunday: typically 50%, alongside the casual loading
- Public holidays: typically 125%, alongside the casual loading
- Evening work from 7pm to midnight: an additional loading that varies by grade
- Midnight to 7am: a higher overnight loading

The exact percentages and start times sit in the current version of the award and vary between classifications. A flat hourly rate said to cover everything is the clearest single indicator that the layers were not applied.

## What allowances are commonly missed?

Several, and they are missed more often than penalty rates because nobody expects them. The award provides a meal allowance where overtime is worked without a break, a split shift allowance where a shift is broken by an unpaid period, a uniform allowance where the employer requires one and does not provide it, a laundry allowance for washing a required uniform, a first aid allowance for the designated officer, and travel allowances in some short notice circumstances.

The split shift allowance is the one relevant to most backpackers, because split shifts are standard in hotel food service and the allowance almost never appears on the payslip.

## Why is this award breached so often?

Because it is among the most complex modern awards in Australia and it is applied to a workforce that turns over constantly. That combination produces genuine payroll error as well as deliberate underpayment, and from the worker's side they look identical.

The Fair Work Ombudsman has run repeated campaigns into hospitality compliance for exactly this reason. Raising it with the employer first is worth doing, because a share of these are configuration errors that get corrected once identified.

## What does underpayment do to your tax and super?

It understates both. If the wages you should have received are higher than the wages reported to the ATO, then the income on your return is understated and the 12% superannuation calculated on those wages is understated with it.

Recovering underpaid wages therefore increases three things at once: the assessable income in the year the back payment is received, the super the employer owed, and eventually the DASP balance you claim when you leave. Recovering the wages themselves runs through Fair Work rather than through the tax system, and our guide to [unpaid super](/blog/super-employer-not-paying-what-to-do) covers the super half.

## Your venue and your shifts move the rate.

The award is a public document. What it entitles you to is decided by facts about your particular job. Each of the points below changes the hourly figure, and several of them change it substantially.

- Whether the venue is an accommodation or licensed venue, which decides whether this award applies at all.
- Which classification your duties correspond to, and whether you were left at introductory level too long.
- Whether you are casual, which brings the 25% loading on top of every penalty.
- Which hours you worked, since evening, weekend and holiday penalties are separate and stack.
- Whether an enterprise agreement applies, which is common in larger hotel groups and overrides the award.
- Whether allowances such as split shift and uniform were paid at all.
- Whether you are engaged under an ABN, in which case no award covers you.

Whatever was withheld across every venue you worked at reconciles at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 }, {
 slug: "horticulture-award-working-holiday-makers",
 title:
 "Farm Work Pay Rates: The Horticulture Award",
 description:
 "The Horticulture Award MA000028 sets a minimum hourly rate that applies even on piece rates, plus 25% casual loading. What to do if you are paid less.",
 category: "Work Rights",
 date: "26 February 2026",
 readTime: 5,
 body: `
Pay on an Australian farm is set by a legal instrument, not by the farm. The Horticulture Award MA000028 governs picking, packing and general work on fruit and vegetable properties, and no handshake, flat rate or per bin arrangement overrides it. If your 88 days are being earned on a farm, this is the document that decides what those days were worth.

## What work does the award actually cover?

The award covers horticulture: growing, harvesting and packing fruit, vegetables, vines, trees, mushrooms and flowers, and the general farm labour that goes with it. If your 88 days are being earned on a fruit or vegetable farm, this is almost certainly the award that governs your pay.

- Fruit and vegetable picking and harvesting
- Pruning, planting, weeding, vine and tree work
- Packing in farm based sheds
- Mushroom growing and harvesting
- Flower growing and cutting

It does not cover broadacre cropping such as wheat and barley, livestock work on cattle and sheep stations, or aquaculture. Those sit under the Pastoral Award and others, which set different rates, so identifying the right award is the first step rather than a technicality.

## What is the minimum hourly rate guarantee?

The guarantee is the most valuable line in the award for a working holiday maker: however you are paid, your earnings for the time worked must come to at least the minimum hourly rate for your classification. A piece rate is a method of calculating pay, not a way around the floor beneath it.

Where a day of picking produces less than the hourly minimum for the hours worked, the employer must top the difference up. Farms that do not pay that top up are the single most common underpayment pattern in Australian horticulture, and it is the pattern the Fair Work Ombudsman has run repeated national campaigns against. Our guide to [piece rates on farms](/blog/piece-rates-farm-work-working-holiday) sets out how the protection is meant to work.

## Which classification are you actually on?

Classification is decided by the work you do, not by the level written on your payslip, and this is where a quiet underpayment usually hides. The award runs from Level 1 to Level 5, and most working holiday makers sit at Level 1 or Level 2.

- **Level 1**: new employees in the first three months with no prior farm experience
- **Level 2**: workers past three months, or with prior experience
- **Level 3**: skilled work requiring specialised knowledge
- **Level 4**: tractor operators, chemical applicators, supervisors of small teams
- **Level 5**: leading hands and skilled supervisors

Staying on Level 1 past three months when the award moves you to Level 2 is a common and entirely recoverable underpayment. It is also the kind that never shows up unless someone checks the start date against the rate.

## What penalty rates and loadings apply?

Horticulture has narrower penalties than hospitality, but it is not true that farm work has none, and that assumption is what makes flat rates so easy to sell. Casual loading of 25% applies on top of the base rate, and overtime, public holiday and in some classifications weekend loadings apply too.

- Casual loading of 25% on the base hourly rate
- Overtime above 38 hours a week, or 304 hours over an eight week cycle
- A higher rate on public holidays
- Weekend loading in some classifications

There are also allowances that are routinely missing from farm payslips: travel between sites during a working day, a tool allowance where you supply your own, wet weather work and cold storage work. Each is paid on top of the base rate.

## How does award pay connect to your 88 days?

The visa side and the pay side are linked by the same paperwork. Specified work counts toward a second year visa by the day rather than by the hour, and the evidence Home Affairs relies on is the record of you having been properly employed and reported.

Where the work was paid under the award and reported to the ATO through Single Touch Payroll, the visa evidence assembles itself from payslips and income statements. Where the work was cash in hand, the evidence is much harder to establish and the second visa application is where that becomes a real problem. That is the practical reason to refuse cash arrangements on a farm, well ahead of the tax reason.

## What does underpayment cost beyond the wage?

An underpaid wage is not a single loss, it is three. The wage itself is short, the 12% [superannuation](/superannuation) is calculated on the short figure so it is short too, and the DASP payment you eventually claim is smaller as a result.

That is the part farm workers rarely price in. Recovering the wage through the Fair Work Ombudsman is free and the process works, but the super and the eventual DASP only correct themselves if the underlying wage is corrected. Our guide to [unpaid super](/blog/super-employer-not-paying-what-to-do) covers the recovery side.

## What should you check in your first week on a farm?

The first week is when a problem is cheap to fix and easy to leave. Ask which award applies to the crop, what classification you have been placed on, whether the rate includes casual loading, and whether pay is hourly or piece rate.

Getting a piece rate agreement in writing is the single most useful thing to do, because the minimum guarantee only functions where there is a documented agreement to measure against. Tracking your own bins and hours for the first few days converts a vague sense of being short into a figure you can put to the farm, which is a very different conversation.

## What decides whether your farm year was paid correctly?

Four things you can check yourself, and one you probably cannot. Whether the right award applies to the crop, whether your classification matches your actual start date and experience, whether the casual loading is in the rate, and whether the piece rate top up was ever paid on the slow days.

The one that is harder is reconciling what was reported to the ATO against what should have been paid, because the two live in different places and neither the farm nor the labour hire agency volunteers the comparison. That reconciliation is part of preparing a farm worker's [tax return](/tax-return), and farm work is consistently where we find the widest gaps between the wage that was paid and the wage that was owed.
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

It does not cover restaurants inside hotels, which sit under the [Hospitality Award](/blog/hospitality-award-working-holiday-makers), fast food outlets, which have their own award, or any workplace covered by an enterprise agreement that displaces the award. Our guide to [award classifications](/blog/award-classifications-working-holiday-australia) sets out how to work out which instrument applies when it is not obvious.

## Which classification applies to you?

One of six grades, and the grade tracks duties rather than titles. Introductory level covers the first period with no relevant experience. Level 1 covers setting and clearing tables and collecting glasses. Level 2 covers pouring drinks, taking orders, serving food and basic cooking. Level 3 covers supervising a small section or cook grade 1. Levels 4 through 6 run up through cook grade 2, chef de partie, head chef and restaurant manager.

Most working holiday makers in front of house sit at Level 1 or Level 2, and experienced baristas usually at Level 2 or Level 3. Duties drift upward faster than classifications do, which is the specific way this award is quietly underapplied: someone taking orders and pouring drinks is not a Level 1 worker regardless of what the roster calls them.

## How do the rates and penalties build up?

From the classification base, reviewed each 1 July, with the 25% casual loading applied for casuals and then the penalty for the day and time on top.

- Monday to Friday between 7pm and midnight: a modest evening loading
- Saturday: typically a 50% loading for casuals, which incorporates the casual loading in some classifications
- Sunday: typically 75% for casuals
- Public holidays: typically 150% for casuals
- Midnight to 7am: a higher overnight loading

The exact figures and cut off times sit in the current version of the award. The important structural point is that restaurant penalties are not identical to hotel penalties, so an employer applying the wrong award is not making a technicality error, they are paying the wrong Sunday rate.

## What allowances does it carry?

More than most people claim. A meal allowance where overtime is worked without a break, a clothing or uniform allowance where the employer requires a uniform and does not supply it, a laundry allowance for washing a required uniform, a first aid allowance for the designated officer, and a tools allowance where you are required to provide your own equipment such as knives.

The tools allowance matters in kitchens specifically, because chefs and cooks frequently supply their own knives and are entitled to be compensated for it rather than only to deduct it at tax time.

## What happens if the wrong award has been applied?

You have been paid against the wrong rate schedule, and the shortfall accumulates every week rather than once. It is one of the more consistent patterns of underpayment in food service, partly deliberate and partly because small venue payroll is often set up once and never revisited.

Identifying the correct award is therefore the first step rather than a detail. Comparing your payslip against Hospitality Award rates when the Restaurant Award applies will produce the wrong answer in both directions, and the claim will be weaker for it.

## What does it do to your tax and super?

Underpaid wages understate everything downstream. The income reported to the ATO is lower than it should have been, and the 12% superannuation calculated on those wages is lower with it.

Wages recovered later are assessable in the year you receive them, not the year you earned them, and super owed on the corrected figure is recoverable separately. Our guide to [unpaid super and what to do about it](/blog/super-employer-not-paying-what-to-do) covers that side, and pursuing the wages themselves runs through the Fair Work Ombudsman.

## Venue, level and roster set your figure.

The award is public and the rates are published. What you were owed depends on facts about the venue and your roster. The points below are what a wage claim is built from, and the first of them decides all the rest.

- Whether the venue stands alone or sits inside a hotel, which decides the award entirely.
- Which classification your actual duties correspond to, rather than the title you were given.
- Whether you were left at introductory level beyond the point it applies.
- Whether you are casual, which brings the loading on top of every penalty.
- Which hours you worked, since Saturday, Sunday, evening and holiday penalties differ from the Hospitality Award.
- Whether allowances for uniform, laundry and your own tools were paid.
- Whether an enterprise agreement applies instead of the award.

Everything withheld across each venue reconciles at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
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
Your award is decided by the industry your employer operates in, and your classification by the duties you actually perform. Job titles decide nothing. There are over 120 modern awards, and almost every working holiday maker job in Australia is covered by one, which sets the minimum regardless of what any contract says.

## How is an award identified?

By its coverage clause, which defines the businesses it applies to. Each modern award has a name, a reference code such as MA000009 for Hospitality or MA000028 for Horticulture, a coverage clause, and a classification structure setting the levels within it.

The Fair Work Ombudsman maintains the public list and the current rates. That is the authoritative source, and it is free, which matters because almost every dispute about pay in this audience turns out to be a dispute about which document applies.

## What is the three step test?

Industry, then role, then level, in that order. Skipping straight to the level is the mistake that produces confident wrong answers, because two people on the same level of two different awards are on entirely different money.

First, what industry does the employer operate in? A hotel is accommodation and hospitality. A stand alone cafe is the restaurant industry. A fruit farm is horticulture. Second, what is the principal purpose of your work, since two people in the same building can be on different awards, as with a hotel receptionist and an administrator at the same company's head office. Third, which classification matches the duties you actually perform.

A working holiday maker doing three jobs in a year is frequently covered by three different awards, each with its own rates and its own penalty structure.

## Which awards cover most working holiday work?

A short list accounts for the overwhelming majority of 417 and 462 employment, and the code beside each one is what you search for to find the current rates. Anyone doing three jobs in a year is likely covered by three of these.

- [Hospitality Industry (General) Award, MA000009](/blog/hospitality-award-working-holiday-makers): hotels, motels, hostels, hotel bars, function centres, caravan parks
- [Restaurant Industry Award, MA000119](/blog/restaurant-industry-award-working-holiday): stand alone restaurants, cafes, brunch venues
- Fast Food Industry Award, MA000003: fast food chains, takeaway outlets, food courts
- [Horticulture Award, MA000028](/blog/horticulture-award-working-holiday-makers): fruit picking, vegetable harvesting, packing, vine and tree work
- General Retail Industry Award, MA000004: shops, supermarkets, department stores
- Pastoral Award, MA000035: livestock work, broadacre cropping, shearing
- Cleaning Services Award, MA000022: contract cleaning and hotel cleaning through labour hire
- Building and Construction General On-site Award, MA000020: construction labouring and trades assistant work

## What if your employer says no award applies?

It is almost always wrong. An award applies by default, and there are only three genuine exceptions: an enterprise agreement approved by the Fair Work Commission that displaces the award, a senior management role above the award's highest classification, or a genuine independent contracting arrangement under an ABN.

That third exception is where most of the real disputes sit. Our guide to [the employee versus contractor test](/blog/employee-vs-contractor-australia) sets out how the line is drawn, and being handed an ABN does not by itself put you outside the award.

## How is your classification decided?

By skill level, responsibility, whether you supervise anyone and in some awards by industry experience. The controlling principle is that classification follows duties, not titles.

Someone called a supervisor who performs the same tasks as a Level 2 employee is a Level 2 employee. The reverse also holds and is the more common problem: someone regularly running a section, prepping food or training new starters has outgrown the entry classification, and the employer is obliged to pay the level the work corresponds to.

Most awards also carry an introductory level for the first period in the industry, after which you must be moved up unless there is a genuine reason for further training. Keeping a backpacker at introductory rates for an entire visa is a breach in most cases and it is widespread.

## What does an enterprise agreement change?

It replaces the award for that workplace and must leave every employee better off overall than the award would. That test is applied when the agreement is approved by the Fair Work Commission, and an agreement leaving workers worse off is not enforceable.

In practice agreements usually adopt the award structure and add something: higher base pay, extra leave, or improved penalties. They are common in the large supermarket and hotel groups, which is why comparing a Coles or Woolworths payslip against the retail award rates can give a misleading answer in either direction.

## What does the classification do to your tax and super?

It sets the wages you should have received, and everything else is calculated from that figure. Underclassification understates the income reported to the ATO and understates the 12% superannuation calculated on it.

Recovering the difference therefore recovers two amounts rather than one, and increases the eventual DASP balance as well. Wages recovered are assessable in the year they are received rather than the year they were earned.

## Which award and which level are yours?

Which award and which level are both determined by facts you can establish today. None of them requires legal advice, and getting them wrong is what makes an underpayment claim collapse before it starts.

- What industry the employer actually operates in, which decides the award.
- What your duties genuinely are, as opposed to your job title.
- Whether an enterprise agreement applies, which displaces the award entirely.
- How long you have been in the industry, which decides whether introductory rates still apply.
- Whether you are casual, which adds the 25% loading to every rate.
- Whether you are engaged under an ABN, in which case no award covers you and that is the first thing to resolve.

Whatever was withheld across each job reconciles at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 },

// ─── TAX RETURN - PENALTIES & DEDUCTIONS ─────────────────────────────────
 {
 slug: "late-tax-return-penalty-working-holiday",
 title: "Late Tax Return? The Penalty Rules",
 description:
   "Failure-to-lodge penalties start at $330 per 28 days - but are rarely applied when a refund is due. The real rules and how to catch up on old returns.",
 category: "Tax Return",
 date: "3 March 2026",
 readTime: 4,
 body: `
The Failure to Lodge penalty is one penalty unit for each 28 days a [tax return](/tax-return) is overdue, capped at five. At $330 a unit the maximum is $1,650. It can apply even when the ATO owes you money. What decides whether you pay it is your compliance history.

## When is the return actually due?

31 October following the end of the financial year if you lodge it yourself, so a 2024-25 return is due by 31 October 2025. The financial year runs 1 July to 30 June, and the deadline does not move because you have left the country.

Lodging through a registered tax agent changes the date substantially. Agents work to a concessional lodgement programme that runs into the following May, and the extension applies provided you were on the agent's client list before the standard October deadline. That last condition is the one people miss: signing up with an agent in February does not retrospectively extend a deadline that passed in October.

## How does the penalty build up?

In steps of 28 days, not daily, so the difference between being two days late and twenty is nothing at all. Each completed period of 28 days adds another penalty unit until the cap is reached at five, which is a little over four months.

- 1 to 28 days late: 1 unit, $330
- 29 to 56 days: 2 units, $660
- 57 to 84 days: 3 units, $990
- 85 to 112 days: 4 units, $1,320
- 113 days or more: 5 units, $1,650, the maximum

## Does the penalty apply if you are owed a refund?

Legally yes, practically often not, and the distinction matters because both halves of that sentence get quoted on their own. The ATO's position is that the duty to lodge is separate from whether tax is payable, so a refund return lodged late is still a late return.

In practice the penalty is applied selectively, and what decides it is the pattern rather than the single year. A first late return from someone with no other history is treated very differently from a third consecutive year of nothing being lodged. Deliberate non lodgement, or several unlodged years discovered at once, is where the penalty gets applied to refund returns in earnest.

## When does interest get charged as well?

Only when the late return produces a debt. The General Interest Charge runs on unpaid tax from the original due date, compounds daily, and is set well above the cash rate, so a small debt left alone for a few years grows into a considerably larger one.

Where the return produces a refund or a nil outcome there is no interest, because there is nothing outstanding to charge it on. That is the practical reason a late refund return is a much smaller problem than a late return with an ABN year behind it, and it is worth working out which of the two you have before deciding how urgent this is.

## Can the penalty be cancelled?

It can be remitted, which means reduced or removed, and the ATO exercises that discretion reasonably often where there is a genuine reason. Illness or hospitalisation around the deadline, a bereavement, a natural disaster, or an ATO system failure that prevented lodgement are all recognised grounds.

Remission is not automatic and has to be asked for with something supporting it. A first offence with an otherwise clean record is the most commonly granted case, which is another argument for dealing with one late year now rather than letting three accumulate, since the argument gets weaker each time it is made.

## What happens if you have already left Australia?

The obligation follows you, and so does the debt. An unlodged return sits on the ATO record indefinitely, and while the ATO does not chase small penalty amounts across borders with much energy, the record has consequences that surface at inconvenient moments.

Three of them are worth knowing. An outstanding ATO amount can be offset against a later refund, including in some circumstances against a [DASP payment](/superannuation). An unresolved compliance position can cause a second or third year visa application to be looked at more closely by Home Affairs. And a refund you never claimed is still sitting there unclaimed, which is the more common situation by a long way. Lodging late is almost always better than not lodging, because the penalty is capped and the refund is not.

## What if several years are unlodged?

Then the years interact, and not in your favour. The Failure to Lodge penalty is assessed per return rather than across the whole position, so three overdue years can each carry their own five units, and the pattern is also what shifts the ATO from applying the penalty selectively to applying it as a matter of course.

The order you deal with them in matters too. Lodging the oldest first establishes a starting position for each subsequent year, and a refund from one year can be offset against a debt from another, which is why the net outcome of several years lodged together is often very different from what any single year suggested. Refunds from earlier years are still payable, and unclaimed ones from a working holiday two or three years ago are recovered regularly.

## What is the difference between lodging late and amending?

Two different processes with two different limits, and they get confused constantly. Lodging late means the return was never filed, and there is no cut off date for filing it, which is why a 2022-23 return can still be lodged today.

Amending means a return was filed and something in it was wrong. For individuals the standard amendment window is two years from the date the notice of assessment was issued, after which the position is generally fixed. That is the reason a return lodged quickly but carelessly can end up worse than one lodged late but correctly: the late one can still be got right, and the wrong one eventually cannot.
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
If a [tax return](/tax-return) under-reports income or over-claims deductions, the penalty is a percentage of the tax shortfall: 25%, 50% or 75% depending on how the ATO reads the cause. Interest runs on top from the original due date. Which of the three tiers applies is decided by intent, and that is the only part of this you control.

## How much does the ATO already know?

Nearly all of it, before you lodge. Single Touch Payroll gives it a direct feed of every wage payment, the tax withheld from each pay run and the [super](/superannuation) contributions reported to each fund, so the wage side of your return is being checked against a record rather than taken on trust.

The ABN side is covered too, and less obviously. Gig platforms including Uber, DoorDash, Airtasker and Menulog report what they paid you under the Sharing Economy Reporting Regime. Businesses in construction, cleaning, courier, road freight, IT and security report payments made to contractors under taxable payments reporting. Australian banks report interest, and share and crypto platforms report disposals. The practical effect is that omitted income is not hidden, it is simply mismatched, and the mismatch is found automatically.

## What decides which penalty tier applies?

The ATO's view of why the return was wrong, and the three tiers are separated by state of mind rather than by amount. Failure to take reasonable care attracts 25% of the shortfall, recklessness 50%, and intentional disregard 75%.

For working holiday makers the overwhelming majority of cases land in the first tier, because the usual cause is a forgotten employer or a deduction claimed without records rather than anything deliberate. That is also the tier where remission is most often granted. The gap between 25% and 75% is the difference between an untidy return and one where income was knowingly left out, and the ATO distinguishes between them fairly readily.

- Failure to take reasonable care: 25%, the ordinary backpacker case
- Recklessness: 50%, where a substantial risk of being wrong was obvious
- Intentional disregard: 75%, omitted income or invented deductions

## What does a shortfall actually cost?

More than the tax, and the multiplier is predictable. A shortfall of $2,000 assessed at the 25% tier adds a $500 penalty, giving $2,500 before interest. The same $2,000 at the 75% tier adds $1,500, giving $3,500.

The General Interest Charge then runs on the unpaid tax from the original due date, compounds daily and sits well above the cash rate, so the longer the gap between lodging and being corrected the larger the total becomes. Since data matching discrepancies commonly surface a year or two after lodgement rather than immediately, interest is usually a meaningful share of the final figure rather than a rounding item.

## What actually triggers a review?

A mismatch between two records that should agree, which is a narrower list than the phrase ATO audit suggests. Most reviews of working holiday maker returns begin automatically, within weeks of lodgement, and open with a letter asking for information rather than anything more dramatic.

- Reported income lower than the Single Touch Payroll record
- Platform income reported by Uber, DoorDash or Airtasker that is absent from the return
- An employer in the ATO record who does not appear on the return at all
- A deduction well outside the range for that occupation and income level
- A return lodged before employers finalised, so the figures moved afterwards

## What if you have already left Australia?

The debt stays, and so does the ability to collect it. An ATO amount owing does not lapse because you flew home, and the General Interest Charge continues to run on it in the meantime.

Three consequences follow, and the first is the one that catches people. Future refunds can be held against the debt, including in some circumstances a [DASP payment](/superannuation) you were relying on. Larger amounts can be referred for international collection. And an unresolved position sits on your record where Home Affairs can see it if you apply for another Australian visa. None of these is dramatic on its own; together they are why the sensible move on a known shortfall is to correct it voluntarily rather than wait to be found.

## What keeps a return defensible?

Completeness first, then substantiation. Every employer for every job, however short, plus all ABN and platform income, is what removes the most common cause of a shortfall before any judgement about deductions comes into it.

The second half is claiming only what you can support. A deduction with a record behind it survives a review; the same deduction without one becomes a shortfall with a penalty attached, and the difference between the two is a photograph of a receipt taken at the time. A larger refund that unravels two years later, with a penalty and compounding interest on top, is worth less than a smaller one that holds. That is also the reason to be wary of anyone promising an inflated refund in exchange for your TFN and passport: the scheme works by claiming what is not true, and when it comes apart the penalty is assessed against you rather than against them. Anyone charging for tax services in Australia must be listed on the government's public register of tax practitioners, and checking takes a minute.

## Is it better to correct it yourself?

Substantially, and the difference is built into the penalty regime rather than being a matter of goodwill. A voluntary disclosure made before the ATO begins an examination attracts a significant reduction in the shortfall penalty, and one made after an examination starts attracts a smaller reduction, so the same error costs different amounts depending on who found it first.

The practical consequence for a working holiday maker is that discovering an omission is not the disaster it feels like. An employer you forgot, platform income you did not realise was reported, or a deduction you cannot substantiate after all are all fixable by amending the return, and doing it before a letter arrives is what keeps the cost near the tax itself rather than well above it.

## How long does the ATO have to look?

Two years for most individuals, running from the date the notice of assessment was issued, after which the assessment is generally final in both directions. That is the same window inside which you can amend a return in your own favour, so it cuts both ways.

The exception is what makes deliberate omission a different category of risk. Where there has been fraud or evasion, there is no time limit at all, and the ATO can reopen a year indefinitely. That is the practical distinction between an untidy return, which becomes safe after two years, and a knowingly false one, which never does.
`,
 }, {
 slug: "tools-equipment-under-300-instant-deduction-whv",
 title:
 "The $300 Instant Write-Off: Boots and Tools",
 description:
 "Any work item costing $300 or less is deductible in full in the year you buy it. What counts on a farm, a site or in a kitchen, and what evidence holds up.",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 4,
 body: `
Any single work item costing $300 or less is deductible in full in the year you buy it, rather than depreciated over years. Boots, knives, secateurs, hard hats, high visibility shirts, tool belts and hand tools all qualify. From 1 July 2026 a broader $1,000 instant deduction rule also applies.

## What are the three conditions?

All three conditions have to hold together, and it is the second and third that break claims rather than the first. Most people check the price and stop there, which is why the set rule catches so many otherwise genuine deductions.

The item must cost $300 or less on its own, not $300 in total across everything you bought. It must be used predominantly to earn assessable income. And it must not form part of a set that together costs more than $300.

The set rule is the one that catches people. Six kitchen knives bought together for $450 is a set, and no individual knife in it is treated as a sub $300 item, so the whole thing is depreciated. The same chef buying one knife at $80 in October, another at $90 in January and a third at $100 in March has three separate deductible items, because they were genuinely separate purchases rather than a set split up on paper.

## What actually qualifies in the work backpackers do?

Almost anything you had to buy in order to do the job qualifies, and the list is considerably longer than most people claim. Industry matters here, because what the ATO expects to see on a farm return is different from a construction or hospitality one.

- Farm and horticulture: picking buckets, secateurs, pruning shears, gloves, work boots, high visibility shirts, broad brimmed hats and sun protection
- Construction: steel capped boots, hard hats, tool belts, hand tools, measuring tapes, gloves
- Hospitality: kitchen knives, chef whites, slip resistant shoes, aprons
- Delivery and rideshare: delivery bags, phone mounts, dash cams, bike accessories
- Cleaning: protective gloves, equipment and consumables

Sun protection deserves a specific mention because it is genuinely deductible for outdoor work and almost nobody claims it. A season picking in the Riverland or Bundaberg involves real spending on hats, sunscreen and long sleeved protective clothing, and outdoors is where the ATO accepts it.

## What does predominantly for work mean?

That the item's main use is the job, and where it is not, the claim is limited to the work proportion. Items that would be absurd to use otherwise are the easy cases: high visibility clothing, a hard hat, chef whites, steel caps. Those are straightforwardly a full claim.

Mixed use items are where judgement applies. Boots you also wear socially, a backpack that carries picking gear and also goes travelling, a phone mount used for rideshare and for personal navigation. Each is claimable at the work percentage, and that percentage should have a basis you could explain rather than a number you liked.

## What evidence do you actually need?

A receipt showing the cost, the date, the supplier and what was bought, plus a basis for the work use if it is not obviously 100%. Photographs of receipts are accepted, and digital records are as good as paper.

Without evidence the deduction is not claimable however genuine it was, and this is where seasonal workers lose most. Farm and site purchases are frequently made in cash at a rural hardware or a farm supply store, on days when keeping paperwork is the last thing on your mind. A bank card statement, a photograph of the item in use or written confirmation from the supplier can support a claim, but they are weaker than a receipt and they are contested more often.

The practical habit that works is photographing the receipt at the counter and mailing it to yourself. It takes ten seconds and it survives a washing machine, which a paper receipt in a work trouser pocket does not.

## What if an item cost more than $300?

Nothing is lost, it is just claimed over time. Items above the threshold are depreciated over their effective life, generally three to five years for hand tools and small power equipment, so a $400 chainsaw is claimed across several years rather than in one.

That interacts with the new rule from 1 July 2026, which raises the immediate deduction threshold to $1,000 and changes the arithmetic for anyone buying a decent power tool or an e-bike. The [$1,000 instant deduction rule](/blog/1000-dollar-instant-deduction-rule-2026) sets out how the two work together.

## Where do good purchases fail this rule?

The $300 rule sounds simple and fails on details rather than on principle. These are the facts about your own purchases that decide whether a genuine expense is actually claimable.

- Whether items were bought as a set or genuinely separately, which is the difference between an immediate deduction and depreciation.
- Whether you kept receipts, which decides whether an honest expense is a claimable one.
- Whether the item is used only for work, or also personally, and whether you can justify the split.
- Which financial year the purchase falls in, since the threshold changed from 1 July 2026.
- Whether you are an employee or on an ABN, which changes where the expense is claimed and what else can be claimed alongside it.
- What industry you worked in, because farm, site and kitchen work each have a different set of items the ATO expects to see and a different set it does not.

Deductions are claimed through your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you have added up the year's work spending.
 `,
 }, {
 slug: "1000-dollar-instant-deduction-rule-2026",
 title: "The $1,000 Instant Deduction From July 2026",
 description:
   "The threshold for immediately deducting work items jumps from $300 to $1,000 - covering laptops, tools and gear. Who benefits and how to claim it.",
 category: "Tax Return",
 date: "21 March 2026",
 readTime: 4,
 body: `
From 1 July 2026 you can claim a flat $1,000 for work related expenses without receipts, or claim your actual costs with full records. You choose one or the other for the year, not both. Which one is better depends entirely on what your job made you buy.

## What does the flat $1,000 replace?

The requirement to substantiate, not the deduction itself. Claiming the flat amount means putting $1,000 on the work related expenses line without receipts, logbooks or diaries behind it, which removes the single biggest reason working holiday makers claim nothing at all.

It covers the same territory the substantiation rules cover, so the ordinary work expenses of a backpacker year sit inside it: protective clothing and its laundry, tools and small equipment, the work share of a phone plan, work related vehicle use, licences and registrations, and self education tied to the job you already have. It does not extend to things outside the work related category, such as donations or investment expenses, which keep their own rules and can still be claimed separately.

## When is the flat $1,000 the better choice?

When your real work expenses for the year came to less than $1,000, which is the ordinary position for hospitality, retail and cafe work. Someone whose only genuine costs were a couple of black shirts, laundry and a share of their phone is claiming more than they spent and doing so lawfully, which is the point of the measure.

It is also the better choice when the expenses were real but the records are not. Receipts lost in a hostel move, a phone replaced mid year, purchases spread across dozens of small amounts nobody kept paperwork for: all of that becomes irrelevant if the flat amount exceeds what you could have proved anyway.

## When are actual costs better?

When the job required equipment. A construction labourer who bought boots, hard hat, high visibility gear and hand tools across a season, a farm worker supplying their own equipment, or a rideshare driver running a car for work will normally exceed $1,000 on the vehicle alone, and substantiating gets them the full amount rather than a capped one.

Vehicle use is the item that most often decides it. At 91c per kilometre under the cents per kilometre method, a driver covering a few thousand work kilometres passes $1,000 well before anything else is counted, and that claim needs the records that go with it. The branch point is simple to state and worth testing before you choose: add up what you actually spent, and if the honest total is over $1,000, the flat rate is costing you money.

- Tools and equipment beyond incidental purchases
- Protective gear bought rather than supplied
- Work related vehicle kilometres at 91c each
- A phone and data plan used substantially for work

## Can you take the flat amount and add to it?

No, and this is the part that catches people. It is one method or the other for the whole work related expenses category in that year, so claiming the flat $1,000 and then adding a substantiated tool purchase on top is not available.

The consequence is that the choice has to be made after the arithmetic, not before. Expenses of $1,200 claimed under the flat rate forfeit $200; the same $1,200 substantiated is claimed in full. Where the two methods land close together, the flat rate is usually still the better outcome once the work of assembling and keeping records is weighed against the difference.

## Which financial year does it apply to?

The 2026-27 year, which runs from 1 July 2026 to 30 June 2027 and is lodged from July 2027 onwards. It is not retrospective, so it does nothing for a 2025-26 return or any earlier year, and those returns are still prepared under the existing substantiation rules including [the $300 threshold for tools and equipment](/blog/tools-equipment-under-300-instant-deduction-whv).

For a working holiday maker this makes the timing of your year the deciding factor. Someone who arrived in early 2026 has income split across two financial years under two different sets of deduction rules, and the same expense can be treated differently depending on which side of 30 June 2026 it fell. That is worth knowing before you throw receipts away.

## What is the deduction actually worth to you?

Less than the headline, because a deduction reduces taxable income rather than tax. At the working holiday maker rate of 15%, a $1,000 deduction reduces the tax payable by $150, so that is the real figure to hold in mind when deciding whether the substantiation work is worth doing.

Above $45,000 the rate rises to 30% and the same deduction is worth $300, but very few working holiday makers reach that bracket in a single year. The measure is neutral on visa status and applies to a 417 or 462 holder in exactly the same way as to an Australian resident, so nothing about the [tax return](/tax-return) changes beyond the choice of method.

## What still needs records even under the flat rate?

Everything outside the work related expenses category, because the flat amount replaces substantiation for that category alone. Charitable donations, the cost of managing your tax affairs including last year's agent fee, and income protection premiums sit in their own items on the return and keep their own record keeping rules.

The same is true of anything on the income side. Choosing the flat deduction does not reduce what you have to be able to show about your earnings, so cash income, ABN receipts and platform payments still need to be recorded and declared. The flat rate simplifies one line of the return rather than the return as a whole.

## Does it change what you should keep during the year?

Not immediately, and this is the practical trap. You cannot know whether the flat $1,000 or the actual total is better until the year is over, so throwing receipts away in October on the assumption that you will take the flat amount forecloses the choice before you have the information to make it.

The habit that costs nothing is photographing receipts as they happen and deciding in July. For a hospitality or retail year the flat rate will almost certainly win and the photographs will have been unnecessary. For a construction or driving year the total will very likely exceed $1,000, and the photographs will be the difference between claiming the real figure and claiming the capped one.
`,
 }, {
 slug: "bicycle-motorcycle-vehicle-deductions-working-holiday",
 title:
 "Bike, Scooter or Car: What Riders Can Claim",
 description:
 "Delivery riders can claim the bike, the battery, repairs and gear. Cars have two methods, everything else uses actual costs, and employment changes it.",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 7,
 body: `
More than most riders think. A bicycle, e-bike, scooter or motorcycle used to earn income is a work asset, and its cost, repairs and running expenses are deductible in the work use proportion. Cars have two simplified methods. Everything else uses actual costs.

## What decides whether you can claim a vehicle at all?

Whether the vehicle earns you income, and whether you are an employee or working under an ABN. This is the fact that decides everything else on this page and it is where the money is won and lost.

A delivery rider on an ABN riding for Uber Eats, DoorDash or Menulog is using the bike to produce income, and the bike is a business asset. An employee riding to a fixed workplace is commuting, and commuting is private travel that has never been deductible no matter how far it is or how early it starts. The ATO checks this distinction, and it is the first thing a reviewer looks at on a rider's return.

## What can a delivery rider actually claim?

Both the vehicle itself and what it costs to run, in the proportion you use it for work. The asset is claimed either in full or over its effective life depending on what it cost, and the running costs are claimed as you incur them.

- The bicycle, e-bike or scooter itself. Under $300 it is deductible in full immediately, and from 1 July 2026 an instant deduction threshold of $1,000 applies. Above the threshold it is depreciated over its effective life, typically three to five years.
- Repairs and consumables: tubes, tyres, chains, brake pads, servicing.
- Equipment: helmet, lights, lock, panniers, delivery bag, phone mount.
- Electricity to charge an e-bike battery, on a reasonable estimate of the work portion.
- Insurance specifically covering the vehicle.

A bike used 80% for delivery and 20% for getting around is an 80% claim across all of it. That percentage needs a basis, not a guess, and a few weeks of representative records is normally enough to establish one.

## How are cars different?

Cars are the only vehicle class with simplified methods, and there are two. A car for these purposes carries fewer than nine people and under one tonne.

**Cents per kilometre** pays a flat rate per work kilometre, capped at 5,000 kilometres per car per year. It needs a reasonable basis for the estimate rather than every receipt, which makes it the low effort option.

**The logbook method** records twelve continuous weeks of use to establish a work percentage, then applies that percentage to your actual costs for the year: fuel, servicing, registration, insurance and depreciation. The logbook stays valid for five years.

For anyone driving seriously, a rideshare driver in particular, the logbook almost always produces the larger deduction, because 5,000 kilometres is a low ceiling for someone driving for a living. The trade is that it requires the twelve weeks to have actually been kept, and it cannot be reconstructed afterwards.

## What about motorcycles and heavy utes?

Neither is a car for these purposes, so neither gets cents per kilometre or the logbook. Both use actual costs apportioned to work use: fuel, registration and compulsory third party, insurance, servicing, tyres, tolls and parking, and riding gear genuinely required for the work.

That means the records are the constraint. Actual cost claims need actual evidence for each item claimed, and a rider or a tradesperson running a ute in Perth or Darwin without receipts has a real deduction and no way to substantiate it.

## What do people miss most often?

The small recurring costs, because they never feel like a claim at the time. Tolls on work trips, which in Sydney, Melbourne and Brisbane add up to a serious figure over a year. Parking during work activity. Vehicle cleaning for rideshare drivers. E-bike charging. Riding gear.

Bicycle depreciation is the single most missed item of all, because riders assume the ATO does not care about a bike. It does, and a $1,800 e-bike used mostly for delivery is one of the larger deductions a rider will ever have.

## Your vehicle class matters more than your spending.

Vehicle deductions vary more between two riders than almost any other claim, because the rules turn on your employment status and your vehicle class rather than on what you spent. These are the facts that decide yours.

- Whether you are an employee or on an ABN. Commuting is private for an employee, and this is the biggest single branch.
- Which vehicle class it is. A motorcycle or a heavy ute is claimed on actual costs, with a receipt behind every item.
- Whether a twelve week logbook exists, because it cannot be created retrospectively.
- What proportion of use is genuinely work, and whether you have a defensible basis for that number.
- Whether the vehicle cost sits under or over the instant deduction threshold for the year in question.
- Whether most of your ABN income comes from one payer, since personal services income rules can restrict what is deductible against it.

Vehicle claims are made through your [working holiday tax return](/tax-return), and you can [estimate your tax refund](/calculator) once you have a rough figure for the year's costs.
 `,
 },

// ─── SUPER ────────────────────────────────────────────────────────────────
 {
 slug: "dasp-vs-leaving-super-in-australia-pros-cons",
 title:
 "Claim Your Super Now or Leave It Invested?",
 description:
 "The 65% withholding applies whenever you claim, so waiting does not reduce it. Fees, returning to Australia and permanent residency are what decide this.",
 category: "Super",
 date: "24 March 2026",
 readTime: 6,
 body: `
For most working holiday makers leaving for good, claiming is the better answer, and the reason is simple: the 65% withholding applies whenever you claim, so waiting does not reduce the tax. What waiting does is expose the balance to fees. The one genuine exception is permanent residency.

## What does the comparison actually look like?

Take $5,000 sitting in an Australian fund on the day you fly home. Claiming it now produces about $1,750 into an overseas account, typically within 28 days of a complete application, because the taxable component is withheld at 65% and for a working holiday maker that is essentially the whole balance.

Leaving it does not preserve $5,000. The account keeps earning or losing whatever the investment option does, keeps paying fees, and remains inaccessible from overseas unless and until you claim it, at which point the same 65% applies. The tax follows the money rather than the moment, which is the single most misunderstood thing about this decision.

## What happens to super you leave behind?

It shrinks, usually faster than people expect, because three separate costs run against the balance while no contributions run for it. On a small balance those costs can consume the whole account within a few years.

- Administration fees, commonly $50 to $130 a year regardless of balance
- Insurance premiums, deducted automatically unless cancelled, commonly $300 to $800 a year
- Asset based fees of roughly 0.5% to 1.5% of the balance annually

On a typical working holiday balance of $2,000 to $10,000, that fee load reliably outruns any realistic investment return. Insurance is the killer: a backpacker who has gone home and is paying $500 a year for death and disability cover in a country they left is losing a tenth of the balance annually to a policy that will never be claimed on.

Eventually the fund loses contact with you, reports the balance as unclaimed and transfers it to the ATO. There it stops paying fees and stops earning returns, accruing interest at roughly inflation, and it is still subject to the same 65% whenever it is claimed.

## When is leaving it genuinely the right call?

When you are pursuing permanent residency, and only really then. If you become an Australian permanent resident, the balance stops being working holiday super awaiting a departure payment and becomes ordinary superannuation with ordinary and vastly better tax treatment. That is a real and substantial difference, and it is worth waiting for if the pathway is credible.

Everything else usually falls apart under examination. A likely return within two or three years on another temporary visa is not a reason to leave it, because new work builds new super and the old balance pays fees the whole time. A large balance is a weaker reason than it looks, because the 65% applies to the larger number too.

## When is claiming clearly right?

When you are leaving and not coming back on a permanent pathway, which is most people. The case is strongest where the balance is small enough that fees would erode it, where you can use the money now, and where you want your Australian financial position closed while your bank details, address and passport are still current.

That last point deserves more weight than it usually gets. The people who never claim are almost never people who decided not to. They are people who meant to do it later, and then changed address, changed banks, renewed a passport and stopped being findable by a super fund. The claim is much harder in year three than in month one.

## Is it reversible?

No. Once claimed, the money is out and cannot be put back, and a later Australian visa starts a fresh account. That is the honest downside of claiming, and it is the reason the permanent residency case matters.

There is no deadline in the other direction. A claim can be lodged from overseas at any point once your visa has ceased and you have left, years afterwards if necessary, at the same rate.

## Does a second visa change anything?

Not in the way people hope. The 65% rate attaches to super accrued during a working holiday visa period, and it keeps attaching to it even where later contributions are made under a different temporary visa. Returning on a student or skilled visa does not launder the earlier balance into a lower rate.

This is one of the most commonly misunderstood features of the system and it catches returning travellers regularly. The rate is determined by the visa you were on when the contributions were made, not by the visa you hold when you claim.

## Do you plan to come back?

The tax is the same whenever you claim, so this decision is entirely about fees, time and your own plans. These are the facts that actually move the answer.

- Whether permanent residency is a real prospect. This is the only strong case for waiting.
- Whether insurance is still being deducted from the account, which is the fastest way a balance disappears.
- How many funds hold contributions for you, since fees are charged per account and multiple small balances are the worst case of all.
- Whether the balance has already been transferred to the ATO, which stops the fee bleed but stops the returns too.
- Whether your bank account, address and passport are still the ones the fund has on record.
- Whether your final year tax return is also outstanding, which is separate money and usually better news.

The eligibility rules, documents and timing are set out where you [claim your superannuation after leaving Australia](/superannuation), and the final year return is a separate claim you can [estimate](/calculator) on its own.
 `,
 },

// ─── NEW POSTS - BATCH 3: JOBS (12 articles) ─────────────────────────────

// ─── FARM / AGRICULTURE ──────────────────────────────────────────────────
 {
 slug: "fruit-picking-jobs-working-holiday-australia",
 title: "Fruit Picking Pay, Piece Rates and 88 Days",
 description:
   "Picking is paid hourly or per bin, and the Horticulture Award guarantees an hourly floor either way. Days count toward the 88 by the day, not by hours.",
 category: "Work Rights",
 date: "26 March 2026",
 readTime: 6,
 body: `
Which farm you pick on decides more about your year than which fruit you pick. Two growers in the same region on the same crop can differ enormously in how they pay, what they put in writing, and whether the days are reported at all, and those three things set both what you earn and whether your 88 days will stand up later. The [Horticulture Award](/blog/horticulture-award-working-holiday-makers) is the floor beneath all of it.

## What does picking actually pay?

Pay comes in two forms and the second is where the arguments happen. An hourly rate must be at or above the award minimum for your classification, with 25% casual loading on top for casual workers. A piece rate pays per bin, bucket, tray or kilogram.

Since the 2022 award change, a piece rate agreement must be set so that an average competent picker earns at least the casual hourly minimum. The farms advertising a few dollars a bucket that works out to a fraction of the minimum are not driving a hard bargain, they are unlawful. Our guide to [piece rates](/blog/piece-rates-farm-work-working-holiday) covers how the guarantee is meant to operate.

## Where and when is the work?

The harvest calendar moves around the continent through the year, which is why following it is a viable way to complete the 88 days quickly. Different fruit ripens in different regions in a predictable sequence.

- Mangoes: Northern Territory and north Queensland, September to January
- Bananas: Queensland year round, peaking December to May
- Strawberries: Queensland April to October, Victoria and Tasmania in summer
- Apples: Tasmania, Victoria, NSW and WA, February to May
- Citrus: Riverina, Sunraysia and South Australia, May to October
- Stone fruit: Victoria, NSW and South Australia, November to March
- Wine grapes: South Australia, Victoria and NSW, January to April

The practical planning point is that regions fill up. Arriving in Mildura at the start of citrus is a different experience from arriving six weeks in, and the farms with the worst pay practices are the ones still hiring late.

## What makes a day count toward the 88?

Four conditions, all of which have to hold together. The work must be in a designated regional postcode, in an eligible industry, paid rather than volunteered, and documented well enough to prove.

Days are counted as calendar days worked, not by hours, so a short day counts the same as a long one provided it was a genuine paid working day. The documentation is where claims fail: payslips, employer letters and ATO reported income are what Home Affairs relies on, and cash work generates none of them.

That is the practical reason to refuse cash on a farm, ahead of the tax reason. An unreported eight weeks is eight weeks of days you cannot prove, and the second visa is decided on proof.

## Are you an employee or a contractor?

Most fruit pickers should be employees, with tax withheld, 12% [superannuation](/superannuation) paid, and the award applying. Some farms put pickers on an ABN instead, which removes the super obligation, removes the employee form of the minimum guarantee, shifts the whole tax bill onto you, and usually removes workers compensation cover.

The classification is decided by the facts of the work rather than by the paperwork. If the farm decides when you start, where you pick, and how, supplies the equipment, and you cannot send someone else in your place, you are an employee whatever the contract says. Our guide to [employee versus contractor status](/blog/employee-vs-contractor-australia) sets out the test, and this is the single most expensive misclassification in Australian farm work.

## What should you keep, and why?

Farm records serve two different masters, the ATO and Home Affairs, and the same handful of documents satisfies both. Keeping them as you go is far easier than reconstructing them from a hostel in Cairns in October.

- Every payslip from every farm and labour hire company
- Bank statements showing the wages arriving
- A simple diary: date, farm, hours
- Photographs of yourself at the worksite
- Receipts for boots, gloves and sun protection

The diary is the one people skip and later need. A season across four farms with two labour hire agencies blurs completely within months, and the day count is the thing being assessed.

## What can a picker claim at tax time?

The deductions available to a picker are small individually and add up across a season. They are all the ordinary work related kind: you bought it, it earned your income, nobody reimbursed you, and you kept the record.

- Sun protection, including hats, sunscreen and long sleeved shirts
- Work boots and protective footwear
- Gloves
- Your own picking equipment, where you supplied it
- A share of vehicle running costs for moving between farms during a working day
- The work share of phone costs

Accommodation deducted from your pay is a different question and often a contested one. Charges for on farm accommodation can be lawful, but only within limits and only where properly agreed, and inflated accommodation charges are one of the recognised underpayment patterns.

## What separates a good farm from a bad one?

The Fair Work Ombudsman has run repeated national campaigns in horticulture and keeps finding the same behaviours. They cluster together rather than appearing alone, which is what makes them recognisable early.

- Piece rates set below the minimum guarantee, with no top up on slow days
- Inflated accommodation charges deducted from wages
- Wages withheld until the 88 days are complete, then the count disputed
- No payslips issued
- Only part of the wages reported to the ATO
- ABN classification used to avoid super and workers compensation

One of these is a warning. Three of them is a farm to leave, and leaving early is almost always cheaper than staying to argue.

## How do labour hire arrangements change things?

A labour hire company employs you and places you on a farm, which means your employer is the agency rather than the grower even though the grower directs your day. The agency owes the award rate, the payslips and the 12% super, and it is the agency that appears on your income statement.

That matters when something goes wrong, because the farm will point at the agency and the agency at the farm. Licensing schemes for labour hire operate in several states, and checking that an operator is licensed before starting is a reasonable question that a legitimate one will answer immediately.

## What decides how your season turns out?

Three facts, and none of them is how fast you pick. Whether the pay is hourly or piece rate, and if piece rate, whether the agreement is in writing. Whether you are employed or on an ABN, which decides your super, your floor and your cover. And whether the days are being reported, which decides both your refund and your visa.

Tracking your own kilos and hours for the first week is the most useful thing a picker can do, because it converts a vague sense of being underpaid into a number. If the effective hourly rate lands below the casual minimum, the farm owes the difference, and recovery through the Fair Work Ombudsman is free. The tax side runs separately: the wages, the super and the [tax return](/tax-return) all follow from what was actually reported, which is why the two are worth sorting out before you leave the region rather than after.
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

Whatever the property needs, which is the honest answer and the reason the role is described so vaguely in advertisements. Livestock care, mustering, drenching and calving on a station; planting, weeding and harvesting broadacre crops; fencing, water troughs and general maintenance; tractor and machinery work; shearing shed support; hay and dairy work.

The type of property changes the job more than the title does. A cattle station in the Northern Territory, a wheat farm in Western Australia and a dairy in Victoria all advertise for farm hands and all mean something different by it, so the useful question before accepting a job is what the daily tasks are and what hours they run to.

## Which award covers you?

The one matching the principal activity of the business, not the specific task you happen to be doing on a given day. A mixed enterprise running livestock and crops sits under whichever activity is dominant, and that determines your classification, your rate and your penalty entitlements.

- Pastoral Award MA000035: livestock, broadacre cropping such as wheat, barley and oats, shearing
- [Horticulture Award MA000028](/blog/horticulture-award-working-holiday-makers): fruit, vegetables, vines and tree crops
- Dairy Award MA000026: dairy operations

Getting this right matters more than it sounds, because classification within the award sets your rate and the levels rise with the responsibility involved. Someone operating machinery and handling stock unsupervised is not on the entry classification, and being paid as though they were is the most common underpayment in farm work after the piece rate problem. Our guide to [award classifications](/blog/award-classifications-working-holiday-australia) covers how to identify the right level for the work you actually do.

## What should you be paid?

At least the national floor, and in practice more, because award rates for farm classifications sit above it. From 1 July 2026 the casual minimum across all work is $33.05 an hour, being the national minimum wage of $26.44 plus the 25% casual loading, and rates are reset every 1 July by the Fair Work Commission's Annual Wage Review.

Two things move the number from there. Your classification level under the relevant award, which rises with skill and responsibility, and penalty rates for weekend, public holiday and overtime work, which apply on farms as they do anywhere else. The Fair Work Pay Calculator gives the current figure for any award and classification, and it is the only source worth trusting over what a farm tells you.

## Does farm hand work count towards the 88 days?

Most of it does, provided four conditions are met at once. The work has to be in a designated regional postcode, fall inside the specified work categories which include plant and animal cultivation, be paid, and be documented in a way that ties you to the dates and the location.

What does not count is the part people get caught by. Office work for an agricultural business, retail work selling farm produce at a gate or a market, and most roles that are not physically agricultural fall outside the definition even though the employer is unmistakably a farm. Payslips are what settle a dispute about any of this, which is why remote work with informal pay arrangements is where 88 day evidence problems concentrate. Our guide to [farm work rights](/blog/farm-work-rights-working-holiday-australia) covers what evidence actually stands up.

## What should you check in a live-in arrangement?

The net figure, before you accept. Accommodation and meals are commonly bundled into station and remote farm jobs, and deductions for them are lawful only if they are agreed in writing, reasonable, and properly documented on the payslip.

Work out the wage less the stated deductions, divided by the hours you will genuinely work including early starts, and compare that with town work minus hostel costs. Sometimes remote wins clearly and sometimes it only appears to, and the difference is usually in the hours rather than the rate. Undocumented deductions taken at the farm's discretion are the warning sign, because a deduction that cannot be pointed to on a payslip is one that can grow.

## Are you covered if you are injured out there?

Yes, as an employee, and the remoteness makes no difference to the entitlement. Every state and territory runs a compulsory workers compensation scheme covering medical treatment, weekly payments while you cannot work and lump sums for permanent impairment, and it applies from the first shift regardless of visa.

The exception is the one that matters on farms. If you are engaged as a contractor on an [ABN](/blog/farm-work-and-abns), automatic workers compensation cover generally does not apply, which on a property hours from the nearest hospital is a substantial thing to be without. Whether the classification is correct depends on how the work actually runs rather than what the paperwork says, and our guide to [employee versus contractor](/blog/employee-vs-contractor-australia) sets out the test. Our guide to [workplace injury rights](/blog/workplace-injury-working-holiday-rights) covers what to do if it happens.

## What can farm hands claim at tax time?

The gear the job made you buy, which on a farm is a longer list than in most roles. Protective and waterproof boots, work clothing including high visibility gear, sun protection, gloves, small hand tools and knives you supplied, a work share of your phone, and vehicle running costs for movement between separate work locations.

Whether to itemise depends on the year and on the total. For 2026-27 onwards the [flat $1,000 without receipts](/blog/1000-dollar-instant-deduction-rule-2026) is available as an alternative to substantiating everything, and for many farm hands the real total lands close enough to $1,000 that the flat amount is the sensible choice. Our guide to [deductions for working holiday makers](/blog/tax-deductions-working-holiday-makers) covers what qualifies either way.
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

Because the two awards are different instruments with different rates and different weekend penalties. A bar inside a hotel, pub or club sits under the [Hospitality Award](/blog/hospitality-award-working-holiday-makers). A bar inside a stand alone restaurant sits under the [Restaurant Industry Award](/blog/restaurant-industry-award-working-holiday).

Same job, same drinks, different Sunday rate. That is why identifying the award is the first step in checking a payslip rather than a technicality, and it is also the most common reason an employer's figures and yours disagree.

## What classification should you be on?

Level 2 once you hold an RSA and are actually serving alcohol. The Hospitality Award classifies a bar attendant with an RSA at Food and Beverage Attendant Grade 2, while Level 1 covers glass collecting, clearing tables and restocking without service responsibility.

Employers frequently leave people at Level 1 after they have started serving, which is a classification breach and is recoverable. Classification follows the duties you actually perform, not the title you were given or the fact that you started as a glassie a fortnight ago.

## Where does the money actually come from?

Penalties, not the base rate. Bars concentrate their hours precisely where loadings apply: evenings, Fridays, Saturdays, Sundays and public holidays, and a casual gets the 25% loading on top of each of those.

A casual bartender working Thursday through Sunday nights is on loaded rates for most of the week, which is why the same base classification pays materially more behind a bar than in a weekday cafe. From 1 July 2026 the casual floor across all work is $33.05 an hour, and award rates with evening and weekend penalties applied run well above it.

## How does the RSA work, and who pays for it?

It is required before you serve alcohol, it takes a few hours, it is usually available online and it is issued at state level, so a Victorian certificate does not automatically let you pour drinks in Sydney. Our guide to [the RSA certificate](/blog/rsa-certificate-australia-working-holiday) covers which states recognise which.

Ask before paying for it. A meaningful number of venues cover the cost when they hire, and where the employer paid or reimbursed you it is not your deduction because you did not bear the cost. Where you paid for it in connection with work you are doing, the fee is deductible.

## What happens with tips?

Tipping in Australia is far less prevalent than in the United States, because base wages are higher and are not built around gratuities. Tips are voluntary additional payments rather than part of your legal wage.

They are still taxable income, whether taken in cash and kept, or pooled and distributed by the venue, and they should be declared. They also do not count toward award compliance: an employer cannot use tips to make up a shortfall against the rate you were owed. Our guide to [tax on tips](/blog/do-working-holiday-makers-pay-tax-on-tips) sets out how they are reported.

## What goes wrong most often in bars?

A consistent and well documented set of patterns, each of which is recoverable once identified and evidenced. None of them is subtle, and all of them are visible from a payslip and a roster held side by side.

- A flat hourly rate said to cover everything, with no penalty rates applied
- Experienced bartenders left at Level 1 after taking on service duties
- Public holiday loading simply not paid
- Cash payment with no payslip and no superannuation
- Charges for uniform, breakages or till shortages, which are generally unlawful
- Unpaid set up before the shift and unpaid clean down after close

The clean down is specific to bars in the same way it is to kitchens. Close is not the end of the shift, and a roster written to close rather than to actual finish underpays every night by the same margin. Our guide to [unlawful uniform and laundry deductions](/blog/uniform-laundry-deductions-illegal-australia) covers the charges.

## What can a bartender claim at tax time?

Modest amounts, honestly. The RSA course fee where you paid it and were not reimbursed, non slip shoes where the venue requires them, your own bar equipment in the rare cases you supply it, the work share of phone costs, and vehicle running costs where shifts are in locations without transport.

From 1 July 2026 the flat $1,000 work related deduction is available without receipts, which for most bar staff will exceed what could be substantiated item by item.

## Can you start without bar experience?

Yes, and most working holiday makers do. Busy venues run glassies and barbacks who collect glasses, restock fridges, change kegs and keep the bar clear during service, and those roles need no experience and no RSA if you are not serving.

The move up happens fast in a venue that is short staffed, often within weeks rather than months. What makes it happen is holding the RSA before the opportunity appears, because a manager filling a Friday night gap will give the shift to whoever is already able to pour.

## Why do two bartenders earn different money?

The role is the same everywhere. What you are paid for it depends on the venue and the roster. Two bartenders on the same nominal rate can be several hundred dollars apart across a month on the strength of these.

- Whether the bar sits inside a hotel or a stand alone restaurant, which decides the award.
- Whether you hold an RSA and are serving, which should put you at Level 2.
- Whether you are casual, which brings the 25% loading on top of every penalty.
- Which nights you work, since evening, weekend and holiday penalties are where the earnings concentrate.
- Whether an enterprise agreement applies, which is common in large pub groups.
- Whether set up and clean down time is rostered and paid.
- Whether any charge for breakages, till shortages or uniform has been taken from your pay.

Withholding across every venue you worked at reconciles at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
 `,
 }, {
 slug: "barista-coffee-shop-working-holiday-australia",
 title: "Barista Jobs on a WHV: Pay and Training",
 description:
   "Barista pay is set by your award classification and weekend penalties, not by experience. Cafes are weekend businesses, so loadings are most of the income.",
 category: "Work Rights",
 date: "11 April 2026",
 readTime: 6,
 body: `
Barista work is covered by the Restaurant Industry Award in a stand alone cafe and by the Hospitality Award in a hotel cafe. What you are actually paid is decided by your classification level and by weekend penalties, not by how good your latte art is.

## What does the job involve day to day?

The role is the machine, the milk and the counter, in roughly that order of skill and reverse order of time spent. Australian cafes run high volume espresso service, so speed and consistency matter more than the range of drinks, and most roles include food service and cleaning as well.

- Operating espresso machines and grinders
- Steaming milk to specification
- Preparing the standard drinks range
- Taking orders and processing payments
- Preparing simple food in many cafes
- Cleaning equipment and restocking

Senior baristas also train staff, manage a shift, and handle bean ordering. That is where the classification moves up, and where the pay should move with it.

## Which classification are you on, and does it match the work?

Classification is set by the duties you actually perform, not by the job title on the roster. Under the Restaurant Industry Award a new barista with no experience sits at Food and Beverage Attendant Grade 1, an experienced barista working the full drinks range and taking orders sits at Grade 2, and a senior barista supervising a section sits higher again.

Being kept at Grade 1 while doing Grade 2 work is the most common and least visible underpayment in Australian cafes. Someone three months in, running the machine unsupervised through a Saturday rush, is not a trainee, whatever the payslip says. Our guide to [award classifications](/blog/award-classifications-working-holiday-australia) explains how to identify the correct level.

## What does the work actually pay?

Pay is the base rate for your classification, plus 25% if you are casual, plus penalties for weekends and public holidays. Under the Restaurant Industry Award the weekend loadings are substantial: typically 50% on Saturday, 75% on Sunday and 150% on a public holiday.

That weekend structure is where most of a cafe worker's income is decided, because cafes are Saturday and Sunday businesses. A flat rate that sounds generous on a Tuesday is usually a significant loss across a roster weighted to the weekend, and flat rates described as covering everything are the standard mechanism for that loss.

## Are unpaid trial shifts legal?

A brief unpaid demonstration of skills, measured in minutes rather than hours, can be lawful. A full shift of productive work cannot, and it must be paid at award rates whether or not you were subsequently hired.

Cafes are the single worst offender on this in Australia, and the wages are recoverable through the Fair Work Ombudsman for free, including where you did not get the job. Our guide to [unpaid trial shifts](/blog/unpaid-trial-shifts-australia-legal) sets out where the line falls and how to recover the pay.

## Do you need a certificate to get hired?

Generally no. Most Australian cafes do not require a formal barista qualification and will hire on demonstrated machine hours, so a one day course adds less than experience does. A food safety certificate is sometimes required by the employer, and an RSA is needed where the cafe serves alcohol in the evening.

Prior barista experience from another country travels well here, which surprises people. What does not travel is a certificate without volume behind it, because the thing being tested at interview is whether you can hold a queue at 8am.

## What are the underpayment patterns to watch for?

The Fair Work Ombudsman has found the same handful of practices repeatedly in Australian cafes. They cluster rather than appear alone, so a venue doing one of these is usually doing several.

- A flat rate said to cover everything, with no weekend or public holiday penalties
- Unpaid trial shifts of a full day
- Indefinite Level 1 classification despite full duties
- Charging staff for coffee, food or uniform, which is generally unlawful
- Cash payment with no payslip and no [superannuation](/superannuation)
- Unpaid pre-opening set up time

The last one is worth naming because it is so normalised. If you are expected on site at 6am to set up for a 7am open, that hour is work and it is paid.

## What can a barista claim at tax time?

The deductions available to a barista are modest but real. They follow the same test as everywhere else: you paid for it yourself, it earned your income, nobody reimbursed you, and you kept the record.

- Non slip work shoes
- An apron the employer did not provide
- Barista or food safety course fees you paid yourself
- The work share of a phone used for shift communication

Ordinary black clothing is not deductible even where the cafe requires it, which catches out almost every hospitality worker at least once. Our guide to [tax deductions](/blog/tax-deductions-working-holiday-makers) covers where that line sits.

## Where is cafe work best paid?

Melbourne and Sydney have the deepest specialty coffee markets and the most competition for good machine operators, which raises what a skilled barista can command above the award floor. Regional tourist towns pay less on paper and often more in practice, because the roster is fuller and the weekend penalties land on more hours.

The comparison worth making is the weekly figure rather than the hourly rate. Twenty five hours in a busy Melbourne cafe at a strong rate and forty hours in a Byron Bay cafe at the award produce very different weeks, and the second one also fills faster toward the six month mark with a single employer.

## What decides whether a cafe job is worth taking?

Three things, and the hourly rate quoted at interview is the least reliable of them. Whether the classification matches the duties, which decides the base. Whether weekend and public holiday penalties are actually applied, which decides most of the income in a weekend heavy roster. And whether the venue pays super and issues payslips at all, because a cafe paying cash is not only underpaying now, it is removing the 12% super you would eventually claim as DASP.

A quiet route into better paid cafe work exists and is worth knowing: start on the register or the floor at a busy venue, take machine time in the quiet hours, and move to a barista classification within a few months. The part people forget is to check that the payslip classification moved when the duties did. It rarely does on its own.
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

Greeting and seating guests, taking orders, carrying food and drinks, clearing and resetting tables, handling payments, and cleaning and restocking the floor. In a small venue it also quietly expands into barista work, bar service and basic food preparation, sometimes within the same shift.

That expansion is not a detail. Your award classification is determined by the range of duties you actually perform, so a waiter who also pulls beers and runs the coffee machine is doing higher graded work than one who only carries plates, whatever the roster calls the shift.

## Which classification should you be on?

The one matching your duties, and there are four that concern most working holiday makers. Introductory level applies for the first three months with no industry experience. Grade 1 covers setting and clearing tables, collecting glasses and basic service. Grade 2 covers taking orders, pouring drinks with an RSA and full table service. Grade 3 covers supervising a section.

Two rules stop this being open ended. After three months at Introductory level you move to Grade 1 automatically unless there is a genuine training reason to stay. And if you are doing the same work as Grade 2 staff, you should be paid at Grade 2 regardless of how long you have been there. Keeping experienced waiters on the lowest grade is one of the most common underpayments in Australian hospitality precisely because it is invisible without knowing the levels exist.

## What decides your actual take home?

Which days you work, more than which venue you work at. Base rates rise with classification, casual employment adds a 25% loading in place of leave, and then penalty rates apply as multiples of the ordinary rate for Saturdays, Sundays, public holidays and, in some classifications, evenings past a set hour.

The practical effect is that a Friday and Saturday dinner roster is worth substantially more than the same number of midweek lunch hours. It also means that a payslip showing an identical hourly figure across a week that included a Sunday is showing you a breach in one line, and it is the fastest check available. Our guide to [penalty rates](/blog/penalty-rates-australia) sets out the multipliers by day and award.

## What about split shifts and short shifts?

Both are covered by rules most workers never hear about. A split shift, where you work a lunch service, go away for four hours and come back for dinner, attracts an allowance under most hospitality awards precisely because the day is broken.

Minimum engagement is the other one. Every time you are called in there is a minimum period you must be paid for, so being sent home after ninety minutes because the venue is quiet does not mean ninety minutes of pay. Being asked to come in for a two hour shift does not avoid it either. These are the provisions that make an erratic hospitality roster survivable, and they are among the most commonly ignored.

## How are tips treated?

As taxable income, whatever form they arrive in, and they do not reduce what the employer owes you. Tipping in Australia is voluntary and modest by international standards, so it supplements a wage rather than substituting for one.

The distinction that matters is how the tip reached you. Card tips and service charges run through the venue's payroll, so tax is withheld and they appear in your income statement automatically. Cash handed to you directly is reported by nobody, so declaring it on your [tax return](/tax-return) is your responsibility, and a weekly note is enough of a record. Our guide to [tax on tips](/blog/do-working-holiday-makers-pay-tax-on-tips) covers both.

## Which underpayments are most common?

The Fair Work Ombudsman has found the same pattern in restaurant service for years. It is worth knowing the list in full, because each item is separately recoverable and each is easy to miss on its own.

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

Yes, twice over. You need an RSA certificate before you can serve alcohol at all, which is a short course you generally pay for yourself and which is deductible as a work expense.

It also affects your classification. Pouring drinks is Grade 2 work under the Restaurant Industry Award, so a waiter with an RSA who covers the bar should be paid at Grade 2 even when the roster describes the shift as waiting. That is one of the clearest classification arguments available to a working holiday maker, because the RSA is documentary proof of the capability the grade is built around. Our guide to [RSA certificates](/blog/rsa-certificate-australia-working-holiday) covers how to get one and what it costs you in time.
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

Back of house support during service, which in practice means dishwashing plus whatever the kitchen needs. Operating the commercial dishwasher, basic preparation such as peeling, chopping and portioning, receiving deliveries and stocking the cool room, cleaning down surfaces and floors, and supporting the chefs through the rush.

It is physical, hot and relentless during service, and it is where most working holiday makers start because it is the one hospitality role that requires nothing beforehand. It is also the role that reliably leads somewhere else in the same venue within a few months.

## Which award covers you, and at what level?

Whichever award covers the venue, and that is a real distinction rather than a formality. Restaurants generally sit under the Restaurant Industry Award while pubs, hotels and clubs sit under the Hospitality Industry (General) Award, and the classification structures differ.

- Introductory level, for the first period with no industry experience
- Kitchen Attendant Grade 1, covering dishwashing, cleaning and simple preparation
- Kitchen Attendant Grade 2, covering more responsible preparation and working a station with the chefs

Classification follows duties rather than job titles, which is the single most useful thing to know in this role. If you are regularly prepping food or running a section, Grade 1 is no longer the correct classification, and the difference is paid hourly for every hour you work.

## What does it pay once penalties are included?

The base is the lowest in the award, and the actual earnings are not, because kitchen hands work exactly the hours that carry penalties. Evenings, Saturdays, Sundays and public holidays are the shifts kitchens need covered, and each carries its own loading on top of the 25% casual loading.

From 1 July 2026 the casual floor across all work is $33.05 an hour, being the $26.44 national minimum with the loading, and award rates sit above that. A casual working Friday and Saturday dinner service is earning meaningfully more per hour than the headline base rate suggests, and a public holiday shift at up to double time and a half is the highest paid work available to someone with no qualifications at all.

## Why is this role underpaid so often?

Because the shift boundaries are blurry and the workers are usually new to the country. The Fair Work Ombudsman has repeatedly identified hospitality as a high risk area for underpayment, and the patterns in kitchens are consistent enough to list.

- A flat hourly rate said to cover everything, with no penalty rates applied
- Public holiday loading simply not paid
- Cash payment with no payslip and no superannuation
- Unpaid set up time before the rostered start
- Unpaid clean down after service, which in a kitchen can be an hour after front of house has gone home
- Breaks recorded as taken when they were worked through
- Experienced kitchen hands left at the entry classification indefinitely

The clean down time is the one specific to this job. Kitchen hands finish last by definition, and an employer rostering to service end rather than to actual finish is underpaying every shift by the same amount.

## What are the safety and injury rules?

Kitchens carry higher than average injury rates, and every injury sustained during paid work is covered by workers compensation regardless of visa status. Cuts, burns, slips on wet floors, back strain from stock and repetitive strain from prolonged dishwashing are the common ones.

An employer cannot lawfully pressure you not to claim, and a working holiday visa does not affect the entitlement. Our guide to [workplace injury rights](/blog/workplace-injury-working-holiday-rights) sets out how a claim actually works.

## What can a kitchen hand claim at tax time?

Less than a tradesperson and more than nothing. Non slip work shoes, an apron or work clothing where it is specifically required and not provided, knife sharpening if you supply your own knives, and the work related share of phone costs used for shift communication.

From 1 July 2026 there is also a flat $1,000 work related deduction available without receipts, which for most kitchen hands will exceed what they could substantiate individually. Our guide to [the $1,000 instant deduction](/blog/1000-dollar-instant-deduction-rule-2026) explains when the flat figure beats itemising.

## How do you move up from kitchen hand?

By taking on duties and then insisting the classification follows them. The usual progression runs kitchen hand to Kitchen Attendant Grade 2 with real preparation responsibility, then to Cook Grade 1 once you are running a station, and front of house roles open up once you hold an RSA.

The practical method is unglamorous. Note what you actually do across a fortnight, compare it against the award's classification descriptions, and ask payroll for a reclassification in writing. Each step is a different rate for every hour worked, and it does not happen automatically because nobody in the kitchen is watching for it on your behalf.

## What separates your pay from the next hand?

The role is the same everywhere. What you are paid for it is decided by facts about your particular venue and roster. Two kitchen hands on the same roster can be meaningfully apart on pay on the strength of the points below.

- Which award covers the venue, since restaurants and pubs sit under different instruments.
- Which classification your actual duties correspond to, rather than the title on the roster.
- Whether you are casual, which brings the 25% loading on top of every penalty.
- Which hours you work, since evenings, weekends and holidays are where most of the earnings sit.
- Whether clean down time after service is rostered and paid.
- Whether an enterprise agreement applies, which is common in larger hotel groups.

Whatever the rate, the withholding across every venue you worked at reconciles at the end of the financial year, and you can [estimate your tax refund](/calculator) from your year to date figures.
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

The reason it pays what it does is the same reason it needs the safety regime around it. Construction carries higher injury rates than almost any other sector working holiday makers enter, which is why the induction is compulsory, why the personal protective equipment is not optional, and why workers compensation matters more here than in a cafe.

## Why do you need a White Card first?

Because it is unlawful to be on a construction site without one, for you and for the employer. It is issued on completion of the General Construction Induction course, which runs as a full day in person or as an online equivalent, and it is recognised in every state and territory once issued.

Two details are worth knowing. The card does not expire, but it lapses if you do no construction work for two years, which is irrelevant for most working holiday makers and matters if you come back later. And the course fee is set by the training organisation rather than by the government, so it varies by state and provider, which means shopping around is worth ten minutes. The fee is deductible as a work related expense. Our guide to [White Card requirements](/blog/white-card-australia-working-holiday) covers the state by state detail.

## What decides your hourly rate?

Your classification level under the award, and it is the number nobody tells you. The Building and Construction General On-site Award sets rates by Construction Worker level, rising with the skills and responsibilities the role actually involves, and being paid at CW1 while doing CW3 work is a common and entirely invisible underpayment.

Then the loadings apply on top. Casual employment carries a loading in place of leave, Saturday, Sunday and public holiday work attract penalty rates, and overtime is paid at a multiple of the ordinary rate. A week with a Saturday in it should look materially different on a payslip from a week without one, and if it does not, that is the first thing to ask about. Our guide to [award classifications](/blog/award-classifications-working-holiday-australia) covers how to find the level that matches your actual duties.

## Which allowances go unpaid?

The industry allowance, more than any other, and it is paid to every construction worker on the award rather than to a select few. It exists to compensate for the conditions of construction work generally, so there is no qualifying test to fail, and its absence from a payslip is the single most reliable sign that the award is not being applied properly.

Several others attach to particular circumstances rather than to everyone, and each is a fact about your own week rather than a general rate.

- Tool allowance, where you supply your own tools
- Site allowance, on some major projects
- Height allowance, for work above set heights
- Wet weather allowance, where work continues through heavy rain
- First aid allowance, for the designated first aid officer
- Travel allowance, where the site is distant from the depot

## What happens if you are put on an ABN?

Everything that protects you stops applying, which is why it is worth checking rather than accepting. Labour hire on construction sites is common and some of it is genuine contracting, but a labourer with set hours, supplied tools, a supervisor directing the work and no other clients is an employee whatever the invoice says.

The cost of being misclassified is concrete rather than theoretical: no 12% [super](/superannuation), no workers compensation cover if you are hurt, no casual loading, no penalty rates and no award allowances. On a site where injury risk is genuinely elevated, the workers compensation half is the one that matters most. Our guide to [employee versus contractor](/blog/employee-vs-contractor-australia) sets out the test, and the [labour hire](/blog/labour-hire-agencies-working-holiday-australia) guide covers working out who legally employs you when an agency is involved.

## What happens if you are injured on site?

Workers compensation covers you from the first shift, with no minimum service period and no relevance to your visa. It covers medical treatment, weekly payments while you cannot work, and lump sums for permanent impairment.

The two things that go wrong are both about the first 48 hours. An injury not reported to the employer at the time becomes much harder to establish later, and treatment sought without mentioning that it happened at work starts a medical record that does not connect to the claim. An employer discouraging a claim is acting unlawfully, and visa status is not a relevant consideration in any part of the process. Our guide to [workplace injury rights](/blog/workplace-injury-working-holiday-rights) covers the framework.

## What can you claim at tax time?

More than most working holiday maker roles, because construction requires you to buy things. Steel capped boots, high visibility clothing, a hard hat and gloves where you supply them, sun protection for outdoor work, hand tools, and the White Card course fee itself are all work related expenses.

Whether you itemise them depends on which financial year you are in. For 2026-27 onwards you can take the [flat $1,000 without receipts](/blog/1000-dollar-instant-deduction-rule-2026) or substantiate the actual amount, and construction is one of the few backpacker occupations where the real total genuinely exceeds $1,000, in which case keeping receipts from day one is worth doing. Travel between two sites in a day is deductible; the commute from home to the first site is not.
`,
 },

// ─── GIG ECONOMY ─────────────────────────────────────────────────────────
 {
 slug: "uber-eats-delivery-rider-working-holiday-australia",
 title:
 "Uber Eats on a WHV: ABN, Tax and Claims",
 description:
 "Delivery riding is contracting, so you need an ABN and nothing is withheld. What to set aside, when GST applies, and what the bike is worth at tax time.",
 category: "Work Rights",
 date: "12 May 2026",
 readTime: 6,
 body: `
Food delivery is contracting, not employment. You need an [ABN](/abn), nothing is withheld from your payouts, and the tax arrives as a single bill at assessment. GST does not apply to delivery until turnover passes $75,000, unlike passenger rideshare, where it applies from the first dollar.

## Why is delivery treated as contracting rather than a job?

The platform buys a completed delivery, not your time, so it pays you as a business rather than as an employee. That single classification decides everything else: no PAYG withheld, no employer superannuation, no award rate, no workers compensation by default, and an ABN required before you can be paid at all.

Without an ABN on the account, the payer must withhold at 47% under the no ABN withholding rule, which is a different and higher rate than the 45% that applies to wages without a TFN. Our guide to [what an ABN is](/blog/what-is-an-abn) covers when the classification is legitimate and when it is being used to avoid employing you.

## How is delivery income actually taxed?

Delivery income is taxed at the working holiday maker rates, at 15% on the first $45,000 and 30% from there to $135,000, exactly as wages are. The difference is timing, not rate: because nothing is withheld through the year, the whole amount falls due when the [tax return](/tax-return) is assessed.

This is the part that catches riders. Wages arrive already taxed, so the money in the account is yours. Platform payouts arrive untaxed, so a portion of the money in the account belongs to the ATO and has simply not been collected yet.

## When does GST actually apply to you?

GST applies to delivery only once your turnover from the work exceeds $75,000 in a financial year, which very few working holiday riders reach. Passenger rideshare is the exception in Australian GST law: driving passengers requires GST registration from the first dollar, regardless of turnover.

The trap is doing both. If you drive passengers as well as delivering food, the rideshare rule pulls your whole gig income into the GST system, so a few Uber passenger trips can change the treatment of a year of delivery work. Our guide to [driving Uber on a WHV](/blog/uber-driver-working-holiday-australia) sets out that boundary.

## What can a delivery rider claim?

Deductions are where delivery work becomes worth doing, because the gross figure on a platform statement bears little relation to what you are taxed on. The vehicle, the equipment and the phone are all partly or wholly deductible, and platform service fees are deductible in full.

- **Bicycle or e-bike**: depreciation over its effective life, repairs, tyres, chains, brake pads, and charging for an e-bike
- **Motorcycle or scooter**: fuel, registration, insurance, maintenance and depreciation, at the work percentage
- **Car**: cents per kilometre up to 5,000 km, or the logbook method, which our guide to [the 12 week logbook](/blog/vehicle-logbook-abn-working-holiday) explains
- **Equipment**: delivery bag, helmet, lights, lock, panniers, phone mount
- **Phone**: the work share of the plan and of the handset cost
- **Platform service fees** deducted by Uber, DoorDash or Menulog

The income side of a delivery return is fixed, because platforms report your earnings to the ATO under the sharing economy reporting regime and the data is matched against what you lodge. The deduction side is the only part where anything is decided.

## What records make the difference?

The records that matter are the ones that turn a plausible percentage into a defensible one. Platform annual statements establish the income, but it is the kilometre log and the receipts that establish everything you subtract from it.

- The annual statement from each platform you rode for
- Bank statements showing the payouts
- Receipts for the bike, the equipment and the phone
- A logbook or a representative period for work use of anything shared with private life
- Total kilometres ridden for delivery

The riders who end up with the worst outcome are not the ones who claimed too much. They are the ones who kept nothing, took the conservative figure to be safe, and paid tax on income they never really had.

## Are you covered if you are injured?

Riders with an ABN are contractors, so workers compensation does not apply automatically the way it would to an employee. Cover depends on what the platform provides and what you bought yourself, and it is generally narrower than an employee would have for the same accident.

Some platforms carry an injury insurance product that operates while you are on an active delivery. Personal accident cover and the bicycle itself are separate purchases. Our guide to [workplace injury rights](/blog/workplace-injury-working-holiday-rights) explains where the line falls, and it is one of the genuine trade offs of gig work rather than a paperwork detail.

## How do the platforms differ for tax?

The platforms pay differently and report identically, which is the combination worth understanding before signing up to three of them. Uber Eats, DoorDash and Menulog all report your annual earnings to the ATO under the sharing economy reporting regime, so the income side of your return is effectively pre-filled whether you remember the work or not.

What differs is the fee structure and how each statement presents the numbers. Some show gross earnings before the platform's service fee and some show net, so adding three annual statements together without checking which basis each uses is a common way to overstate or understate a year by a meaningful margin.

Riding for several platforms at once, which most riders do to keep orders flowing, therefore needs one habit: keep each platform's annual statement separately rather than working from bank deposits. Deposits net off fees, adjustments and incentives in ways that cannot be unpicked afterwards, and the ATO holds the gross figures.

## What decides whether your year ends well or badly?

Four things, and none of them is how many hours you rode. Whether you set money aside as you went, because the bill lands in one piece. Whether you also had wage income with tax withheld, since that withholding can absorb some or all of the ABN liability. Whether you drove passengers at any point, which changes your GST position. And whether you kept the records that support the deductions.

The riders we see with a surprise bill are almost always the ones who treated each payout as spendable. Setting aside 15% to 25% of every payment, in a separate account, is the difference between a year that closes cleanly and one that closes with a debt you are trying to clear from another country. Our guide to [ATO payment plans](/blog/ato-payment-plan-tax-debt-australia) covers what happens if that is where you already are.
`,
 }, {
 slug: "uber-driver-working-holiday-australia",
 title: "Driving Uber: ABN and GST From Dollar One",
 description:
   "Rideshare requires an ABN and GST registration regardless of income - unlike delivery. Setup steps, quarterly BAS, car deductions and visa rules.",
 category: "Work Rights",
 date: "15 May 2026",
 readTime: 6,
 body: `
Rideshare carries the strictest tax rules of any gig work in Australia. You need an ABN, you must register for GST from the first fare regardless of turnover, and you must lodge quarterly Business Activity Statements. That first dollar GST rule is what separates rideshare from food delivery, and it is what builds unexpected debts.

## Why does rideshare have its own GST rule?

Because passenger transport is treated as taxi travel for GST purposes, and taxi travel has no registration threshold. Ordinary ABN work only requires GST registration once turnover passes $75,000 a year. Rideshare requires it from the first fare, whether you earn $500 or $50,000.

It applies to Uber, Ola, Didi and any platform carrying passengers for a fare. It does not apply to Uber Eats, other food delivery, or parcel and logistics work, all of which follow the standard threshold. Our guide to [delivery riding](/blog/uber-eats-delivery-rider-working-holiday-australia) covers that side.

The rule that catches multi appers: if you drive passengers at all, the registration obligation is triggered, and it then sits over your enterprise rather than over one app.

## What does GST registration actually require of you?

One eleventh of every fare belongs to the ATO, and a Business Activity Statement is lodged quarterly to remit it. You also claim GST credits on business expenses, which is what makes the net cost far lower than the headline fraction.

In practice you do not add GST to a price, because the platform sets the fare and reports the gross. Your obligation is to remit the GST component of what you were paid and to claim credits on fuel, servicing, parts and vehicle finance. For an active driver, the net cost after credits typically lands somewhere around 5% to 8% of fare income rather than the full ninth.

Ignoring it is what creates the debt people arrive with. A driver who worked six months without lodging a statement can face backdated liability on every fare taken, and that is a substantial figure rather than a formality.

## When are the statements due?

Quarterly, on a fixed calendar. July to September is due 28 October, October to December is due 28 February, January to March is due 28 April, and April to June is due 28 July.

Lodging through a tax agent typically extends those dates. Missing one triggers failure to lodge penalties on the same basis as a late return, charged per 28 days overdue. Our guide to [late lodgement penalties](/blog/late-tax-return-penalty-working-holiday) covers how those are calculated.

## What do you need before you can drive at all?

Two things beyond the ABN: a compliant vehicle and a state driver authorisation. The vehicle requirements are set by the platform and generally mean a four door sedan, hatchback, SUV or wagon under a maximum age, in good condition, currently registered, roadworthy and comprehensively insured, with a platform inspection.

The authorisation is a state matter and it is separate from your ordinary licence. New South Wales requires a Passenger Transport Authorisation, Victoria a Commercial Passenger Vehicle accreditation, Queensland a Driver Authorisation, South Australia a General Passenger Transport Accreditation, Western Australia a PTD authorisation and the ACT a Public Vehicle Licence. Each generally involves a police check, a medical assessment and a fee, and the fee is deductible.

Drivers without a suitable car sometimes use a rideshare rental scheme, and the rental cost is deductible against the income in the same way.

## What can you deduct?

More than almost any other backpacker work, because the vehicle is the business and every cost of running it is in play.

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

Vehicle costs go through either the cents per kilometre method, capped at 5,000 kilometres a year, or the logbook method, which is uncapped but requires twelve continuous weeks of records. Full time drivers clear the 5,000 kilometre cap within months, so the logbook is almost always worth substantially more. Our guide to [vehicle logbooks](/blog/vehicle-logbook-abn-working-holiday) covers what one has to contain.

## Does the ATO already know what you earned?

Yes. Platforms report driver earnings directly under the Sharing Economy Reporting Regime, so the gross figure sits in ATO systems before you lodge anything and is matched against your return.

That makes rideshare one of the least forgiving areas to be casual about. It also means the record you need is not proof of income, which already exists, but proof of expenses, which does not exist anywhere except in what you kept.

## How much should you set aside as you go?

Enough for two separate obligations, which is why driving catches people out more than wage work. The GST component of your fares belongs to the ATO and is remitted quarterly. The income tax on your profit is a second amount, assessed at the end of the year.

Neither is withheld for you. A driver who treats the whole deposit from the platform as earnings has spent both, and finds out at the first Business Activity Statement rather than at lodgement. Setting aside from each week, into an account you do not touch, is the only mechanism that reliably works for someone earning weekly and paying quarterly.

## What has to happen when you stop driving?

Two closures, and people usually do neither. Cancel the GST registration and lodge the final Business Activity Statement, then cancel the ABN itself, dated to when you actually stopped rather than to the day you remembered.

An open GST registration keeps generating quarterly obligations for a person who has left the country, and those accumulate failure to lodge penalties in your absence. Our guide to [cancelling an ABN](/blog/how-to-cancel-your-abn) sets out what should be finished before the cancellation date.

## Your driving pattern moves the final figure.

The registration rules are not optional. What the year costs you depends on how you drove it. Each of the points below moves the final figure, and the first two of them are the ones that create debts rather than refunds.

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

More than the obvious ones, and the pay differs sharply between them. Lift operations, ski and snowboard instruction, ski patrol, hospitality across bars and restaurants, accommodation housekeeping and reception, retail in hire and clothing shops, snowmaking and grooming on overnight shifts, and ticketing and bookings.

The two that require qualifications before you apply are instruction, which needs Australian Professional Snowsport Instructors certification or a recognised international equivalent, and patrol, which needs both medical and snow qualifications. Everything else is trainable on site, which is why lift operations and hospitality take the largest share of working holiday makers.

## When do you have to apply?

March and April, for a season starting in June. Australian resorts recruit in a single autumn wave and most positions are filled well before the first snow, so an application in May is competing for whatever is left rather than for the roster.

Staff accommodation is allocated with the early offers, which is the real reason the timing matters. Housing on or near the mountain is scarce, and an offer without it turns a profitable season into an expensive one very quickly. What improves your odds is an RSA already in hand for hospitality roles, any prior snow experience for lift operations, and genuine flexibility about which department you land in.

## Which award covers you?

The one that matches the work, not the fact that it happens on a mountain. That is the single most useful thing to understand about ski resort pay, because the same resort employs people under three or four different instruments at once.

- Hospitality roles: the [Hospitality Award](/blog/hospitality-award-working-holiday-makers), with evening, weekend and public holiday penalties
- Retail in hire and clothing shops: the General Retail Industry Award
- Lift operations: commonly the Amusement, Events and Recreation Award, or a resort enterprise agreement
- Instruction: arrangements specific to the resort or ski school
- Snowmaking and grooming: overnight and shift loadings apply

Weekends are the resort's peak, so casual staff commonly work Friday through Sunday, which is precisely when penalty rates are highest. A roster loaded towards the weekend is worth materially more than the same hours midweek, and that is the roster to ask for.

## What should you check about staff accommodation?

The deduction, in writing, before you accept. Resort housing arrangements differ: some provide accommodation free or heavily subsidised as part of the package, some charge a weekly rent taken out of wages, and some leave you to find your own on a mountain where there is almost nothing available.

Where rent is deducted from pay it has to be a lawful deduction, meaning agreed in writing, reasonable, and shown on the payslip. Work out the net figure before you commit: the wage less the accommodation charge, divided by the hours you will genuinely be rostered, and compare that with a job in town. Our guide to [what deductions from wages are lawful](/blog/uniform-laundry-deductions-illegal-australia) covers the test.

## Does ski work count towards the second year visa?

Generally no, and this is where people are most often misinformed. Tourism and hospitality work counts as specified work only in northern Australia or in designated remote and very remote areas, and the alpine resorts in New South Wales and Victoria do not sit in those zones.

That means a season pulling beers at Thredbo is unlikely to advance your 88 days, however regional the postcode feels while you are up there. Some construction and maintenance work performed at a resort can fall into an eligible category on its own terms, which is a narrow exception rather than a general one. Because the postcode lists and eligible categories are set by Home Affairs and change, verify your specific role and location against their current lists before you rely on a ski season for a second year rather than after it.

## Are you covered if you are hurt on the mountain?

Yes, as an employee, and snow work is exactly the setting where it matters. Workers compensation covers medical treatment, weekly payments while you cannot work and lump sums for permanent impairment, from the first shift, with no relevance to your visa.

The injuries that arise are not only the dramatic ones. Falls during instruction or patrol, slips inside resort buildings, lifting injuries in hire shops fitting gear all day, and cold related injuries on overnight snowmaking shifts are the pattern. Report anything at the time it happens rather than at the end of the season, because an injury not recorded when it occurred is far harder to establish later. Our guide to [workplace injury rights](/blog/workplace-injury-working-holiday-rights) covers the framework.

## What can you claim at tax time?

More than most seasonal roles if you instruct, and very little if you do not. Sun protection matters more at altitude than most people expect, non slip footwear for indoor roles, uniform items you had to buy, a work share of your phone, and travel between separate mountain locations during a working day are the ordinary ones.

Instructors are the exception worth taking seriously. Course fees for the instructing qualification, goggles and eyewear used for the role, and your own skis or board used in instruction are deductible, with apportionment for personal use. Equipment used 60% for instruction and 40% for your own runs is 60% deductible, and the apportionment has to be honest and recorded rather than assumed. A concentrated three or four month season can also sit alongside other income in the same financial year, which is worth knowing before the [tax return](/tax-return) is prepared.
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

A wider range than the checkout, and the shifts pay differently. Checkout and customer service, grocery filling during trading hours, overnight replenishment, the fresh departments covering deli, bakery, butcher and seafood, liquor where an RSA is required, online order picking, receiving and dock work, trolley collection and in store cleaning.

The chains hire continuously across most of these in every city, which is why supermarket work is the fallback that is almost always available. Online order picking and trolley collection in particular turn over constantly, and availability on evenings and weekends is what gets an application looked at.

## What decides your pay rate?

Two things in sequence. First, whether the store is covered by the General Retail Industry Award or by an enterprise agreement, because Coles and Woolworths both operate under agreements that replace the award while ALDI applies the award more directly. Second, your classification level within whichever applies.

The classification is where working holiday makers lose money quietly. Level 1 covers standard duties, Level 2 covers broader responsibilities, Level 3 covers delegated authority and training others, and the level is determined by what you actually do rather than by how long you have been there. Someone training new starters and running a department while classified at Level 1 is being underpaid, and it is invisible on a payslip unless you know what the levels are. Our guide to [award classifications](/blog/award-classifications-working-holiday-australia) sets out the test.

## What does an enterprise agreement change?

It replaces the award entirely for the workers it covers, and it can restructure the penalty rates rather than simply lifting the base. Agreements generally set base rates above the award and adjust the loadings, sometimes upward and sometimes downward, along with different rules for breaks and overtime.

The protection is the Better Off Overall Test, which requires each employee to be better off under the agreement than under the award. That is a real test applied by the Fair Work Commission at approval, and it is why an agreement with lower Sunday loading can still be lawful if the base rate more than compensates. The practical consequence for you is that comparing your Coles payslip against the General Retail Award proves nothing: the agreement is the document to check, and it is published on the Fair Work Commission website.

## Why do overnight shifts pay so much better?

Because the loadings stack. Overnight replenishment, typically running from around 10pm to 6am, attracts shift loadings well above daytime rates, and in some agreements a daily allowance on top of that.

The other advantage is the shape of the work. Overnight shifts run continuously for a full block rather than in the split patterns common in hospitality, so eight paid hours is eight hours rather than a lunch shift, a four hour gap and a dinner shift. For a backpacker trying to accumulate money quickly, that combination of higher rate and unbroken hours is usually worth more than a daytime roster at a nominally similar job.

## What goes wrong even at the big chains?

Less than in hospitality, but not nothing, and the errors are consistent enough to be worth checking for specifically. Payroll at the majors generally works: super arrives, payslips are itemised, rosters appear in advance. The problems are in classification and in the edges of the penalty structure.

- Public holiday loading missed where the holiday fell on a normal rostered day
- Classification left at Level 1 while the duties have long since expanded
- Pre shift setup or post shift time not paid
- Overnight loading not applied to a shift that crossed the trigger time
- State specific public holidays not recognised for a worker who moved interstate

Most of these are fixed through the employer's own payroll process once raised with the payslip in hand, and Fair Work is the route if that fails.

## Are you covered if you are injured?

Yes, from the first shift, with no minimum service and no relevance to your visa. Retail injuries are less dramatic than construction ones and no less real: back injuries from lifting stock, slips on wet floors, cuts in deli and bakery work, and repetitive strain from scanning.

The point that matters is reporting at the time. An injury recorded in the store's incident book the day it happened supports a claim; the same injury raised three weeks later after it failed to settle is much harder to connect to work. Our guide to [workplace injury rights](/blog/workplace-injury-working-holiday-rights) covers the framework.

## What can supermarket workers claim?

Not much, honestly, which is worth saying rather than padding a list. Supermarket work supplies most of what you need, so the genuine deductions are non slip shoes, any required clothing not provided, laundry of a provided uniform where the employer does not launder it, an RSA fee if you paid for it to work in liquor, and a work share of phone costs for shift coordination.

Staff discounts are not a tax matter in either direction. They are a minor benefit rather than taxable income to you, they are not deductible as a cost saved, and they do not count towards award compliance, so a discount card is not a substitute for the correct hourly rate. Our guide to [deductions for working holiday makers](/blog/tax-deductions-working-holiday-makers) covers what does qualify.
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
Station work is covered by the Pastoral Award, MA000035, counts toward the 88 days of specified work for a second year visa, and almost always comes with accommodation and meals included. The pay looks low against city work until you account for the package, and the package is where most of the confusion sits.

## What does the work actually involve?

Livestock and infrastructure, in whatever proportion the season demands. Mustering on horseback, motorbike or buggy, cattle handling in the yards including drafting, drenching, branding and vaccinating, calving and newborn care, fencing, bore and water trough maintenance, machinery and tractor operation, and general property upkeep.

Larger stations also carry a camp cook role and, less commonly for working holiday makers, station administration. What you do depends heavily on the type of property, since a cattle station and a sheep station are different operations, and on the region and the season.

## Where are the stations, and when do they hire?

The four main regions each run on their own calendar. The Northern Territory covers the Barkly Tableland, the Victoria River District and the Top End. Western Australia covers the Kimberley, the Pilbara, the mid west and the southern wheatbelt. Queensland covers the Channel Country, the north west and the Gulf. South Australia covers the far north and Eyre Peninsula.

The north runs on wet and dry seasons rather than on summer and winter, and mustering happens in the dry. The south runs on hot summers and cooler winters. That difference determines when work is available, and it is the single most useful thing to know before planning a route around station work.

## What does the Pastoral Award set?

Minimum hourly rates by classification, along with conditions. Farm and Livestock Hand Level 1 covers new workers on basic tasks under supervision, Level 2 covers experienced workers with some autonomy, and Level 3 covers skilled workers operating machinery or leading small teams, with higher levels running up through leading hands and head stockmen. Separate classifications exist for shearing, shed work and broadacre cropping.

The award rate is a floor rather than a going rate. From 1 July 2026 the casual minimum across all work is $33.05 an hour, being the $26.44 national minimum plus the 25% loading, and pastoral classifications run above that as experience is recognised. Many stations operate under enterprise agreements or individual arrangements, which must still leave you better off overall than the award.

## How does the all found arrangement work?

The station provides a room in staff quarters or the homestead, meals from the station kitchen or rations for remote camps, and pays a cash rate for everything else. That is the all found arrangement, and it is standard in rural Australia rather than unusual.

Where accommodation and meals are deducted from wages, the deduction has to be lawful and within the limits the award sets, which is the thing worth checking. Where they are genuinely provided rather than deducted, remote area fringe benefits concessions frequently apply to properties in genuinely remote locations, which can make the whole package more tax efficient than the cash figure suggests. Living away from home allowances apply in some classifications.

The practical effect is that comparing a station cash rate against a city hourly rate is comparing two different things, and the station package usually looks worse in that comparison than it is.

## Does it count toward the second year visa?

Yes, provided four conditions hold. The work must be in a designated regional postcode, which most stations are. It must fall within the specified work categories, and animal cultivation including livestock does. It must be paid. And it must be documented, with payslips and with income reported to the ATO.

The documentation is where second year applications fail rather than the work. A station that pays partly in cash, or an employer who never issued payslips, leaves you with the days worked and no evidence of them, and the immigration application needs the evidence rather than the memory.

## What happens if you are injured out there?

Workers compensation covers every employee on a station regardless of remoteness or length of service, and it covers evacuation costs, which matters enormously when the nearest hospital is a flight away. It pays medical treatment, weekly payments while you cannot work, and lump sums for permanent impairment.

Station work carries higher injury rates than most industries: animal handling injuries from kicks, crushing and falls, vehicle and machinery incidents on rough ground, heat illness, snake encounters, and the isolation that makes any of them worse. The Royal Flying Doctor Service is sometimes the only access to care. Our guide to [workplace injury rights](/blog/workplace-injury-working-holiday-rights) covers how a claim runs.

## What can a station hand claim at tax time?

More than most working holiday roles, because station hands supply real gear. Work boots and riding boots, a protective hat, long sleeved work clothing and sun protection, gloves, personal tools such as a knife or fencing tools, and saddle and tack where you provide your own.

The test is whether the item is principally for the work rather than for personal use, which is straightforward for fencing pliers and less so for a hat you also wear on days off. From 1 July 2026 the flat $1,000 work related deduction is also available without receipts, which for many station hands will be simpler than itemising.

## What should you settle before you accept a job?

The terms, in writing, because renegotiating from a property four hours from the nearest town is not a real option. Confirm the classification and hourly rate, whether accommodation and meals are provided or deducted, what the deduction is if there is one, the expected hours and days, and how and when you will be paid.

Ask specifically about payslips and superannuation. Both are legal requirements rather than favours, and a property that hesitates on either question has told you something useful while you are still able to act on it. Confirm too that the postcode qualifies for specified work if the second year visa is part of your reason for going.

## How does the isolation affect getting paid correctly?

It makes verification harder rather than making the rules different. Mobile coverage is patchy, banking is intermittent, and checking a payslip against an award clause is a different exercise when the internet works for an hour a day.

That is the argument for photographing every payslip as it arrives and keeping a daily log of hours from the first week. Reconstructing four months of a muster season after you have left the property is close to impossible, and it is the reason station wage disputes so often come down to one person's memory against another's.

## The arrangement on the property decides it.

The award is the same everywhere. What you are paid, and what it is worth, is decided by the arrangement on the particular property.

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
 title: "Bringing $10,000 Into Australia: Declare It",
 description:
   "Cash of AUD 10,000+ must be declared at the border - undeclared amounts risk seizure. How AUSTRAC reporting works and what counts as cash.",
 category: "Tax Return",
 date: "1 June 2026",
 readTime: 4,
 body: `
There is no limit on how much money you can bring into Australia, and bringing it in is not taxed. Physical currency of A$10,000 or more must be declared at the border, and electronic transfers at that level are reported automatically by the bank. Reporting is monitoring, not taxation.

## What is the $10,000 rule actually about?

It is an anti money laundering rule administered by AUSTRAC, Australia's financial intelligence agency, and it exists to track flows of physical cash rather than to collect tax. Any movement of A$10,000 or more in notes and coins, or the foreign currency equivalent, into or out of Australia has to be reported.

The threshold covers cash carried on you, in luggage, in the post or by courier. It is not specific to working holiday makers, it applies to everyone crossing the border, and the report is made on a Cross-Border Movement Report at the airport or online.

For electronic transfers, the same threshold triggers automatic reporting by the bank or transfer service. You lodge nothing and do nothing; the provider handles it.

## Does declaring create a tax bill?

No. AUSTRAC and the ATO are separate agencies doing different jobs, and a report to one is not information handed to the other for assessment. Bringing $25,000 of savings from Germany to start a working holiday is reported at the border and taxed nowhere.

The reason is straightforward: the savings are pre-existing, they were earned before you arrived, and they are not Australian source income. Australian tax attaches to what you earn here. Our guide to [transferring money out of Australia](/blog/transferring-money-overseas-australia-tax) covers the same principle in the other direction.

## What if you keep the amount under $10,000?

Then no report is made, and that is fine as long as it is simply how much money you happen to be moving. The threshold applies per movement rather than per year, so a $9,000 transfer is unreported and an $11,000 one is reported.

Deliberately splitting a larger amount to stay below the threshold is a different thing entirely. It is called structuring, it is a criminal offence under the anti money laundering laws, and it attracts consequences considerably more serious than the report you were avoiding. The report itself costs you nothing, which is what makes structuring such a poor trade.

## What about the bank interest side?

That is the one place where an Australian bank account genuinely does connect to your tax return. Australian banks report interest paid to the ATO, and the interest is declarable regardless of how small it is.

Without a TFN recorded, the bank must withhold tax on interest at the top rate, which is recoverable when the return is lodged. On a transaction account earning a few dollars this is a rounding error rather than a problem, but it is the reason banks keep asking for the number.

## What records are worth keeping?

Enough to answer one question if it is ever asked, which is where the money came from. That is a low bar and a home country bank statement clears it.

- A statement from your home bank showing the savings before transfer
- The AUSTRAC declaration receipt, if you declared cash at the border
- Documentation for a gift, a vehicle sale or an investment sale that funded the trip

The ATO has data matching access to AUSTRAC reports and to Australian bank records, so a mismatch between visible funds and declared income can prompt a question. Every ordinary explanation is easy to substantiate, and the only situation that creates real difficulty is money that genuinely is unreported Australian income, most often cash work that was never declared.

## How should you actually bring the money?

Through a regulated channel, and this matters more for security than for tax. Bank transfer or a licensed money transfer service leaves a record you can point to, arrives safely, and generally gives a better exchange rate than carrying notes and changing them here.

1. Transfer through a bank or licensed remitter rather than carrying large amounts of cash
2. Declare at the border if you are bringing A$10,000 or more in currency
3. Open an Australian account early so the money has somewhere to arrive
4. Add your TFN to the account once the letter comes

## Where does the real risk sit?

Not with the reporting, and not with the tax. It sits with the scams that target new arrivals, which are far more likely to cost a backpacker money than any AUSTRAC threshold.

The recurring patterns are consistent: someone asking for your bank details and TFN in order to send you money, an unusually good exchange rate offered on condition that you send cash first, a job offer requiring an upfront payment, and romance scams that end in transfers to overseas accounts. Regulated providers and licensed currency exchanges exist precisely so that none of these is necessary. Our guide to [protecting your TFN](/blog/tfn-security-protect-from-fraud) sets out who is entitled to ask for your details, and the answer is a much shorter list than most people assume.

## What counts as physical currency?

Physical currency means notes and coins, in any currency, converted to Australian dollars at the time of movement. It is a narrower category than people assume and it excludes most of what a traveller carries.

- Notes and coins in any currency, including your home currency
- Cash in luggage, in the post, or sent by courier

Bearer negotiable instruments such as travellers cheques and money orders sit under a separate reporting rule that applies when you are asked about them rather than automatically. A debit card loaded with $30,000 is not physical currency and is not reported at the border, although the transfer that funded it was reported by the bank.

## What happens if you do not declare?

Undeclared currency over the threshold can be seized at the border, and the seizure is the immediate consequence rather than a fine assessed later. Recovering it means explaining the source through a process that is considerably more demanding than the declaration would have been.

The declaration itself is a form and a few minutes. It creates no tax liability, no follow up in the ordinary case, and no record that disadvantages you. Almost every difficulty in this area comes from someone deciding to avoid a report that would have cost them nothing.

The same applies on the way out. Departing working holiday makers carrying accumulated wages, a refund and a super payment home in cash are sometimes over the threshold without having thought about it, and the outbound declaration works exactly the same way as the inbound one. Transferring electronically is simpler, safer and usually gives a better rate than carrying the notes.

## What decides whether any of this touches your tax return?

One fact: whether the money is savings or income. Savings brought in, gifts from family and proceeds of selling something at home are all outside the Australian tax system and stay outside it however they arrive. Money earned in Australia is inside it, whether it arrived as a bank transfer, as cash, or as an envelope from a farm.

That distinction is the whole of the analysis, and it is the reason this question is nearly always simpler than the person asking it fears. Where it stops being simple is a year that mixes both, particularly cash work that was never reported alongside declared wages, and that is worth resolving properly when the [tax return](/tax-return) is prepared rather than leaving as an open question.
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
An unpaid ATO debt grows through the General Interest Charge, which compounds daily from the original due date. A separate Failure to Pay penalty can apply for every 28 days the debt stands. Leaving Australia stops neither, and the debt can be taken out of your super payment.

## Where do working holiday tax debts come from?

Almost never from wages, and that is worth saying first because it is the source people expect. Wages arrive with tax already withheld, so a wage only year very rarely produces a debt. Debts come from income that arrived untaxed.

- ABN or contracting income with nothing withheld during the year
- An unpaid Business Activity Statement for a GST registered rideshare driver
- An amended assessment that increased the tax after the original return
- A penalty assessment for late lodgement or understated income

The single most common version we see is a delivery or rideshare year where every payout was treated as spendable. Our guide to [driving Uber on a working holiday](/blog/uber-driver-working-holiday-australia) covers why that income needs a portion set aside as it arrives.

## What is the General Interest Charge?

The General Interest Charge is daily compounding interest on an unpaid tax debt, set quarterly at a rate substantially above the cash rate, running at around 11% a year in 2025-26. It applies from the original due date until the debt is cleared, and it does not pause for anything.

Daily compounding on a modest debt is slower than people fear in the first months and faster than they expect over years. A $1,000 debt left for a year gathers roughly $115. The same debt left for three years gathers roughly $370, and it keeps accruing while you are living in another country entirely unaware of it.

## What is the Failure to Pay penalty?

It is a separate charge from the interest, applied at one penalty unit of $330 for every 28 days the debt remains unpaid, capped at five units. Unlike the interest, it is applied at the ATO's discretion rather than automatically.

The pattern of when it is applied is reasonably predictable: substantial debts, repeated non payment, and above all silence. Someone who has engaged with the ATO about a debt is in a very different position from someone who has ignored three notices, and that difference is the main thing the discretion turns on.

## How is this different from a late lodgement penalty?

They are independent systems that can both apply to the same year. Failure to Lodge is charged when the return itself is late, at $330 per 28 days up to five units. Failure to Pay plus interest is charged when the money is not paid by the due date.

Lodging late and paying late attracts both, and the combined total can exceed the tax that was originally owed. Our guide to [late return penalties](/blog/late-tax-return-penalty-working-holiday) explains where lodgement penalties actually bite, which is far less often than the fear suggests when a refund was due.

## When is the debt actually due?

For an individual lodging through a registered agent, payment is generally due 21 days after the notice of assessment is issued. For self lodgers the date is typically 21 November following the end of the financial year. BAS debts are due on the same date the BAS is due, 28 days after the end of the quarter for most lodgers.

The 21 day window catches people who lodge in April expecting a refund and receive a bill instead. That is not a long time to find the money from another country, which is the argument for knowing the position before the return goes in rather than after.

## What happens if you leave Australia owing money?

The debt does not travel with your passport but it does not disappear either. Interest continues to accrue daily, the debt can be offset against any future Australian refund, and it sits on your record when any future Australian visa is assessed.

The offset that hurts most is against your super. The ATO can set an outstanding tax debt against a DASP payment, and because DASP is already withheld at 65%, there is much less left to absorb the debt than the gross balance suggests. A $4,000 super balance pays out about $1,400 after DASP withholding, and a $2,000 debt consumes all of it and leaves $600 outstanding. Resolving the debt before claiming is usually the better order.

## Can the interest or penalty be remitted?

Yes, in defined circumstances, and it is worth asking rather than assuming. The ATO has discretion to reduce or cancel both the interest and the Failure to Pay penalty where there are grounds.

- Genuine financial hardship that prevented payment
- An ATO administrative error that caused or contributed to the debt
- Circumstances outside your control, such as serious illness or a natural disaster
- A first instance of non payment against an otherwise clean history

A remission request has to be made specifically and supported with evidence. A general complaint about the amount is not a request, and it is not treated as one.

## How do you find out what you actually owe?

The debt shown on a notice of assessment is a snapshot, not a running total, because interest accrues daily from the original due date. A figure quoted in a letter from four months ago is already wrong, which is why people negotiate about numbers that no longer exist.

A current position also depends on every return and statement being lodged. Where a BAS quarter or an earlier year is outstanding, the debt on file is incomplete in one direction and sometimes overstated in the other, since an unlodged year that would have produced a refund is sitting there unclaimed and unable to offset anything.

## What does a payment plan actually change?

A payment plan stops collection action and converts the debt into instalments you can meet. It does not stop the interest, which continues to accrue on the declining balance, so a plan is a cash flow arrangement rather than a discount.

Short plans under twelve months are generally available on request. Longer ones require more documentation, and genuine hardship arrangements exist separately for people who cannot meet either. The distinction that matters is timing: a plan requested before the due date is routine administration, and the same request after eighteen months of silence is a negotiation from a much weaker position.

## What order should you deal with this in?

Lodge everything first, then establish the real figure, then deal with it. Reversing that order is how people end up paying interest on an assessment that was wrong, or clearing a debt while an unlodged year that would have covered it sits unclaimed.

The departure sequence matters too. Where a debt and a super claim both exist, the debt is better resolved before the DASP application, because the ATO can offset it against the payment and a 65% withholding rate leaves very little to absorb it. Working out the order is part of preparing the [tax return](/tax-return), and it is worth doing before the flight rather than from the other side of it.

## What decides how badly this goes?

Two things, and neither is the size of the original debt. The first is how early you engage, because a payment plan requested before the due date is an ordinary administrative arrangement and a debt ignored for eighteen months is a collection matter with interest attached. Our guide to [ATO payment plans](/blog/ato-payment-plan-tax-debt-australia) covers how those work.

The second is whether every outstanding return and statement has actually been lodged. A debt position built on incomplete lodgements is not a real number, and people regularly negotiate about a figure that is wrong in both directions. Getting the [tax return](/tax-return) and any BAS complete first, then dealing with what is genuinely owed, is the sequence that works, and it is considerably cheaper done before departure than after.
`,
 },
 {
 slug: "tax-back-australia-working-holiday",
 title: "Tax Back in Australia on a Working Holiday",
 description:
 "How working holiday makers claim tax back in Australia: what you can claim, average refund sizes, deadlines, and how to lodge - including from overseas.",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 8,
 body: `
Tax back is the amount withheld from your pay above what you actually owed, recovered by lodging a [tax return](/tax-return) after 30 June, or earlier if you leave Australia permanently. Your correct liability is 15% on the first $45,000. Everything taken above that comes back, and how much that is depends on your year rather than on your visa.

## Why is there anything to claim back at all?

Because withholding is an estimate applied pay by pay, while your actual liability is calculated once, at the end of the year, on the whole picture. The two only match if nothing unusual happened, and for working holiday makers something unusual usually did.

The gap runs in one direction. An Australian resident's withholding is calculated against a scale designed to land near zero, so their reconciliation is small either way. A working holiday maker's withholding is flat, and every error in it, a missing TFN, an unregistered employer, an early departure, means too much was taken rather than too little. That is the structural reason backpacker refunds exist at all.

## Which parts of your year create the refund?

Five specific things, and each is a fact about your own circumstances rather than a general entitlement. Knowing which of them apply to you tells you roughly what to expect before anyone runs a calculation.

- **A period at 45%.** Any weeks before your TFN reached the employer were withheld at 45% instead of 15%, and the whole difference comes back.
- **An employer not registered as a working holiday maker employer.** They must withhold at foreign resident rates, currently 30%, and that excess is recoverable in full. Common on farms and with small businesses.
- **The Medicare levy exemption.** Most 417 and 462 holders are not entitled to Medicare and can remove the 2% levy, but it needs a Medicare Entitlement Statement from Services Australia rather than a tick box.
- **Work related deductions.** Tools, compulsory uniforms and their laundry, sun protection for outdoor work, RSA and White Card courses, and travel between two workplaces on the same day.
- **Leaving part way through the year.** Withholding assumes the income continues, so a departure in January generally leaves more withheld than was ever due.

## How much should you expect?

Nobody can tell you before seeing what was withheld, and anyone who quotes a figure without that is guessing at your expense. The arithmetic is not difficult once the numbers exist: total tax withheld, minus 15% of income up to $45,000, plus the levy exemption and any deductions.

What that means in practice is that the size of your refund is decided by how wrong your withholding was, not by how much you earned. Someone who earned $40,000 with correct withholding all year has less to reclaim than someone who earned $20,000 with six weeks at 45%. Our [tax refund calculator](/calculator) does the same sum if you have the payslip totals to hand.

## When and how do you lodge?

The Australian tax year runs 1 July to 30 June, self lodgement is due by 31 October, and lodging through a registered agent extends that into the following May. The practical starting point is mid July rather than 1 July, because income statements are not final until employers complete their reporting.

The three routes differ in what they demand of you rather than in what they can achieve. myTax through myGov is free and works well for a simple year, provided you can answer the residency and Medicare questions without guessing. An agent handles those two questions and the Medicare Entitlement Statement, and the fee is deductible on the following year's return. And from overseas, either route works, with the practical obstacles being myGov identity verification and an Australian bank account that is still open. Refunds are usually paid about 14 business days after lodgement, and longer through the July to September peak.

## Can you claim for years you have already left?

Yes. There is no cut off for lodging a late return, and unclaimed refunds from earlier working holiday years are recovered regularly, including by people who left Australia years ago and assumed the money had gone.

Two things to know before you assume it is free of consequence. A late return can attract a Failure to Lodge penalty even when a refund is owed, and while the ATO applies that selectively, a pattern of several unlodged years is where it does get applied. And the income statements still exist in ATO systems regardless of what you kept, so missing paperwork is not the obstacle it feels like. Our guide on [late lodgement and the penalty rules](/blog/late-tax-return-penalty-working-holiday) covers where the line falls.

## What about your super?

It is a separate claim and often the larger one. Your employers paid 12% of your ordinary earnings into a super fund throughout the year, and none of that is part of your tax refund or affected by it.

The [Departing Australia Superannuation Payment](/superannuation) becomes available once you have left and your visa has ceased, and it pays out the balance less 65% withholding on the taxable component. Two people with identical tax refunds can have very different amounts waiting there, depending on how much they earned and how many funds it ended up split between, and it is the money most commonly left behind entirely.
`,
 },
 {
 slug: "average-tax-refund-working-holiday",
 title: "How Much Tax Refund Do Backpackers Get?",
 description:
 "There is no average refund worth quoting. What comes back is decided by your withholding rate, your residency position and the deductions you can support.",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 8,
 body: `
There is no average worth quoting, because a refund is not a payment for being a backpacker. It is the gap between what your employers withheld and what you actually owed, which is 15% on the first $45,000. If the withholding was right all year, the gap is close to nothing. Most of the time it was not right.

## What actually decides the size of your refund?

Three figures, and you already hold two of them. Your total income for the financial year running 1 July to 30 June, the total tax withheld across every employer you had, and the offsets, exemptions and deductions that reduce what you owed. The refund is simply the second number minus the tax due on the first, adjusted by the third.

This is why quoted averages are meaningless for this audience. An Australian resident's withholding is calculated through the year against a scale that already includes the $18,200 tax free threshold, so their reconciliation usually lands near zero by design. A working holiday maker's withholding runs flat at 15%, and every error in it runs in one direction only, which is too much. The refund is the accumulated error.

## Which situations produce a large refund?

The ones where a period of your year was withheld at the wrong rate. A large refund is almost never the result of clever deductions; it is the result of finding weeks or months where somebody took 45% or 32.5% instead of 15%.

Four situations account for most of them, and each is a fact about your own year rather than a general rule.

- **Weeks before your TFN reached the employer.** Withholding is 45% instead of 15% until the [declaration form](/blog/tax-file-number-declaration-form) is completed, a difference of 30 cents in every dollar for that period.
- **An employer not registered with the ATO to employ working holiday makers.** They must withhold at foreign resident rates rather than 15%, which is not your error and is fully recoverable.
- **Leaving Australia part way through the year.** Withholding is calculated as though the income would continue, so a departure in January generally leaves more withheld than was ever owed.
- **The Medicare levy exemption never claimed.** Worth 2% of taxable income to anyone not entitled to Medicare, and it needs a Medicare Entitlement Statement rather than a tick box.

## Which situations produce a small one?

One employer, registered correctly, your TFN on file from week one, and a full year worked. In that case the 15% taken through the year is close to the 15% owed at the end of it, and the refund comes down to the Medicare levy exemption and whatever deductions you can substantiate.

That is a completely normal outcome and not evidence that anything went wrong. It is also the case in which the year's real money was in the [superannuation](/superannuation), not the tax, because super accrues at 12% whether or not the withholding was correct.

## How do you work out your own number?

Add up income and tax withheld across every job, then compare the total withheld against 15% of the total income up to $45,000. Anything withheld above that figure is the starting point for your refund, before the Medicare levy exemption and deductions are applied. Our [tax refund calculator](/calculator) does the same arithmetic if you have the payslips in front of you.

The complication is almost always missing information rather than difficult sums. Income statements sit in ATO systems rather than with the employer, so a job you left on bad terms, a labour hire company that has since closed, or a payslip you never received does not put that income out of reach. It does mean the figures have to be retrieved before anything can be worked out.

## Does everyone get money back when they leave?

No, and this is the most persistent myth in the hostel. You are refunded the amount withheld above your correct liability, not the tax itself, so someone taxed accurately all year has little or nothing to reclaim.

What is genuinely claimable on departure is super, which is a separate system entirely. A [DASP claim](/superannuation) pays out the balance less 65% withholding on the taxable component, and it is available regardless of how your income tax landed. Two people with identical refunds of nothing can have very different amounts of super waiting, depending on how much they earned and how many funds it went into.
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
Working holiday makers on 417 and 462 visas pay 15% on the first $45,000 earned in Australia in 2026-27, with no tax free threshold. Above that, ordinary rates apply. The 15% only reaches you if your employer is registered to withhold it, and anything taken above the correct rate comes back through your [tax return](/tax-return).

## What are the working holiday maker rates?

Fifteen per cent applies from the first dollar to $45,000, and the scale steps up above that in line with the foreign resident brackets. Almost every working holiday maker stays inside the first bracket for a single financial year, so 15% is the rate that decides their year.

The absence of a tax free threshold is what separates this from ordinary Australian taxation. An Australian pays nothing on their first $18,200; a working holiday maker pays 15% on it, which is a difference of $2,730 before anything else is considered.

- First $45,000: 15%
- $45,001 to $135,000: 30%
- $135,001 to $190,000: 37%
- Above $190,000: 45%

## Can a working holiday maker ever get the tax free threshold?

Yes, but rarely, and never on the strength of the visa alone. The exception exists, it is uncommon, and it hangs on a residency judgement that has been contested as far as the High Court.

Residency is not settled by a day count or by anything you can read off a calendar, and it is misjudged in both directions by people who felt sure of their answer. Our guide to [tax residency for working holiday makers](/blog/tax-residency-working-holiday-makers) covers why it is assessed rather than assumed, and a position is taken only after the whole year has been reviewed.

## Why does your employer's registration matter?

Because it decides which rate they are allowed to apply. A business must register with the ATO as an employer of working holiday makers before it can withhold at 15%, and one that has not registered is required to use foreign resident rates instead, currently 30% on the relevant bracket.

You cannot tell from the outside, and the employers who most often have not registered are farms and small regional hospitality businesses, which is exactly where a lot of backpackers work. Nothing is lost when it happens: the excess is refunded when the return is lodged. What it does mean is that the difference between 30% and 15% on a season of harvest work is usually the largest single item in that year's refund, and finding it requires looking at each employer separately rather than at the total.

## What does your TFN change?

The rate, immediately and completely. Without a Tax File Number recorded through a Tax File Number Declaration, an employer must withhold 45% whatever their registration status, which is 30 cents in every dollar more than you should be paying.

You must be in Australia to apply for a [TFN](/tfn), the application is free and takes about ten minutes, and the ATO's outer limit for issuing one is 28 days. The part that actually costs money is not the application but the declaration form: every employer needs their own, and the most common quiet loss in a backpacker's year is one job correctly at 15% while a second runs at 45% for months because nobody completed a second form.

## What is the Medicare levy exemption worth?

Two per cent of taxable income, which is about $500 on $25,000 of earnings, and most people who qualify never claim it. Australians pay a 2% Medicare levy on top of income tax, and it is charged to people entitled to Medicare rather than to residents as such.

Whether you can remove it depends on your passport, and often in the opposite direction to what people expect. A British or Irish national is generally entitled to Medicare under the reciprocal health care arrangements, so the levy applies. German and Japanese nationals generally are not entitled, so the exemption is available to them. It is not automatic in either case: claiming it requires a Medicare Entitlement Statement from Services Australia, which takes weeks to obtain, and that lead time is the whole reason it goes unclaimed. Our [Medicare levy exemption guide](/blog/medicare-levy-working-holiday-makers) covers the detail.

## What happens to your superannuation?

Your employer pays 12% of your ordinary earnings into a super fund on top of your wages, and it is untouchable while you are in Australia. It is not part of your tax refund and is not affected by how your return lands.

Once you have left and your visa has ceased, it is claimed as a Departing Australia Superannuation Payment, taxed at 65% on the taxable component, with approval typically taking around 28 days. How much is waiting depends on how much you earned and how many funds it was split across, since each employer who did not ask you to nominate one opened another account. Our [superannuation service](/superannuation) covers the claim.

## Does it matter which subclass you hold?

Not for tax. The 417 and 462 are treated identically: same 15% rate, same 65% DASP withholding, same Medicare position, same lodgement dates. Anyone telling you one visa is taxed better than the other is wrong.

Where the subclasses differ is in visa mechanics, and that feeds back into tax indirectly. The 417 covers the United Kingdom, Ireland, much of Europe, Japan, Korea and Taiwan among others, and extends through specified regional work. The 462 covers the United States, China, Israel and much of Latin America, carries education requirements and country caps, and has its own specified work rules including northern Australia options. Chasing an extension pushes people towards regional postcodes and agricultural employers, which is precisely where [unregistered employer withholding](/blog/backpacker-tax-rate-australia) and [ABN farm arrangements](/blog/farm-work-and-abns) concentrate. The tax consequences follow from where the visa sends you.

## What are the dates that matter?

The Australian financial year runs 1 July to 30 June, returns can be lodged from July once employers have finalised their reporting, and self lodgement is due by 31 October. Lodging through a registered agent extends that into the following May, provided you were on their books before October.

One date is different if you are leaving for good. A working holiday maker departing Australia permanently part way through a financial year can lodge an early return for that year rather than waiting until July, which brings the refund forward by months. It is worth knowing before you book the flight, because it is easier to arrange while you still have an Australian bank account open. Our [refund calculator](/calculator) gives a rough figure if you have your payslip totals to hand.
`,
 },
 {
 slug: "diy-tax-return-vs-tax-agent-working-holiday",
 title: "DIY Tax Return vs Tax Agent on a WHV",
 description:
 "Lodging yourself through myTax is free. A registered agent catches the residency, exemption and deduction items backpackers miss. When each makes sense.",
 category: "Tax Return",
 date: "29 July 2026",
 readTime: 8,
 body: `
You can lodge your own Australian return through myTax for nothing, and for a straightforward year that is a perfectly good decision. The question is not whether you are capable of it. It is whether your particular year contains any of the five things that cost self lodgers money, because each of them is invisible from inside the form.

## What does lodging it yourself actually involve?

myTax is the ATO's free online lodgement tool, reached through a myGov account linked to the ATO, and your income statements pre-fill into it from mid July once employers finalise their reporting. For a single employer year the form is short and the arithmetic is done for you.

The difficulty is not the tool, it is that the tool was built for Australian residents. The residency questions, the working holiday maker income item and the Medicare levy section all assume a taxpayer who knows their own status, and those are precisely the three answers a backpacker is most likely to be guessing at. A wrong answer produces a return that lodges cleanly and is still wrong.

## Where do self lodgers actually lose money?

In five specific places, and none of them announce themselves. Every one is something the form will happily let you leave blank or answer incorrectly, and the loss only becomes visible if somebody goes looking for it afterwards.

- **The Medicare levy exemption, skipped.** It needs a Medicare Entitlement Statement ordered from Services Australia weeks in advance, so it cannot be claimed on the day you decide to lodge. Missing it costs 2% of taxable income, about $500 on $25,000.
- **Residency answered wrong.** The single most common backpacker error, and the one most likely to produce an amended assessment later.
- **Deductions never claimed.** RSA and White Card courses, sun protection for outdoor work, tools, laundry of compulsory uniforms, and last year's agent fee.
- **An employer left out of the reconciliation.** Over-withholding at a job you left in September is easy to miss, and it is usually where the largest single sum is sitting.
- **ABN income mishandled.** Delivery or farm contracting brings business items, possible GST questions and a different deduction basis. Our [ABN guides](/blog/category/abn) cover that side.

## When is doing it yourself the right call?

When your year was simple in a specific sense: one employer, registered with the ATO as a working holiday maker employer, your TFN on file from the first shift, withholding at 15% throughout, no ABN income, and you are staying in Australia. In that case the reconciliation genuinely does land near zero and there is very little for anyone to find.

The honest test is whether you can answer the residency question and the Medicare question without guessing. If you can, the form is not going to defeat you. If either answer is a shrug, that is the signal, because both of them change the number rather than the paperwork.

## When does an agent change the outcome?

When any part of the year was irregular. A period at 45% before your TFN landed, more than two employers, farm work or an employer who was not registered, a Medicare levy exemption you want claimed, ABN income alongside wages, or a departure from Australia part way through the year: each of those is a place where the correct treatment is not obvious from the form.

There is also a structural difference worth knowing about. A registered tax agent can see every employer who reported income against your TFN, which is a different thing from seeing the employers you remember. They also carry professional obligations and extended lodgement deadlines beyond the standard 31 October, and the fee they charge is deductible on the following year's return.

## Is there a middle option?

Yes, and it is underused. Prepare your own figures, then have someone check them before lodging rather than after, which catches the classic four errors while leaving most of the work with you.

Where that stops being sensible is a year with genuinely moving parts. A mid year departure, ABN income alongside employment, or reconstructing a cash heavy season from incomplete records are all situations where the checking is most of the work anyway, and review only becomes false economy. The thing to avoid in every case is percentage of refund pricing, which pays whoever prepared the return more when the number goes up, and that is not an incentive you want on the other side of the table. A fixed fee agreed before the work starts does not have that problem.

## Can it still be lodged after you leave Australia?

Yes, and this is the case where doing it yourself gets hardest for reasons that have nothing to do with tax. Remote lodgement through an agent is routine, including retrieving income statements you never collected and running the [superannuation claim](/superannuation) alongside the return.

The obstacles from overseas are identity and access. A myGov account needs to be established and linked while you can still verify yourself with Australian credentials, and an Australian bank account has to stay open long enough to receive the refund. Both are much easier to arrange in your last month here than in your first month home, whichever route you eventually take.
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
 title: "TFN Guides for Backpackers in Australia",
 description:
 "Every TFN guide in one place: applying free in 15 minutes, delays past 28 days, working while you wait, lost numbers and scam protection.",
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
 title: "Tax Return Guides for Backpackers",
 description:
 "Everything about lodging as a working holiday maker: what you are owed, worked refund examples, deductions, deadlines, and lodging from overseas.",
 intro: `The Australian financial year runs from 1 July to 30 June, and every working holiday maker who earned income during that period is required to lodge a tax return. Most backpackers get a refund because their employer withheld more tax than required. These articles cover deadlines, deductions, what to do when you have left Australia, and how to handle complications.`,
 faq: [
 {
 question: "When do working holiday makers need to lodge a tax return?",
 answer:
 "The Australian financial year ends on 30 June. You must lodge your tax return between 1 July and 31 October that year. If you lodge through a tax agent, the deadline can be extended.",
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
 title: "Superannuation and DASP Guides",
 description:
 "How super works on a WHV, checking employers pay the 12%, finding lost funds, and getting your money out via DASP after departure.",
 intro: `Superannuation (super) is Australia's compulsory retirement savings system. Your employer pays 12% of your wages into a super fund on top of your pay (effective from 1 July 2026). When you leave Australia at the end of your working holiday, you can withdraw your super through the Departing Australia Superannuation Payment (DASP) process. These articles cover how super works, how to track it, and how to claim it.`,
 faq: [
 {
 question: "Do working holiday makers get superannuation in Australia?",
 answer:
 "Yes. Every working holiday maker is entitled to superannuation contributions from their employer. The current rate is 12% of your ordinary time earnings (effective 1 July 2026, per the FWC Annual Wage Review), paid on top of your wages directly into a super fund.",
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
 "You can find lost super by linking your TFN to your account through our service, contacting the Australian Taxation Office, or working with a tax agent who can search across all funds.",
 },
 ],
 relatedServicePath: "/superannuation",
 relatedServiceLabel: "Claim your super",
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
 title: "Medicare and Insurance Guides",
 description:
 "Medicare eligibility by country, the 2% levy exemption worth ~$500, health insurance options, and claiming GST back at the airport.",
 intro: `Working holiday makers face a range of tax and administrative questions outside the core areas of TFN, ABN, tax returns, and super. These articles cover Medicare access, the Medicare Levy and Medicare Levy Surcharge, claiming GST back on goods you take home, and other general topics that affect backpackers living and working in Australia.`,
 faq: [
 {
 question: "Do working holiday makers pay the Medicare Levy?",
 answer:
 "No. Working holiday makers are not eligible for Medicare and are not required to pay the 2% Medicare Levy. Claiming the exemption requires a Medicare Entitlement Statement from Services Australia, applied for on form MS015, which commonly takes up to six weeks to issue.",
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
