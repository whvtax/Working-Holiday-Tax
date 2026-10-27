import type { LongArticle } from '../types'

const ATO = 'https://www.ato.gov.au'

export const LONG_EN_02: readonly LongArticle[] = [
  {
    slug: 'what-is-a-tax-agent-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'What a tax agent does for international students in Australia',
    description: 'A registered tax agent can prepare and lodge your return, often with a later due date. What they do for students, how to check one, and what stays your job.',
    answer: 'A tax agent is a person or business registered with the Tax Practitioners Board to prepare and lodge tax returns for a fee. For an international student, an agent can help with residency, the Medicare levy exemption and income from several jobs, and may give you a later due date than 31 October.',
    body: `Many international students lodge their first Australian tax return in their first or second year of study. The system is new, the forms use new words, and the answers depend on your visa, your course and your work. A tax agent is one way to get help. This guide explains what an agent is, what they do, and what you still need to do yourself.

## What is a tax agent?

In Australia, a tax agent is someone registered with the Tax Practitioners Board (TPB). The ATO says registered tax agents are the only people who can charge a fee to prepare and lodge your tax return. A friend can explain how myTax works, but a person who takes money for doing your return must be registered.

You can check any agent on the TPB public register. It is free and takes a minute. Search by name or registration number and check that the registration is current.

## What does an agent actually do for a student?

Pressing "lodge" is the easy part. The real work is getting the answers right before the return goes in. For a student, that usually means:

- **Residency.** A student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. The answer depends on your own facts, and it changes your tax rates and whether you get the tax-free threshold.
- **Medicare levy.** Many students are not entitled to Medicare because they have Overseas Student Health Cover (OSHC). They may be able to claim the Medicare levy exemption, but only with a Medicare Entitlement Statement from Services Australia.
- **Several employers.** Casual students often have two or three jobs in a year. An agent can see the income statements your employers reported to the ATO and check that none is missing.
- **Deductions.** Only some work expenses can be claimed. An agent checks what you spent against the ATO rules and your records.
- **ABN work.** Delivery or freelance work on an ABN has no tax taken out. It goes on the return with any business expenses.

## Does a tax agent give you more time to lodge?

Often, yes. Most registered agents have a lodgment program with the ATO. This can let them lodge your return after the usual 31 October date. The ATO says your exact due date depends on your situation and when you engage the agent.

The key step is timing. If you are new to an agent, contact them **before 31 October** so they can add you to their list. There is one important exception: if you had earlier years still not lodged at 30 June, your return is generally due by 31 October, even with an agent.

## What stays your responsibility?

Using an agent does not hand over everything. The ATO says you are responsible for the tax records you give your agent. If you forget to mention a cash job or a second employer, the return will be wrong, and it is still your return.

Your job is to:

- Tell the agent about every job, including cash work and ABN work.
- Give correct visa and course dates, because residency depends on them.
- Keep receipts for anything you want to claim.
- Read the return before you approve it, and ask about anything you do not understand.

## How do you spot someone who is not a real agent?

International students are often contacted in social media groups and chat apps by people offering "cheap tax refunds". Some are not registered. Some ask for things a real agent never needs.

Warning signs:

- They cannot give you a registration number you can check on the TPB register.
- They ask for your myGov password. A registered agent uses their own secure ATO access and does not need it.
- They promise a refund amount before they have seen your income.
- They want the refund paid into their bank account, not yours.

Never send your TFN, passport or visa details to someone you have not checked.

## Can you claim the agent fee as a deduction?

Yes. The ATO lists the fee paid to a registered tax agent for lodging your return as a cost of managing your tax affairs. You generally claim it in the income year you pay it, not the year the return is about.

For example, if you pay an agent in August 2026 for your 2025-26 return, the fee goes on your 2026-27 return. If you leave Australia and have no Australian income the next year, there may be no return to claim it on.

## Do you need an agent at all?

Not always. A student with one employer all year, a clear residency position and no deductions may find myTax simple enough. The ATO also runs Tax Help, a free service for people with simple affairs and income around $70,000 or less. It does not help with ABN work.

An agent is more useful when your year has more moving parts: several jobs, ABN income, a change of visa, a Medicare question, years that were never lodged, or a return you need to lodge after you have left Australia.

## A short checklist before you choose

- Check the agent on the TPB public register.
- Ask what the fee is and what it covers, before you start.
- Make sure any refund will go into your own bank account.
- Contact them before 31 October if you want a later due date.
- Gather your passport, visa grant, CoE dates, TFN and bank details.

Student Visa Tax operates under the supervision of a registered tax agent. Every return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. If you would like help with yours, you can message us on WhatsApp.`,
    faq: [
      { q: 'Is a tax agent the same as an accountant?', a: 'Not always. Some accountants are registered tax agents and some are not. What matters for your tax return is registration with the Tax Practitioners Board, which you can check on its public register.' },
      { q: 'Does my agent need my myGov password?', a: 'No. A registered agent reaches your ATO records through their own secure access. Anyone who asks for your myGov password is a warning sign.' },
      { q: 'Can I use a tax agent after I leave Australia?', a: 'Yes. The ATO says you can lodge from outside Australia online, through a registered tax agent, or on paper. Keep an Australian bank account open for any refund.' },
    ],
    sources: [
      { label: 'ATO: Lodge with a registered tax agent', href: `${ATO}/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-with-a-registered-tax-agent` },
      { label: 'ATO: Cost of managing tax affairs', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/cost-of-managing-tax-affairs` },
      { label: 'ATO: Due dates for tax returns, individuals and trusts', href: `${ATO}/tax-and-super-professionals/for-tax-professionals/prepare-and-lodge/registered-agent-lodgment-program-2025-26/due-dates-for-tax-returns-by-client-type/individuals-and-trusts` },
      { label: 'ATO: Tax Help program', href: `${ATO}/individuals-and-families/your-tax-return/help-and-support-to-lodge-your-tax-return/tax-help-program` },
    ],
  },
  {
    slug: 'how-does-payg-withholding-work-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'PAYG withholding on a student visa: why tax comes out of your pay',
    description: 'Your employer takes tax from each pay and sends it to the ATO. How students can check the amount, what decides it, and how it is settled when you lodge.',
    answer: 'PAYG withholding means your employer takes tax out of each pay and sends it to the ATO for you. The amount depends on your TFN declaration, and at the end of the financial year your tax return compares what was withheld with the tax you really owe.',
    body: `When you start a part-time or casual job in Australia, your payslip shows a line for tax. That money did not disappear. It was sent to the ATO in your name. This system is called PAYG withholding, which stands for "pay as you go". This guide explains how it works for international students and how to check it.

## What is PAYG withholding?

The ATO says that when your employer pays your wage, they take out tax and send it to the ATO. You do not pay that tax yourself during the year. Your employer does it for you, every pay.

At the end of the financial year (1 July to 30 June), your employer reports your total pay and total tax withheld to the ATO. This becomes your income statement. When you lodge your tax return, the tax withheld is counted against the tax you actually owe for the year.

## What decides how much tax is taken out?

Mostly your **tax file number (TFN) declaration**. You fill it in when you start each job. Your employer uses your answers and the ATO tax tables to work out the tax on each pay.

Two questions matter most:

- **Are you an Australian resident for tax purposes?** A student enrolled in a course of 6 months or more may be a resident. A foreign resident is taxed from the first dollar.
- **Do you want to claim the tax-free threshold from this payer?** Only residents can claim it, and generally from one employer only, usually the one that pays you the most.

If you have not given your employer your TFN within 28 days of starting, they must take out tax at the top rate plus the Medicare levy. That is much more than most students owe.

## Common mistakes students make on the form

- **Claiming the tax-free threshold at two jobs.** Each employer then takes out too little tax, and you may get a tax bill when you lodge.
- **Saying yes to residency without checking.** Residency depends on your own facts. If you are unsure, ask before you sign.
- **Forgetting to give the TFN.** Tax is then withheld at the top rate until it is fixed.
- **Not updating after a change.** If your main job changes, give both employers new declarations.

## How do you check the tax on your payslip?

Your payslip must show your gross pay (before tax), each deduction, and your net pay (what reaches your bank). Fair Work says it must also show the super your employer pays for you.

A simple check: divide the tax withheld by the gross pay. If you are a resident claiming the tax-free threshold at a small casual job, the tax may be very low or even zero for some pays. If the tax is close to half of your pay, your TFN may not have reached payroll. Ask your employer straight away.

Remember that super is paid by your employer on top of your wage. It should not reduce your net pay.

## Why do some students get money back?

Each pay is taxed on its own. Your employer does not know how much you will earn in the whole year, or whether you will stop working for a semester. When you lodge, the ATO looks at your real total for the year.

**Worked example (2025-26).** A student who may be a resident earns $20,000 from one casual job in 2025-26, and claims the tax-free threshold. The income tax on that is 16% of the amount over $18,200, so 16% of $1,800 = $288. The low income tax offset of $700 then reduces that to nil, because the offset is non-refundable and cannot go below zero. If the employer withheld $900 during the year, the tax return compares $900 withheld with nil owed. This example assumes no Medicare levy applies, for example because the student has a Medicare levy exemption.

A foreign resident earning the same $20,000 pays 30% from the first dollar: $6,000. If the employer withheld less than that, there is a bill to pay.

So the result of your return depends on your residency, your total income and what was withheld. There may be a refund, nothing, or an amount to pay.

## What about work with no tax taken out?

Some work has no PAYG withholding at all:

- **Cash in hand work.** If an employer does not withhold, the income is still taxable and goes on your return.
- **ABN work**, such as food delivery or freelance jobs. No tax is withheld, so the tax is worked out when you lodge.

If you have this kind of income, it is wise to put some money aside during the year. A simple habit is to move a part of every cash or ABN payment into a separate savings account, so the money is there when your return is assessed.

## What if you have two jobs at the same time?

Many students work at two places, for example a restaurant on weekends and a shop during the week. Each employer only sees its own payroll. If you claim the tax-free threshold from both, each one withholds as if it were your only job, and too little tax is taken out in total. The ATO says this can lead to a tax bill when you lodge. Claim the threshold from your main job only, and answer no on the form for the other one.

## What should you do next?

- Check that every employer has your TFN.
- Claim the tax-free threshold from one employer only, and only if you may be a resident.
- Look at the tax line on your first few payslips.
- Keep your payslips until your income statements say "Tax ready", usually after mid-July.
- Lodge your return each year, even if you think you owe nothing.

If you want someone to check your withholding against your real position, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Is PAYG withholding the same as my final tax?', a: 'No. It is a payment towards your tax during the year. Your tax return works out the real amount and compares it with what was withheld.' },
      { q: 'Can I ask my employer to take out more tax?', a: 'Yes. If you think too little is being withheld, for example because you have two jobs, you can ask an employer to withhold more.' },
      { q: 'I am a foreign resident for tax. Do I claim the tax-free threshold?', a: 'No. Foreign residents do not get the tax-free threshold, so the answer on every TFN declaration is no.' },
    ],
    sources: [
      { label: 'ATO: Tax for employees', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/tax-for-employees` },
      { label: 'ATO: Income from more than one job', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job` },
      { label: 'ATO: Low income tax offset', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/tax-offsets/low-income-tax-offset` },
      { label: 'Fair Work: Pay slips', href: 'https://www.fairwork.gov.au/pay-and-wages/paying-wages/pay-slips' },
    ],
  },
  {
    slug: 'australian-financial-year-dates-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'The Australian financial year for international students',
    description: 'The Australian tax year runs 1 July to 30 June, not with the semester or the calendar year. What that means for students who arrive, work and leave mid-year.',
    answer: 'The Australian financial year runs from 1 July to 30 June. Each financial year is a separate tax return, so a student who works across 30 June will usually lodge two returns, one for each year.',
    body: `Your course runs by semester, your visa has its own dates, and your home country may use the calendar year for tax. Australia uses none of these. The ATO says your tax return covers the income year from 1 July to 30 June. This guide explains how that date affects international students.

## What are the dates?

- The 2025-26 financial year ran from 1 July 2025 to 30 June 2026.
- The 2026-27 financial year runs from 1 July 2026 to 30 June 2027.

Each year gets its own tax return. Your income, the tax withheld and any deductions are all counted for that year only.

## Why does this matter for students?

Because student life does not line up with 30 June. A student who arrives in February for Semester 1 and works part-time will have income in one financial year until 30 June, then in the next one from 1 July. That means two separate returns, with two separate results.

Some common patterns:

- **Arrive in February, keep studying.** Your first return covers February to 30 June. After that, each return covers a full year.
- **Arrive in July.** Your first return covers a full year, the simplest case.
- **Finish your course in November and leave.** Your last return covers 1 July to the day your Australian income stopped.

## Which year does my income belong to?

Income generally belongs to the year you were paid. If you worked the last week of June but your pay arrived on 3 July, check your income statement. Your employer reports it, and the ATO pre-fills your return from it.

Your residency can also change between years. For example, a student may be a foreign resident in the year they arrive for a short English course, then may be a resident in a later year when they start a degree of 6 months or more. Each return looks at your situation in that year only, so check your residency each time you lodge.

## How does arriving mid-year affect the tax-free threshold?

If you may be an Australian resident for tax purposes, you get the tax-free threshold of $18,200. But if you became a resident partway through the year, the ATO gives you only part of it for that first year.

The ATO formula is $13,464 plus a share of $4,736, based on the number of months you were a resident, counting from the month you arrived to 30 June.

**Worked example.** The ATO example is a person who became a resident on 17 April. April, May and June count as 3 months. So the threshold is $13,464 + ($4,736 × 3 ÷ 12) = $13,464 + $1,184 = **$14,648**. From the next year, that person gets the full $18,200.

A foreign resident gets no tax-free threshold in any year. For 2025-26, foreign residents pay 30% from the first dollar up to $135,000, so the date you became a resident, if you did, can make a real difference to your first return.

## When can I lodge, and when is it due?

Lodging opens after 30 June. You can lodge from 1 July, but waiting is usually better. Employers report your final pay through Single Touch Payroll, and the ATO says most employers finalise this by 14 July. Wait until your income statements say "Tax ready", or your return may miss a job.

The usual deadline for people who lodge themselves is 31 October. A registered tax agent can often lodge later, if you contact them before 31 October.

## What if I leave Australia before 30 June?

The ATO says that if you worked, you will probably need to lodge after 30 June, and you can do this from overseas. Lodging before 30 June when leaving permanently is possible only on paper, and it is slower.

Before you leave:

- Ask each employer for a payment summary if you need one. The ATO says an employer must give it within 14 days if you ask when you leave.
- Keep your Australian bank account open for any refund.
- Make sure you can still sign in to myGov from overseas.

## What other dates should students know?

**Super.** From 1 July 2026, under Payday Super, employers must pay super at the same time as wages, and it must reach your fund within 7 business days. A new employee's first contribution can take up to 20 business days. So your last super payment may arrive a few weeks after your last shift.

**Medicare Entitlement Statement.** If you are not entitled to Medicare and want the Medicare levy exemption, you apply to Services Australia from 1 July. The ATO says it can take up to 8 weeks, and you should wait for it before lodging.

**Past years.** A year you never lodged is still open. If you worked in an earlier year and did not lodge, that return is still needed.

## Your yearly calendar

- **1 July:** new financial year starts. Apply for your Medicare Entitlement Statement if you need one.
- **Mid to late July:** income statements become "Tax ready".
- **31 October:** usual deadline if you lodge yourself.
- **Later dates:** possible with a registered tax agent, if you contact them before 31 October.
- **Every year you worked:** one return per financial year.

If your study and work run across two financial years and you would like help with both returns, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Is the Australian tax year the same as the calendar year?', a: 'No. It runs from 1 July to 30 June. The 2026-27 year started on 1 July 2026 and ends on 30 June 2027.' },
      { q: 'I arrived in March. Do I get the full $18,200 threshold?', a: 'If you may be a resident, you get only part of it in your first year, worked out from the months you were a resident. You get the full amount from the next full year.' },
      { q: 'Can I lodge on 1 July?', a: 'You can, but it is safer to wait until your income statements say "Tax ready". Most employers finalise them by 14 July.' },
    ],
    sources: [
      { label: 'ATO: Tax in Australia, what you need to know', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/tax-in-australia-what-you-need-to-know` },
      { label: 'ATO: Tax-free threshold for newcomers to Australia', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/tax-free-threshold-for-newcomers-to-australia` },
      { label: 'ATO: Returning to your home country', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/returning-to-your-home-country` },
      { label: 'ATO: Access your income statement', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/access-your-income-statement` },
    ],
  },
  {
    slug: 'cash-in-hand-tax-return-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'How to put cash in hand income on your tax return as a student',
    description: 'Cash wages are taxable income even with no payslip. How international students can work out the amount, keep records and declare it on their tax return.',
    answer: 'Cash in hand wages are assessable income and must go on your tax return, even if you have no payslip. Work out the total from your own records, declare it honestly, and keep the evidence for 5 years.',
    body: `Some students are paid in cash for shifts at restaurants, shops or cleaning jobs. Often there is no payslip and no tax taken out. Many students then ask: do I need to declare this? The answer is yes. This guide focuses on the practical part: how to work out the amount and put it on your return.

## Is cash income really taxable?

Yes. The ATO says assessable income includes salary and wages, tips, gratuities and other payments for your services, and that cash income must be declared. It does not matter if the money came in an envelope, by bank transfer or through an app.

What changes with cash is only the process. If your employer did not withhold tax, there is no tax already paid on that income. The tax on it is worked out when you lodge.

## Why may cash income not appear in myTax?

Your return is pre-filled from income statements that employers report to the ATO. An employer who pays cash may not report your wages. If they did not, that job will not show up in myTax, and you need to add it yourself.

If an employer did report your cash wages and withheld tax, they will appear like any other job. Check your income statements in myGov first, so you do not count the same money twice.

## How do you work out the amount?

Build your total from your own records. Useful evidence:

- A diary or phone notes of the dates and hours you worked.
- Messages from your manager about shifts and pay.
- Rosters, or photos of rosters.
- Bank deposits, if you deposited some of the cash.
- The business name and ABN of the person who paid you, if you know it.

Then add it up. For example: 12 shifts of 5 hours at $25 an hour is 12 × 5 × $25 = $1,500. Do this for each cash job separately, and keep the totals by financial year, because each year is its own return.

If some records are missing, use an honest best estimate and a method you can explain, such as "about 2 shifts a week for 15 weeks". Write down how you worked it out and keep the note.

## How much tax will you pay on it?

It depends on your residency and your total income for the year, not on the cash alone.

**Example 1: may be a resident (2025-26).** A student earns $10,000 from a regular job and $6,000 in cash. The total is $16,000, which is below the $18,200 tax-free threshold. There is no income tax on it. The cash still goes on the return, but it does not create a tax bill in this example.

**Example 2: foreign resident (2025-26).** A student who is a foreign resident for tax purposes earns $5,000 in cash with no tax withheld. Foreign residents pay 30% from the first dollar on income up to $135,000, so the tax on the cash is $1,500. That amount is payable when the return is assessed.

These examples leave out the Medicare levy. Many students are not entitled to Medicare and may claim an exemption with a Medicare Entitlement Statement.

## Where does it go on the return?

Cash wages from an employer go on your return as salary and wage income, even without an income statement. If you were really running your own business, for example freelance work under an ABN, the income goes on as business income instead. If you are not sure which applies, ask before you lodge.

## What about super and your rights?

Being paid in cash does not change your rights as an employee. Fair Work says your employer must give you a pay slip within 1 working day of payday, and visa holders have the same workplace rights as everyone else. If you were an employee, your employer should also have paid super.

If you think you were underpaid, you can contact the Fair Work Ombudsman on 13 13 94. Fair Work says a visa will not be cancelled for asking it for help. For unpaid super, the ATO has an online tool to report it.

## Why declaring it protects you

An honest return is a clean record with the ATO. Leaving income out is what creates problems later, and the ATO can review a return after it is lodged. A clean tax history also matters if you later apply for another visa or want to stay in Australia.

Keep your records for 5 years from the date you lodge. Save them somewhere that will survive a lost phone, such as cloud storage or email.

If you forgot to include cash income on a return you already lodged, you can fix it. The ATO generally gives individuals 2 years to amend, counted from the day after your notice of assessment is sent. In myTax, go to Income tax history, then Amend.

## Checklist

- Check myGov first: was any of this cash job reported?
- List every cash shift with date, hours and rate.
- Add it up and write down your method.
- Declare it as salary and wages on your return.
- Put money aside if no tax was taken out.
- Keep the records for 5 years.

If you have cash income and want it set out correctly on your return, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Will I get in trouble for being paid in cash?', a: 'Being paid in cash is not your mistake. Declaring the income is what protects you. The employer is the one who must withhold tax, give pay slips and pay super.' },
      { q: 'What if I do not know the exact amount?', a: 'Use an honest best estimate based on your shifts and pay rate, and keep a note of how you worked it out.' },
      { q: 'Do tips paid in cash count?', a: 'Yes. The ATO lists tips and gratuities as assessable income.' },
    ],
    sources: [
      { label: 'ATO: Taxable, assessable and exempt income', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/income-you-must-declare/taxable-assessable-and-exempt-income` },
      { label: 'ATO: Records you need to keep', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/records-you-need-to-keep` },
      { label: 'Fair Work: Visa holders and migrants', href: 'https://www.fairwork.gov.au/find-help-for/visa-holders-migrants' },
      { label: 'Fair Work: Pay slips', href: 'https://www.fairwork.gov.au/pay-and-wages/paying-wages/pay-slips' },
    ],
  },
  {
    slug: 'how-much-super-should-employer-pay-international-students',
    category: 'Super',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'How to calculate the super on your pay as a student',
    description: 'Super is 12% of your qualifying earnings, paid on top of your wage. How students can calculate it from a payslip, what is left out, and when it should arrive.',
    answer: 'Your employer should pay 12% of your qualifying earnings into your super fund, on top of your wage. From 1 July 2026 it is paid with your wages and must reach your fund within 7 business days.',
    body: `Super (superannuation) is money your employer pays into a fund in your name. It is not taken out of your wage. It is paid on top. International students are generally eligible for super like any other employee. This guide shows you how to calculate the right amount from your payslip and check that it arrived.

## Who gets super?

The ATO says generally all employees are eligible for the super guarantee, whether full-time, part-time or casual, and this includes temporary residents. So a student working casual shifts at a café is eligible. There is one exception: if you are under 18, super is only required for weeks you work more than 30 hours.

The super guarantee rate is **12%**. It is a percentage of your "qualifying earnings", the new name the ATO uses from 1 July 2026 for the pay that super is calculated on.

## What pay counts?

Not every dollar on your payslip counts. The ATO says:

- **Included:** pay for your ordinary hours of work, and commissions.
- **Not included:** overtime (when your ordinary hours are clearly set by an award or agreement), reimbursements, and bonuses for work done entirely outside ordinary hours.

For most students on regular casual shifts, nearly all pay is for ordinary hours. Your award or agreement sets which hours are ordinary hours and which are overtime, so check it if you are not sure, or ask your employer to explain. If you work extra hours that your award treats as overtime, super is not due on that part.

## Worked example

A student works a casual job and earns $8,000 for ordinary hours in a period. The super should be:

$8,000 × 12% = **$960**

If the same student also earned $500 of overtime, the super on the overtime part is not required, so the amount is still $960.

Here is a quick check you can do on any payslip: divide the super amount by your pay for ordinary hours. The answer should be 0.12. If it is lower, ask your employer how they calculated it.

## When should it reach your fund?

From 1 July 2026, the rules changed. Under Payday Super, Fair Work says employers must pay super at the same time as your wages, and it must reach your fund within **7 business days**. For a new employee, the first contribution can take up to **20 business days**.

Before July 2026, employers could pay super each quarter. So if you are checking older periods, a delay of up to a few months could be normal.

Under the new rules, a missing payment shows up quickly. If your pay arrives but no super reaches your fund within about two weeks, you can ask about it while you still work there and the details are fresh.

## How do you check it was paid?

Your payslip should show the super amount and the fund it goes to. Fair Work requires pay slips to show super contributions and the fund. But a line on a payslip is not proof that the money arrived.

To check it arrived:

- Log in to your super fund's app or website and look at contributions.
- Or check through myGov, linked to the ATO. The ATO says you can see contributions your employer has reported there.
- Compare the dates and amounts with your payslips.

## What if the amounts do not match?

Start with your employer. Many problems are payroll errors, such as a wrong fund number or a missed pay run, and are fixed quickly. Write to them with the pay periods, your pay and your fund details, and ask what was paid and when.

If that does not work, the ATO has an online tool to report unpaid super. You will need your TFN, the period and the employer's ABN. The ATO will tell you if it can act on the report, but not every report results in the money being collected. You can make a report even after you leave the job.

## Which fund does it go to, and why does it matter later?

If you have never chosen a fund, your employer should ask the ATO for your existing fund (called a stapled fund) and pay into it. If you have no fund at all, your employer can use its default fund. To keep things simple, give the same fund details to every employer using the super standard choice form. One fund means one balance to check, and later one claim.

When you leave Australia and your visa has ended, you can claim your super as a Departing Australia Superannuation Payment (DASP). For students who never held a working holiday visa, the taxed element is taxed at 35%. Every dollar that was paid correctly is a dollar you can claim later, so it is worth checking now.

If you stay in Australia after your studies, for example on a graduate visa, your super keeps growing in the same fund. Either way, checking each payslip while you still work for the employer is much easier than chasing a missing payment years later.

## Checklist

- Find the super line on your payslip.
- Divide it by your ordinary hours pay: is it 0.12?
- Check your fund or myGov to see it arrived.
- Use one fund for all jobs.
- Ask your employer in writing if something is missing.

If you have questions about super on your tax return, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Is super taken out of my wage?', a: 'No. Super is paid by your employer on top of your wage. It should not reduce your net pay.' },
      { q: 'Do casual students get super?', a: 'Generally yes. The ATO says casual employees, including temporary residents, are eligible. If you are under 18, super is only required for weeks you work more than 30 hours.' },
      { q: 'Is super paid on overtime?', a: 'Generally not, when your ordinary hours are clearly set by your award or agreement. Super is calculated on qualifying earnings, mainly pay for ordinary hours.' },
    ],
    sources: [
      { label: 'ATO: Work out if you have to pay super', href: `${ATO}/businesses-and-organisations/super-for-employers/work-out-if-you-have-to-pay-super` },
      { label: 'ATO: What payments are qualifying earnings', href: `${ATO}/businesses-and-organisations/super-for-employers/paying-super-on-payday/what-payments-are-qualifying-earnings` },
      { label: 'Fair Work: Payday Super', href: 'https://www.fairwork.gov.au/newsroom/news/payday-super-new-rules-starting-1-july-2026' },
      { label: 'ATO: Report unpaid super contributions', href: `${ATO}/calculators-and-tools/super-report-unpaid-super-contributions-from-my-employer` },
    ],
  },
  {
    slug: 'how-long-does-dasp-take-international-students',
    category: 'Super',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'How long DASP takes for international students: a timeline',
    description: 'The ATO says a complete DASP application is generally paid within 28 days. A step by step timeline for students, from your last shift to the money in your account.',
    answer: 'The ATO says a DASP is generally paid within 28 days of a complete application being received. Before that clock starts, you must have left Australia and your visa must no longer be in effect.',
    body: `When you finish your studies and leave Australia, you can claim your super through the Departing Australia Superannuation Payment, or DASP. Students often ask how long it takes. The honest answer is that the 28 days only starts once your application is complete, and some steps happen before you can even apply. This guide walks through the timeline.

## Step 1: your last super payment

From 1 July 2026, under Payday Super, employers must pay super with your wages, and it must reach your fund within 7 business days. For a new employee, the first payment can take up to 20 business days.

So if you finish your last job a few days before you fly, your last super contribution may still be on its way. Check your fund before you claim, so you do not apply against a balance that is not complete.

## Step 2: leave Australia and let your visa end

You cannot claim DASP while you are still in Australia or while you hold an active visa. The ATO says you must have left Australia and your temporary visa must have ceased. You also cannot hold another active visa.

Many students move from a student visa to a graduate visa (485) or another visa. If you do, you are not yet eligible, because a visa is still in effect.

The ATO DASP system checks your visa status, and the ATO suggests checking VEVO to see whether your visa is still active. If the visa still shows as active, the application cannot be submitted.

## Step 3: you can prepare before you leave

The ATO says you can start your application before you leave, even though you cannot submit it until you are eligible. Preparing early saves time:

- Your personal details and an email address you will keep.
- Your passport country and number.
- Your TFN (optional, but it helps).
- Your fund name, fund ABN and member number.
- Bank details for the payment.

The ATO says the eligibility check takes about 45 seconds and the application about 30 minutes.

## Step 4: the 28 days

Once a complete application is received, the ATO says a DASP is generally paid within 28 days. If an application is incomplete, or the fund asks for more documents, it can take longer.

The ATO DASP online system is free to use. You do not need to pay anyone to apply. Be careful with websites that charge a fee and look like a government service. Check that you are on the ATO website before you enter your passport details.

## What makes it take longer?

Most delays have a clear cause:

- **Applying too early.** Your visa is still active, or the record of your departure has not updated.
- **Names do not match.** The name on your fund account is different from your passport, for example a missing middle name or the family name and given name swapped.
- **Wrong date of birth** on the fund record.
- **Missing documents.** Funds may ask for certified copies, and their rules can differ.
- **Applying to the wrong fund.** If you had several jobs, your super may be in more than one fund.

Fix what you can while you are still in Australia: check your name and date of birth in your fund account, and update your email and phone.

Each fund pays its own DASP, which is the main reason a student with several jobs can wait longer for all the money. If you have super in two funds, you will get two payments, and they may not arrive at the same time. You can see all your accounts through myGov, linked to the ATO. Some students choose to combine their accounts into one fund before they leave, which means one claim instead of several. Before you combine, the ATO says to check whether you will lose insurance and whether there are exit or entry fees.

Also keep your Australian bank account details ready, or decide which overseas account you will use. The payment details are part of the application, so it helps to choose before you start.

## What if you wait more than 6 months?

If you have left Australia and your visa ended 6 months ago or more, and you have not claimed, your fund transfers your super to the ATO as unclaimed super. It is still yours. You can still claim it as a DASP, now from the ATO instead of the fund.

## How much will you receive?

The fund or the ATO withholds tax before paying you. For students who never held a working holiday visa (417 or 462), the rates are nil on the tax-free component, 35% on the taxed element and 45% on the untaxed element. Most employer super is a taxed element. The DASP tax is final and does not go on your Australian tax return.

## Your timeline checklist

- Before you leave: check your fund details, name and date of birth match your passport.
- Before you leave: find all your funds in myGov.
- Wait for your last contribution to arrive.
- After you leave and your visa has ended: check VEVO, then submit.
- Then allow about 28 days for a complete application.

Your final tax return is a separate claim from DASP. If you would like help with that return, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Can I claim DASP while I am on a graduate visa?', a: 'No. You must have left Australia and have no active visa. A 485 visa is an active visa, so you are not yet eligible.' },
      { q: 'Does DASP go on my tax return?', a: 'No. The ATO says DASP is not part of your assessable income. The tax withheld from it is final.' },
      { q: 'Do I have to claim within 6 months?', a: 'No. After 6 months your super moves to the ATO, but you can still claim it as a DASP from the ATO.' },
    ],
    sources: [
      { label: 'ATO: Departing Australia superannuation payment (DASP)', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp` },
      { label: 'ATO: Help with the DASP online application system', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system` },
      { label: 'Fair Work: Payday Super', href: 'https://www.fairwork.gov.au/newsroom/news/payday-super-new-rules-starting-1-july-2026' },
    ],
  },
  {
    slug: 'tax-on-super-withdrawal-international-students',
    category: 'Super',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Tax on super when international students leave Australia',
    description: 'For students who never held a working holiday visa, DASP tax is 35% on the taxed element. How the rates work, a worked example, and why a past 417 or 462 visa matters.',
    answer: 'If you never held a working holiday visa, the tax on a DASP is nil on the tax-free component, 35% on the taxed element and 45% on the untaxed element. If the payment includes super from contributions made while on a 417 or 462 visa, 65% applies to the whole amount.',
    body: `When you leave Australia after your studies, the super your employers paid can be claimed as a Departing Australia Superannuation Payment (DASP). Tax is taken out before you receive it. The rate for most international students is lower than the rate many people read about online, which is for working holiday visa holders. This guide explains the student rates.

## What are the DASP tax rates?

The ATO sets the rates by the type of money in your super account:

- **Tax-free component:** nil.
- **Taxable component, taxed element:** 35%.
- **Taxable component, untaxed element:** 45%.

These are the rates if you have never held a working holiday maker visa (subclass 417 or 462).

## What are these "components"?

Your super balance is split into parts:

- The **tax-free component** is taxed at nil. Most students have little or none of it.
- The **taxed element** is part of the taxable component. For most students, this is where the super from their employers sits.
- The **untaxed element** is also part of the taxable component, but it is less common.

Your fund knows the split. You can ask it, or check your member statement.

For most students, nearly all of the balance is the taxed element, so the 35% rate is the one that matters.

## Worked example

A student worked part-time during a 3-year degree. When they leave, their fund holds $10,000, all taxed element.

- Tax withheld: $10,000 × 35% = $3,500.
- Amount paid to the student: $10,000 minus $3,500 = **$6,500**.

If the same balance were paid at 65%, the student would receive only $3,500. That is why your visa history matters.

## When does the 65% rate apply?

The 65% rate is for working holiday makers. The ATO says that if you have held a working holiday maker visa, and the payment includes super from contributions made while you were on that visa, the 65% rate applies to the entire payment.

Some students came to Australia first on a 417 or 462 visa, then started a course. If any super in your account came from that working holiday time, the whole DASP from that fund may be taxed at 65%. If you have super in more than one fund, each fund works out its own payment.

If you never held a 417 or 462 visa, this does not apply to you.

**Example with a mixed history.** A person held a 417 visa for one year and worked on farms, then studied on a student visa for two years. Their one fund holds $10,000, and part of it came from contributions made during the 417 year. The ATO rule means the 65% rate applies to the whole payment from that fund, so $6,500 is withheld and $3,500 is paid. If you are in this position, check your fund statements before you claim, so you know what to expect.

## Can you get the DASP tax back?

No. The tax on a DASP is final. The ATO says DASP is not part of your assessable income for Australian tax, so it does not go on your tax return and there is nothing to claim back there.

Your home country may have its own rules for this money. Ask a tax adviser in your home country if you are unsure.

The DASP is also separate from your tax return for your last year in Australia. That return covers your wages, the tax withheld from them and any deductions. It is lodged with the ATO in the usual way, and you can lodge it from overseas. The DASP covers only your super.

## Is it worth claiming a small balance?

Usually, yes. If you do not claim, your fund transfers your super to the ATO once 6 months have passed since you left Australia and your visa ended. It stays yours and you can still claim it, but it is easier to claim while your details are fresh.

A small balance in a fund can also be reduced by fees and insurance premiums over time. Claiming moves the money to you.

For example, a $2,000 balance of taxed element super, for a student who never held a working holiday visa, would have $700 withheld (35%) and pay $1,300. That is still money your employers paid on top of your wages, and it does not come to you unless you claim it.

## When should you claim?

You can claim only after you have left Australia and your visa is no longer in effect. If you move to a graduate visa (485) or another visa, you are not yet eligible.

Before you claim, check that your last super contribution has arrived. Under Payday Super, from 1 July 2026, super must reach your fund within 7 business days of payday. The ATO says a complete DASP application is generally paid within 28 days.

The ATO DASP online system is free.

## Checklist before you leave

- Check your visa history: did you ever hold a 417 or 462 visa?
- Find all your super accounts in myGov.
- Make sure your fund has your correct name and date of birth.
- Keep your fund name, ABN and member number.
- After your visa ends and you have left, apply through the ATO DASP online system.

DASP is separate from your final tax return. If you would like help with that return, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'I only ever held a student visa. Which rate applies?', a: 'If you never held a 417 or 462 visa, the taxed element is taxed at 35%, the untaxed element at 45%, and the tax-free component at nil.' },
      { q: 'Does the DASP go on my tax return?', a: 'No. The ATO says DASP does not form part of your assessable income, and the tax withheld is final.' },
      { q: 'I was on a working holiday visa before my student visa. What happens?', a: 'If the payment includes super from contributions made while you held the 417 or 462 visa, the ATO says the 65% rate applies to the whole payment from that fund.' },
    ],
    sources: [
      { label: 'ATO: Departing Australia superannuation payment (DASP)', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp` },
      { label: 'ATO: Help with the DASP online application system', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system` },
    ],
  },
  {
    slug: 'what-happens-to-unclaimed-super-international-students',
    category: 'Super',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'What happens to unclaimed super after international students leave',
    description: 'If you leave Australia and do not claim your super, your fund sends it to the ATO after 6 months. It is still yours. How students can find it and claim it later.',
    answer: 'If you have left Australia, your visa has ended and 6 months have passed, your super fund transfers your balance to the ATO as unclaimed super. It is still yours, and you can claim it from the ATO as a DASP at any time.',
    body: `Many students leave Australia after graduation without claiming their super. Life is busy, and the claim feels like something for later. Some then worry that the money is lost. It is not. This guide explains where your super goes if you do not claim it, and how to get it back.

## What is unclaimed super?

The ATO calls super that it holds for people "ATO-held super". It includes unclaimed super money. This is super that a fund was required to pass to the ATO because the owner did not claim it or could not be found.

For former temporary residents, the rule is clear. The ATO says funds report and pay these amounts to the ATO after 6 months since you left Australia and your visa ended or was cancelled.

Funds have to follow this rule for people who have left Australia on a temporary visa and have not claimed. It is not a penalty. It is a way to keep track of the money in one place.

Funds also send other accounts to the ATO, for example when a member is lost and the fund cannot contact them. This is common for students who changed address several times or used a university email that no longer works.

## Is it still yours?

Yes. The ATO says you can claim your super as a Departing Australia Superannuation Payment (DASP), and that you can claim it at any time. The only change is who pays it: the ATO instead of your old fund.

The same DASP tax rates apply. For a student who never held a working holiday visa (417 or 462), that is nil on the tax-free component, 35% on the taxed element and 45% on the untaxed element.

## How do you find out if your super has moved?

You cannot tell from your old fund's emails. Nobody may tell you when the transfer happens. The best way to check is through myGov, linked to the ATO.

The ATO says ATO online services let you:

- check for lost super accounts,
- track unclaimed super, shown as "ATO-held" super,
- see contributions your employers reported,
- and combine accounts.

Some accounts may not display, so check the "as at" date on each balance. If you have left Australia, make sure you can still sign in to myGov from overseas before you need it.

If you cannot get into myGov, you can still apply. The DASP online system lets you search with your personal details and passport, and your TFN is optional. Having your TFN and old fund details makes the match easier.

## How do you claim it from the ATO?

Use the ATO DASP online system. It covers both super held by funds and super held by the ATO. It is free.

You will need:

- Your personal details and a current email address.
- Your passport country and number.
- Your TFN, if you have it (optional, but it helps the match).
- Details of your old fund, if you know them.

The ATO says a complete DASP application is generally paid within 28 days. There is also a paper form for ATO-held super, which you send to the ATO.

## A worked example

Here is how it can look in practice. A student finished a master's degree in December 2025 and flew home. Their student visa ended soon after, and they did not hold another visa. Their fund held $4,000 of taxed element super. By mid-2026, more than 6 months had passed, so the fund sent the $4,000 to the ATO.

In 2027 the student logs in to myGov from home and sees $4,000 of ATO-held super. They apply through the DASP online system. The ATO withholds 35%, which is $1,400, and pays $2,600 to their bank account.

## Why not just leave it?

Because the steps get harder over time. Your Australian phone number may stop working, so you cannot receive codes. You may forget your myGov sign-in. Your old fund details may be lost. Claiming earlier, while your records and contact details still work, is easier.

Your identity is also easier to prove when your details match. If you change your passport, or your name is spelled differently in different places, keep copies of both documents. The DASP application asks for your passport details, and the ATO or the fund needs to match them to the account.

## What if some super is still missing?

If your payslips show super for a job, but neither a fund nor the ATO shows it, the money may never have been paid. That is a different problem. The ATO has an online tool to report unpaid super from an employer, and anyone can use it. You will need your TFN, the period you worked and the employer's ABN, so keep your payslips even after you leave Australia. The ATO will tell you if it can act on the report.

## Checklist

- Before you leave, set up myGov so it works from overseas.
- Write down every fund name and member number.
- After 6 months, check myGov for ATO-held super, and note the "as at" date.
- Claim through the ATO DASP online system.
- Report any super that your payslips show but no account received.

Your final Australian tax return is separate from your super. If you would like help with that return, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Is there a deadline to claim super held by the ATO?', a: 'The ATO says you can claim your super as a DASP at any time. It does not stop being yours.' },
      { q: 'Is the tax different if the ATO pays my DASP?', a: 'No. The same DASP rates apply whether your fund or the ATO pays it.' },
      { q: 'I did not hold any visa after my student visa ended. When will my super move?', a: 'Your fund transfers it to the ATO once 6 months have passed since you left Australia and your visa ended.' },
    ],
    sources: [
      { label: 'ATO: ATO-held super', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/ato-held-super` },
      { label: 'ATO: Departing Australia superannuation payment (DASP)', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp` },
      { label: 'ATO: Keeping track of your super online', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/keeping-track-of-your-super-online` },
    ],
  },
  {
    slug: 'how-to-find-lost-super-international-students',
    category: 'Super',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Lost super from student jobs: a step by step search',
    description: 'Several part-time jobs can leave you with super in funds you have never heard of. A step by step search for international students, using myGov and your payslips.',
    answer: 'Search for lost super through myGov linked to the ATO, which shows your super accounts and any super the ATO holds for you. Then compare the results with your payslips to find any job whose super is still missing.',
    body: `A café job in first year, a supermarket job in second year, and some casual tutoring in third year. Each employer may have paid your super into a different fund. Years later, it is easy to forget where it all went. This guide is a step by step search, written for international students who want to find every dollar before they claim it.

## Why do students end up with "lost" super?

There are a few common reasons:

- **A new fund at each job.** If you did not choose a fund, an employer may have used its own default fund.
- **Changed contact details.** You moved house or changed phone numbers, so the fund could not reach you.
- **Super moved to the ATO.** Funds send some accounts to the ATO, for example when a member is lost or when a former temporary resident has left and not claimed.
- **Super never paid.** Sometimes the money never reached any fund.

The first three are a search problem. The last one is a recovery problem, which needs a different step.

## Step 1: list every job

Before you search, write a list of every Australian employer you have worked for. For each one, note:

- The business name.
- Roughly when you started and finished.
- Any fund name you remember.
- Whether you have payslips.

This list is the most useful tool in the whole search. If you find three accounts but you had five jobs, you know where to look next. Old emails can help you build it: search your inbox for words like "payslip", "super" and "welcome", because many funds and payroll systems send emails when you start.

## Step 2: link myGov to the ATO

Sign in to myGov and link it to the ATO. If you are already overseas, update your sign-in settings so they work outside Australia. The ATO says ATO online services let you:

- check for lost super accounts,
- see super the ATO holds for you, shown as "ATO-held",
- see the contribution payments your employers reported,
- and combine accounts.

Then read the results carefully. Look at each account and its balance. The ATO says some accounts may not display, and each balance has an "as at" date. A balance may be a few months old, so do not assume it is the final amount.

Match each account to a job on your list. Write the fund name, fund ABN and member number next to the job. You will need these details again when you make a DASP claim, so keep the list somewhere safe, such as a note in your email.

## Step 3: compare with your payslips

Your payslips should show the super your employer paid and the fund. Fair Work requires pay slips to show super contributions and the name of the fund.

Add up the super on the payslips for each job and compare it with what arrived. Small differences can be fees, insurance or investment returns. A large gap, or a job with no account at all, needs follow up.

## Step 4: follow up the gaps

If a job's super is missing:

- Ask the employer in writing what they paid, when, and to which fund.
- Contact that fund with your TFN and details.
- If the employer did not pay, use the ATO online tool to report unpaid super. You will need your TFN, the period and the employer's ABN. The ATO will tell you if it can act on it. Not every report leads to the money being collected.

## Should you combine your accounts?

Combining (consolidating) can mean one balance, one set of fees, and later one DASP claim. You can move whole balances in myGov under Super, then Manage, then Transfer super.

Check first. The ATO says you may lose insurance in an old fund, and there may be exit or entry fees. Combining also does not change the fund your current employer pays into, so tell your employer if you want future super to go to the new fund.

## When can you claim it?

International students can claim super as a Departing Australia Superannuation Payment (DASP) once they have left Australia and no visa is in effect. If you move to a graduate visa or another visa, you are not yet eligible.

For students who never held a working holiday visa, the DASP tax is 35% on the taxed element. If you do not claim within 6 months of leaving and your visa ending, the fund sends your super to the ATO, and you can still claim it from there.

The search is easier while you are still in Australia. Your Australian phone number works, your mail arrives, and you can call an employer during business hours. After you leave, each of these becomes harder. Under Payday Super, from 1 July 2026, contributions must reach your fund within 7 business days of payday, so a gap in a recent job should be easy to see.

## Checklist

- List every employer with dates.
- Link myGov to the ATO and check all accounts.
- Match accounts to jobs, and payslips to balances.
- Follow up any job with missing super.
- Decide whether to combine, after checking insurance and fees.
- Keep fund names and member numbers safe for your DASP claim.

If you also need your tax return done before you leave, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Can I search for lost super from overseas?', a: 'Yes, through myGov linked to the ATO. Update your sign-in settings for overseas before you leave, so you can still get in.' },
      { q: 'Will combining my funds lower the DASP tax?', a: 'No. Combining changes how many claims you make, not the tax rate.' },
      { q: 'My payslips show super but no fund has it. What now?', a: 'Ask the employer what they paid and where. If it was not paid, you can report it with the ATO online tool for unpaid super.' },
    ],
    sources: [
      { label: 'ATO: Keeping track of your super online', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/keeping-track-of-your-super-online` },
      { label: 'ATO: Transferring or consolidating your super', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/transferring-or-consolidating-your-super` },
      { label: 'ATO: Report unpaid super contributions', href: `${ATO}/calculators-and-tools/super-report-unpaid-super-contributions-from-my-employer` },
      { label: 'ATO: ATO-held super', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/ato-held-super` },
    ],
  },
  {
    slug: 'how-to-choose-super-fund-international-students',
    category: 'Super',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'How to choose a super fund as an international student',
    description: 'If you will claim your super when you leave, fees, insurance and an easy DASP claim matter more than long-term returns. How students can choose one fund and keep it.',
    answer: 'Choose one super fund at your first job and give the same fund details to every later employer. For a student who plans to claim super when leaving Australia, low fees, no unwanted insurance and an easy DASP claim usually matter more than long-term investment returns.',
    body: `When you start your first job in Australia, your employer may hand you a form about super. Many students skip it. That is how they end up with three funds from three jobs. A few minutes on day one can save you a lot of work later. This guide explains how to choose a fund when you are in Australia for your studies.

## Can students choose their own fund?

Usually, yes. The ATO says you can usually choose which fund your super is paid into. Your employer must give you the super standard choice form or tell you where to get it online. You fill it in and give it to your employer.

## What happens if you do not choose?

The ATO explains two steps:

- **Stapled fund.** If you already have a fund from an earlier job, your employer should ask the ATO for it and pay into that fund. This is called a stapled super fund.
- **Default fund.** If you have no fund and do not choose, your employer can pay into its own default fund, chosen from funds that offer a MySuper product.

So no one is left without super. But if you skip the choice form at your very first job, the default fund of that employer may become your fund by accident.

## What matters most for a student?

Most Australians choose a fund for 40 years. Many international students will claim their super as a Departing Australia Superannuation Payment (DASP) when they leave. Over a few years, the things that change your balance most are often:

- **Administration fees.** A flat dollar fee each week or year has a bigger effect on a small balance.
- **Insurance.** Many funds add insurance cover and take the premiums from your balance. Check what cover you have and whether you need it.
- **Member services.** Is the app easy to use? Can you update your details online from overseas?
- **Investment options and performance.** These still matter, especially if you may stay in Australia long term.

The ATO says to consider administration fees, insurance, member benefits, performance and investment options.

## How do you compare funds?

The ATO has the **YourSuper comparison tool**. It lets you compare MySuper products on fees and returns. It is free and run by the government.

When you compare, look at:

- The total fees on a small balance.
- Whether insurance is included by default.
- Whether you can manage everything online.

Moneysmart, run by ASIC, also has guides on choosing a fund.

A simple way to compare is to imagine your own balance. If you expect to earn super for three years and claim when you leave, a flat fee taken every week for three years can be a large share of a small balance. A percentage fee on a small balance is a smaller dollar amount. Read the fee section on the fund's website, and look at the dollar total, not only the percentage.

## What if you may stay in Australia?

Some students stay after their course, on a graduate visa or another visa. If you think you may stay for many years, long-term returns become more important, because the money stays invested for longer. In that case, compare investment performance over several years as well as fees. You can change funds later, so the choice is not final.

## What about insurance?

Insurance through super can be useful for some people. For a student who expects to claim and leave in a few years, cover they did not ask for can reduce a small balance. Read the fund's insurance details in your first month. Ask your fund how to change or cancel cover, and think about your own situation before you do.

Your choice of fund does not change the DASP tax. The DASP tax rate does not depend on the fund. For students who never held a working holiday visa (417 or 462), the taxed element is taxed at 35%. What the fund changes is how much is left in your account when you claim, and how easy the claim is.

## What if you already have several funds?

You can combine them in myGov linked to the ATO, under Super, then Manage, then Transfer super. Before you do, the ATO says to check whether you will lose insurance and whether there are exit or entry fees. Combining does not change where your current employer pays, so give them a new choice form if needed.

## Your first-job checklist

- Choose one fund and fill in the super standard choice form.
- Give the same fund details to every later employer.
- Check the insurance in your account in the first month.
- Save your member number and the fund's ABN somewhere safe.
- Set up the fund's app with an email you will keep after you leave.
- Under Payday Super, check that contributions arrive within 7 business days of payday.

The member number and fund ABN are what you will need for a DASP claim from overseas. A photo of your welcome letter is enough.

If you change jobs, give your new employer the same choice form with the same fund. If you skip it, the stapled fund rule should still send your super to your existing fund, but giving the form yourself is the surest way.

If you have questions about your tax return as a student, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Do I have to use my employer\'s fund?', a: 'Usually not. The ATO says you can usually choose your own fund by giving your employer a super standard choice form.' },
      { q: 'What is a stapled fund?', a: 'It is a fund you already have from earlier work. If you do not choose, your employer should ask the ATO for it and pay into it.' },
      { q: 'Does the fund I choose change the DASP tax rate?', a: 'No. The DASP rate depends on your visa history and the type of super, not on the fund.' },
    ],
    sources: [
      { label: 'ATO: Choosing a super fund', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/choosing-a-super-fund` },
      { label: 'ATO: Transferring or consolidating your super', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/transferring-or-consolidating-your-super` },
      { label: 'ATO: Departing Australia superannuation payment (DASP)', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp` },
    ],
  },
  {
    slug: 'minimum-wage-australia-2026-27-international-students',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Check your hourly rate: minimum wage 2026-27 for students',
    description: 'The national minimum wage is $26.44 an hour from 1 July 2026. How international students can check their own rate, casual loading, awards and penalty rates.',
    answer: 'From 1 July 2026, the national minimum wage is $26.44 an hour, or $1,004.90 a week for 38 hours. Casuals covered by the national minimum wage also get a 25% casual loading, so at least $33.05 an hour, and most jobs are covered by an award with its own minimum rates.',
    body: `Many international students work casual jobs in cafés, shops, warehouses and cleaning. Fair Work says visa holders have the same workplace rights as all other employees, so the minimum wage rules apply to you in full. This guide is a practical check: how to find the right rate for your job and compare it with your payslip.

## What is the minimum wage in 2026-27?

Fair Work says that from the first full pay period starting on or after 1 July 2026:

- The national minimum wage is **$26.44 an hour**.
- For a full-time week of 38 hours, that is **$1,004.90**.
- Award minimum wages rose by **4.75%**.

These are amounts before tax.

## What is casual loading?

Most students work as casuals. Casuals do not get most types of paid leave, notice of termination or redundancy pay. Instead, they get a casual loading, which is a higher pay rate.

Fair Work says casuals covered by the national minimum wage get a **25% casual loading**. So the lowest casual rate is:

$26.44 × 1.25 = **$33.05 an hour**

If you are a casual and your hourly rate is $26.44, you may be underpaid. The casual loading is not a bonus that an employer can choose to give. It is part of the minimum pay for casual work.

## Why the national minimum may not be your rate

The national minimum wage applies when no award or agreement covers your job. But most jobs students do are covered by an award. Fair Work says awards contain the minimum wage and other conditions for particular industries and jobs.

Awards set different rates for different levels of experience and duties. Two people in the same shop can be on different levels. Awards may also have lower rates for juniors, apprentices and trainees.

So the question is not only "Am I above $26.44?" It is "Which award covers me, and what is my level?"

## How do you find your award rate?

Fair Work has free online tools:

- The **Pay Calculator** works out your pay rate and which award covers you.
- The **Pay and Conditions Tool** also calculates penalty rates.

You will need your industry, your job, whether you are casual or permanent, and your age. If you are not sure of your level, ask your employer which award and level you are on. A good employer can answer.

**Weekends and nights.** Fair Work says penalty rates are higher pay rates for particular hours or days. You may be entitled to them for weekends, public holidays, overtime, late night and early morning shifts. The rate depends on your award or agreement.

For students, this matters because many shifts are on weekends or at night. A Sunday shift may pay more per hour than a Tuesday shift. Your payslip should show each penalty rate separately, so you can check them one by one.

## How to check your payslip

Fair Work says your employer must give you a pay slip within 1 working day of payday. It must show:

- Your ordinary hourly rate and the hours at that rate.
- Any loadings, allowances and penalty rates.
- Your gross pay and net pay.
- Each deduction.
- Super contributions and the fund.

**Worked check.** A casual student works 15 hours in a week at a job covered only by the national minimum wage. The lowest pay is 15 × $33.05 = $495.75 before tax. If the payslip shows $396.60 (15 × $26.44), the casual loading is missing.

## What if your pay is too low?

- Check your award and level with the Fair Work Pay Calculator.
- Keep your rosters, payslips and messages about pay.
- Ask your employer in writing to check your rate.
- If it is not fixed, contact the Fair Work Ombudsman on 13 13 94. An interpreter is available on 13 14 50.

Fair Work says a visa will not be cancelled for contacting it for help. For any question about the hours your visa allows you to work, check your visa conditions with Home Affairs.

## What does this mean for your tax and super?

Your hourly rate affects your income for the year, and your income decides your tax. If you may be an Australian resident for tax purposes, the first $18,200 is tax-free for 2025-26, and rates rise after that. If you are a foreign resident, tax starts from the first dollar. Your employer also pays 12% super on top of your pay for ordinary hours.

**Example.** If you earn $33.05 an hour for 15 hours a week for 40 weeks of the year, that is $19,830 before tax. If you may be a resident for tax purposes, most of that is below the tax-free threshold. If you are a foreign resident, tax applies from the first dollar. Either way, your employer should add 12% super, about $2,380 for the year. A higher award rate would raise both your income and your super.

## Checklist

- Know the 2026-27 numbers: $26.44, or $33.05 for casuals with loading.
- Find your award and level with the Fair Work Pay Calculator.
- Check weekend and night rates on your payslip.
- Keep your payslips and rosters for each job.
- Ask for help early if something is wrong, while you still work there.

When it is time to lodge your tax return, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Does the minimum wage apply to international students?', a: 'Yes. Fair Work says visa holders have the same workplace rights as all other employees.' },
      { q: 'What is the lowest casual rate from 1 July 2026?', a: 'Casuals covered by the national minimum wage get a 25% loading, so at least $33.05 an hour. An award may set a higher rate.' },
      { q: 'Can my employer pay me less because I am on a student visa?', a: 'No. Your visa does not change your minimum pay. Your rate comes from your award or agreement, or the national minimum wage.' },
      { q: 'When did the new rates start?', a: 'From the first full pay period starting on or after 1 July 2026.' },
    ],
    sources: [
      { label: 'Fair Work: Minimum wage increase starts today (1 July 2026)', href: 'https://www.fairwork.gov.au/newsroom/media-releases/2026-media-releases/july-2026/20260701-minimum-wage-increase-media-release' },
      { label: 'Fair Work: Minimum wages fact sheet', href: 'https://www.fairwork.gov.au/tools-and-resources/fact-sheets/minimum-workplace-entitlements/minimum-wages' },
      { label: 'Fair Work: Casual employees', href: 'https://www.fairwork.gov.au/starting-employment/types-of-employees/casual-employees' },
      { label: 'Fair Work: Visa holders and migrants', href: 'https://www.fairwork.gov.au/find-help-for/visa-holders-migrants' },
    ],
  },
]
