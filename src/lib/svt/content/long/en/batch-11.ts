import type { LongArticle } from '../types'

export const LONG_EN_11: readonly LongArticle[] = [
  {
    slug: 'uber-driver-student-visa-tax',
    category: 'ABN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Driving Uber on a student visa: ABN, GST and tax',
    description: 'Rideshare driving on a student visa means an ABN, GST registration before your first trip, and no tax taken out. How to set money aside, keep records and lodge.',
    answer: 'To drive passengers for Uber or a similar app, you need an ABN and you must register for GST before your first trip, whatever you earn. No tax is taken out of your fares, so you set money aside yourself and report your profit in your tax return.',
    body: `Many international students look at rideshare driving because the hours are flexible and fit around classes. It is a very different kind of work from a café or warehouse job. You are not an employee. You run a small business, and the tax rules for that business are stricter than for most other app work.

Before you start, check your visa conditions with Home Affairs, because driving hours are work like any other job.

## Why is rideshare different from a normal student job?

In a normal job, your employer takes tax out of every pay, pays super for you and reports your income to the ATO. When you drive for a rideshare app, none of that happens. The app pays you for your trips, and you are responsible for the tax.

To do this work you need an Australian Business Number (ABN). The ABR says you are entitled to an ABN if you are carrying on, or starting, an enterprise in Australia. Applying for an ABN through the ABR is free, so you do not need to pay anyone to get one.

You also need a driver licence that lets you drive in Australia, a suitable car, and in most states a driver authorisation from the state or territory transport authority. Check these with the app and your state authority before you sign up.

## Do you really need GST from the first trip?

Yes. The ATO says that if you provide ride-sourcing services, you must register for GST before you start, regardless of how much you earn. There is no minimum amount. This applies even if you only plan to drive a few weekends a year.

Once you are registered, part of every fare is GST that belongs to the ATO. You report it on a business activity statement (BAS) for each reporting period and pay it to the ATO. You can usually claim GST credits for the GST included in your business costs, such as fuel and servicing, which reduces what you pay.

If you skip GST registration, the ATO can still work out what you should have paid for the trips you did. That is how some drivers end up with a debt they did not expect.

## Rideshare or food delivery: why does it matter?

The GST rule from the first trip is only for carrying passengers. Food and parcel delivery is treated like most other businesses: the ATO says GST registration is needed once your turnover reaches $75,000. Many students who deliver food never reach that amount.

Be careful if you do both. Once you are registered for GST because you drive passengers, the GST registration covers your business, not just one app. If you plan to mix rideshare with delivery work, get advice on how GST applies to all of it before you start.

## No tax is taken out, so how much should you keep aside?

Nothing is withheld from your fares. Your profit from driving is added to any wages you earn, and the tax on the total is worked out when you lodge your tax return. You may also need to pay the GST you collected each reporting period.

This is why it helps to open a separate savings account and move part of every payment into it as soon as it arrives. Treat that money as not yours. How much you need depends on your total income and your tax residency. A student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. Residents get the tax-free threshold of $18,200. Foreign residents pay tax from the first dollar.

A simple example, leaving GST to one side:

- Your fares for the year, after the app fees, are $14,000.
- You spend $5,000 on fuel, servicing and other work costs for the car.
- Your profit of $9,000 goes on your tax return, added to any wages.

## What can you claim as a driver?

Because the car is the business, you can claim the business part of your car costs. You must have spent the money yourself, it must relate to earning your income, and you need records, usually receipts.

- Fuel, servicing, repairs and tyres
- Registration and insurance, for the business part
- Car rental, if you rent a car to drive
- Tolls and parking while you are driving for work
- The work part of your phone and data plan
- App service fees, cleaning and driver authorisation costs

For car costs you choose a method. The cents per kilometre method lets you claim up to 5,000 business kilometres per car each year, without receipts for each cost, but you must be able to show how you worked out the kilometres. The logbook method has no kilometre limit but needs a proper logbook. Full-time drivers often go past 5,000 kilometres quickly, so it is worth thinking about this early. Keep your records for 5 years from when you lodge.

## Does the ATO already know what you earned?

Yes. Under the Sharing Economy Reporting Regime, platforms that provide ride-sourcing services report the income their drivers earn to the ATO. This reporting started on 1 July 2023 and platforms report twice a year.

This means your income is not a secret, and the ATO will compare it with your tax return. What the ATO cannot see is your costs. Only your own records prove those, so keep every receipt and a clear note of your business kilometres.

## What happens when you stop driving or leave Australia?

When you stop driving, close the business properly. The ATO says to cancel your ABN when the business stops trading. Most linked registrations, such as GST, are cancelled with it. You still need to lodge your final activity statement and your tax return. Cancelling the ABN does not end your duty to lodge.

If you are finishing your course and leaving Australia, do this before you go. An open GST registration keeps creating lodgment obligations even when you are overseas.

## Checklist before your first trip

- Check your visa conditions with Home Affairs.
- Get your ABN through the ABR, which is free.
- Register for GST before your first trip.
- Check the licence, car and driver authorisation rules for your state.
- Open a separate account and set money aside from every payment.
- Start a logbook or a kilometre diary from day one, and keep every receipt.
- Lodge your BAS on time and include your driving profit in your tax return.

If you would like help with a year that includes rideshare income, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Do I need GST if I only drive a little?', a: 'Yes. The ATO says ride-sourcing drivers must register for GST before they start, whatever they earn. There is no minimum amount for passenger driving.' },
      { q: 'Does Uber take tax out of my fares?', a: 'No. Nothing is withheld. You report your profit in your tax return and pay any tax owed then, so it is wise to set money aside as you go.' },
      { q: 'Can I claim my car on a student visa?', a: 'You can claim the business part of your car costs if you spent the money, it relates to your driving income, and you have records. Personal trips are not claimable.' },
      { q: 'What should I do before I leave Australia?', a: 'Lodge your final activity statement, cancel your ABN and GST registration, and plan your last tax return. Cancelling does not remove the duty to lodge.' },
    ],
    sources: [
      { label: 'ATO: Ride-sourcing registrations', href: 'https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/sharing-economy-and-tax/ride-sourcing/registrations' },
      { label: 'ATO: What is the Sharing Economy Reporting Regime', href: 'https://www.ato.gov.au/businesses-and-organisations/preparing-lodging-and-paying/third-party-reporting/sharing-economy-reporting-regime/what-is-the-serr' },
      { label: 'ATO: Cents per kilometre method', href: 'https://ato.gov.au/centsperkm' },
      { label: 'ABR: ABN entitlement', href: 'https://www.abr.gov.au/business-super-funds-charities/applying-abn/abn-entitlement' },
    ],
  },
  {
    slug: 'ski-resort-jobs-student-visa-tax',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Ski resort jobs for international students: pay and tax',
    description: 'A winter job at an Australian ski resort can fit a student break. How pay is set, what to check about staff housing, tax on a short job and what you can claim.',
    answer: 'Ski resort staff are usually employees, so the award or agreement for the work you do sets your minimum pay, and tax is taken out of each pay. You give your TFN, claim the tax-free threshold from one employer only if you may be a resident, and report the job in your tax return.',
    body: `Australia's ski resorts are busiest in the winter months. For some international students, this lines up with the mid-year break between semesters, and a few weeks on the mountain can sound like a good way to earn money and see a different part of the country.

A resort job is a normal job in tax terms. You are an employee, and the same rules apply as in the city. What makes it different is that the job is short, the hours can be long, and housing is often part of the deal. Before you apply, check your visa conditions with Home Affairs so you know what work you can do and when.

## What jobs do resorts offer students?

Resorts hire for many roles, not only on the slopes. Common jobs include:

- Lift operations and ticketing
- Cafés, bars, restaurants and kitchens
- Housekeeping and hotel reception
- Ski and snowboard hire shops and retail
- Snowmaking and grooming, often on night shifts

Some roles, such as instructing and ski patrol, need qualifications you must have before you start. Bar work usually needs a responsible service of alcohol certificate for the state the resort is in.

## How is your pay set?

Your minimum pay depends on the award or registered agreement that covers your work, not on the fact that you work on a mountain. A resort can have staff under different awards at the same time. A barista and a hire shop worker may have different rates.

No adult employee can be paid below the national minimum wage. From the first full pay period starting on or after 1 July 2026, that is $26.44 an hour. Many awards set higher rates, and casual employees are paid extra on top.

Resorts are busiest at weekends and in school holidays. Fair Work explains that employees may be entitled to penalty rates for weekends, public holidays, overtime and late night or early morning shifts. The rate depends on your award or agreement. The Fair Work Pay and Conditions Tool can show you the right award and rates for your role.

## What should you check about staff housing?

Housing near a resort is limited, so many resorts offer staff accommodation. Some offer it free or cheap, and some take rent out of your pay. Ask for the details in writing before you accept the job.

Fair Work says an employer can only deduct money from your pay in certain cases, for example when you agree in writing and the deduction is mainly for your benefit. A written agreement should say the amount or how it is worked out, the reason, and when it is taken. Any deduction should also appear on your pay slip.

Work out what you will really earn. Take the expected weekly pay, subtract the weekly rent, and compare it with a job closer to where you live.

## How is tax taken from a short winter job?

Give the resort your tax file number when you start. If you do not provide it within 28 days, the employer must take tax at the top rate plus the Medicare levy.

On your TFN declaration, two answers matter most. A student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. If you may be a resident, you can claim the tax-free threshold, but the ATO says you generally claim it from one payer only, usually the one who pays you the most.

This is important for students who already have a part-time job in the city. If you claim the threshold from both your city job and the resort, too little tax is taken out overall, and you may have a tax bill when you lodge. If the resort is your second job, answer no to the threshold question there.

## What can you claim, and what can you not?

Ski work brings a lot of gear, but most of it is personal. The ATO rules are simple: you spent the money yourself, it relates directly to earning your income, and you have a record.

- **Usually claimable:** protective clothing your job needs, a compulsory uniform you paid for, laundry of work clothing, and tools or equipment you need for the job.
- **Usually not claimable:** your own ski jacket, thermals or gloves that you also wear for fun, lift passes, and travel to the mountain at the start of the season.
- **Instructors:** equipment used for teaching can be partly claimable, but you must split it fairly between work and personal use.

Tools and equipment that cost $300 or less can be claimed straight away, for the work part. More expensive items are claimed over several years.

## Do not forget super and pay slips

Casual and part-time employees, including temporary residents, are generally eligible for super. The rate is 12% of your ordinary earnings. From 1 July 2026, employers pay super at the same time as wages.

Your employer must give you a pay slip within one working day of payday. Check your hours, your rate, any rent taken out, and the super paid. A short job ends quickly, so keep every pay slip before you leave the mountain.

## Checklist for a ski season job

- Check your visa conditions with Home Affairs before you accept.
- Get the pay rate, hours and housing costs in writing.
- Give your TFN and fill in the TFN declaration carefully.
- Claim the tax-free threshold from one employer only.
- Keep receipts for any work items you buy.
- Save every pay slip and check that super is paid.
- After 30 June, wait until your income statement is "Tax ready", then lodge.`,
    faq: [
      { q: 'Is a resort job taxed differently from a city job?', a: 'No. You are an employee, so tax is taken out of each pay in the same way. The job goes in your tax return with your other income for the year.' },
      { q: 'Can I claim my ski gear?', a: 'Usually not, because you also use it for fun. Instructors may be able to claim the work part of equipment used to teach, if they keep records and split it fairly.' },
      { q: 'I already have a job in the city. Should I claim the tax-free threshold at the resort?', a: 'Generally no. The ATO says to claim it from one payer only, usually the one who pays you the most. Claiming it twice can lead to a tax bill.' },
    ],
    sources: [
      { label: 'Fair Work: Penalty rates', href: 'https://www.fairwork.gov.au/pay-and-wages/penalty-rates-allowances-and-other-payments/penalty-rates' },
      { label: 'Fair Work: Deducting pay', href: 'https://www.fairwork.gov.au/pay-and-wages/deductions-and-related-issues/deducting-pay' },
      { label: 'ATO: Income from more than one job', href: 'https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job' },
      { label: 'ATO: Clothing, laundry and dry-cleaning expenses', href: 'https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/clothes-and-items-you-wear-at-work/clothing-laundry-and-dry-cleaning-expenses' },
    ],
  },
  {
    slug: 'supermarket-jobs-coles-woolworths-students',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Coles and Woolworths jobs for international students: pay and tax',
    description: 'Supermarket work is a common student job. How an enterprise agreement or award sets your pay, why night and weekend shifts pay more, and how tax works.',
    answer: 'At Coles, Woolworths and other supermarkets, your minimum pay is set by an enterprise agreement or the General Retail Industry Award, and your level depends on the duties you do. Tax is taken from each pay based on your TFN declaration, and the job goes in your tax return.',
    body: `Supermarkets are one of the most common employers of international students. They are open long hours, they hire in every city, and shifts in the evening, at night and at the weekend can fit around classes. Payroll at large chains is usually organised, but it still helps to understand how your pay is set and how tax is taken out.

Before you take on extra shifts, check your visa conditions with Home Affairs.

## What jobs do supermarkets hire students for?

There is more than the checkout. Common roles include:

- Checkout and customer service
- Filling shelves during the day or overnight
- Online order picking
- Fresh food areas such as the deli, bakery or meat counter
- Receiving deliveries and working on the loading dock
- Liquor stores, which usually need a responsible service of alcohol certificate

Different roles can pay different rates, and night work is often paid more. When you apply, tell the store which shifts you can work. Evening and weekend availability is often what employers look for.

## Award or enterprise agreement: which one sets your pay?

Retail work is covered by the General Retail Industry Award. Many large supermarket chains, however, have an enterprise agreement. When an enterprise agreement applies to you, it replaces the award, and your rates and penalty rates come from the agreement.

Before an enterprise agreement can start, the Fair Work Commission must be satisfied that each employee covered would be better off overall under the agreement than under the relevant award. This is called the better off overall test. An agreement can set some things differently from the award, as long as employees are better off overall.

This means you should check your pay against the right document. If your store uses an enterprise agreement, comparing your pay slip with the award will not give you the full picture. Ask your manager which agreement covers you, or use the Fair Work Pay and Conditions Tool.

## How does your level affect your pay?

Awards and agreements group jobs into levels, often called classifications. Your level should match the work you actually do, not just your job title or how long you have been there.

If you start training new staff, open or close the store, or look after a section, your duties may have changed. Check whether your level has changed too. Fair Work can help if you are unsure.

## Why do nights and weekends pay more?

Fair Work explains that penalty rates are higher pay rates for some hours and days. Employees may be entitled to them for weekends, public holidays, overtime, and late night or early morning shifts. The exact rate depends on your award or agreement.

Overnight shelf filling is popular with students for this reason. It is usually one continuous shift, and it often pays more per hour than a daytime shift. Check your pay slip to make sure the right rate was used for each shift, especially public holidays and shifts that start or finish late.

## How is tax taken from your supermarket pay?

When you start, you give your tax file number and fill in a TFN declaration. Your answers decide how much tax is taken out.

A student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. Residents can claim the tax-free threshold of $18,200. For 2025-26, residents pay no tax on income up to $18,200, then 16% on income from $18,201 to $45,000. Foreign residents do not get the threshold and pay 30% from the first dollar up to $135,000.

Many students work at a supermarket and somewhere else. The ATO says you generally claim the tax-free threshold from one payer only, usually the one who pays you the most. Claiming it from both jobs can leave you with a tax bill at the end of the year.

## What can supermarket workers claim?

Supermarkets usually supply most of what you need, so there is often not much to claim. The ATO says you can only claim if you spent the money yourself, it relates directly to your job, and you have a record.

- A compulsory uniform with the store logo that you paid for yourself
- Protective items, such as safety boots for dock work, if your employer did not supply them
- Laundry of your work uniform
- A responsible service of alcohol course, if you paid for it for a liquor role you already have

Plain black pants or a plain white shirt are not claimable, even if your manager asks you to wear them. The ATO treats these as conventional clothing.

## Check your pay slip and your super

Your employer must give you a pay slip within one working day of payday. It must show your hours, your rate, any penalty rates and loadings, deductions and super. Casual and part-time employees, including temporary residents, are generally eligible for super at 12% of ordinary earnings.

If something looks wrong, raise it with your manager or payroll first and bring the pay slip. If it is not fixed, contact the Fair Work Ombudsman. Fair Work says visa holders have the same workplace rights as other employees.

## Checklist for a supermarket job

- Check your visa conditions with Home Affairs.
- Find out which enterprise agreement or award covers you.
- Fill in your TFN declaration and claim the threshold from one job only.
- Check each pay slip for the right rate and penalty rates.
- Keep receipts for any uniform or safety items you buy.
- After 30 June, wait for your income statement to be "Tax ready" before you lodge.`,
    faq: [
      { q: 'Does the General Retail Industry Award apply at Coles and Woolworths?', a: 'Not always. Where an enterprise agreement covers you, it replaces the award. Ask which agreement applies to your store, or use the Fair Work Pay and Conditions Tool.' },
      { q: 'Can I claim the black pants I wear at work?', a: 'No. The ATO treats plain clothing as conventional clothing, even if your employer requires it. A compulsory uniform with the store logo that you paid for may be claimable.' },
      { q: 'I work at a supermarket and a café. Which job gets the tax-free threshold?', a: 'Generally the one that pays you the most, and only one. Answer no to the threshold question for your other job.' },
    ],
    sources: [
      { label: 'Fair Work Commission: Better off overall test', href: 'https://fwc.gov.au/better-off-overall-test' },
      { label: 'Fair Work: Penalty rates', href: 'https://www.fairwork.gov.au/pay-and-wages/penalty-rates-allowances-and-other-payments/penalty-rates' },
      { label: 'Fair Work: Pay slips', href: 'https://www.fairwork.gov.au/pay-and-wages/paying-wages/pay-slips' },
      { label: 'ATO: Income from more than one job', href: 'https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job' },
    ],
  },
  {
    slug: 'station-hand-jobs-international-students',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Station hand jobs for international students: pay and tax',
    description: 'Working on a cattle station in your summer break? How the Pastoral Award sets pay, what to check about board and meals, records in remote areas, and tax.',
    answer: 'Station hands are usually employees covered by the Pastoral Award, so tax is taken from each pay and super is paid on top. Board and meals can only be taken from your pay in limited cases, so get the deal in writing before you travel.',
    body: `Some international students spend part of their long summer break working on a cattle or sheep station. The work is physical and often very remote, and the job usually comes with a room and meals. In tax terms it is an ordinary job: you are an employee, tax is taken out of each pay, and the income goes in your tax return.

Before you accept, check your visa conditions with Home Affairs so you know what work you can do during your break.

## What does a station hand do?

The work changes with the season and the type of property. Common tasks include:

- Mustering cattle or sheep, on horseback, motorbike or in a vehicle
- Working cattle in the yards, such as drafting and vaccinating
- Fixing fences, water troughs and bores
- Driving tractors and other machinery
- General work around the homestead

Some stations also hire a station cook. Most stations want people who can start early, work long days and cope with heat and isolation.

## Which award covers station work?

Fair Work says the Pastoral Award covers employers in the pastoral industry, including work in managing, breeding, rearing or grazing livestock. It lists station hands and station cooks as examples of employees it covers.

The award sets minimum pay rates by classification, and your classification should match your skills and duties. A new worker doing basic tasks under supervision is usually on a lower level than someone who runs machinery or leads a small team. No adult employee can be paid below the national minimum wage, which is $26.44 an hour from the first full pay period starting on or after 1 July 2026. Some stations use an enterprise agreement instead of the award.

The Fair Work Pay and Conditions Tool can help you find the right rate before you agree to anything.

## What about board and meals?

Many stations provide a room and meals. Some include them as part of the job, and some take money from your pay for them. Ask exactly which it is before you go.

Fair Work says an employer can only deduct money from your pay in certain cases. One is when you agree in writing and the deduction is mainly for your benefit. A written authorisation should state the amount or how it is worked out, the reason, and when it will be taken. You should not be pressured into agreeing. Any deduction should appear on your pay slip.

It is very hard to change the deal once you are hours from the nearest town. Get it in writing first.

## How is tax taken out of station pay?

Give the station your tax file number when you start. If you have not given it within 28 days, the employer must take tax at the top rate plus the Medicare levy.

A student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. If you may be a resident, you can claim the tax-free threshold on your TFN declaration. But if you also have a part-time job in the city that you keep during the year, the ATO says you generally claim the threshold from one payer only, usually the one who pays you the most.

For 2025-26, residents pay no tax on income up to $18,200 and 16% on income from $18,201 to $45,000. Foreign residents pay 30% from the first dollar up to $135,000.

## What can a station hand claim?

Station work often needs real gear, so there can be more to claim than in a city job. The ATO says you can claim if you spent the money yourself, it relates directly to earning your income, and you have a record.

- Protective clothing and boots that your work needs
- Gloves and other protective items
- Tools and equipment you bought for the job, such as fencing tools
- Laundry of protective work clothing

If a tool or item costs $300 or less, you can claim the work part straight away. More expensive items are claimed over several years. If you also use an item privately, you can only claim the work part.

## Records are harder to keep when you are remote

Mobile coverage and internet can be poor on a station, so plan your records from the first day. Your employer must give you a pay slip within one working day of payday, on paper or electronically.

- Take a photo of every pay slip when you get it.
- Write down your start and finish times each day.
- Keep receipts for anything you buy for work, in one place.
- Check that super is paid. Casual employees, including temporary residents, are generally eligible for super at 12% of ordinary earnings.

If something is wrong with your pay, Fair Work can help. Fair Work says visa holders have the same workplace rights as other employees, and you can call 13 13 94.

## Safety on the station

Station work has real risks: animals, machinery, heat and long distances to medical help. Ask about safety training before you start, and report any injury at the time it happens. Employees are generally covered by workers' compensation, which is run by each state and territory.

## Checklist before you travel

- Check your visa conditions with Home Affairs.
- Get the classification, pay rate, hours and board deal in writing.
- Give your TFN and claim the tax-free threshold from one employer only.
- Photograph every pay slip and keep a daily record of hours.
- Keep receipts for boots, protective clothing and tools.
- After 30 June, include the station income in your tax return with your other jobs.

If you have a year with a station job and other work, you can message Student Visa Tax on WhatsApp for help with your return.`,
    faq: [
      { q: 'Is a station hand an employee or a contractor?', a: 'Station hands are usually employees covered by the Pastoral Award. Having an ABN does not on its own make you a contractor, and an employer should not ask you to get one as a condition of the job.' },
      { q: 'Can the station take money for my room and food?', a: 'Only in limited cases, for example when you agree in writing and the deduction is mainly for your benefit. Get the details in writing and check that the deduction appears on your pay slip.' },
      { q: 'Can I claim my work boots?', a: 'Protective boots you need for the work are usually claimable if you paid for them and kept a receipt. Ordinary shoes you also wear every day are not.' },
    ],
    sources: [
      { label: 'Fair Work: Pastoral Award summary', href: 'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000035-summary' },
      { label: 'Fair Work: Deducting pay', href: 'https://www.fairwork.gov.au/pay-and-wages/deductions-and-related-issues/deducting-pay' },
      { label: 'ATO: Tools and equipment to perform your work', href: 'https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/tools-computers-and-items-you-use-for-work/tools-and-equipment-to-perform-your-work' },
    ],
  },
  {
    slug: 'bringing-money-into-australia-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Bringing money into Australia as an international student',
    description: 'Money from home is not taxed when it arrives, but carrying AUD 10,000 or more in cash must be declared. Bank transfers, savings interest and scams explained.',
    answer: 'Bringing your own savings or money from your family into Australia is not taxed. If you carry AUD 10,000 or more in physical cash across the border, you must declare it, but money sent through a bank does not need a declaration from you.',
    body: `Most international students bring money into Australia at some point. It might be savings for the first few months, money from parents for rent, or funds to show you can support yourself. Students often worry that this money will be taxed or that a large transfer will cause a problem with the ATO.

The short answer is that moving your own money into Australia is not income, so it is not taxed. There is one reporting rule for physical cash that you must follow, and there are a few tax points about what happens to the money after it arrives.

## Is money from home taxed in Australia?

No. Savings you earned before you came, and money your family gives you, are not income you earned in Australia. Sending them here does not create a tax bill.

The ATO says a student who is a temporary resident and an Australian resident for tax purposes is generally not taxed on most foreign income. Australian income, such as wages from a part-time job, must be declared in your tax return. Keep these two things separate in your mind: money you move is not the same as money you earn.

The same is true when your parents pay your tuition fees or rent directly. That support is not income you earned, so it does not go in your tax return. Only money you earn in Australia, such as wages, tips, ABN income and bank interest, needs to be reported. If you are not sure whether something counts as income, check before you lodge rather than leaving it out.

## What is the AUD 10,000 cash rule?

AUSTRAC, Australia's financial intelligence agency, says you must declare it if you carry AUD 10,000 or more in physical currency into or out of Australia. The amount includes Australian and foreign currency added together.

You complete the declaration before you pass through customs. AUSTRAC says there is an online declaration form, and if you cannot use it you can ask an Australian Border Force or police officer for a paper version.

This rule is about tracking cash, not about tax. Declaring the cash does not mean you will pay tax on it.

## What counts, and what does not?

The rule is about physical money that crosses the border with you or is sent across it.

- **Counts:** notes and coins, in any currency, in your pocket, your luggage, the post or a courier parcel.
- **Also reported:** bearer negotiable instruments, such as money orders and postal orders. AUSTRAC says you must report these even if they do not show an amount or a payee.
- **Does not need a declaration from you:** money you send or receive through a bank, as long as you are not physically carrying it across the border.

For most students, a bank transfer or a licensed money transfer service is the simplest and safest choice. It leaves a clear record and you do not need to carry large amounts of cash.

## Can you split cash to stay under AUD 10,000?

No. AUSTRAC says that splitting cash or other forms of money to avoid reporting obligations is called structuring, and it is illegal. If you are carrying a large amount, declare it. Declaring is free.

AUSTRAC also warns that you may face fines or imprisonment if you fail to report. The risk of not declaring is far greater than the small effort of filling in the form.

## What about interest on your Australian bank account?

This is where your money can touch your tax return. Once your money sits in an Australian savings account, any interest the bank pays you is income. Interest should be included in your tax return, even if the amount is small.

Give your bank your tax file number once you have one. If the bank does not have your TFN, it may need to take tax out of your interest. Any tax taken out this way is shown on your bank records and is taken into account when you lodge.

## What records should you keep?

Keep simple records that show where your money came from. You will rarely need them, but they make any question easy to answer.

- Bank statements from home showing your savings before the transfer
- Transfer receipts from your bank or money transfer service
- Your declaration receipt, if you declared cash at the border
- A short note if a family member sent money as a gift or for your fees

## Watch out for money scams

New students are a common target for scams. Be careful of anyone who:

- Offers you a very good exchange rate if you send cash first
- Asks for your bank login, your TFN or your passport details to "help" with a transfer
- Asks you to receive money into your account and send it on to someone else
- Offers a job or a room only after you pay a fee upfront

Use your bank or a licensed provider, and never share your myGov or bank login. If something feels wrong, stop and check before you send anything.

## What to do next

- Use a bank transfer or a licensed money transfer service where you can.
- If you carry AUD 10,000 or more in cash, complete the declaration before customs.
- Never split cash to avoid the rule.
- Give your Australian bank your TFN and include interest in your tax return.
- Declare all the money you earn in Australia, including cash wages and tips.`,
    faq: [
      { q: 'Will a large transfer from my parents be taxed?', a: 'No. Money your family sends you is not income you earned in Australia, so it is not taxed when it arrives. Keep the transfer records in case you are ever asked.' },
      { q: 'Do I need to declare a bank transfer of more than AUD 10,000?', a: 'AUSTRAC says money sent or received through a bank does not need to be declared by you, as long as you are not physically carrying it across the border.' },
      { q: 'Does the rule apply when I leave Australia too?', a: 'Yes. The AUD 10,000 rule applies to physical currency carried into or out of Australia.' },
    ],
    sources: [
      { label: 'AUSTRAC: Moving money across international borders', href: 'https://www.austrac.gov.au/individuals/moving-money-across-international-borders' },
      { label: 'ATO: Studying in Australia', href: 'https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia' },
      { label: 'ATO: Assessable income', href: 'https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/income-you-must-declare/taxable-assessable-and-exempt-income' },
    ],
  },
  {
    slug: 'ato-tax-debt-interest-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Owing the ATO on a student visa: interest and what to do',
    description: 'A tax bill grows each day it stays unpaid. Why students end up owing the ATO, how the general interest charge works, and the steps that keep a debt small.',
    answer: 'If a tax debt is not paid by its due date, the ATO adds a general interest charge that is worked out daily on a compounding basis. The best steps are to lodge every return, contact the ATO before the due date, and set up a payment plan if you cannot pay in full.',
    body: `Most students expect a refund at tax time, so a bill from the ATO can come as a shock. A tax debt is not a crime and it is usually not a disaster, but it does grow if you ignore it. Understanding why you owe money, and acting early, keeps the amount as small as possible.

## How do students end up owing the ATO?

Wages from an employer arrive with tax already taken out, so a debt usually comes from too little tax being withheld during the year. The common causes for students are:

- **Claiming the tax-free threshold from two jobs.** The ATO says you generally claim it from one payer only. If you claim it from two, each employer withholds as if it were your only job, and too little tax is taken overall.
- **ABN income.** Delivery or other contract work has no tax taken out. The profit is added to your income and taxed when you lodge.
- **The wrong residency answer.** A student enrolled in a course of 6 months or more may be an Australian resident for tax purposes, but not every student is. If you claimed the threshold as a resident and the ATO later decides you are a foreign resident, you may owe more.
- **An amendment.** If a return is corrected after it was lodged and the tax goes up, the difference becomes a debt.
- **A Medicare levy exemption without a valid statement.** If the exemption is removed, the levy is added back.

## What is the general interest charge?

The ATO says that if an amount you owe stays unpaid after the date it should have been paid, it automatically adds a general interest charge (GIC). The GIC is worked out daily on a compounding basis on the overdue amount. This means interest is charged on the interest too.

The ATO reviews the GIC rate every quarter and publishes it on its website. The rate is set well above normal savings rates, so a debt left alone grows faster than most people expect. GIC incurred on or after 1 July 2025 cannot be claimed as a tax deduction.

## What else can the ATO do if a debt stays unpaid?

The ATO says it is required by law to use any refunds or credits you become entitled to in the future to pay off the debt. So if you owe money from one year and are due a refund the next, the refund goes to the debt first.

The ATO may contact you by SMS, myGov message, letter or phone after the due date. If a debt stays overdue, the ATO says it may be referred to an external collection agency, and the ATO may take firmer or legal action. Leaving Australia does not remove the debt or stop the interest.

## Is a late return a separate problem?

Yes. A late return can attract a failure to lodge on time penalty, which is separate from the interest on unpaid tax. The ATO says it is one penalty unit for each 28 days or part of 28 days the return is late, up to 5 units for individuals.

The ATO says it generally does not apply this penalty in isolated cases, and it will warn you by phone or in writing first. If you get a penalty, you can ask for it to be remitted after you lodge the overdue returns. If a return is late and the tax is also unpaid, both can apply, so it is best to deal with both quickly.

## Can you pay in instalments?

Yes. The ATO says if you owe $200,000 or less you may be able to set up a payment plan online through myGov linked to the ATO, under Tax, then Payments, then Payment plans, or by using the self-help phone line. A plan lets you pay in amounts you can manage.

A payment plan does not stop the interest. GIC keeps running on the balance that is still owed. The ATO will guide you to pay in the shortest time you can, because that saves you interest.

## Can the interest be reduced?

The ATO says it may remit, which means reduce or cancel, the GIC if there are extenuating circumstances. You need to ask for this and explain why, with evidence. A general complaint about the size of the bill is not enough.

Asking early helps. Contacting the ATO before the due date puts you in a much better position than ignoring letters for months.

## A simple order to follow

If you think you owe money, or you have received a bill, follow these steps in order:

- **Lodge everything first.** An unlodged year may contain a refund that reduces the debt, and the true amount is only clear when all returns are in.
- **Check the bill.** Make sure the income, residency answer and Medicare levy are right. If something is wrong, it may be possible to amend the return.
- **Contact the ATO early.** The ATO asks people to get in touch before the due date so it can help while the debt is still manageable.
- **Set up a payment plan** if you cannot pay in full, and pay as much as you can as soon as you can.
- **Fix the cause.** Update your TFN declarations so the right amount of tax is taken from now on, and set money aside from any ABN income.

## Before you leave Australia

If you are finishing your course and going home, sort out any debt before you go. It is easier to talk to the ATO, check your myGov account and arrange payments while you are still in Australia with an Australian bank account. A debt does not disappear when you leave, and interest keeps adding up while you are overseas.`,
    faq: [
      { q: 'Does the interest stop if I leave Australia?', a: 'No. The general interest charge keeps running on the unpaid amount, and the ATO can use any future refund or credit to pay the debt.' },
      { q: 'Does a payment plan stop the interest?', a: 'No. A plan lets you pay in instalments, but GIC keeps running on the balance. Paying it off faster saves interest.' },
      { q: 'Can I claim the interest as a deduction?', a: 'Not for GIC incurred on or after 1 July 2025. The ATO says that interest cannot be claimed as a deduction.' },
      { q: 'I think my bill is wrong. What should I do?', a: 'Check the return for errors such as the residency answer or a job claimed twice. If something is wrong, you may be able to request an amendment, and you can contact the ATO about the bill.' },
    ],
    sources: [
      { label: 'ATO: General interest charge', href: 'https://www.ato.gov.au/general/interest-and-penalties/interest-we-charge/general-interest-charge' },
      { label: 'ATO: If you do not pay', href: 'https://www.ato.gov.au/individuals-and-families/paying-the-ato/if-you-don-t-pay' },
      { label: 'ATO: Failure to lodge on time penalty', href: 'https://www.ato.gov.au/individuals-and-families/paying-the-ato/interest-and-penalties/penalties/failure-to-lodge-on-time-penalty' },
      { label: 'ATO: How to set up a payment plan', href: 'https://www.ato.gov.au/individuals-and-families/paying-the-ato/help-with-paying/payment-plans/setting-up-a-payment-plan' },
    ],
  },
  {
    slug: 'tax-back-australia-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'How to get tax back in Australia as an international student',
    description: 'Tax back is any tax withheld above what you owe, paid after you lodge. A step by step guide for students: when to lodge, what to gather, Medicare and timing.',
    answer: 'You get tax back, if any, by lodging an Australian tax return after 30 June. The ATO compares the tax your employers took out with the tax you actually owe, and refunds any extra to your Australian bank account.',
    body: `"Tax back" is what many students call their tax refund. It is not a special payment for students, and not everyone gets one. It is simply any tax that was taken out of your pay during the year above the amount you really owed. The only way to get it is to lodge a tax return.

This guide walks you through the steps, from the end of the financial year to the money arriving in your account.

## Why might you have tax to claim back?

Your employer takes tax out of each pay based on an estimate. It does not know your full year: how many jobs you had, when you started, whether you stopped work for exams, or what work costs you paid. Your actual tax is only worked out once, when you lodge your return.

If more was taken out than you owe, the difference comes back to you as a refund. If less was taken out, you may have to pay the difference. Common reasons a student may have had too much tax withheld include:

- Working for only part of the year, for example starting in February
- Tax taken at the top rate before your TFN reached your employer
- Work costs you paid yourself that you can now claim
- Being able to claim the Medicare levy exemption

## Step 1: wait for the right time to lodge

The Australian financial year runs from 1 July to 30 June. You lodge after it ends. The ATO says most employers finalise their reporting by 14 July. Wait until your income statement in myGov shows "Tax ready" before you lodge, so the figures are final.

If you lodge yourself, the usual deadline is 31 October. If you use a registered tax agent and contact them before 31 October, you may be able to lodge later.

While you wait, gather what you need:

- Your income statements from every employer, in myGov
- Bank interest, if you have an Australian savings account
- Records of ABN income and costs, if you did any contract or delivery work
- Receipts for work costs you paid yourself
- Your Medicare Entitlement Statement, if you plan to claim the exemption
- Your Australian bank account details for the refund

## Step 2: answer the residency question carefully

This is the answer that changes your result most. A student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. It depends on your circumstances, so do not guess.

If you may be a resident, the tax-free threshold of $18,200 applies, or part of it if you were a resident for only part of the year. For 2025-26, residents pay no tax up to $18,200 and 16% from $18,201 to $45,000. Residents with lower incomes may also get the low income tax offset. Foreign residents pay 30% from the first dollar, with no threshold.

## Step 3: sort out Medicare before you lodge

Many students are not entitled to Medicare because they have Overseas Student Health Cover (OSHC). If you are not entitled, you may be able to claim an exemption from the Medicare levy. To claim it, you need a Medicare Entitlement Statement from Services Australia.

The ATO says applications open on 1 July and it can take up to 8 weeks to get the statement, so apply early and wait for it before you lodge. Having a statement does not automatically mean you are exempt. Students from countries with a reciprocal health care agreement may be entitled to Medicare, and then cannot get a statement.

## Step 4: claim only the work costs you can support

You can claim a work cost if you spent the money yourself and were not paid back, it relates directly to earning your income, and you have a record. Study costs are usually not claimable. The ATO says self-education is only claimable when it has a sufficient connection to your current job, not when it helps you get a new job.

## Step 5: lodge and track any refund

You can lodge online with myTax through myGov linked to the ATO, through a registered tax agent, or on paper. The ATO says most online returns are processed within 12 business days. Some need manual checks and can take up to 30 calendar days, and paper returns can take up to 50 business days.

Any refund is paid into an Australian bank account, so keep yours open until the money arrives.

## Leaving Australia, past years and your super

If you worked, you will probably need to lodge after 30 June, and you can do this from overseas. The ATO says lodging before 30 June when leaving permanently is paper only and slower. Before you leave, ask each employer for any payment summary you need. The ATO says an employer must give you one within 14 days if you ask when you leave.

You can also lodge returns for past years you missed. There may be money waiting, but a late return can attract a penalty, so it is best to lodge as soon as you can.

Your super is separate from your tax refund. Your employers pay 12% of your ordinary earnings into a super fund. After your visa has ended and you have left Australia, you may be able to claim it as a Departing Australia Superannuation Payment (DASP). If you never held a 417 or 462 visa, the taxed element is taxed at 35%.

## Your tax back checklist

- Wait for your income statements to be "Tax ready".
- Gather income, receipts and bank details.
- Work out your residency position carefully.
- Apply for a Medicare Entitlement Statement early, if you may need one.
- Lodge by 31 October, or contact a registered tax agent before then.
- Keep your Australian bank account open until any refund arrives.`,
    faq: [
      { q: 'Does every international student get tax back?', a: 'No. You only get a refund if more tax was taken out than you owe. Some students get nothing back, and some owe money.' },
      { q: 'Can I get tax back after I go home?', a: 'Yes. You can lodge from overseas, online with myTax, through a registered tax agent, or on paper. You need an Australian bank account for the refund.' },
      { q: 'Is my super part of my tax back?', a: 'No. Super is a separate amount held in your super fund. You may be able to claim it as a DASP after your visa ends and you leave Australia.' },
    ],
    sources: [
      { label: 'ATO: Studying in Australia', href: 'https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia' },
      { label: 'ATO: Not entitled to Medicare benefits', href: 'https://www.ato.gov.au/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/not-entitled-to-medicare-benefits' },
      { label: 'ATO: Lodge your tax return from outside Australia', href: 'https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia' },
      { label: 'ATO: Returning to your home country', href: 'https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/returning-to-your-home-country' },
    ],
  },
  {
    slug: 'average-tax-refund-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Is there an average tax refund for international students?',
    description: 'No average can tell you what your result will be. What decides a student tax refund: residency, the tax-free threshold, withholding, Medicare and deductions.',
    answer: 'There is no useful average, because a refund is not a fixed payment. It is the difference between the tax taken from your pay and the tax you actually owe, and that depends on your residency, income, jobs, withholding and deductions.',
    body: `"How much tax back do students get?" is one of the most common questions at tax time. It is a fair question, but no honest answer is a single number. Two students in the same course, earning the same amount, can have very different results. One may get money back, and the other may owe the ATO.

Instead of an average, this guide explains what actually drives a student's result, so you can understand your own year.

## Why does an average not help?

A refund is not a payment for being a student. It is the gap between two figures:

- **The tax withheld:** what your employers took out of your pay during the year.
- **The tax you owe:** what the ATO works out when you lodge, based on your whole year.

If those two figures are close, there is little or nothing to refund. If too much was withheld, the extra comes back. If too little was withheld, you pay the difference. Any average hides all of this, so it cannot tell you what your result will be.

## Driver 1: your tax residency

Residency changes the tax you owe more than anything else. A student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. It depends on your circumstances, so it needs to be worked out, not guessed.

For 2025-26, the rates are very different:

- **Residents:** no tax on income up to $18,200, then 16% from $18,201 to $45,000, and 30% from $45,001 to $135,000.
- **Foreign residents:** 30% from the first dollar up to $135,000, with no tax-free threshold.

Residents with lower incomes may also get the low income tax offset. For 2025-26 it is $700 for taxable income up to $37,500, and it reduces as income rises. It can lower the tax you owe, but it is not paid out as cash on its own.

## A worked example of the tax owed

This example shows only the tax owed on income, before the Medicare levy. It is not a refund figure, because a refund also depends on what was withheld.

Take two students who each earned $30,000 of taxable income in 2025-26.

- **If the student may be a resident:** no tax on the first $18,200. Then 16% of the next $11,800 is $1,888. The low income tax offset of $700 reduces this to $1,188.
- **If the student is a foreign resident:** 30% of $30,000 is $9,000. There is no threshold and no low income tax offset.

Same income, very different tax. This is why the residency answer matters so much.

## Driver 2: how tax was withheld during the year

The second figure is the tax your employers took out. It depends on what you told them on your TFN declaration and when you started.

- **The tax-free threshold claimed from two jobs.** Each employer withholds less, so too little tax is taken in total. This often leads to a bill, not a refund.
- **No TFN at the start.** If your employer did not have your TFN within 28 days, it had to take tax at the top rate plus the Medicare levy. The extra is worked out when you lodge.
- **Working part of the year.** Withholding assumes you earn the same amount all year. If you only worked a few months, more may have been withheld than you owe.

## Driver 3: the Medicare levy

The Medicare levy is 2% of your taxable income. Many students are not entitled to Medicare because they have Overseas Student Health Cover. If that is you, you may be able to claim an exemption from the levy, but you need a Medicare Entitlement Statement from Services Australia.

The ATO says it can take up to 8 weeks to get the statement, so apply early. Having the statement does not automatically mean you are exempt. Students from countries with a reciprocal health care agreement may be entitled to Medicare and cannot get one.

## Driver 4: deductions and ABN income

Deductions lower your taxable income, which lowers the tax you owe. You can claim a work cost if you paid for it yourself, it relates directly to earning your income, and you have a record. For many student jobs the amounts are small, and ordinary clothing, travel from home to work and most study costs are not claimable.

If you did delivery or other contract work with an ABN, no tax was taken out. Your profit is added to your income, and the tax on it is worked out at the end. This often reduces a refund or turns it into a bill.

## Why some students owe money

Owing money is normal in some years, and it does not mean you did something wrong. The usual reasons are the threshold claimed from two jobs, ABN income with no tax taken out, or a residency answer that changed. Finding out early gives you time to plan.

## How to understand your own result

- Add up your income and the tax withheld from every income statement in myGov.
- Work out your residency position carefully.
- Check whether you claimed the tax-free threshold from more than one job.
- Apply early for a Medicare Entitlement Statement if you may be exempt.
- Collect receipts for work costs you paid yourself.

Your own result can only be known once the whole year is looked at.`,
    faq: [
      { q: 'Can anyone tell me my refund before looking at my year?', a: 'No. A refund depends on the tax withheld and the tax you owe, and both depend on your own details. Be careful of anyone who quotes a figure without seeing your income statements.' },
      { q: 'Why did my friend get money back but I owe tax?', a: 'You may have different residency positions, different jobs or different withholding. A common reason is claiming the tax-free threshold from two jobs.' },
      { q: 'Does a higher income mean a bigger refund?', a: 'Not necessarily. The result depends on how close the tax withheld was to the tax you owe, not on how much you earned.' },
    ],
    sources: [
      { label: 'ATO: Studying in Australia', href: 'https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia' },
      { label: 'ATO: Low income tax offset', href: 'https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/tax-offsets/low-income-tax-offset' },
      { label: 'ATO: What is the Medicare levy', href: 'https://www.ato.gov.au/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/what-is-the-medicare-levy' },
      { label: 'ATO: Income from more than one job', href: 'https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job' },
    ],
  },
  {
    slug: 'student-visa-tax-guide-500-485',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Tax guide for 500 and 485 visa holders in Australia',
    description: 'The complete tax guide for student (500) and graduate (485) visa holders: residency, 2025-26 rates, TFN, super, Medicare, deductions, lodging and leaving.',
    answer: 'If you earn income in Australia on a 500 or 485 visa, you usually need a TFN and must lodge a tax return after 30 June. You may be an Australian resident for tax purposes, which gives you the tax-free threshold, but it depends on your circumstances.',
    body: `This guide brings together the main tax rules for people on a student visa (subclass 500) or a temporary graduate visa (subclass 485). The tax system does not have a special rate for students or graduates. Your tax depends on your residency position, your income and your deductions, like anyone else.

One point first: the working holiday maker tax rate does not apply to 500 or 485 visa holders. If you read tax advice written for working holiday visas, much of it will not fit your situation.

Work-hour limits and other visa conditions are set by Home Affairs, so check your own visa conditions with them.

## Your residency and the 2025-26 tax rates

Tax residency is not the same as your visa or immigration status. The ATO says overseas students enrolled in a course of 6 months or more may be Australian residents for tax purposes. Graduates on a 485 visa who live and work in Australia may also be residents, depending on their circumstances.

Residency matters because it decides your tax rates and whether you get the tax-free threshold. It is worked out from your own situation, so do not assume either way. If you may be a resident for only part of a year, you may get only part of the threshold.

The ATO also says a temporary resident who is an Australian resident for tax purposes is generally not taxed on most foreign income. Your Australian income must be declared.

For residents, 2025-26:

- $0 to $18,200: nil
- $18,201 to $45,000: 16%
- $45,001 to $135,000: 30%
- $135,001 to $190,000: 37%
- Over $190,000: 45%

For foreign residents, 2025-26:

- $0 to $135,000: 30%
- $135,001 to $190,000: 37%
- Over $190,000: 45%

Foreign residents do not get the tax-free threshold. Residents with taxable income below $66,667 may also get the low income tax offset, which is $700 for income up to $37,500 and reduces above that.

## Your TFN and the TFN declaration

You need a tax file number to work. The ATO says you can apply online for free if you hold a visa with work rights and you are in Australia, and it is posted to your Australian address within 28 days. If you do not give your employer your TFN within 28 days, they must take tax at the top rate plus the Medicare levy.

When you start each job, you complete a TFN declaration. If you may be a resident, you can claim the tax-free threshold, but the ATO says you generally claim it from one payer only, usually the one who pays you the most. Many students and graduates have two jobs, and claiming the threshold twice is a common reason for a tax bill.

## Super from your job

Generally all employees, including casual and part-time workers and temporary residents, are eligible for super. The rate is 12% of ordinary earnings, paid by your employer on top of your wages. From 1 July 2026, under Payday Super, employers pay super at the same time as wages, and it must reach your fund within 7 business days.

Check your super in myGov through ATO online services. If you have several funds from different jobs, you can see them there. Before you combine funds, check for insurance or fees you might lose.

## Medicare, OSHC and the Medicare levy

The Medicare levy is 2% of taxable income. Many 500 visa holders are not entitled to Medicare because they have Overseas Student Health Cover (OSHC), which is a visa condition. If you are not entitled to Medicare, you may claim an exemption from the levy, but you need a Medicare Entitlement Statement (MES) from Services Australia.

- Applications open on 1 July, and the ATO says it can take up to 8 weeks.
- Wait for the statement before you lodge.
- An MES does not automatically mean you are exempt.
- All your dependants, including a spouse, must also be exempt.
- You need a statement for each year you claim the exemption.

People from countries with a reciprocal health care agreement may be entitled to Medicare, and then cannot get a statement.

## Deductions and ABN work

The ATO's three rules are: you spent the money yourself and were not paid back, it relates directly to earning your income, and you have a record. Common claims include a compulsory uniform, protective clothing, tools under $300 for the work part, and the work part of your phone.

Course fees are a common question. The ATO says self-education is only claimable when it has a sufficient connection to your current job, for example it maintains or improves skills you use in that job. It is not claimable if it helps you get a new job or change careers. For most students, course fees are not deductible. A 485 graduate doing a short course for their current job may be in a different position.

Some students and graduates do delivery, rideshare or freelance work with an ABN. No tax is taken out of ABN income, so you report it in your return with your business costs and pay any tax then. Rideshare drivers must register for GST before they start, whatever they earn. An employer should not ask you to get an ABN as a condition of a normal job.

## When and how to lodge

The financial year runs 1 July to 30 June. Wait until your income statements in myGov are "Tax ready". If you lodge yourself, the usual deadline is 31 October. If you use a registered tax agent and contact them before 31 October, you may be able to lodge later.

You can lodge online with myTax, through a registered tax agent, or on paper. You can also lodge from outside Australia. Keep an Australian bank account open for any refund.

## Leaving Australia: what to finish

When your course or your 485 visa ends and you go home, plan these steps:

- Ask each employer for any payment summary you need. The ATO says they must give it within 14 days if you ask when you leave.
- If you had an ABN, cancel it and lodge any final statements.
- Lodge your tax return after 30 June, which you can do from overseas.
- Claim your super as a Departing Australia Superannuation Payment (DASP) after your visa has ended and you have left. The ATO DASP online system is free.

DASP is taxed at 35% on the taxed element if you never held a 417 or 462 visa. If part of your super came from work while you held a 417 or 462 visa, that part is taxed at 65%. This matters for graduates who were working holiday makers before they studied. Six months after you leave and your visa ends, your fund may transfer your super to the ATO, and you can still claim it.

## Your yearly checklist

- Get your TFN and claim the tax-free threshold from one job only.
- Check your pay slips and your super.
- Apply for a Medicare Entitlement Statement from 1 July, if you may be exempt.
- Keep receipts for work costs.
- Lodge by 31 October, or contact a registered tax agent before then.

If you would like help with your return, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Is a 485 graduate taxed differently from a 500 student?', a: 'No. The same rules apply. Your tax depends on your residency position and income, not on the visa subclass.' },
      { q: 'Do 500 visa holders pay the working holiday maker rate?', a: 'No. That rate is only for working holiday makers. Students and graduates use the resident or foreign resident rates.' },
      { q: 'Can I claim my university fees?', a: 'Usually not. Self-education is only claimable when it has a sufficient connection to your current job, not when it helps you get a new job.' },
      { q: 'How is my super taxed when I leave?', a: 'If you never held a 417 or 462 visa, the taxed element of a DASP is taxed at 35%. Super from work while on a 417 or 462 visa is taxed at 65%.' },
    ],
    sources: [
      { label: 'ATO: Studying in Australia', href: 'https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia' },
      { label: 'ATO: Not entitled to Medicare benefits', href: 'https://www.ato.gov.au/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/not-entitled-to-medicare-benefits' },
      { label: 'ATO: Departing Australia superannuation payment', href: 'https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp' },
      { label: 'ATO: Self-education expenses', href: 'https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/education-training-and-seminars/self-education-expenses' },
    ],
  },
  {
    slug: 'diy-tax-return-vs-tax-agent-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'DIY tax return or tax agent: a guide for international students',
    description: 'Lodging your own tax return with myTax is free. When a student can do it alone, the questions that often go wrong, and what a registered tax agent adds.',
    answer: 'You can lodge your own tax return for free with myTax, and a simple year may be easy to do. A registered tax agent can help when your year has a residency question, a Medicare exemption, several jobs, ABN income or past years to lodge.',
    body: `Every year, international students ask the same question: should I do my own tax return or pay someone? There is no single right answer. Lodging yourself is free and many students do it well. But some parts of a student's return are easy to get wrong, and a mistake may not show up until months later.

This guide helps you decide based on what happened in your year.

## Can you lodge your own return?

Yes. You can lodge online with myTax through myGov linked to the ATO. It is free, and much of your income information is filled in for you once your employers have finalised their reporting. Wait until your income statements show "Tax ready" before you lodge.

If you lodge yourself, the usual deadline is 31 October. For the 2025-26 year, the ATO has said self-lodgers have until 11:59 pm local time on Monday 2 November 2026, because 31 October falls on a Saturday.

There is also free help. The ATO's Tax Help program is for people with an income of around $70,000 or less and simple tax affairs. It is not for contractors or people running a business, so it does not cover ABN delivery or rideshare work.

## Which questions do students often get wrong?

A return can lodge without any error message and still be wrong. These are the areas where students most often make mistakes:

- **Residency.** A student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. It depends on your circumstances. The answer changes your rates and the tax-free threshold, so it is worth getting right.
- **The Medicare levy exemption.** Many students are not entitled to Medicare because they have OSHC. To claim the exemption you need a Medicare Entitlement Statement, which the ATO says can take up to 8 weeks. If you lodge without it, you may miss the exemption.
- **Two jobs and the threshold.** Claiming the tax-free threshold from two employers often leads to a bill. Your return will show it, but it helps to understand why.
- **Course fees.** The ATO says self-education is only claimable when it has a sufficient connection to your current job. Most course fees are not deductible, and claiming them by mistake can cause problems later.
- **ABN income.** Delivery or rideshare work adds business income, business costs and sometimes GST. Rideshare drivers must register for GST before they start.

## When is doing it yourself a good choice?

A simple year is often fine to lodge yourself. For example:

- One or two jobs, with all income statements "Tax ready"
- No ABN or contract work
- A clear residency position that you understand
- Medicare sorted, either because you are entitled or because you already have your statement
- Few or no work deductions

If that describes your year, myTax may be all you need. Read each question carefully and keep your records for 5 years from when you lodge.

## When can a registered tax agent help?

An agent is most useful when your year is not simple. That might be:

- You are not sure about your residency position.
- You want to claim the Medicare levy exemption.
- You had several jobs, or tax was taken at the top rate before your TFN arrived.
- You had ABN income alongside wages.
- You have past years you never lodged.
- You have already left Australia, or are about to.

There are also practical differences. If you are a client of a registered tax agent and contact them before 31 October, you may be able to lodge later than the usual deadline. One exception: the ATO says the return is still due by 31 October if prior-year returns were still outstanding at 30 June. The fee you pay a registered tax agent to prepare your return is generally a deduction in the year you pay it.

## What if you made a mistake on a return you lodged yourself?

It can usually be fixed. The ATO says individuals generally have 2 years to amend an assessment, starting the day after the notice of assessment is sent. In myTax, you go to Income tax history, then Amend. If the correction increases your tax, you will need to pay the extra, and interest may apply if it is not paid on time.

## What about lodging from overseas?

You can lodge from outside Australia, either online with myTax, through a registered tax agent, or on paper. If you lodge online from overseas, you may need to update your myGov sign-in settings first. Keep an Australian bank account open for any refund. It is much easier to sort out these things before you leave than after.

## How to decide

Ask yourself these questions:

- Do I understand my residency position?
- Do I need a Medicare Entitlement Statement, and do I have it?
- Did I claim the tax-free threshold from more than one job?
- Did I have any ABN income?
- Am I sure which costs I can claim?

If you answered "yes" to the first, "no" or "I have it" to the second, and "no" to the third and fourth, doing it yourself is likely to be straightforward. If not, a review may help.

Student Visa Tax operates under the supervision of a registered tax agent. Each return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. Fees are $220 per return for TFN jobs, or $385 with ABN work, GST included. If you would like help, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Is lodging with myTax really free?', a: 'Yes. Lodging your own return online with myTax through myGov costs nothing.' },
      { q: 'Can I use Tax Help for my delivery income?', a: 'No. The ATO says Tax Help is not for contractors or people running a business, so ABN delivery or rideshare work is not covered.' },
      { q: 'Can I claim the tax agent fee?', a: 'Generally yes. The fee paid to a registered tax agent for preparing your return is usually deductible in the year you pay it.' },
      { q: 'What if I already lodged and made a mistake?', a: 'Individuals generally have 2 years to amend an assessment. In myTax, go to Income tax history, then Amend.' },
    ],
    sources: [
      { label: 'ATO: Tax Help program', href: 'https://www.ato.gov.au/individuals-and-families/your-tax-return/help-and-support-to-lodge-your-tax-return/tax-help-program' },
      { label: 'ATO: Cost of managing tax affairs', href: 'https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/cost-of-managing-tax-affairs' },
      { label: 'ATO: Time limits on amendments', href: 'https://www.ato.gov.au/individuals-and-families/your-tax-return/amend-your-tax-return/time-limits-on-amendments' },
    ],
  },
]
