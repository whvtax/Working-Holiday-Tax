import type { LongArticle } from '../types'

const ATO = 'https://www.ato.gov.au'
const FWO = 'https://www.fairwork.gov.au'

export const LONG_EN_08: readonly LongArticle[] = [
  {
    slug: 'multiple-jobs-tax-return-student-visa',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Several jobs on a student visa: one tax return for all of them',
    description: 'Every job you had in the year goes on one tax return. How students with two or three jobs check their income statements, avoid a tax bill and lodge at the right time.',
    answer: 'All the jobs you had in one financial year go on a single tax return, even a job that lasted one week. Wait until every income statement is "Tax ready", check each one against your payslips, and then lodge once with the full picture.',
    body: `Many international students work more than one job in a year. A café during the semester, a warehouse in the holidays, a few weeks of delivery work in between. At tax time, all of that income goes on one tax return. This guide explains how the ATO sees your jobs, why several jobs can change the result, and what to check before you lodge.

## How does the ATO already know about my jobs?

Most employers in Australia report your pay to the ATO each time they pay you. This system is called Single Touch Payroll. It sends your gross pay, the tax taken out and your super details to the ATO during the year.

At the end of the financial year, each employer finalises this information. It then appears in your myGov account as an income statement. You will have one income statement for each employer, so three jobs means three statements.

This means you do not need to remember every job yourself. If an employer reported your pay, the ATO has a record of it. Still, it helps to make your own list of every job and the dates you worked there.

## Why must every job be on the same return?

You lodge one tax return for each financial year (1 July to 30 June). The ATO compares your return with the records it holds from your employers. If an employer is missing from your return, the numbers will not match.

The ATO may then change your assessment and add the missing income. If you already received a refund, you may have to pay part of it back. It is much easier to include every job the first time.

- Include short jobs, even one or two shifts
- Include jobs through a labour hire or temp agency (the agency is usually the employer on the statement)
- Include cash wages and tips, because assessable income includes salary, wages, tips and other payments for your work

## Why can two jobs leave me with a tax bill?

Each employer takes tax out of your pay as if their job is your only job. They do not know what your other employer pays you. This matters most for students who may be Australian residents for tax purposes, because residents have a tax-free threshold of $18,200.

The ATO says you should generally claim the tax-free threshold from one payer only, usually the one that pays you the most. If you claim it from two employers, each one takes out less tax than it should. The total tax taken out is then too low for your combined income.

**A worked example.** Mei may be a resident for tax purposes. She earns $15,000 at a café and $15,000 at a supermarket in 2025-26. She claimed the tax-free threshold at both jobs, so each employer withheld very little tax. Her total income is $30,000. That is $11,800 above the $18,200 threshold. For 2025-26, the resident rate on income from $18,201 to $45,000 is 16%, so the tax on that part is $1,888 before any offsets.

Mei may get the low income tax offset, which is up to $700 for residents with taxable income up to $37,500. The offset can reduce her tax, but it cannot create a refund on its own. If too little was withheld during the year, she may still owe the difference. The Medicare levy is a separate question: many students are not entitled to Medicare and may claim an exemption with a Medicare Entitlement Statement.

## What if I am a foreign resident for tax purposes?

Foreign residents do not get a tax-free threshold. For 2025-26, foreign residents pay 30% from the first dollar up to $135,000. You should not claim the tax-free threshold from any employer.

Because there is no threshold, the problem in the example above does not happen in the same way. But mistakes still occur. An employer may use the wrong residency answer from your TFN declaration, or you may have started a job before your TFN arrived. If you did not give an employer your TFN within 28 days, they must take tax at the top rate plus the Medicare levy. That extra tax is worked out on your return.

## When should I lodge if I had several jobs?

Wait until every income statement says "Tax ready". Most employers finalise their reports by 14 July. Some small employers finalise later.

If you lodge before all your statements are ready, one job may be missing or the figures may change. You would then need to amend your return. Waiting a few extra weeks is usually better than fixing it later.

If an employer never finalises, or you cannot see a job you know you had, contact the employer first. Ask for your final pay details. You can also ask the ATO for help if the employer does not respond.

## How do I check each income statement?

Look at each statement on its own, then compare it with your payslips.

- Check the gross pay is close to the total on your last payslip for that job
- Check the tax withheld looks reasonable for your pay
- Check the super amount shown, and compare it with your super fund account
- Check the employer name, so you can match it to the right job

If one employer took out much more tax than the others, there may be a reason. You may have started without a TFN, or that employer used the wrong rate. If one employer took out very little tax, check whether you claimed the tax-free threshold there as well as at your main job.

## What should I keep for a return with several jobs?

Most of your income information comes from your employers through the ATO. But your own records are still important for checking and for deductions.

- Your last payslip from each job
- A note of any cash payments that were not on a payslip
- Receipts for work expenses, recorded against the job they relate to
- The dates you started and finished each job

## Your next steps

- Make a list of every job you had between 1 July and 30 June
- Log in to myGov and check that each job has an income statement marked "Tax ready"
- If you are a resident with two jobs, check you claimed the tax-free threshold from one employer only
- Fix your TFN declaration now if you claimed it twice, so next year is right
- Lodge one return that includes every job

If you want a hand putting several jobs on one return, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'I worked one shift and never went back. Does it go on my return?', a: 'Yes. All employment income in the financial year goes on your return, however small. If the employer reported it, the ATO already has it on record.' },
      { q: 'One of my employers has not finalised my income statement. What should I do?', a: 'Wait, and contact the employer to ask when they will finalise. If you lodge before every statement is "Tax ready", you may need to amend your return later.' },
      { q: 'Can I claim the tax-free threshold at both jobs if each pays less than $18,200?', a: 'The ATO says to generally claim it from one payer only. If your total income from all jobs goes above the threshold, claiming it twice can leave you with a tax bill.' },
      { q: 'Do I need a separate tax return for each job?', a: 'No. You lodge one tax return for each financial year, and it includes the income from all your jobs.' },
    ],
    sources: [
      { label: 'ATO: Income from more than one job', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job` },
      { label: 'ATO: Access your income statement', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/access-your-income-statement` },
      { label: 'ATO: Low income tax offset', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/tax-offsets/low-income-tax-offset` },
      { label: 'ATO: Assessable income', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/income-you-must-declare/taxable-assessable-and-exempt-income` },
    ],
  },
  {
    slug: 'student-to-graduate-visa-485-tax',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'From a student visa to a 485 visa: what changes for your tax',
    description: 'Moving from a 500 student visa to a 485 graduate visa? Your TFN stays the same, but residency, Medicare, super and your next tax return are worth a fresh check.',
    answer: 'Your TFN, your super and the way you lodge stay the same when you move from a student visa to a 485 graduate visa. What you should check again is your residency for tax purposes, your Medicare position and how a year with two visas goes on one return.',
    body: `Finishing your course and moving to a 485 (temporary graduate) visa is a big step. Many graduates start full-time work for the first time, so their income goes up. The tax rules do not change because of the new visa itself, but some of your answers may change. This guide covers what to check.

Work conditions on a 485 visa are a visa matter, not a tax matter. Check your own visa conditions with the Department of Home Affairs.

## Do I need a new TFN?

No. Your tax file number is yours for life. It stays the same when your visa changes, when you change jobs and if you leave Australia and come back.

Do not apply for a second TFN. Keep using the same number with every employer, your super fund and your tax return. If you have lost your TFN, you can usually find it in your myGov account linked to the ATO, or on an old payslip or notice of assessment.

## How does a year with two visas work?

The Australian financial year runs from 1 July to 30 June. Your visa can change at any time in that year. You still lodge one tax return for the whole financial year.

That one return includes income from your time on the student visa and your time on the 485 visa. You do not split it into two returns. Your income statements will show each employer, whatever visa you held when you worked there.

## Will my residency for tax purposes change?

Residency for tax purposes is not decided by your visa type alone. It depends on your circumstances. The ATO says overseas students enrolled in a course of 6 months or more may be Australian residents for tax purposes.

When your course ends and you start a 485 visa, your circumstances change. You are no longer studying, you may work full-time and you may stay in Australia for longer. You may still be a resident for tax purposes, but it is worth looking at the question again, not just copying last year's answer.

The answer matters because it changes your tax rates. For 2025-26:

- Residents have a tax-free threshold of $18,200, then 16% from $18,201 to $45,000, 30% from $45,001 to $135,000, 37% from $135,001 to $190,000 and 45% over $190,000
- Foreign residents pay 30% from the first dollar up to $135,000, then 37%, then 45%, with no tax-free threshold

If you start a new job on your 485 visa, your TFN declaration asks if you are a resident for tax purposes. Answer based on your current situation.

## Should I check my Medicare position again?

Yes. On a student visa, many students are not entitled to Medicare and have Overseas Student Health Cover (OSHC) instead. They may claim a Medicare levy exemption with a Medicare Entitlement Statement (MES) from Services Australia.

An MES is needed for each year you claim the exemption. Applications open from 1 July, and the ATO says it can take up to 8 weeks, so wait for it before you lodge. If you move to a 485 visa during the year, your health cover and Medicare position may be different. If you are from a country with a reciprocal health care agreement, you may be entitled to Medicare. In that case you cannot get an MES.

## What happens to my super?

Your super stays in your fund and keeps growing. Your employer pays super for you as a 485 visa holder in the same way as on a student visa. From 1 July 2026, employers pay super at the same time as wages.

You cannot claim your super as a Departing Australia Superannuation Payment (DASP) while you hold any active temporary visa. Moving to a 485 visa means you are not eligible yet. The DASP comes later, after you leave Australia and your visa has ended, if you do not get another visa.

A new full-time job often means a new super fund. Your new employer should use your existing fund if you do not choose one. Check that you are not opening an extra account without a reason.

## What if I do ABN work on a 485 visa?

Some graduates start freelance or contract work. You are entitled to an ABN only if you are running your own business. An employer should not ask you to get an ABN as a condition of employment.

ABN income has no tax taken out. It goes on your tax return with your business expenses, and you may owe tax on it. Put some money aside from each payment.

## Can I still claim study costs?

Self-education costs are deductible only if the study has a direct connection to the job you have now. The study must keep or improve the skills for your current job, or be likely to increase your income from it. Study to get a new job does not count. Most course fees for your degree do not meet this rule, so do not assume you can claim them.

## Your checklist for the year you change visa

- Keep the same TFN and give it to every new employer
- Look again at your residency for tax purposes before you fill in a new TFN declaration
- Claim the tax-free threshold from one employer only, if you may be a resident
- Check your Medicare position and apply for an MES if you need one
- Check that your new employer pays super into your existing fund
- Lodge one return for the whole financial year after your income statements are "Tax ready"

If your year included both visas and you would like help with the return, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Do I lodge two returns in the year I change from a student visa to a 485 visa?', a: 'No. You lodge one return for the whole financial year, from 1 July to 30 June. It includes income from both visa periods.' },
      { q: 'Can I claim my super when my student visa ends and my 485 visa starts?', a: 'No. The DASP is only available after you have left Australia and you hold no active temporary visa. A 485 visa is an active visa.' },
      { q: 'Am I a resident for tax purposes on a 485 visa?', a: 'You may be. Residency depends on your circumstances, not only your visa, so look at it again when your course ends and your situation changes.' },
    ],
    sources: [
      { label: 'ATO: Studying in Australia', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia` },
      { label: 'ATO: Not entitled to Medicare benefits', href: `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/not-entitled-to-medicare-benefits` },
      { label: 'ATO: Departing Australia superannuation payment', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp` },
      { label: 'ATO: Self-education expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/education-training-and-seminars/self-education-expenses` },
    ],
  },
  {
    slug: 'dasp-documents-checklist-international-students',
    category: 'Super',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'DASP paperwork for former students: certified copies explained',
    description: 'Claiming your super after your student visa ends? What the online DASP system asks for, when a paper claim needs certified copies, and who can certify them overseas.',
    answer: 'The free ATO online DASP system checks your visa and departure for you, so you mainly need your passport, contact details and super fund details. A paper claim needs certified copies, and for $5,000 or more it needs a Certification of Immigration Status from Home Affairs.',
    body: `When you leave Australia after your studies, you can claim the super your employers paid for you. This is called a Departing Australia Superannuation Payment (DASP). The paperwork is where many claims slow down, especially when you are already back home. This guide explains what you need for each way of claiming.

## Can I claim yet?

Before you gather documents, check that you are eligible. You can generally claim a DASP when all of these are true:

- You received super while working in Australia on a temporary visa (not a 405 or 410 visa)
- Your visa has ended (it expired or was cancelled)
- You have left Australia
- You do not hold another active visa, such as a 485 graduate visa
- You are not an Australian citizen, a permanent resident or a New Zealand citizen

You can start the online application before you leave, but you cannot submit it while a temporary visa is still active. You can check your visa status in VEVO.

## Should I use the online system or a paper form?

The ATO has a free online DASP application system. For most former students, it is the simpler choice. It checks your visa status and departure with the Department of Home Affairs records, so you usually do not need to post certified copies.

A paper form is the other option. You send it with certified documents to each super fund. Paper claims take more work, and the document rules depend on the amount you are claiming.

## What does the online system ask for?

Have these ready before you start:

- Your personal details and an email address
- The country and number of your passport (the one you used in Australia)
- Your TFN, if you have it (it is optional but helps match your accounts)
- Details of each super fund, including the fund's ABN and your member number

The ATO says the eligibility check takes about 45 seconds and the application takes about 30 minutes. Its service standard is 28 days from a complete application. You make a separate claim for each fund.

## What do I need for a paper claim under $5,000?

For a paper application where the amount is less than $5,000, the ATO form instructions say you can give certified copies of:

- Your visa, or evidence that you held a temporary visa that is no longer in effect
- Your passport page with the departure stamp you received when you left Australia

Your fund may also ask for proof of identity. Contact the fund to confirm what it needs before you post anything.

## What if my claim is $5,000 or more?

For a paper claim of $5,000 or more, you must apply to the Department of Home Affairs for a Certification of Immigration Status. This confirms your visa has ended and you have left. You do not send that application form to your fund or to the ATO. It goes to Home Affairs.

This adds a step and some waiting time. It is one more reason the online system is usually easier for a large balance.

## Who can certify a copy?

A certified copy is a copy that an authorised person has compared with the original. They write or stamp "certified true copy" and add their signature, printed name, qualification and the date.

In Australia, the list includes a Justice of the Peace, a solicitor, a doctor, a police officer, and a bank, building society or credit union officer with at least five years of service, among others.

Outside Australia, the first choice is consular staff at an Australian embassy, high commission or consulate. If none is available, a notary public, a Justice of the Peace, a judge, or a registrar or deputy registrar of a court may certify. If none of these is available, ask your fund whether it will accept another form of certification.

**Tip:** if you are still in Australia, get your copies certified before you fly. It is usually easier and cheaper here than overseas.

## What about name changes and documents in another language?

If your name has changed, for example after marriage, you must give certified copies of documents that show the change. This applies whatever amount you claim.

If a document is not in English, you need an official translation from an approved translation service. You then give certified copies of both the original and the translation.

**Common paperwork problems.** These are the issues that slow down claims most often:

- The name on your super account does not match your passport
- You renewed your passport, and the fund only knows the old number
- The certifier is not on the accepted list
- You sent a claim to a fund that holds no money for you

Before you apply, log in to myGov and check ATO online services. It shows the super accounts linked to your TFN, so you can claim from every fund, not just the one you remember.

## Your DASP paperwork checklist

- Confirm your visa has ended and you hold no other visa
- List every super fund with its ABN and your member number
- Keep a copy of the passport you used in Australia, and the new one if you renewed it
- Use the free ATO online system if you can
- For a paper claim, check the amount: under $5,000 needs certified copies, $5,000 or more needs a Certification of Immigration Status
- Certify copies before you leave Australia if you can
- If six months have passed since you left and your visa ended, check whether your super has moved to the ATO`,
    faq: [
      { q: 'Does the online DASP system cost anything?', a: 'No. The ATO online DASP application system is free to use.' },
      { q: 'Can I get my documents certified in my home country?', a: 'Yes. Consular staff at an Australian embassy, high commission or consulate can certify copies. If none is available, a notary public, Justice of the Peace, judge or court registrar may certify, or ask your fund what else it accepts.' },
      { q: 'Do I need a separate claim for each super fund?', a: 'Yes. Each fund pays out its own balance, so you make a claim for each fund that holds money for you.' },
    ],
    sources: [
      { label: 'ATO: Departing Australia superannuation payment', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp` },
      { label: 'ATO: Help with the DASP online application system', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system` },
      { label: 'ATO: Departing Australia super payment application, how do I complete this form', href: `${ATO}/forms-and-instructions/departing-australia-super-payment-application/how-do-i-complete-this-form` },
    ],
  },
  {
    slug: 'dasp-tax-rate-international-students',
    category: 'Super',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'DASP tax for international students: usually 35%, not 65%',
    description: 'Super from student work is usually taxed at 35% when you claim it after leaving, not the 65% working holiday rate. How the DASP rates work, with worked examples.',
    answer: 'If you never held a 417 or 462 working holiday visa, the taxed element of your DASP is taxed at 35%, the untaxed element at 45% and any tax-free component at 0%. The 65% rate applies to the whole payment if it includes any super from contributions made while you held a 417 or 462 visa.',
    body: `Many students read online that super is taxed at 65% when you leave Australia. That rate is real, but it is for working holiday makers. For most international students, the rate is lower. This guide explains which rate applies to you and what you can expect to receive.

## What are the DASP tax rates?

When you claim your super after leaving Australia, the payment is called a Departing Australia Superannuation Payment (DASP). Your fund takes the tax out before it pays you. The rates depend on the part of your super and on your visa history:

- **Tax-free component:** 0%
- **Taxed element:** 35%, if you never held a 417 or 462 visa
- **Untaxed element:** 45%, if you never held a 417 or 462 visa
- **Whole payment, if it includes super from contributions made while on a 417 or 462 visa:** 65%

Your fund works out the rate from the visa information on your DASP application. You do not lodge a tax return for the DASP, and you cannot claim the tax back later.

## What do these parts of my super mean?

Most of a student's super comes from employer contributions. These are the payments your employer makes for you, at 12% of your earnings for most employees, plus any investment earnings. In most funds, this is the taxed element.

The tax-free component usually comes from personal contributions you made from your own after-tax money. Few students make these, so for most students the tax-free part is small or nil.

The untaxed element is rare. It mainly appears in some public sector funds. Your fund statement or your fund can tell you what parts your balance has.

## What will I receive? A worked example

Arjun studied in Australia on a student visa and never held a working holiday visa. After he leaves and his visa ends, his super balance is $6,000. All of it is in the taxed element.

- Tax at 35%: $2,100
- Amount paid to Arjun: $3,900

If Arjun had $500 of that $6,000 as a tax-free component, only $5,500 would be taxed at 35%. The tax would be $1,925 and he would receive $4,075.

Fund fees and investment returns change the balance a little until the day the fund pays you. If you have more than one fund, each fund takes the tax out of its own payment, so you will receive one payment from each fund. Your fund will also give you a payment summary that shows the gross amount, the tax withheld and the net amount paid. Keep it with your records.

## When does the 65% rate apply to a former student?

The ATO applies the 65% rate to the whole payment if it includes any super from contributions made while you held a 417 or 462 working holiday visa. Some people came to Australia on a working holiday visa first, then later studied on a student visa. Their super history is mixed.

In that case, one rate applies to the whole payment from that fund, not a different rate to each part. The fund uses the visa details on your application to work this out.

**Example with a mixed history.** Sofia worked on a 417 visa and received $4,000 of super. Later she studied on a student visa and received $6,000 of super. All of it is taxed element.

- Total payment from the fund: $10,000, which includes the $4,000 from the 417 period
- Tax at 65% on the whole payment: $6,500
- Sofia receives $3,500

This is why it is important to list your visas correctly on the DASP application. If you never held a working holiday visa, make sure the application shows that.

## Can anyone reduce the DASP tax?

No. The rates are set by law and the fund takes the tax out before it pays you. No deduction, offset or agent can lower them. Be careful of anyone online who offers a "better rate" for your super. They may be trying to collect your passport, TFN and bank details.

The ATO online DASP system is free. You do not need to pay anyone to use it.

## Is it worth claiming if tax is taken?

For most former students, yes. If you do not claim, your super stays in Australia. About 6 months after you leave and your visa ends, your fund transfers the unclaimed super to the ATO. You can still claim it from the ATO later, but the DASP tax rates still apply when you do.

Claiming soon after you leave means you deal with it while your details are fresh. You still have access to your email, your Australian bank details and your old documents.

## DASP and your final tax return are separate

Your DASP is not part of your tax return. Your final tax return covers the wages you earned in your last financial year in Australia. It may bring a refund or a bill, depending on what you earned and what tax was taken out.

Many students who leave need to lodge after 30 June, and you can lodge from overseas. Keep an Australian bank account open, if you can, so any refund can be paid.

## Your DASP checklist

- Check if you ever held a 417 or 462 visa, and list all your visas correctly
- Find every super fund in your name through ATO online services in myGov
- Wait until your visa has ended and you have left Australia
- Apply through the free ATO online DASP system, one claim for each fund
- Lodge your final tax return separately after 30 June`,
    faq: [
      { q: 'I only had a student visa. Will my super be taxed at 65%?', a: 'No. If you never held a 417 or 462 visa, the taxed element of your DASP is taxed at 35%. The 65% rate applies only when the payment includes super from contributions made while on a 417 or 462 visa.' },
      { q: 'Do I need to put my DASP on my tax return?', a: 'No. The fund takes the DASP tax out before paying you, and the payment does not go on your Australian tax return.' },
      { q: 'What happens if I do not claim my super?', a: 'About 6 months after you leave and your visa ends, your fund transfers it to the ATO. You can still claim it later from the ATO, and the same DASP rates apply.' },
    ],
    sources: [
      { label: 'ATO: Departing Australia superannuation payment', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp` },
      { label: 'ATO: Departing Australia super payment summary instructions', href: `${ATO}/forms-and-instructions/departing-australia-super-payment-summary-instructions` },
      { label: 'ATO: Work out if you have to pay super', href: `${ATO}/businesses-and-organisations/super-for-employers/work-out-if-you-have-to-pay-super` },
    ],
  },
  {
    slug: 'super-multiple-funds-international-students',
    category: 'Super',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Several super funds as a student: how to find and combine them',
    description: 'Casual jobs often leave students with two or three super accounts. How to see them all in myGov, when combining them makes sense and when to leave them until you leave.',
    answer: 'You can see every super account linked to your TFN in ATO online services through myGov, and move balances into one fund there. Combining usually makes sense while you are still working in Australia, but check insurance and fees in the old funds first.',
    body: `A student who has three casual jobs during a degree can easily end up with three super accounts. Each account may charge its own fees. When you leave Australia, each fund needs its own DASP claim. This guide explains how to find all your accounts and how to decide whether to combine them.

## Why do students end up with several super funds?

When you start a job, your employer gives you a form to choose a super fund. Many students do not choose. They are new to Australia and do not know any funds, so they leave the form blank.

For employees who started a job after 1 November 2021, an employer must ask the ATO for your "stapled" fund if you do not choose one. A stapled fund is an existing super account linked to you, so it can follow you from job to job. This has reduced the problem, but it does not always stop it.

Students who started work before that date, or whose first job was their first account, may still have an extra account from each early job.

## What does an extra account cost?

Every fund charges its own fees, and many include insurance by default. On a small balance, these costs can take a large share of the money over time.

- Each account usually has its own administration fee
- Some accounts have insurance premiums taken out
- A small account with no new contributions can shrink over time

Before you combine accounts, the ATO says to check two things in the old fund. First, you may lose insurance cover when you close an account. Second, some funds may charge exit or entry fees. If you are not sure, contact the fund and ask.

## How do I see all my super accounts?

The most complete list is in ATO online services. Log in to myGov, open the ATO section and go to the super area. There you can:

- See your super accounts, including lost accounts
- See unclaimed super that is held by the ATO
- See contributions your employers reported
- Combine accounts

Some accounts may not show, and the information has an "as at" date. Check that date, because recent contributions may not appear yet.

## How do I combine my accounts?

In ATO online services, go to Super, then Manage, then Transfer super. This moves the whole balance of an account into another fund you choose.

Combining your accounts does not change where your employer pays your super in the future. If you want your current employer to pay into the fund you are keeping, give them a super choice form with that fund's details.

**An example.** Lina has three accounts from three jobs: $1,800, $900 and $400. Her current job pays into the first fund. She checks that the other two do not have insurance she needs. She transfers both balances into the first fund in ATO online services. She now has one account of about $3,100, before fees, and only one set of fees.

## When is it better to wait?

Combining works best while you are still in Australia and still working. It is easy to do online, and you then have one account for the rest of your stay.

If you are leaving Australia in the next few weeks, a transfer may still be in progress when you want to claim your DASP. In that case, it can be simpler to leave the accounts as they are. After you leave and your visa ends, you make a DASP claim for each fund. It is more paperwork, but each claim works on its own.

If you might move to a 485 graduate visa or stay longer, combining now is usually worth it. You will keep working for some years, and every year with extra accounts can mean extra fees.

Before you choose the fund to keep, compare a few things: the fees, the insurance it includes, and how easy it is to use from overseas. The fund your current employer pays into is often the simplest choice, because new contributions already go there.

## What if a fund has already moved my money to the ATO?

Some funds send small inactive accounts, or accounts they have lost contact with, to the ATO. If you have left Australia, unclaimed super moves to the ATO about 6 months after you leave and your visa ends. This money is not lost. It shows in ATO online services as ATO-held super, and you can still claim it.

## Watch out for super scams

Be careful of anyone who contacts you and offers to find or combine your super. Some ask for your TFN, a passport scan or your fund password. With these, a scammer can move your money.

- Use only ATO online services or your fund's own website
- Never share your super fund password
- Anyone who charges for tax services must be registered with the Tax Practitioners Board, and you can check their name on the public register

## Your checklist

- Log in to myGov and list every super account in your name
- Check each old fund for insurance and fees before you close it
- Transfer old balances into the fund you want to keep, through Super, Manage, Transfer super
- Give your current employer your chosen fund's details
- If you are leaving soon, decide whether to wait and claim a DASP from each fund instead`,
    faq: [
      { q: 'Will combining my funds change where my employer pays my super?', a: 'No. Combining moves your existing balances. To change where your employer pays from now on, give them your chosen fund details on a super choice form.' },
      { q: 'Is it free to combine super in myGov?', a: 'The ATO online service itself does not charge you, but the old fund may have exit fees and you may lose insurance. Check with the fund first.' },
      { q: 'I am leaving Australia soon. Should I combine my funds first?', a: 'Often it is simpler not to. A transfer that is still in progress can delay a DASP claim, so many people leave the accounts and make one claim for each fund.' },
    ],
    sources: [
      { label: 'ATO: Keeping track of your super online', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/keeping-track-of-your-super-online` },
      { label: 'ATO: Transferring or consolidating your super', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/transferring-or-consolidating-your-super` },
      { label: 'ATO: What is an employee\'s stapled super fund', href: `${ATO}/Business/Super-for-employers/Setting-up-super-for-your-business/Offer-employees-a-choice-of-super-fund/Request-stapled-super-fund-details-for-employees/` },
    ],
  },
  {
    slug: 'dasp-rejected-international-students',
    category: 'Super',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'DASP claim declined? Common reasons for former students',
    description: 'A declined DASP claim does not mean your super is lost. The usual reasons former students are refused, from an active 485 visa to a name mismatch, and how to fix them.',
    answer: 'A declined DASP claim usually has a simple cause: a visa is still active, your details do not match the fund, the fund holds none of your money, or your documents were not accepted. Your super stays in the fund, and you can apply again once you fix the problem.',
    body: `You have finished your studies, left Australia and applied for your super. Then the claim comes back declined. This is stressful, but your money has not gone anywhere. It stays in your super fund, or with the ATO, until a claim is approved. This guide explains the common reasons and what to do about each one.

## First, what does the notice say?

Read the notice from your fund or the ATO carefully. Some notices give a clear reason. Others only say the claim could not be processed. If the reason is not clear, contact the fund and ask what is missing or wrong.

Then go through the reasons below. Most declined claims fit one of them.

## Reason 1: a visa is still active

You cannot get a DASP while you hold any active temporary visa. This is the most common problem for former students, because many have more than one visa over time.

- Your student visa may not have ended yet, even if your course has finished
- You may have been granted a 485 graduate visa or another visa
- You may hold a visa that you forgot about or applied for later

Check your status in VEVO. The ATO online DASP system will not let you submit while a temporary visa is still active. If a visa is active, you must wait until it ends. Questions about your visa itself are for the Department of Home Affairs.

**You have not left Australia, or the record is not updated.** You must have left Australia to claim. If you applied on the day you flew out, the records may not show your departure yet. Wait a little and apply again. If your departure still does not show after some time, contact the Department of Home Affairs about your travel record.

## Reason 2: your details do not match the fund

Your fund compares your claim with its own records. If your name, date of birth or passport number is different, the claim may fail.

This often happens because an employer typed your name quickly when they set up the account. A middle name may be missing, or your family name and given name may be the wrong way around.

- Ask the fund to correct its records first, then apply again
- If you renewed your passport, give the details of the passport you used in Australia, and tell the fund about the new one
- If your name changed, for example after marriage, you need certified copies of documents that show the change

## Reason 3: the fund holds none of your money

Some students apply to the fund they remember, not the fund their employer actually paid. If the fund has no balance for you, it cannot pay a DASP.

Before you apply again, check ATO online services in myGov. It shows the super accounts linked to your TFN. You may find you have two or three funds, and each needs its own claim. Write down each fund name, its ABN and your member number. You will need these details for the online application. If you cannot log in to myGov from overseas, update your sign-in settings, or ask your former employer which fund they paid.

## Reason 4: your documents were not accepted

This applies mainly to paper claims. The certifier may not be on the accepted list, a copy may not be certified correctly, or a document may not be in English.

- Outside Australia, consular staff at an Australian embassy, high commission or consulate are the first choice
- If they are not available, a notary public, Justice of the Peace, judge or court registrar may certify
- A document not in English needs an official translation, with certified copies of both

For a paper claim of $5,000 or more, you need a Certification of Immigration Status from Home Affairs. Using the free ATO online system instead avoids most document problems, because it checks your visa and departure records for you.

## Reason 5: your money has moved to the ATO

About 6 months after you leave Australia and your visa ends, your fund must transfer unclaimed super to the ATO. If this has happened, the fund will tell you it no longer holds your money.

Your super is not lost. You can still claim it as a DASP, but now from the ATO. The online DASP system can handle super held by the ATO.

## Your checklist before you apply again

The ATO service standard for the online system is 28 days from a complete application. A claim that is missing information takes longer. Getting every detail right the second time is the fastest way to be paid. Before you submit again, go through this list and fix each item:

- Check VEVO and confirm you hold no active visa
- Confirm your departure from Australia is recorded
- Check that your name, date of birth and passport number match the fund's records
- Check every fund in ATO online services, and claim from each one that holds money
- Check whether any super has moved to the ATO
- Use the free ATO online system if you can

Remember that your DASP and your final tax return are separate. If you have not lodged your final return yet, you can still do so from overseas. Keep an Australian bank account open if you can, so any refund can be paid into it.`,
    faq: [
      { q: 'Is my super lost if my DASP claim is declined?', a: 'No. Your super stays in the fund, or with the ATO, until a claim is approved. Fix the problem and apply again.' },
      { q: 'I have a 485 visa. Why was my claim declined?', a: 'A 485 graduate visa is an active temporary visa. You cannot get a DASP while you hold any active temporary visa.' },
      { q: 'The fund says it no longer has my money. Where is it?', a: 'If you left Australia more than about 6 months ago and your visa ended, the fund may have sent it to the ATO. Check ATO online services and claim it from the ATO.' },
    ],
    sources: [
      { label: 'ATO: Departing Australia superannuation payment', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp` },
      { label: 'ATO: Help with the DASP online application system', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system` },
      { label: 'ATO: Departing Australia super payment application, how do I complete this form', href: `${ATO}/forms-and-instructions/departing-australia-super-payment-application/how-do-i-complete-this-form` },
    ],
  },
  {
    slug: 'report-unpaid-super-international-students',
    category: 'Super',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Super missing from your fund? How students report it to the ATO',
    description: 'If your payslip shows super but your fund does not, you can act. A step by step guide for international students: check, ask your employer, then report unpaid super.',
    answer: 'First check your super fund account or ATO online services to see if the money arrived. If it is missing, ask your employer in writing, and if that does not fix it, report the unpaid super to the ATO with its online tool.',
    body: `Super is money your employer pays into a super fund for you, on top of your wages. International students are entitled to it in the same way as other employees. Sometimes the super shows on your payslip but never reaches your fund. This guide gives you the steps to check and report it.

## Am I entitled to super as a student?

Generally, yes. The ATO says all employees are generally eligible for super guarantee, whether they work full-time, part-time or casual. This includes temporary residents such as international students. The rate is 12% of your earnings.

There is one exception to know. If you are under 18, your employer only has to pay super for weeks when you work more than 30 hours.

Your visa type does not change this. It also does not matter how few hours you work each week, if you are 18 or older.

## When should super arrive in my fund?

The rules changed on 1 July 2026. This is called Payday Super.

- **From 1 July 2026:** employers must pay super at the same time as your wages, and it must reach your fund within 7 business days
- **For a new employee:** the first contribution has a longer period, within 20 business days
- **Before 1 July 2026:** employers could pay super quarterly, and it was due by 28 October, 28 January, 28 April and 28 July

So if you are checking super for work done after 1 July 2026, you should see it in your fund soon after each payday. For older periods, look for one payment for each quarter.

## Step 1: check your fund, not just your payslip

Your payslip must show the super your employer says it will pay, and the name of the fund. But a line on a payslip is not proof that the money was paid.

Log in to your super fund's website or app, and look at the list of contributions. You can also check ATO online services in myGov, which shows contributions employers reported. Compare the dates and amounts with your payslips. Remember that the ATO information has an "as at" date, so the most recent payments may not appear yet.

If you do not know which fund your employer used, look at your payslip. It must show the name of the fund your super is paid into. If the payslip shows a fund you have never heard of, the employer may have opened a new account for you, or used your stapled fund.

**An example.** Tomás earned $1,000 a week at a restaurant. At 12%, his super should be about $120 for each week. His payslips show the super, but his fund shows no payments for two months. That is about $1,000 of super that may be missing.

## Step 2: ask your employer in writing

Many problems are mistakes. The employer may have the wrong fund details or member number, or a payment may have failed.

Send a short, polite message or email. Include your full name, the dates you worked, the fund name and your member number. Ask when the missing super will be paid. Keep a copy of what you send and any reply. Give the employer a fair amount of time to answer, but do not wait for months. If you no longer work there, you can still send the request. Your right to super does not end when the job ends.

## Step 3: report it to the ATO

If your employer does not fix it, use the ATO online tool to report unpaid super. You will usually need:

- Your TFN
- The period of the unpaid super
- Your employer's ABN, if you know it (it is often on your payslip)

The ATO will tell you if it can act to collect the super. It cannot collect in every case, but it holds the wage and super information employers report, which helps it check. Anyone can use the tool, including people on a temporary visa.

## What if my wages are wrong too?

Unpaid super often comes with other problems, like low pay rates or missing payslips. Wage problems are a matter for the Fair Work Ombudsman. You can call them on 13 13 94, or use the interpreter service on 13 14 50.

Visa holders have the same workplace rights as other employees. The Fair Work Ombudsman says your visa will not be cancelled for contacting them for help.

## What if I am leaving Australia soon?

Report the problem before you leave if you can. It is easier to follow up while you still have an Australian phone number and access to your accounts.

When you claim your super as a DASP, the fund can only pay what is in your account. Super that your employer never paid is not in the fund. If the ATO later collects it, it can be paid into your fund, and you may need to make another claim. Keep your email address and fund login active after you leave.

## Your checklist

- Find your payslips and note the super amount for each pay
- Check your fund account and ATO online services for the payments
- Ask your employer in writing, with your fund details
- If nothing changes, report it with the ATO online tool
- Contact the Fair Work Ombudsman if your wages or payslips are wrong too
- Keep records of every message and every payslip`,
    faq: [
      { q: 'My payslip shows super. Does that mean it was paid?', a: 'No. A payslip shows what the employer says it will pay. Check your fund account or ATO online services to see if the money actually arrived.' },
      { q: 'Can I report unpaid super if I am on a student visa?', a: 'Yes. Anyone can use the ATO tool to report unpaid super, including temporary visa holders.' },
      { q: 'Is super paid with every pay now?', a: 'From 1 July 2026, employers must pay super at the same time as wages, and it must reach your fund within 7 business days. Before then, employers could pay quarterly.' },
    ],
    sources: [
      { label: 'ATO: Work out if you have to pay super', href: `${ATO}/businesses-and-organisations/super-for-employers/work-out-if-you-have-to-pay-super` },
      { label: 'ATO: How Payday Super works', href: `${ATO}/businesses-and-organisations/super-for-employers/about-payday-super` },
      { label: 'ATO: Report unpaid super contributions from my employer', href: `${ATO}/calculators-and-tools/super-report-unpaid-super-contributions-from-my-employer` },
      { label: 'Fair Work Ombudsman: Visa holders and migrants', href: `${FWO}/find-help-for/visa-holders-migrants` },
    ],
  },
  {
    slug: 'workplace-injury-student-visa-rights',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Injured at work on a student visa: your rights and next steps',
    description: 'Hurt at work while studying in Australia? How workers compensation works for students, what to do first, who to contact in your state and what it means at tax time.',
    answer: 'As an employee on a student visa, you have the same workplace rights as other workers, including workers compensation. It can pay your wages while you are not fit for work and your medical and rehabilitation costs. Each state and territory runs its own scheme.',
    body: `Many students work in jobs with a real risk of injury: kitchens, warehouses, cleaning, delivery and care work. If you are hurt at work, you may worry about money, your studies and your visa. This guide explains the basic rights you have and the first steps to take.

## Do I have the same rights as other workers?

Yes. The Fair Work Ombudsman says visa holders have the same workplace rights as all other employees. Being on a student visa does not take away your right to a safe workplace or to workers compensation as an employee.

## What does workers compensation pay for?

Workers compensation is a system for employees who are injured or become ill because of their work. The Fair Work Ombudsman says it includes payments to cover:

- Your wages while you are not fit for work
- Your medical expenses
- Your rehabilitation

The exact rules, amounts and time limits are not the same everywhere. They are set by each state and territory.

**Who runs it.** Each state and territory has its own workers compensation regulator. For example, Victoria has WorkSafe Victoria and Queensland has WorkCover Queensland. The scheme that applies is usually the one for the state where you work.

The regulator can explain your rights, the claim process and the time limits in your state. The Fair Work Ombudsman does not handle workers compensation claims, so contact the regulator in your state or territory.

## What should I do straight after an injury?

The details depend on your state, but these steps help in every case:

- **Get medical help first.** If the injury is serious, call 000.
- **Tell your employer as soon as you can.** Do it in writing if possible, for example by email or text, so there is a dated record.
- **See a doctor and say it happened at work.** Ask the doctor about the workers compensation certificate used in your state.
- **Write down what happened.** Note the date, time, place, what you were doing and who saw it.
- **Keep every document.** Keep medical certificates, receipts, messages and your payslips.
- **Contact your state regulator** if you are not sure how to make a claim.

Do not wait to see if the injury gets better. Many claims become harder when the injury is reported late.

If you cannot attend classes or exams because of the injury, tell your university or college as well. Most have a process for special consideration or extensions, and a medical certificate helps. This is separate from your workers compensation claim, but it can protect your studies while you recover.

## What about my OSHC and Medicare?

Most students have Overseas Student Health Cover (OSHC) as part of their visa, and many are not entitled to Medicare. Workers compensation is the system meant to pay for treatment of a work injury.

Tell your doctor, hospital or physiotherapist that the injury happened at work. If you are asked to pay, keep the receipts and ask your employer's insurer or your state regulator how to claim them. Your OSHC insurer can tell you what it covers.

## What if my employer says I should not claim?

Some workers are told that a claim will cost them their job or their visa. Do not let this stop you from getting help. The Fair Work Ombudsman says your visa will not be cancelled for contacting it for help with your workplace rights.

The Fair Work Act also protects you from being treated badly for using a workplace right, such as making a complaint or inquiry about your job. If you are dismissed or threatened, contact the Fair Work Ombudsman on 13 13 94, or through the interpreter service on 13 14 50.

## What if I work with an ABN?

Workers compensation generally covers employees. If you are a genuine contractor running your own business, you may not be covered in the same way. Contractors often arrange their own insurance.

But having an ABN does not on its own make you a contractor. If the business controls how, where and when you work, you may really be an employee. If you think you were wrongly treated as a contractor, contact the Fair Work Ombudsman and your state regulator.

## How does an injury affect my tax return?

If you could not work for some weeks, your income for the year may be lower. Your tax return will compare the tax taken out with the tax on your actual income.

If you received workers compensation payments, tell whoever prepares your return. How they are treated for tax depends on the type of payment. Keep any statements the insurer gives you. If you had to pay for medical treatment yourself, keep the receipts too, in case they can be repaid through the claim.

If you return to work on lighter duties or fewer hours, check your payslips. Your pay and super should match the hours and duties you actually work.

## Your checklist after a work injury

- Get medical help and tell the doctor it happened at work
- Tell your employer in writing as soon as you can
- Write down what happened and who saw it
- Keep certificates, receipts, messages and payslips
- Contact your state or territory workers compensation regulator for the claim process
- Contact the Fair Work Ombudsman if you are threatened or dismissed`,
    faq: [
      { q: 'Can I get workers compensation on a student visa?', a: 'If you are an employee, yes. Visa holders have the same workplace rights as other employees, and workers compensation is run by each state and territory.' },
      { q: 'Will making a claim affect my visa?', a: 'The Fair Work Ombudsman says your visa will not be cancelled for contacting it for help with your workplace rights. For questions about your visa itself, check with the Department of Home Affairs.' },
      { q: 'Who do I contact about a workers compensation claim?', a: 'The workers compensation regulator in the state or territory where you work. The Fair Work Ombudsman does not handle these claims.' },
    ],
    sources: [
      { label: 'Fair Work Ombudsman: Workers compensation', href: `${FWO}/leave/workers-compensation` },
      { label: 'Fair Work Ombudsman: Visa holders and migrants', href: `${FWO}/find-help-for/visa-holders-migrants` },
      { label: 'Fair Work Ombudsman: Protections at work', href: `${FWO}/tools-and-resources/fact-sheets/rights-and-obligations/protections-at-work` },
    ],
  },
  {
    slug: 'unfair-dismissal-student-visa-australia',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Dismissed from a job on a student visa: unfair dismissal rules',
    description: 'Lost your job and think it was unfair? Students must apply within 21 days. Who can claim, the minimum time in the job, general protections and the pay you are still owed.',
    answer: 'If you think you were dismissed unfairly, you must apply to the Fair Work Commission within 21 days of the dismissal. To claim unfair dismissal you generally need at least 6 months with the employer, or 12 months at a small business, but a general protections claim has no minimum period.',
    body: `Losing a job is hard, especially when you rely on it to pay rent and study costs. If you think the dismissal was unfair, you may have options. Your visa type does not decide this. The time you worked there, the size of the business and the reason for the dismissal do. The most important rule is the deadline: 21 days.

## How long do I have to act?

You must apply to the Fair Work Commission within 21 days of your dismissal. This applies to unfair dismissal claims. It also applies to general protections claims about a dismissal.

21 days is short. Do not wait to get a reference, find a new job or finish your exams first. If you are unsure, apply on time and get advice during the process. The Fair Work Commission decides unfair dismissal cases.

## Who can make an unfair dismissal claim?

You generally need to meet these conditions:

- You were an employee (not a genuine contractor)
- You worked for the employer for at least 6 months, or at least 12 months if it is a small business
- You are covered by an award or enterprise agreement, or you earn less than the high income threshold

A small business is a business with fewer than 15 employees. Employees of related businesses are counted too. Regular and systematic casual employees are counted when working out the size of the business.

Many students work as casuals. Whether casual work counts towards your time in the job can depend on your work pattern, so ask the Fair Work Commission or a legal service about your case.

## What makes a dismissal unfair?

A dismissal may be unfair if it was harsh, unjust or unreasonable. This looks at both the reason and the way it was done.

- Were you told the reason?
- Were you given a chance to respond?
- Were you warned about a performance problem before you were dismissed?
- Was the reason true and fair?

Small businesses must follow the Small Business Fair Dismissal Code. It sets a simpler process, but the employer still has to follow it.

A redundancy is different. If the employer no longer needs your job to be done by anyone, that may be a genuine redundancy. If someone else was hired to do the same job soon after, ask for advice. The Fair Work Commission looks at the real situation, not only the words the employer used.

## What if I worked there less than 6 months?

You may still have a claim under the general protections in the Fair Work Act. These protect you from being dismissed or treated badly for certain reasons. Two important ones:

- **Workplace rights.** You have a right to make a complaint or inquiry about your job, for example asking why your pay or super is wrong.
- **Discrimination.** Your employer must not act against you because of attributes such as race, colour, sex, sexual orientation, age, disability, pregnancy, religion, national extraction or social origin.

If you were dismissed soon after you asked about your pay or super, this may be a general protections matter. The 21 day deadline still applies to a dismissal.

## What pay am I still owed?

Whatever happens with a claim, your employer must pay what you earned up to your last day.

- All wages for the hours you worked
- Notice, or pay instead of notice, where your award, agreement or contract requires it
- Any unused annual leave, if you were a permanent employee (casuals do not get paid annual leave)
- Super on your wages

If any of these are missing, you can contact the Fair Work Ombudsman on 13 13 94 or use the interpreter service on 13 14 50. Unpaid super can also be reported to the ATO.

**Your visa.** This guide does not cover visa rules. If you are worried about your visa, check with the Department of Home Affairs. The Fair Work Ombudsman says visa holders have the same workplace rights as other employees, and your visa will not be cancelled for contacting it for help.

## What about tax after losing a job?

A dismissal in the middle of the year can change your tax result. If your income for the year is lower than expected, the tax taken out during the year may be more than you owe. This depends on your residency for tax purposes and your other income.

Ask your employer for your final payslip and make sure your income statement is finalised. If you start a new job, give the new employer a TFN declaration. If you may be a resident, claim the tax-free threshold from one employer only.

## Where can I get free advice?

The Fair Work Commission has information in many languages, and a Workplace Advice Service that gives free legal advice to eligible people. Many universities have a student legal service, and community legal centres also help with employment problems. Contact one early, because the 21 day limit does not stop while you look for help.

## Your checklist

- Write down the date of your dismissal and count 21 days from it
- Keep your contract, roster, payslips and any messages about the dismissal
- Write a short timeline of what happened, while you remember it, including who told you and how
- Check that you received all final pay, notice, leave and super
- Apply to the Fair Work Commission within 21 days if you want to make a claim
- Contact the Fair Work Ombudsman about unpaid wages`,
    faq: [
      { q: 'Can I make an unfair dismissal claim on a student visa?', a: 'Your visa does not decide this. If you were an employee and you meet the minimum time in the job and the other conditions, you may be able to claim.' },
      { q: 'What is the time limit for an unfair dismissal claim?', a: 'You must apply to the Fair Work Commission within 21 days of your dismissal. The same limit applies to general protections claims about a dismissal.' },
      { q: 'I worked there for 3 months. Do I have any options?', a: 'You cannot usually make an unfair dismissal claim, but you may have a general protections claim if you were dismissed for a protected reason, such as asking about your pay.' },
    ],
    sources: [
      { label: 'Fair Work Ombudsman: Unfair dismissal', href: `${FWO}/ending-employment/help-with-termination/unfair-dismissal` },
      { label: 'Fair Work Ombudsman: Protections at work', href: `${FWO}/tools-and-resources/fact-sheets/rights-and-obligations/protections-at-work` },
      { label: 'Fair Work Ombudsman: Visa holders and migrants', href: `${FWO}/find-help-for/visa-holders-migrants` },
    ],
  },
  {
    slug: 'bullying-harassment-work-international-students',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Bullying or harassment at work: help for international students',
    description: 'Bullied or harassed at your part-time job? What counts as bullying and sexual harassment in Australia, how to keep a record, and where international students get help.',
    answer: 'Workplace bullying is repeated unreasonable behaviour that creates a risk to health and safety, and sexual harassment can be a single event. International students have the same workplace rights as other workers and can ask the Fair Work Commission for an order to stop it.',
    body: `Some students put up with bad treatment at work because they are new to Australia, need the money or are afraid for their visa. You do not have to accept bullying or harassment. Visa holders have the same workplace rights as other employees. This guide explains what counts and where to get help.

## What counts as workplace bullying?

The Fair Work Ombudsman says workplace bullying happens when a person or group repeatedly behaves unreasonably towards a worker, and the behaviour creates a risk to health and safety.

Examples of unreasonable behaviour can include:

- Shouting, swearing at you or insulting you
- Making fun of you in front of others, including about your accent or language
- Leaving you out on purpose
- Giving you impossible tasks or deadlines so you fail
- Spreading rumours about you

The key word is "repeatedly". A single bad event is usually not bullying under this definition, but it may still be harassment, discrimination or a safety issue.

## What is not bullying?

Reasonable management action carried out in a reasonable way is not bullying. A manager can give you feedback on your work, take disciplinary action and direct how the work is done.

But management action that is not carried out reasonably may still be bullying. For example, a manager can tell you about a mistake. Shouting at you about it in front of customers every day is different.

## What counts as sexual harassment?

Sexual harassment includes an unwelcome sexual advance, an unwelcome request for sexual favours, or other unwelcome conduct of a sexual nature, where a person could reasonably be offended, humiliated or intimidated.

Unlike bullying, sexual harassment can be a single event. It does not need to happen again before you can act. The protections cover a wide group, including employees, contractors, labour hire workers and students on work experience.

If someone touches you without your consent, follows you or threatens you, this may also be a crime. You can report it to the police as well as at work. In an emergency, call 000.

## What can the Fair Work Commission do?

If you are still employed, you can apply to the Fair Work Commission for an order to stop bullying. You can also apply for an order to stop sexual harassment at work. These orders aim to stop the behaviour so you can keep working safely. They are not mainly about money. If you want compensation, other routes, such as a discrimination complaint, may fit better, so ask for advice about which one suits your situation.

The Fair Work Commission has an eligibility quiz for anti-bullying applications. It also has a Workplace Advice Service, which gives free legal advice to eligible people.

If someone does not follow a stop bullying order, the Fair Work Ombudsman can help.

## Where else can I get help?

You can start inside your workplace, if you feel safe:

- A supervisor or manager you trust
- A health and safety representative
- The human resources team
- A union

Outside your workplace:

- The Australian Human Rights Commission, for complaints about bullying, harassment or discrimination under federal laws
- State or territory anti-discrimination bodies
- State or territory workplace health and safety bodies
- Your university's student support or legal service, which can often help you find free advice
- The Fair Work Ombudsman on 13 13 94, or the interpreter service on 13 14 50

## Can my employer threaten my visa?

Your employer does not decide your visa. The Fair Work Ombudsman says your visa will not be cancelled for contacting it for help. If you have questions about your visa itself, check with the Department of Home Affairs.

The Fair Work Act also protects you from being treated badly for making a complaint or inquiry about your job. If you are dismissed for complaining, you may have a general protections claim, and you must apply within 21 days of the dismissal.

## How do I keep a good record?

A clear record makes any complaint stronger. Start now, even if you are not sure you will complain.

- Write down each event soon after it happens: the date, time, place and what was said or done
- Note who else was there
- Keep messages, emails and roster changes
- Store your notes outside your work systems, such as in your personal email, because you may lose access if you leave

Recording conversations without consent has different rules in each state, so get advice before you do it. Written notes are always safe to keep.

If the behaviour affects your health or sleep, see a doctor or your university counselling service. A note from a health professional can support a complaint, and it can also help if you need extensions for your studies.

**Check your pay and super too.** A workplace that treats people badly may also break other rules. Check that you get the right pay rate, a payslip within one working day of payday, and super paid into your fund. These are separate claims, and you can pursue them even after you leave the job.

## Your next steps

- Make sure you are safe first, and call 000 in an emergency
- Start a written record today
- Talk to someone you trust at work, or to your university support service
- Contact the Fair Work Commission about an order to stop bullying or sexual harassment
- Contact the Fair Work Ombudsman if you are dismissed, threatened or underpaid`,
    faq: [
      { q: 'Does one incident count as bullying?', a: 'Under the Fair Work definition, bullying is repeated unreasonable behaviour. A single incident may still be sexual harassment, discrimination or a safety issue.' },
      { q: 'Can I get a stop bullying order if I have already left the job?', a: 'The stop bullying process is for people who are still employed, because it aims to stop the behaviour. If you were dismissed, other options such as a general protections claim may apply.' },
      { q: 'Will complaining affect my visa?', a: 'The Fair Work Ombudsman says your visa will not be cancelled for contacting it for help. For questions about the visa itself, check with the Department of Home Affairs.' },
    ],
    sources: [
      { label: 'Fair Work Ombudsman: Bullying in the workplace', href: `${FWO}/employment-conditions/bullying-sexual-harassment-and-discrimination-at-work/bullying-in-the-workplace` },
      { label: 'Fair Work Ombudsman: Respect at Work reforms', href: `${FWO}/about-us-legislation-fair-work-system/respect-work-reforms` },
      { label: 'Fair Work Ombudsman: Protections at work', href: `${FWO}/tools-and-resources/fact-sheets/rights-and-obligations/protections-at-work` },
      { label: 'Fair Work Ombudsman: Visa holders and migrants', href: `${FWO}/find-help-for/visa-holders-migrants` },
    ],
  },
  {
    slug: 'unpaid-trial-shift-recover-pay-student-visa',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Did an unpaid trial shift? How students can ask to be paid',
    description: 'If your unpaid trial went past a short skills test, you may be owed wages. How international students work out what they are owed and ask for it, step by step.',
    answer: 'If your trial was longer than needed to show your skills, or you did normal work without direct supervision, you should have been paid at least the minimum rate. Work out the hours, ask the employer in writing, and contact the Fair Work Ombudsman if they do not pay.',
    body: `Many students are asked to do a "trial" before they get a job. Some trials are lawful and unpaid. Many are not. If you already did a trial and were not paid, you may be able to get that money. This guide focuses on what to do after the trial: how to check, work out the amount and ask for it.

## Was my trial lawful?

The Fair Work Ombudsman says an unpaid trial is lawful only when all of these are true:

- It is to show your skills for the job
- It is under the direct supervision of the employer or another staff member
- It is no longer than needed to show your skills, which can be an hour up to one shift depending on the job

If the trial went longer than needed, or you were doing normal work, you must be paid at least the minimum rate for that time.

## Signs that you should have been paid

Think about what happened on the day. These are signs that your trial was really work:

- You served real customers or made products the business sold
- You worked alone, without someone watching you
- The trial lasted more than one shift, or you were asked back for a second unpaid day
- You did tasks like cleaning or stocking that were not about showing a skill
- The business was busy and used you to cover staff

Being told "this is how the industry works" does not change the rule. Also, it does not matter if you got the job or not. If the work should have been paid, you are owed the money either way.

## How much am I owed?

Start with the hours you worked. Then find the pay rate.

The national minimum wage is $26.44 an hour from the first full pay period starting on or after 1 July 2026. Most jobs are covered by an award, and award rates are often higher. Casual employees also get a casual loading on top of the base rate. Weekend, public holiday and late night shifts may have penalty rates.

The Fair Work Ombudsman has a Pay Calculator that works out the right award and rate. Use it with the day, time and type of work.

**An example.** Hana did an unpaid "trial" at a café for six hours on a weekday. She served customers and made coffee by herself for most of it. At the national minimum wage alone, six hours is $158.64. Her real amount is likely higher once the award rate and casual loading are included.

## How do I ask for the money?

Ask in writing. A short message or email is enough. A written request also becomes evidence if you need help later.

Include:

- Your full name and phone number
- The date and hours of the trial
- What work you did
- The amount you calculated and how you worked it out
- Your bank details, or a request for the employer to contact you

Stay polite and clear. Some employers pay once they see a simple written request.

Give the employer a clear date to reply, such as 14 days. If they say the trial was unpaid because it was "just a test", you can point to the Fair Work rule: an unpaid trial must be supervised and no longer than needed to show your skills. Keep your message factual. You do not need to argue about the law in detail.

## What evidence should I keep?

Keep anything that shows you were there and what you did:

- Messages arranging the trial
- The job advertisement
- The name of the person who supervised you
- Photos or notes from the day, made at the time
- Any reply from the employer

Write down the details now if you have not yet. Memory fades quickly. If other people did trials at the same business on the same day, note their names too. A pattern of unpaid trials can help the Fair Work Ombudsman see the problem.

## What if the employer will not pay?

You can contact the Fair Work Ombudsman. It can help with unpaid wages, including unpaid trials. Call 13 13 94, or use the interpreter service on 13 14 50. There is also a form to report a workplace issue anonymously.

The Fair Work Ombudsman says visa holders have the same workplace rights as all other employees, and your visa will not be cancelled for contacting it for help. For questions about your visa itself, check with the Department of Home Affairs.

## What happens at tax time if I get paid?

Wages for a trial are employment income. If the employer pays you through their payroll, the payment should show on a payslip and in your income statement. Give the employer your TFN so the right amount of tax is taken out.

Your employer should also pay super on those wages. Payslips must be given within one working day of payday, so ask for one if it does not arrive.

## Your checklist

- Write down the date, hours and tasks of your trial
- Check if it went beyond a short, supervised skills test
- Use the Fair Work Pay Calculator to estimate the amount
- Ask the employer for payment in writing
- Keep all messages and notes
- Contact the Fair Work Ombudsman if you are not paid`,
    faq: [
      { q: 'I did not get the job. Am I still owed money for the trial?', a: 'Yes, if the trial went beyond a short supervised skills test. The right to be paid comes from the work you did, not from whether you were hired.' },
      { q: 'How long can a lawful unpaid trial be?', a: 'No longer than needed to show your skills. The Fair Work Ombudsman says this can be an hour up to one shift, depending on the job, and it must be under direct supervision.' },
      { q: 'Who can help me if the employer refuses to pay?', a: 'The Fair Work Ombudsman, on 13 13 94 or through the interpreter service on 13 14 50. Visa holders have the same workplace rights as other employees.' },
    ],
    sources: [
      { label: 'Fair Work Ombudsman: Unpaid trials', href: `${FWO}/starting-employment/unpaid-work/unpaid-trials` },
      { label: 'Fair Work Ombudsman: Minimum wage increase starts today (1 July 2026)', href: `${FWO}/newsroom/media-releases/2026-media-releases/july-2026/20260701-minimum-wage-increase-media-release` },
      { label: 'Fair Work Ombudsman: Visa holders and migrants', href: `${FWO}/find-help-for/visa-holders-migrants` },
      { label: 'Fair Work Ombudsman: Pay slips', href: `${FWO}/pay-and-wages/paying-wages/pay-slips` },
    ],
  },
  {
    slug: 'uniform-laundry-pay-deductions-students',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Uniform and laundry charges from your pay: rules for students',
    description: 'Is your employer taking money from your pay for uniforms or laundry? When pay deductions are allowed, how to get money back and what students can claim at tax time.',
    answer: 'An employer can generally take money from your pay only if you agree in writing and it is mainly for your benefit, or if a law, a court order or your award allows it. If you paid for a compulsory uniform yourself, you may be able to claim it, and its laundry, on your tax return.',
    body: `Some students see charges on their payslip they did not expect: a uniform fee, a weekly laundry charge, or money taken for a broken glass. Others are told to buy their own uniform. This guide explains when an employer can take money from your pay, how to ask for it back, and how a uniform can affect your tax return.

## When can an employer take money from my pay?

The Fair Work Ombudsman says an employer can deduct money from your pay when:

- You agree in writing, and the deduction is mainly for your benefit
- A law or a court or Fair Work Commission order allows it, for example the tax taken out of your pay
- Your award allows it

Your agreement must be genuine. An employer cannot force you to agree to a deduction. If you agreed to a regular deduction, you can withdraw your agreement in writing at any time.

## Which charges are often a problem?

Even with a signed agreement, a deduction has no effect if it benefits the employer and is unreasonable in the circumstances. Charges that often raise questions include:

- A charge for a uniform the job requires
- A weekly or per shift laundry fee
- Money taken for breakages
- Money taken because the till was short
- A training fee or bond

For example, the Fair Work Ombudsman gives a case where a register was $20 short. The employer could not take that money from the worker's wages and had to cover the shortfall.

## Are there any exceptions?

Some awards allow certain deductions. For example, the Hospitality Award allows deductions for breakages or till shortages without agreement only in narrow cases. The deduction must be reasonable and in proportion to the loss, the employee must be at least 18, and the employee must have acted with wilful misconduct.

If you are under 18, extra rules apply. In many cases, a parent or guardian must also agree in writing.

Because awards differ, check yours. The Fair Work Ombudsman can tell you which award covers your job.

## How do I get money back?

Start with the numbers. Go through every payslip and add up the deductions you did not agree to, or that you think are unfair.

- Make a list of each deduction with the date and amount
- Send the employer a short written request with the total and the list
- If you agreed to a regular deduction and want it to stop, withdraw your agreement in writing
- If the employer refuses, contact the Fair Work Ombudsman on 13 13 94, or the interpreter service on 13 14 50

Payslips must show each deduction. If your payslip does not show where money went, ask for an explanation. Visa holders have the same workplace rights as other employees.

## How does a deduction affect my super and tax?

Look at whether the charge comes out before or after your gross pay is worked out. If your gross pay is reduced, your super may also be worked out on a lower amount. Check that your gross pay and super match the hours you worked and your pay rate.

## Can I claim a uniform on my tax return?

Sometimes. This applies when you paid for the uniform yourself, and your employer did not pay you back. The ATO allows a deduction only for certain clothing:

- Clothing specific to your occupation
- Protective clothing
- A compulsory uniform, such as one with your employer's logo
- A non-compulsory uniform that is registered with the government

Normal clothing is not claimable, even if your employer requires it. For example, the black trousers and white shirt a bartender wears are conventional clothing, so you cannot claim them.

## Can I claim laundry?

If you can claim the clothing, you can also claim the cost of washing it. The ATO allows $1 per load if the load is only work clothing, or 50 cents per load if it is mixed with other washing.

For 2025-26 and earlier years, you need written evidence if your total work expense claims are more than $300 and your laundry claim is more than $150. From 2026-27, you need written evidence for all laundry claims, so start keeping a simple diary of your work washes.

Remember the three rules for any work deduction: you spent the money and were not paid back, it relates directly to earning your income, and you have a record. If your employer gave you the uniform for free, or paid you back for it, you cannot claim the cost of buying it.

**The standard deduction from 2026-27.** From 2026-27, residents with labour income can claim a standard deduction of up to $1,000 instead of listing small work expenses. If you claim work expenses separately, the standard deduction goes down dollar for dollar. This starts after the 2025-26 tax return, so it does not apply to the return you lodge now.

## Your checklist

- Check every payslip for deductions and write them down
- Ask the employer in writing to explain or repay any you did not agree to
- Withdraw any written agreement you no longer accept
- Contact the Fair Work Ombudsman if the employer refuses
- Keep receipts if you paid for a compulsory uniform yourself
- Keep a laundry diary for work clothing you can claim`,
    faq: [
      { q: 'I signed a form agreeing to a laundry charge. Is it allowed?', a: 'Not always. A deduction that benefits the employer and is unreasonable has no effect, even with a signed agreement. You can also withdraw a written agreement at any time.' },
      { q: 'Can my boss take money from my pay because the till was short?', a: 'Generally no. Some awards allow it only in narrow cases, such as wilful misconduct by an employee aged 18 or over, and the amount must be reasonable.' },
      { q: 'Can I claim black pants and a white shirt for work?', a: 'No. The ATO says conventional clothing is not deductible, even if your employer requires it.' },
      { q: 'How much can I claim for washing my work uniform?', a: 'The ATO allows $1 per load for work clothing only, or 50 cents per load if it is mixed with other clothes. The clothing itself must be claimable.' },
    ],
    sources: [
      { label: 'Fair Work Ombudsman: Deducting pay', href: `${FWO}/pay-and-wages/deductions-and-related-issues/deducting-pay` },
      { label: 'ATO: Clothing, laundry and dry-cleaning expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/clothes-and-items-you-wear-at-work/clothing-laundry-and-dry-cleaning-expenses` },
      { label: 'ATO: Standard deduction for work-related expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/standard-deduction-for-work-related-expenses` },
      { label: 'Fair Work Ombudsman: Pay slips', href: `${FWO}/pay-and-wages/paying-wages/pay-slips` },
    ],
  },
]
