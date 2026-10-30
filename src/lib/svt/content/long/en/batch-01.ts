import type { LongArticle } from '../types'

const ATO = 'https://www.ato.gov.au'

export const LONG_EN_01: readonly LongArticle[] = [
  {
    slug: 'farm-work-abn-international-students',
    category: 'ABN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Farm work on an ABN: a guide for international students',
    description: 'Picking or packing in the holidays? When a farm can pay you on an ABN, when it should be payroll, and what each one means for your tax, super and minimum pay.',
    answer: 'You only need an ABN for farm work if you are genuinely running your own business as a contractor. If the farm or labour hire company sets your hours, supervises you and supplies the equipment, you are most likely an employee, and your TFN is enough.',
    body: `Many international students take farm jobs during the long summer break or between semesters. Fruit picking, packing sheds and nurseries often need extra workers for a few weeks. Some of these jobs are on payroll. Others ask you to get an Australian Business Number (ABN) and send invoices. The difference matters a lot for your pay, your super and your tax return.

Before you accept any farm job, check your visa conditions with the Department of Home Affairs. This guide is only about tax and pay.

## Why do some farm jobs ask for an ABN?

Large farms often do not hire seasonal workers themselves. They use labour hire companies, and some of these companies pay workers as contractors instead of employees. When you are a contractor, the business does not take tax out of your pay, does not pay super for you and does not have to follow award pay rates.

This can be legal, but only when you really are running your own business. The Australian Business Register says you are entitled to an ABN only if you carry on an enterprise. You are not entitled to one for work you do as an employee, even if the business calls it contracting. The Register also says an employer should not ask you to get an ABN as a condition of giving you a job.

## Employee or contractor: what decides it?

The real working arrangement decides it, not the paperwork. The ATO says having an ABN does not on its own make you a contractor, and a contract that says "contractor" does not change the real relationship.

An employee works in someone else's business. That business controls how, where and when the work is done. A contractor runs their own business, often uses their own tools and methods, may negotiate their fees and can work for several clients. Several factors are weighed together.

On a typical farm job, ask yourself these questions:

- Does a supervisor tell you when to start, which rows to pick and when to take breaks?
- Does the farm supply the bins, ladders, transport and protective gear?
- Do you work only for this business during the season?
- Is a co-worker doing the same job on payroll?

If most answers are yes, the job looks like employment.

## Do piece rates make you a contractor?

No. Being paid per bin, per kilo or per tray is just a way of working out pay. Piece rates are used for employees and for contractors, so they do not tell you which one you are.

For employees under the Horticulture Award, piece rates come with protection. The Fair Work Ombudsman says pieceworkers have a minimum wage guarantee for each day they work: they must be paid at least the hourly rate for the pieceworker multiplied by the hours worked. If your piece earnings for the day are higher, you get the higher amount. Fair Work also says a piecework record must be made, signed and given to you before the work starts.

A genuine contractor has no such floor. If the fruit is poor or the weather stops work, a contractor simply earns less. This is often the biggest money difference between the two arrangements.

## What changes for your tax?

Employees have tax taken out of each pay by their employer. Contractors are paid the full amount and pay the tax later, when they lodge their return. ABN income has no tax taken out, so you need to keep some money aside from each payment.

At tax time, all your income goes on one tax return: farm income on an ABN, wages from a café job during semester, and anything else you earned in the financial year. If you are enrolled in a course of 6 months or more, you may be an Australian resident for tax purposes, and resident rates and the tax-free threshold may apply to your total income. Genuine business expenses, such as gloves or a hat you bought for the job, can reduce your ABN income.

One more rule: if you do contract work and do not give the business an ABN, the ATO says the payer must withhold 47% from the payment in most cases. That money is not lost, because it is credited on your tax return, but it can leave you short of cash for weeks or months.

## What do you lose if you are treated as a contractor by mistake?

Super is the big one. The ATO says employees are generally eligible for super guarantee whether they are full-time, part-time or casual, including temporary residents. The rate is 12% of ordinary earnings. A contractor usually gets no super, although the ATO says contractors paid mainly for their labour can also be eligible for the labour part of their pay.

You may also lose the award minimum rate, paid breaks and the protection of the employer's workers compensation insurance. These are real costs, even for a short summer job.

## How do you spot sham contracting?

Sham contracting is when a business treats an employee as a contractor to avoid paying super, award rates or other entitlements. It is illegal, and the business can face penalties. Watch for these signs:

- You are pushed to register for an ABN quickly, before the job is explained.
- The business cannot clearly say whether you are an employee or a contractor.
- You do the same work, with the same supervisor and roster, as payroll staff who get super.
- The business controls your hours, your tools and your location.

The Fair Work Ombudsman says visa holders have the same workplace rights as other workers, and that your visa will not be cancelled because you contact them for help. You can call them on 13 13 94, or use their interpreter service on 13 14 50.

## Before your first shift: a checklist

Ask the right questions before you travel to the farm, because it is harder to fix later.

- Ask in writing: "Am I an employee or a contractor?"
- If you are an employee, give your TFN and fill in a TFN declaration. You do not need an ABN.
- If you are a genuine contractor, apply for an ABN through the Australian Business Register. It is free.
- Keep every payslip or invoice, and make sure payments go into your bank account, not cash.
- Keep receipts for anything you buy for the job. The ATO says to keep written evidence for 5 years from when you lodge.
- Keep a simple work diary with dates, hours and the farm's name.

If you worked on a farm in the holidays and are not sure how to report it, you can message Student Visa Tax on WhatsApp and we can look at your year with you.`,
    faq: [
      { q: 'Can a farm make me get an ABN to give me a job?', a: 'The Australian Business Register says an employer should not ask you to get an ABN as a condition of employment. If the job works like employment, you are an employee whatever the paperwork says.' },
      { q: 'I was paid per bin. Am I a contractor?', a: 'Not because of piece rates. Piece rates are used for employees too, and employees under the Horticulture Award have a daily minimum wage guarantee.' },
      { q: 'Does farm income on an ABN go on a separate tax return?', a: 'No. ABN income and wages from any job go on the same tax return for the financial year. Nothing is withheld from ABN income, so you may have tax to pay on it.' },
    ],
    sources: [
      { label: 'Australian Business Register: ABN entitlement', href: 'https://www.abr.gov.au/business-super-funds-charities/applying-abn/abn-entitlement' },
      { label: 'Fair Work Ombudsman: Horticulture pay and piece rates', href: 'https://horticulture.fairwork.gov.au/pay-and-piece-rates' },
      { label: 'ATO: Common myths about being a contractor', href: `${ATO}/individuals-and-families/jobs-and-employment-types/employee-or-independent-contractor-what-s-the-difference/common-myths-about-being-a-contractor` },
      { label: 'ATO: Work out if you have to pay super', href: `${ATO}/businesses-and-organisations/super-for-employers/work-out-if-you-have-to-pay-super` },
    ],
  },
  {
    slug: 'employee-vs-contractor-test-international-students',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Employee or contractor? A step-by-step test for students',
    description: 'Tutoring, delivery, cleaning or events work? Walk through the questions that decide if you are an employee or a contractor, with three student jobs tested.',
    answer: 'You are an employee if you work in someone else\'s business and they control how, where and when you work. You are a contractor only if you genuinely run your own business, and the word on your contract does not decide it.',
    body: `Students in Australia do many kinds of part-time work: tutoring, cleaning, food delivery, event staffing, photography, retail. Some of these jobs are on payroll. Others are paid by invoice. If you are not sure which one you have, this guide gives you a simple way to test it, step by step.

The answer matters. It decides whether tax is taken out of your pay, whether you get super, and what you must do at tax time.

## Why the contract alone does not answer the question

Many students think the contract decides it. It does not. The ATO says a contract that calls you a "contractor" does not override the real working relationship. It also says that having an ABN does not on its own make you a contractor, and that the length of the job or what is normal in the industry does not decide it either.

Instead, the ATO and business.gov.au look at how the work really happens. Several factors are weighed together. No single answer below settles it, but together they give a clear picture.

## Step 1: who controls the work?

Start with control, because it often carries the most weight. An employee works in someone else's business, and that business decides how, where and when the work is done.

- Does someone give you a roster or tell you which shifts to work?
- Does a manager tell you how to do the task, step by step?
- Do you have to wear the business's uniform or follow its scripts?

If the business controls these things, that points to employment. A contractor usually agrees on the result and then decides for themselves how to get there.

## Step 2: whose business is it?

Next, ask whether you are part of their business or running your own. Contractors often use their own tools and equipment, set or negotiate their own prices, and can work for several clients at the same time.

- Do you bring your own equipment, or does the business supply everything?
- Can you set your own price, or is your hourly rate fixed by them?
- Do you have other clients, or do you only work for this one business?

A student who brings their own camera, sets their own prices and photographs events for several families is acting like a business. A student who works shifts in a shop using the shop's register is not.

## Step 3: can you send someone else, and can you lose money?

Two more questions help. First, can you send another person to do the work instead of you? An employee usually must do the work personally. A genuine contractor can often pass the job to someone else.

Second, can the job cost you money? A contractor carries business risk. If something goes wrong, they may have to fix it at their own cost. An employee is paid for their time, and the business carries the risk.

## Step 4: how are you paid?

Look at how the money arrives. An employee is usually paid by the hour or by the shift, gets a payslip, and has tax taken out before the money reaches their account. The Fair Work Ombudsman says employers must give pay slips within 1 working day of payday.

A contractor sends an invoice and is paid the full amount, with no tax taken out. The contractor then pays tax on that income when they lodge their tax return. On its own, the payment method does not decide your status, but it shows how the business sees you.

## Three common student jobs, tested

Here is how the steps might work out for three typical jobs. Your own situation may be different, so always look at how your job really runs.

- **Café or retail shifts:** the business sets the roster, supplies everything and pays by the hour. This points strongly to employee. You give your TFN, not an ABN.
- **Private tutoring through your own ads:** you find your own students, set your own price, choose your hours and could teach for anyone. This points to running your own business, so an ABN may be right.
- **Food delivery through an app:** delivery platforms usually treat riders as contractors with an ABN. Riders choose when to log in and use their own bike or car. Students doing this work usually invoice through the app and pay their own tax.

## What super and tax look like on each side

The ATO says generally all employees are eligible for super guarantee, including casual workers and temporary residents. The rate is 12%. From 1 July 2026, Fair Work says employers must pay super at the same time as wages. Contractors usually get no super, but the ATO says contractors paid mainly for their labour can be eligible for super on the labour part.

At tax time, both kinds of income go on one return. If you are enrolled in a course of 6 months or more, you may be an Australian resident for tax purposes, and resident rates may then apply to your total income. Remember that nothing is withheld from contractor income, so you may have tax to pay.

## If your answers say "employee"

If you are treated as a contractor but your answers point to employment, this may be sham contracting. Sham contracting is illegal, and the business can face penalties. You may be owed super and the difference between what you were paid and the award minimum.

- Write down your hours, rosters and who supervised you.
- Keep every invoice, message and bank deposit.
- Contact the Fair Work Ombudsman on 13 13 94. Their interpreter service is 13 14 50.

The Fair Work Ombudsman says visa holders have the same workplace rights as other employees, and your visa will not be cancelled for contacting them for help.

Before you accept any new job, use this short list to test it:

- Control: who sets your hours and methods?
- Business: whose tools, whose prices, how many clients?
- Substitution and risk: can you send someone else, and can you make a loss?
- Payment: payslip with tax withheld, or invoice with nothing withheld?
- Records: keep payslips, invoices and messages for every job.`,
    faq: [
      { q: 'Can I be an employee and a contractor in the same year?', a: 'Yes. Many students have a payroll job and some contract work. Both incomes go on the same tax return.' },
      { q: 'My employer asked me to get an ABN. Does that make me a contractor?', a: 'No. The ATO says having an ABN does not on its own make you a contractor. The way the work really runs decides it.' },
      { q: 'Who can I ask if I think I was wrongly treated as a contractor?', a: 'The Fair Work Ombudsman, on 13 13 94. Visa holders have the same workplace rights as other employees.' },
    ],
    sources: [
      { label: 'ATO: Common myths about being a contractor', href: `${ATO}/individuals-and-families/jobs-and-employment-types/employee-or-independent-contractor-what-s-the-difference/common-myths-about-being-a-contractor` },
      { label: 'business.gov.au: Employee or contractor?', href: 'https://business.gov.au/People/Contractors/Employee-or-contractor' },
      { label: 'ATO: Work out if you have to pay super', href: `${ATO}/businesses-and-organisations/super-for-employers/work-out-if-you-have-to-pay-super` },
      { label: 'Fair Work Ombudsman: Visa holders and migrants', href: 'https://www.fairwork.gov.au/find-help-for/visa-holders-migrants' },
    ],
  },
  {
    slug: 'tfn-and-abn-together-international-students',
    category: 'ABN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Can you have a TFN and an ABN on a student visa?',
    description: 'Yes, many students have both. Learn what each number is for, how wages and ABN income meet on one tax return, and why the ABN part can turn into a tax bill.',
    answer: 'Yes. You can hold a tax file number (TFN) and an Australian Business Number (ABN) at the same time. Your TFN is for you as a person and for any job as an employee, and your ABN is only for work you do as a genuine business.',
    body: `A student might work weekend shifts in a restaurant and also deliver food through an app in the evenings. That is two kinds of income: wages as an employee and business income as a contractor. Each one uses a different number. This guide explains how the two fit together and what to watch at tax time.

## What is the difference between a TFN and an ABN?

Your TFN is your personal number with the Australian Taxation Office (ATO). It stays with you for life. You give it to your employers, your super fund and whoever helps you with your tax return. Every tax return you lodge is under your TFN.

An ABN identifies a business. You put it on the invoices you send. The Australian Business Register says you are entitled to an ABN if you are carrying on, or starting, an enterprise in Australia. You are not entitled to one for work you do as an employee. Applying for an ABN through the Register is free.

## When does a student need both?

You need both when you have at least one job as an employee and some genuine business work as well. Common examples for students:

- A part-time job in retail, hospitality or a warehouse, paid through payroll (TFN only)
- Food delivery through an app that treats riders as contractors (ABN)
- Private tutoring, photography, design or cleaning for your own clients (ABN)
- Selling a service you advertise yourself online (ABN, if it is a real business)

If all your work is as an employee, you only need your TFN. Your employer should not ask you to get an ABN as a condition of giving you a job.

## How do wages and ABN income meet at tax time?

Everything goes on one tax return for the financial year, which runs from 1 July to 30 June. You do not lodge a separate return for your ABN as a sole trader.

The big difference is tax during the year. Your employer takes tax out of every pay and sends it to the ATO. With ABN income, nothing is taken out. You receive the full amount, and the tax on it is worked out when you lodge. Your wages are also reported to the ATO by your employer, so they appear in your income statement. ABN income does not appear there. You must add it yourself from your own records.

## A worked example

Here is a simple example for 2025-26. Mai is enrolled in a two-year course, so she may be an Australian resident for tax purposes. She earned $18,000 in wages from a café and $8,000 of net ABN income from delivery work, after her business expenses.

- Total taxable income: $26,000
- Tax at 2025-26 resident rates: nothing on the first $18,200, then 16% on $7,800, which is $1,248
- Low income tax offset: $700, so tax becomes $548
- Medicare levy: extra, unless she can claim the exemption

Her café wages were under the tax-free threshold, so her employer probably took out little or no tax. Nothing was taken from the delivery income. So Mai may have around $548 to pay, plus any Medicare levy. If she had kept a small part of each delivery payment aside, this would not be a surprise.

If Mai were a foreign resident for tax purposes, the result would be very different. Foreign residents pay 30% from the first dollar for 2025-26, with no tax-free threshold and no low income tax offset.

## When should you not use an ABN?

You should not use an ABN for work that is really employment. The ATO says having an ABN does not on its own make you a contractor. If the business sets your roster, supervises your work and supplies your equipment, you are most likely an employee.

Watch out if an employer moves you from payroll to invoices for the same job. You would lose tax withholding, super and other entitlements, and this can be sham contracting, which is illegal. The Fair Work Ombudsman can help, on 13 13 94.

## Records to keep for your ABN work

Your employer keeps records of your wages for you, but nobody does this for your ABN work. Keep:

- A copy of every invoice you send, or the app's earnings statements
- Bank records showing each payment
- Receipts for business expenses, such as a phone share, delivery bag or equipment
- A logbook or diary if you claim car expenses

The ATO says to keep written evidence for 5 years from the date you lodge your return.

## Do you need to register for GST?

Most students with an ABN do not. The ATO says you must register once your business turnover reaches $75,000 or more. But there is one big exception: if you drive passengers for a ride-sourcing app, you must register for GST before you start, whatever you earn. Food delivery follows the normal $75,000 rule.

## Checklist for students with both numbers

- Give your TFN to every employer and fill in a TFN declaration.
- Use your ABN only for genuine business work.
- Keep part of each ABN payment aside for tax.
- Keep invoices, app statements and receipts in one folder.
- At tax time, add your ABN income to the return yourself, because it is not pre-filled.

If you have wages and ABN income and want them checked together, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Do I need a TFN before I get an ABN?', a: 'The ABN application asks for your TFN, so it makes sense to have your TFN first. You need it for any job as an employee anyway.' },
      { q: 'Do I lodge two tax returns if I have a TFN and an ABN?', a: 'No. As a sole trader, your wages and your ABN income go on one individual tax return for the financial year.' },
      { q: 'Why do I owe tax when my job always took tax out?', a: 'Your employer only taxed your wages. Nothing was taken out of your ABN income, so the tax on it is paid when you lodge.' },
    ],
    sources: [
      { label: 'Australian Business Register: ABN entitlement', href: 'https://www.abr.gov.au/business-super-funds-charities/applying-abn/abn-entitlement' },
      { label: 'ATO: Tax rates for Australian residents', href: `${ATO}/tax-rates-and-codes/tax-rates-australian-residents` },
      { label: 'ATO: Low income tax offset', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/tax-offsets/low-income-tax-offset` },
      { label: 'ATO: Registering for GST', href: `${ATO}/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/registering-for-gst` },
    ],
  },
  {
    slug: 'cancel-abn-when-you-stop-working-students',
    category: 'ABN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Stopped your gig work? How to cancel your ABN as a student',
    description: 'Finished delivery or freelance work but still studying? When to cancel your ABN, what to finish first, and why the income still goes on your tax return.',
    answer: 'Cancel your ABN when your business stops. The Australian Business Register says to do it within 28 days of stopping, and cancelling does not remove the need to lodge your final tax return with that income.',
    body: `Many students start delivery work or freelancing in their first year, then stop. Maybe you found a payroll job, your study load got heavier, or you simply lost interest. The app account is closed, but the ABN is still active. This guide is for students who are still in Australia and have stopped their ABN work. It explains when and how to cancel, and what still needs to be done.

## Why cancel an ABN you no longer use?

An ABN is a registration for a business. While it is active, the Register and the ATO treat you as someone who may be carrying on a business. If you also registered for GST, the ATO expects activity statements from you, even when you earn nothing.

An unused ABN also keeps your details on a public register. Closing it when you stop working keeps your records simple and lowers the chance of confusing letters from the ATO later.

## When should you cancel?

The Australian Business Register says that if your business has stopped, you should update your details or cancel your ABN within 28 days. So the right time is soon after your last job, not at the end of your course.

Think about the date your business really ended. If your last delivery was in April and you remember the ABN in August, it is the April date that matters. A business that "ran" for months with no income or records can lead to questions.

## What should you finish before you cancel?

The ATO says cancelling an ABN does not end your duty to lodge your final returns. Before you cancel, tidy up the business side while you can still reach your clients and your records.

- Send any invoices you still owe to clients.
- Collect any money owed to you.
- Download your earnings statements from the delivery or freelance app before your account closes.
- Gather receipts for business expenses you want to claim.
- If you were registered for GST, lodge any activity statements that are due.

If you used a car for the work, finish your records for the car too. The ATO says the cents per kilometre method is only for cars, not motorcycles or bicycles. If you delivered by bicycle or scooter, keep receipts for the actual costs you want to claim instead. It is much easier to collect these records while the work is still fresh in your mind.

## How do you cancel your ABN?

The Australian Business Register says the fastest way is online, using your myID linked to the business through Relationship Authorisation Manager (RAM). A tax professional can also cancel it for you.

You will be asked for the date the business stopped. Use the real date of your last business activity. The ATO says most registrations linked to the ABN, such as GST, are cancelled automatically when you cancel the ABN. It is still worth checking that the GST registration has ended.

## Does the ABN income still go on your tax return?

Yes. All the income you earned under your ABN in the financial year still goes on your tax return. The financial year runs from 1 July to 30 June. If you stopped in April, your ABN income from July to April goes on that year's return, together with your wages.

Nothing was taken out of your ABN income for tax. So if you also earned wages, the ABN income may reduce your refund, or you may have tax to pay. If you are enrolled in a course of 6 months or more, you may be an Australian resident for tax purposes, and the tax-free threshold may then apply to your total income.

You can claim genuine business expenses against your ABN income. The ATO says to keep your written evidence for 5 years from the date you lodge your return. Keep the records even after the ABN is cancelled.

## What if you want to start again later?

You may want to do freelance work again during your next long break. The ATO says that if the same structure reapplies later, for example you as a sole trader, you get the same ABN back. So there is no reason to keep an ABN active "just in case".

If you start a new business activity later, apply again through the Register. Applying for an ABN is free.

## What about your super?

Contract work usually comes with no super, because businesses generally do not pay super for genuine contractors. The ATO says contractors paid mainly for their labour can be eligible on the labour part of their pay. If you also had a payroll job, check your super fund statement to make sure your employer paid your super.

## Checklist before and after you cancel

- Note the date of your last business activity.
- Send final invoices and collect what you are owed.
- Save app statements and receipts.
- Cancel within 28 days of stopping, online or through a tax professional.
- Check that any GST registration has also ended.
- Include the ABN income on your next tax return, with your wages.
- Keep your records for 5 years from when you lodge.

If you are leaving Australia soon after your course, the steps are similar, but there are extra things to plan for. Students in that situation can message Student Visa Tax on WhatsApp to go through their final year.`,
    faq: [
      { q: 'How do I cancel my ABN?', a: 'You can cancel it yourself online using myID linked through Relationship Authorisation Manager (RAM), or ask a tax professional to cancel it for you.' },
      { q: 'If I cancel my ABN, do I still need to declare that income?', a: 'Yes. The ATO says cancelling does not end your duty to lodge. The income goes on your tax return for that financial year.' },
      { q: 'Will I get a new ABN if I start freelancing again?', a: 'The ATO says the same structure reapplying later gets the same ABN. As a sole trader, you would get your old ABN back.' },
    ],
    sources: [
      { label: 'Australian Business Register: When should you cancel your ABN', href: 'https://abr.gov.au/media-centre/featured-news/business-super-funds-charities/when-should-you-cancel-your-abn' },
      { label: 'ATO: Cancelling business registrations', href: `${ATO}/businesses-and-organisations/starting-registering-or-closing-a-business/changing-selling-or-closing-your-business/cancelling-business-registrations` },
      { label: 'ATO: Records you need to keep', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/records-you-need-to-keep` },
    ],
  },
  {
    slug: 'gst-abn-international-students',
    category: 'ABN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'GST and your ABN: what international students need to know',
    description: 'Most students with an ABN never need GST. Learn the $75,000 rule, why rideshare drivers must register before their first trip, and what to do if you registered.',
    answer: 'Most international students with an ABN do not need to register for GST, because registration is only required once business turnover reaches $75,000. The big exception is driving passengers for a ride-sourcing app: you must register before you start, whatever you earn.',
    body: `When you apply for an ABN, the form asks if you also want to register for GST. Many students are not sure what to answer. Some tick yes because it looks more professional, and then find they have extra forms to lodge every few months. This guide explains when GST applies to students and when it does not.

## What is GST?

GST stands for goods and services tax. It is a tax of 10% on most goods and services sold in Australia. A business that is registered for GST adds GST to its prices, collects it from customers and pays it to the ATO.

A registered business reports this to the ATO on activity statements. It can also claim back the GST included in the price of things it buys for the business. A business that is not registered does none of this.

## When must you register for GST?

The ATO says you must register for GST when your business has a GST turnover of $75,000 or more. GST turnover is the gross income from your business, not your profit. It does not include wages from a job as an employee.

- Your café wages or tutoring centre wages paid through payroll do not count.
- Your business income does count, before any expenses are taken off.
- Once you are required to register, the ATO says you must do so within 21 days.

For example, Leo earns $20,000 a year in wages from a supermarket and $9,000 from weekend deliveries on his ABN. His GST turnover is $9,000, not $29,000, because his wages do not count. He is far below the threshold.

Most students with a small ABN business, such as delivery riding or weekend photography, are far below $75,000. If you are below the threshold, not registering is the normal and correct position for most activities.

## Ride-sourcing: the important exception

The rule is different if you drive passengers for money. The ATO says that if you provide taxi or limousine travel for passengers, including ride-sourcing through an app, you must register for GST regardless of your turnover. You must register before you start driving.

This means a student who drives passengers through an app for just a few weekends still needs GST registration from the first trip. If you are thinking of driving passengers, organise your ABN and GST registration first.

## Is food delivery the same as ride-sourcing?

No. Delivering food or parcels is not carrying passengers. For food delivery, the normal $75,000 threshold applies. A student who only delivers meals through a delivery app usually does not need to register for GST.

The situation changes if you do both. If you deliver food and also drive passengers under the same ABN, you must register for GST because of the passenger work. Your GST registration then covers your business sales, not just the rides. Ask a tax professional how this applies to your mix of work.

## Should you register when you do not have to?

You can choose to register below the threshold, but for most students it is not worth it. Once you are registered, you must:

- Add GST to your prices, or account for GST in the amounts you receive
- Lodge activity statements on a regular schedule, even when you had no income
- Keep the GST you collect separate, because it belongs to the ATO
- Keep records of the GST you paid on business purchases

Being able to claim back GST on small costs, such as a phone plan or a delivery bag, rarely makes up for the extra work. Registration also does not make your business look more serious to a delivery app. If you are below the threshold and do not drive passengers, the simple choice is usually the right one: leave the GST box unticked.

## What if you registered by mistake?

It happens often. If you ticked the GST box when you applied for your ABN but your business does not need it, you can cancel the GST registration. Lodge any activity statements that are due, using the real figures, even if they are zero.

The longer a registration stays open without being noticed, the more statements may be due. So it is best to fix it as soon as you notice. A tax professional can help you sort out past statements and cancel the registration.

When your business stops completely, cancel your ABN. The ATO says most linked registrations, such as GST, are cancelled automatically when the ABN is cancelled.

## GST and your tax return

GST and income tax are separate. Even if you are not registered for GST, your ABN income still goes on your income tax return, with any wages. If you are registered, the GST you collected is not part of your income, because it belongs to the ATO.

If you are enrolled in a course of 6 months or more, you may be an Australian resident for tax purposes. Your total income, wages plus business profit, is then taxed at resident rates.

## Quick checklist

- Delivery, tutoring, cleaning or freelancing under $75,000 turnover: GST is usually not needed.
- Driving passengers for an app: register for GST before your first trip.
- Turnover reaching $75,000: register within 21 days.
- Registered by mistake: lodge what is due and cancel the registration.
- Stopped the business: cancel your ABN and check GST has ended too.
- Keep your records for 5 years from when you lodge, as the ATO requires.`,
    faq: [
      { q: 'Do my wages count towards the $75,000 GST threshold?', a: 'No. GST turnover is income from your business. Wages you earn as an employee do not count.' },
      { q: 'I only deliver food. Do I need GST?', a: 'Usually not. Food delivery follows the normal $75,000 threshold. Only passenger transport, including ride-sourcing, needs GST from the start.' },
      { q: 'Can I cancel GST if I registered by mistake?', a: 'Yes. Lodge any activity statements that are due, then cancel the registration. A tax professional can help if several are outstanding.' },
    ],
    sources: [
      { label: 'ATO: Registering for GST', href: `${ATO}/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/registering-for-gst` },
      { label: 'ATO: Ride-sourcing registrations', href: `${ATO}/businesses-and-organisations/income-deductions-and-concessions/sharing-economy-and-tax/ride-sourcing/registrations` },
      { label: 'ATO: Cancelling business registrations', href: `${ATO}/businesses-and-organisations/starting-registering-or-closing-a-business/changing-selling-or-closing-your-business/cancelling-business-registrations` },
    ],
  },
  {
    slug: 'australian-tax-year-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'How the Australian tax year works for international students',
    description: 'The tax year runs 1 July to 30 June, not with your semesters. Learn which year your pay belongs to, the part-year tax-free threshold, and the dates to remember.',
    answer: 'The Australian tax year runs from 1 July to 30 June. You lodge one tax return for each tax year in which you earned Australian income, and if you lodge yourself, the usual deadline is 31 October after the year ends.',
    body: `Your course probably starts in February or July and runs in semesters or trimesters. The tax year does not follow your course. It runs from 1 July to 30 June the next year. This means most students have income in several tax years, and each year needs its own tax return. This guide explains how it works.

## The key dates

These are the dates most students need to know:

- **1 July:** the new tax year starts.
- **30 June:** the tax year ends.
- **Around 14 July:** most employers finalise their payroll data with the ATO.
- **31 October:** the usual deadline to lodge your return if you do it yourself.

The ATO says that if you use a registered tax agent, you need to contact them before 31 October, and you may then get a later due date. For the 2025-26 year, the ATO says people lodging themselves have until 11:59 pm local time on 31 October 2026.

## Your course and the tax year do not match

Imagine a two-year master's course that starts in February 2025 and ends in December 2026. If you work part-time the whole time, your income falls into three tax years:

- 2024-25: February 2025 to 30 June 2025
- 2025-26: 1 July 2025 to 30 June 2026
- 2026-27: 1 July 2026 to December 2026, and any work after that

Each of these is a separate tax return. The first and last years are part years, which often affects how much tax you end up paying.

## Which year does a pay belong to?

Your employer reports each payment to the ATO through payroll, by the date you were paid. So a shift you worked on 28 June but were paid for on 3 July usually counts in the new tax year. Your income statement, which your employer's payroll reporting creates, shows what was paid in each year.

This is why you should use your income statement and payslips, not your memory, when you check your income.

## Your first year: part of the tax-free threshold

If you are enrolled in a course of 6 months or more, you may be an Australian resident for tax purposes. Residents get the tax-free threshold of $18,200. The ATO says that if you are a resident for only part of the year, you get part of the threshold.

The ATO's formula for newcomers is $13,464, plus $4,736 multiplied by the number of months you were in Australia, divided by 12. The month you arrived counts. The ATO's own example: a person who became a resident on 17 April has 3 months (April, May, June). Their threshold is $13,464 plus $1,184, which is $14,648. They pay no tax on the first $14,648 of their taxable income for that year.

If you are a foreign resident for tax purposes, there is no tax-free threshold at all. For 2025-26, foreign residents pay 30% from the first dollar up to $135,000.

## What happens at the end of each year?

After 30 June, the ATO compares the tax you should pay for the whole year with the tax your employers took out. If too much was taken out, you get a refund. If too little was taken out, you have tax to pay.

Your employer works out tax on each pay as if you earn that amount every pay period of the year. In a part year, for example when you arrived in March, this can mean more tax was taken out than you owe for the year. The tax return is where this is corrected, if any adjustment is needed.

## Wait until your income statement is "Tax ready"

Do not lodge on 1 July. The ATO says most employers have until 14 July to finalise their data. Wait until each of your income statements is marked "Tax ready" in myGov. If you lodge too early, your employer may finalise different numbers and you may have to amend your return.

## When you finish your course

When your course ends, your income may again fall into two tax years. The ATO says that if you worked, you will probably need to lodge after 30 June, and you can do this from overseas. Lodging before 30 June is only possible on paper if you are leaving permanently, and it is slower.

If you leave Australia, keep your Australian bank account open so any refund can be paid into it. The ATO also says an employer must give you a payment summary within 14 days if you ask for it when you leave.

Your residency for tax purposes is worked out for each year. A move overseas in the middle of a tax year can affect that year, so have your final year checked if your situation changed.

## A simple tax calendar for students

- **When you start work:** give your TFN to your employer and fill in a TFN declaration.
- **Each pay:** keep your payslips in one folder.
- **During the year:** keep receipts for work expenses.
- **After 1 July:** wait for "Tax ready", then lodge your return.
- **Before 31 October:** lodge yourself, or contact a registered tax agent.
- **Each year:** if you claim the Medicare levy exemption, get your Medicare Entitlement Statement first.

If you have income in more than one tax year and want help with each return, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Does the tax year follow the calendar year?', a: 'No. The Australian tax year runs from 1 July to 30 June the following year.' },
      { q: 'I started work in March. Do I get the full tax-free threshold?', a: 'If you may be a resident, you may only get part of it for your first year. The ATO uses $13,464 plus a share of $4,736 based on the months you were in Australia.' },
      { q: 'Do I lodge one return for my whole course?', a: 'No. You lodge one return for each tax year in which you earned Australian income.' },
    ],
    sources: [
      { label: 'ATO: Tax-free threshold for newcomers to Australia', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/tax-free-threshold-for-newcomers-to-australia` },
      { label: 'ATO: Tax in Australia, what you need to know', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/tax-in-australia-what-you-need-to-know` },
      { label: 'ATO: Access your income statement', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-statements/access-your-income-statement` },
      { label: 'ATO: Studying in Australia', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia` },
    ],
  },
  {
    slug: 'tax-rates-international-students-2025-26',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Tax rates for international students in 2025-26',
    description: 'Students on a 500 or 485 visa are taxed at resident or foreign resident rates, not a special student rate. See the 2025-26 rates and a worked example both ways.',
    answer: 'There is no special tax rate for international students. If you may be an Australian resident for tax purposes, for example because your course runs 6 months or more, resident rates and the $18,200 tax-free threshold apply; otherwise foreign resident rates apply from the first dollar.',
    body: `Students often hear about a "15% rate" from friends. That rate is only for working holiday makers on 417 and 462 visas. It never applies to student visa or graduate visa holders. Your tax rate depends on one main question: are you a resident or a foreign resident for tax purposes? This guide sets out the 2025-26 rates and shows how much difference that question makes.

## What decides your tax rate?

Your residency for tax purposes decides it. This is not the same as your visa or your immigration status. The ATO says that if you are studying in Australia in a course that lasts 6 months or more, you may be an Australian resident for tax purposes.

"May be" is important. Residency depends on your full situation, and it is worked out each year. It is not automatic. If you are not sure, have your situation checked before you lodge.

## Resident tax rates for 2025-26

If you may be a resident for tax purposes, these are the 2025-26 rates:

- $0 to $18,200: nil
- $18,201 to $45,000: 16% on each dollar over $18,200
- $45,001 to $135,000: 30% on each dollar over $45,000, plus the tax on the lower part
- $135,001 to $190,000: 37% on each dollar over $135,000, plus the tax on the lower parts
- Over $190,000: 45% on each dollar over $190,000, plus the tax on the lower parts

Only the dollars inside each band are taxed at that band's rate. For example, if you earn $50,000, the 30% rate applies only to the $5,000 above $45,000, not to all of your income. Tax at 2025-26 resident rates is $4,288 on the band from $18,201 to $45,000, plus $1,500 on the last $5,000, so $5,788 before any offset. Earning more never means you take home less.

The first $18,200 is the tax-free threshold. In your first or last year, you may only get part of it, because the ATO adjusts it for the months you were a resident.

Residents with taxable income below $66,667 may also get the low income tax offset. The ATO says it is $700 for incomes up to $37,500, and then it reduces. It can lower your tax, but it cannot create a refund by itself.

## Foreign resident tax rates for 2025-26

If you are a foreign resident for tax purposes, these are the 2025-26 rates:

- $0 to $135,000: 30% from the first dollar
- $135,001 to $190,000: 37% on each dollar over $135,000, plus $40,500
- Over $190,000: 45% on each dollar over $190,000, plus $60,850

There is no tax-free threshold for foreign residents, and no low income tax offset. The ATO says foreign residents do not pay the Medicare levy.

## A worked example: $30,000 two ways

Ana earned $30,000 in wages in 2025-26 from part-time jobs. Here is her tax both ways, before the Medicare levy.

**If she may be a resident for tax purposes:**

- Nothing on the first $18,200
- 16% on the next $11,800, which is $1,888
- Less the low income tax offset of $700
- Tax: $1,188

**If she is a foreign resident for tax purposes:**

- 30% on $30,000
- Tax: $9,000

The difference is $7,812 on the same income. This is why your residency question matters more than anything else on your return.

## The Medicare levy

The ATO says the Medicare levy is 2% of your taxable income. It applies to residents for tax purposes, but many international students are not entitled to Medicare, because they have Overseas Student Health Cover (OSHC) instead.

If you are not entitled to Medicare, you may be able to claim the Medicare levy exemption. To do this, you need a Medicare Entitlement Statement from Services Australia. The ATO says an MES does not automatically mean you are exempt, and you need one for each year you claim. Wait until you have it before you lodge. Students from countries with a reciprocal health agreement with Australia may be entitled to Medicare, and then they cannot get an MES.

## Why the tax taken out of your pay may be different

Your final tax is worked out on your return, not on your payslips. The tax your employer takes out during the year can be too high or too low. Common reasons:

- **No TFN given in time:** the ATO says that if your employer does not have your TFN within 28 days, they must take tax at the top rate plus the Medicare levy.
- **Tax-free threshold claimed at two jobs:** the ATO says to claim it from one payer only. Claiming it twice can mean too little tax is taken out and a tax bill later.
- **Wrong residency answer on your TFN declaration:** this changes the tax taken from every pay.
- **Part-year work:** tax on each pay assumes you earn that much all year.

## What to do next

- Check how you answered the residency question on each TFN declaration.
- Make sure you claimed the tax-free threshold from one employer only.
- Apply for your Medicare Entitlement Statement after 1 July if you are not entitled to Medicare.
- Wait until your income statements are "Tax ready", then lodge.
- Keep your payslips, so the tax withheld can be checked against the tax you really owe.

If you are unsure which rates apply to you, you can message Student Visa Tax on WhatsApp and we will look at your situation.`,
    faq: [
      { q: 'Is there a 15% tax rate for international students?', a: 'No. The 15% rate is only for working holiday makers on 417 and 462 visas. Students are taxed at resident or foreign resident rates.' },
      { q: 'Do 485 visa holders pay different rates?', a: 'The visa does not set the rate. Your residency for tax purposes does, so the same resident or foreign resident rates apply.' },
      { q: 'Do I pay the Medicare levy as a student?', a: 'It may apply if you are a resident for tax purposes. If you are not entitled to Medicare, you may claim the exemption with a Medicare Entitlement Statement.' },
    ],
    sources: [
      { label: 'ATO: Tax rates for Australian residents', href: `${ATO}/tax-rates-and-codes/tax-rates-australian-residents` },
      { label: 'ATO: Tax rates for foreign residents', href: `${ATO}/tax-rates-and-codes/tax-rates-foreign-residents` },
      { label: 'ATO: Studying in Australia', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia` },
      { label: 'ATO: Not entitled to Medicare benefits', href: `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/not-entitled-to-medicare-benefits` },
    ],
  },
  {
    slug: 'how-to-lodge-tax-return-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'How to lodge a tax return as an international student',
    description: 'A step-by-step guide for students on 500 and 485 visas: when to start, what to gather, the residency and Medicare questions, and your three ways to lodge.',
    answer: 'Wait until your income statements are marked "Tax ready" after 1 July, gather your TFN, bank details, records and any Medicare Entitlement Statement, then lodge online with myTax, through a registered tax agent, or on paper. If you lodge yourself, the usual deadline is 31 October.',
    body: `Your first Australian tax return can feel confusing, especially when English is not your first language. The good news is that most of the information is already held by the ATO. Your job is to check it, add what is missing and answer a few important questions correctly. This guide takes you through it in order.

## Step 1: wait for the right time

The tax year ends on 30 June, but do not lodge on 1 July. The ATO says most employers have until 14 July to finalise their payroll data. Until then, your income statement can still change.

Log in to myGov and check that each income statement is marked "Tax ready". The ATO will send a message to your myGov inbox when all your statements are ready. If one is still not ready after 31 July, the ATO says to speak to your employer. Lodging too early can mean you have to amend your return later.

## Step 2: gather what you need

Your employers have already reported your wages and tax to the ATO. You still need to have:

- Your TFN
- Your Australian bank account details for any refund
- Payslips, to check against your income statements
- Records of any ABN income, such as app statements or invoices, because this is not pre-filled
- Records of any cash income or tips, which the ATO says must also be declared
- Receipts for work expenses you want to claim
- Your Medicare Entitlement Statement, if you are claiming the Medicare levy exemption

## Step 3: answer the residency question carefully

Your tax return asks if you were an Australian resident for tax purposes. This one answer changes your tax more than anything else. The ATO says students in a course of 6 months or more may be residents for tax purposes.

If you may be a resident, you get the tax-free threshold of $18,200, or part of it in a part year. If you are a foreign resident for tax purposes, tax is 30% from the first dollar for 2025-26. If you are not sure, get your situation checked before you lodge.

The ATO also says that a student who is a temporary resident and an Australian resident is generally not taxed on most foreign income. Your Australian income is declared on the return.

## Step 4: sort out the Medicare levy

Many students are not entitled to Medicare because they have OSHC. If you are not entitled, you may be able to claim the Medicare levy exemption. You need a Medicare Entitlement Statement (MES) from Services Australia.

The ATO says applications open on 1 July and can take up to 8 weeks. Apply early, and wait for the statement before you lodge. An MES does not automatically mean you are exempt, and any dependants, including a spouse, must also be exempt. Students from countries with a reciprocal health agreement may be entitled to Medicare, and then cannot get an MES.

## Step 5: choose how to lodge

The ATO gives you three ways to lodge:

- **Online with myTax:** through your myGov account linked to the ATO. Much of your income is pre-filled.
- **Through a registered tax agent:** the agent prepares and lodges for you. If you contact them before 31 October, you may get a later due date.
- **On paper:** this is the slowest option.

The ATO also runs Tax Help, a free service for people with income around $70,000 or less and simple tax affairs. It is not for contractors or businesses, so it does not suit students with ABN delivery work.

## Step 6: check the pre-filled details and add what is missing

Before you lodge, compare each income statement with your payslips. Check the gross pay and the tax withheld for each employer. Make sure every job you had is there. If you had two jobs at the same time, check that you claimed the tax-free threshold from only one of them. The ATO says claiming it from more than one payer can mean you have a tax bill.

Then add anything that is not pre-filled. ABN income, cash work and tips are the most common gaps. Add any work deductions that you can support with records. The ATO's three rules are: you spent the money yourself and were not reimbursed, it directly relates to earning your income, and you have a record.

## Step 7: after you lodge

The ATO says most online returns are processed within 12 business days. If a return needs a manual check, it can take up to 30 calendar days. Paper returns can take up to 50 business days.

When your return is processed, the ATO sends a notice of assessment. It shows the result: a refund, if any, or an amount to pay. If you owe tax, pay by the due date shown. If you cannot pay in one amount, the ATO offers payment plans.

## Checklist

- After 1 July: apply for your MES if you are not entitled to Medicare.
- Wait until every income statement is "Tax ready".
- Gather TFN, bank details, payslips, ABN records and receipts.
- Answer the residency question carefully.
- Choose myTax, a registered tax agent or paper.
- Lodge by 31 October, or contact a registered tax agent before then.

If you would rather have your return prepared for you, you can message Student Visa Tax on WhatsApp. Every return is reviewed and signed off by a registered tax agent before it is lodged with the ATO.`,
    faq: [
      { q: 'Can I lodge my tax return on 1 July?', a: 'You can, but it is better to wait. Employers have until 14 July to finalise their data, so wait for "Tax ready" in myGov.' },
      { q: 'Do I need my payslips if the ATO already has my income?', a: 'You do not have to send them, but they help you check that your income statements are complete and correct.' },
      { q: 'Can I use Tax Help as a student?', a: 'Tax Help is free for people with income around $70,000 or less and simple affairs. It is not for contractors or people with a business, such as ABN delivery work.' },
    ],
    sources: [
      { label: 'ATO: Access your income statement', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-statements/access-your-income-statement` },
      { label: 'ATO: Studying in Australia', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia` },
      { label: 'ATO: Not entitled to Medicare benefits', href: `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/not-entitled-to-medicare-benefits` },
      { label: 'ATO: How to track the progress of your tax return', href: `${ATO}/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return` },
    ],
  },
  {
    slug: 'payg-payment-summary-vs-income-statement-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'PAYG payment summary or income statement? A student guide',
    description: 'Your employer may never hand you a payment summary. Learn what an income statement is, where to find it in myGov, what "Tax ready" means and what to check.',
    answer: 'For most employers, the PAYG payment summary has been replaced by the income statement, which your employer reports to the ATO through Single Touch Payroll. You find it in myGov, and you should wait until it is marked "Tax ready" before you lodge.',
    body: `Older guides, friends and even some employers still talk about a "PAYG payment summary" or a "group certificate". If you are waiting for your employer to hand you one, you may wait forever. Most employers now report your pay directly to the ATO. This guide explains what replaced the payment summary and how to use it for your tax return.

## What is PAYG, and what is a payment summary?

PAYG stands for "pay as you go". PAYG withholding is the system where your employer takes tax out of each pay and sends it to the ATO for you. It happens every payday, all year. How much is taken out depends on the TFN declaration you gave that employer, including your answers about residency and the tax-free threshold.

A payment summary was the yearly record of this: one page for each employer, showing your total pay and total tax taken out for the financial year. For employers who report through Single Touch Payroll (STP), the ATO says this paper document has been replaced by an income statement.

## What is an income statement?

An income statement shows the same kind of yearly totals, for each employer, for each financial year. The difference is where it lives. It is not given to you on paper. Your employer's payroll software reports to the ATO each payday, and the ATO builds the statement from that data.

If you had three jobs in a year, you will have three income statements for that year, one from each employer. Each employer finalises its own statement, so one can be ready while another is not.

This is very useful for students. Your record is safe even if you lose your payslips, change jobs several times, or leave Australia after your course.

## Where do you find it?

The ATO says you can find your income statement in three ways:

- **myGov:** sign in, go to ATO online services, then Employment, then Income statement.
- **The ATO app:** log in, select Employment, then choose the income year.
- **A registered tax agent:** your agent can see it through their own ATO services.

If you cannot access it, the ATO says you can contact them for a copy.

## What does "Tax ready" mean?

During the year, your income statement updates as you are paid. After 30 June, your employer must finalise it. The ATO says most employers have until 14 July to do this. When it is finalised, the statement shows as "Tax ready".

Do not lodge using figures that are not "Tax ready". The ATO says your employer may finalise different amounts, and lodging early may mean you have to amend your return. If a statement is still not "Tax ready" after 31 July, the ATO says to speak to your employer.

## What if your employer does not use STP?

Some employers do not report through Single Touch Payroll. The ATO says these employers should still give you a payment summary by 14 July. So you may have a mix: income statements for some jobs and a paper or PDF payment summary for another.

If you leave a job and also leave Australia, the ATO says an employer must give you a payment summary within 14 days if you ask for it when you leave.

## What should you check on your income statement?

Compare each statement with your payslips before you lodge. The Fair Work Ombudsman says your payslips must show your gross and net pay, and each deduction, so they are a good way to check.

- Is every employer you worked for in the list?
- Does the gross pay look right for the hours you worked?
- Does the tax withheld look right?
- Are there any jobs where very high tax was taken out, for example because your TFN arrived late?

The ATO says that if your employer does not have your TFN within 28 days, they must take tax out at the top rate plus the Medicare levy. That job will show a high amount of tax withheld. It is corrected on your return, if an adjustment is needed.

## What does not appear on your income statement?

Your income statement only shows pay from employers. Some income will not be there, but you still need to declare it:

- ABN income, for example from food delivery or freelance work
- Cash pay that your employer did not report
- Tips, which the ATO says are assessable income
- Bank interest, which usually appears in a different part of your pre-filled return

The ATO says cash income must be declared. Keep your own records of any income that is not reported.

A simple way is to keep one folder, on paper or on your phone, for each financial year. Put in your payslips, app earnings statements, invoices and bank records as they arrive. At tax time, you can then compare everything with your income statements in a few minutes, instead of searching through months of messages.

## Checklist

- Do not wait for a paper payment summary from an STP employer.
- After 1 July, check each income statement in myGov.
- Wait until every statement is "Tax ready".
- Compare the totals with your payslips.
- Ask any employer who does not use STP for your payment summary.
- Add ABN, cash and tip income yourself.

If something on your income statement does not look right, you can message Student Visa Tax on WhatsApp before you lodge.`,
    faq: [
      { q: 'Is a group certificate the same as an income statement?', a: 'Group certificate is an old name. It became the PAYG payment summary, and for STP employers it is now the income statement.' },
      { q: 'My employer says they will not give me a payment summary. Is that allowed?', a: 'If they report through STP, yes. The ATO says STP employers do not have to give payment summaries, because your income statement is in myGov.' },
      { q: 'My income statement is still not "Tax ready" in August. What should I do?', a: 'The ATO says to speak to your employer if it is still not "Tax ready" after 31 July.' },
    ],
    sources: [
      { label: 'ATO: Access your income statement', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-statements/access-your-income-statement` },
      { label: 'ATO: Returning to your home country', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/returning-to-your-home-country` },
      { label: 'Fair Work Ombudsman: Pay slips', href: 'https://www.fairwork.gov.au/pay-and-wages/paying-wages/pay-slips' },
      { label: 'ATO: Assessable income', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/income-you-must-declare/taxable-assessable-and-exempt-income` },
    ],
  },
  {
    slug: 'tax-deductions-international-students-what-you-cannot-claim',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Tax deductions students cannot claim, and what they can',
    description: 'Course fees, OSHC, your visa and your laptop for study are usually not deductible. See the common mistakes students make and what you may be able to claim instead.',
    answer: 'Most study and living costs, such as course fees for a course unrelated to your current job, OSHC, visa fees and rent, are not tax deductions. You can only claim costs that directly relate to earning your income from your job, that you paid yourself and were not reimbursed for, and that you have a record of.',
    body: `Many international students expect large deductions because studying in Australia is expensive. Unfortunately, most of those costs are private, not work costs. Claiming them can lead to your return being changed by the ATO. This guide explains what students usually cannot claim, and what they may be able to claim from their part-time work.

## The three rules for any deduction

The ATO gives three rules for work expenses. All three must be true:

- You spent the money yourself and were not reimbursed.
- The expense directly relates to earning your income.
- You have a record, usually a receipt.

A deduction reduces your taxable income. It does not come back to you dollar for dollar. If you may be a resident for tax purposes and your income is under the tax-free threshold of $18,200, a deduction may not change your tax at all.

For example, Lin works in a warehouse and bought safety boots for $120. If her taxable income is in the 16% band for 2025-26, the deduction lowers her tax by about $19.20, not by $120. A small deduction still helps, but it is never the same as getting the money back.

## Your course fees: usually not deductible

This is the most common mistake. The ATO says self-education costs are only deductible when there is a sufficient connection to your current job. The course must maintain or improve the skills you use in that job, or be likely to increase your income from it.

The ATO says you cannot claim the cost if the course only relates to your job in a general way, if you are not employed, or if it helps you get a new job or change careers. For most students, the degree is for a future career, not for the part-time job they do now. So a nursing degree is usually not deductible for a café worker, and an IT degree is usually not deductible for a delivery rider.

## Visa, OSHC, flights and rent: private costs

These costs let you live and study in Australia. They are not part of earning income from your job, so they fail the second rule:

- Student visa and graduate visa application fees
- Overseas Student Health Cover (OSHC)
- Flights to and from Australia
- Rent, food and household bills
- Normal travel between home and your usual workplace

## Clothes for work: be careful

The ATO only allows clothing that is occupation-specific, protective, a compulsory uniform, or a registered non-compulsory uniform. Normal clothes are not claimable, even if your employer requires them. The ATO's own example is a bartender's black trousers and white shirt.

So steel-capped boots for warehouse work or a branded uniform you had to buy may be claimable. Black jeans for a retail job are not.

## Your laptop and phone

A laptop you use for university assignments is a study cost, not a work cost. You can only claim the part of a device that is used for your job.

For phones, the ATO says to work out your work-use percentage over a continuous 4-week period, for example from one monthly bill, and then apply it to the whole year. Keep a diary or your itemised bill as a record. Using your phone to check rosters may support a small work percentage. A high percentage on a phone you mostly use for study and calling family will not be accepted.

For tools and equipment, the ATO says items costing $300 or less can be claimed immediately, for the work-use part only. Items over $300 are claimed over several years.

## Small claims and receipts

The ATO says that if your total work expense claim is $300 or less, you can claim without full receipts. You must still be able to show you spent the money and how you worked out the claim. This does not mean you can claim $300 automatically.

Keep your written evidence for 5 years from the date you lodge your return. Photos of receipts on your phone are a good habit.

## What students can often claim

Depending on your job, these may be claimable:

- Protective gear you bought yourself, such as safety boots or gloves for warehouse or farm work
- A compulsory uniform with your employer's logo, and the cost of washing it
- The work-use share of your phone, with a 4-week record
- A course or certificate that directly improves the skills you use in your current job
- The fee you paid a registered tax agent for last year's return, which the ATO says is generally claimable in the year you pay it

From 2026-27, the ATO says residents with labour income can claim a standard deduction of up to $1,000. If you claim work expenses, they reduce this amount dollar for dollar. This change does not apply to 2025-26 returns.

## Checklist before you claim

- Did I pay for it myself, with no reimbursement?
- Is it for my current job, not my studies or my life in Australia?
- Do I have a receipt, bill or diary record?
- Did I only claim the work part of anything I also use privately?
- Will the deduction actually change my tax, given my income?

If you are not sure whether a cost is claimable, you can message Student Visa Tax on WhatsApp and ask before you lodge.`,
    faq: [
      { q: 'Can I claim my university tuition fees?', a: 'Usually not. The ATO only allows self-education costs with a sufficient connection to your current job, not a course for a future career.' },
      { q: 'Is OSHC tax deductible?', a: 'No. OSHC is a private health cost, not an expense of earning your income from work.' },
      { q: 'Can I claim the $300 without receipts automatically?', a: 'No. You must still have spent the money and be able to show how you worked out the claim. The $300 rule only removes the need for full receipts.' },
    ],
    sources: [
      { label: 'ATO: Self-education expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/education-training-and-seminars/self-education-expenses` },
      { label: 'ATO: Clothing, laundry and dry-cleaning expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/clothes-and-items-you-wear-at-work/clothing-laundry-and-dry-cleaning-expenses` },
      { label: 'ATO: Mobile phone, mobile internet and other devices', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/tools-computers-and-items-you-use-for-work/mobile-phone-mobile-internet-and-other-devices` },
      { label: 'ATO: Records you need to keep', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/records-you-need-to-keep` },
    ],
  },
  {
    slug: 'short-job-do-students-need-to-lodge',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Only worked a few weeks? Do students need to lodge a return?',
    description: 'A short holiday job or a few casual shifts can still mean a tax return. When students must lodge, when a non-lodgment advice is right, and why lodging can help.',
    answer: 'If any tax was taken out of your pay, the ATO says you must lodge a tax return, even for a few weeks of work. If you earned under $18,200 and no tax was withheld, you usually do not need to lodge, but you should tell the ATO with a non-lodgment advice, and some students, such as foreign residents with any Australian income, still must lodge.',
    body: `Some students work only a little. Maybe you did a few weeks at a warehouse in the summer break, helped at a festival, or worked casual shifts for one month before exams. It is easy to think such a small job does not need a tax return. Often it does. This guide explains the rule and the few cases where a return is not needed.

## The main rule: was tax taken out?

The ATO says you must lodge a tax return if you had tax taken out of your pay during the tax year. The tax year runs from 1 July to 30 June. The length of the job does not matter. Two weeks of work with tax withheld creates the same need to lodge as a full year.

Your employer reports your pay and the tax withheld to the ATO, so the ATO already knows about the job. Check your income statement in myGov after 1 July to see what was reported.

## When might you not need to lodge?

The ATO says you usually do not need to lodge where both of these are true:

- Your income is under the tax-free threshold of $18,200
- No tax has been withheld from that income

In that case, you should tell the ATO by lodging a non-lodgment advice, also called "return not necessary". This tells the ATO that you have checked and do not need to lodge for that year. Doing nothing is not the same thing.

## When you must lodge even with low income

The ATO lists situations where you still must lodge a return, even if your income is low and no tax was withheld. For students, the most important ones are:

- You are a foreign resident for tax purposes and had Australian taxable income of $1 or more.
- You had an active ABN during the year.

So a student who may be a foreign resident and earned even a small amount in Australia must lodge. And a student who did a few weeks of food delivery on an ABN cannot use a non-lodgment advice for that year.

If you are enrolled in a course of 6 months or more, you may be an Australian resident for tax purposes. Your residency changes which rules apply, so it is worth having it checked if you are unsure.

## Why lodging can help after a short job

Your employer works out tax on each pay as if you earn that same amount in every pay period of the year. A short job with a few big weeks can therefore have more tax taken out than you owe for the whole year.

If you may be a resident for tax purposes and your total income for the year is under the tax-free threshold, the tax taken out may come back to you when you lodge. This only happens if you lodge. A refund is never automatic, and the result depends on your full year.

For example, Kenji worked four weeks in a warehouse in the summer break and earned $4,000. His employer took out $400 in tax. He had no other income that year. If he may be a resident for tax purposes, $4,000 is well under the tax-free threshold, so the tax he owes for the year on that income may be nil, and the $400 may come back, depending on his Medicare levy position. If he never lodges, it stays with the ATO.

Other common reasons too much tax was taken from a short job:

- Your TFN did not reach the employer in time, so the ATO says the top rate plus the Medicare levy was taken.
- You told the employer you were a foreign resident on your TFN declaration.
- You did not claim the tax-free threshold from your only job.

## The Medicare levy question

If you may be a resident for tax purposes, the Medicare levy of 2% of taxable income may apply. Many students are not entitled to Medicare because they have OSHC. If that is you, you may be able to claim the Medicare levy exemption with a Medicare Entitlement Statement from Services Australia.

The ATO says applications open on 1 July and can take up to 8 weeks, so apply early and wait for the statement before you lodge.

## What if you never lodged for an earlier short job?

A year you did not lodge does not disappear. You can still lodge it. The ATO's failure to lodge penalty is generally not applied in isolated cases, and the ATO warns you by phone or in writing first.

If you use a registered tax agent and one or more earlier returns were still outstanding at 30 June 2026, the ATO says your 2025-26 return is due by 31 October 2026, not at a later agent date. So it is a good idea to deal with old years soon.

## Checklist for a short job

- Check your income statement in myGov after 1 July.
- Was any tax withheld? If yes, lodge a return.
- No tax withheld and income under $18,200? Lodge a non-lodgment advice, unless one of the exceptions applies.
- Had an active ABN, or may be a foreign resident with Australian income? Lodge a return.
- Not entitled to Medicare? Get your Medicare Entitlement Statement first.
- Missed an earlier year? Lodge it as soon as you can.`,
    faq: [
      { q: 'I only worked for three weeks. Do I really need to lodge?', a: 'If any tax was taken out of your pay, yes. The ATO says you must lodge if you had tax taken out during the tax year.' },
      { q: 'What is a non-lodgment advice?', a: 'It is a form that tells the ATO you do not need to lodge a return for that year. It is used when, for example, your income was under $18,200 and no tax was withheld.' },
      { q: 'Can I use a non-lodgment advice if I had an ABN?', a: 'No. The ATO says you cannot lodge a non-lodgment advice if you had an active ABN in that income year.' },
    ],
    sources: [
      { label: 'ATO: Lodge a non-lodgment advice', href: `${ATO}/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-a-non-lodgment-advice` },
      { label: 'ATO: Tax in Australia, what you need to know', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/tax-in-australia-what-you-need-to-know` },
      { label: 'ATO: Not entitled to Medicare benefits', href: `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/not-entitled-to-medicare-benefits` },
      { label: 'ATO: Failure to lodge on time penalty', href: `${ATO}/individuals-and-families/paying-the-ato/interest-and-penalties/penalties/failure-to-lodge-on-time-penalty` },
    ],
  },
  {
    slug: 'lodging-tax-return-after-going-home-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Tax return after going home: a guide for former students',
    description: 'Finished your course and flew home? What to set up before you leave, how to lodge from your home country, and how your super and any past years fit in.',
    answer: 'You can lodge your Australian tax return from your home country, online with myTax, through a registered tax agent, or on paper. The most important thing to keep is an open Australian bank account, because the ATO pays refunds into an Australian account.',
    body: `Your course is finished, maybe your graduate visa has ended too, and you are back home. But your last Australian tax year is not finished until you lodge its return. This guide is a practical plan for students who have left or are about to leave. It covers what to prepare before you fly, how to lodge from overseas, and what to do with your super.

## Can you really lodge from overseas?

Yes. The ATO says that if you worked, you will probably need to lodge after 30 June, and you can do this from overseas. Your tax return is the same whether you lodge in Melbourne or in your home city.

The ATO lists three ways to lodge from outside Australia: online with myTax, through a registered tax agent, or on paper. Lodging before 30 June is only possible if you are leaving permanently, and the ATO says this early return is paper only and slower.

## Before you fly: set these things up

Most problems with lodging from overseas come from things that are hard to arrange once you have left. Do these in your last weeks in Australia:

- **Keep an Australian bank account open.** The ATO says you need one for refunds.
- **Update your myGov sign-in settings.** The ATO says to update them for use overseas, because you may lose your Australian phone number.
- **Ask each employer for a payment summary if they do not use STP.** The ATO says an employer must give you one within 14 days if you ask when you leave.
- **Update your address with the ATO,** so letters do not go to an old share house.
- **Save your records:** payslips, receipts and any ABN invoices.
- **Cancel any ABN** you no longer use, but still declare its income.

## Signing in to myGov from overseas

Many students use an Australian mobile number to receive myGov codes. When that number stops working, you can be locked out. Before you leave, change your sign-in method to one that works without an Australian SIM.

If you are already locked out, a registered tax agent can still see your income statements and lodge for you. Your income statements are held by the ATO, so they are not lost when you leave the country.

## Timing: when to lodge

Wait until after 30 June, then wait until your income statements are marked "Tax ready". The ATO says most employers finalise by 14 July.

The usual period to lodge is 1 July to 31 October. The ATO says a registered tax agent may give you a later due date if you contact them before 31 October. For your Medicare levy exemption, if you are not entitled to Medicare, wait for your Medicare Entitlement Statement before you lodge. The ATO says applications open on 1 July and can take up to 8 weeks.

## Your super: the DASP

If you worked, your employer paid super for you. After you leave, you may be able to claim it as a Departing Australia Superannuation Payment (DASP). The ATO says you can claim when your temporary visa has ended, you have left Australia, and you do not hold another active visa.

This matters for students who move from a 500 visa to a 485 visa. You cannot claim DASP while any temporary visa is still active. The ATO says you can start the application before you leave, but you cannot submit it until your visa has ended.

For people who never held a working holiday visa, the ATO says the taxed element of a DASP is taxed at 35%. The ATO DASP online system is free. If you do not claim, your fund moves your super to the ATO 6 months after you leave and your visa ends, and you can still claim it from the ATO.

## Years you never lodged

If you worked in an earlier year and never lodged, you can still lodge that year from overseas. Each year is its own return.

If you use a registered tax agent and one or more earlier returns were still outstanding at 30 June 2026, the ATO says your 2025-26 return is due by 31 October 2026, not at a later agent date. So it is best to deal with the old years quickly.

## What if you owe tax?

Leaving Australia does not cancel a tax debt. This can happen, for example, if you had ABN income with nothing withheld. When your return is processed, your notice of assessment shows the amount and the due date.

If you owe $200,000 or less, the ATO says you may be able to set up a payment plan online through myGov, under Tax, Payments, Payment plans. Paying as soon as you can reduces interest.

## Checklist for former students

- Before you leave: keep your bank account open and update your myGov sign-in.
- Ask any non-STP employer for a payment summary.
- After 30 June: wait for "Tax ready" on every income statement.
- Not entitled to Medicare? Apply for your Medicare Entitlement Statement.
- Lodge with myTax, a registered tax agent or paper by 31 October, or contact an agent before then.
- After every temporary visa has ended: claim your super through DASP.
- Lodge any earlier years you missed.

If you have already gone home and want help with your final return, you can message Student Visa Tax on WhatsApp from anywhere.`,
    faq: [
      { q: 'Can I get my refund paid into my bank account at home?', a: 'The ATO says to have an Australian bank account for refunds, so keep one open until your final return is processed.' },
      { q: 'I am on a 485 visa now. Can I claim my super?', a: 'Not yet. The ATO says you cannot submit a DASP claim while a temporary visa is still active. You can claim after your visa ends and you have left Australia.' },
      { q: 'How is my super taxed when I claim it?', a: 'If you never held a working holiday visa, the ATO says the taxed element is taxed at 35%.' },
    ],
    sources: [
      { label: 'ATO: Lodge your tax return from outside Australia', href: `${ATO}/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia` },
      { label: 'ATO: Returning to your home country', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/returning-to-your-home-country` },
      { label: 'ATO: Departing Australia superannuation payment', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp` },
      { label: 'ATO: Help with the DASP online application system', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system` },
    ],
  },
]
