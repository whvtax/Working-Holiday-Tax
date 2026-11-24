import type { Guide } from './data'

/**
 * Refund and super problem guides (plan 3, 24 November 2026).
 *
 * Ten English problem-set guides, spread into `guides` in data.ts. Slugs follow
 * the plan 3 slug registry, so the locale twins render only once these exist.
 * Every fact is from an ATO page checked on 24 November 2026 and linked in the
 * body where it is used.
 */
export const problemGuides: Guide[] = [
 {
 slug: "tax-refund-closed-australian-bank-account",
 title: "Tax refund and a closed Australian bank account",
 description:
 "Closed your Australian bank account before the refund landed? The ATO pays refunds only to Australian accounts. What happens to the money and how to fix it.",
 category: "Tax Return",
 date: "24 November 2026",
 readTime: 5,
 body: `
The ATO pays tax refunds only into an Australian bank account, never into an overseas one. If the account you gave has been closed, the payment goes back to the ATO and is reissued once you give current Australian bank details; if you give none, the ATO reissues it by cheque. The money is not lost, but it waits until the details are fixed.

## Can the ATO pay a refund into an overseas bank account?

No. The ATO's own words are: "We can only pay refunds into an Australian bank account." An account in your home country cannot receive the refund, whatever currency it holds, and there is no form that changes that.

The quote is from the ATO's page on [updating your financial institution details](https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details). The ATO's myTax instructions add that without bank details you may not be able to lodge online at all. So the account question belongs before your [working holiday tax return](/tax-return) goes in, not after.

## What happens if the refund went to an account you closed?

The Reserve Bank of Australia returns the payment to the ATO, which the ATO says can take up to 10 days. Once you update your bank details, the ATO reissues the refund to the new account.

In order, as the ATO's page on [missing tax return refunds](https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds) sets it out:

1. The refund is paid to the account on your return, which has been closed.
2. The Reserve Bank returns it to the ATO, which can take up to 10 days.
3. You give the ATO current Australian bank details, and it reissues the refund there.
4. If you give no new details, the ATO reissues the refund by cheque.
5. Since January 2025 the ATO has been holding some cheque refunds for up to 90 days while it asks for bank details.

So a refund that seems to have vanished has usually been issued, returned and is waiting for you.

## What if you lodge without an Australian account?

The ATO can hold the refund for up to 90 days from when it becomes payable, and it contacts you by letter, email or myGov message to ask for valid Australian account details. Giving valid details with the return avoids that wait.

This is in the ATO's [individual tax return instructions for 2026](https://www.ato.gov.au/forms-and-instructions/individual-tax-return-2026-instructions/completing-the-individual-tax-return-2026/completing-individual-information-in-your-tax-return-2026). If the ATO writes to you while you are overseas, the message only reaches you if your contact details are current, which is why the guide to [updating your address with the ATO](/blog/how-to-update-address-with-ato) is worth a look before you go.

## What if the refund went into the wrong account?

It depends whose account it is. If the refund went to an account that has nothing to do with you, contact the ATO and it will try to recover the money; the ATO says that can take over 28 days.

If it went to an account you know, such as an old account of yours or a partner's account, the ATO says it generally cannot retrieve the funds for you, and getting the money back is a matter between you and the account holder. That is the strongest reason to check the account number on your return twice.

## How do you give the ATO new bank details?

Online through myGov: open the ATO, then My profile, then Financial institution details. The account has to be an Australian account in your name, alone or jointly, with a 6 digit BSB and an account number of up to 9 digits.

You or a nominated representative can also update the details by phone, with your TFN ready. The ATO's numbers are 13 28 61 inside Australia and +61 2 6216 1111 from outside Australia, 8 am to 5 pm Monday to Friday, Australian Eastern time.

## What about a cheque once you are home?

The cheque is in Australian dollars and has to reach you by post, so keep the postal address the ATO holds current as well as the bank details. Before you count on a cheque, ask your bank at home whether it accepts Australian dollar cheques and what it charges to clear one.

If you still have a working Australian account, or can open one before the cheque is issued, giving those details is usually the simpler route.

## Should you keep your Australian account open after you leave?

Yes, until everything owed to you has landed. A tax refund can only arrive in an Australian account, and super the ATO already holds is paid only into an Australian account in your name or by cheque. A super fund can sometimes pay by international transfer, but not every fund offers one.

Closing the account is usually the last job on the list, not the first; the rest of that list is on our [leaving Australia](/leaving-australia) page. For the normal timing of a refund, see [how long a tax refund takes in Australia](/blog/how-long-does-tax-refund-take-australia), and to see where your return is right now, [what each ATO tax return status means](/blog/ato-tax-return-status-meaning).

## Would you rather we dealt with it?

You do not need myGov for us to help. We deal with the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. Tell us in your first WhatsApp message that your Australian account has closed, with roughly where and when you worked.
`,
 }, {
 slug: "ato-tax-return-status-meaning",
 title: "ATO tax return status: what each one means",
 description:
 "Processing, balancing account, information pending, under review, issued: what each ATO tax return status means, how long it takes and when to act.",
 category: "Tax Return",
 date: "24 November 2026",
 readTime: 5,
 body: `
Your tax return's status in ATO online services tells you where it is: Processing, Balancing account, Information pending, Under review or Issued. The ATO says most returns lodged online are processed within 10 business days, and that manual processing generally takes up to 30 calendar days, which a phone call cannot speed up. Under review means a person is checking the return before it is finalised; it is not a finding against you.

## Where do you see the status of your return?

In ATO online services through myGov, in the ATO app, or by phoning the ATO on 13 28 65. The status changes as the return moves through each stage.

The ATO lists these routes on its page on [how to track the progress of your tax return](https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return). A paper return is slower to appear: the ATO says it can take up to 7 weeks to show in its systems, and up to 90 business days to process.

## What does "Processing" mean?

The ATO has received the return and started working on it. The same status shows again near the end, when the notice of assessment is about to issue, and an estimated issue date appears when you open it.

All the status meanings in this guide come from the ATO's page on the [status of your tax return](https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/status-of-your-tax-return), last updated on 3 November 2026.

## What does "Balancing account" mean?

The ATO is balancing your return against your accounts with it and with other Australian Government agencies. If you owe anything there, part or all of the refund can be used to pay it.

This is the stage where a refund can shrink before it is paid. How that works, and how to check whether it happened to you, is in the guide to a [tax refund smaller than expected](/blog/tax-refund-less-than-expected-offset).

## What do "Information pending" and "Under review" mean?

Information pending means the ATO is collecting information it needs to finish processing. Under review means the return is being checked by hand before it is finalised. In both cases the ATO says it will contact you if it needs anything from you.

A manual check of an online return generally takes up to 30 calendar days. If a letter or message does arrive asking for details, answer it by the date it gives; the steps are in [what to do when the ATO asks for information](/blog/ato-letter-asking-for-information-tax-return).

## The status says cancelled. Should you lodge again?

No. A cancelled transaction can show for 24 to 48 hours. Do not lodge again in that time, and allow up to 10 business days for a return lodged electronically to be finalised.

The ATO's advice is to wait for the cancelled status to clear rather than lodge a second copy of the same return.

## What does "Issued" mean?

Processing is finished and your notice of assessment has issued. It shows whether you get a refund, owe money, or neither, and if there is a refund it is paid into the Australian bank account on your return.

If the status says issued and the money never arrived, check the account details first. A refund sent to a closed account goes back to the ATO and waits for new details, which is a different problem from a slow return.

## How long should each stage take?

The ATO gives these timeframes:

- Most returns lodged online: processed within 10 business days.
- A return the ATO has to process manually: generally up to 30 calendar days.
- A paper return: up to 90 business days, and up to 7 weeks just to show in ATO systems.
- A cancelled transaction: can show for 24 to 48 hours.

None of these is a promise of a payment date. They are the ATO's figures for most returns, and a return that needs a manual check takes the longer route.

## When is it worth contacting the ATO?

When the ATO contacts you, answer by its date. If you are in financial difficulty or serious hardship, the ATO says you may be eligible for priority processing. Otherwise, during a manual check the status is as far as a phone call gets you.

What usually decides the date is settled before you lodge, and that is covered in [how long a tax refund takes in Australia](/blog/how-long-does-tax-refund-take-australia). How we prepare a [working holiday tax return](/tax-return) is on its own page.

## Would you rather we dealt with it?

You do not need myGov for us to help. We deal with the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. Message us on WhatsApp with roughly where and when you worked.
`,
 }, {
 slug: "tax-refund-less-than-expected-offset",
 title: "Tax refund smaller than expected? Check for an offset",
 description:
 "The ATO must use your refund to pay a tax debt and may send it to another agency you owe. How to see if your refund was offset, and what to do next.",
 category: "Tax Return",
 date: "24 November 2026",
 readTime: 5,
 body: `
If your refund is smaller than expected, or the notice shows a refund that never arrived, the ATO may have used it to pay a debt. The ATO says it is required by law to use refunds and credits to pay tax debts, including a debt on hold, and it may also send a refund to another government agency you owe money to. Whatever is left once the debts are paid is refunded to you.

## Which debts can take your refund?

Any tax debt you have with the ATO, including one that is on hold. The ATO may also use a refund to pay other Commonwealth debts; its own example is a family tax benefit debt with Services Australia.

The ATO explains this on its page on [offsetting](https://ato.gov.au/offsetting), and says there are only limited circumstances in which it can choose not to offset. In practice, a refund for one year is checked against everything you owe before any of it is paid out.

## How do you know an offset happened?

Your statement of account in ATO online services shows it. The ATO says you can check this on your statement of account or in ATO online services.

So the first step is to compare three figures: the refund your notice of assessment shows, the amount that reached your Australian account, and what the statement of account says happened in between. If the gap between them matches a debt, that is your answer.

## What if the refund is smaller because the result itself changed?

Then it is not an offset. The ATO assessed a different figure from the one you expected, and the notice of assessment shows how.

Go through the [notice of assessment](/blog/notice-of-assessment-working-holiday) line by line against your return. A missing employer, an income statement that changed after you lodged, or a deduction the ATO did not accept are the usual reasons. If your return had a mistake, individuals generally have 2 years from the day after the notice was sent to amend it, according to the ATO's [time limits on amendments](https://www.ato.gov.au/individuals-and-families/your-tax-return/amend-your-tax-return/time-limits-on-amendments).

## What if you do not recognise the debt?

Contact the ATO with your notice of assessment and a copy of your return ready, and ask which debt the refund went to and which year it came from.

If you agree the debt exists but think the figure is wrong, the earlier return is the one to look at. Fixing a return that was wrong is covered in the guide to [amending a tax return](/blog/amending-tax-return-australia). If you disagree with the ATO's decision behind the debt, the formal route is an objection, and the ATO sets time limits for that too.

## Why would a working holiday maker have an old tax debt?

Usually from an earlier year where some income had no tax withheld, such as ABN work or cash in hand. The debt sits on your ATO account until it is paid, and the next refund is the first place the ATO looks to collect it.

It can also come from a year you thought was finished. An income statement that an employer corrected after you lodged can lead to an amended assessment, and the extra tax becomes a debt.

## Can you stop an offset from happening?

Generally not. The ATO describes offsetting as something it is required by law to do, with limited discretion. What you can control is knowing about the debt before the refund arrives, so the smaller payment is not a surprise.

If you owe more than the refund covers, the rest is still due. A payment plan is the usual way to deal with it, and the ATO offers one for many tax debts.

## What should you check first?

A short order that settles most cases:

1. Read the notice of assessment: is the refund on it the figure you expected?
2. Open your statement of account: does it show part of the refund going to a debt?
3. Check for a letter from another agency about a debt you owe it.
4. If the notice figure itself is lower, compare the return with your income statements.
5. Only then contact the ATO, with the notice and your return in front of you.

For how long a normal refund takes before any of this applies, see [how long a tax refund takes in Australia](/blog/how-long-does-tax-refund-take-australia). Each later [working holiday tax return](/tax-return) is balanced against old debts first.

## Would you rather we dealt with it?

You do not need myGov for us to help. We deal with the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. Message us on WhatsApp with roughly where and when you worked.
`,
 }, {
 slug: "ato-letter-asking-for-information-tax-return",
 title: "ATO letter asking for information: what to do",
 description:
 "The ATO asked for more information about your tax return? Why it happens, how to check the letter is real, the deadline and what follows if you ignore it.",
 category: "Tax Return",
 date: "24 November 2026",
 readTime: 5,
 body: `
A letter or message from the ATO asking for more information about your tax return usually means the data it holds does not match what your return says. Answer by the date in the letter: the ATO says that if you do not respond in time, it issues an amended assessment. If you are not sure the contact is genuine, do not reply to it; call the ATO on 1800 008 540 or sign in to myGov yourself.

## Why does the ATO send these letters?

The ATO compares your return with information it receives from third parties, such as employers and banks, and writes when it finds an error or something left out. It may ask you for more information before it amends anything.

The ATO explains the process on its page on an [amended assessment from data matching](https://www.ato.gov.au/individuals-and-families/your-tax-return/data-matching-letters/amended-assessment-from-data-matching). For a working holiday maker, common triggers are a job missing from the return, an income statement the employer corrected after you lodged, or bank interest that was never declared.

## How do you tell a real ATO letter from a scam?

The ATO contacts people by phone, email, SMS and post. It never asks for your TFN, bank details or myGov sign-in by email or SMS, and its calls show as No Caller ID.

If in doubt, do not respond to the message itself. Call 1800 008 540, or sign in to ATO online services through myGov rather than following a link, as the ATO advises on its page to [verify or report a scam](https://www.ato.gov.au/online-services/scams-cyber-safety-and-identity-protection/verify-or-report-an-ato-scam).

## What should you send back?

Exactly what the letter asks for, and nothing it does not. Usually that is evidence for an amount on your return: payslips, an income statement, a letter from an employer, or records for a deduction you claimed.

Keep copies of everything you send and a note of the date. If you cannot get a document in time, contact the ATO before the deadline rather than after it.

## What happens if you ignore it?

The ATO issues an amended assessment based on the information it holds. Any amount payable is due 21 days after the ATO notifies you, and a shortfall interest charge may apply to the extra tax.

Ignoring the letter does not make the question go away. It only means the ATO answers it without your side of the story.

## What if you disagree with the amended assessment?

You can ask for a review if you have documents that support your return, or information that was not available before, and you can ask the ATO for a written explanation of the changes. The ATO points out that a review request does not extend the time you have to object.

The formal route is in [how to object to an ATO decision](/blog/appealing-ato-decision-australia). A change you make yourself, before the ATO acts, is an amendment instead, explained in [amending a tax return](/blog/amending-tax-return-australia).

## What if you cannot pay by the due date?

You may be able to set up a payment plan, and the ATO says that for debts of $100,000 or less this can be done in ATO online services or through its automated phone service.

Interest can keep running on what is unpaid, so contact the ATO before the due date if you cannot pay in full.

## Does it matter that you have left Australia?

No. The letter is about the year your return covers, not where you live now, and it still has to be answered. What changes is how it reaches you: the ATO uses the postal address, email and phone number it holds, so keep them current after you leave.

If your myGov sign-in no longer works from overseas, a letter in your myGov inbox can sit there unread, and that is how deadlines get missed. For the normal timing of a return before any letter arrives, see [how long a tax refund takes in Australia](/blog/how-long-does-tax-refund-take-australia).

## Would you rather we dealt with it?

You do not need myGov for us to help. We deal with the ATO directly, and every return is reviewed and signed off by a registered tax agent before it is lodged with the ATO.

Message us on WhatsApp with what the letter says and roughly where and when you worked. How we prepare a [working holiday tax return](/tax-return) is on its own page.
`,
 }, {
 slug: "notice-of-assessment-working-holiday",
 title: "Notice of assessment: refund, nil or amount owing",
 description:
 "Your notice of assessment shows a refund, nil or an amount owing. Where to find it in myGov, when a debt is due, and what to do if the result looks wrong.",
 category: "Tax Return",
 date: "24 November 2026",
 readTime: 5,
 body: `
Your notice of assessment is the ATO's statement of how your tax was worked out, and it shows whether you get a refund, owe money or neither. If your ATO account is linked to myGov it arrives in your myGov inbox, and if there is an amount owing, the payment advice and due date are on the notice itself. If the result looks wrong, compare it with your return first: individuals generally have 2 years to amend.

## Where do you find your notice of assessment?

In your myGov inbox when the ATO is linked to your account. For a copy, sign in to myGov, open the ATO, then My profile, Communication, History.

The ATO describes this on its page about [your notice of assessment](https://www.ato.gov.au/individuals-and-families/your-tax-return/your-notice-of-assessment). If you lodged on paper, the notice is posted to you, which is a reason to keep your address with the ATO current after you leave.

## What does each result mean?

There are three outcomes, and the notice says which one you have:

- A refund: more tax was withheld from your pay than you owed, and the difference is paid into the Australian bank account on your return.
- Nil: the tax withheld matched the tax on your income.
- An amount owing: you owe the ATO, and the payment advice and due date are on the notice.

A refund that arrives lower than the notice shows may have been used to pay a debt. How that works is in the guide to a [tax refund smaller than expected](/blog/tax-refund-less-than-expected-offset).

## Why would a working holiday maker owe money?

Usually because some income had no tax withheld from it. ABN work is the common case, since nothing is taken out of an ABN payment, and cash in hand is another.

An employer who withheld too little can also leave a gap. The notice does not explain the cause; it shows the result. Working back from it means comparing the income on the notice with every income statement for the year.

## What if you cannot pay by the due date?

Contact the ATO before the date. A payment plan is the usual route, and interest keeps running on what is unpaid.

How a plan works, and what interest adds, is in the [ATO payment plan guide](/blog/ato-payment-plan-tax-debt-australia). Leaving the amount unpaid does not make it smaller, and the ATO can take it from a later refund.

## What if the notice looks wrong?

Compare it with your return line by line. Most differences come from an income statement that changed after you lodged, a job that was left out, or a deduction the ATO did not accept.

If your return had an error, you can amend it. The ATO's [time limits on amendments](https://www.ato.gov.au/individuals-and-families/your-tax-return/amend-your-tax-return/time-limits-on-amendments) give individuals generally 2 years, starting the day after the notice of assessment is sent. Past that, an objection may be the route. If you still see a problem, contact the ATO with the notice and a copy of your return.

## When does the refund arrive after the notice?

The notice is issued when processing is finished, and any refund is paid into the Australian account on your return. If the notice shows a refund and nothing arrives, check whether that account is still open: a refund paid to a closed account goes back to the ATO and waits for new bank details.

For the normal timing, see [how long a tax refund takes in Australia](/blog/how-long-does-tax-refund-take-australia).

## Should you keep the notice?

Yes. A previous notice of assessment is one of the records the ATO can use to confirm your identity, for example when you link a new myGov account to the ATO, and it is the starting point for any amendment or objection. Save a copy outside myGov as well, in case you lose access to the account after you leave.

The notice also tells you which year is settled. Each financial year has its own return and its own notice, so a working holiday across two years means two notices to keep.

## Would you rather we dealt with it?

You do not need myGov for us to help. We deal with the ATO directly, and every return is reviewed and signed off by a registered tax agent before it is lodged with the ATO.

Message us on WhatsApp with roughly where and when you worked. How we prepare a [working holiday tax return](/tax-return) is on its own page.
`,
 }, {
 slug: "dasp-online-application-problems",
 title: "DASP online application not working? Common snags",
 description:
 "Cannot submit your DASP, find a saved claim or see your fund? What the ATO's online application allows, the shared secret, statuses and what to do next.",
 category: "Super",
 date: "24 November 2026",
 readTime: 5,
 body: `
Most problems with the ATO's online DASP application come from a few fixed rules. It will not accept a claim while your temporary visa is still active, it finds a saved application only with the same passport details you used the first time, it cannot be changed once submitted, and it does not show whether your fund has acted. Once you know which rule you have hit, each snag has a plain next step.

## Why will the application not submit?

Usually because a visa is still active in Home Affairs records, or because you are still in Australia. The ATO's rule is that you can only submit once you have left Australia, your visa has ceased and you hold no other active Australian visa.

Check your visa in VEVO, the Home Affairs visa check, as the ATO's [help with the DASP online application system](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system) advises. If the visa details shown are wrong, do not submit online; the ATO asks you to email DASPmail@ato.gov.au instead. What to do while a visa is still in effect is in [visa still active: why you cannot claim your super yet](/blog/visa-still-active-cant-claim-super).

## Why can you not see your saved application?

Because the system finds you by the personal details you entered the first time. The ATO says that when you come back to the application you must use the same passport number and country as before, even if that passport has since expired.

If you renewed your passport between starting and returning, enter the old one. If your details now differ and you start a new application, you cannot see the earlier ones from it.

## What if your super fund is not listed?

The money is not gone. Choose "Add application" on the "Add an application" page and start one with the fund's ABN. The system can look up the ABN from the fund's name, and the fund itself or its website will also give it.

Your tax file number is optional in the application. With it, the system can search for accounts in your name; without it, you give each fund's details yourself, including your member number where you have it. Super that has already moved to the ATO is claimed through the same application.

## What if you forgot your shared secret?

A saved application reopens with a question and answer you chose yourself, and you get three attempts. If you cannot remember it, phone the ATO.

From outside Australia the number is +61 2 6216 1111, 8:00 am to 5:00 pm Monday to Friday, Australian Eastern time; ask to be transferred to 13 10 20. An interpreter service is available on +61 3 9268 8332.

## You made a mistake after submitting. Can you fix it?

Not in the application. A submitted application can be viewed but not changed. Contact the fund directly and give it the correct details, since the fund is the one processing the claim.

Typing everything exactly as it appears on your passport, and checking each fund's ABN and member number before you submit, avoids most of these calls.

## What do the statuses mean?

The ATO's help page lists five statuses an application can show:

- Submitted
- Rejected
- New application
- Not to be forwarded
- Transferred

A new application is one you have started and saved but not yet submitted. What none of the statuses tells you is the most useful thing: the system does not show whether the fund has processed the claim. The ATO says a DASP is generally paid within 28 days of a completed application being received, so after 28 days ask the fund. For super the ATO holds, the ATO says it cannot always meet 28 days, so allow a little longer before you call. Timing is covered in [how long a DASP takes](/blog/how-long-does-dasp-take).

## What if the claim comes back rejected?

The super stays where it was, and a valid claim can still be made once the cause is fixed. The usual causes are a visa record that has not caught up, a name that does not match the fund's record, a fund that holds none of your money, or documents the fund did not accept.

Each of those, and the fix, is in [DASP claim rejected: common reasons and how to fix them](/blog/dasp-rejected-what-to-do). The full set of rules for a [DASP claim](/superannuation) is on the ATO's [DASP page](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp).

## Would you rather we dealt with it?

You do not need myGov for us to help: the DASP application does not use it. We deal with the ATO directly, and Working Holiday Tax operates under the supervision of a registered tax agent. We prepare each application and chase the fund that goes quiet. Send us the names of the places you worked and roughly when on WhatsApp, and we will tell you which funds to expect and what each one will ask for before you apply.
`,
 }, {
 slug: "visa-still-active-cant-claim-super",
 title: "Visa still active? Why you cannot claim your super yet",
 description:
 "A DASP can only be submitted once you have left and your visa has ceased, with no other visa active, bridging visas included. How to check and what to do.",
 category: "Super",
 date: "24 November 2026",
 readTime: 5,
 body: `
You cannot submit a super claim while any Australian visa in your name is still in effect, even after you have flown home. The ATO's rule is that you have left Australia, your temporary visa has expired or been cancelled, and you hold no other active Australian visa. If the online application says your visa is active, it is reading Home Affairs records, and the fix is in your visa status, not in the form.

## How do you check what the records show?

Use VEVO, the Department of Home Affairs visa check. The ATO points to VEVO for exactly this problem: if the expiry date there is still in the future, the claim cannot be submitted yet.

The ATO's [help with the DASP online application system](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system) says you cannot submit while your temporary visa is still active after you leave. If the visa details the application shows are wrong, do not submit online; email DASPmail@ato.gov.au instead.

## Which visas count as another active visa?

Any Australian visa. A second or third year working holiday visa granted before you left, a visa you applied for that put you on a bridging visa, or a visitor visa granted for a later trip all keep the claim on hold while they are in effect.

The rule is on the ATO's [DASP page](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp): you must not hold "any other active Australian visa". For the tax rate on the payment, a bridging visa linked to a 417 or 462 is treated as a working holiday visa.

## Can you just wait for it to expire?

Yes, and many people do. Start and save the online application now so it is ready, then submit once the visa has ceased and VEVO shows it.

Waiting has one side effect to know about. Once 6 months or more have passed since you left Australia and your visa has ceased, an unclaimed balance moves from the fund to the ATO. It is still claimable there, but the ATO pays it only into an Australian bank account in your name or by cheque, not by international transfer. More on that in [what happens to unclaimed super](/blog/what-happens-to-unclaimed-super).

## Can you have the visa cancelled instead?

The Department of Home Affairs can cancel a visa you no longer need once you have left, and the ATO's DASP page links to the Home Affairs page on cancelling a visa. Cancellation usually brings the claim forward.

It is an immigration decision, not a tax one, so read the Home Affairs page before you ask for it, especially if you may want to come back to Australia on that visa.

## What if you are still in Australia?

Then no claim can be submitted, whatever your visa status. Super is preserved while you are here on a temporary visa, and there is no early release on a working holiday visa for leaving a job.

What you can do is prepare. The online application can be started and saved in Australia, and certified copies of your documents are easier to arrange before you fly than after.

## What does an active visa mean for the 65% rate?

Nothing, on its own. The rate depends on which visa you held when the contributions were made: for a DASP that includes super earned on a 417 or 462 visa, or a bridging visa linked to one, the fund withholds 65% of the taxable component, and that rate then covers the whole payment from that fund.

An active visa only decides when you can claim, not how the payment is taxed.

## Is a rejected claim lost money?

No. The super stays in the fund until a valid claim is made. A claim that was submitted and then rejected because the visa record had not caught up can be made again once it has.

The other common reasons a claim fails, and the fix for each, are in [DASP claim rejected: common reasons and how to fix them](/blog/dasp-rejected-what-to-do). Who can claim and how the [DASP claim](/superannuation) runs, step by step, is on our super page. If the application itself is the problem, see [DASP online application not working](/blog/dasp-online-application-problems).

## Would you rather we dealt with it?

You do not need myGov for us to help: the DASP application does not use it. We deal with the ATO directly, and Working Holiday Tax operates under the supervision of a registered tax agent. We prepare each application and chase the fund that goes quiet. Send us the names of the places you worked and roughly when on WhatsApp, and we will tell you which funds to expect and what each one will ask for before you apply.
`,
 }, {
 slug: "certify-documents-overseas-super-claim",
 title: "Certified copies from overseas for a super claim",
 description:
 "Who can certify your passport for a DASP once you have left Australia, what the copy must say, and why your fund's own list matters more than the ATO's.",
 category: "Super",
 date: "24 November 2026",
 readTime: 5,
 body: `
Once you have left Australia, the ATO's list of people who can certify copies for a super claim starts with consular staff at an Australian embassy, high commission or consulate. If none is within reach, it accepts a notary public, a Justice of the Peace, a judge, or a registrar or deputy registrar of a court. Your fund has the final say, and some funds accept fewer people than the ATO lists.

## Who does the ATO list as certifiers outside Australia?

In order, as the ATO's instructions for the paper DASP form set it out:

1. Consular staff at an Australian embassy, high commission or consulate.
2. If none can be reached: a notary public, a Justice of the Peace, a judge, or a registrar or deputy registrar of a court.
3. If none of those can be reached either: check whether your fund will consider other certification.

The list is in the ATO's [instructions for the DASP application form](https://www.ato.gov.au/forms-and-instructions/departing-australia-super-payment-application/how-do-i-complete-this-form). It is the ATO's list; each fund decides what it accepts for its own claims.

## When will a fund ask for certified copies at all?

Mainly when it holds $5,000 or more, or when you apply on paper. On the online application, a fund may want certified copies of your identity documents for $5,000 or more; on paper, a fund has to identify you whatever the balance.

The ATO says this on its [DASP page](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp), and its guidance to funds says online claims under $5,000 do not need the standard identity checks. So a small balance claimed online often needs no certified copy at all.

## What must the certified copy show?

The certifier sees the original and writes or stamps "certified true copy" on each page, with their signature, printed name, qualification and the date. A page without those details may not be accepted.

Funds can add their own rules on top, for example on how recent a certification must be or whether a translation is needed, so read your fund's claim form before you book anyone.

## Why is the fund's list the one that counts?

Because funds differ, and the fund is the one paying: one fund's accepted list can be narrower than the ATO's.

A copy certified by someone your fund does not accept comes back, and the claim waits. An unaccepted certifier is one of the common reasons in [DASP claim rejected: common reasons and how to fix them](/blog/dasp-rejected-what-to-do), and it is far easier to ask the fund first than to start again.

## Is it easier to do before you leave?

Yes. The ATO says plainly that certifying documents is much easier while you are in Australia, and you can start and save the online application before you fly, then submit it once you have left and your visa has ceased.

If you know a fund holds $5,000 or more, or you expect to claim on paper, arrange certified copies of your passport before your last weeks get busy. What else a claim needs is in [what documents a DASP needs](/blog/dasp-documents-required).

## What if your name or passport has changed?

If your name changed since you were in Australia, funds need certified evidence of the change, such as a marriage certificate, whatever the amount. The same certifier rules apply to that document.

If you renewed your passport, tell the fund both numbers: the account may have been opened against the old one. The online application also expects the same passport details you used when you first started it.

## What if nobody on the list is near you?

The ATO's answer is to check whether your fund will consider other certification. Every fund decides this for itself, so write to it, say where you are, and ask who it will accept there.

Keep the reply. If the claim is questioned later, it shows the certifier was the fund's own choice. How long a claim takes once the documents are in is in [how long a DASP takes](/blog/how-long-does-dasp-take), and the whole [DASP claim](/superannuation) is set out on our super page.

## Would you rather we dealt with it?

You do not need myGov for us to help: the DASP application does not use it. We deal with the ATO directly, and Working Holiday Tax operates under the supervision of a registered tax agent. We check what each fund needs before you leave, while certifying is still easy. Send us the names of the places you worked and roughly when on WhatsApp, and we will tell you which funds to expect and what each one will ask for before you apply.
`,
 }, {
 slug: "claim-super-if-coming-back-to-australia",
 title: "Claiming super if you plan to come back to Australia",
 description:
 "Planning a second working holiday or a visit? When you can claim your super as a DASP, why another active visa blocks it, and whether it affects later visas.",
 category: "Super",
 date: "24 November 2026",
 readTime: 5,
 body: `
You can claim your super as a DASP only once you have left Australia, your working holiday visa has ceased, and you do not hold any other active Australian visa. Planning to come back does not stop you, but a visa that is already granted for the next trip does, until it ceases. Claiming does not count against you later: the ATO says claiming a DASP will not affect any future visa applications.

## What has to be true before you can claim?

Four things, all from the ATO's rules for a Departing Australia Superannuation Payment:

1. Your super was earned on a temporary visa.
2. You have left Australia.
3. Your visa has ceased, by expiry or cancellation, and you hold no other active Australian visa.
4. You are not an Australian or New Zealand citizen or a permanent resident.

The full rules are on the ATO's [DASP page](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp). An intention to return is not on the list. A visa that is in effect is.

## Can you claim between a first and a second working holiday visa?

Only while you hold no active Australian visa. If a second or third year working holiday visa has already been granted, it is an Australian visa in your name, and the ATO's rule is that no other visa can be active when you claim.

So the window, if there is one, is the time between your first visa ceasing and the next one being granted. Check what VEVO shows for you before you submit. If it lists an active visa, see [visa still active: why you cannot claim your super yet](/blog/visa-still-active-cant-claim-super).

## Can you claim while you hold a visitor visa?

The rule is the same. A visitor visa granted for a later trip is an Australian visa, and while it is in effect it blocks the claim, whether or not you have used it yet.

If you plan a short visit, for a graduation, a wedding or a holiday, consider whether to claim before you apply for that visa or after it has ceased.

## Will claiming your super hurt a future visa application?

No. The ATO's DASP page says it directly: "Claiming a DASP will not affect any future visa applications."

What claiming does change is your super accounts. Once a fund has paid out your whole balance, there is nothing left in that account, so if you come back to work later your employer pays into whichever fund you then choose.

## What if you leave the super and come back later?

It waits for you, but not always in the fund. Once 6 months or more have passed since you left Australia and your visa has ceased, an unclaimed balance moves from the fund to the ATO.

You can still claim it from the ATO as a DASP at any time, through the same online application. The ATO pays super it holds only into an Australian bank account in your name or by cheque, not by international transfer. More in [what happens to unclaimed super](/blog/what-happens-to-unclaimed-super).

## Does the 65% rate change if you come back?

Not for super earned on a working holiday visa. For a DASP that includes contributions made while you held a 417 or 462 visa, or a bridging visa linked to one, the fund withholds 65% of the taxable component, and that rate covers the whole payment from that fund. Coming back on another working holiday visa adds super taxed the same way.

Each fund pays separately and sets the rate for its own payment, so super earned on a different kind of visa in a separate fund is assessed on its own facts.

## Should you claim now or wait?

That depends on your plans and your balances, and it is your decision. The points that usually decide it:

- Whether a next visa is already granted, which settles it for now.
- How small each balance is, since fees and insurance premiums come out of a fund while it waits.
- Whether you expect to need an Australian bank account later, for super the ATO may end up holding.
- Whether certified copies are easier to arrange now, while you are still in Australia.

The trade off is weighed up in [leave super in Australia or take a DASP](/blog/dasp-vs-leaving-super-in-australia-pros-cons), and the whole [DASP claim](/superannuation), step by step, is on our super page.

## Would you rather we dealt with it?

You do not need myGov for us to help: the DASP application does not use it. We deal with the ATO directly, and Working Holiday Tax operates under the supervision of a registered tax agent. Send us the names of the places you worked and roughly when on WhatsApp, and we will tell you which funds to expect and what each one will ask for before you apply. If you also have a return to lodge, it is reviewed and signed off by a registered tax agent before it is lodged with the ATO.
`,
 }, {
 slug: "tax-and-super-timeline-working-holiday",
 title: "Tax and super timeline for working holiday makers 2026-27",
 description:
 "When you can lodge, when the return is due, how long the refund and DASP take, and when unclaimed super moves to the ATO. Every 2026-27 date, from ATO pages.",
 category: "Tax Return",
 date: "24 November 2026",
 readTime: 6,
 body: `
The 2026-27 tax year runs from 1 July 2026 to 30 June 2027. You can lodge from 1 July 2027, the return is due by 31 October 2027 if you lodge it yourself, and the ATO says most online returns are processed within 10 business days. Super is a separate claim: you apply for it as a DASP once you have left Australia and your visa has ended, and the ATO says it is generally paid within 28 days of a complete application.

## What are the key dates for 2026-27?

In date order:

- 1 July 2026: the year starts, and Payday Super begins. Employers must get super to your fund within 7 business days of paying you, with some exceptions such as new employees.
- 30 June 2027: the year ends. Work paid after this date belongs to 2027-28.
- From 1 July 2027: you can lodge. Wait until each employer's income statement is marked tax ready.
- 31 October 2027: the due date if you lodge yourself. It is a Sunday. In 2026, when 31 October fell on a Saturday, the ATO accepted returns until 11:59 pm local time on Monday 2 November.
- After 31 October: a registered tax agent can lodge for clients after this date, for people who contacted the agent before 31 October.

How a working holiday splits across two financial years is in the [Australian financial year guide](/blog/australian-financial-year-dates).

## Can you lodge before you leave Australia?

Only in one case. If you are leaving permanently and will have no more Australian income apart from interest, dividends or royalties, the ATO lets you lodge early on the paper form, and it says early lodgments take 50 business days to process.

Payslips are not enough for an early return: you need final figures from each employer. Everyone else lodges from 1 July, from wherever they are, and myTax works from overseas as long as your myGov sign-in does.

## What happens if you miss 31 October?

You can still lodge, and a refund is not lost. The ATO can charge a failure to lodge penalty of one penalty unit for each 28 days, or part of 28 days, that a return is late, up to 5 units. A unit is $364 from 1 July 2026, so the most is $1,820.

The ATO says it generally does not issue the penalty when a late return results in a refund or a nil result, generally does not penalise an isolated late return, and warns you before it applies one. More in [late tax return penalties](/blog/late-tax-return-penalty-working-holiday).

## Is the date later with a registered tax agent?

It can be. The ATO says registered tax agents can lodge returns for their clients after the usual 31 October deadline, and that anyone new to an agent, or switching, should contact them before 31 October to be part of their lodgment program. Your own due date then depends on your circumstances and when you engaged the agent, so ask the agent rather than assume.

Joining a client list after 31 October does not reach back and extend a date that has passed. The rest is in [the 31 October deadline guide](/blog/tax-return-deadline-31-october-working-holiday).

## How long does the refund take?

The ATO says most online returns are processed within 10 business days, a return it processes by hand can take up to 30 calendar days, and a paper return up to 90 business days.

Any refund is paid into an Australian bank account, so keep yours open until it arrives. What slows one down is in [how long a tax refund takes in Australia](/blog/how-long-does-tax-refund-take-australia).

## When can you claim your super?

Once your visa has ceased, by expiry or cancellation, and you have left Australia without another active visa. You can start and save the ATO's online application before you fly, but you can only submit it after that.

The ATO says a DASP is generally paid within 28 days of your completed application being received. See [how long a DASP takes](/blog/how-long-does-dasp-take) for what can hold it up.

## When does unclaimed super go to the ATO?

If you have not claimed, your fund moves your super to the ATO once it has been 6 months or more since you left Australia and your visa has ceased.

It can still be claimed as a DASP at any time, but the ATO pays super it holds only into an Australian bank account in your name or by cheque, not by international transfer. See [what happens to unclaimed super](/blog/what-happens-to-unclaimed-super).

## Does Payday Super change when you should claim?

It shortens the wait. For pay from 1 July 2026, your last contribution should reach your fund within 7 business days of your last payday, with some exceptions.

Check that your fund shows it before you submit the claim, so the DASP covers the whole balance. A contribution that lands after the claim has been paid means claiming again for what is left.

## What does a working holiday look like, start to finish?

For someone who works from early 2027 and flies home in the middle of the year, the order is usually:

1. Last shift and last payday, then the final super contribution reaches the fund.
2. Start the DASP application before the flight; arrange certified copies if a fund may need them.
3. Fly home. The visa ceases on its expiry date, or earlier if Home Affairs cancels it.
4. Submit the DASP once the visa has ceased; payment generally within 28 days.
5. From 1 July 2027, lodge the 2026-27 return once every income statement is tax ready.
6. By 31 October 2027, the return is due if you lodge it yourself.

## Would you rather not do it yourself?

Message us on WhatsApp with where and when you worked. You do not need myGov: we deal with the ATO directly, and nothing is lodged until you have read it and signed. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.

We prepare your [working holiday tax return](/tax-return) and help you [claim your superannuation](/superannuation) after you leave.
`,
 },
]
