import type { LongArticle } from '../types'

const GUIDES = 'https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/guides-for-occupations-and-industries'
const RECORDS = 'https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/records-you-need-to-keep'
const CLOTHING = 'https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/clothes-and-items-you-wear-at-work/clothing-laundry-and-dry-cleaning-expenses'
const CAR_2026 = 'https://www.ato.gov.au/forms-and-instructions/individual-tax-return-2026-instructions/deduction-questions-d1-d10-individual-tax-return-2026/d1-work-related-car-expenses-2026'
const STANDARD = 'https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/standard-deduction-for-work-related-expenses'
const SHARING = 'https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/sharing-economy-and-tax'

export const LONG_EN_DEDUCTIONS: readonly LongArticle[] = [
  {
    slug: 'deductions-by-job-international-students',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Tax deductions by job for international students',
    description: 'What you can claim depends on the job you do. A job-by-job map for students in cafes, retail, cleaning, care, warehouses, farms, delivery and rideshare.',
    answer: 'You can claim work costs you paid yourself, that were not paid back to you, that directly relate to earning your income, and that you can prove with a record. The list of items is different for each job, so start from the work you actually did.',
    body: `Most international students do more than one kind of work during a year. A semester in a cafe, a summer on a farm and some weekend cleaning is a normal mix. Each of those jobs has its own short list of costs you can claim on your tax return, and its own list of things that look claimable but are not.

This guide is the map. It explains the rules that apply to every job, then points you to the right job guide on this site.

## The three rules behind every claim

The ATO uses the same three tests for every work expense, whatever your job or visa:

- **You paid for it yourself** and nobody paid you back. If your employer gave you the item, or refunded you, there is nothing to claim.
- **It directly relates to earning your income.** The cost must come from doing the job, not from getting the job or from your private life.
- **You have a record.** Usually this is a receipt. Without a record, the claim can be refused.

If an item is used for work and for private life, you can only claim the work part. A phone used half for work and half for friends is a 50% claim, not a full one.

## Which job did you do?

Find your work below. Each job has its own guide with "you can claim" and "you cannot claim" lists and a worked example.

- **Hospitality (cafes, bars, restaurants):** protective shoes, a branded uniform, RSA renewals.
- **Kitchen hands and chefs:** chef's checked pants, knives, cut-resistant gloves.
- **Retail and supermarket:** branded uniform and its laundry, a course for your current role.
- **Cleaners:** equipment, chemicals, protective gear, travel between jobs on the same day.
- **Aged care and disability support:** non-slip shoes, gloves and masks, travel between clients.
- **Warehouse and labouring:** steel caps, hi-vis, forklift licence renewals.
- **Construction:** PPE, tools, sun protection for outdoor work, card renewals.
- **Farm and fruit picking:** sunscreen, hats, gloves, picking tools.
- **Tutors and childcare or education assistants:** teaching aids, some working with children checks.
- **Food delivery riders on an ABN:** platform fees, the work share of your phone and vehicle.
- **Rideshare drivers on an ABN:** car costs, platform fees, passenger items, accreditation.

## What nobody can claim, whatever the job

Some costs are private for everyone. Students ask about them every year, so here they are in one place:

- **Ordinary clothes**, even when your employer tells you to wear them. Black trousers and a white shirt are the ATO's own example.
- **The trip from home to work**, even if it is long, early or late at night.
- **Food and drink during a normal shift.**
- **Your first licence or certificate** that you needed to get the job. Renewals while you work are a different matter.
- **Vaccinations**, even when your job requires them.
- **Fines**, such as parking or speeding fines.
- **Rent, groceries and your OSHC.** These are living costs.
- **Your course fees for your student visa course**, in most cases. Study is only claimable when it has a close link to the job you already have, not when it prepares you for a new career.

## The rules about records

Records matter more than most students expect. Here are the rules the ATO sets:

- **Keep records for 5 years** from the date you lodge your return.
- **A good record** shows the supplier, the amount, what you bought and the date. A clear photo of a receipt on your phone is fine.
- **A bank statement alone is usually not enough.** The ATO says it can support a claim when you cannot get a receipt, but it should be combined with other records, such as a diary note.
- **The $300 rule (2025-26 and earlier):** if all your work claims together come to $300 or less, you do not need receipts, but you still need to show how you worked out the amount. Car expenses have their own rules and do not count towards the $300.
- **Tools and equipment:** an item that costs $300 or less can be claimed in full in the year you buy it. An item over $300, or a set costing more than $300, is claimed over several years.
- **Laundry:** the ATO accepts $1 per load of work clothes only, or 50c per load if you mix work and private clothes. This only applies to clothing you can claim.
- **Car travel:** the cents per kilometre method is for cars only. It does not apply to motorcycles or bicycles.

## Worked example: one student, three jobs

Mei is studying a two-year master's degree, so she may be an Australian resident for tax purposes. In 2025-26 she worked in a cafe, did a summer of farm work and cleaned houses on weekends.

- Non-slip shoes for the cafe, needed for a wet floor: $95
- Sunscreen and a wide-brim hat for the farm: $60
- Gloves and cleaning products she bought herself: $110
- A new cafe uniform with the logo, washed alone once a week for 40 weeks at $1 per load: $40

Her total is $305. Because it is more than $300, she needs written evidence for all of it, not only the extra $5. She kept photos of her receipts and a short laundry diary, so the claim is safe. Her black jeans for the cafe stay off the list.

## How much a deduction is worth to you

A deduction reduces your taxable income. It does not come back to you dollar for dollar. What it is worth depends on your tax rate:

- **If you may be a resident** and your taxable income is in the $18,201 to $45,000 band, each $100 of deductions reduces your income tax by $16 (2025-26 rates).
- **If you are a foreign resident for tax purposes**, tax starts at 30% from the first dollar, so each $100 of deductions reduces your income tax by $30.
- **If you may be a resident and your taxable income is already below $18,200**, a deduction often changes nothing, because there is no income tax to reduce.

## A change from 2026-27

From the 2026-27 year (the return you lodge from July 2027), the ATO will apply a standard deduction of up to $1,000 for residents who earn labour income such as wages. You do not need receipts for it. If you claim your actual work expenses, the standard deduction is reduced dollar for dollar, so it can fall to nil. It does not apply to the 2025-26 return, and it does not apply to foreign residents.

## What to do next

- Open the guide for each job you did this year.
- Start a phone album or folder for receipts today.
- Write down any travel between two jobs on the same day: the date, the places and the kilometres.
- Note any uniform washing in a simple diary.

When you are ready to lodge, you can message Student Visa Tax on WhatsApp and we will go through each job with you.`,
    faq: [
      { q: 'I had three jobs this year. Do I lodge three tax returns?', a: 'No. You lodge one return for the whole financial year, from 1 July to 30 June. It includes the income and the deductions from every job.' },
      { q: 'Can I claim my university fees?', a: 'In most cases, no. Study is only claimable when it has a close link to the job you already have, for example a course that improves the skills you use in that job. A course that prepares you for a new career is not claimable.' },
      { q: 'Is a bank statement enough as a record?', a: 'Usually not on its own. The ATO prefers a receipt or invoice from the supplier. A bank statement can help when the receipt is lost, together with other records such as a diary note.' },
      { q: 'Do foreign residents get the same deductions?', a: 'Yes. The deduction rules are the same. What changes is the tax rate, so the same deduction can be worth a different amount to each person.' },
    ],
    sources: [
      { label: 'ATO: Occupation and industry specific guides', href: 'https://www.ato.gov.au/individuals/income-and-deductions/occupation-and-industry-specific-guides/' },
      { label: 'ATO: Records you need to keep', href: RECORDS },
      { label: 'ATO: Clothing, laundry and dry-cleaning expenses', href: CLOTHING },
      { label: 'ATO: Standard deduction for work-related expenses', href: STANDARD },
    ],
  },
  {
    slug: 'hospitality-tax-deductions-students',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Hospitality tax deductions for international students',
    description: 'Waiter, barista or bartender on a student visa? What cafe, bar and restaurant staff can claim at tax time, what they cannot, and the records you need to keep.',
    answer: 'Cafe, bar and restaurant staff can claim protective clothing, a compulsory uniform with the employer\'s logo and its laundry, RSA or gaming licence renewals, and work courses linked to the current job. Ordinary black clothes, your first RSA and meals on shift are not claimable.',
    body: `Hospitality is one of the most common jobs for international students. Cafes, bars and restaurants offer casual shifts that fit around classes. The list of tax deductions for this work is short, but it is easy to get wrong in both directions: students claim things they cannot, and forget the few things they can.

This guide covers front-of-house work: waiters, baristas, bartenders and food runners. If you work in the kitchen, read our separate guide for kitchen hands and chefs.

## The rules that apply first

Every claim must pass the ATO's three tests:

- You paid for it yourself and were not paid back.
- It directly relates to earning your income from this job.
- You have a record, usually a receipt.

If you use something for work and for private life, you can only claim the work part.

## What you can claim

- **A compulsory uniform.** This means clothing your employer requires under a policy that is strictly enforced, and that is distinctive to the business, for example a shirt with the venue's logo. You can claim buying, repairing and cleaning it.
- **A registered non-compulsory uniform.** Some uniforms are on the ATO's Register of Approved Occupational Clothing. Ask your employer if you are not sure.
- **Protective clothing and shoes.** Items with features that protect you from a specific risk at work, such as an apron or non-slip shoes for a wet floor behind a coffee machine or bar.
- **Laundry of claimable clothing.** $1 per load if you wash only work clothes, or 50c per load if work clothes are mixed with private clothes.
- **RSA renewal or a gaming licence renewal.** The ATO says you can claim renewing these while you work in the job.
- **A course linked to your current job.** The ATO's example is a barista course for someone who already works in a coffee shop.
- **Union fees.**

## What you cannot claim

- **Conventional clothing**, even when your manager requires it. The ATO's example is black pants and a white shirt. Plain black shoes, jeans and a plain polo are in the same group.
- **Your first RSA.** The cost of getting your first licence is not claimable, because it helped you get the job rather than do it.
- **Food and drink on shift**, including a staff meal. These are private.
- **Grooming**, such as haircuts or make-up, even if the venue has a standard.
- **Travel from home to work**, even after a late close or a split shift.
- **Vaccinations**, even if your employer asks for them.
- **Anything your employer paid for or refunded.**

## Tips are income, not a deduction

This is not a deduction, but it matters for hospitality students. Tips are part of your assessable income. Tips paid through payroll already appear in your income statement. Cash tips handed to you directly must also be declared, so keep a simple note of the total each week.

## Worked example

Arjun studies a bachelor's degree and works as a barista and waiter. He may be an Australian resident for tax purposes. In 2025-26 he paid for:

- Non-slip shoes for the wet floor behind the coffee machine: $85
- Two shirts with the cafe's embroidered logo (the cafe requires them): $70
- An RSA renewal: $40
- Laundry: he washes his logo shirts and apron in a separate load once a week for 44 weeks, at $1 per load: $44

His claim is $239. Because his total work claims are $300 or less, he does not need receipts for 2025-26, but he still needs to show how he worked out each amount. He keeps the receipts anyway, which is the safer choice.

Arjun cannot add his black trousers ($60), his first RSA from last year, or the staff meals he paid for. If his taxable income is in the $18,201 to $45,000 band, his $239 claim reduces his income tax by about $38 (16% for 2025-26).

## Records to keep

- Receipts for shoes, uniform items and licence renewals. A clear phone photo is fine.
- A copy of the uniform policy, or a photo of the uniform with the logo.
- A laundry diary for a few weeks showing how many loads you wash.
- Keep everything for 5 years from the date you lodge.

For 2025-26, if your total work claims are more than $300, you need written evidence for all of them. For laundry, you need written evidence such as a diary when your laundry claim is more than $150 and your total work claims are more than $300.

From the 2026-27 year, residents with wage income will get a standard deduction of up to $1,000 instead of the $300 and $150 limits. If you claim actual work expenses, the standard deduction is reduced dollar for dollar.

## Two venues, one return

Many students work at two venues. Each one is a separate employer with its own income statement, and both go on one tax return. Claim the tax-free threshold from one employer only, usually the one that pays you the most. Deductions from both jobs go on the same return.

## Checklist before you lodge

- Is your uniform distinctive and required? If it is plain clothing, leave it off.
- Did you renew your RSA this year while working? Find the receipt.
- Did you buy non-slip or protective shoes for a wet or hot floor?
- Count your laundry loads for the year.
- Add up cash tips and declare them.

If you would like someone to check your hospitality claims before you lodge, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'My cafe requires an all-black outfit. Can I claim it?', a: 'No. Plain black clothing is conventional clothing, even when your employer requires it. A uniform must be distinctive to the business, such as a shirt with the logo.' },
      { q: 'Can I claim my RSA?', a: 'You can claim a renewal while you work in the job. The first RSA you got so you could be hired is not claimable.' },
      { q: 'Are cash tips taxable?', a: 'Yes. Tips are assessable income. Tips paid through payroll are already in your income statement, but cash tips must be added by you.' },
    ],
    sources: [
      { label: 'ATO: Hospitality industry employees, income and work-related deductions', href: `${GUIDES}/e-k/hospitality-industry-workers-income-and-work-related-deductions` },
      { label: 'ATO: Clothing, laundry and dry-cleaning expenses', href: CLOTHING },
      { label: 'ATO: Records you need to keep', href: RECORDS },
    ],
  },
  {
    slug: 'food-delivery-tax-deductions-students',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Food delivery rider tax deductions for international students',
    description: 'Delivering food on an ABN while you study? What riders and drivers can claim: platform fees, phone, bike or car costs, gear. And what stays private.',
    answer: 'Food delivery riders on an ABN can claim the work share of their vehicle, phone and data, platform fees, and gear such as an insulated bag or phone mount. Fines, meals and the private share of every cost are not claimable.',
    body: `Food delivery apps pay riders as contractors, so most students who deliver food do it on an ABN. No tax is taken out of the payouts. That means your deductions do real work: they reduce the profit that tax is worked out on.

This guide is about what you can claim as a food or parcel delivery rider or driver. If you also carry passengers, read our rideshare guide too, because the GST rules are different.

## How delivery income is taxed

Your delivery income goes on your tax return as business income, together with your business expenses. The ATO says income from providing services through a digital platform must be declared, even if it is only a side income next to a job. Keep the statements the platform gives you, because they show your income.

For food and parcel delivery only, you generally need to register for GST once your turnover reaches $75,000. If you carry passengers for a ride-sourcing app, you must register for GST before your first trip, whatever you earn.

## What you can claim

Every claim needs the same three things: you paid for it, nobody paid you back, and it relates to earning your delivery income. You also need records.

- **Platform fees and commission.** The ATO says service fees or commission charged by a digital platform may be claimed as a 100% deduction.
- **The work share of your phone and data.** The app, the maps and the messages to customers all run on your phone. Claim the work percentage, worked out on a fair basis, such as a four-week record of your use.
- **Gear for the job.** An insulated delivery bag, a phone mount, a charger, lights. An item that costs $300 or less is claimed in full in the year you buy it. An item over $300 is claimed over its effective life.
- **Car costs, if you deliver by car.** You can use the cents per kilometre method (88c per km for 2025-26, up to 5,000 work kilometres per car) or a logbook. Only the delivery kilometres count.
- **Motorcycle, scooter or bicycle costs.** The cents per kilometre method is for cars only. For a motorcycle, the ATO says you claim the actual costs at your work-use percentage. A bicycle or e-bike follows the same idea: actual running and repair costs, at the work share.
- **Parking while you work**, for example while you wait for an order.
- **Repairs and insurance** of work equipment, at the work share.

## What you cannot claim

- **Fines**, including parking fines picked up during a delivery.
- **Your own meals**, even when you eat between orders.
- **The private share of anything**: weekend trips, private calls, personal data use.
- **Ordinary clothes.** A jacket you also wear privately is conventional clothing.
- **A guess.** If you cannot show how you worked out a percentage, the claim can be refused.

## Worked example

Linh is a foreign resident for tax purposes and delivers food by e-bike on an ABN. In 2025-26 she paid for:

- An insulated delivery bag: $45
- A phone mount and a power bank: $60
- Front and rear lights: $50
- Phone plan: $40 a month, $480 for the year. A four-week record showed 60% delivery use, so she claims $288.
- E-bike repairs and new tyres: $240. Her ride log showed 80% delivery use, so she claims $192.

Her total is $635. Each small item is under $300, so she claims each one in full this year. Her e-bike itself cost more than $300, so its cost is spread over several years at the work share.

As a foreign resident, Linh pays tax at 30% from the first dollar (2025-26), so $635 of deductions reduces her income tax by about $190.

## Records to keep

- Platform statements showing income and fees.
- Receipts for every item you buy. A clear photo is fine.
- A four-week phone use record to support your work percentage.
- For a car: a record of how you worked out your delivery kilometres (cents per kilometre), or a 12-week logbook (logbook method). A logbook can be used for 5 years.
- For a bike or motorcycle: a record of delivery use against total use, and receipts for every cost.
- Keep everything for 5 years from the date you lodge.

A bank statement on its own is usually not enough. The ATO wants a receipt or invoice from the supplier, or other records that show what you bought.

## Is the $1,000 standard deduction for riders?

From 2026-27, the ATO will apply a standard deduction of up to $1,000 for residents with labour income such as wages. It does not apply if your only income is business income, such as ABN delivery income. Riders on an ABN keep claiming their actual expenses with records.

## Checklist before you lodge

- Download your yearly statement from each delivery app.
- Add up platform fees.
- Find receipts for the bag, the mount, lights and repairs.
- Work out your phone percentage from a real record, not a guess.
- If you drove a car, choose between cents per kilometre and a logbook.
- If you carried passengers at any time, check your GST registration.

Delivery returns have more parts than a wage return. If you want help with yours, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Can I use the cents per kilometre method for my scooter?', a: 'No. The method is for cars only. For a motorcycle or scooter you claim the actual costs at your work-use percentage, with receipts and a record of your work use.' },
      { q: 'Can I claim the whole phone bill?', a: 'Only the work share. If you also use the phone privately, work out the delivery percentage from a real record and claim that part.' },
      { q: 'Do I need to register for GST for food delivery?', a: 'Generally only when your turnover reaches $75,000. Carrying passengers for a ride-sourcing app is different: you must register for GST before your first trip.' },
    ],
    sources: [
      { label: 'ATO: Income and deductions for providing services', href: `${SHARING}/providing-services/income-and-deductions-for-providing-services` },
      { label: 'ATO: D1 Work-related car expenses 2026', href: CAR_2026 },
      { label: 'ATO: Ride-sourcing registrations', href: `${SHARING}/ride-sourcing/registrations` },
      { label: 'ATO: Records you need to keep', href: RECORDS },
    ],
  },
  {
    slug: 'retail-tax-deductions-students',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Retail and supermarket tax deductions for students',
    description: 'Working in a shop or supermarket on a student visa? What retail staff can claim at tax time, the uniform test, and why your phone and shoes are often not deductible.',
    answer: 'Retail and supermarket staff can claim a compulsory branded uniform and its laundry, a registered uniform, a course linked to their current job and union fees. Plain clothing, grooming, a phone used only for shift messages and travel to work are not claimable.',
    body: `Retail is a popular job for international students. Supermarkets, clothing stores and shopping centre kiosks offer casual shifts in the evenings and on weekends. The deduction list for retail is short, so it is worth knowing exactly what is on it and what is not.

## Start with the three tests

The ATO checks every work expense against three rules:

- You spent the money yourself and were not paid back.
- The cost directly relates to earning your income in this job.
- You have a record to prove it.

If something is used for work and private life, only the work part counts.

## What you can claim

- **A compulsory uniform.** The ATO says this is clothing that your workplace explicitly requires, under a policy that is strictly and consistently enforced, and that is distinctive to your employer. A shirt with the store's embroidered logo is the ATO's example. You can claim the cost to buy, hire, repair or clean it.
- **A registered non-compulsory uniform.** Some uniforms are on the ATO's Register of Approved Occupational Clothing. Your employer can tell you if yours is.
- **Laundry of the uniform.** $1 per load if you wash work clothes only, or 50c per load if they are mixed with private clothes.
- **A course linked to your current job.** The ATO's example is a customer service course for a retail worker.
- **Union and professional association fees.**
- **Travel between two jobs on the same day**, for example from your supermarket shift directly to a second job as a waiter. Travel between two stores for the same employer on the same day also counts.

## What you cannot claim

- **Conventional clothing**, even if your employer requires it and you only wear it at work. The ATO also says you cannot claim clothing sold in the store you work in, unless it is a real uniform.
- **Ordinary shoes.** Black sneakers or work shoes that are not part of a uniform are conventional clothing.
- **Grooming.** Haircuts, cosmetics and skin care are private, even if your employer requires them or sells them in the store.
- **Your phone, if the only work use is shift messages.** The ATO says you cannot claim phone or internet costs where your only work use is talking to your manager about shifts or checking your payslips.
- **Travel from home to work**, and parking at your normal workplace.
- **Public transport, taxi or rideshare** between home and work, even for late shifts.
- **Food and drink in normal working hours.**
- **Vaccinations**, even if work requires them.

## The overtime meal exception

There is one narrow case where a meal is claimable. If you receive an overtime meal allowance under an award or agreement, and the allowance is included in your income, you can claim the cost of a meal you buy and eat while working overtime. Check your payslip: if you see no overtime meal allowance, this does not apply to you.

## Worked example

Sofia is studying a diploma that runs for 18 months, so she may be an Australian resident for tax purposes. She works at a supermarket and at a clothing store. In 2025-26 she paid for:

- Two polo shirts with the supermarket logo, required by its uniform policy: $50
- Laundry: one load of work clothes only per week for 40 weeks, at $1 per load: $40
- A short customer service course her manager suggested, which she paid for herself: $120

Her total is $210. She cannot claim the black jeans the clothing store asks staff to wear, or the jeans she bought from the store with her staff discount. She also cannot claim her phone plan, because she only uses it to swap shifts.

If Sofia's taxable income is in the $18,201 to $45,000 band, her $210 claim reduces her income tax by about $34 (16% for 2025-26). If her taxable income is below $18,200, the claim usually changes nothing, because there is no income tax to reduce.

## Records to keep

- Receipts for uniform items and courses. A phone photo of each receipt is fine.
- A photo of the uniform showing the logo, or a copy of the uniform policy.
- A short laundry diary showing how many loads you wash each week.
- Keep records for 5 years from the date you lodge.

For 2025-26, if your total work claims are more than $300, you need written evidence for the whole amount. A bank statement alone is usually not enough, because it does not show what you bought.

From 2026-27, residents with wage income will get a standard deduction of up to $1,000 that needs no receipts. If you claim your actual work expenses, the standard deduction is reduced dollar for dollar.

## Common questions from retail students

Students often ask about the staff discount. A discount on items you buy for yourself is not a deduction, and items for private use are not claimable at any price.

Students also ask about two jobs. Each employer gives you its own income statement. Both go on one tax return, together with your deductions from both jobs. Claim the tax-free threshold from one employer only, usually the one that pays you the most.

## Checklist before you lodge

- Is your uniform distinctive and required by policy? If not, leave it off.
- Count your laundry loads for the year.
- Did you pay for a course linked to your current job?
- Did you drive directly between two jobs on the same day? Note the dates and kilometres.
- Leave off grooming, plain clothes and shift-message phone costs.

If you want your retail claims checked before you lodge, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'My store requires me to wear its clothing. Can I claim it?', a: 'Usually no. The ATO says clothing sold in the store you work in is conventional clothing, even if you only wear it at work. Only a real uniform that is distinctive and required by policy is claimable.' },
      { q: 'Can I claim my phone because my manager texts me my shifts?', a: 'No. The ATO says phone costs are not claimable where your only work use is talking to your manager about shifts or checking payslips.' },
      { q: 'Can I claim parking at the shopping centre?', a: 'Not at your normal workplace. Parking there is a private cost of getting to work.' },
    ],
    sources: [
      { label: 'ATO: Retail industry workers, income and work-related deductions', href: `${GUIDES}/r-z/retail-industry-workers-income-and-work-related-deductions` },
      { label: 'ATO: Clothing, laundry and dry-cleaning expenses', href: CLOTHING },
      { label: 'ATO: Records you need to keep', href: RECORDS },
    ],
  },
  {
    slug: 'cleaner-tax-deductions-students',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Cleaner tax deductions for international students',
    description: 'Cleaning houses or offices while you study? What cleaners can claim: equipment, chemicals, protective gear and travel between jobs. Plus the records you need.',
    answer: 'Cleaners can claim equipment and products they buy themselves, protective items such as gloves and masks, protective clothing and a compulsory uniform, and car travel directly between two cleaning jobs on the same day. The trip from home to the first job is not claimable.',
    body: `Cleaning is flexible work, so many international students do it. Some clean offices at night for a company. Others clean private houses on an ABN. Both groups have real deductions, and the biggest one is often the one students forget: travel between jobs.

## Employee or ABN?

If a cleaning company puts you on a roster and pays you wages, you are an employee. Tax is taken out of your pay and your employer pays super. If you find your own clients, set your price and invoice them, you may be running a business on an ABN. No tax is taken out, and your income and business expenses go on your return.

The items you can claim are similar in both cases. The rules on how they go on your return are different, so tell whoever prepares your return which type of work you did.

## What you can claim

- **Equipment you buy yourself.** Mops, buckets, cloths, a vacuum or a steam cleaner. You can also claim repairs and insurance for them.
- **Cleaning products and chemicals** you pay for.
- **Personal protective equipment**, such as gloves and face masks.
- **Protective clothing and shoes.** The ATO's examples for cleaners are aprons and non-slip shoes.
- **A compulsory uniform**, such as a shirt with your employer's embroidered logo, when the uniform policy is strictly enforced.
- **Laundry of claimable clothing.** $1 per load of work clothes only, or 50c per load if mixed.
- **Car travel between jobs on the same day.** From one house you clean directly to the next, or from your cleaning job directly to a second job.
- **The work share of your phone**, if you have records that show your work use.
- **Union fees.**

## The $300 tool rule

An item that costs $300 or less, and is not part of a set costing more than $300, can be claimed in full in the year you buy it. An item that costs more than $300 is claimed over several years, as its value declines. A commercial vacuum for $450 is still claimable: it is just spread out.

## What you cannot claim

- **Travel from home to work**, and back home at the end of the day. This is private, even if you start early or finish late.
- **Ordinary clothing**, such as black pants, a polo shirt or sneakers, even if your employer requires them.
- **Products or equipment that the client or employer supplies.** If the house provides the chemicals, you have no cost to claim.
- **Anything you were paid back for.**
- **Food and drink during a shift.**
- **Fines.**

There is a narrow exception for home-to-work travel when you must carry bulky equipment. All three conditions must apply: the equipment is essential for the job, it is so bulky that only a vehicle can carry it, and there is no secure place to store it at the workplace. For most cleaners, this does not apply.

## Worked example

Ravi is in the second year of a three-year degree, so he may be an Australian resident for tax purposes. He cleans private houses on Saturdays, three houses in a row, and drives his own car. In 2025-26:

- He drove 14 km between the first and second house and 10 km between the second and third, so 24 km of work travel each Saturday. Over 40 Saturdays that is 960 km. At 88c per km (2025-26), he claims $844.80.
- He bought gloves, cloths and products for $180.
- He bought a cordless vacuum for $260.

His total claim is $1,284.80. The drive from home to the first house and from the last house home is not included.

If Ravi's taxable income is in the $18,201 to $45,000 band, the claim reduces his income tax by about $205 (16% for 2025-26).

## Records to keep

- **For travel:** a note of each date, the addresses and the kilometres between jobs. The cents per kilometre method does not need receipts, but you must show how you worked out the kilometres. The maximum is 5,000 work kilometres per car per year.
- **For items:** a receipt or invoice for each purchase. A clear phone photo is fine.
- **For the phone:** a record of your work use over a typical period.
- **For laundry:** a simple diary of loads.
- Keep everything for 5 years from the date you lodge.

The cents per kilometre method is for cars only. It does not apply to a motorcycle. If you ride a motorcycle between jobs, you claim actual costs at the work share, with receipts.

For 2025-26, when your total work claims (not counting car expenses) are more than $300, you need written evidence for all of them. A bank statement alone is usually not enough.

## The 2026-27 change

From 2026-27, residents with wage income get a standard deduction of up to $1,000. If you claim actual expenses, including car travel between jobs, the standard deduction is reduced dollar for dollar. A cleaner with large travel claims will usually claim actual costs with full records. The standard deduction does not apply to ABN business income only.

## Checklist before you lodge

- List every day you drove between two jobs, with kilometres.
- Find receipts for equipment and products you bought.
- Separate items the client supplied from items you paid for.
- Check whether your shirt is a real uniform with a logo, or plain clothing.
- Tell your preparer whether you worked as an employee, on an ABN, or both.

If you would like help putting your cleaning year together, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Can I claim the drive to my first cleaning job?', a: 'No. Travel from home to work is private. Travel directly between two jobs on the same day is claimable.' },
      { q: 'I bought a vacuum for $420. Can I claim it?', a: 'Yes, but not all in one year. An item over $300 is claimed over several years as its value declines.' },
      { q: 'Can I claim chemicals the client keeps at the house?', a: 'No. You can only claim costs you paid yourself and were not paid back for.' },
    ],
    sources: [
      { label: 'ATO: Cleaners, income and work-related deductions', href: `${GUIDES}/a-d/cleaners-income-and-work-related-deductions` },
      { label: 'ATO: D1 Work-related car expenses 2026', href: CAR_2026 },
      { label: 'ATO: Records you need to keep', href: RECORDS },
    ],
  },
  {
    slug: 'aged-care-disability-tax-deductions-students',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Aged care and disability support tax deductions for students',
    description: 'Support worker or carer on a student visa? What aged care and disability workers can claim: travel between clients, non-slip shoes, PPE and study. What is private.',
    answer: 'Aged care and disability support workers can claim car travel between clients on the same day, protective clothing such as non-slip shoes, PPE they buy, a compulsory uniform and study linked to their current role. Vaccinations, travel from home and client outings are not claimable.',
    body: `Many international students work in aged care and disability support, often while studying nursing, social work or health. The work involves travel, protective gear and training, so there are more possible deductions than in most casual jobs. There are also some clear limits.

## The three rules

The ATO applies three tests to every claim:

- You paid for it yourself and nobody paid you back.
- It directly relates to earning your income.
- You have a record that proves it.

Only the work part of a mixed-use item is claimable.

## What you can claim

- **Car travel between clients on the same day.** The ATO's examples for carers include driving directly between clients' homes, and taking a client to an appointment. Driving directly from one job to a second job, such as from a personal care job to a disability support job, also counts.
- **Travel from home directly to an alternative workplace**, such as a training centre for a work course.
- **Protective clothing.** The ATO's example is non-slip nursing shoes. You can claim the cost to buy, repair or clean it.
- **A compulsory uniform** that is distinctive, such as a shirt with your employer's logo, under a strictly enforced policy.
- **PPE you buy yourself**, such as gloves, face masks, sanitiser or anti-bacterial spray.
- **Laundry of claimable clothing**, at $1 per load of work clothes only or 50c per load mixed.
- **Study linked to your current role.** The ATO's example is a Certificate IV in Ageing Support for an aged care worker.
- **The work share of your phone**, with records of your work use.
- **Union fees.**

## What you cannot claim

- **Travel from home to your first client and from your last client home.** The ATO says normal trips between home and work are private, even for early, late or weekend shifts.
- **Ordinary clothing**, such as jeans, t-shirts and sneakers, even if your employer requires them.
- **Flu shots and other vaccinations.** The ATO says these are private, even when your job requires them.
- **Your client's costs on an outing**, such as their coffee, lunch or movie ticket, and your own.
- **Food and drink during normal working hours.**
- **Gym fees**, even though the work is physical.
- **Parking at your normal workplace**, and public transport between home and work.
- **Anything your employer paid for or refunded**, such as a kilometre allowance that covers your costs in full.

## A note on study for nursing students

Students often ask whether their main course is claimable. The ATO says study is claimable when it maintains or improves the skills you need in your current job, or is likely to increase your income from that job. It is not claimable when it is only related in a general way, or when it helps you get a new job.

A short course that improves your skills as a support worker is likely to pass. A degree that prepares you for a new profession, such as a Bachelor of Nursing while you work as an assistant, is often in the second group. Ask before you claim course fees.

## Police checks and other checks

The ATO's guide for carers does not say whether a police check is claimable for an employee. Do not assume it is. Ask before you claim it. For a working with children check, the ATO has its own rules, explained in our guide for tutors and childcare workers.

## Worked example

Grace studies a master's degree for two years, so she may be an Australian resident for tax purposes. She works for a home care provider and drives her own car. In 2025-26:

- She drove between clients on 120 days, an average of 15 km between clients each day: 1,800 km. Her employer did not pay a kilometre allowance. At 88c per km (2025-26), she claims $1,584.
- Non-slip shoes: $110
- Gloves and sanitiser she bought herself: $45

Her total claim is $1,739. The drive from home to her first client and back home is not included, and neither is her flu shot.

If Grace's taxable income is in the $18,201 to $45,000 band, her claim reduces her income tax by about $278 (16% for 2025-26).

Check your payslips before you claim. If your employer refunds your actual travel costs, you cannot claim them, because you did not carry the cost yourself. If you received a kilometre allowance instead, tell whoever prepares your return, so it is treated correctly.

## Records to keep

- **A travel record:** the date, the client addresses (or a client code) and the kilometres between them. For cents per kilometre you do not need receipts, but you must show how you worked out the kilometres. The limit is 5,000 work kilometres per car per year.
- **Receipts** for shoes, PPE, uniform items and courses. A clear phone photo is fine.
- **Your enrolment and fee records** for any study you claim.
- Keep records for 5 years from the date you lodge.

The cents per kilometre method is for cars only, not motorcycles.

From 2026-27, residents with wage income get a standard deduction of up to $1,000. Claiming actual expenses, including car travel, reduces it dollar for dollar. If your travel claim is large, you will usually claim actual costs with full records.

## Checklist before you lodge

- Export your shift and client list for the year to help rebuild your travel record.
- Check your payslips for a kilometre allowance.
- Find receipts for shoes, PPE and uniform items.
- Decide whether any course you paid for is linked to your current role.
- Leave off vaccinations, gym fees and client outing costs.

If you want help with a care worker return, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Can I claim my flu vaccination if my employer requires it?', a: 'No. The ATO says flu shots and other vaccinations are private expenses, even when work requires them.' },
      { q: 'Can I claim driving a client to an appointment?', a: 'Yes, if you use your own car and were not paid back. The ATO lists taking a client to an appointment as claimable travel.' },
      { q: 'Can I claim my Bachelor of Nursing fees?', a: 'Often not, because a degree that leads to a new profession is study to get a new job. Study that improves skills for your current role can be claimable. Ask before you claim.' },
    ],
    sources: [
      { label: 'ATO: Community support workers and direct carers, income and work-related deductions', href: `${GUIDES}/a-d/community-workers-and-direct-carers-income-and-work-related-deductions` },
      { label: 'ATO: D1 Work-related car expenses 2026', href: CAR_2026 },
      { label: 'ATO: Records you need to keep', href: RECORDS },
    ],
  },
  {
    slug: 'warehouse-labouring-tax-deductions-students',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Warehouse and labouring tax deductions for students',
    description: 'Warehouse, factory or labour hire shifts on a student visa? What you can claim: steel caps, hi-vis, tools, licence renewals and travel between sites. What you cannot.',
    answer: 'Warehouse and labouring workers can claim protective gear such as steel-capped boots and gloves, tools they buy, renewals of a licence they already hold, and car travel between two worksites on the same day. A first forklift licence and the commute are not claimable.',
    body: `Warehouse, factory and labour hire work gives many students long shifts in the holidays and steady weekend work during semester. Agencies often place you at several sites. The deductions follow the job you were doing, not the agency's name.

## The three tests

Every claim must pass the ATO's three rules:

- You paid for it yourself and were not paid back.
- It directly relates to earning your income.
- You have a record that proves it.

If an item is also used privately, claim only the work part.

## What you can claim

- **Protective clothing.** The ATO's examples are steel-capped boots, gloves and fire-resistant clothing. You can also claim the cost of cleaning and repairing it.
- **Safety equipment**, such as goggles and breathing masks.
- **Tools and equipment you buy for work**, such as an air compressor, a drill or a hammer, plus their repairs and insurance.
- **Renewing a special licence or certificate you already hold and need for the job.** The ATO's example is renewing a heavy vehicle permit while you are employed. A forklift licence renewal follows the same rule.
- **Car travel directly between two jobs on the same day**, or between two sites for the same employer on the same day. The ATO's example is travel from a warehouse to a job site.
- **Travel from home directly to an alternative workplace**, such as a training centre for a work course.
- **Union fees.**
- **Laundry of protective clothing**, at $1 per load of work clothes only, or 50c per load mixed.

## What you cannot claim

- **Your first forklift licence.** The ATO says the initial cost of a special licence or certificate you need to get a job is not claimable.
- **A standard driver licence**, even if the job requires one.
- **Ordinary clothing**, such as jeans or sneakers, even if your employer requires them and you only wear them at work.
- **Travel from home to work**, even for early, late or weekend shifts. If an agency places you at the same warehouse for weeks, that trip is still a commute.
- **Parking at your normal workplace**, and public transport, taxi or rideshare between home and work.
- **Food and drink during normal working hours.**
- **Flu shots and other vaccinations.**
- **Gear the agency or employer gave you**, such as issued hi-vis.

## Two rules that change a claim

**The $300 rule.** An item that costs $300 or less, and is not part of a set costing more than $300, can be claimed in full in the year you buy it. An item over $300 is claimed over several years. Each pair of boots and each pair of gloves is tested on its own, so small purchases across the year add up.

**The bulky tools exception.** Home-to-work travel can be claimed in a narrow case. All of these must be true: the tools are essential for the job, they are bulky enough that only a vehicle can carry them conveniently, and there is no secure storage at the workplace. In most warehouse jobs this does not apply.

## Worked example

Tomás is a foreign resident for tax purposes and studies an English course followed by a diploma. Over the summer he works for two labour hire agencies. In 2025-26 he paid for:

- Steel-capped boots: $140
- Cut-resistant gloves, four pairs across the year: $60
- A forklift licence renewal while working in the role: $150
- On 20 days he drove from a morning shift at one warehouse directly to an afternoon shift at another site, 18 km each time: 360 km. At 88c per km (2025-26), he claims $316.80.

His total is $666.80. His first forklift licence, which he bought before his first placement, is not on the list. Nor is the hi-vis vest the agency gave him.

As a foreign resident, Tomás pays tax at 30% from the first dollar (2025-26), so his claim reduces his income tax by about $200.

## Records to keep

- Receipts for boots, gloves, tools and licence renewals. A clear phone photo is fine.
- A travel note for each day you moved between sites: the date, the two sites and the kilometres. Cents per kilometre does not need receipts, but you must show how you worked out the kilometres.
- Keep everything for 5 years from the date you lodge.

For 2025-26, if your total work claims, not counting car expenses, are more than $300, you need written evidence for all of them. A bank statement alone is usually not enough.

## Several agencies, one return

Each agency is a separate employer and gives you its own income statement. All of them go on one return. Wait until each income statement is marked "Tax ready" before you lodge, so nothing is missing. Claim the tax-free threshold from one employer only, if you may be a resident.

## Checklist before you lodge

From 2026-27, residents with wage income get a standard deduction of up to $1,000 without receipts. Claiming actual work expenses reduces it dollar for dollar. Foreign residents cannot use it. For the 2025-26 return, check these points:

- List every agency and check each income statement is "Tax ready".
- Find receipts for boots, gloves and tools you paid for.
- Separate first licences from renewals.
- List days with travel between two sites.
- Leave off issued gear and the daily commute.

If you worked for several agencies and want it checked, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Can I claim my forklift licence?', a: 'Not the first one you needed to get the job. A renewal while you work in a role that needs it is claimable.' },
      { q: 'The agency sends me to different warehouses. Is my travel claimable?', a: 'Travel directly between two sites on the same day is claimable. The trip from home to a site, and back home, is generally a commute.' },
      { q: 'My boots wore out in three months. Can I claim the second pair?', a: 'Yes, if they are protective and you paid for them. Each purchase is a separate claim.' },
    ],
    sources: [
      { label: 'ATO: Factory workers, income and work-related deductions', href: `${GUIDES}/e-k/factory-workers-income-and-work-related-deductions` },
      { label: 'ATO: D1 Work-related car expenses 2026', href: CAR_2026 },
      { label: 'ATO: Records you need to keep', href: RECORDS },
    ],
  },
  {
    slug: 'construction-tax-deductions-students',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Construction tax deductions for international students',
    description: 'Labouring on building sites while you study? What construction workers can claim: PPE, tools, sun protection and card renewals. Why the first White Card is not claimable.',
    answer: 'Construction workers can claim PPE such as hi-vis and steel caps, tools they buy, sun protection for long periods outdoors, and renewals of work cards and licences. The first card or licence you needed to get the job, ordinary clothing and the drive to site are not claimable.',
    body: `Building sites pay well for physical work, so some international students take construction labouring jobs, often during the long summer break. The work creates real costs: boots, hi-vis, tools and sunscreen. Here is what you can claim, what you cannot, and how to keep records that hold up.

## The three tests

Every claim must pass the ATO's three rules:

- You paid for it yourself and were not paid back.
- It directly relates to earning your income.
- You have a record that proves it.

If something is also used privately, claim only the work part.

## What you can claim

- **Protective clothing and safety gear** that protects you from a specific risk on site. The ATO's examples are hi-vis vests and steel-capped boots, plus safety equipment such as harnesses, goggles and breathing masks. You can claim the cost to buy, hire, repair or clean it.
- **Sun protection.** Sunscreen, sun hats and sunglasses, but only when your duties involve long periods working outdoors.
- **Tools and equipment you buy.** The ATO's examples include circular saws, concrete mixers and screwdriver sets. Repairs and insurance count too.
- **Renewal fees for work licences, permits, certificates or cards** that relate to your work.
- **Car travel directly between two jobs on the same day.** The ATO's example is driving from a construction job to a second job as a security guard.
- **Travel and accommodation when you work away from home overnight**, for example at a temporary site interstate, when your employer does not pay.
- **The work share of your phone**, with records of work use.
- **Union fees.**

## What you cannot claim

- **Your first card or licence.** The ATO says the cost of your initial licence needed to gain employment is not claimable. A White Card you get so you can start construction work is in this group.
- **Your driver licence**, even if the job requires one.
- **Ordinary clothing**, such as jeans, drill shorts or a work shirt with no protective features, even if your employer requires it.
- **The drive from home to site**, even when it is long or very early.
- **Tools your employer supplies**, or anything you are paid back for.
- **Fines** and **gym fees**.

## Tool sets and the drive to site

**The $300 rule.** An item that costs $300 or less, and is not part of a set costing more than $300, can be claimed in full in the year you buy it. An item that costs more than $300 is still claimable, but over several years as its value declines.

Be careful with sets. If you buy a set of tools together for more than $300, the set counts as one item, even when each piece alone costs less than $300.

**The drive to site.** The ATO allows home-to-site travel in only two limited cases. The first is when you have shifting workplaces and travel between sites during the day. The second is when you carry bulky tools that are essential for your duties, that can only be moved conveniently by vehicle, and that have no secure storage on site. All of those conditions must be true.

If you do qualify, note that vehicles that carry one tonne or more, such as many utes, cannot use the cents per kilometre or logbook methods. You claim the actual costs of work use instead, with receipts.

## Worked example

Kenji may be an Australian resident for tax purposes because his degree runs for three years. In the summer break he works as a site labourer outdoors. In 2025-26 he paid for:

- Steel-capped boots: $160
- Two hi-vis shirts: $50
- Safety glasses and earmuffs: $45
- Sunscreen, a wide-brim hat and safety sunglasses: $85
- A cordless drill: $230

His total is $570. Each item is under $300 and bought on its own, so he claims each one in full. His first White Card, his jeans and the drive to site are not included.

If Kenji's taxable income is in the $18,201 to $45,000 band, his claim reduces his income tax by about $91 (16% for 2025-26).

## Records to keep

- Receipts for PPE, sun protection and tools. A clear phone photo is fine.
- Receipts for any licence or card renewals.
- A note of the dates you worked outdoors, to support sun protection.
- Keep records for 5 years from the date you lodge.

For 2025-26, if your total work claims, not counting car expenses, are more than $300, you need written evidence for all of them. A bank statement alone is usually not enough, because it does not show what you bought.

From 2026-27, residents with wage income get a standard deduction of up to $1,000 that needs no receipts. Claiming actual expenses reduces it dollar for dollar. For a student with a few hundred dollars of PPE, the standard deduction may be simpler. For a student with large tool purchases, actual costs with records may be higher.

## Contractor or employee?

Some sites ask labourers to get an ABN. Having an ABN does not make you a contractor. If the business controls how, when and where you work, you may be an employee, whatever the contract says. If you are unsure, the Fair Work Ombudsman can help.

## Checklist before you lodge

- Find receipts for boots, hi-vis, glasses and tools.
- Check whether you bought any tools as a set over $300.
- Keep sunscreen receipts and a note of outdoor work days.
- Separate your first card from any renewals.
- Leave off ordinary work clothes and the daily drive to site.

If you want a second look at your construction claims, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Can I claim my White Card?', a: 'Not the first one you needed to start construction work. The ATO says the initial licence or card needed to get a job is not claimable. Renewal fees for work cards are claimable.' },
      { q: 'Can I claim sunscreen?', a: 'Yes, when your duties involve long periods working outdoors. Keep the receipts and claim only the work share.' },
      { q: 'I bought a tool kit for $420. Is it claimable?', a: 'Yes, but a set bought together for more than $300 counts as one item, so it is claimed over several years.' },
    ],
    sources: [
      { label: 'ATO: Building and construction employees, income and work-related deductions', href: `${GUIDES}/a-d/building-and-construction-employees-income-and-work-related-deductions` },
      { label: 'ATO: D1 Work-related car expenses 2026', href: CAR_2026 },
      { label: 'ATO: Records you need to keep', href: RECORDS },
    ],
  },
  {
    slug: 'farm-work-tax-deductions-students',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Farm and fruit picking tax deductions for students',
    description: 'Farm work or fruit picking in your study break? What you can claim: sunscreen, hats, gloves, tools and travel between farms. Why rent and the drive out are private.',
    answer: 'Farm workers can claim sun protection for long periods outdoors, protective clothing such as gloves and steel caps, tools they buy, licence renewals and car travel between farms on the same day. Accommodation, food, relocating to a farm region and the daily drive to the farm are not claimable.',
    body: `Some international students spend the summer break picking fruit, packing or working on a farm. The work is outdoors and physical, so it has its own list of deductions. Sunscreen, which is private for most people, can be claimable here.

## The three tests

Every claim must pass the ATO's three rules:

- You paid for it yourself and were not paid back.
- It directly relates to earning your income.
- You have a record that proves it.

If something is used for work and private life, claim only the work part.

## What you can claim

- **Sun protection.** Hats and sunscreen when you work outdoors for long periods. Sunglasses for outdoor work follow the same idea. Claim only the work share.
- **Protective clothing** that protects you from specific risks, such as gloves or steel-capped boots. You can also claim cleaning and repairing it.
- **Tools and equipment you buy for work.** The ATO's examples are a chainsaw and fencing tools. Secateurs, a picking bag and a head torch are in the same group.
- **Renewing a special licence** you already hold while working in the role, such as a forklift licence for a packing shed.
- **Car travel directly between separate jobs on the same day**, or between two farms or blocks for the same employer on the same day.
- **Travel away from home overnight for work**, such as moving livestock long distances, when your employer does not pay.
- **The work share of your phone**, with records of work use.
- **Laundry of protective clothing**, at $1 per load of work clothes only or 50c per load mixed.

## What you cannot claim

- **Accommodation in the farm region.** Where you live during the season is a living cost.
- **Moving to a new work location.** The ATO says the cost of relocating, whether your job requires it or you choose it when taking a new job, is not claimable. The bus or flight to the farm region is in this group.
- **The daily drive from where you live to the farm**, even on long dirt roads or early starts.
- **Food and drink during the working day.**
- **Ordinary clothing**, such as jeans, track pants, drill shorts and jackets, even if your employer tells you to wear them.
- **Your driver licence**, and the first special licence you needed to get the job.
- **Music subscriptions** and other private costs.

## Tool costs and farm vehicles

**The $300 rule.** An item that costs $300 or less, and is not part of a set costing more than $300, can be claimed in full in the year you buy it. An item over $300 is claimed over several years. Picking gloves wear out quickly, and each pair is a separate purchase, so keep every receipt.

**Utes and farm vehicles.** The cents per kilometre and logbook methods only work for cars. The ATO says utes that carry one tonne or more, minibuses, motorcycles and quad bikes cannot use either method. For those vehicles you claim the actual costs of work use, with receipts and a record of work use.

## Worked example

Amara studies a two-year master's degree, so she may be an Australian resident for tax purposes. In the summer break she picked fruit for 10 weeks for one grower. On 25 days the supervisor sent the crew from one block to another property in the afternoon, and she drove her own car 16 km each time.

- Travel between properties: 25 days x 16 km = 400 km. At 88c per km (2025-26), she claims $352.
- Sunscreen and a wide-brim hat: $70
- Picking gloves, five pairs: $55
- Secateurs and a picking bag: $95

Her total claim is $572. She cannot claim her room in the farm town, her bus ticket to the region, or the morning drive from her room to the first block.

If Amara's taxable income is in the $18,201 to $45,000 band, her claim reduces her income tax by about $92 (16% for 2025-26). If her total taxable income for the year is below $18,200, the claim usually changes nothing.

## Records to keep

- Receipts for sunscreen, hats, gloves and tools. Photos are fine.
- A travel note for each day you moved between properties: the date, the two places and the kilometres.
- Your payslips or a note of each farm and the dates you worked there.
- Keep everything for 5 years from the date you lodge.

For 2025-26, if your total work claims, not counting car expenses, are more than $300, you need written evidence for all of them. A bank statement alone is usually not enough.

## Piece rates and short jobs

Being paid per bin or per kilo does not change your tax. It is still wages. Most farms report your pay to the ATO through Single Touch Payroll, so it appears in your income statement. Short jobs are easy to forget, so list every farm and check each income statement before you lodge.

## Checklist before you lodge

- List every farm or contractor you worked for.
- Keep sunscreen and glove receipts, and note your outdoor work dates.
- Write down days you drove between properties.
- Leave off accommodation, food and travel to the region.
- If you used a ute or quad bike, keep receipts for actual costs.

If you want help with a farm season on your return, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Can I claim my accommodation near the farm?', a: 'No. Accommodation is a private living cost, even when the farm is far from where you study.' },
      { q: 'Can I claim the bus to the fruit picking region?', a: 'No. The ATO says the cost of relocating to a new work location is not claimable.' },
      { q: 'Is sunscreen really deductible?', a: 'Yes, when you work outdoors for long periods. Claim only the part you used for work.' },
    ],
    sources: [
      { label: 'ATO: Agricultural workers, income and work-related deductions', href: `${GUIDES}/a-d/agricultural-workers-income-and-work-related-deductions` },
      { label: 'ATO: D1 Work-related car expenses 2026', href: CAR_2026 },
      { label: 'ATO: Records you need to keep', href: RECORDS },
    ],
  },
  {
    slug: 'tutor-childcare-tax-deductions-students',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Tutor and childcare tax deductions for international students',
    description: 'Tutoring, childcare or working as an education assistant while you study? What you can claim, the working with children check rules, and your course fees.',
    answer: 'Tutors and childcare or education assistants can claim teaching aids, a compulsory uniform, the work share of phone and internet, travel between two jobs on the same day, and study linked to their current role. A first working with children check is claimable only in limited cases.',
    body: `Tutoring, childcare and education support suit many international students. Some tutor school students privately on an ABN. Others work as assistants in childcare centres or schools. This guide covers the deductions for this kind of work, including the working with children check, which has its own ATO rules.

## The three tests

Every claim must pass the ATO's three rules:

- You paid for it yourself and nobody paid you back.
- It directly relates to earning your income.
- You have a record that proves it.

If you use something for work and for private life, claim only the work part.

## What you can claim

- **Teaching aids** that relate to your work, such as books, worksheets or learning games you buy for your students.
- **A compulsory uniform** that your workplace explicitly requires, for example a shirt with the centre's logo. You can claim the cost to buy, hire, repair or clean it.
- **The work share of your phone and internet**, with records of your work use. Online tutors use their internet a lot for work, so a fair record matters.
- **Car travel directly between two jobs on the same day.** The ATO's example is driving from a teaching job to a tutoring job.
- **Travel to an alternative workplace for the same employer**, or from home directly to a training venue for a work course.
- **A first aid course, if you are the designated first aid officer** at your workplace. This is the condition in the ATO's guide for education workers.
- **Study linked to your current role.** The ATO's example is a course in working with children with special learning needs.
- **Union and professional association fees.**
- **Platform fees**, if you tutor through a platform on an ABN.

## The working with children check

The ATO has a specific page on this. You can claim the cost when you are an existing employee and need to get or renew the check to keep earning income in your job. A new employee can claim it if their recent income is from continuous employment in a child-related field.

If you are new to child-related work, you cannot claim the cost of your first check. The ATO's example is a worker who left the field for a long time and needed a new check to return as a new employee: not claimable.

## What you cannot claim

- **Ordinary clothing**, such as everyday, sports or business clothes, even if your employer requires it.
- **Gifts for students**, such as end-of-term presents. The ATO says these are private.
- **Students' personal costs**, such as their lunch or school books.
- **The trip from home to work**, even for after-hours events.
- **Flu shots and other vaccinations**, even if your workplace requires them.
- **Your main student visa course**, in most cases. Study that only relates to your job in a general way, or that prepares you for a new job, is not claimable. The ATO uses a Bachelor of Education as an example of study that helps someone get new employment.

## Tutoring on an ABN

If you tutor privately and invoice families yourself, you may be running a business on an ABN. No tax is taken out, so you put the income and your business expenses on your return. Generally you only need to register for GST when your turnover reaches $75,000.

Travel from home to a student's home can be harder to judge than travel between two jobs. If you tutor on an ABN and drive to several families, keep a full record and ask before you claim the first and last trips of the day.

## Worked example

Hana studies a two-year master's degree, so she may be an Australian resident for tax purposes. She works as an assistant at a childcare centre and tutors maths on an ABN in the evenings. In 2025-26 she paid for:

- Two centre shirts with the logo, required by policy: $60
- Maths workbooks and practice papers for tutoring: $90
- Internet: $70 a month, $840 for the year. A four-week record showed 25% tutoring use, so she claims $210.
- On 30 days she drove from the centre directly to a tutoring session, 9 km each time: 270 km. At 88c per km (2025-26), she claims $237.60.

Her total is $597.60. Her first working with children check, which she got before her first child-related job, is not on the list. Neither are the end-of-year gifts she gave the children.

If Hana's taxable income is in the $18,201 to $45,000 band, her claim reduces her income tax by about $96 (16% for 2025-26).

## Records to keep

- Receipts for teaching aids, uniform items and courses.
- A four-week record of internet and phone use.
- A travel note for each day with travel between jobs: date, places and kilometres.
- Invoices you sent to families, if you tutor on an ABN.
- Keep everything for 5 years from the date you lodge.

For 2025-26, if your total work claims, not counting car expenses, are more than $300, you need written evidence for all of them. A bank statement alone is usually not enough.

From 2026-27, residents with wage income get a standard deduction of up to $1,000. Claiming actual work expenses reduces it dollar for dollar. It does not apply if your only income is business income.

## Checklist before you lodge

- Check whether your working with children check is claimable under the ATO rules.
- Find receipts for teaching aids.
- Work out your phone and internet work share from a real record.
- List days you drove directly between two jobs.
- Leave off gifts, ordinary clothes and your main course fees.

If you work in childcare and tutor on an ABN, you can message Student Visa Tax on WhatsApp for help with both parts of your return.`,
    faq: [
      { q: 'Can I claim my first working with children check?', a: 'Only if your recent income is from continuous employment in a child-related field. If you are new to child-related work, the first check is not claimable.' },
      { q: 'Can I claim gifts I buy for the children?', a: 'No. The ATO says gifts for students are private expenses.' },
      { q: 'Can I claim my Bachelor of Education fees?', a: 'Generally no. The ATO uses this degree as an example of study that helps you get new employment, which is not claimable.' },
    ],
    sources: [
      { label: 'ATO: Teachers and education professionals, income and work-related deductions', href: `${GUIDES}/r-z/teachers-and-education-professionals-income-and-work-related-deductions` },
      { label: 'ATO: Working with children check', href: 'https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/memberships-accreditations-fees-and-commissions/working-with-children-check' },
      { label: 'ATO: Records you need to keep', href: RECORDS },
    ],
  },
  {
    slug: 'rideshare-tax-deductions-students',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Rideshare driver tax deductions for international students',
    description: 'Driving for a rideshare app on an ABN while you study? What you can claim: car costs, platform fees, passenger items, accreditation. Plus GST and record rules.',
    answer: 'Rideshare drivers can claim the business share of car costs, platform fees, tolls the passenger did not pay, water and mints for passengers, and driver accreditation and checks. Fines, meals on breaks and private use of the car are not claimable.',
    body: `Rideshare driving is business income. You need an ABN and GST registration before your first trip, and no tax is taken out of your payouts. Your deductions reduce the profit that tax is worked out on, so good records matter more here than in most student jobs.

Before you start, check that your visa conditions allow this work with the Department of Home Affairs.

## Registration first

The ATO says ride-sourcing drivers must register for GST regardless of how much they earn, and must be registered before their first trip. You need an ABN to register for GST. You report GST monthly or quarterly. This is different from food delivery, where GST registration generally applies only when your turnover reaches $75,000.

If you claim a GST credit for an expense, your income tax deduction is the amount without the GST.

## What you can claim

- **Car expenses** for a car you own or lease, using one of two methods:
  - **Cents per kilometre:** 88c per km for 2025-26, up to 5,000 business kilometres per car. This rate covers all running costs, including fuel, servicing, insurance and decline in value, so you cannot claim those separately.
  - **Logbook:** the business-use percentage of your running costs, decline in value and interest. The logbook must cover at least 12 continuous weeks and can be used for 5 years.
- **Platform fees and commission.**
- **Fuel**, if you use the logbook method, as part of your running costs.
- **Tolls** that the passenger did not pay.
- **Parking while you wait for rides.** Parking on private errands is not claimable.
- **Items for passengers**, such as water, mints and tissues, and wipes or sanitiser to clean your car.
- **The business share of your phone.**
- **State licences and approvals**, such as driver accreditation, application fees, medical tests and police checks for the work.
- **The fee for preparing your tax return.**

## What you cannot claim

- **Fines**, including speeding and parking fines.
- **Meals you buy on a break.**
- **Private use of the car**, such as driving to university or shopping.
- **Your private driver licence.**
- **Fuel tax credits.**
- **Running costs on top of cents per kilometre.** If you use that method, it already covers them.

## Which method gives the bigger claim?

Cents per kilometre stops at 5,000 business kilometres. A student who drives a lot can pass that quickly, and every kilometre over it is lost. A logbook has no cap and includes interest on a car loan. It needs more work: 12 weeks of trip records and receipts for most costs. You can change methods from year to year.

## Worked example

David studies a three-year degree, so he may be an Australian resident for tax purposes. He drives for a rideshare app on weekends. He kept a 12-week logbook, which showed that 60% of his kilometres were business. In 2025-26 his car costs, without GST, were:

- Fuel: $2,400
- Insurance and registration: $1,500
- Servicing and tyres: $700

Total running costs are $4,600. At 60% business use, he claims $2,760 for running costs, plus 60% of the car's decline in value. He also claims:

- Platform fees shown on his yearly statement
- Water and mints for passengers: $80
- 60% of his phone plan, from a four-week use record

With cents per kilometre instead, his 6,500 business kilometres would be capped at 5,000 km x 88c = $4,400, and that would cover all car running costs including decline in value. David compares both figures and uses the method with the better result that he can support with records.

He cannot claim two speeding fines, or the lunches he bought between rides. He also cannot claim the kilometres he drove to university or to the shops, because those are private trips, even when the app was open on his phone.

If David is registered for GST and claims GST credits on these costs, he uses the amounts without GST, as above. His deductions then reduce his business profit, and tax is worked out on that profit together with any wages he earned.

## Records to keep

- A logbook covering 12 continuous weeks with odometer readings, if you use that method.
- A record of how you worked out your business kilometres, if you use cents per kilometre.
- Platform statements showing fares, tips, bonuses and fees. Tips and bonuses from the platform are income.
- Receipts for car costs, passenger items, accreditation and checks.
- A record of your phone's business use.
- Keep records for 5 years from the date you lodge.

The ATO says you must lodge a tax return if you earn ride-sourcing income, however much or little it is.

## Rideshare and the $1,000 standard deduction

From 2026-27, residents with labour income get a standard deduction of up to $1,000. It does not apply if your only income is business income, such as rideshare income. If you also have a wage job, ask how the two parts fit together.

## Checklist before you lodge

- Check you registered for GST before your first trip, and that your activity statements are up to date.
- Download the yearly statement from each app.
- Choose your car method and check you have the records for it.
- Collect receipts for passenger items, tolls, parking and accreditation.
- Leave off fines, meals and private driving.

Rideshare returns have GST, business income and car costs in one place. If you want help, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Do I need GST registration if I only drive a few hours a week?', a: 'Yes. The ATO says ride-sourcing drivers must register for GST regardless of how much they earn, before the first trip.' },
      { q: 'Can I claim fuel and also use cents per kilometre?', a: 'No. The cents per kilometre rate covers all running costs, including fuel. Fuel is claimed separately only under the logbook method.' },
      { q: 'Are tips from passengers taxable?', a: 'Yes. Fares, tips and bonuses from the platform are all assessable income.' },
      { q: 'Can I claim my police check?', a: 'Yes, for rideshare work. The ATO lists police checks, driver accreditation and medical tests for the work as claimable.' },
    ],
    sources: [
      { label: 'ATO: Income and deductions for ride-sourcing', href: `${SHARING}/ride-sourcing/income-and-deductions-for-ride-sourcing` },
      { label: 'ATO: Ride-sourcing registrations', href: `${SHARING}/ride-sourcing/registrations` },
      { label: 'ATO: D1 Work-related car expenses 2026', href: CAR_2026 },
      { label: 'ATO: Records you need to keep', href: RECORDS },
    ],
  },
  {
    slug: 'chef-kitchen-hand-tax-deductions-students',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Kitchen hand and chef tax deductions for students',
    description: 'Kitchen hand, cook or chef on a student visa? What kitchen staff can claim: chef pants and hat, knives, protective gear and courses. Why the cookery course often is not.',
    answer: 'Kitchen hands and chefs can claim occupation-specific clothing such as chef\'s checked pants and hat, protective clothing, knives and tools they buy, and courses linked to their current job. Ordinary clothing, staff meals and a course that trains you for a new job are not claimable.',
    body: `Commercial kitchens employ many international students, as kitchen hands, cooks and chefs. Some are also studying commercial cookery. Kitchen work has a few more deductions than front-of-house work, mostly clothing and knives.

## The three tests

Every claim must pass the ATO's three rules:

- You paid for it yourself and nobody paid you back.
- It directly relates to earning your income.
- You have a record that proves it.

If you use something at home too, claim only the work part.

## What you can claim

- **Occupation-specific clothing.** The ATO's example is chef's checked pants and a chef's hat. This clothing identifies a trade, so it is claimable even without the restaurant's logo. You can claim buying, repairing and cleaning it.
- **Protective clothing**, such as aprons and gloves. Cut-resistant or heat-resistant gloves protect you from specific risks in the kitchen. Non-slip shoes for a wet or greasy floor are also protective.
- **A compulsory uniform** with your employer's distinctive branding.
- **Knives and kitchen tools you use for work**, plus their insurance and repairs, such as sharpening. If you also use them at home, claim only the work part.
- **Laundry of claimable clothing.** $1 per load of work clothes only, or 50c per load mixed with private clothes.
- **A course linked to your current job** that maintains or improves the skills you use now.
- **Union fees.**

## What you cannot claim

- **Conventional clothing**, such as black pants or a white shirt, even if the kitchen requires it.
- **Staff meals** and food or drink on shift.
- **Travel from home to work.** The ATO says this includes trips where you carry items you cannot take on public transport, such as chef knives. Carrying your knives does not make the commute claimable.
- **A course that trains you for a new job.** The ATO's example is a delivery driver studying to become a chef: not claimable.
- **Vaccinations**, even if your workplace requires them.
- **Knives or tools your employer supplies.**

## Is my cookery course claimable?

This is the most common question from kitchen students. The ATO says study is claimable when it has a sufficient connection to your current job: it maintains or improves the skills you need for that job, or is likely to increase your income from it. It is not claimable when it helps you get a new job, or when you are not employed.

So the answer depends on your facts, and two students in the same class can get different answers. A short knife skills course for a cook who already works as a cook is likely to pass. A full cookery qualification taken by a kitchen hand who wants to become a chef is closer to the ATO's "new job" example. Ask before you claim course fees, and keep your enrolment records either way.

## The $300 rule and knife sets

A knife or tool that costs $300 or less, and is not part of a set costing more than $300, can be claimed in full in the year you buy it. An item over $300 is claimed over several years.

Watch for sets. A knife roll with five knives bought together for $380 counts as one set over $300, even though each knife costs less than $300 alone. That set is claimed over several years.

## Worked example

Minh is a foreign resident for tax purposes and works as a cook in a restaurant. In 2025-26 he paid for:

- Two pairs of chef's checked pants and a chef's hat: $90
- Two aprons and cut-resistant gloves: $55
- A chef's knife bought on its own: $180
- Knife sharpening: $30
- Laundry: one load of work clothes only each week for 45 weeks, at $1 per load: $45

His total is $400. He also paid $380 for a knife set; that is claimed over several years, not all this year. He cannot claim his black work shirt, his staff meals or the drive to work with his knives.

As a foreign resident, Minh pays tax at 30% from the first dollar (2025-26), so his $400 claim reduces his income tax by about $120.

## Records to keep

- Receipts for chef clothing, protective gear, knives and sharpening. Phone photos are fine.
- A short laundry diary showing the number of loads.
- Course enrolment and payment records, if you claim study.
- Keep everything for 5 years from the date you lodge.

For 2025-26, if your total work claims are more than $300, you need written evidence for the whole amount, not only the part over $300. For laundry, you need written evidence when your laundry claim is more than $150 and your total work claims are more than $300. A bank statement alone is usually not enough.

From 2026-27, residents with wage income get a standard deduction of up to $1,000 without receipts. Claiming actual work expenses reduces it dollar for dollar. Foreign residents cannot use it.

## Checklist before you lodge

- Separate chef clothing (claimable) from plain black or white clothing (not claimable).
- Check whether any knives were bought as a set over $300.
- Count your laundry loads.
- Decide carefully whether your course is linked to your current job.
- Leave off staff meals and the commute.

Kitchen staff often work for two restaurants. Both income statements go on one return, with the deductions from both jobs.

If you want a kitchen return checked before you lodge, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Can I claim my chef pants without a logo?', a: 'Yes. The ATO treats chef\'s checked pants and a chef\'s hat as occupation-specific clothing, which is claimable without a logo.' },
      { q: 'I carry my knives to work. Can I claim the drive?', a: 'No. The ATO says carrying items you cannot take on public transport, such as chef knives, does not make the trip from home to work claimable.' },
      { q: 'Can I claim my commercial cookery course?', a: 'Only if it has a close link to your current job and improves the skills you use now. A course that trains you for a new job, such as becoming a chef, is not claimable.' },
    ],
    sources: [
      { label: 'ATO: Hospitality industry employees, income and work-related deductions', href: `${GUIDES}/e-k/hospitality-industry-workers-income-and-work-related-deductions` },
      { label: 'ATO: Clothing, laundry and dry-cleaning expenses', href: CLOTHING },
      { label: 'ATO: Records you need to keep', href: RECORDS },
    ],
  },
]
