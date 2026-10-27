import type { LongArticle } from '../types'

const ATO = 'https://www.ato.gov.au'

export const LONG_EN_05: readonly LongArticle[] = [
  {
    slug: 'farm-work-rights-international-students',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Farm work on a student visa: your pay, piece rates and tax',
    description: 'Picking or packing fruit in the uni break? Your rights on a farm, how piece rates must work, what a farm can take from your pay, and how the income fits your tax return.',
    answer: 'On a farm you have the same workplace rights as any other employee, including minimum pay, a payslip and super. Under the Horticulture Award, piece rates must be agreed in writing before you start and you are guaranteed at least the minimum hourly rate for each day.',
    body: `Many international students spend part of the summer break on a farm. Picking, packing and pruning jobs are easy to find in the holidays, and they can pay well. But farm work is also the area where workers are most often paid too little. This guide explains the rules that protect you and how the money fits into your tax return. For any question about how many hours your visa lets you work, check your own visa conditions with the Department of Home Affairs.

## Do you have the same rights as an Australian worker?

Yes. Fair Work says visa holders have the same workplace rights as all other employees. That means a minimum rate of pay, a payslip, super on top of your wages, and a safe workplace.

Many students worry that complaining about pay will hurt their visa. Fair Work says your visa will not be cancelled because you contacted the Fair Work Ombudsman for help. You can call Fair Work on 13 13 94, and the free interpreter service on 13 14 50.

## Which rules cover fruit and vegetable work?

Most picking, packing and harvesting jobs are covered by the Horticulture Award. The award sets the minimum hourly rates, the rules for piece rates, and extra pay for some hours and days.

From the first full pay period starting on or after 1 July 2026, the national minimum wage is $26.44 an hour. Award rates can be higher than this, depending on your classification. If you are a casual, your hourly rate also includes a casual loading, which Fair Work says is generally 25% of the minimum hourly rate. The Fair Work Pay Calculator shows the exact rate for your job.

## How do piece rates work?

Some farms pay by the bin, the bucket or the kilogram instead of by the hour. This is lawful, but only if the farm follows the Horticulture Award rules:

- The piece rate must be set before the work starts.
- A piecework record must be made, signed and given to you before you start piecework.
- The rate must let an average competent worker earn at least 15% more than the minimum hourly rate.
- There is a minimum wage guarantee for each day you work. Even on a slow day, you must earn at least the minimum hourly rate for your hours.

So a piece rate can never be an excuse to pay you less than the hourly minimum. If you are new and slow, the daily guarantee still protects you.

## A simple way to check a day's pay

Keep your own notes of the hours you worked each day, including time waiting for bins. Then divide your pay for the day by your hours.

For example, you work 8 hours and earn $200 in piece rates. That is $200 divided by 8, which is $25 an hour. If the minimum hourly rate for your job is higher than $25, the farm must pay you the difference for that day. Compare your result with the rate the Fair Work Pay Calculator gives you.

## Can the farm take money from your pay?

Farms often offer a bed and a bus to the fields. They may want to take these costs from your wages. Fair Work says an employer can only deduct money from your pay in limited cases, for example when you agree in writing and the deduction is mainly for your benefit. You cannot be forced to agree.

A deduction can also have no effect if it benefits the employer and is unreasonable. Before you agree to anything, ask for the cost in writing. Keep a copy of what you signed, and check each payslip to see what was taken out.

## Payslips and super

You must get a payslip within one working day of payday. It must show your pay rate, your hours, any deductions and the super paid for you. Payslips are the best proof of what you earned.

Casual farm workers are generally entitled to super. The super guarantee rate is 12% of your ordinary time earnings. From 1 July 2026, under Payday Super, employers pay super at the same time as wages, and it must reach your fund within 7 business days. Check your fund account a few weeks after you start. If nothing arrives, ask the farm first, then you can report it to the ATO.

## How farm income fits your tax return

Your farm job is just another job for tax. When you start, you fill in a tax file number declaration. If you already have a main job during the semester, think about the tax-free threshold question. You generally claim it from one employer only, usually the one that pays you the most. For a short holiday job, the answer is usually no.

At the end of the year, all your jobs go into one return. Whether you pay tax at resident rates or foreign resident rates depends on your residency for tax purposes. A student in a course of 6 months or more may be a resident, but it depends on your situation. Wait until every employer's income statement is marked "Tax ready" before you lodge, because farms can be slow with their payroll.

Some work costs may be deductible, for example sun protection or protective items you bought for outdoor work and were not paid back for. Keep the receipts.

## Your checklist before and after a farm job

- Ask whether you will be paid by the hour or by piece rate.
- If it is piece rate, get the signed piecework record before you start.
- Get any accommodation or transport cost in writing before you agree to a deduction.
- Write down your hours every day, and keep a photo of each payslip.
- Write down the farm's legal name and ABN from your payslip.
- Check your super fund for contributions after a few weeks.
- Keep receipts for any work items you paid for.

When tax time comes, you can message Student Visa Tax on WhatsApp and we will put all your jobs into one return.`,
    faq: [
      { q: 'Can a farm pay me less than the minimum wage because I am new?', a: 'No. Under the Horticulture Award there is a minimum wage guarantee for each day you work, even if you are paid by piece rate. Your pay for the day must be at least the minimum hourly rate for your hours.' },
      { q: 'The farm never gave me a piecework record. What can I do?', a: 'The award says the record must be made, signed and given to you before piecework starts. Keep notes of your hours and pay, and contact the Fair Work Ombudsman if you think you were underpaid.' },
      { q: 'Do I pay a special tax rate for farm work?', a: 'No. Students are taxed at the normal rates that apply to their residency for tax purposes. Farm income is added to your other income in one tax return.' },
    ],
    sources: [
      { label: 'Fair Work: Horticulture, pay and piece rates', href: 'https://horticulture.fairwork.gov.au/pay-and-piece-rates' },
      { label: 'Fair Work: Deducting pay', href: 'https://www.fairwork.gov.au/pay-and-wages/deductions-and-related-issues/deducting-pay' },
      { label: 'ATO: Income from more than one job', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job` },
    ],
  },
  {
    slug: 'super-guarantee-charge-international-students',
    category: 'Super',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'The super guarantee charge explained for international students',
    description: 'When an employer pays your super late or not at all, the ATO can charge them the super guarantee charge. How it works under Payday Super and where your money goes.',
    answer: 'The super guarantee charge (SGC) is what an employer must pay the ATO when they do not pay your super in full and on time. The ATO then passes the unpaid super, plus notional earnings (interest), into your super account.',
    body: `If you work in Australia as an employee, your employer must pay super for you, even if you are an international student on a casual contract. Most employers do this correctly. When one does not, the law has a tool to fix it: the super guarantee charge, often called the SGC. This article explains what the SGC is, how it changed on 1 July 2026, and what it means for you as a worker.

## What is super, and do students get it?

Super (superannuation) is money your employer pays into a fund for you, on top of your wages. The ATO says generally all employees are eligible, whether they are full-time, part-time or casual, and this includes temporary residents. The rate is 12% of your ordinary time earnings. If you are under 18, you are only eligible for weeks where you work more than 30 hours.

Students can usually claim their super when they leave Australia for good and their visa has ended. This is called a Departing Australia Superannuation Payment (DASP). So every dollar of super that is not paid is money you lose.

## What is the super guarantee charge?

The SGC is a charge the ATO puts on an employer who does not pay the right amount of super on time. It is not a fine you pay. It is a cost for the employer, and it is designed so that paying late costs the employer more than paying on time.

The SGC is paid by the employer to the ATO, not to your fund. Once the employer pays it, the ATO moves the unpaid super and the interest part into your super account.

## How did Payday Super change the rules?

From 1 July 2026, Payday Super started. Employers now pay super at the same time as they pay wages. Fair Work says the super must reach your fund within 7 business days of payday. For a new employee, the first contribution can take up to 20 business days.

A new version of the SGC applies to wages paid from 1 July 2026. For wages paid up to 30 June 2026, the older quarterly rules still apply. If your unpaid super is from an earlier year, it is still covered, just under those older rules.

## What does the employer have to pay?

Under the new rules, the ATO says the SGC has four parts:

- **The shortfall:** the super that was not paid, after counting any on-time and late payments.
- **Notional earnings:** interest on the unpaid amount, worked out using the general interest charge rate.
- **An administrative uplift:** this starts at 60% of the shortfall plus notional earnings. It can be reduced, even to 0%, if the employer tells the ATO about the problem early and has a good record.
- **A choice loading:** 25% of the contributions for paydays where the employer did not follow the choice of fund rules, capped at $1,200 per notice period.

For you, the important parts are the first two. The shortfall and the notional earnings go into your super account. The interest part is there to put you back where you would have been if the employer had paid on time.

## How does the ATO find out?

Employers report wages to the ATO through payroll (Single Touch Payroll), and super funds report what they receive. Under the new rules, employers no longer lodge an SGC statement for paydays from 1 July 2026. Instead, the ATO works out the charge and sends the employer a notice of assessment. Payment is due on the day of the assessment.

If the employer does not pay within 28 days, the ATO sends a Notice to Pay. If they still do not pay within 28 days of that notice, a late payment penalty applies. The ATO also has debt collection powers that you do not have as an individual.

## How do you know your super is missing?

You can check this yourself with two documents:

- **Your payslips.** Each payslip must show the super paid for you and the name of your fund.
- **Your super fund account.** Log in to the fund, or check through ATO online services in myGov, which shows the payments employers have reported.

If your payslip shows super but your fund shows nothing after a reasonable time, something is wrong. Remember to check the "as at" date in myGov, because some information takes time to appear.

## What can you do if your employer has not paid?

Start by asking the employer. Sometimes it is a simple error, like wrong fund details. If that does not work, you can report unpaid super to the ATO with its online tool. You will need your TFN, the period you worked, and the employer's ABN, which is on your payslip.

The ATO says it will tell you whether it can collect the super. Not every report leads to collection, for example if the business has closed. You can still report even after you leave Australia.

## A short checklist

- Check that each payslip has a super line and a fund name.
- Log in to your fund or myGov a few weeks after you start a new job.
- Keep every payslip until your super is paid out, including after you leave.
- If super is missing, ask the employer first, then report it to the ATO.
- Before you claim DASP, check that all your super has arrived.

Super problems often show up at tax time, when students look at the year as a whole. If you want help checking your year, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Does the super guarantee charge cost me anything?', a: 'No. The SGC is paid by the employer to the ATO. The ATO then moves the unpaid super and the notional earnings into your super account.' },
      { q: 'My super went missing before 1 July 2026. Is it still covered?', a: 'Yes. For wages paid up to 30 June 2026 the older quarterly SGC rules still apply. You can still report the unpaid super to the ATO.' },
      { q: 'Can I report unpaid super after I leave Australia?', a: 'Yes. You can use the ATO online tool to report unpaid super. Keep your payslips and the employer\'s ABN so you have the details you need.' },
    ],
    sources: [
      { label: 'ATO: The new super guarantee charge', href: `${ATO}/businesses-and-organisations/super-for-employers/payday-super/missed-or-late-payday-super-payments/the-new-super-guarantee-charge` },
      { label: 'ATO: What happens if you don\'t pay super correctly', href: `${ATO}/businesses-and-organisations/super-for-employers/payday-super/missed-or-late-payday-super-payments/what-happens-if-you-dont-pay-super-correctly` },
    ],
  },
  {
    slug: 'working-before-tfn-arrives-international-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Working before your TFN arrives: a guide for international students',
    description: 'You applied for a TFN and got a job offer before the letter came. What to tell your employer, how the 28 days work, and what happens to your tax if the TFN is late.',
    answer: 'You can start work before your TFN arrives. Tell your employer on your TFN declaration that you have applied, and give them your TFN within 28 days, or they must take tax at the top rate plus the Medicare levy.',
    body: `Many students find a job in their first weeks in Australia, before the TFN letter arrives. This is normal and you do not need to wait. But the next 28 days matter for how much tax comes out of your pay. This guide explains what to do between applying and receiving your tax file number. For how many hours your visa lets you work, check your visa conditions with the Department of Home Affairs.

## What you have after you apply

When you apply online for a TFN, the ATO gives you a receipt ID for your application. This is not your TFN. It is a reference that lets the ATO find your application if you need to contact them.

Keep it somewhere safe, such as a screenshot or the confirmation email. You will need it if your TFN does not arrive in time.

## Can you start work before the letter comes?

Yes. When you start a job, your employer gives you a tax file number declaration. One part of that form asks for your TFN. If you do not have it yet, you can say that you have applied for one.

The ATO tells employers that if an employee says they have applied for a TFN, the employer does not have to withhold at the top rate straight away. Payroll uses a special code in place of the TFN while you wait. Do not write your receipt ID in the TFN box. It is not a TFN and it will cause a mismatch in payroll.

## The 28-day rule

You have 28 days to give your employer your TFN. If you have not given it to them within 28 days, the ATO says the employer must withhold tax at the top rate plus the Medicare levy. That is a lot of tax taken out of a small casual pay.

The ATO says you should receive your TFN within 28 days from when it receives your completed application. So in most cases the letter arrives in time. The problem usually comes from mail: a wrong address, a shared house where letters get lost, or a move to a new room.

## How the TFN reaches you

Your TFN is posted to the Australian postal address on your application. It is not sent by email or text message. If anyone contacts you by text or email with a link and says it is your TFN, treat it as a scam.

Do not lodge a second application while you wait. The ATO says this can delay processing. If nothing has arrived after 28 days, contact the ATO and give them your receipt ID.

## What to do when the TFN arrives

As soon as the letter arrives:

- Give your TFN to every employer you work for, not only your newest one. Each employer keeps its own record.
- Give it to your super fund, so your super can be matched to you.
- Store the letter safely. Your TFN is yours for life, and you will need it for every tax return and for your super when you leave.

From the next pay after your employer has the TFN, tax should be withheld at the normal rate for your declaration. Check your next payslip to make sure the change has happened. If your employer is still using the top rate, ask the payroll team to update your record. Changes in payroll are not made for past pays, so any extra tax already taken out is sorted out in your tax return instead.

## What if too much tax was taken out?

Sometimes the TFN is late and an employer withholds at the top rate for a few pays. This money is not lost. Tax withheld from your pay is a credit in your tax return. When you lodge, the ATO compares the tax withheld with the tax you actually owe for the year.

For example, say you earned $1,500 in your first month and $700 of it was withheld because your TFN was late. At the end of the year, all of that $700 is counted with the rest of the tax withheld across the year. If the total withheld is more than the tax you owe, the difference comes back to you, if any.

What you owe depends on your total income and your residency for tax purposes. A student in a course of 6 months or more may be an Australian resident for tax purposes, which can mean a tax-free threshold. A foreign resident has no tax-free threshold.

## Mistakes to avoid while you wait

- Writing the receipt ID in the TFN box on any form.
- Using a temporary address you will leave before the letter comes.
- Applying a second time because the letter is slow.
- Forgetting to give the TFN to your second job.
- Sharing your TFN on social media or with someone you have not checked.

## Your checklist

- Apply online for your TFN as soon as you arrive, with an address you will keep.
- Save your receipt ID.
- On each TFN declaration, say that you have applied.
- Count 28 days from your application, and watch your mailbox.
- When the TFN comes, give it to every employer and your super fund.
- If too much tax was withheld, it is counted in your tax return.

If your first months in Australia included pays taxed at the top rate, you can message Student Visa Tax on WhatsApp at tax time and we will check what was withheld.`,
    faq: [
      { q: 'Is the receipt ID the same as a TFN?', a: 'No. The receipt ID only identifies your application. Never write it in the TFN box on a form.' },
      { q: 'What if my TFN does not arrive within 28 days?', a: 'Contact the ATO with your receipt ID. Do not apply again, because the ATO says a second application can delay processing.' },
      { q: 'My employer took tax at the top rate. Do I lose that money?', a: 'No. Tax withheld is a credit in your tax return. If the total withheld is more than the tax you owe for the year, you get the difference back.' },
    ],
    sources: [
      { label: 'ATO: TFN application for foreign passport holders and temporary visitors', href: `${ATO}/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application` },
      { label: 'ATO: Tax file number and withholding declarations', href: `${ATO}/businesses-and-organisations/hiring-and-paying-your-workers/payg-withholding/payments-you-need-to-withhold-from/payments-to-employees/tax-file-number-and-withholding-declarations` },
      { label: 'ATO: Verify or report an ATO scam', href: `${ATO}/online-services/scams-cyber-safety-and-identity-protection/verify-or-report-an-ato-scam` },
    ],
  },
  {
    slug: 'tax-free-threshold-international-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Do international students get the tax-free threshold?',
    description: 'Some students can earn $18,200 a year tax free, others pay tax from the first dollar. How residency decides it, what a part year means, and a worked example for 2025-26.',
    answer: 'Only if you are an Australian resident for tax purposes. A student in a course of 6 months or more may be a resident and then gets the $18,200 tax-free threshold, or part of it for a part year. Foreign residents get no tax-free threshold.',
    body: `The tax-free threshold is one of the biggest numbers in an Australian tax return. For some international students it means no tax at all on their part-time job. For others it does not apply. The difference comes down to one question: are you an Australian resident for tax purposes? This guide explains how the threshold works for students, and what it is worth.

## What is the tax-free threshold?

The tax-free threshold is the part of your yearly income that is not taxed. For 2025-26, it is $18,200 for an Australian resident for tax purposes. If your taxable income is $18,200 or less for the whole year, you pay no income tax.

The threshold is part of the resident tax rates. It is not a separate benefit that you apply for. It is built into the rates that apply to residents.

The threshold is about your taxable income for the whole financial year, from 1 July to 30 June. It is not a weekly or monthly amount. A student who earns a lot in the summer break and very little during semester still adds the whole year together. Taxable income is your total income less any deductions you can claim.

## Who gets it?

Only Australian residents for tax purposes. Foreign residents do not get it at all.

For students, the ATO says an overseas student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. This is not automatic. It depends on your situation, for example where you live, how long you stay, and your ties to Australia. Your visa type does not decide your tax residency on its own.

## Resident and foreign resident rates for 2025-26

For 2025-26, the resident rates are:

- $0 to $18,200: nil
- $18,201 to $45,000: 16%
- $45,001 to $135,000: 30%
- $135,001 to $190,000: 37%
- Over $190,000: 45%

For a foreign resident in 2025-26, tax starts at 30% from the first dollar up to $135,000, then 37% up to $190,000, then 45%. There is no zero band.

## A worked example

Two students each earn $30,000 from a café job in 2025-26.

**Student A may be a resident for the whole year.** The first $18,200 is tax free. The rest, $11,800, is taxed at 16%, which is $1,888. A resident on this income also gets the low income tax offset. For taxable income up to $37,500 the offset is $700, so the income tax falls to $1,188. The offset can reduce your tax to zero, but it cannot create a refund on its own.

**Student B is a foreign resident.** There is no threshold, so all $30,000 is taxed at 30%. That is $9,000.

The Medicare levy is separate. Many students do not have Medicare and may claim an exemption with a Medicare Entitlement Statement from Services Australia.

## What if you were a resident for only part of the year?

Many students arrive or leave in the middle of a financial year, which runs from 1 July to 30 June. If you were a resident for only part of the year, you get a part-year tax-free threshold.

For 2025-26, the ATO says a part-year resident has a tax-free threshold of at least $13,464. The remaining $4,736 of the full threshold is shared out according to the number of months you were a resident. If you lodge with myTax, it works this out for you.

## How the threshold works with your employer

When you start a job, your TFN declaration asks whether you want to claim the tax-free threshold from this payer. If you answer yes, your employer takes out less tax from each pay.

Two things to know:

- **Claim it from one employer only.** The ATO says you generally claim it from one payer, usually the one who pays you the most. If you claim it from two jobs, too little tax is taken out and you may get a tax bill.
- **If you are a foreign resident, answer no.** Foreign residents do not get the threshold, so claiming it means too little tax is withheld.

If your situation changes during the year, you can give your employer a new withholding declaration. It applies from the next payment.

## Signs that the wrong answer was given

Look at your payslip. If you earn a steady amount and almost no tax is taken out, check your declaration. This is fine for a resident under the threshold with one job. It is a problem if you have two jobs claiming the threshold, or if you are a foreign resident.

The real tax is worked out when you lodge your tax return, not in payroll. Withholding is only an estimate during the year. If too much was taken out, you get the difference back, if any. If too little was taken out, you pay the difference.

## Checklist

- Work out whether you may be a resident for tax purposes. If you are unsure, ask before tax time.
- Claim the threshold from your main job only.
- If you are a foreign resident, answer no for every job.
- Note the dates you arrived in or left Australia, in case a part-year threshold applies.
- Keep your payslips so you can see how much tax was withheld.

Residency is the hardest part of a student tax return. If you are not sure where you stand, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Does a student visa mean I am a resident for tax purposes?', a: 'Not on its own. A student in a course of 6 months or more may be a resident, but it depends on your situation. Tax residency is a different question from your visa.' },
      { q: 'I arrived in February. Do I get the full $18,200?', a: 'If you may be a resident for only part of 2025-26, you get a part-year threshold. The ATO says it is at least $13,464, with the rest shared out by the months you were a resident.' },
      { q: 'Can I claim the threshold from two jobs?', a: 'You generally claim it from one employer only. Claiming it from two can mean too little tax is withheld and a tax bill when you lodge.' },
    ],
    sources: [
      { label: 'ATO: Part-year tax-free threshold 2026', href: `${ATO}/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/2026/adjustments/part-year-tax-free-threshold` },
      { label: 'ATO: Income from more than one job', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job` },
      { label: 'ATO: Tax file number and withholding declarations', href: `${ATO}/businesses-and-organisations/hiring-and-paying-your-workers/payg-withholding/payments-you-need-to-withhold-from/payments-to-employees/tax-file-number-and-withholding-declarations` },
    ],
  },
  {
    slug: 'white-card-construction-international-students',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'White card for international students: getting one and tax',
    description: 'Thinking of labouring or site work while you study? What the white card is, how to get it, whether it works in every state, and whether you can claim it on tax.',
    answer: 'You need a white card (general construction induction card) to do construction work in Australia. You get it by completing a short course with a registered training organisation. The ATO says the cost of your initial card is generally not deductible.',
    body: `Construction and labouring jobs can be a good option for students who want physical work and longer shifts in the holidays. Before you set foot on a building site, you need one thing: a white card. This guide explains what the card is, how students get one, and how the cost and your work gear are treated at tax time. For how many hours you can work, check your own visa conditions with the Department of Home Affairs.

## What is a white card?

A white card is the common name for the general construction induction card. It shows that you have completed basic safety training for construction sites. The training unit is called CPCCWHS1001, "Prepare to work safely in the construction industry".

It is a safety card, not a trade qualification. It does not make you a carpenter or an electrician. It only shows that you understand the basic risks on a site and your duties as a worker.

## Who needs one?

Service NSW says you need a white card if you are employed to do construction work, or if your job means you enter an operational construction zone. Typical jobs for students include labouring, site cleaning, moving materials, and helping trades workers.

You do not need one for most student jobs, such as hospitality, retail, cleaning offices or delivery work. If a job offer mentions a building site, ask whether you need a white card before your first shift.

## How do you get one?

You complete a construction induction course with a registered training organisation (RTO). The RTO sets its own course fee, so prices differ. You will need proof of identity and a way to pay.

In New South Wales, the RTO sends your application to SafeWork NSW and gives you a statement of training. You can use that statement for 60 days while you wait, and the card usually arrives within 30 days. Other states have their own process, so ask your RTO. Some RTOs offer online delivery, but check the format with the RTO and make sure the course is accepted in the state where you will work.

Keep your statement of training or statement of attainment. You may need it if you lose the card. SafeWork SA, for example, says it does not issue replacement cards and that you should contact the RTO that issued yours. Take a photo of the card and the statement as soon as you get them.

## Does it work in every state?

Service NSW says a white card is valid in any Australian state or territory. So if you get your card in Victoria and later find work in Sydney, you can use it there. It is still a good idea to check that your card is valid with the local safety regulator.

## Does it expire?

The card does not usually need to be renewed. But it can stop being valid if you are out of the industry for a long time. SafeWork SA says your card stays valid as long as you keep your competencies, which in practice means you have worked in construction within the last two years. Service NSW also lists a gap of more than two years in construction work as a reason you need a card again.

For most students this is not a problem during a degree. But if you do site work in your first year and not again until after graduation, check before you return to a site.

## Can you claim the white card on tax?

Generally not the first one. The ATO's guide for building and construction employees says you cannot claim the cost of getting your initial licence, regulatory permit, card or certificate to get a job. The idea is that this cost helps you get the job, rather than helping you earn income in a job you already have.

The ATO says you can claim costs to renew a licence, card or certificate while you still need it for your job. If your employer paid for the course, or paid you back, you cannot claim it either, because you did not bear the cost.

## What site costs can you claim?

Your work gear is often a bigger claim than the card. For an employee, the ATO's general rules are: you spent the money yourself and were not paid back, it relates directly to earning your income, and you have a record such as a receipt.

- **Protective clothing and footwear,** such as steel-capped boots, high-visibility clothing and gloves, can be deductible.
- **Tools and equipment** costing $300 or less can be claimed straight away, for the work-use part. Above $300, you claim the decline in value over the item's life.
- **Ordinary clothes** like jeans and a plain T-shirt are not deductible, even if you only wear them to work.

If you use an item for private purposes too, you can only claim the work part. Keep every receipt.

## Checklist before your first site job

- Ask the employer whether the job needs a white card.
- Choose an RTO and check the course is accepted where you will work.
- Keep your statement of training until the card arrives.
- Photograph the card and keep the statement of attainment safe.
- Keep receipts for boots, high-visibility clothing and tools.
- Write down whether your employer paid for anything.

At tax time, you can message Student Visa Tax on WhatsApp and we will check which of your site costs can go in your return.`,
    faq: [
      { q: 'Can I use a white card from another state?', a: 'Yes. Service NSW says a white card is valid in any Australian state or territory. Check it is valid with the local regulator if you are unsure.' },
      { q: 'Can I claim my white card course on tax?', a: 'Generally not your initial card. The ATO says you cannot claim the cost of getting an initial licence, card or certificate to get a job. Renewal costs while you need the card for your job can be claimed.' },
      { q: 'Are steel-capped boots deductible?', a: 'Protective footwear you need for your job can be deductible if you paid for it and were not paid back. Keep the receipt.' },
    ],
    sources: [
      { label: 'Service NSW: Apply for a general construction induction card (white card)', href: 'https://www.service.nsw.gov.au/transaction/apply-for-a-general-construction-induction-card-white-card' },
      { label: 'SafeWork SA: White card', href: 'https://safework.sa.gov.au/licence-and-registration/white-card' },
      { label: 'ATO: Building and construction employee expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/guides-for-occupations-and-industries/a-d/building-and-construction-employees-income-and-work-related-deductions/deductions-for-work-expenses/building-and-construction-employee-expenses-go` },
    ],
  },
  {
    slug: 'rsa-certificate-international-students',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'RSA certificate for international students: what to know',
    description: 'Want a bar, restaurant or bottle shop job while you study? Who needs an RSA, why state rules matter, and why the ATO says your first RSA is generally not deductible.',
    answer: 'You need a Responsible Service of Alcohol (RSA) certificate to serve or sell alcohol in Australia, and the rules are set by each state. The ATO says you cannot claim the cost of your initial RSA, but you can claim renewal costs while you work in the job.',
    body: `Hospitality is one of the most common job areas for international students. Cafés, restaurants, pubs and event venues often hire students for evening and weekend shifts. If the job involves alcohol, you will need an RSA certificate first. This guide explains who needs one, why the state matters, and how the cost is treated in your tax return. For any question about your work hours, check your own visa conditions with the Department of Home Affairs.

## What is an RSA?

RSA stands for Responsible Service of Alcohol. It is training about the law on serving alcohol, and about how to serve it safely. A course usually covers:

- how to see signs that a customer has had too much to drink
- how to refuse service in a calm and legal way
- your legal duties as a staff member, and the venue's duties
- the liquor rules in your state

Without a valid RSA, you generally cannot serve alcohol at a licensed venue. Most employers will ask to see your certificate before your first shift.

## Who needs one?

The group is wider than bartenders. If your job involves selling, serving or supplying alcohol, you will usually need an RSA. This often includes waiting staff in a licensed restaurant, bottle shop staff, and people working at events or functions where drinks are served.

Kitchen work and cleaning roles usually do not involve serving alcohol. Some venues still ask all staff to hold an RSA, because it means they can put you on any shift. Ask the venue what the role needs.

## Why the state you work in matters

RSA rules are set by each state and territory, not at a national level. Each state has its own liquor regulator, and the course, the certificate and how long it lasts can be different in each one.

This matters for students who move. If you study in one city and spend the summer break working in another state, your first certificate may not be accepted there. Before you book a course, check with the liquor regulator in the state where you will work, or ask your new employer what they accept.

How long an RSA lasts also depends on the state. Some states need a refresher course after a set number of years, and others do not. Your state's regulator will tell you the rule.

A simple plan helps. Do the course for the state where your first job is. If you know you will move to another state later, find out before you move whether you need a new course there. Then you can book it early, so it does not delay your first shift in the new city.

## Should you pay for it yourself?

Ask first. Some employers pay for the RSA course when they hire new staff, especially larger venues. If you are about to start a job, ask whether the venue will pay or pay you back before you book.

If the employer pays for your course or pays you back, you cannot claim the cost on tax. You can only claim an expense that you paid and were not paid back for.

## Can you claim the RSA on tax?

The ATO is clear about this in its guide for hospitality workers. You cannot claim the cost of getting your initial licence, regulatory permit, card or certificate to get a job, and the ATO gives the RSA certificate as an example. The cost helps you get the job, so it is not treated as a cost of earning income.

You can claim the extra costs of renewing your licence, permit, card or certificate while you are working in the job. So if your state needs a refresher and you are still working in hospitality when it is due, that renewal cost may be deductible. Keep the receipt.

## What about your study?

This question comes up often, because students already spend a lot on education. Some students ask whether they can claim their degree as self-education, because they work in a bar. The ATO says self-education is only deductible when it has a close enough connection to your current job. A university course that is not about your hospitality work, for example a degree in engineering, generally does not meet this test. The ATO also says self-education is not deductible if it helps you get a new job or change jobs. So your tuition fees usually stay out of your hospitality claims.

## Other hospitality costs to know about

- **Uniforms:** a compulsory uniform with the venue's logo can be deductible. Plain black pants and a white shirt are conventional clothing and are not deductible, even if the venue says you must wear them.
- **Laundry:** washing a deductible uniform can be claimed, at $1 a load for work clothes only, or 50 cents if mixed with other washing.
- **Tips:** tips are income and go in your tax return.

## Checklist before your first hospitality shift

- Ask the employer whether you need an RSA, and whether they pay for it.
- Check which course is accepted in the state where you will work.
- Save your certificate on your phone, because venues often ask on day one.
- Keep the receipt for any renewal you pay for yourself.
- Keep receipts for any logo uniform, and note how often you wash it.

When tax time comes, you can message Student Visa Tax on WhatsApp and we will check what you can and cannot claim from your hospitality job.`,
    faq: [
      { q: 'Can I claim my first RSA course on tax?', a: 'No. The ATO says you cannot claim the cost of getting your initial licence or certificate to get a job, and it gives the RSA as an example. You can claim renewal costs while you work in the job.' },
      { q: 'Does my RSA work in every state?', a: 'Not always. RSA rules are set by each state and territory. Check with the liquor regulator in the state where you plan to work.' },
      { q: 'Are tips taxed for students?', a: 'Yes. Tips are income and must go in your tax return, even if you are paid them in cash.' },
    ],
    sources: [
      { label: 'ATO: Hospitality industry expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/guides-for-occupations-and-industries/e-k/hospitality-industry-workers-income-and-work-related-deductions/deductions-for-work-expenses/hospitality-industry-expenses-go` },
      { label: 'ATO: Hospitality industry workers, deductions for work expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/guides-for-occupations-and-industries/e-k/hospitality-industry-workers-income-and-work-related-deductions/deductions-for-work-expenses` },
    ],
  },
  {
    slug: 'working-with-children-check-international-students',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Working with children check for international students',
    description: 'Tutoring, swim teaching, coaching or nannying while you study? Why you need a working with children check, how state rules differ, and when the ATO lets you claim it.',
    answer: 'You need a working with children check (WWCC) for most paid or volunteer jobs with children, and each state runs its own scheme. The ATO says you generally cannot claim your first check, but you can claim it if you need it to keep your current job or are renewing it.',
    body: `Many international students work with children. Tutoring, swim teaching, sports coaching, after-school care and nannying are common choices, because the hours often fit around classes. Before you start, you will usually need a working with children check. This guide explains what it is, how it works for students, and when the cost is tax deductible. For any question about how many hours you can work, check your own visa conditions with the Department of Home Affairs.

## What is a working with children check?

A working with children check is a screening done by a state or territory government. It looks at your records to decide whether it is safe for you to work with children. It is not the same as a police check from your home country.

In most states, your check keeps being monitored after it is issued. If new information appears, the check can be cancelled. This is one reason employers ask for a local check and not only an overseas police certificate.

## Which jobs need one?

In general, you need a check if your work involves regular contact with children, whether you are paid or a volunteer. Common examples for students are:

- tutoring school students, in person or at a tutoring centre
- swim teaching and sports coaching
- after-school care and holiday programs
- nannying and babysitting work
- volunteering at a youth group or community program

Some employers ask for a check even when the law may not require it for that role. The exact rules are set by each state, so check the rules where you will work.

## Each state has its own scheme

There is no single national check. Each state and territory runs its own scheme, with its own name, fee, process and validity period. A check from one state does not automatically work in another.

For a student, this matters if you study in one city and take a holiday job in another state. You may need a second application. Apply in the state where your job is, and allow time before your start date.

## How to apply

Each state has its own online application. In most states you start online and then confirm your identity in person, often by showing original identity documents at a service centre or post office. The check does not start until this step is done.

Some practical points for students:

- **Use an address you will keep.** Your card or letter may be posted to you. If you move often between share houses, choose a reliable address.
- **Make sure your names match.** Use the same name on every document, exactly as it appears on your passport.
- **Ask about starting work.** Some states let you start some work once you have applied, and others do not. Check with the state agency, not only the employer.

Paid work and volunteer work may have different fees. In many states, volunteer checks cost less or are free.

Keep a copy of your application receipt and the number on your card once it arrives. Many employers ask for the number, not the card itself, and they check it with the state agency. If you later change your name or your address, most states ask you to update your details.

## Can you claim the check on tax?

This is where many students make mistakes. The ATO has specific rules for working with children checks.

You **can** claim the cost if:

- you are an existing employee and need to obtain or renew the check to keep earning income in your current job, or
- you are a new employee and your recent income is from continuous work in a child-related field.

You **cannot** claim the cost of getting an initial working with children check as a new employee, unless you have recently been working in a child-related field. The ATO gives the example of someone who needed a check to return to child-related work after time in other jobs. That cost was not deductible.

For most students taking their first job with children, the first check is not deductible. A renewal, or a new check needed to keep your current tutoring job, may be. If your employer paid for the check or paid you back, you cannot claim it.

## Other costs for tutors and coaches

If you tutor or coach as an employee, other work costs may be deductible if they relate directly to your job, you paid for them yourself, and you have a receipt. Examples can include teaching materials you buy for your students. If you tutor as a sole trader with an ABN, different rules apply, because no tax is taken out of ABN income and you claim business expenses in your return.

## Checklist before you start

- Find out whether your job needs a check, and which state it is in.
- Apply early, using an address you will keep.
- Confirm your identity in person if your state requires it.
- Ask the state agency whether you can start before the check is issued.
- Keep the receipt, and note whether this is your first check or a renewal.
- Note whether your employer paid for it.

If you work with children and also have other jobs, you can message Student Visa Tax on WhatsApp at tax time and we will check what belongs in your return.`,
    faq: [
      { q: 'Does my working with children check work in another state?', a: 'Not automatically. Each state and territory runs its own scheme, so a new job in another state may need a new application.' },
      { q: 'Can I claim my first working with children check?', a: 'Generally not, if you are a new employee who has not recently worked in a child-related field. You can claim it if you need it to keep your current job or to renew it.' },
      { q: 'Can a student on a visa get a check?', a: 'Each state sets its own rules for who can apply. In general you need identity documents and an Australian address. Check with the agency in your state.' },
    ],
    sources: [
      { label: 'ATO: When you can claim a working with children check', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/memberships-accreditations-fees-and-commissions/working-with-children-check` },
      { label: 'ATO: Professional memberships and accreditations', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/memberships-accreditations-fees-and-commissions/professional-memberships-and-accreditations` },
    ],
  },
  {
    slug: 'public-holiday-pay-international-students',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Public holiday pay for international students in Australia',
    description: 'Working on Christmas Day or Anzac Day? Which public holidays apply, when casuals get paid, when you can say no to a shift, and how public holiday pay is taxed.',
    answer: 'If you work on a public holiday, you may be entitled to penalty rates set by your award or agreement. Casuals do not get paid for a public holiday they do not work, and you can refuse a request to work if you have reasonable grounds.',
    body: `Public holidays are some of the busiest days for cafés, restaurants, shops and hotels. Many international students stay in Australia over the break and pick up extra shifts. This guide explains which days are public holidays, how pay works on those days, and how the extra money fits into your tax return. For questions about how many hours your visa lets you work, check your own visa conditions with the Department of Home Affairs.

## Which days are public holidays?

The National Employment Standards list these public holidays across Australia:

- 1 January (New Year's Day)
- 26 January (Australia Day)
- Good Friday and Easter Monday
- 25 April (Anzac Day)
- The King's Birthday holiday
- 25 December (Christmas Day) and 26 December (Boxing Day)

Each state and territory can also declare other public holidays, or part days. This means the calendar is different in each state. Check the public holiday list for the state where you work, not the state where you study or live.

## What if a holiday falls on a weekend?

Sometimes a state law moves a public holiday to another day. For example, when Christmas Day falls on a weekend, an extra public holiday may be declared on the following Monday. Your award or agreement may also allow you and your employer to agree to swap a public holiday for another day.

This matters for pay. The holiday rules follow the day that is treated as the public holiday.

## What are you paid if you work?

Fair Work says employees may be entitled to penalty rates for working on public holidays. Penalty rates are higher pay rates for certain hours or days. The exact rate depends on your award or registered agreement, so it is different in each industry.

To find your rate, use the Fair Work Pay Calculator or the Pay and Conditions Tool. Your payslip should show the public holiday hours and the rate for those hours. If your payslip shows the same rate as a normal day, check your award.

## What if you do not work?

This depends on your type of employment.

- **Full-time and part-time employees** who would normally work on that day are paid their base rate for their ordinary hours, even though they do not work. Your employer cannot change your roster just to avoid this payment.
- **Part-time employees** who do not normally work on that day of the week are not paid for the holiday.
- **Casual employees** do not get a paid day off. Fair Work says a casual gets an unpaid day off if they would normally have worked that day.

Most students are casuals. So if you do not work on a public holiday, you are generally not paid for it. The casual loading on your hourly rate is part of the reason for this. Fair Work says the casual loading is generally an extra 25% of the minimum hourly rate.

Awards, enterprise agreements and other registered agreements can set different rules. If you are covered by an agreement at a large employer, read the public holiday part of it, or ask your manager where to find it.

## Can your employer make you work?

An employer can ask you to work on a public holiday. You can refuse if the request is not reasonable, or if you have reasonable grounds to refuse. Fair Work lists factors that decide what is reasonable, including:

- the type of workplace and its needs
- your personal circumstances, including family and caring duties
- your type of employment, for example casual or full-time
- whether you could reasonably expect to be asked to work
- whether you get extra pay, such as penalty rates
- how much notice was given

An employer can only require you to work if the request was reasonable and your refusal was not.

## How is public holiday pay taxed?

Public holiday pay is ordinary employment income. It is not a special type of income, and there is no special tax rate for it.

Because you earn more in that pay, your employer may take out more tax for that pay period. This is normal. Withholding is an estimate for each pay. Your real tax is worked out once a year, in your tax return, based on your total income and your residency for tax purposes. A student in a course of 6 months or more may be an Australian resident for tax purposes, which can give access to the $18,200 tax-free threshold.

If the tax withheld across the year is more than the tax you owe, you get the difference back, if any.

## Super on public holiday pay

Super is generally paid on your ordinary time earnings. Whether a particular penalty rate counts as ordinary time earnings can depend on the payment. Your payslip should show the super paid for each pay, and you can check your fund to see that it arrived.

## Checklist for the holiday season

- Check the public holidays for the state where you work.
- Find your public holiday rate in the Fair Work Pay Calculator.
- Screenshot your roster, in case it changes.
- Check your payslip shows the holiday hours at their own rate.
- Keep every payslip for your tax return.

If you worked extra shifts over the holidays, you can message Student Visa Tax on WhatsApp at tax time and we will put the full year together.`,
    faq: [
      { q: 'Do casual students get paid for a public holiday they do not work?', a: 'No. Fair Work says casuals get an unpaid day off if they would normally have worked that day.' },
      { q: 'Is public holiday pay taxed at a higher rate?', a: 'No. It is normal income. More tax may be withheld from a bigger pay, but your real tax is worked out in your yearly tax return.' },
      { q: 'Can I say no to a public holiday shift?', a: 'Yes, if the request is not reasonable or you have reasonable grounds. Fair Work lists factors such as your personal circumstances and the notice you were given.' },
    ],
    sources: [
      { label: 'Fair Work: Public holidays fact sheet', href: 'https://www.fairwork.gov.au/tools-and-resources/fact-sheets/minimum-workplace-entitlements/public-holidays' },
      { label: 'Fair Work: Not working on public holidays', href: 'https://www.fairwork.gov.au/employment-conditions/public-holidays/not-working-on-public-holidays' },
      { label: 'Fair Work: Your guide to casual employment', href: 'https://www.fairwork.gov.au/sites/default/files/2025-03/fg-your-guide-to-casual-employment.pdf' },
    ],
  },
  {
    slug: 'shift-cancelled-casual-international-students',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Shift cancelled or sent home early? Casual students\' pay rights',
    description: 'Arrived for a shift and were told to go home? Many awards set a minimum number of paid hours for casuals. What students are owed, and what records to keep.',
    answer: 'Often you are still owed some pay. Many awards and enterprise agreements set a minimum engagement, which is a minimum number of paid hours for a casual shift, even if you are sent home early. The exact number depends on your award.',
    body: `Most international students who work are casual employees. Casual work is flexible, which helps when you have classes and exams. But it also means your shifts can change at short notice. A common problem is arriving for a shift and being told it is quiet, so you can go home. This guide explains when you are still paid, and what to keep as proof. For any question about the hours your visa allows, check your own visa conditions with the Department of Home Affairs.

## What is a minimum engagement?

A minimum engagement is the smallest number of hours you must be paid for once you start a shift. Many awards and enterprise agreements include one for casual employees.

The idea is simple. When you come to work, you have already spent time and money on travel, and you may have said no to other work. The minimum engagement means the employer cannot send you home after a short time and pay only for that time.

## A Fair Work example

Fair Work's guide to casual employment gives an example. A casual employee covered by the Clerks Award is rostered for 5 hours but sent home after 1 hour. Because the minimum engagement under that award is 3 hours, the employee must be paid for 3 hours, not 1.

The minimum is different under different awards and agreements. There is no single minimum for every job in Australia. To find yours, use the Fair Work Pay and Conditions Tool, or read the award that covers your job.

## What if the shift is cancelled before it starts?

This is less clear. A minimum engagement usually applies once your shift has started. If the employer cancels before you start, for example by text the night before, the minimum engagement may not apply.

Some awards and agreements have other rules about rosters, such as notice before a roster change. Check the award or agreement that covers your workplace. If your shifts are often cancelled at short notice, write down each time it happens.

## Being sent home part way through

If you are sent home early, the minimum engagement counts from the start of your shift. If your award sets 3 hours and you are sent home after 1, you are generally owed the 3 hours. Quiet trade is the business's risk, not yours.

Write down the time you arrived and the time you left, because your own notes are useful if the payslip is wrong. Remember that hours you do work must be paid. Fair Work says an unpaid trial is only lawful for a short demonstration of your skills under direct supervision. After that, you must be paid at least the minimum rate.

## What casual work does and does not include

Fair Work says casual employment has some trade-offs:

- **Casual loading:** generally an extra 25% of the minimum hourly rate, to make up for the things casuals do not get.
- **No paid annual leave and no paid sick leave.** If you are sick and miss a shift, it is not paid.
- **No guarantee of ongoing work.** Your hours can go up and down.
- **Some leave still applies,** such as 2 days of unpaid carer's leave each time it is needed.

Check that your hourly rate includes the casual loading. If your payslip shows a rate with no loading and you are a casual, you may be underpaid.

Fair Work also describes an "employee choice pathway". Eligible casuals who have worked for at least 6 months, or 12 months for a small business, can tell their employer in writing that they want to change to permanent work, if they believe they no longer meet the definition of a casual. The employer can only refuse for certain reasons. This is an employment rule. It does not change any visa condition.

## What records should you keep?

Most pay problems are about what happened, not about the law. Good records solve this. Keep them in one place, such as a folder on your phone, so you can find them quickly if you need to ask about your pay.

- Take a screenshot of your roster when it is published. Rostering apps often change or delete old rosters.
- Keep the message or note of any cancellation, with the date and time.
- Write down when you arrived and when you were sent home.
- Check your payslip against your notes. Your payslip must arrive within one working day of payday and show your hours and rate.

If you cannot sort it out with your employer, you can contact the Fair Work Ombudsman on 13 13 94. Fair Work says your visa will not be cancelled for contacting them for help.

## What this means for your tax

Any minimum engagement pay you receive is ordinary wages. It goes into your tax return with your other income from that job, and it should also appear on your income statement. If you were underpaid and later receive back pay, that is income too.

## Checklist

- Find the award or agreement that covers your job.
- Look up its minimum engagement for casuals.
- Screenshot every roster and every cancellation message.
- Write down your start and finish times.
- Check that your rate includes the casual loading.
- Keep all payslips for tax time.

At tax time, you can message Student Visa Tax on WhatsApp and we will put all your jobs into one return.`,
    faq: [
      { q: 'How many hours must I be paid if I am sent home early?', a: 'It depends on the minimum engagement in your award or agreement. In a Fair Work example under the Clerks Award, a casual sent home after 1 hour was owed 3 hours.' },
      { q: 'My shift was cancelled the night before. Am I paid?', a: 'Usually the minimum engagement applies once a shift has started. Some awards have other roster rules, so check the award that covers your job.' },
      { q: 'Do casuals get paid sick leave?', a: 'No. Fair Work says casuals do not get paid sick or annual leave. The casual loading, generally 25%, is part of the reason.' },
    ],
    sources: [
      { label: 'Fair Work: Your guide to casual employment', href: 'https://www.fairwork.gov.au/sites/default/files/2025-03/fg-your-guide-to-casual-employment.pdf' },
      { label: 'Fair Work: Public holidays fact sheet', href: 'https://www.fairwork.gov.au/tools-and-resources/fact-sheets/minimum-workplace-entitlements/public-holidays' },
    ],
  },
  {
    slug: 'bank-account-and-tax-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Your Australian bank account and tax as an international student',
    description: 'Your bank account receives your wages, your tax refund and your super. Why to give the bank your TFN, how interest is taxed, and when to close the account.',
    answer: 'Give your bank your TFN, or it will withhold tax from your interest at the highest marginal rate. Keep the account open after you leave Australia until your tax refund, if any, has been paid, because the ATO pays refunds into an Australian account.',
    body: `An Australian bank account is one of the first things most students set up. You need it for your wages, and later for any tax refund and your super. Few students think about how the account connects to tax. This guide explains the tax side of your bank account, from the day you open it to the day you close it.

## Why your bank account matters for tax

Your bank account is where three important payments arrive:

- your wages from each job
- any tax refund from the ATO after you lodge your return
- your super, if you claim it when you leave Australia

Employers pay wages into an Australian account. The ATO says you should have an Australian bank account for your refund, even if you lodge from outside Australia. So your account is part of your tax plan, not just your daily spending.

Make sure the name on your bank account matches the name on your passport and your TFN record. When the details in your tax return match your bank details, the refund, if any, can be paid without delay. If you change banks during your course, update your details before you lodge.

## Should you give the bank your TFN?

Yes, in most cases. You can open and use an account without a TFN. But if you do not give your bank your TFN, the ATO says the bank will withhold tax from your interest at the highest marginal tax rate.

On an everyday account with little interest, this may be a small amount. On a savings account, it can add up. Any amount withheld is not lost. You can claim it as a credit when you lodge your tax return. But it is easier to give the bank your TFN when your letter arrives.

## How is bank interest taxed?

The ATO says interest from a bank is part of your assessable income for the year. If you may be an Australian resident for tax purposes, you include your Australian interest in your tax return, together with your wages.

Many students keep savings in Australia for tuition and rent. Interest on those savings counts, even if the money came from your family overseas. The money you bring into Australia is not income. Only the interest it earns here is.

## What if you are a foreign resident for tax purposes?

The rules are different. The ATO says banks automatically withhold tax from interest on accounts held by foreign residents. If you have given the bank your overseas address, the withholding rate is 10%. This interest is not included in your Australian tax return.

So it is important that your bank has the right details for you. If your residency for tax purposes changes, for example when you leave Australia permanently, tell your bank.

## A worked example

Mai is a student who may be an Australian resident for tax purposes. Her savings account earns $300 of interest in 2025-26.

- If she gave the bank her TFN, no tax is withheld from the interest. She includes the $300 in her tax return with her wages.
- If she did not give the bank her TFN, the bank withholds tax at the highest marginal rate from the $300. She still includes the $300 in her return, and the amount withheld is a credit.

Either way, the $300 is income. The TFN only changes how much is held back during the year.

## Protect your account from scams

New arrivals are often targeted by scams, because they do not yet know what normal contact from the ATO looks like. The ATO says it will never:

- send an unsolicited text message that contains a link
- send unsolicited emails with links or QR codes
- threaten you with arrest, or demand that you stay on the phone
- ask for payment by gift cards, crypto, cash delivery, or personal or offshore accounts

If you are unsure whether a message is real, do not reply. Check your tax through myGov, or call the ATO on 1800 008 540. Never give your bank login or TFN to someone who contacts you first.

## When should you close the account?

Not on your last day in Australia. If you worked, you will probably need to lodge a tax return after 30 June, and you can do this from overseas. The ATO pays refunds into an Australian bank account. If you close the account before the refund arrives, getting paid becomes slow and difficult.

A simple order for leaving Australia:

- Ask each employer for your final pay details, and keep your last payslips.
- Lodge your tax return once your income statements are "Tax ready".
- Keep the account open until any refund has arrived.
- Apply for your super (DASP) once your visa has ended and you have left.
- Move your money home, then close the account last.

## Checklist

- Give your bank your TFN when you receive it.
- Keep your address and residency details up to date with the bank.
- Include your interest in your tax return if you may be a resident.
- Never click links in unexpected messages that claim to be from the ATO.
- Keep your account open until your refund, if any, has been paid.

If you are leaving Australia and want your last tax return done properly, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Do I need a TFN to open a bank account?', a: 'No. But if the bank does not have your TFN, it withholds tax from your interest at the highest marginal rate. You can claim that back as a credit in your return.' },
      { q: 'Is money my family sends me taxable?', a: 'Money you bring into Australia is not income. Interest it earns in an Australian account is income and may need to go in your tax return.' },
      { q: 'Can I close my account before I leave?', a: 'It is better to wait. The ATO pays refunds into an Australian bank account, so keep it open until any refund has arrived.' },
    ],
    sources: [
      { label: 'ATO: Investing in bank accounts and income bonds', href: `${ATO}/individuals-and-families/investments-and-assets/investing-in-bank-accounts-and-income-bonds` },
      { label: 'ATO: Verify or report an ATO scam', href: `${ATO}/online-services/scams-cyber-safety-and-identity-protection/verify-or-report-an-ato-scam` },
    ],
  },
  {
    slug: 'tourist-refund-scheme-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Tourist Refund Scheme for international students leaving Australia',
    description: 'Finished your course and flying home? How to get the GST back on a laptop or phone at the airport, the $300 and 60-day rules, and what to bring to the TRS desk.',
    answer: 'When you leave Australia, the Tourist Refund Scheme (TRS) can refund the GST on goods you take with you. You need to spend $300 or more (including GST) with one business within 60 days before you leave, and show the goods and original tax invoices at the airport.',
    body: `Many students buy a new laptop, phone or camera near the end of their course, before they fly home. If you plan it well, you can get the GST back on those purchases at the airport. This is the Tourist Refund Scheme, or TRS. It is not part of your tax return, and it is separate from your super claim. This guide explains the rules for students.

## What is the Tourist Refund Scheme?

GST is a tax of 10% on most goods and services sold in Australia. The TRS lets travellers claim back the GST, and the wine equalisation tax on wine, for goods they buy in Australia and take out of the country with them.

You make the claim at a TRS facility at an international airport or a cruise terminal when you leave. Students leaving after their course can use it like any other traveller. The ATO says crew members of an aircraft or ship cannot claim.

## Which purchases qualify?

All of these must be true:

- **One business, $300 or more.** The total from one business, using the same ABN, must be $300 or more including GST. You can combine several invoices from the same business, but you cannot combine purchases from different shops.
- **Within 60 days.** You bought the goods in the 60 days before you leave Australia.
- **You paid for them yourself,** and you are the person travelling. You cannot claim for someone else.
- **You take the goods with you,** as cabin baggage or worn. There are exceptions for oversized items or items the airline requires in the hold.
- **Original tax invoice,** in English.

Some things never qualify, even if the other rules are met:

- services, such as accommodation and tours
- GST-free goods
- alcohol other than wine, and tobacco
- goods you have used or partly used in Australia, such as food or cosmetics you have opened
- goods you post home or send separately

## What must the invoice show?

Keep the original tax invoice from the shop. It must show the seller's name and ABN, the date, a description and price of the items, and the GST amount. If your receipt is electronic, print a copy before you go to the airport.

For an invoice of $1,000 or more, your full name must be on the invoice, and it must match the passport you use when you claim. Ask the shop to add your name at the time you buy. This is easy to forget with a large laptop purchase.

Keep all your invoices together in one envelope in your cabin bag. Students often pack receipts in a suitcase that goes into the hold, and then cannot show them at the desk. Without the original invoice, the claim cannot be made.

## A worked example

You buy a laptop for $1,650 and a mouse for $55 from the same electronics store, on two invoices, 20 days before your flight. Together that is $1,705 from one business, so it meets the $300 rule.

GST is 10% of the price before GST. So the GST inside a price that includes GST is one eleventh of the total. On $1,705, that is $155. This is the amount the TRS can refund, if all the other rules are met. Because the laptop invoice is over $1,000, it must show your full name.

## How to claim at the airport

You need four things: your passport, your boarding pass, the original tax invoices, and the goods themselves.

The TRS app can create a QR code with your details, which can save time at the desk. It does not lodge your claim on its own. You still need to go to the TRS facility with your invoices and goods.

You cannot make a claim 30 minutes or less before your flight's departure time. Arrive at least 90 minutes before departure to allow time for the queue, especially in busy periods. For a ship, claims close 60 minutes before departure.

## How is the refund paid?

At the desk you choose how to receive the refund: to a credit or charge card, or to an Australian bank account. The payment is processed within 60 days of your claim.

If you plan to close your Australian bank account soon after you leave, a card is usually the safer choice. And if you are still waiting for a tax refund from the ATO, keep your Australian account open until it has arrived.

## How the TRS fits with your other departure tasks

The TRS is the only part of leaving Australia that you must do before you fly. Your tax return can be lodged from overseas after 30 June. Your super (DASP) can be claimed after your visa has ended and you have left.

- Before you fly: claim the TRS, ask employers for final pay details, update your bank's address details.
- After you leave: lodge your tax return, then claim your super.

## Checklist for your last 60 days

- Plan big purchases for the last 60 days before your flight.
- Buy from one business to reach $300.
- Ask for your name on any invoice of $1,000 or more.
- Keep original invoices and print electronic ones.
- Pack the goods in your cabin bag.
- Arrive at least 90 minutes before your flight.

For your final tax return after you leave Australia, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Can international students use the Tourist Refund Scheme?', a: 'Yes. Students leaving Australia can claim like other travellers, if the goods and invoices meet the rules. Crew members of an aircraft or ship cannot claim.' },
      { q: 'Can I combine receipts from different shops to reach $300?', a: 'No. The $300 must be spent with one business using the same ABN. You can combine several invoices from that one business.' },
      { q: 'Is the TRS part of my tax return?', a: 'No. The TRS is claimed at the airport when you leave. Your tax return and your super claim are separate and can be done after you leave.' },
    ],
    sources: [
      { label: 'ATO: Tourist refund scheme', href: `${ATO}/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/in-detail/rules-for-specific-transactions/international-transactions/gst-free-sales-to-travellers-departing-australia/tourist-refund-scheme` },
      { label: 'Australian Embassy China: Tourist Refund Scheme', href: 'https://china.embassy.gov.au/bjng/Tourist%20refund%20scheme.html' },
      { label: 'ATO: Goods and services tax (GST)', href: `${ATO}/businesses-and-organisations/preparing-lodging-and-paying/business-activity-statements-bas/goods-and-services-tax-gst` },
    ],
  },
]
