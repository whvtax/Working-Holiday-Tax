import type { LongArticle } from '../types'

const ATO = 'https://www.ato.gov.au'
const TFN_WHAT = `${ATO}/individuals-and-families/tax-file-number/what-is-a-tax-file-number`
const TFN_APPLY = `${ATO}/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application`
const TFN_LOST = `${ATO}/individuals-and-families/tax-file-number/lost-or-stolen-tfn`
const TFN_DECL = `${ATO}/businesses-and-organisations/hiring-and-paying-your-workers/payg-withholding/payments-you-need-to-withhold-from/payments-to-employees/tax-file-number-and-withholding-declarations`
const STUDYING = `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia`
const MEDICARE_RATE = `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/what-is-the-medicare-levy`
const DASP = `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp`
const NO_ABN = `${ATO}/forms-and-instructions/statement-by-supplier-not-quoting-an-abn`
const ABN_ENTITLEMENT = 'https://www.abr.gov.au/business-super-funds-charities/applying-abn/abn-entitlement'
const ABN_FAQ = 'https://abr.business.gov.au/FAQ/ABNBasics'
const RECORDS = `${ATO}/individuals-and-families/income-deductions-offsets-and-records/records-you-need-to-keep`
const RIDE = `${ATO}/businesses-and-organisations/income-deductions-and-concessions/sharing-economy-and-tax/ride-sourcing/registrations`

export const LONG_EN_00: readonly LongArticle[] = [
  // 1. from what-is-a-tfn
  {
    slug: 'what-is-a-tfn-international-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'What is a TFN? A plain guide for international students',
    description: 'Your tax file number links your pay, your super and your tax return. What a TFN is, why students need one before payday, and how to keep the number safe.',
    answer: 'A tax file number (TFN) is your personal reference number in the Australian tax and super systems. It is free, you keep it for life, and without it your employer must take much more tax from your pay.',
    body: `If you study in Australia and want a part-time job, the first number you will be asked for is your tax file number, or TFN. It is a short number, but many things depend on it. This guide explains what it is, what it does, and why it matters for international students.

## What is a TFN?

The ATO describes a TFN as your personal reference number in the tax and superannuation systems. The ATO issues it, and applying is free. You never need to pay a website or an agent to get one.

A TFN is yours for life. The ATO says you keep it even if you change jobs or your name, move interstate or go overseas. So a student who finishes a course, goes home, and later comes back on a new visa still has the same number.

Having a TFN is not compulsory. But not having one has real costs, which we explain below.

## Why does a student need one?

Most international students who work are employees: in a café, a shop, a warehouse, a restaurant kitchen or a cleaning team. Your employer uses your TFN in four ways:

- to take the right amount of tax from each pay
- to report your income to the ATO, so it appears on your income statement
- to pay your super into a fund that can match the money to you
- to connect all your jobs in one year to one person

Without a TFN you also cannot lodge your tax return online and you cannot apply for an Australian business number (ABN). If you plan to do delivery work or freelance work later, you will need your TFN first.

Your visa conditions decide whether and how much you can work. That is a question for the Department of Home Affairs, not the tax system.

## What happens to your pay without a TFN?

If you do not give your employer your TFN, and you have not told them you applied for one, the employer must take tax at the top rate plus the Medicare levy. For 2025-26 that is 45% plus 2%, so 47 cents from every dollar you earn.

If you have applied but the number has not arrived yet, the ATO gives you 28 days to provide it. After that, the higher rate applies.

The extra tax is not lost. It is credited against your tax when you lodge your return. But you lose the use of that money for months, and for a student paying rent each week, that is hard.

## The TFN declaration: where your tax rate is really set

Giving your TFN to a manager in a message does not change your pay. What changes it is the TFN declaration, the form you fill in when you start each job. Two questions on it matter most for students:

- **Are you an Australian resident for tax purposes?** A student enrolled in a course of 6 months or more may be a resident for tax purposes. It depends on your situation, so think about it carefully before you answer.
- **Do you want to claim the tax-free threshold from this payer?** Only residents get the tax-free threshold. If you may be a resident, claim it from one employer only, usually the one that pays you the most.

Every new employer needs its own declaration. Your TFN does not travel from one job to the next by itself.

## A worked example: why the residency answer matters

Mei studies a two-year master's degree. In 2025-26 she earns $20,000 from a café job.

- If Mei may be a resident for tax purposes, the first $18,200 is tax free. The next $1,800 is taxed at 16%, which is $288. The low income tax offset of up to $700 then reduces that to nil. The Medicare levy is a separate question, and many students may be able to claim an exemption.
- If Mei is a foreign resident for tax purposes, there is no tax-free threshold. She pays 30% from the first dollar, which is $6,000.

Same job, same pay, very different result. The TFN is the link that lets the ATO match the right income to the right person, and the declaration is where the residency answer starts.

## Who should have your TFN?

A TFN together with a copy of your passport is enough for someone to steal your identity. The ATO says to give your TFN only to people and organisations that need it for a legitimate reason. Examples it gives:

- the ATO
- your employer, after you start the job
- your bank or financial institution
- your super fund
- your university
- government agencies, if you claim a benefit

A landlord, a share house owner or a stranger in a job group chat does not need your TFN. If your TFN is lost or stolen, tell the ATO as soon as possible.

## What to do next

- If you do not have a TFN yet and your visa allows work, apply online with the ATO once you are in Australia. It is free.
- When you start a job, fill in a TFN declaration and think carefully about the residency question.
- Give your TFN to your super fund too, so your super is easy to find later.
- Store the number somewhere safe, away from a copy of your passport.

When tax time comes, you can message Student Visa Tax on WhatsApp if you would like help with your return.`,
    faq: [
      { q: 'Does my TFN expire when my student visa ends?', a: 'No. The ATO says your TFN is yours for life, even if you go overseas. If you come back on a new visa, you use the same number.' },
      { q: 'Is a TFN the same as a student number?', a: 'No. Your student number comes from your university. Your TFN comes from the ATO and is used for tax, super and your tax return.' },
      { q: 'Can I work without a TFN?', a: 'Yes, but if you have not given your employer a TFN, and have not told them you applied, they must take tax at the top rate plus the Medicare levy from your pay.' },
    ],
    sources: [
      { label: 'ATO: What is a tax file number', href: TFN_WHAT },
      { label: 'ATO: Tax file number and withholding declarations (for employers)', href: TFN_DECL },
      { label: 'ATO: Studying in Australia', href: STUDYING },
      { label: 'ATO: What is the Medicare levy', href: MEDICARE_RATE },
    ],
  },

  // 2. from how-to-apply-for-a-tfn
  {
    slug: 'how-to-apply-for-a-tfn-international-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Applying for a TFN step by step: a checklist for students',
    description: 'A step-by-step checklist for international students applying for a TFN online: what to prepare, which address to give, the common mistakes, and what to do next.',
    answer: 'If your visa allows work and you are in Australia, you apply for a TFN online with the ATO using your passport details. It is free, you send no documents, and the ATO posts the number to your Australian address within 28 days.',
    body: `Applying for a tax file number takes only a few minutes. Most problems come from small details: a typo in a passport number, or an address you will leave next week. This checklist walks you through the application from start to finish, so it works the first time.

## Before you start: can you apply online?

The ATO's online application for foreign passport holders works if two things are true:

- you hold a valid visa with work rights, linked to your passport
- you are in Australia when you apply

If your visa has a no-work condition, the online application will not accept it. Whether your visa allows work is a question for the Department of Home Affairs. Check your visa conditions there if you are not sure.

If you have ever had a TFN before, for example on an earlier visa, do not apply again. You keep a TFN for life. The same ATO service can help you find the number you already have.

## Step 1: prepare your details

Have these ready before you open the form:

- your passport, so you can copy the details exactly as printed
- your full name in the same order as your passport
- your date of birth
- an Australian postal address where you will still get mail in a month
- an email address you check often

You do not upload or send any documents. The ATO checks your passport and visa details electronically. That is why a single wrong letter or number can slow things down.

## Step 2: choose the right postal address

Your TFN arrives as a letter in the post. It does not come by email or text message. So the address you give is the most important answer on the form.

Good choices for students:

- your student accommodation, if it has a working mail room and you will stay at least a month
- a share house where your name can go on the mailbox
- the address of a relative or friend in Australia who will open your mail for you

A short-term booking you will leave in a week is a poor choice. If the letter cannot reach you, you wait longer.

## Step 3: fill in the form carefully

Type your details slowly and check them twice. Common mistakes:

- swapping the order of your family name and given names
- leaving out a middle name that appears in your passport
- mixing up the letter O and the number 0 in a passport number
- a wrong postcode

When you submit, you get a receipt ID. Save it. You need it if you ever contact the ATO about the application.

## Step 4: wait, and do not apply twice

The ATO says you should receive your TFN within 28 days from when it receives your completed application. It also says not to lodge another application during those 28 days. A second application does not speed anything up.

If nothing has arrived after 28 days, contact the ATO and give your receipt ID.

## Step 5: tell your employer and fill in the declaration

You can start a job before your TFN arrives. Tell your employer that you have applied. The ATO gives you 28 days to provide the number. If you do not provide it in that time, your employer must take tax at the top rate plus the Medicare levy.

When you start, you also fill in a TFN declaration. This form asks whether you are an Australian resident for tax purposes. A student enrolled in a course of 6 months or more may be a resident, depending on their situation. It also asks whether you want to claim the tax-free threshold. Claim it from one employer only.

## A worked example: two students, one week apart

Leo and Ana arrive for the same semester and both find café jobs.

- Leo applies on his third day and gives the address of his student accommodation, where he has a 12-month lease. His TFN arrives well inside the 28 days. His employer never needs to take the higher rate.
- Ana applies in her second week and gives the address of a short-term room she leaves soon after. The letter goes back to the ATO. She then has to contact the ATO with her receipt ID, and while she waits past the 28 days, her employer must take 47% from each pay.

Ana gets the extra tax credited when she lodges her tax return. But for weeks she has less money for rent and food.

## After your TFN arrives: your checklist

Once the letter comes, a few small jobs make the rest of your year easier:

- Give it to every employer, on a TFN declaration for each job.
- Give it to your super fund. A fund without your TFN may have to take extra tax from your contributions.
- Give it to your bank, so it does not have to take extra tax from interest.
- Keep the letter in a safe place, separate from a copy of your passport.

If anything in this list was missed in your first weeks, it is easy to fix later. A new declaration can be given to an employer at any time, and your super fund can add your TFN to your account when you send it.

Once you have worked for a year, your TFN is also what you need to lodge your tax return. If you want help with that, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Do I need to pay to apply for a TFN?', a: 'No. The ATO says it is free to apply for a TFN. A website that charges you is not the ATO.' },
      { q: 'Do I need to upload my passport?', a: 'No. You type your passport details into the form, and the ATO checks them electronically. You do not send documents.' },
      { q: 'Can my university apply for me?', a: 'No. You apply yourself on the ATO website. Your university may ask for your TFN later for its own records, which the ATO lists as a legitimate reason.' },
    ],
    sources: [
      { label: 'ATO: TFN application for foreign passport holders and temporary visitors', href: TFN_APPLY },
      { label: 'ATO: Tax file number and withholding declarations (for employers)', href: TFN_DECL },
      { label: 'ATO: What is a tax file number', href: TFN_WHAT },
    ],
  },

  // 3. from how-long-does-it-take-to-get-a-tfn
  {
    slug: 'how-long-does-a-tfn-take-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'How long does a TFN take for international students?',
    description: 'The ATO says to expect your TFN within 28 days. How students can plan that wait around the start of semester and a first job, and what to do on day 29.',
    answer: 'The ATO says you should receive your TFN within 28 days from when it receives your completed application. It comes by post to your Australian address, so the best way to avoid a longer wait is to apply early and give an address that will hold your mail.',
    body: `Many international students arrive a few weeks before semester starts. That is often the time they look for a job too. So a common question is: will my tax file number arrive before my first pay? This guide explains the ATO's timeline, what can make the wait longer, and how to plan around it.

## The ATO's timeline

The ATO says you should receive your TFN within 28 days from when it receives your completed application. The clock starts when the ATO receives the application, not when you arrive in Australia and not when you start a job.

Your TFN is posted to the Australian address on your application. It does not come by email, text message or app. So "28 days" really means 28 days for the ATO plus the time the post takes to reach you.

## Two separate 28-day periods

There are two different 28-day periods, and they are easy to confuse:

- **The ATO's processing time.** Up to 28 days for your TFN to be issued and posted.
- **Your time to give your employer the number.** If you tell your employer you have applied for a TFN, the ATO gives you 28 days to provide it. After that, the employer must take tax at the top rate plus the Medicare levy.

If you apply before you start work, the first period starts earlier, and the number usually arrives before the second one ends.

## What can make it take longer?

Most delays come from details you control:

- **The postal address.** If you leave the address before the letter arrives, or the address is incomplete, the letter may not reach you.
- **Your details do not match.** If your name or passport number on the form does not match your passport and visa records exactly, the application may need a manual check.
- **You already have a TFN.** You keep a TFN for life. If you had one on an earlier visa and apply again, the records conflict.
- **A second application.** The ATO says not to lodge another application during the 28 days.

Remember that the post also takes time. A letter to a regional town or a large building with a shared mail room can take longer to reach your hands than a letter to a house in a city. If you move during your first month, which many students do, ask the people at your old address to keep any letter from the ATO for you.

## A worked example: planning around semester

Priya lands on 10 February. Semester starts on 2 March, and she hopes to start a weekend job in the middle of February.

- She applies for her TFN online on 11 February, using the address of her student accommodation, where she has a long lease.
- She starts work on 21 February and tells her employer she has applied.
- Her TFN arrives in early March, inside both 28-day periods. She gives it to her employer on a TFN declaration, and her pay is never taxed at the higher rate.

If Priya had waited until after she started work to apply, she would have had less room for any delay in the post. If her letter had been lost, her employer would have had to take the higher rate from her pays once her 28 days ran out, at a time when she was also paying for textbooks and her first month of rent.

The lesson is simple: apply in your first days, even if you do not have a job yet. There is no cost and no downside to having your TFN ready before you need it.

## Can you make it faster?

Applying with the ATO is free. Be careful with any website that asks for money to "speed up" your TFN. What you can do is remove the causes of delay before you apply:

- apply as soon as you can after you arrive
- copy your passport details exactly
- give an address you will still have in a month
- keep your receipt ID

## What if day 29 comes and nothing has arrived?

The ATO says that if you have not received your TFN notice after 28 days, contact it and provide your ATO receipt ID from the application. Have your passport ready too.

Do not apply again. A second application creates two records that need to be sorted out by hand, which is slower.

If you are already working, tell your employer what is happening. If the 28 days to provide your TFN have passed, your employer must take the higher rate. That extra tax is credited when you lodge your tax return, so it is not lost, but you have less cash in the meantime.

## What to do once it arrives

- Give your TFN to each employer on a TFN declaration.
- Answer the residency question with care: a student enrolled in a course of 6 months or more may be a resident for tax purposes.
- Claim the tax-free threshold from one employer only, if you may be a resident.
- Give your TFN to your super fund and your bank.

## Quick checklist

- Apply in your first days in Australia, before you start a job if you can
- Use an address that will receive your mail for at least a month
- Save the receipt ID
- Wait 28 days before you contact the ATO
- Never lodge a second application

If you have already had pays taxed at the higher rate, that tax is worked out again on your tax return. You can message Student Visa Tax on WhatsApp when you are ready to lodge.`,
    faq: [
      { q: 'What should I do if I have heard nothing?', a: 'Wait until 28 days have passed since the ATO received your application. Then contact the ATO and give your receipt ID.' },
      { q: 'My TFN letter went to an old address. What now?', a: 'Contact the ATO with your receipt ID and passport. Do not lodge a new application, because you already have a TFN.' },
      { q: 'Does the 28 days include weekends?', a: 'The ATO says "within 28 days" from when it receives your completed application. Post can take extra time on top of that, so apply early.' },
    ],
    sources: [
      { label: 'ATO: TFN application for foreign passport holders and temporary visitors', href: TFN_APPLY },
      { label: 'ATO: Tax file number and withholding declarations (for employers)', href: TFN_DECL },
      { label: 'ATO: Studying in Australia', href: STUDYING },
    ],
  },

  // 4. from can-you-start-work-without-a-tfn
  {
    slug: 'start-work-without-a-tfn-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Can you start work without a TFN on a student visa?',
    description: 'Yes, you can start a job before your TFN arrives. How the 28-day rule works for students, what to tell your employer on day one, and what changes if you miss it.',
    answer: 'Yes. You can start work before your TFN arrives. Tell your employer you have applied: the ATO gives you 28 days to provide the number, and after that your employer must take tax at the top rate plus the Medicare levy.',
    body: `A job offer can come quickly, sometimes before your tax file number arrives in the post. The good news is that you do not have to turn the job down. The tax system has a simple rule for this. This guide explains it for international students and shows what to say on your first day.

Before you take any job, make sure your visa conditions allow the work. Check this with the Department of Home Affairs.

## The rule in one sentence

If you have applied for a TFN, the ATO gives you 28 days to provide it to your employer. If you still have not given it after 28 days, your employer must take tax at the top rate plus the Medicare levy.

The key is that your employer must know you have applied. If you say nothing, and do not give a TFN, the employer must take the higher rate from the first pay.

## What to say on day one

Payroll teams hear this often. Keep it simple:

- "I have applied for my TFN. Here is my ATO receipt ID."
- "Can I fill in the TFN declaration now and show that I have applied?"
- "I will give you the number as soon as the letter arrives."

Keep the confirmation of your application, with the receipt ID, in case the employer asks for it.

Small businesses sometimes do payroll themselves, and the owner may not know this rule well. If your manager seems unsure, stay calm and polite. Explain that you have applied, that the ATO allows 28 days to provide the number, and that you will bring it in as soon as it arrives. Then check your first payslip to make sure the tax looks normal.

## The TFN declaration still matters

On your first day you also complete a TFN declaration. Even without the number, the other answers on it set how much tax is taken. Two answers matter for students:

- **Residency for tax purposes.** A student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. If you are not sure, think about your situation before you answer, and ask for help if you need it.
- **The tax-free threshold.** Only residents get it, and you claim it from one employer only, usually the one that pays you the most.

If you work two jobs, each employer needs its own declaration, and each one needs your TFN. When your TFN arrives, do not forget the second job. It is easy to tell your main employer and forget the weekend one, and then the weekend job keeps taking the higher rate.

## What if the 28 days pass?

If your TFN has not arrived within the 28 days, your employer must take tax at the top rate plus the Medicare levy from each pay. For 2025-26 that is 45% plus 2%, so 47%.

When the TFN arrives, give it to your employer on a new or updated declaration. The normal rate then applies from the next pay. The employer does not go back and change past pays. Instead, the extra tax taken is credited against your tax when you lodge your return.

## A worked example: a missed window

Kenji starts a kitchen job paying $400 a week. He tells his employer he has applied for his TFN, but the letter goes to an address he has already left. The 28 days pass.

- For each week at the higher rate, his employer takes 47% of $400, which is $188.
- Over four weeks, that is $752 taken in tax.
- Once Kenji contacts the ATO and receives his TFN, he gives it to his employer and the normal rate starts again.

At tax time, the ATO works out his tax on his whole year's income. The $752, plus all the other tax taken during the year, is credited against that. If more was taken than he owes, the difference comes back to him.

## Your super and your bank while you wait

Your employer must still pay super for you as an employee. The super guarantee rate is 12%, and it covers casual and part-time workers, including temporary residents.

Give your TFN to your super fund as soon as you have it. A fund without your TFN may have to take extra tax from contributions. Give it to your bank too, so it does not take extra tax from any interest.

## How to keep the wait short

- Apply for your TFN as soon as you arrive in Australia, ideally before you start looking for work.
- Use a postal address that will receive your mail for at least a month.
- Copy your passport details exactly.
- Do not apply twice. If 28 days pass from when the ATO received your application, contact the ATO with your receipt ID.

## Checklist for your first week

- Tell your employer you have applied, and show your receipt ID if asked
- Fill in the TFN declaration, with the residency question answered carefully
- Claim the tax-free threshold from one employer only, if you may be a resident
- Give the TFN to your employer, super fund and bank when it arrives
- Check your payslip to see how much tax was taken

If any of your pays were taxed at the higher rate, it is all worked out on your tax return. Student Visa Tax can help with that on WhatsApp when the year ends.`,
    faq: [
      { q: 'Can an employer refuse to hire me because my TFN has not arrived?', a: 'The tax rules let you start work while your application is in progress, with 28 days to provide the number. Tell the employer you have applied and offer your receipt ID.' },
      { q: 'Does the higher tax go back to my first pay?', a: 'No. The higher rate applies to pays after the 28 days pass. Earlier pays stay at the rate set by your declaration.' },
      { q: 'I have two jobs. Does each one have its own 28 days?', a: 'Each employer needs its own TFN declaration and your TFN. Tell each employer that you have applied, and give each the number when it arrives.' },
    ],
    sources: [
      { label: 'ATO: Tax file number and withholding declarations (for employers)', href: TFN_DECL },
      { label: 'ATO: TFN application for foreign passport holders and temporary visitors', href: TFN_APPLY },
      { label: 'ATO: What is the Medicare levy', href: MEDICARE_RATE },
    ],
  },

  // 5. from what-happens-without-your-tfn
  {
    slug: 'no-tfn-tax-withheld-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'No TFN given to your employer? What it means for students',
    description: 'Without your TFN on file, your employer takes 47% from your pay. What that costs on a student wage, how the extra tax is worked out at tax time, and how to fix it fast.',
    answer: 'If your employer does not have your TFN, and you have not told them you applied, they must take tax at the top rate plus the Medicare levy, which is 47% for 2025-26. The extra tax is credited when you lodge your return, but you lose the use of the money until then.',
    body: `Sometimes a student looks at their first payslip and sees almost half of their pay gone in tax. The usual reason is simple: the employer does not have the student's tax file number. This guide explains why that happens, what it costs, and how you fix it.

## Why your employer takes so much

Your employer does not choose the rate. The ATO says an employer must withhold at the top tax rate plus Medicare from any payment when the employee has not given a TFN, has not claimed an exemption, and has not said they have applied for one.

For 2025-26 the top rate is 45% and the Medicare levy is 2%. Together that is 47 cents from every dollar.

The same applies if you told your employer you applied, but you still have not given them the number 28 days later.

## What it costs on a student wage

A student working part-time might earn $300 to $600 a week. At 47%, the amounts taken are:

- $300 a week: $141 taken in tax
- $450 a week: $211.50 taken in tax
- $600 a week: $282 taken in tax

These amounts are much higher than most students would expect to pay for the year. A student who may be an Australian resident for tax purposes pays no tax on the first $18,200 of the year, and then 16% on income from $18,201 to $45,000 (2025-26 rates). A student who is a foreign resident for tax purposes pays 30% from the first dollar up to $135,000. Both are lower than 47%.

## Is the money lost?

No. Tax withheld is not a fine. When you lodge your tax return, the ATO works out your tax for the whole year and credits all the tax your employers took. If they took more than you owe, the difference comes back to you.

The problem is time. The financial year ends on 30 June, and you lodge after that. Until then, the extra tax is with the ATO, not in your bank account.

You also need to wait until your employers have finalised your income for the year. Most employers do this by 14 July, and your income statement then shows as "Tax ready" in ATO online services. So a student who had extra tax taken in August may not see it worked out until the following July or later.

## A worked example

Sara starts a retail job paying $450 a week. She forgets to give her employer her TFN and never mentions that she applied. Her employer takes 47% for 8 weeks before she notices.

- Pay for 8 weeks: $3,600
- Tax taken at 47%: $1,692

Sara gives her employer a TFN declaration with her TFN. The normal rate starts from the next pay. At tax time, the $1,692 is credited against her tax for the year, together with all other tax her employers took. If Sara may be a resident and her income for the year is below $18,200, she owes no income tax, and the tax taken is worked out on her return. Medicare levy is a separate question for students, and many may claim an exemption.

## How to fix it

- **Give your employer a TFN declaration with your TFN.** Telling a manager the number in a message is not enough. The declaration goes to payroll.
- **If you are still waiting for your TFN, say so on the declaration.** You then have 28 days to provide it before the higher rate applies.
- **Check your next payslip.** Make sure the tax amount has changed.

Your employer will not usually redo past pays. The extra tax from those pays is sorted out on your tax return.

Check every job, not just one. Each employer needs its own TFN declaration. A common pattern is a student with two jobs where one employer has the TFN and the other does not. The second job keeps taking 47% for months without anyone noticing.

Look at the tax line on each payslip. If one job takes close to half your pay, ask that employer whether they have your TFN declaration.

## Cash jobs and other places your TFN matters

If you are paid in cash and the employer takes no tax at all, this rule does not help you, because there is no tax to credit. The income still goes on your tax return. Cash wages and tips are assessable income, so they must be declared like any other pay. Keep your own record of the dates you worked and what you were paid.

Your TFN also matters outside your job:

- **Your super fund.** If your fund does not have your TFN, contributions may be taxed extra. Give it to your fund.
- **Your bank.** Without your TFN, your bank must take more tax from any interest.
- **Your tax return.** You cannot lodge online without a TFN.

If you have just arrived and have no TFN yet, apply first and then tell each employer you have applied. That one step keeps most students away from the 47% rate entirely.

## Checklist

- Read the tax line on your first payslip from every job
- If it is close to 47%, give that employer a TFN declaration with your TFN
- Keep your payslips, so the extra tax is easy to check at tax time
- Lodge your tax return after 30 June, when your income statements are tax ready

If you had a stretch of pays at 47%, your tax return is where it is worked out. You can message Student Visa Tax on WhatsApp for help when the year ends.`,
    faq: [
      { q: 'Why is 47% taken and not 45%?', a: 'The rule is the top tax rate plus the Medicare levy. For 2025-26 that is 45% plus 2%.' },
      { q: 'Can my employer give the extra tax back to me?', a: 'Usually not. Once tax is taken and reported, it is credited against your tax when you lodge your return.' },
      { q: 'I am a foreign resident for tax purposes. Does the 47% still apply?', a: 'Not quite. Without your TFN, an employer withholds 45% from a foreign resident (there is no Medicare levy) and 47% from a resident. Once you give your TFN, the employer uses the rate for your situation.' },
    ],
    sources: [
      { label: 'ATO: Tax file number and withholding declarations (for employers)', href: TFN_DECL },
      { label: 'ATO: What is the Medicare levy', href: MEDICARE_RATE },
      { label: 'ATO: What is a tax file number', href: TFN_WHAT },
      { label: 'ATO: Studying in Australia', href: STUDYING },
    ],
  },

  // 6. from tfn-vs-abn-difference
  {
    slug: 'tfn-vs-abn-international-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'TFN or ABN? The difference for international students',
    description: 'A TFN is your personal tax number. An ABN is for running your own business. How students can tell which one a job needs, and what changes for tax and super.',
    answer: 'A TFN is your personal number for tax and super, and every working student needs one. An ABN is an extra number only for work you do in your own business, such as app delivery, and you need a TFN before you can apply for it.',
    body: `Students often hear both terms in the same week: "give us your TFN" for a café job, and "you need an ABN" for a delivery app. They sound similar, but they do very different jobs. This guide explains the difference and why it matters for your pay, your tax and your super.

## What is a TFN?

A tax file number (TFN) is your personal reference number in the tax and super systems. It belongs to you, not to a job. You keep it for life, and you use the same TFN for every employer, your super fund, your bank and your tax return.

If you work as an employee, the TFN is all you need. Your employer takes tax from your pay and pays super into your fund.

## What is an ABN?

An Australian business number (ABN) is an 11-digit number for a business. The Australian Business Register says you are entitled to an ABN if you are carrying on, or starting, an enterprise in Australia. A student delivering food through an app, tutoring private clients, or doing freelance design for several clients may be doing that.

You are not entitled to an ABN for work you do as an employee, even if the business calls it contracting. An employer should not ask you to get an ABN as a condition of a job.

An ABN does not replace your TFN. In fact, you cannot apply for an ABN without a TFN.

## How to tell which one a job needs

The question is how the work really runs, not what the job ad says. Look at these points:

- **Who controls the work?** An employee works in someone else's business, and the business decides how, where and when. A contractor runs their own business.
- **Whose tools?** Contractors often use their own tools and methods.
- **How are you paid?** Employees get wages for their time. Contractors may negotiate fees and invoice for work done.
- **How many clients?** A contractor can work for several clients at once.

The ATO also says that having an ABN does not on its own make you a contractor, and a contract that says "contractor" does not change the real relationship. If a café gives you a roster, a uniform and a supervisor, and pays you by the hour, that is very likely employment.

## What changes for tax?

- **As an employee (TFN only):** your employer takes tax from each pay and reports it to the ATO. At tax time, that tax is credited against what you owe.
- **With ABN work:** nobody takes tax out. You receive the full amount, and the tax is worked out on your tax return. Your business costs come off the income first.

If you give an invoice to a business without quoting an ABN, the business may have to withhold 47% of the payment. Quoting your ABN on every invoice avoids this.

## What changes for super?

Employers must pay super for employees, including casual and part-time workers and temporary residents. The rate is 12%. Some contractors who are paid mainly for their labour are also eligible for super on the labour part.

For true business work, such as app delivery where you choose your own hours, you usually do not get super paid for you.

## A worked example: one student, both numbers

Tom studies engineering. In 2025-26 he works in a supermarket and also delivers food through an app.

- Supermarket: $12,000 in wages. His employer takes tax from each pay using his TFN and pays super into his fund.
- Delivery: $10,000 received with no tax taken. He spent $2,000 on running costs he can claim, so his business income is $8,000.
- Taxable income on his return: $20,000.

If Tom may be a resident for tax purposes, tax on $20,000 for 2025-26 is $288 before offsets, and the low income tax offset of up to $700 reduces it to nil. If he were a foreign resident for tax purposes, the tax would be 30% of $20,000, which is $6,000. Either way, the tax from his supermarket pays is credited against the total.

## Can you have both at the same time?

Yes. Many students do. Your TFN stays your personal number. The ABN covers only the work you do in your own business. Both kinds of income go on one tax return.

Having both means a little more planning. Your wages have tax taken out, but your ABN income does not, so the tax on your ABN income has to be covered somehow. Sometimes the tax taken from your wages is enough. Often it is not. A simple habit helps: each time an ABN payment arrives, move part of it into a separate savings account and leave it there until your return is done.

When you stop the business, for example because your studies get busy, cancel the ABN. Your TFN stays with you for life, but an ABN is only for while the business runs.

## Checklist

- Every working student: get a TFN first
- Only get an ABN if you are really running your own business activity
- If an employer says you need an ABN for a normal rostered job, ask questions before you agree
- With ABN work, keep receipts and put some money aside for tax
- Check your visa conditions for any work with Home Affairs

If your year has both wages and ABN income, Student Visa Tax can help with the return on WhatsApp.`,
    faq: [
      { q: 'Do I need an ABN to work in a café or shop?', a: 'No. Normal rostered jobs are employment, and you only need your TFN. The register says you are not entitled to an ABN for work as an employee.' },
      { q: 'Does an ABN replace my TFN?', a: 'No. The Australian Business Register says an ABN does not replace your TFN. You need a TFN to apply for an ABN.' },
      { q: 'If my employer asks me to get an ABN, what should I do?', a: 'The register says an employer should not ask you to get an ABN as a condition of employment. If you think you are an employee, you can contact the Fair Work Ombudsman.' },
    ],
    sources: [
      { label: 'Australian Business Register: ABN entitlement', href: ABN_ENTITLEMENT },
      { label: 'ATO: What is a tax file number', href: TFN_WHAT },
      { label: 'ATO: Statement by a supplier not quoting an ABN', href: NO_ABN },
      { label: 'Australian Business Register: ABN basics', href: ABN_FAQ },
    ],
  },

  // 7. from apply-for-tfn-before-arriving
  {
    slug: 'apply-for-tfn-before-arriving-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Can students apply for a TFN before arriving in Australia?',
    description: 'The ATO online TFN application needs you to be in Australia. What international students can prepare before the flight so they can apply in their first days.',
    answer: 'Not online. The ATO says you can apply online if you have a valid visa with work rights and you are in Australia. You can prepare everything before you fly, then apply in your first days after you land.',
    body: `Many students want to sort out everything before they leave home: the visa, the accommodation, the flight, and the tax file number. The TFN is the one item that usually has to wait until you land. This guide explains why, and how to get ready so you can apply in your first days in Australia.

## Why the online form needs you in Australia

The ATO's online TFN application for foreign passport holders is for people who hold a valid visa with work rights and are located in Australia. Your visa must be linked to your passport. The ATO also posts the TFN to an Australian postal address, so you need one when you apply.

The ATO has a separate paper form for some people who live outside Australia. For a student coming to study and work part-time, the usual path is the online application after arrival. It is faster and you send no documents.

Whether your visa allows work, and on what conditions, is a question for the Department of Home Affairs. Check your visa conditions before you apply or start a job.

## Have you had a TFN before?

Before anything else, ask yourself: have I ever worked in Australia, or been given a TFN on an earlier visa? A TFN is yours for life. If you already have one, you do not apply again. You find your existing number instead.

This matters for students who did an exchange semester, a short course, or an earlier degree in Australia. A second application conflicts with your existing record and slows everything down.

If you are not sure, look for old payslips, an old income statement, a super fund letter or a past notice of assessment. Any of these may show your number. You can also sign in to ATO online services through myGov, if you set it up during your earlier stay.

## What to prepare before your flight

You can get almost everything ready at home:

- a clear photo of your passport identity page, so you can copy details exactly
- your visa grant notice, saved where you can open it offline
- a decision about your Australian postal address
- an email address you will keep checking
- a note of the date you plan to apply, ideally in your first week

You do not need to scan or send documents. The ATO checks your passport and visa details electronically.

## Choosing your first postal address

Your TFN arrives as a letter, posted to the Australian address you give. Think about where you will be in a month, not only where you sleep on your first night.

- **University or private student accommodation:** usually a good choice if you have a long booking and the building has a mail room.
- **Homestay:** fine if your host agrees to keep your mail.
- **Temporary hotel or short booking:** not a good choice if you will leave before the letter arrives.
- **A relative or friend in Australia:** a good option if they can open the letter for you.

## Why applying early matters

The ATO says you should receive your TFN within 28 days from when it receives your completed application. If you start a job before it arrives, tell your employer you have applied. The ATO gives you 28 days to provide your TFN. After that, your employer must take tax at the top rate plus the Medicare levy, which is 47% for 2025-26.

The earlier you apply, the more likely the number arrives before any of that matters.

## A worked example: an arrival week plan

Linh flies in on a Saturday, three weeks before her course starts.

- **Sunday:** she settles into her student accommodation, where she has a 6-month booking.
- **Monday:** she applies for her TFN online, copying details from her passport photo, and saves the receipt ID.
- **Week 3:** she gets a weekend job offer and tells the employer she has applied.
- **Week 4:** her TFN letter arrives. She gives it to her employer on a TFN declaration.

Linh never pays tax at the higher rate, because she applied on day 3 rather than waiting until she found a job.

Her friend Jun waited. He applied only when he got a job offer in week 3, and he gave the address of a short booking he left a week later. His letter went astray, his 28 days with his employer ran out, and part of his pay was taxed at 47% for a few weeks. The tax is credited at tax time, but he had less money just when rent was due.

## Questions on your first TFN declaration

When you start your first job, you fill in a TFN declaration. Two answers on it matter a lot:

- **Residency for tax purposes.** A student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. Residents get the tax-free threshold of $18,200. Foreign residents pay 30% from the first dollar (2025-26 rates).
- **The tax-free threshold.** If you may be a resident, claim it from one employer only.

## Your arrival checklist

- Check whether you already have a TFN from an earlier stay
- Save your passport and visa details before you fly
- Choose an Australian address that will hold your mail for a month
- Apply online in your first days in Australia
- Save the receipt ID and tell any new employer you have applied
- Fill in a TFN declaration for each job

Once your first year of work is over, Student Visa Tax can help with your tax return on WhatsApp.`,
    faq: [
      { q: 'Can I give my home country address on the application?', a: 'The ATO posts your TFN to the Australian postal address on your application, so you need an Australian address.' },
      { q: 'I studied in Australia years ago. Do I apply again?', a: 'No. If you were given a TFN before, you keep it for life. Find your existing number instead of applying again.' },
      { q: 'Do I need a TFN to enrol at university?', a: 'Not for tax reasons. You need a TFN when you start work. Your university may ask for it for its own records, which the ATO lists as a legitimate reason.' },
    ],
    sources: [
      { label: 'ATO: TFN application for foreign passport holders and temporary visitors', href: TFN_APPLY },
      { label: 'ATO: What is a tax file number', href: TFN_WHAT },
      { label: 'ATO: Studying in Australia', href: STUDYING },
    ],
  },

  // 8. from tfn-application-delayed
  {
    slug: 'tfn-application-delayed-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'TFN not arrived after 28 days? A student\'s action plan',
    description: 'Your TFN has not arrived and 28 days have passed. What international students should check first, what to say to the ATO, and how to protect their pay meanwhile.',
    answer: 'If 28 days have passed since the ATO received your application, contact the ATO and give your receipt ID. Check your postal address and passport details first, and do not lodge a second application.',
    body: `You applied for your tax file number weeks ago, you check the mailbox every day, and nothing arrives. Meanwhile your employer is asking for the number. This guide gives you a clear plan for what to check, who to contact, and how to protect your pay while you wait.

## Step 1: count the days correctly

The ATO says you should receive your TFN within 28 days from when it receives your completed application. Count from the date on your application confirmation, not from the day you arrived in Australia or the day you started work.

If fewer than 28 days have passed, there is nothing to escalate yet. The ATO also says not to lodge another application during those 28 days. Remember that post can take extra days on top.

## Step 2: check your postal address

Your TFN only comes as a letter. There is no email copy and no download. So the first thing to check is the address you gave:

- Did you type the street number, unit number and postcode correctly?
- Have you moved since you applied?
- Does your building have a mail room or a shared box that someone else empties?
- Is your name on the mailbox?

Students often move in their first months: from temporary housing to a share house, or from one room to another. If you have moved, contact the old address and ask whether a letter from the ATO arrived.

## Step 3: check your details

An application may need a manual check if your details do not match your passport and visa records. Look at your confirmation and compare:

- the order of your family name and given names
- any middle name in your passport
- each letter and number of your passport number
- your date of birth

Then ask yourself whether you had a TFN before. A TFN is yours for life. If you studied, worked or did an exchange in Australia before, you may already have one. A new application then conflicts with the existing record. In that case, the task is to find your old number, not to wait for a new one.

## Step 4: contact the ATO

Once 28 days have passed, the ATO says to contact it and provide your ATO receipt ID from the application. Have these ready:

- your receipt ID
- your passport
- the address you used on the application, and your new address if you moved

Ask two simple questions: has my TFN been issued, and to which address was it sent? If it was sent to the wrong place, you can ask what is needed to update your address and get the number.

Write down the date of your call and anything the ATO tells you. If you need to call again, these notes save time. If English is not your first language and the call feels hard, ask a friend you trust to sit with you, but never share your TFN or passport details in a group chat.

## Do not lodge a second application

It feels like action, but it makes things worse. A second application creates a second record that has to be sorted out by hand before either can go ahead. This is the most common way a short delay becomes a long one.

## Protecting your pay while you wait

You can keep working during the delay. Tell your employer you have applied, and show your receipt ID if they ask. The ATO gives you 28 days to provide your TFN to your employer. If that time runs out, the employer must take tax at the top rate plus the Medicare levy, which is 47% for 2025-26.

Tell your employer early if you think the letter will be late. A short message is enough: you applied on a certain date, the letter has not arrived, and you are in contact with the ATO. Then watch your payslips. If the tax suddenly jumps to close to half your pay, you will know the 28 days have passed, and you can plan your budget for the weeks until the number arrives.

## A worked example

Omar applied on 1 May and started a warehouse job on 5 May, earning $500 a week. His TFN had not arrived by 2 June.

- He checked his application: the unit number was missing from his address.
- He contacted the ATO with his receipt ID and passport, and confirmed the correct address.
- His 28 days to give his employer the TFN ran out before the letter arrived, so for two weeks his employer took 47% of $500, which is $235 a week, or $470 in total.

When the TFN came, he gave it to his employer and the normal rate started again. The $470 is credited against his tax when he lodges his return.

## Checklist

- Count 28 days from when the ATO received your application
- Check the address and your passport details on your confirmation
- Think about whether you already had a TFN from an earlier stay
- Contact the ATO with your receipt ID after 28 days
- Never lodge a second application
- Keep your employer informed and keep your payslips

If some pays were taxed at the higher rate, it is worked out on your tax return. Student Visa Tax can help with that on WhatsApp after 30 June.`,
    faq: [
      { q: 'Can someone else call the ATO for me?', a: 'If you use a registered tax agent, they can contact the ATO on your behalf. Otherwise you will usually need to confirm your own identity.' },
      { q: 'Will a TFN delay affect my visa?', a: 'A TFN is a tax matter. For anything about your visa, check with the Department of Home Affairs.' },
      { q: 'My employer says I must give a TFN now or stop working. What can I do?', a: 'Explain that you have applied and show your receipt ID. The tax rules allow 28 days to provide the number, after which the employer takes the higher rate instead.' },
    ],
    sources: [
      { label: 'ATO: TFN application for foreign passport holders and temporary visitors', href: TFN_APPLY },
      { label: 'ATO: Tax file number and withholding declarations (for employers)', href: TFN_DECL },
      { label: 'ATO: What is the Medicare levy', href: MEDICARE_RATE },
    ],
  },

  // 9. from do-you-need-new-tfn-second-visa
  {
    slug: 'same-tfn-new-visa-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'New student or graduate visa: do you need a new TFN?',
    description: 'Moving from a 500 to a 485 visa, starting a new course, or coming back after time away? Your TFN stays the same. What students should update instead.',
    answer: 'No. A TFN is yours for life, so you keep the same number when you move to a new student visa, a 485 graduate visa, or return after time overseas. What you may need to update is your address, your bank details and your TFN declarations.',
    body: `Students change visas more often than most people. You might finish a bachelor's degree and start a master's on a new student visa, or move from a student visa (500) to a temporary graduate visa (485). Some students go home for a while and come back later. In every case, the tax file number question has the same answer.

## The short answer: same TFN

The ATO says your TFN is yours for life. You keep it even if you change jobs or your name, move interstate or go overseas. A new visa does not create a new TFN, and you do not need to apply again.

Applying again is not just unnecessary. It can create a second record that conflicts with your first one, and sorting that out takes time.

This is true for every common student path: a new student visa for a second course, a move from a 500 to a 485 visa, or a return to Australia after years at home. The number on your first TFN letter is the number you use for the rest of your life in the Australian tax system.

## Can't find your old TFN?

If you are not sure of your number, look for it before you do anything else. The ATO says you can usually find it:

- in ATO online services, through myGov or the ATO app
- on your notice of assessment from a past tax return
- on an ATO letter, such as a statement of account
- on a payment summary or income statement from an employer
- on a super fund statement

If you used a registered tax agent before, you can also ask them for it.

## What to update when your visa changes

Your TFN stays the same, but the information around it may need attention.

**Your address and contact details.** The ATO may still have the address of your first student room. Update it in ATO online services, so letters reach you.

**Your bank account.** Refunds, if any, are paid into an Australian bank account. If you closed an old account, make sure the ATO has your current one before you lodge.

**Your TFN declarations.** Your employers still use the same TFN. But if your answers change, for example about residency for tax purposes, ask your employer whether you need to complete a new declaration. Any new employer needs its own declaration in any case.

## Does your tax residency change with your visa?

Not automatically. Residency for tax purposes depends on your situation, not just the visa label. A student enrolled in a course of 6 months or more may be a resident for tax purposes. When you move to a 485 visa or to a new course, look at your situation again for each year. If the answer may be different, get help before you lodge.

For 2025-26, residents pay no tax on the first $18,200, then 16% from $18,201 to $45,000. Foreign residents pay 30% from the first dollar up to $135,000.

## What about your super?

Super from all your jobs is linked to your TFN, so it stays with you across visas. You cannot claim it as a departing Australia superannuation payment (DASP) while you still hold an active visa. The DASP is only for people whose temporary visa has ended and who have left Australia.

So if you move straight from a student visa to a 485 visa, your super simply stays in your fund. It is a good time to check your super online and see if you have more than one account.

## A worked example: from 500 to 485

Ravi finished his master's in December and moved to a 485 visa in January. He kept the same casual job and later started a second one.

- He did not apply for a new TFN. His employer already had it.
- He gave his new employer a TFN declaration with the same TFN, and did not claim the tax-free threshold there, because his first job already claimed it.
- He updated his address with the ATO after moving out of student accommodation.
- He checked his super in myGov and found a small second account from a job in first year.

## Coming back after time away

If you leave Australia and return later on a new visa, your TFN is still the same. You give it to your new employer on a TFN declaration, just as you did the first time. Two things are worth checking:

- **Any year you did not lodge.** If you worked in a past year and did not lodge a tax return, that year is still open.
- **Super from your first stay.** If you did not claim it, it may still be with your fund, or with the ATO if the fund transferred it.

Both are linked to the same TFN, so once you sign in to ATO online services you can usually see your past income statements and your super accounts in one place. This makes it much easier to sort out an old year before you start the new one.

## Checklist

- Do not apply for a new TFN
- Find your number in myGov or on an old document if you need it
- Update your address and bank account with the ATO
- Give each new employer a TFN declaration
- Look at your residency for tax purposes again for each year
- Check your super accounts online

If you have a year to lodge, or a past year still open, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Do I need to tell the ATO that my visa has changed?', a: 'Your TFN does not change with a new visa, so there is nothing new to apply for. Do keep your address and bank details up to date in ATO online services.' },
      { q: 'Can I claim my super when my student visa ends?', a: 'Not while you hold another active visa, such as a 485. The DASP is for people whose visa has ended and who have left Australia.' },
      { q: 'My name changed since I got my TFN. Is the number still valid?', a: 'Yes. The ATO says you keep your TFN even if you change your name. Update your details with the ATO.' },
    ],
    sources: [
      { label: 'ATO: What is a tax file number', href: TFN_WHAT },
      { label: 'ATO: Lost or stolen TFN', href: TFN_LOST },
      { label: 'ATO: Departing Australia superannuation payment', href: DASP },
      { label: 'ATO: Studying in Australia', href: STUDYING },
    ],
  },

  // 10. from how-to-find-lost-tfn
  {
    slug: 'find-lost-tfn-international-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Lost your TFN? Where international students can find it',
    description: 'Your TFN is permanent, so a lost number is a search, not a new application. The places students can find it, what to do if it was stolen, and how to store it.',
    answer: 'Your TFN is yours for life, so you find it rather than apply again. The ATO says you can see it in ATO online services through myGov, or find it on your notice of assessment, an income statement or payment summary, ATO letters, or a super statement.',
    body: `Many students lose track of their tax file number. The letter was in a folder in your first room, and that room was two moves ago. The good news is that your TFN is permanent and it appears in more places than you think. This guide shows where to look, step by step.

## Why you should not apply again

A TFN is yours for life. The ATO says you keep it even if you change jobs or your name, move interstate or go overseas. So if you had one, you still have it. A new application does not replace the old number. It only creates a conflict that has to be sorted out.

## Where to look online

The quickest place is ATO online services. The ATO says that if you already have a TFN and do not remember it, you can find it online. You sign in through your myGov account or the ATO app.

If you have a myGov account linked to the ATO, this usually takes a few minutes. If you do not have one yet, setting one up is worth it anyway, because you also use it to see your income statements and your super.

If you have already left Australia, you can still use myGov from overseas. The ATO says you may need to update your sign-in settings for use overseas, so it is easier to do this before you leave.

## Where to look in your documents

The ATO says you can usually find your TFN on:

- your notice of assessment from a past tax return
- ATO letters, such as a statement of account
- a payment summary or income statement from your employer
- your super fund statement

Also search your email for "tax file number". Students often find it in an old onboarding email from an employer, or in a welcome message from a super fund.

Look in the places you keep paper too. Many students keep a folder with their visa grant, enrolment letters and bank papers. The original ATO letter is often in that folder. If you moved house, check boxes you have not unpacked yet before you decide the letter is gone.

## Ask someone who already has it

- **Your registered tax agent.** If someone lodged your return before, the ATO says you can ask them for your TFN.
- **Your super fund.** If you gave your TFN to your fund, your super statement may show it.

Be careful who you ask. Real organisations will not send your TFN to an unknown email address or post it in a public place. If someone you do not know offers to "find your TFN" for a fee, do not give them your passport details.

## If your TFN was lost or stolen

Losing a TFN letter in a move is common. But if you think someone else has your TFN, for example after a phishing message or a stolen bag, act quickly. The ATO says to tell it as soon as possible. You can phone its Client Identity Support Centre on 1800 467 033, between 8:00 am and 6:00 pm, Monday to Friday.

The centre can help you re-establish your identity, and it may put security measures on your account to watch for unusual activity.

## A worked example

Hana worked in her first year of study, then stopped to focus on exams. In her third year she gets a new tutoring job, and the employer asks for her TFN. She cannot find the letter.

- She signs in to myGov, opens ATO online services, and finds her TFN.
- While she is there, she sees that her first-year employer reported $9,000 of income and that she never lodged a return for that year.
- She gives her new employer a TFN declaration with the same TFN. If she may be a resident, she claims the tax-free threshold from this job only.

Hana did not need a new TFN at all. She also found a year that still needs a tax return, and she can lodge it now using the same number.

## When it becomes urgent, and how to keep it safe

Two moments make a lost TFN a real problem:

- **A new job.** Without your TFN, and without telling your employer you have applied, the employer must take tax at the top rate plus the Medicare levy, which is 47% for 2025-26.
- **Leaving Australia.** Your TFN is optional on a DASP application for your super, but it helps link your accounts. Find it before you fly, when your myGov access is easy to use.

Once you have it back, keep it safe:

- Store it in a password manager or another secure place
- Do not keep it together with a copy of your passport
- Do not post it in group chats or send it to people you have not checked
- Give it only to those with a legitimate reason, such as your employer, bank, super fund or university

## Checklist

- Do not apply for a new TFN
- Look in ATO online services through myGov or the ATO app
- Check old notices of assessment, income statements and super statements
- Ask your registered tax agent, if you used one
- Report a stolen TFN to the ATO quickly

If you find an old year you never lodged, Student Visa Tax can help with it on WhatsApp.`,
    faq: [
      { q: 'Can my university give me my TFN?', a: 'Your university may hold it if you gave it to them, but the reliable places are ATO online services, your notice of assessment, income statements and super statements.' },
      { q: 'I am back home now. Can I still find my TFN?', a: 'Yes. You can sign in to ATO online services through myGov from overseas, though you may need to update your sign-in settings first. Old Australian documents also show the same number.' },
      { q: 'Is it a problem if I applied for a second TFN by mistake?', a: 'It can cause delays, because the records conflict. Contact the ATO to sort it out, and use your original number.' },
    ],
    sources: [
      { label: 'ATO: Lost or stolen TFN', href: TFN_LOST },
      { label: 'ATO: What is a tax file number', href: TFN_WHAT },
      { label: 'ATO: TFN application for foreign passport holders and temporary visitors', href: TFN_APPLY },
    ],
  },

  // 11. from what-is-an-abn
  {
    slug: 'what-is-an-abn-international-students',
    category: 'ABN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'How ABN income is taxed for international students',
    description: 'An ABN means no tax is taken from your pay. How a student\'s ABN income is taxed for 2025-26, what you can claim, when GST applies, and how to avoid a bill.',
    answer: 'Nobody takes tax out of ABN income. It goes on your tax return as business income, your business costs come off it, and tax is worked out on the rest together with any wages, using resident or foreign resident rates for 2025-26.',
    body: `If you deliver food through an app, tutor private students or freelance online, you probably have an Australian business number (ABN). The ABN itself is simple. What surprises students is how the tax works at the end of the year. This guide explains it, with a worked example.

## Who has an ABN, and why

The Australian Business Register says you are entitled to an ABN if you are carrying on, or starting, an enterprise in Australia. For students, that is usually work done in your own small business: app delivery where you choose your hours, private tutoring, freelance design or photography.

You are not entitled to an ABN for work you do as an employee, even if the business calls it contracting. If you work fixed shifts under a supervisor in someone else's business, that is very likely a job, not a business.

Your visa conditions apply to all work, with or without an ABN. Check them with the Department of Home Affairs.

## The key difference: no tax taken out

With a normal job, your employer takes tax from each pay and sends it to the ATO. With ABN work, the full payment lands in your bank account. Nobody takes tax out.

The tax is still owed. It is worked out on your tax return after the financial year ends on 30 June. If you spent all the money during the year, the bill can be a shock.

If you send an invoice without quoting your ABN, the business you invoice may have to withhold 47% of the payment. Always quote your ABN.

## How the tax is worked out

On your return, ABN income and wages are added together:

- Start with your business income (what the app or clients paid you).
- Take away business costs you can claim.
- Add your wages and any other income.
- Tax is worked out on the total, at the rates that apply to you.

For 2025-26, a student who may be an Australian resident for tax purposes pays nothing on the first $18,200, then 16% from $18,201 to $45,000, and 30% from $45,001 to $135,000. A foreign resident for tax purposes pays 30% from the first dollar up to $135,000, with no tax-free threshold.

## A worked example

Anh delivers food through an app and also works in a bakery. In 2025-26:

- Delivery income: $14,000, with no tax taken out
- Business costs she can claim: $3,000, so her business income is $11,000
- Bakery wages: $16,000, with tax taken by the bakery
- Taxable income: $27,000

If Anh may be a resident for tax purposes: $27,000 less $18,200 is $8,800, taxed at 16%, which is $1,408. The low income tax offset of up to $700 reduces that to $708. The tax the bakery took is credited against this. If the bakery took less than $708, she has a bill. The Medicare levy is a separate question; many students may claim an exemption with a Medicare Entitlement Statement.

If Anh is a foreign resident for tax purposes: 30% of $27,000 is $8,100, and the low income tax offset does not apply.

## What business costs can you claim?

The basic rules are the same as for any deduction: you spent the money yourself, it relates directly to earning the income, and you have a record. Common costs for student delivery riders and freelancers include:

- the work part of phone and data costs
- fees the platform charges you
- equipment you use for the work, such as a delivery bag
- car costs, if you use a car (the cents per km method is for cars only, not motorcycles or bicycles)

Keep written records for 5 years from when you lodge. Private use must be taken out.

## When does GST apply?

- **Ride-sourcing (for example, driving passengers with a ride app):** you must register for GST before you start, whatever you earn.
- **Other businesses, including food delivery:** GST registration is required once your turnover reaches $75,000.

Most students doing food delivery or tutoring stay well below $75,000. Once you register for GST, you have extra reporting to do, so only register when the rules require it or when you have a clear reason.

## How to avoid a big bill

- Put aside part of every ABN payment in a separate account.
- Keep receipts as you go, not at the end of the year.
- Check your total income during the year, not only in July.
- If you do owe tax and cannot pay it all at once, the ATO may let you set up a payment plan.

How much to put aside depends on your total income and your residency for tax purposes. Look again at the example above. A student who may be a resident and earns a modest amount may owe little. A foreign resident pays 30% from the first dollar, so putting aside about 30% of each ABN payment is a safer habit for them. It is always easier to have money left over than to find it in October.

## Checklist

- Make sure the work is really your own business, not a job
- Quote your ABN on every invoice
- Save money for tax from each payment
- Keep records for 5 years
- Cancel your ABN when you stop the business, and still lodge your final return

ABN work makes a return more detailed. If you want help with yours, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Do I pay a different tax rate on ABN income?', a: 'No. ABN income is added to your wages, and the total is taxed at your normal rates as a resident or foreign resident for tax purposes.' },
      { q: 'Does an ABN make me lose my tax-free threshold?', a: 'No. If you may be a resident for tax purposes, the tax-free threshold applies to your total taxable income, including ABN income.' },
      { q: 'Do I get super on ABN delivery work?', a: 'Usually not, because you run your own business. Employees, and some contractors paid mainly for their labour, get super paid for them.' },
    ],
    sources: [
      { label: 'Australian Business Register: ABN entitlement', href: ABN_ENTITLEMENT },
      { label: 'ATO: Statement by a supplier not quoting an ABN', href: NO_ABN },
      { label: 'ATO: Ride-sourcing registrations', href: RIDE },
      { label: 'ATO: Records you need to keep', href: RECORDS },
    ],
  },

  // 12. from how-to-register-for-an-abn
  {
    slug: 'how-to-register-for-an-abn-students',
    category: 'ABN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'How to register for an ABN as an international student',
    description: 'Applying for an ABN is free and often instant. A step-by-step guide for students: check you are entitled, prepare your TFN, apply online, and set up for tax time.',
    answer: 'Check that you are really running your own business, have your TFN ready, and apply online with the Australian Business Register. There is no fee, and if all your details can be checked, you usually get the ABN straight away.',
    body: `Delivery apps and freelance platforms often ask students for an ABN before the first job. Applying is quick and free. But there is an important question to answer first, and a few things to set up after. This guide takes you through it step by step.

## Step 1: check that you are entitled

The Australian Business Register says you are entitled to an ABN if you are carrying on, or starting, an enterprise in Australia. In plain words: you are running your own business activity. For a student, that might be:

- delivering food through an app, choosing your own hours
- tutoring private students who pay you directly
- freelance design, writing, photography or web work for several clients

You are not entitled to an ABN for work you do as an employee, even if the business calls it contracting. An employer should not ask you to get an ABN as a condition of a job. The register also warns that applying when you are not entitled can lead to prosecution.

A quick test: if a business gives you a roster, a supervisor and its own equipment, and pays you by the hour, you are very likely an employee. In that case you need your TFN, not an ABN.

Before you start any work, check your visa conditions with the Department of Home Affairs.

## Step 2: get your TFN first

The ATO says you cannot apply for an ABN without a TFN. If you do not have one yet, apply for your TFN first. An ABN does not replace your TFN. You keep using your TFN for your jobs, your super and your tax return.

## Step 3: prepare your details

Have these ready:

- your TFN
- your name and date of birth, exactly as in your passport
- your Australian address and contact details
- a short, clear description of your business activity, for example "food delivery" or "private tutoring"
- the date you started, or will start, the business

As a student working alone, you would usually apply as a sole trader, which means an individual in business. You do not need a company or a business name to start. You can trade under your own name.

Take a minute to describe your activity clearly. A clear description helps the register understand what you do and decide your application quickly.

## Step 4: apply online with the register

Apply through the Australian Business Register website. The register does not charge a fee for an ABN, online or on paper. Some websites charge to apply for you. You do not need to pay them.

If you give all the information required and it can be checked, you usually get your ABN right away when you finish the application. If something is missing or cannot be checked, the application is processed by hand, which can take up to 28 days.

## Step 5: decide about GST

GST is a separate registration, and the ABN application asks about it. For students the rules are:

- **Ride-sourcing, such as driving passengers for a ride app:** you must register for GST before you start, whatever you earn.
- **Other businesses, including food delivery and tutoring:** registration is required once your turnover reaches $75,000.

Do not register for GST if you do not need to. It brings extra reporting, and you have to keep doing it until you cancel.

## Step 6: set up for tax time from day one

ABN income has no tax taken out. It goes on your tax return as business income, your business costs come off it, and tax is worked out on the rest together with any wages.

- Quote your ABN on every invoice. If you do not, the business may have to withhold 47% of the payment.
- Open a separate savings account and move part of each payment into it for tax.
- Keep records of your income and costs. Keep written evidence for 5 years from when you lodge.

## A worked example

Wei tutors high school maths on weekends and charges $40 an hour. Over 2025-26 he teaches 300 hours, which is $12,000. His claimable costs, such as the work part of his laptop and phone, total $1,000. He also earns $10,000 in wages from a café.

- Business income: $12,000 less $1,000 is $11,000
- Taxable income: $11,000 plus $10,000 is $21,000

If Wei may be a resident for tax purposes, the tax for 2025-26 is 16% of the $2,800 above $18,200, which is $448. The low income tax offset of up to $700 reduces that to nil. If he is a foreign resident for tax purposes, the tax is 30% of $21,000, which is $6,300, and his café tax is credited against it. This is why he saves part of every tutoring payment.

## When you stop, and your checklist

When your business stops, cancel your ABN. The register says to update or cancel within 28 days after the business stops. Cancelling does not end your duty to lodge your final tax return, so include all your ABN income for that year.

- Be sure you are running your own business, not working as an employee
- Have your TFN ready
- Apply free with the Australian Business Register
- Register for GST only if the rules require it
- Quote your ABN on invoices and save money for tax
- Cancel the ABN when you stop, and still lodge your return

If your year includes ABN income, Student Visa Tax can help with your return on WhatsApp.`,
    faq: [
      { q: 'Is it free to get an ABN?', a: 'Yes. The Australian Business Register does not charge a fee for an ABN application, online or on paper.' },
      { q: 'How long does an ABN take?', a: 'Usually it is issued straight away when you finish the online application. If details need checking by hand, it can take up to 28 days.' },
      { q: 'Can I have an ABN and a part-time job at the same time?', a: 'Yes. Your job uses your TFN and has tax taken out. The ABN is only for the work you do in your own business.' },
    ],
    sources: [
      { label: 'Australian Business Register: ABN entitlement', href: ABN_ENTITLEMENT },
      { label: 'Australian Business Register: ABN basics', href: ABN_FAQ },
      { label: 'ATO: What is a tax file number', href: TFN_WHAT },
      { label: 'ATO: Ride-sourcing registrations', href: RIDE },
    ],
  },
]
