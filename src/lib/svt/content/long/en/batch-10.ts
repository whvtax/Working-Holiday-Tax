import type { LongArticle } from '../types'

const ATO = 'https://www.ato.gov.au'
const FW = 'https://www.fairwork.gov.au'

export const LONG_EN_10: readonly LongArticle[] = [
  {
    slug: 'tools-under-300-deduction-international-students',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Work items under $300: the full deduction for international students',
    description: 'Shoes, knives, gloves or a tool you bought for your casual job may be claimed in full in one year if it cost $300 or less. How the rule works for students.',
    answer: 'If you bought a work tool or item for $300 or less and use it to earn your income, you can usually claim the work-use part in full in the year you bought it. Items over $300, or part of a set that costs more than $300, are claimed over several years.',
    body: `Many international students buy small things for their casual job: non-slip shoes for a kitchen, a knife roll, gloves for farm work, a tape measure for a building site. The ATO has a simple rule for items like these. If an item costs $300 or less, you can usually claim it all in the year you buy it, instead of spreading the claim over several years.

This guide explains the rule, the traps, and how it fits with the other deduction rules for students.

## What does the $300 rule say?

The ATO says you can claim an immediate deduction for a tool or piece of equipment that costs $300 or less. You claim only the part you use for work. If an item costs more than $300, you claim its decline in value over its effective life, which means a part of the cost each year.

Every deduction must also pass the ATO's three basic tests:

- You paid for it yourself and nobody paid you back.
- It directly relates to earning your income.
- You have a record, usually a receipt.

If your employer gave you the item, or paid you back for it, you cannot claim it.

## The set rule: where many claims go wrong

The $300 limit applies to each item, but not if the item is part of a set. The ATO says items that are part of a set, or identical items that together cost more than $300, are not claimed immediately. They are claimed over time instead.

For example, the ATO gives a knife set costing $550. Each knife may cost less than $300, but they were bought as a set worth more than $300, so the set is claimed over its effective life.

Buying things one at a time for real reasons is different. A single pair of work boots in March and a pair of gloves in May are two separate items. Splitting one set into several receipts on paper does not change the rule.

## What can students usually claim under this rule?

It depends on the job. These are common examples from the ATO's guides for hospitality, construction and agricultural workers. Each one is claimable only if you bought it yourself and use it for work:

- Kitchen work: your own knives, a knife sharpener, protective items such as non-slip shoes and aprons
- Building sites: steel-capped boots, hi-vis vests, hard hats, safety glasses, gloves, hand tools
- Farm work: gloves, protective boots, safety glasses, small hand tools
- Outdoor work for long periods: the work-use part of sunglasses, sun hats and sunscreen
- Delivery riding on an ABN: items such as a delivery bag, a helmet, lights and a phone mount

Ordinary clothes are not claimable, even if your employer tells you what to wear. The ATO uses the example of black pants and a white shirt. Jeans, socks and normal closed shoes are also not claimable.

## What if you also use the item privately?

Then you claim only the work part. A hi-vis vest or a hard hat is almost never used outside work, so the work part is usually all of it. A pair of sunglasses, a backpack or a phone mount is often used for both.

If you use an item about half the time for work, claim about half of the cost. You need a fair reason for the percentage you choose. A short note of how you worked it out, kept with the receipt, helps if the ATO asks later.

## Do you need a receipt for every item?

You should keep one. A receipt or tax invoice shows the supplier, the date, the item and the price. A clear photo of the receipt on your phone is fine.

For 2025-26 and earlier years, the ATO asks for written evidence when your total work-related claims are more than $300. From 2026-27, that $300 limit no longer applies, and claims above the standard deduction amount need written evidence. The ATO says to keep records for 5 years from the date you lodge your return.

## Does it matter if you are a resident or a foreign resident for tax purposes?

The $300 rule works the same way for both. What changes is how much tax a deduction saves you.

An international student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. For 2025-26, residents pay no tax on the first $18,200 of taxable income. If your income is below that, a deduction may not change your tax at all. Foreign residents pay 30% from the first dollar up to $135,000 for 2025-26, so for them every dollar of deduction saves 30 cents.

**Example.** A resident student earns $26,000 in wages in 2025-26 from a kitchen job. She buys non-slip shoes for $95 and a single chef's knife for $120. Both are protective or work-only items, so she claims $215. Her income is in the 16% band, so her tax goes down by about $34 (16% of $215).

## How does this fit with the new standard deduction?

From the 2026-27 income year, Australian residents with wage income get a standard deduction of up to $1,000 for work-related expenses. The ATO says claiming the decline in value of work assets, which includes items under $300, reduces that standard deduction dollar for dollar.

So for 2026-27, a resident student with only a few small items will often get the same result, or a better one, by taking the standard deduction and not listing the items. Foreign residents for tax purposes cannot get the standard deduction, so for them the $300 rule still matters as before.

## A short checklist

- Photograph every work receipt on the day you buy the item.
- Write the job name on the photo or in a note.
- Check that the item is not part of a set over $300.
- Decide the work-use percentage for anything you also use privately.
- Do not claim anything your employer paid for or gave you.
- Keep the records for 5 years after you lodge.

At tax time, bring your receipts and your income statement together. If you want help, you can message Student Visa Tax on WhatsApp and we will go through your work items with you.`,
    faq: [
      { q: 'Can I claim a laptop I use for university under this rule?', a: 'A laptop used only for study is not a work deduction. The ATO allows self-education costs only when they have a strong connection to your current job, and a laptop over $300 is claimed over several years in any case.' },
      { q: 'I bought three identical pairs of gloves for $120 each. Can I claim them all now?', a: 'Not under the immediate rule. The ATO says identical items that together cost more than $300 are claimed over their effective life instead.' },
      { q: 'My employer paid me back for my boots. Can I still claim them?', a: 'No. If your employer paid for an item or reimbursed you, it is not your deduction.' },
    ],
    sources: [
      { label: 'ATO: Tools and equipment to perform your work', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/tools-computers-and-items-you-use-for-work/tools-and-equipment-to-perform-your-work` },
      { label: 'ATO: Hospitality industry employees', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/guides-for-occupations-and-industries/e-k/hospitality-industry-workers-income-and-work-related-deductions` },
      { label: 'ATO: Standard deduction for work-related expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/standard-deduction-for-work-related-expenses` },
      { label: 'ATO: Records you need to keep', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/records-you-need-to-keep` },
    ],
  },
  {
    slug: 'standard-deduction-1000-international-students',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'The $1,000 standard deduction for international students',
    description: 'From 2026-27, residents with wages get a standard deduction of up to $1,000 for work expenses. Who qualifies, why foreign residents miss out, and when to claim.',
    answer: 'From the 2026-27 income year, Australian residents for tax purposes with wage income get a standard deduction of up to $1,000 for work-related expenses, with no receipts needed. Students who are foreign residents for tax purposes cannot get it, and it does not apply to 2025-26 returns.',
    body: `From 1 July 2026 there is a new way to claim work expenses in Australia. Instead of adding up every receipt, many workers will get a standard deduction of up to $1,000. For international students with casual jobs, this can make tax time simpler. But not every student qualifies, and it starts later than many people think.

## What is the standard deduction?

The ATO says the standard deduction is an amount of up to $1,000 for work-related expenses. It lowers your taxable income. It is not a tax offset, so it does not cut your tax by $1,000. It cuts the income that tax is worked out on.

You do not need to do anything special to get it. The ATO says it applies it automatically, based on your return.

## When does it start?

It starts with the 2026-27 income year, which runs from 1 July 2026 to 30 June 2027. You will lodge that return from July 2027. The ATO says it is not available for the 2025-26 return.

So if you are lodging your 2025-26 return now, the normal rules still apply. You claim the expenses you actually had, with records where they are needed.

## Which students can get it?

The ATO lists two conditions:

- You are an Australian resident for tax purposes.
- You earn assessable labour income, such as salary and wages.

The residency point is the big one for students. An international student enrolled in a course of 6 months or more may be an Australian resident for tax purposes, and if so, they may get the standard deduction. A student who is a foreign resident for tax purposes cannot get it, and still claims actual expenses with records.

Income from a business, such as delivery work on an ABN, is not labour income for this rule. The ATO says that if you only earn other income, such as business income, you are not eligible. If you earn both wages and ABN income, the standard deduction is capped at your labour income, which does not include the business income.

## How much do you get?

Up to $1,000, but never more than your total labour income. The ATO gives an example of a person who earned $400 in wages: their maximum standard deduction is $400.

For most students with a casual job, wages are well above $1,000, so the maximum is $1,000.

## What if you also claim your real expenses?

You can still claim your real work expenses, but the ATO says each dollar you claim reduces the standard deduction by a dollar, down to nil. Expenses that reduce it include uniforms, laundry, car expenses, tolls, stationery, working from home costs and transport between workplaces. The decline in value of work tools and equipment also reduces it.

This means:

- If your real expenses are less than $1,000, claiming them gives you the same total as not claiming them. You may as well not list them, and you do not need the records.
- If your real expenses are more than $1,000, you claim them all with written evidence, and the standard deduction drops to nil.

**Example.** A resident student working in a café has $350 of work expenses in 2026-27: an apron, non-slip shoes and some laundry. If she claims nothing, she gets the full $1,000 standard deduction. If she claims the $350, her standard deduction drops to $650, and the total is still $1,000. Not claiming saves her the paperwork.

**Another example.** A resident student labouring on building sites spends $1,400 on boots, protective gear and tools that are work deductions. He claims the $1,400 with receipts, and his standard deduction becomes nil. His total deduction is $1,400, which is more than $1,000.

## What stays separate?

Some deductions do not reduce the standard deduction. The ATO lists union fees and professional association fees. Other deductions such as gifts and donations, the cost of managing your tax affairs (for example a tax agent fee), and income protection insurance are also outside it. You can claim these as well, with their normal record rules.

## Will it give you a bigger refund?

Not always. A deduction only saves tax if you would otherwise pay tax. For 2025-26, residents pay no tax on the first $18,200 of taxable income, and the low income tax offset can reduce tax further. A student with low wages may already pay little or no tax, so an extra deduction may change nothing. Tax rates for 2026-27 are set by law and the ATO publishes them, so check the current rates before you estimate.

For a foreign resident for tax purposes, the picture is different. There is no tax-free threshold and no standard deduction, so every real work expense you can prove reduces income that is taxed from the first dollar. For these students, a good receipt habit is worth more than for anyone else.

## What should students do now?

- For your 2025-26 return, claim your actual work expenses as usual.
- From July 2026, keep receipts anyway. You will not know until the year ends whether your real costs are above $1,000.
- If you may be a foreign resident for tax purposes, keep every work receipt, because the standard deduction will not apply to you.
- If you have ABN income, keep records for those business expenses, because they sit outside this rule.

If you are not sure which group you fall into, you can message Student Visa Tax on WhatsApp and we will look at your situation with you.`,
    faq: [
      { q: 'Can I use the $1,000 standard deduction on my 2025-26 return?', a: 'No. The ATO says it starts with the 2026-27 income year and is not available for the 2025-26 return.' },
      { q: 'I am a foreign resident for tax purposes. Do I get it?', a: 'No. The ATO says you must be an Australian resident for tax purposes. Foreign residents claim their actual work expenses with records.' },
      { q: 'Does it cover my delivery work on an ABN?', a: 'No. It is based on labour income such as wages. Business income from ABN work is not labour income, so those business expenses are claimed separately.' },
      { q: 'Do I need to tick a box to get it?', a: 'No. The ATO says it applies the standard deduction automatically based on your return.' },
    ],
    sources: [
      { label: 'ATO: Standard deduction for work-related expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/standard-deduction-for-work-related-expenses` },
      { label: 'ATO: Studying in Australia', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia` },
      { label: 'ATO: Low income tax offset', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/tax-offsets/low-income-tax-offset` },
    ],
  },
  {
    slug: 'bike-motorbike-car-deductions-student-visa',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Bike, motorbike or car: vehicle deductions on a student visa',
    description: 'Riding to class or work is private travel. Delivery riding on an ABN is not. What students can claim for a bicycle, e-bike, motorbike or car, and the records needed.',
    answer: 'Travel between home and your normal workplace is private, so most students cannot claim it. If you use a bicycle, e-bike, motorbike or car to earn income, such as delivery riding on an ABN, you can claim the work-use part of its costs, with different rules for cars.',
    body: `Many international students own a bicycle, an e-bike or a scooter, and some have a car. At tax time, a common question is whether any of it can be claimed. The answer depends on two things: what the vehicle is used for, and what type of vehicle it is.

## First question: what do you use it for?

The ATO says you cannot claim normal trips between home and your regular place of work. That is private travel, even if the trip is long or your shift starts very early. Travel to university or college is also private.

So a student who rides to a café job every day cannot claim the bike. The ATO does allow some work travel, for example:

- Travel directly between two separate jobs on the same day
- Travel from home to a different workplace that is not your regular one
- Carrying bulky tools that you need for work, when there is nowhere safe to store them at work (the ATO has strict conditions for this)

The clearest case is when the vehicle itself earns the income. If you deliver food on an ABN, the bike, scooter or car is part of how you earn money, and its work-use costs are business expenses.

## Second question: what type of vehicle is it?

The ATO treats cars differently from everything else. For tax, a car is a motor vehicle designed to carry less than one tonne and fewer than 9 passengers.

Motorcycles, scooters, bicycles and e-bikes are not cars. Utes that carry one tonne or more are also not cars. For these vehicles, you claim the actual costs, multiplied by the work-use percentage. The two simpler car methods do not apply.

## What can you claim for a bicycle or e-bike?

If you use it to earn income, you can claim the work part of:

- The bike itself. If it cost $300 or less, the work part can usually be claimed in full in that year. If it cost more, it is claimed over its effective life.
- Repairs and parts such as tyres, tubes, chains and brake pads
- Equipment such as a helmet, lights, a lock and a delivery bag
- Electricity to charge an e-bike battery, worked out on a fair basis
- Insurance for the bike

**Example.** A student uses an e-bike that cost $1,500 for food delivery on an ABN. She keeps a simple diary for a few typical weeks and finds that about 70% of her riding is delivery work. She claims 70% of her repairs, equipment and charging costs, and 70% of the bike's decline in value each year, not the full $1,500 at once.

## What about a motorbike or scooter?

Same idea: actual costs times the work-use percentage. This can include fuel, registration, insurance, servicing, tyres and the decline in value of the bike. You need written evidence for these costs, so keep fuel and service receipts.

## How do car claims work?

If you use your own car for work (not just to get to work), there are two methods.

**Cents per kilometre.** The ATO rate for 2025-26 is 88 cents per kilometre, for up to 5,000 work kilometres per car per year. You do not need receipts, but you need a record showing how you worked out your work kilometres, such as a diary of trips.

**Logbook.** You keep a logbook of work trips for a continuous period of 12 weeks, with odometer readings. That gives your work-use percentage, which you apply to the car's real costs: fuel, servicing, registration, insurance and decline in value. You need written evidence for costs other than fuel.

**Example.** A resident student does deliveries in his own car on an ABN and records 2,000 delivery kilometres in 2025-26. Using cents per kilometre, his claim is 2,000 x 88 cents = $1,760.

## Do the rules change if you are an employee or on an ABN?

The vehicle rules are the same, but how they apply is different. As an employee, you can only claim work travel your job requires, not your commute. On an ABN, travel while doing the paid work, such as riding between a restaurant and a customer, is part of your business.

Remember that ABN income has no tax taken out. Your vehicle claims reduce the profit you pay tax on, so good records matter even more.

If you have both a TFN job and ABN delivery work, keep the two apart in your records. A trip to your café shift is still private travel, even on the same bike you use for deliveries. Only the delivery riding is part of the business.

## What changes from 2026-27?

From 2026-27, residents with wage income get a standard deduction of up to $1,000. The ATO says car expenses related to wages, and travel between workplaces, reduce that standard deduction dollar for dollar. Vehicle costs for ABN business income are business expenses and are not part of the standard deduction.

## Records to keep

- A diary or log of work trips and kilometres
- Receipts for the bike, scooter or car parts, repairs and equipment
- Fuel and service receipts for motorbikes and for the logbook method
- A note of how you worked out your work-use percentage
- Keep everything for 5 years from the date you lodge

If you are not sure what counts as work travel in your case, you can message Student Visa Tax on WhatsApp and we will check it with you.`,
    faq: [
      { q: 'Can I claim the bus or train fare to my part-time job?', a: 'Not for normal trips between home and your regular workplace. The ATO treats this as private travel.' },
      { q: 'Can I use cents per kilometre for my motorbike?', a: 'No. The ATO says the car methods do not apply to motorcycles. You claim the actual costs times your work-use percentage.' },
      { q: 'I use my bike for delivery and for getting to class. What do I claim?', a: 'Only the delivery part. Work out a fair work-use percentage, for example from a few weeks of trip records, and apply it to your bike costs.' },
    ],
    sources: [
      { label: 'ATO: D1 Work-related car expenses 2026', href: `${ATO}/forms-and-instructions/individual-tax-return-2026-instructions/deduction-questions-d1-d10-individual-tax-return-2026/d1-work-related-car-expenses-2026` },
      { label: 'ATO: Tools and equipment to perform your work', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/tools-computers-and-items-you-use-for-work/tools-and-equipment-to-perform-your-work` },
      { label: 'ATO: Standard deduction for work-related expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/standard-deduction-for-work-related-expenses` },
    ],
  },
  {
    slug: 'dasp-or-leave-super-international-students',
    category: 'Super',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Claim your super or leave it? A guide for international students',
    description: 'When you finish your studies and leave Australia, should you claim your super as a DASP or leave it in the fund? The tax, the fees and the questions to ask.',
    answer: 'If you have left Australia for good and your visa has ended, claiming your super as a departing Australia superannuation payment (DASP) is often the simpler choice, because the DASP tax rate does not get lower if you wait. Leaving it can make sense only if you may stay connected to Australia in a way that changes your super position.',
    body: `If you worked during your studies, your employer paid super into a fund for you. When you finish and go home, you have two broad choices: claim it as a departing Australia superannuation payment (DASP), or leave it in the fund for now. This guide helps you think through that decision. It does not give visa advice.

## Can you claim it at all?

The ATO says you can generally claim a DASP when all of these are true:

- You received super while working in Australia on a temporary visa (not a 405 or 410 visa).
- Your visa has ended or been cancelled.
- You have left Australia and do not hold another active visa.
- You are not an Australian citizen, permanent resident or New Zealand citizen.

The ATO also says the online application cannot be submitted while a temporary visa is still active. If you move from a student visa to a 485 graduate visa, you still hold an active visa, so you cannot claim a DASP yet. You can check your visa status in VEVO.

## How is a DASP taxed for students?

The DASP is taxed when it is paid. For the taxed element, the usual rate is 35% for people who never held a working holiday visa (417 or 462). The untaxed element, which is less common, is taxed at 45%.

A higher rate of 65% applies to the whole payment if it includes super from contributions made while you held a 417 or 462 visa. Most students never held one of those visas, so the 35% rate is the one that usually applies.

**Example.** A student leaves Australia with $6,000 of super, all taxed element, and never held a working holiday visa. The DASP tax is 35% of $6,000, which is $2,100. About $3,900 is paid out, before any fund fees on the way.

## Does waiting reduce the tax?

No. The DASP rate is set by the rules at the time you claim, not by how long you wait. Leaving your super in the fund does not make the tax smaller. It only keeps the money in the fund for longer.

## What happens if you leave it in the fund?

While your account stays open, your fund keeps charging its normal fees. Many accounts also include insurance, and the premiums come out of your balance. The ATO says to check insurance before you move or close a super account, because you may lose cover. If you no longer need that cover, you can ask the fund about it.

The balance also goes up or down with the fund's investments. With no new contributions coming in, fees can slowly reduce a small balance.

Many students worked for two or three employers during their course, and each one may have paid into a different fund. Each account can charge its own fees. You can see your accounts in ATO online services through myGov. While you are still in Australia, you can choose to bring them together into one fund, after checking insurance and any exit fees. This does not change the fund your current employer pays into.

The ATO says that if you have left Australia and your visa ended at least 6 months ago, the fund must transfer your super to the ATO as unclaimed super. It is not lost. You can still claim it from the ATO as a DASP.

## When might leaving it make sense?

There are a few situations where waiting can be worth thinking about:

- You hold another active visa, such as a 485, so you cannot claim a DASP anyway.
- You plan to keep working in Australia and building the same account.
- Your future plans may change your status in Australia. Super for Australian permanent residents follows different rules, and a DASP is not available to them.

Plans about future visas are a question for Home Affairs or a registered migration agent. What matters for super is that the DASP option depends on your visa status at the time you apply.

## When is claiming usually the simpler choice?

When you have finished your studies, left Australia and do not plan to come back on a visa that affects your super. Claiming soon after you leave also means your passport, address and bank details still match what the fund holds, which makes the application easier.

The ATO's DASP online system is free. The ATO says the eligibility check takes about 45 seconds and the application about 30 minutes, and its service standard is 28 days from a complete application. You can start the application before you leave Australia, and submit it once your visa has ended.

To apply, you need your personal details, an email address, your passport country and number, and the details of each fund, including the fund's ABN. Your TFN is optional, but it helps the fund and the ATO match your accounts.

## Before you decide: a checklist

- Find all your super accounts in ATO online services through myGov. Students who had several jobs often have more than one fund.
- Check whether your account includes insurance and what it costs.
- Check your visa status in VEVO. A DASP cannot be submitted while a temporary visa is active.
- Keep your passport details, fund names and fund ABNs ready.
- Remember your final tax return is separate from your super. If you worked in your last year, you will probably need to lodge after 30 June, and you can do this from overseas.

If you would like help with the tax return for your final year, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'I am now on a 485 graduate visa. Can I claim my super from my student years?', a: 'Not while the 485 visa is active. The ATO says a DASP application cannot be submitted while you hold an active temporary visa.' },
      { q: 'Is the DASP rate lower if I claim later?', a: 'No. Waiting does not lower the tax rate. For students who never held a 417 or 462 visa, the taxed element is usually taxed at 35%.' },
      { q: 'What if I forget about my super?', a: 'If you have left and your visa ended at least 6 months ago, the fund transfers it to the ATO. You can still claim it from the ATO later.' },
    ],
    sources: [
      { label: 'ATO: Departing Australia superannuation payment (DASP)', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp` },
      { label: 'ATO: Help with the DASP online application system', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system` },
      { label: 'ATO: Transferring or consolidating your super', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/transferring-or-consolidating-your-super` },
    ],
  },
  {
    slug: 'fruit-picking-student-visa-tax',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Fruit picking on a student visa: pay, piece rates and tax',
    description: 'Picking fruit in the university holidays? How piece rates and the minimum guarantee work, why you need a TFN, what super you get, and what you can claim at tax time.',
    answer: 'Fruit pickers are usually employees, so you give the farm or labour hire company your TFN, tax is taken from your pay, and you get super. Under the Horticulture Award, piece rate workers must still get at least the minimum hourly rate for the hours they work each day.',
    body: `Some international students spend part of their university holidays picking fruit in regional Australia. The pay can be good, but the rules are different from a city café job. This guide covers how pickers are paid, the tax side, and what to keep for your return. For how many hours you can work, check your own visa conditions with Home Affairs.

## How are fruit pickers paid?

There are two common ways:

- **Hourly rate.** You are paid at least the minimum rate for your classification under the Horticulture Award. Casual workers also get a 25% casual loading.
- **Piece rate.** You are paid per bin, bucket, tray or kilogram.

Fair Work says pieceworkers have a minimum wage guarantee for each day they work. For each day, you must get at least your minimum hourly rate multiplied by the hours you worked. For casual pieceworkers, that hourly rate includes the 25% casual loading. If your piece rate earnings are higher, you get the higher amount.

Fair Work also says a piecework record must be made, signed and given to you before the piecework starts. If nobody gives you one, ask for it.

## What is the minimum pay?

From 1 July 2026, the national minimum wage is $26.44 an hour. Award minimum wages also rose by 4.75% from that date. Your exact rate depends on the award and your classification, and the Fair Work Pay Calculator can show it.

A simple habit helps: for your first week, write down your hours each day and what you were paid. If the daily pay is below the minimum hourly rate times your hours, the farm may owe you the difference. Fair Work can help with this for free, and its information is clear that visa holders have the same workplace rights as other workers.

## Who is your employer?

Many pickers are hired through a labour hire company, not by the farm. In that case, the labour hire company is your employer. It pays you, gives you payslips, pays your super and reports your income to the ATO. Your income statement at the end of the year will show the labour hire company's name, not the farm's.

## TFN or ABN?

Most fruit pickers should be employees. As an employee, you give your TFN and fill in a TFN declaration, and tax is taken from each pay.

Some farms ask workers to get an ABN. An ABN is for people who run their own business. The ABR says you are not entitled to an ABN for work you do as an employee, and an employer should not ask you to get one as a condition of the job. If the farm decides your hours, how you pick and where you work, and gives you the equipment, that usually points to employment.

## How is the tax worked out?

On your TFN declaration, you answer whether you are an Australian resident for tax purposes. A student enrolled in a course of 6 months or more may be a resident. If you may be a resident and this is your main job, you can claim the tax-free threshold here. If you already claim it at another job, answer no at the farm.

For 2025-26, residents pay no tax on the first $18,200 of taxable income, then 16% up to $45,000. Foreign residents pay 30% from the first dollar up to $135,000.

**Example.** A resident student earns $15,000 at a city job and $6,000 picking in the summer holidays, $21,000 in total for 2025-26. Tax on the part above $18,200 is 16% of $2,800, which is $448, before the low income tax offset. If both employers took tax out correctly, the return shows whether too much or too little was withheld.

## Do pickers get super?

Yes, generally. The ATO says employees, including casuals and temporary residents, are generally eligible for super guarantee at 12%. Under Payday Super, from 1 July 2026 employers pay super at the same time as wages. Check that your payslip shows super and the name of the fund.

## What can a picker claim?

The ATO's guide for agricultural workers lists things like these, as long as you paid for them and were not reimbursed:

- Protective boots and other protective clothing for real work risks
- Gloves and safety glasses
- The work-use part of sun hats, sunglasses and sunscreen if you work outdoors for long periods
- Small tools you supply yourself, such as secateurs

You cannot claim ordinary clothes such as jeans and shorts, even if the farm asks for them. The trip from your home or hostel to the farm is usually private travel. The ATO says travel directly between two separate jobs on the same day can be claimed.

If you stay near the farm, accommodation is usually a private cost. Fair Work says your payslip must show each deduction from your pay, so check any rent or transport taken out of your wages.

## What to keep from the season

- Every payslip from every employer
- Your bank statements showing wages paid in
- A diary of dates, farm names and hours
- Receipts for boots, gloves and sun protection
- Your piecework record if you were on piece rates

After 30 June, wait until your income statement in myGov is marked "Tax ready" before you lodge. If you picked fruit as well as working in the city, you can message Student Visa Tax on WhatsApp and we will put both jobs on one return.`,
    faq: [
      { q: 'Can the farm pay me only by the bin with no minimum?', a: 'No. Fair Work says pieceworkers under the Horticulture Award must get at least their minimum hourly rate for the hours worked each day.' },
      { q: 'The farm wants me to get an ABN. Is that normal?', a: 'The ABR says you are not entitled to an ABN for work you do as an employee, and an employer should not ask for one as a condition of the job. Most pickers are employees.' },
      { q: 'Do I need to lodge a tax return for a few weeks of picking?', a: 'If you worked, you will usually lodge a return for that year, and the picking income goes on it with your other income.' },
    ],
    sources: [
      { label: 'Fair Work: Pay and piece rates (horticulture)', href: 'https://horticulture.fairwork.gov.au/pay-and-piece-rates' },
      { label: 'ATO: Agricultural workers, deductions for work expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/in-detail/occupation-and-industry-specific-guides/a-d/agricultural-workers-income-and-work-related-deductions/deductions-for-work-expenses/agriculture-industry-expenses-ps` },
      { label: 'ABR: ABN entitlement', href: 'https://www.abr.gov.au/business-super-funds-charities/applying-abn/abn-entitlement' },
      { label: 'ATO: Work out if you have to pay super', href: `${ATO}/businesses-and-organisations/super-for-employers/work-out-if-you-have-to-pay-super` },
    ],
  },
  {
    slug: 'farm-hand-student-visa-tax',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Farm hand work on a student visa: pay, TFN and deductions',
    description: 'Livestock, fencing and machinery work in the holidays. How international students working as farm hands are paid and taxed, plus live-in deals and what you can claim.',
    answer: 'A farm hand is almost always an employee, so you give your TFN, tax is taken from your pay and the farm pays super. Your pay comes from the award that covers the farm, and you can claim protective gear, sun protection and tools you buy yourself.',
    body: `Farm hand is a wide job title. It can mean feeding animals, fencing, driving a tractor, helping at harvest or general property maintenance. Some international students take farm hand jobs during long university breaks. This guide explains the pay and tax side. For limits on how much you can work during study periods and breaks, check your visa conditions with Home Affairs.

## Which award sets your pay?

The award depends on the main business of the farm, not the task you do that day. Fair Work has different awards for different kinds of farms, such as the Pastoral Award for livestock and grain farms and the Horticulture Award for fruit, vegetables and similar crops. Some farms have their own registered agreement.

Within an award, your classification depends on your skills and duties. A worker who drives machinery and handles stock without supervision should not stay on the lowest level forever. The Fair Work Pay Calculator shows the rate for your award and level.

## What is the minimum pay?

From 1 July 2026, the national minimum wage is $26.44 an hour, and award minimum wages rose by 4.75%. Casual workers under the national minimum wage also get a 25% casual loading. Fair Work says penalty rates may apply for weekends, public holidays, overtime and early or late shifts, depending on the award.

Your payslip must arrive within 1 working day of payday. Fair Work says it must show your pay rate, hours, any loadings or penalty rates, each deduction, and the super paid and the fund.

## Employee or contractor?

Almost every farm hand is an employee. You work in the farmer's business, and the farmer decides what you do, where and when.

The ATO says having an ABN does not on its own make you a contractor, and a contract that says "contractor" does not change the real relationship. If a farm asks you to get an ABN to start work, that is a warning sign. The ABR says an employer should not ask for one as a condition of employment.

## How is a farm hand taxed?

As an employee, you give the farm your TFN declaration. Two answers on it matter most:

- Are you an Australian resident for tax purposes? A student enrolled in a course of 6 months or more may be a resident.
- Do you claim the tax-free threshold from this payer? Claim it from one employer only, usually the one that pays you the most.

If you keep a part-time job in the city and also work on a farm in the holidays, the farm is often your second job. In that case, answer no to the tax-free threshold on the farm's form. If you claim it twice, too little tax may be taken out and you may get a tax bill.

## What about live-in jobs?

Some farm jobs include a room and meals. Before you agree, ask for the full deal in writing: the hourly rate, the expected hours, and how much will be taken from your pay for room and food.

Then do a simple sum: pay minus the room and meal deductions, divided by the hours you will really work. Compare that with other work you could do. Any amount taken from your wages must appear on your payslip. Accommodation near your workplace is normally a private cost, so it is not a tax deduction.

## Do farm hands get super?

Yes. The ATO says employees, including casual workers and temporary residents, are generally eligible for super guarantee at 12%. From 1 July 2026, under Payday Super, employers pay super at the same time as wages. If your payslips show super but your fund does not, you can check ATO online services through myGov and report unpaid super to the ATO.

## What can a farm hand claim?

The ATO's guide for agricultural workers allows claims for items you paid for yourself and use for work, such as:

- Protective boots, such as steel-capped boots, and protective clothing
- Gloves, safety glasses, helmets and breathing masks where there is a real risk
- The work-use part of sun hats, sunglasses and sunscreen if you work outdoors for long periods
- Tools such as fencing tools and chainsaws. Items of $300 or less may be claimed at once. Dearer items are claimed over time.
- The work part of your own phone, if you use it for work

You cannot claim jeans, drill shirts, shorts or normal closed shoes. Initial licences you need to get a job are not claimable, but renewing a licence you need to keep doing the job can be. Travel from home to your regular farm is private.

**Example.** A resident student working on a cattle property buys steel-capped boots for $180, gloves for $35 and a broad-brimmed sun hat for $40, all only for work. She claims $255. If her income is in the 16% band for 2025-26, her tax goes down by about $41.

## A short checklist for farm work

- Get the pay rate, hours and any deductions in writing before you start.
- Give your TFN declaration and answer the tax-free threshold question carefully.
- Check every payslip for super and deductions.
- Photograph receipts for boots, gloves, sun protection and tools.
- After 30 June, wait for your income statement to show "Tax ready" before you lodge.

If you worked on a farm and in the city in the same year, you can message Student Visa Tax on WhatsApp and we will help you put it all on one return.`,
    faq: [
      { q: 'Is free accommodation on the farm taxable?', a: 'It depends on how it is set up. Ask your employer whether anything is reported on your income statement, and check your payslip for any amount taken from your wages.' },
      { q: 'Can I claim the drive from the city to the farm at the start of the season?', a: 'Usually no. Travel to start a job at your regular workplace is private. The ATO allows travel directly between two separate jobs on the same day.' },
      { q: 'The farm pays me cash. Is that okay?', a: 'Cash wages are still income that must be declared, and you should still get a payslip and super. Fair Work can help if you are not getting your entitlements.' },
    ],
    sources: [
      { label: 'ATO: Agricultural workers, deductions for work expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/in-detail/occupation-and-industry-specific-guides/a-d/agricultural-workers-income-and-work-related-deductions/deductions-for-work-expenses/agriculture-industry-expenses-ps` },
      { label: 'ATO: Income from more than one job', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job` },
      { label: 'Fair Work: Pay slips', href: `${FW}/pay-and-wages/paying-wages/pay-slips` },
      { label: 'Fair Work: Minimum wage increase starts today', href: `${FW}/newsroom/media-releases/2026-media-releases/july-2026/20260701-minimum-wage-increase-media-release` },
    ],
  },
  {
    slug: 'bartender-jobs-student-visa-tax',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Bartender jobs on a student visa: pay, tips and tax',
    description: 'Bar work suits many students because shifts are at night and on weekends. How bartenders are paid, how tips are taxed, why the first RSA is not a deduction, and more.',
    answer: 'Bartenders are usually casual employees, so you give your TFN, tax is taken from your pay and you get super. Tips are taxable income, and the first RSA course you do to get the job is not a tax deduction, though a later renewal can be.',
    body: `Bar work is popular with international students. Most shifts are in the evening and at weekends, so they often fit around classes. This guide explains how bartenders are paid and taxed, and what you can and cannot claim. For the hours you are allowed to work, check your visa conditions with Home Affairs.

## Which award covers bar work?

It depends on where the bar is. A bar in a hotel, pub or club is usually covered by the Hospitality Industry (General) Award. A bar inside a restaurant may be covered by the Restaurant Industry Award. Some large venues have their own registered agreement.

The award sets your minimum pay and penalty rates. Your classification within it depends on what you actually do. Collecting glasses is not the same level as serving drinks. If your duties grow, check that your classification grows too. The Fair Work Pay Calculator shows the right rate.

## How much do bartenders earn?

From 1 July 2026, the national minimum wage is $26.44 an hour, and award minimum wages rose by 4.75%. Most bartenders are casual, and casuals usually get a 25% casual loading instead of paid leave.

Fair Work says employees may get penalty rates for weekends, public holidays, overtime, and late night or early morning shifts. The rates depend on the award. Because bar shifts are often on Friday and Saturday nights, penalty rates can make a big difference to your pay.

A quick check: if a week included a Sunday or a public holiday, your payslip should show a different rate for those hours. If every hour is paid the same, ask why.

## Do you need an RSA, and can you claim it?

You need a Responsible Service of Alcohol (RSA) certificate to serve alcohol. The rules are set by each state and territory, so check the rules where you work.

For tax, the ATO's guide for hospitality workers is clear. You cannot claim the cost of getting an initial licence or certificate, such as an RSA, to get a job. You can claim the cost of renewing it to keep doing your current job. If your employer paid for the course, you cannot claim it either way.

## How are tips taxed?

The ATO says tips and gratuities are assessable income. That means they go on your tax return.

- Card tips paid through payroll usually appear on your payslip and income statement.
- Cash tips handed to you are not reported by anyone else, so you need to add them yourself.

A simple weekly note of cash tips is enough of a record. Tips are extra money. They do not replace the minimum wage your employer must pay.

## TFN, tax and super

Bartenders are employees. You give the venue your TFN declaration and tax is taken from each pay. If you may be an Australian resident for tax purposes (a student in a course of 6 months or more may be), claim the tax-free threshold from one job only.

For 2025-26, residents pay no tax on the first $18,200 of taxable income and 16% from $18,201 to $45,000. Foreign residents pay 30% from the first dollar up to $135,000.

Your employer must pay super at 12% of your ordinary earnings. From 1 July 2026, under Payday Super, it is paid at the same time as your wages. Your payslip should show the super amount and the fund.

## What can a bartender claim?

The list is short. The ATO allows:

- Protective items such as non-slip shoes, if you buy them yourself
- A compulsory uniform or a registered uniform with the venue's logo, if you pay for it
- Laundry of claimable work clothing, at $1 per load (or 50c if mixed with other clothes)
- RSA renewals needed to keep your current job
- The work part of your phone, if you use it for work. Claims of $50 or less need no records.

You cannot claim a black shirt and black pants, even if the venue requires them. The ATO says conventional clothing is not claimable. You also cannot claim hair, make-up or grooming costs, or meals during normal working hours.

**Example.** A resident student bartender buys non-slip shoes for $90 and works out a $30 phone claim. He claims $120. If his income for 2025-26 is in the 16% band, his tax goes down by about $19.

From 2026-27, residents with wages get a standard deduction of up to $1,000, and claimed work expenses reduce it dollar for dollar. For most bartenders, real expenses are well under $1,000.

## Watch for these problems

- One flat rate for all hours, with no weekend or public holiday rates
- Cash pay with no payslip and no super
- Unpaid time to set up before opening or clean after close
- Money taken from your pay for breakages or till shortages

Fair Work says visa holders have the same workplace rights as everyone else, and you can contact them for free help.

## Your tax time checklist

- Keep every payslip and check the rates for nights and weekends.
- Write down cash tips each week.
- Keep receipts for non-slip shoes and any uniform you paid for.
- If you may not be entitled to Medicare, apply for a Medicare Entitlement Statement after 1 July and wait for it before lodging.

If you would like help with your return, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Can I claim my first RSA course?', a: 'No. The ATO says the cost of getting an initial licence or certificate to get a job is not claimable. A renewal you need to keep doing your current job can be claimed.' },
      { q: 'Do I need to declare cash tips?', a: 'Yes. The ATO says tips and gratuities are assessable income, so add any cash tips to your return.' },
      { q: 'The bar requires black pants and a black shirt. Can I claim them?', a: 'No. The ATO treats these as conventional clothing, which is not claimable even when the employer requires it.' },
    ],
    sources: [
      { label: 'ATO: Hospitality industry employees', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/guides-for-occupations-and-industries/e-k/hospitality-industry-workers-income-and-work-related-deductions` },
      { label: 'ATO: Taxable, assessable and exempt income', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/income-you-must-declare/taxable-assessable-and-exempt-income` },
      { label: 'Fair Work: Penalty rates', href: `${FW}/pay-and-wages/penalty-rates-allowances-and-other-payments/penalty-rates` },
    ],
  },
  {
    slug: 'barista-jobs-student-visa-tax',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Barista jobs for international students: pay, trials and tax',
    description: 'Café work is one of the most common student jobs. How baristas are paid, when a trial shift must be paid, how tax and super work, and the small deductions you can claim.',
    answer: 'Baristas are usually casual employees, so you give your TFN, tax is taken from your pay and you get super. Your pay depends on the award and your classification, weekend penalty rates may apply, and a trial shift beyond a short skills test must be paid.',
    body: `Working in a café is one of the most common jobs for international students in Australia. Shifts are often early in the morning and at weekends, which can fit around classes. This guide covers pay, trial shifts, tax and super. For work-hour limits, check your visa conditions with Home Affairs.

## Which award covers café work?

A stand-alone café is usually covered by the Restaurant Industry Award. A café inside a hotel or club may be covered by the Hospitality Industry (General) Award. Some businesses use a registered agreement instead.

Your classification depends on the work you actually do. A new worker who clears tables and takes orders may start at a lower level than an experienced barista who runs the coffee machine alone. If your duties change, your classification may need to change too. The Fair Work Pay Calculator shows the rate.

## What should you be paid?

From 1 July 2026, the national minimum wage is $26.44 an hour, and award minimum wages rose by 4.75%. Most café workers are casual and usually get a 25% casual loading.

Fair Work says penalty rates may apply for weekends, public holidays, overtime and early or late shifts, depending on the award. Cafés are busiest on Saturday and Sunday, so these rates matter. A "flat rate for everything" that looks good on a Tuesday may pay less than the award for a weekend shift.

## Is an unpaid trial shift legal?

Only in a narrow case. Fair Work says an unpaid trial is lawful only if it is to show your skills, you are directly supervised, and it lasts no longer than needed. That can be from an hour up to one shift, depending on the job.

If you are making coffee for paying customers for a whole shift, that is work. It must be paid at the minimum rate, whether or not you get the job.

## Do you need a certificate?

Most cafés hire based on your skills, not a barista certificate. Some employers ask for a food safety certificate, and you need an RSA if the café also serves alcohol.

For tax, the ATO says you cannot claim the cost of getting an initial licence or certificate to get a job. Renewing one you need for your current job can be claimed. A barista course you do before you have the job is not a work deduction.

## TFN, tax and super

Baristas are employees. When you start, you fill in a TFN declaration. If you may be an Australian resident for tax purposes, and a student in a course of 6 months or more may be, you can claim the tax-free threshold from one employer only.

Many students have two jobs, such as a café on weekdays and a restaurant at weekends. Claim the tax-free threshold only at the job that pays you the most. If you claim it at both, too little tax may be taken out and you may owe tax at the end of the year.

For 2025-26, residents pay no tax on the first $18,200, then 16% up to $45,000. Foreign residents pay 30% from the first dollar up to $135,000.

Your employer must pay super at 12%, and from 1 July 2026 it is paid with your wages under Payday Super. Your payslip, which must arrive within 1 working day of payday, should show it.

## What can a barista claim?

The ATO's hospitality guide allows:

- Protective clothing such as non-slip shoes and aprons, if you buy them yourself
- A compulsory uniform or registered uniform, if you pay for it
- Laundry of claimable work clothing at $1 per load, or 50c if mixed with other clothes
- The work part of your own phone, if you use it for work

You cannot claim plain black clothes, even if the café asks for them. You cannot claim coffee or food you have during your shift. If the café buys your apron, you cannot claim it.

**Example.** A resident student working weekends in a café buys two aprons for $25 each and non-slip shoes for $80, all only for work. She claims $130. If her income is in the 16% band for 2025-26, her tax goes down by about $21. If her income is below $18,200, a deduction may not change her tax at all.

## Problems to watch for

- No weekend or public holiday rates on your payslip
- A full unpaid trial shift
- Unpaid time to set up before opening
- Money taken from your pay for coffee, food or a uniform
- Cash pay with no payslip and no super

Fair Work says visa holders have the same workplace rights as all other employees, and help is free. Fair Work also says your visa will not be cancelled because you contact them for help.

A payslip is the easiest way to spot these problems. Fair Work says it must show your hourly rate, the hours worked at that rate, any penalty rates or loadings, each deduction, and the super paid and the fund. Keep a simple note of your own start and finish times, and compare it with each payslip.

## Your next steps

- Check one payslip against the Fair Work Pay Calculator for a weekend shift.
- Keep receipts for shoes and aprons you bought.
- After 30 June, wait until your income statement shows "Tax ready".
- If you may not be entitled to Medicare, get a Medicare Entitlement Statement before you lodge.

If you want your café income and any other jobs checked on one return, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Can I claim my barista course?', a: 'Not if you did it to get a job. The ATO says the cost of an initial licence or certificate to get a job is not claimable, and study is claimable only when it is closely connected to your current job.' },
      { q: 'Is a two-hour unpaid trial legal?', a: 'Only if it is a real skills demonstration under direct supervision and no longer than needed. If you are doing productive work, Fair Work says you must be paid.' },
      { q: 'My café pays one flat rate for all shifts. Is that okay?', a: 'It may not be. The flat rate must be at least what the award pays for every shift, including weekends and public holidays. Check with the Fair Work Pay Calculator.' },
    ],
    sources: [
      { label: 'Fair Work: Unpaid trials', href: `${FW}/starting-employment/unpaid-work/unpaid-trials` },
      { label: 'ATO: Hospitality industry employees', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/guides-for-occupations-and-industries/e-k/hospitality-industry-workers-income-and-work-related-deductions` },
      { label: 'ATO: Income from more than one job', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job` },
      { label: 'Fair Work: Penalty rates', href: `${FW}/pay-and-wages/penalty-rates-allowances-and-other-payments/penalty-rates` },
    ],
  },
  {
    slug: 'waiter-jobs-student-visa-tax',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Waiting tables on a student visa: wages, tips and your tax return',
    description: 'How waiters and waitresses are paid under Australian awards, how card and cash tips are taxed, what goes on your TFN declaration, and what you can claim at tax time.',
    answer: 'In Australia, waiters are paid a full award wage, not a tipped wage, and are usually casual employees with tax taken from their pay. Tips are extra and taxable: card tips often appear on your income statement, but you must add cash tips yourself.',
    body: `Waiting tables is a common first job for international students. You meet people, practise English and earn a real wage. In Australia, the wage does not depend on tips. It is set by an award. This guide explains pay, tips and tax. For work-hour limits, check your visa conditions with Home Affairs.

## What sets a waiter's pay?

Most restaurant waiters are covered by the Restaurant Industry Award. Waiters in hotels, pubs and clubs are usually covered by the Hospitality Industry (General) Award. Some businesses have a registered agreement.

Within the award, your classification depends on your duties. Clearing and setting tables is a lower level than taking orders, serving drinks and running a section. If you do the work of a higher level, you should be paid at that level. The Fair Work Pay Calculator can show the right rate.

In a small restaurant, a waiter often does more than carry plates. You may make coffee, pour drinks or help close the bar. Write down the main tasks you do in a normal week. This makes it easier to compare your duties with the classification on your payslip.

## How much should you earn?

From 1 July 2026, the national minimum wage is $26.44 an hour, and award minimum wages rose by 4.75%. Most waiters are casual and usually receive a 25% casual loading.

Fair Work says employees may be entitled to penalty rates for weekends, public holidays, overtime and late or early shifts. The exact rates depend on the award. Friday and Saturday dinner shifts and Sunday lunches are often where penalty rates apply.

Your payslip must come within 1 working day of payday. Fair Work says it must show your rate, hours, any penalty rates and loadings, deductions, and the super paid.

## How are tips taxed?

The ATO says tips and gratuities are assessable income. They go on your tax return, together with your wages.

How you got the tip matters for record keeping:

- **Card tips paid through payroll.** These are usually on your payslip, and tax may be taken out. They often appear on your income statement already.
- **Shared tips paid out by the venue.** Ask how they are paid. If they come through payroll, they are on your payslip.
- **Cash handed to you.** No one reports these for you. Keep a weekly note and add the total to your return.

Tips are extra. Your employer cannot use them to make up the minimum wage.

## Your TFN declaration

When you start, you fill in a TFN declaration. Two questions matter:

- **Are you an Australian resident for tax purposes?** A student enrolled in a course of 6 months or more may be a resident. The ATO has a residency test you can use.
- **Do you claim the tax-free threshold from this payer?** Claim it from one employer only. If waiting is your second job, answer no.

If you do not give a TFN within 28 days of starting, the ATO says your employer may take tax at the top rate plus the Medicare levy.

## How much tax will you pay?

For 2025-26, residents pay no tax on the first $18,200 of taxable income, then 16% on income from $18,201 to $45,000. Residents may also get the low income tax offset. Foreign residents for tax purposes pay 30% from the first dollar up to $135,000.

**Example.** A resident student earns $22,000 in wages and $800 in cash tips in 2025-26, so her income is $22,800. Tax on the part above $18,200 is 16% of $4,600, which is $736. The low income tax offset of up to $700 then reduces this. Her return compares the result with the tax her employer already took out.

If the same student had forgotten the $800 of cash tips, her return would be wrong and she would need to amend it. It is easier to include tips from the start.

Your employer must also pay super at 12% of your ordinary earnings. From 1 July 2026, under Payday Super, it is paid when your wages are paid. You can check your fund in ATO online services through myGov.

## What can a waiter claim?

Deductions for waiters are small. The ATO's hospitality guide allows:

- Non-slip shoes and aprons you buy yourself, as protective items
- A compulsory uniform or registered uniform you pay for
- Laundry for that clothing, at $1 per load or 50c if mixed with other clothes
- An RSA renewal you need to keep your current job (not the first RSA)
- The work part of your phone

The ATO says you cannot claim black pants and a white shirt, even if the restaurant requires them. Make-up, haircuts and meals during your shift are also not claimable.

## Problems to watch for

- One flat rate for all days
- No payment for split shifts or very short shifts where the award requires it
- Unpaid trial shifts longer than a short skills test
- Charges for uniforms or breakages
- Cash pay with no payslip or super

## What to do next

- Keep a weekly note of cash tips.
- Check one weekend payslip with the Fair Work Pay Calculator.
- Keep receipts for shoes and aprons.
- If you may not be entitled to Medicare, get a Medicare Entitlement Statement before lodging.
- Lodge once your income statement shows "Tax ready".

If you want help adding wages and tips correctly, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'My card tips are already on my payslip. Do I add them again?', a: 'No. If tips were paid through payroll and are in your income statement, they are already included. Only add tips that are not already reported, such as cash.' },
      { q: 'Can my employer pay me less because I get tips?', a: 'No. Tips are extra. Your employer must still pay at least the award rate for every hour.' },
      { q: 'Can I claim the black clothes the restaurant asks me to wear?', a: 'No. The ATO says conventional clothing such as black pants and a white shirt is not claimable, even if your employer requires it.' },
    ],
    sources: [
      { label: 'ATO: Taxable, assessable and exempt income', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/income-you-must-declare/taxable-assessable-and-exempt-income` },
      { label: 'ATO: Hospitality industry employees', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/guides-for-occupations-and-industries/e-k/hospitality-industry-workers-income-and-work-related-deductions` },
      { label: 'ATO: Low income tax offset', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/tax-offsets/low-income-tax-offset` },
      { label: 'Fair Work: Pay slips', href: `${FW}/pay-and-wages/paying-wages/pay-slips` },
    ],
  },
  {
    slug: 'kitchen-hand-student-visa-tax',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Kitchen hand on a student visa: pay, tax and what you can claim',
    description: 'Kitchen hand work needs no qualification, so many students start here. How the award, penalty rates, TFN, super and work deductions apply to kitchen hands.',
    answer: 'Kitchen hands are usually casual employees, so you give your TFN, tax is taken from your pay and your employer pays 12% super. You may be able to claim non-slip shoes, aprons, your own knives and the laundry of protective work clothing.',
    body: `Kitchen hand is one of the easiest jobs to start in Australia. You do not need a qualification, and nearly every restaurant, café, pub and hotel needs one. For many international students, it is the first job. This guide explains how kitchen hands are paid and taxed. For the hours your visa allows, check your visa conditions with Home Affairs.

## What does a kitchen hand do?

Washing dishes is the core of the job, but there is usually more: simple food preparation such as peeling and chopping, putting away deliveries, cleaning benches and floors, and helping the chefs during busy service.

## Which award covers you?

It depends on the venue. Restaurants and cafés are usually covered by the Restaurant Industry Award. Pubs, hotels and clubs are usually covered by the Hospitality Industry (General) Award. Some employers have a registered agreement.

Your classification depends on your duties, not your job title. If you start by washing dishes but later prepare food or work a station, check that your classification and rate move up too. The Fair Work Pay Calculator shows the rate for each level.

## How much do kitchen hands earn?

From 1 July 2026, the national minimum wage is $26.44 an hour, and award minimum wages rose by 4.75%. Most kitchen hands are casual and usually get a 25% casual loading.

Fair Work says penalty rates may apply for weekends, public holidays, overtime, and late night or early morning shifts. Kitchen hands often work evenings and weekends, so these rates can add up.

Kitchen hands are often the last to leave. If cleaning after service takes an extra hour, that hour is work and should be paid. Compare the hours on your payslip with the hours you really worked.

Fair Work says your payslip must arrive within 1 working day of payday. It must show your hourly rate, the hours you worked, any penalty rates and loadings, each deduction, and the super paid and the fund name. Keep a simple note of your start and finish times on your phone so you can check each payslip.

## Tax: TFN and your declaration

As an employee, you give your employer your TFN declaration. If you do not have a TFN yet, apply online. It is free. If you do not give a TFN within 28 days of starting, your employer may take tax at the top rate plus the Medicare levy.

On the declaration:

- A student enrolled in a course of 6 months or more may be an Australian resident for tax purposes.
- If you may be a resident, claim the tax-free threshold from one employer only, usually the one that pays the most.
- Foreign residents do not get the tax-free threshold, so they answer no for every job.

For 2025-26, residents pay no tax on the first $18,200 and 16% from $18,201 to $45,000. Foreign residents pay 30% from the first dollar up to $135,000.

## Super

The ATO says casual employees and temporary residents are generally eligible for super guarantee at 12%. Under Payday Super, from 1 July 2026 employers pay super at the same time as wages. Your payslip should show the super amount and the fund name. If it does not, ask your employer.

## What can a kitchen hand claim?

The ATO's hospitality guide allows these if you paid for them and were not reimbursed:

- Protective clothing such as non-slip shoes and aprons
- Occupation-specific clothing such as checked chef's pants or a white chef's jacket
- Your own knives and tools. Items of $300 or less can usually be claimed in full that year. A knife set over $300 is claimed over time.
- Repairs to work tools, such as knife sharpening
- Laundry of claimable work clothing at $1 per load, or 50c if mixed with other clothes
- The work part of your own phone

You cannot claim ordinary clothes such as black pants or a T-shirt. Meals during your shift are not claimable. If the kitchen gives you aprons or washes them, you cannot claim them.

**Example.** A resident student kitchen hand buys non-slip shoes for $85 and two aprons for $20 each, and washes them separately in about 40 loads during 2025-26. Her claim is $85 + $40 + $40 laundry = $165. If her income is in the 16% band, her tax goes down by about $26.

From 2026-27, residents with wages get a standard deduction of up to $1,000, and claimed work expenses reduce it dollar for dollar. Most kitchen hands spend less than $1,000, so the standard deduction will often be simpler.

## Problems to watch for

- One flat rate with no weekend or public holiday rates
- Unpaid cleaning time after service
- Breaks marked as taken when you worked through them
- Cash pay with no payslip and no super
- Staying at the lowest level after your duties have grown

Fair Work says visa holders have the same rights as other workers and can get free help.

## A short checklist

- Keep every payslip and compare the hours with your own notes.
- Photograph receipts for shoes, aprons and knives.
- Count your laundry loads for work clothing.
- If you may not be entitled to Medicare, apply for a Medicare Entitlement Statement after 1 July and wait for it before you lodge.

If you would like help with your return, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Can I claim the knives I bought for work?', a: 'Yes, if you paid for them and use them for work. A single knife of $300 or less can usually be claimed in full that year; a set over $300 is claimed over time.' },
      { q: 'I am paid cash. Do I still pay tax?', a: 'Yes. Cash wages are income and must be declared. You should also still get a payslip and super.' },
      { q: 'Do I need to keep laundry receipts?', a: 'For 2025-26, you need written evidence for laundry only if your laundry claim is over $150 and your total work claims are over $300. You must still be able to show how you worked out the amount. From 2026-27, the ATO asks for written evidence for all laundry claims.' },
    ],
    sources: [
      { label: 'ATO: Hospitality industry employees', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/guides-for-occupations-and-industries/e-k/hospitality-industry-workers-income-and-work-related-deductions` },
      { label: 'ATO: Clothing, laundry and dry-cleaning expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/clothes-and-items-you-wear-at-work/clothing-laundry-and-dry-cleaning-expenses` },
      { label: 'ATO: Work out if you have to pay super', href: `${ATO}/businesses-and-organisations/super-for-employers/work-out-if-you-have-to-pay-super` },
    ],
  },
  {
    slug: 'construction-labourer-student-visa-tax',
    category: 'Deductions',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Construction labouring on a student visa: tax and deductions',
    description: 'Site work needs a White Card and usually your own boots and gear. How labourers are paid and taxed, why an ABN is a warning sign, and what students can claim.',
    answer: 'Construction labourers are usually employees, so you give your TFN, tax is taken from your pay and you get super. You can often claim protective gear, sun protection and tools you buy yourself, but not your first White Card or ordinary work clothes.',
    body: `Construction labouring can pay well, and some international students do it in their breaks or around classes. It is also one of the jobs where students buy the most work gear. This guide covers pay, tax, the ABN question and deductions. For work-hour limits, check your visa conditions with Home Affairs.

## What do you need before you start?

You need a White Card, which shows you have done the general construction induction. The training is done through approved training providers, and the cost varies.

For tax, the ATO's guide for building and construction workers says the cost of an initial licence, permit or card you need to get a job is not claimable. The White Card you get before your first site job falls into this group. Renewing a licence or card you need to keep doing your current job can be claimed.

## How are labourers paid?

Most site labourers are covered by the Building and Construction General On-site Award, or by a registered agreement. Your classification depends on your skills and duties. The Fair Work Pay Calculator shows the rate for each level.

From 1 July 2026, the national minimum wage is $26.44 an hour, and award minimum wages rose by 4.75%. Award rates in construction are often higher than the minimum wage, and the award has allowances as well. Fair Work says penalty rates may apply for weekends, public holidays and overtime.

## Employee or contractor?

Some labour hire companies or builders ask workers to get an ABN. Be careful. The ATO says having an ABN does not on its own make you a contractor, and a contract that says "contractor" does not override the real relationship.

If someone tells you your hours, gives you the equipment, supervises your work, and you have no other clients, that usually points to employment. The ABR says you are not entitled to an ABN for work you do as an employee. If you are wrongly treated as a contractor, you may miss out on super, penalty rates and other entitlements. Fair Work can help.

If you work through a labour hire company, that company is usually your employer. It pays you, gives payslips and pays super.

## How is a labourer taxed?

As an employee, you give your TFN declaration. A student in a course of 6 months or more may be an Australian resident for tax purposes. If you may be a resident, claim the tax-free threshold from one employer only.

For 2025-26, residents pay no tax on the first $18,200 of taxable income, 16% from $18,201 to $45,000 and 30% from $45,001 to $135,000. Foreign residents pay 30% from the first dollar up to $135,000.

**Allowances are income.** The ATO says allowances shown on your income statement, such as a tool allowance, must go on your return. You can then claim what you actually spent on work items. The ATO gives an example: a worker gets a $500 tool allowance and spends $300 on tools, so she declares $500 and claims $300.

## Super

The ATO says employees, including casuals and temporary residents, are generally eligible for super guarantee at 12%. From 1 July 2026, under Payday Super, it is paid with your wages.

## What can a labourer claim?

The ATO's construction guide allows these if you paid for them and were not reimbursed:

- Steel-capped boots, hi-vis vests, helmets, safety glasses and breathing masks
- The work-use part of sunglasses, sun hats and sunscreen if you work in the sun for long periods
- Tools and equipment. Items of $300 or less, not part of a set over $300, can usually be claimed in full that year. Dearer items are claimed over their effective life.
- Repairs to tools
- Laundry of protective clothing at $1 per load, or 50c if mixed with other clothes
- The work part of your phone
- Licence or card renewals you need to keep doing your job

You cannot claim jeans, drill shirts, shorts, socks or ordinary closed shoes, even if required on site. Prescription glasses, meals during normal hours, and fines are not claimable.

## Can you claim travel to the site?

Usually not. The ATO says trips between home and a regular workplace are private, and so is parking near it. You may be able to claim:

- Travel between sites if you have shifting workplaces
- Travel directly between two separate jobs on the same day
- Home to work travel only if you must carry bulky tools with no secure storage at work, and the ATO's other conditions are met

**Example.** A resident student labourer buys steel-capped boots for $160, a hard hat for $40, safety glasses for $25 and a hi-vis vest for $30 in 2025-26. He claims $255. If his income is in the 16% band, his tax goes down by about $41.

From 2026-27, residents with wages get a standard deduction of up to $1,000. Claimed work expenses reduce it dollar for dollar. Labourers who buy a lot of gear may spend more than $1,000, so keep receipts from your first day.

## Checklist

- Ask whether you are hired as an employee before you start.
- Keep every payslip and check allowances.
- Photograph receipts for boots, protective gear and tools.
- Keep a note of any travel between sites.
- Lodge once your income statement shows "Tax ready".

If you worked on sites and in another job in the same year, you can message Student Visa Tax on WhatsApp and we will help with your return.`,
    faq: [
      { q: 'Can I claim the cost of my White Card?', a: 'Not for your first one. The ATO says the cost of an initial licence, permit or card to get a job is not claimable. Renewals you need to keep your current job can be.' },
      { q: 'I got a tool allowance. Do I declare it?', a: 'Yes, if it is on your income statement. Declare the allowance as income and claim what you actually spent on work tools.' },
      { q: 'The builder wants me on an ABN. Should I agree?', a: 'Think carefully. The ABR says you are not entitled to an ABN for work you do as an employee. If you work like an employee, you may miss out on super and other entitlements. Fair Work can help you check.' },
    ],
    sources: [
      { label: 'ATO: Building and construction employee expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/in-detail/occupation-and-industry-specific-guides/a-d/building-and-construction-employees-income-and-work-related-deductions/deductions-for-work-expenses/building-and-construction-employee-expenses-go` },
      { label: 'ATO: Common myths about being a contractor', href: `${ATO}/individuals-and-families/jobs-and-employment-types/employee-or-independent-contractor-what-s-the-difference/common-myths-about-being-a-contractor` },
      { label: 'ABR: ABN entitlement', href: 'https://www.abr.gov.au/business-super-funds-charities/applying-abn/abn-entitlement' },
      { label: 'Fair Work: Penalty rates', href: `${FW}/pay-and-wages/penalty-rates-allowances-and-other-payments/penalty-rates` },
    ],
  },
  {
    slug: 'food-delivery-rider-student-visa-tax',
    category: 'ABN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Food delivery on a student visa: a tax year step by step',
    description: 'Riding for a delivery app as an international student? A month-by-month guide to the ABN, money to set aside, GST, records, deductions and your tax return.',
    answer: 'Food delivery riders are usually contractors with an ABN, so no tax is taken from your payments and you pay the tax when you lodge your return. You declare the delivery income, claim the work part of your bike, phone and gear, and register for GST only if your turnover reaches $75,000.',
    body: `Food delivery is a flexible way to earn money around classes. But the tax works very differently from a café job. Delivery platforms usually treat riders as contractors, not employees. This guide follows a delivery rider through a tax year, step by step. For limits on how much you can work, check your visa conditions with Home Affairs.

## Step 1: before your first delivery, get an ABN

Delivery platforms usually ask for an Australian Business Number (ABN), because they treat you as running your own small business. Applying for an ABN through the Australian Business Register is free. Never pay a website to apply for you.

The ATO says that if a supplier does not quote an ABN, the payer must generally withhold 47% of the payment. That is one reason platforms ask for your ABN at the start.

You still need your TFN. It is how the ATO links your ABN income to your tax return.

## Step 2: understand that no tax is taken out

With a job, your employer takes tax out of every pay. With ABN income, nothing is taken out. The money that arrives in your bank account is not all yours to spend, because part of it will go in tax when you lodge.

How much depends on your residency for tax purposes:

- A student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. For 2025-26, residents pay no tax on the first $18,200 of taxable income, then 16% up to $45,000. The threshold applies to all your income together, wages and ABN income.
- Foreign residents pay 30% from the first dollar up to $135,000 for 2025-26.

A simple habit helps: move a part of every payout into a separate savings account. The right part depends on your other income and residency, so it is worth checking early in the year.

## Step 3: know when GST applies

For food and parcel delivery, the general rule is that you register for GST once your turnover reaches $75,000 in a year. Most student riders never reach that.

Passenger transport is different. The ATO says anyone who drives passengers for a ride-sourcing app must register for GST before starting, whatever they earn. If you start carrying passengers as well as food, your GST position changes, so check first.

## Step 4: keep records all year

The ATO receives data from many sharing economy platforms, so it may already know what you earned. Your job is to keep the records that prove your expenses. Keep:

- The annual or monthly statements from each platform
- Bank statements showing the payouts
- Receipts for the bike, repairs, gear and phone
- A diary of delivery trips or kilometres for a few typical weeks, to show your work-use percentage

If you ride for more than one app, keep each platform's statement separately. Some statements show the amount before the platform's fee and some after. Adding bank deposits together can give the wrong number.

The ATO says to keep records for 5 years from the date you lodge.

## Step 5: work out your deductions

Because the bike or car earns the income, you can claim the work part of its costs. Common claims include:

- **Bicycle or e-bike.** If it cost $300 or less, the work part can usually be claimed in that year. Dearer bikes are claimed over their effective life. Repairs, tyres, chains and e-bike charging also count.
- **Motorbike or scooter.** Actual costs such as fuel, registration, insurance and servicing, times the work-use percentage. The car methods do not apply.
- **Car.** For 2025-26, the cents per kilometre method is 88 cents per work kilometre, up to 5,000 kilometres. Or use a 12-week logbook with actual costs.
- **Gear.** Delivery bag, helmet, lights, lock and phone mount.
- **Phone.** The work part of your plan.
- **Platform fees** taken from your earnings.

Only the work part can be claimed. If your bike is used 70% for delivery and 30% for getting to class, claim 70%.

## Step 6: lodge your return

After 30 June, you lodge one return with all your income. ABN income goes in the business section, with your expenses. If you also have a TFN job, those wages go on the same return, and the tax taken from your wages counts towards the total bill.

**Example.** A resident student earns $10,000 in café wages and $12,000 from delivery in 2025-26. Her delivery expenses are $2,000. Her taxable income is $20,000. Tax on the part above $18,200 is 16% of $1,800, which is $288, before the low income tax offset. The tax her café took out is then compared with this amount.

If you may not be entitled to Medicare, apply for a Medicare Entitlement Statement from 1 July and wait for it before you lodge.

## Step 7: when you stop riding

When you stop for good, for example when you finish your studies, cancel your ABN. The ABR says to do this within 28 days once the business has stopped. You still need to lodge your final tax return, and cancelling the ABN does not end that duty.

Super guarantee is mainly for employees. The ATO says some contractors who are paid mainly for their labour are also eligible, so ask the platform how it treats riders if you are unsure.

If you want help with a return that has both ABN and TFN income, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Do I need to register for GST as a delivery rider?', a: 'Generally only when your turnover reaches $75,000 a year. Driving passengers for a ride-sourcing app is different: the ATO says you must register for GST before you start.' },
      { q: 'Can I use the free ATO Tax Help program for delivery income?', a: 'No. The ATO says Tax Help is not for contractors or people running a business, so it does not cover ABN delivery work.' },
      { q: 'Does the tax-free threshold apply to my delivery income?', a: 'If you may be a resident for tax purposes, the threshold applies to your total taxable income, including ABN income. Foreign residents do not get the threshold.' },
    ],
    sources: [
      { label: 'ATO: Statement by a supplier not quoting an ABN', href: `${ATO}/forms-and-instructions/statement-by-supplier-not-quoting-an-abn` },
      { label: 'ATO: Ride-sourcing registrations', href: `${ATO}/businesses-and-organisations/income-deductions-and-concessions/sharing-economy-and-tax/ride-sourcing/registrations` },
      { label: 'ATO: What is the sharing economy reporting regime?', href: `${ATO}/businesses-and-organisations/preparing-lodging-and-paying/third-party-reporting/sharing-economy-reporting-regime/what-is-the-serr` },
      { label: 'ATO: D1 Work-related car expenses 2026', href: `${ATO}/forms-and-instructions/individual-tax-return-2026-instructions/deduction-questions-d1-d10-individual-tax-return-2026/d1-work-related-car-expenses-2026` },
    ],
  },
]
