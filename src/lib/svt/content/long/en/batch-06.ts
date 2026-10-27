import type { LongArticle } from '../types'

export const LONG_EN_06: readonly LongArticle[] = [
  {
    slug: "sending-money-home-international-students-tax",
    category: "Tax return",
    published: "2026-10-27", updated: "2026-10-27",
    title: "Sending money home from Australia: tax for international students",
    description: "Moving your own savings overseas is not income, so it is not taxed. What is taxed, what gets reported, and what to sort out before you send your last dollar home.",
    answer: "No. Sending your own money from Australia to your home country is not income, so there is no tax on the transfer itself. Tax is about what you earn in Australia, and that is settled in your tax return.",
    body: `Many international students send money home during their course, or move all their savings back when they finish. A common worry is that the ATO will take a share of every transfer. It does not. This guide explains why, what is reported, and what you should do before the money leaves.

## Is a transfer to another country taxed?

No. A transfer is just your money moving from one account to another. It is not income. Tax in Australia is about income you earn, such as wages from a part-time job or payments for ABN work.

Your wages were already taxed when your employer paid you. Your employer took tax out of each pay, based on your TFN declaration. Your tax return at the end of the financial year then checks if that amount was right. Sending the money home later does not create a second tax.

The same applies to money you bring into Australia. Savings from home, or money your parents send you for rent and fees, is not income from work. The ATO says you do not declare cash gifts from relatives given out of love, such as birthday money. A gift can be taxable if it is part of a business-like activity or relates to your work, but family support to pay for your studies is normally not.

## What income do students declare?

What you declare depends on your residency for tax purposes. A student enrolled in a course of 6 months or more **may be** an Australian resident for tax purposes. You can also be a temporary resident at the same time.

- If you are a temporary resident and an Australian resident, the ATO says most of your foreign income is not taxed in Australia. You declare income you earn in Australia.
- If you are a foreign resident, you generally declare only Australian income, such as wages from an Australian job.
- Interest from an Australian bank account is Australian income. Check your bank account interest each year, even if it is small.

Australian bank interest is easy to forget. If you did not give your bank your TFN, the bank may have withheld tax from the interest. That amount is shown on your return and counted towards the tax you have already paid.

## What is reported when money leaves Australia?

Australia has rules against money laundering. These rules are about watching where money goes, not about tax.

- Banks and money transfer businesses have their own reporting duties to AUSTRAC. AUSTRAC says you do not need to declare money you transfer through a bank or money transfer business.
- If you carry cash or similar money out of Australia, or into Australia, and it is $10,000 or more in total, you must declare it to the Australian Border Force. You can declare online before you go through customs.
- Splitting cash into smaller amounts to avoid the $10,000 declaration is illegal. AUSTRAC says the penalties include fines and prison.

For most students the simple answer is to send money through a bank or a licensed transfer service and not to carry large amounts of cash.

## Will my home country tax the money?

That depends on your home country, not on Australia. Some countries want you to report income you earned while living abroad. Others do not. Some have a tax treaty with Australia that affects how income is treated.

Australia cannot answer this question for you. If you earned a lot in Australia, or if your home country taxes its citizens on worldwide income, ask a tax adviser in your home country before you lodge there.

## What should I do before I send my final savings?

The order matters when you finish your studies and leave. Some money may arrive after you have gone, and you need a working Australian bank account to receive it.

- **Lodge your tax return.** If you worked, the ATO says you will probably need to lodge after 30 June. You can do this from overseas.
- **Keep your Australian bank account open.** Refunds are paid into an Australian bank account, so do not close it too early.
- **Ask for your super.** Once you have left Australia and your visa has ended, you can apply for a departing Australia superannuation payment (DASP). If you never held a 417 or 462 visa, the taxed element is taxed at 35%.
- **Cancel your ABN** if you had one and the business has stopped. You still need to lodge your final returns.
- **Move the balance home** once your refund, if any, and your super have arrived.

## Worked example

Mei is on a student visa and works 15 hours a week in a restaurant. Over the year she saves $9,000 from her wages. Her employer took tax out of each pay. In August she lodges her tax return. The return includes her wages, the tax already withheld, and $40 of interest from her Australian savings account.

In December she sends $9,000 to her bank account in her home country through her Australian bank. There is no tax on the transfer. She does not need to declare it to anyone. The ATO is only interested in her $40 of interest and her wages, and those are already in her return.

If Mei had instead carried $12,000 in cash on the plane, she would need to declare it to the Australian Border Force, because it is $10,000 or more. Declaring it is not a tax. It is a legal step.

## Common mistakes to avoid

- Closing your Australian bank account before your refund or super payment arrives.
- Forgetting interest from a savings account or term deposit.
- Thinking money from your family is income you must declare.
- Carrying large amounts of cash without declaring it.
- Forgetting that you may still need to lodge a tax return after you leave.

## What to do next

Write down every Australian account you have and check the interest earned this financial year. Keep your bank account open until all payments have arrived. If you are leaving soon, plan your tax return and your super claim first, and send your savings home last.

If you want help with your tax return before you leave, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: "Do I pay tax when my parents send me money for my tuition?", a: "Generally no. The ATO says cash gifts from relatives given out of love are not income you declare. Money to support your studies is normally a gift, not income from work." },
      { q: "Is there a limit on how much money I can send home?", a: "There is no tax limit on transfers through a bank or a money transfer business. If you carry cash of $10,000 or more across the border, you must declare it to the Australian Border Force." },
      { q: "Do I declare interest from my Australian bank account?", a: "Yes. Interest from an Australian bank account is Australian income and goes on your tax return, even if the amount is small." },
    ],
    sources: [
      { label: "AUSTRAC: Moving money overseas", href: "https://www.austrac.gov.au/general-public/moving-money-overseas" },
      { label: "ATO: Amounts you do not include as income", href: "https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/income-you-must-declare/amounts-you-do-not-include-as-income" },
      { label: "ATO: Foreign and temporary resident income", href: "https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/income-you-must-declare/foreign-and-worldwide-income/foreign-and-temporary-resident-income" },
      { label: "ATO: Studying in Australia", href: "https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia" },
    ],
  },
  {
    slug: "car-logbook-abn-international-students",
    category: "ABN",
    published: "2026-10-27", updated: "2026-10-27",
    title: "Car expenses on an ABN: logbook or cents per km for students",
    description: "Students who drive for ABN work can claim car costs two ways. How the 88 cent rate and the 12-week logbook work for 2025-26, and which records you must keep.",
    answer: "If you use your own car for ABN work, you can claim either a set rate of 88 cents per business kilometre for 2025-26 (up to 5,000 km), or the business share of all your car costs using a 12-week logbook.",
    body: `Some international students earn money with an ABN by driving: delivering parcels, doing rideshare trips, or travelling between cleaning or tutoring jobs. If you use your own car for this work, part of your car costs may be a deduction. There are two ways to work it out. This guide explains both in simple terms.

## Which vehicles can use these methods?

These two methods are for **cars**. The ATO says a car does not include a motorcycle. It also does not include vehicles that carry one tonne or more, or nine or more passengers, such as some utes and minibuses. If you deliver food on a motorbike or a bicycle, you cannot use the cents per kilometre method. You may still be able to claim the actual work costs of that vehicle, with records.

If you drive for a rideshare platform, there is another rule to know. The ATO says ride-sourcing drivers must register for GST before they start, no matter how much they earn. That is separate from your car deduction, but it matters from your first trip.

## What counts as business travel?

Only travel for your business counts. Examples:

- Driving from one job site to another on the same day.
- Driving passengers or deliveries as part of your ABN work.
- Driving to buy supplies or equipment for the business.

These trips are usually private, not business:

- Driving from home to your university.
- Driving to the shops, to see friends or on holiday.
- Driving from home to a single regular workplace and back, in most cases.

If you are not sure whether a trip counts, write down why you made it. A clear purpose makes the record much stronger.

## How does the cents per kilometre method work?

You multiply your business kilometres by a set rate. For 2025-26 the ATO rate is **88 cents per kilometre**. You can claim up to **5,000 business kilometres** per car per year, so the largest claim is $4,400.

The rate covers all your car running costs, including fuel, servicing, insurance, registration and the car losing value. You cannot also claim those costs separately. You do not need receipts for the running costs, but you must be able to show how you worked out your business kilometres. A simple diary of dates, trips and distances is a good record.

## How does the logbook method work?

You keep a logbook for at least **12 continuous weeks**. The weeks should show your normal pattern of driving across the year. During that time you record every trip, both business and private. The ATO says the logbook needs:

- The start and end dates of the logbook period.
- Odometer readings at the start and end of the period.
- The car's make, model, engine size and registration number.
- For each trip: the start and end odometer readings, the kilometres, and the reason for the trip.
- The business use percentage you worked out.

Your business use percentage is business kilometres divided by total kilometres, times 100. You then apply that percentage to your total car costs for the year: fuel, servicing, insurance, registration, interest on a car loan and the decline in value of the car. You need written evidence for these costs, such as receipts. You may estimate fuel from odometer readings. You also record the odometer reading at the start and end of each financial year.

A logbook is valid for five years. You can start a new one at any time, and you may need one if your work changes a lot.

## Worked example

Arjun studies in Melbourne and delivers parcels as a sole trader with an ABN. In 2025-26 he drives 3,000 business kilometres.

- **Cents per kilometre:** 3,000 km x 88 cents = $2,640.
- **Logbook:** Arjun kept a 12-week logbook. It shows 60% business use. His car costs for the year were $6,000. 60% of $6,000 = $3,600.

Here the logbook gives a larger claim, but only because Arjun kept the logbook and the receipts. Without them, he could only use cents per kilometre. If he drove more than 5,000 business kilometres, the logbook method would usually be worth even more, because cents per kilometre stops at 5,000 km.

## Which method should I choose?

There is no single right answer. Think about these points:

- **How far you drive for work.** Under 5,000 business kilometres, cents per kilometre is simple and often close.
- **Your total car costs.** If your car is expensive to run, or you pay interest on a car loan, the logbook can be worth more.
- **Your records.** No logbook means no logbook method. Start one early in the year if you think you will need it.
- **How much private driving you do.** Lots of private driving lowers your business percentage.

You can choose the method that suits you each year, as long as you have the records for it.

## Which records do I need to keep?

Keep your records for five years from the date you lodge your return. That includes your logbook or trip diary, odometer readings, receipts for car costs, and the purchase papers if you bought the car during the year. If you leave Australia, take digital copies with you. The ATO can ask for them after you go home.

## What to do next

- Decide today if you need a logbook, and start it if you do.
- Keep a simple trip diary for every business trip.
- Photograph receipts for fuel, repairs, insurance and registration.
- Note the odometer reading on 1 July and 30 June.

If you would like help working out your ABN deductions at tax time, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: "Can I use the cents per kilometre method for my motorbike?", a: "No. The ATO says the cents per kilometre and logbook methods are for cars, and a motorcycle is not a car. You may be able to claim the actual work costs of a motorbike with records." },
      { q: "Is driving to university business travel?", a: "No. Travel to study is private travel for your ABN work. Only trips made for your business count." },
      { q: "How long is a logbook valid?", a: "The ATO says a logbook is valid for five years. You can start a new one at any time, and you may need to if your work pattern changes." },
    ],
    sources: [
      { label: "ATO: Logbook method", href: "https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/income-and-deductions-for-business/deductions/deductions-for-motor-vehicle-expenses/logbook-method" },
      { label: "ATO: D1 Work-related car expenses 2026", href: "https://www.ato.gov.au/forms-and-instructions/individual-tax-return-2026-instructions/deduction-questions-d1-d10-individual-tax-return-2026/d1-work-related-car-expenses-2026" },
      { label: "ATO: Ride-sourcing registrations", href: "https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/sharing-economy-and-tax/ride-sourcing/registrations" },
    ],
  },
  {
    slug: "small-business-tax-offset-international-students",
    category: "ABN",
    published: "2026-10-27", updated: "2026-10-27",
    title: "Small business income tax offset for students with an ABN",
    description: "If you earn money as a sole trader, the small business income tax offset can cut your tax by up to $1,000. How it is worked out for students, with two examples.",
    answer: "If you are a sole trader with an ABN, the small business income tax offset can reduce the tax on your business income by 16%, up to $1,000 a year. The ATO works it out from your tax return, so the key is reporting your ABN income correctly.",
    body: `Many international students do some work with an ABN, for example food delivery, cleaning, tutoring or design work. That income goes on your tax return together with any wages. There is a tax offset made for small businesses like yours. Many students have never heard of it. This guide explains what it is, how it is worked out, and what you need to do.

## What is the small business income tax offset?

A tax offset reduces the tax you pay. It is different from a deduction, which reduces the income that tax is worked out on. The small business income tax offset reduces the tax on your **business income** only.

The ATO says the offset is:

- **16%** of the tax on your net small business income, for 2021-22 onwards.
- Capped at **$1,000** each year.
- For sole traders, and for people with a share of net small business income from a partnership or trust.
- Only for businesses with aggregated turnover under **$5 million**. For a student, this limit is not an issue.

## Who can claim it?

If you are a sole trader carrying on a small business, you can usually get it. Most students with ABN income are sole traders: you have an ABN in your own name and you invoice clients or receive payments from a platform.

It is not for companies. It is also not for wages. If you are an employee, your wages are not business income, even if your employer calls you a contractor. Having an ABN does not on its own make you a contractor. If the work is really employment, the income is wages and this offset does not apply.

## How is it worked out?

The ATO uses this formula:

- 16% x (net small business income divided by taxable income) x basic income tax liability.

In plain words: the ATO works out how much of your tax comes from your business income, and takes 16% of that part. Net small business income is your ABN income minus your business deductions. If your business made a loss, it counts as zero.

You do not fill in a separate claim form. The ATO calculates the offset from the business income you report in your return and shows it on your notice of assessment. What you must do is report your ABN income and deductions in the right place.

## Example 1: a student who may be a resident

Sofia studies a two-year master's degree, so she **may be** an Australian resident for tax purposes. In 2025-26 her only income is from ABN cleaning work. After business deductions, her net business income is $30,000. Her taxable income is also $30,000.

- Tax on $30,000 at the 2025-26 resident rates: ($30,000 minus $18,200) x 16% = $1,888.
- All her taxable income is business income, so the offset is 16% x $1,888 = about $302.

Sofia may also get other offsets, such as the low income tax offset. Each offset is worked out separately.

## Example 2: a foreign resident with wages and ABN income

Tom is a foreign resident for tax purposes. In 2025-26 he earns $12,000 in wages and $8,000 of net ABN income from delivery work. His taxable income is $20,000.

- Foreign residents pay 30% from the first dollar up to $135,000 for 2025-26. Tax on $20,000 = $6,000.
- Business share of his income: $8,000 divided by $20,000 = 40%.
- Offset: 16% x 40% x $6,000 = $384.

The offset only applies to the business part. His wages do not count. His employer already took tax out of his wages, but nobody took tax out of his ABN income, so the offset helps reduce the amount he may need to pay.

## Does it change how much I should claim in deductions?

Claiming a deduction lowers your net business income, so the offset becomes a little smaller. But a genuine deduction still saves you more than it takes away from the offset. So claim every business expense you can support with records. Do not claim anything you cannot support.

For example, if Tom in Example 2 found another $500 of genuine delivery costs, his net business income would fall to $7,500 and his taxable income to $19,500. His tax would fall by $150 (30% of $500). His offset would fall only a little, from $384 to $360 (16% x $7,500 divided by $19,500 x $5,850). He is still better off by $126.

Deductions follow the normal rules: you paid for it, it relates to earning your business income, and you have a record. Keep records for five years from when you lodge.

## What if I already lodged without it?

The ATO calculates the offset from the business income shown on your return. If your ABN income was put in the wrong place, for example mixed in with wages, the offset may have been missed. You can ask for an amendment. Individuals generally have 2 years from the notice of assessment, and sole traders have 4 years from 2024-25.

## What to do next

- Check that your ABN income is reported as business income, not as wages.
- List your business deductions and keep the receipts.
- Check your notice of assessment to see if the offset was applied.
- If the offset is missing from a past year, ask about an amendment.

If you want your ABN income and wages put together correctly in one return, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: "Do I need to apply for the small business income tax offset?", a: "No separate application is needed. The ATO calculates it from the business income in your tax return and shows it on your notice of assessment." },
      { q: "Can I get the offset if I am a foreign resident for tax purposes?", a: "The ATO eligibility rules are about being a sole trader with small business income, not about residency. Foreign residents with ABN income can be eligible, as in the example above." },
      { q: "Does the offset apply to my wages?", a: "No. It only applies to the tax on your net small business income. Wages from an employer are not business income." },
    ],
    sources: [
      { label: "ATO: Small business income tax offset", href: "https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/income-and-deductions-for-business/concessions-offsets-and-rebates/small-business-income-tax-offset" },
      { label: "ATO: myTax 2026 Small business income tax offset", href: "https://www.ato.gov.au/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/2026/tax-offsets/small-business-income-tax-offset" },
    ],
  },
  {
    slug: "sole-trader-or-company-international-students",
    category: "ABN",
    published: "2026-10-27", updated: "2026-10-27",
    title: "Sole trader or company? A guide for international students",
    description: "For most students doing ABN work, a sole trader setup is simpler and cheaper than a company. How the two compare on tax, paperwork and what happens when you leave.",
    answer: "For almost every international student doing small ABN jobs, a sole trader is the simpler choice. A sole trader uses their own ABN and reports the income on their own tax return, while a company is a separate legal entity with its own tax return, registration and ongoing duties.",
    body: `If you start doing work for yourself in Australia, someone may ask whether you want to be a sole trader or set up a company. For most students the answer is sole trader. This guide explains why, in plain terms, and when the choice might be different.

## What is a sole trader?

A sole trader is one person running a business in their own name. You apply for an ABN, which is free through the Australian Business Register. Your business income goes on your own individual tax return, along with any wages. You can claim business expenses on the same return.

You and the business are the same legal person. That means you are personally responsible for the business debts. For most student work, such as delivery, cleaning, tutoring, photography or design, that risk is small.

You are only entitled to an ABN if you are carrying on, or starting, a business. If you work as an employee, you should not have an ABN for that job, even if the employer calls it contracting.

## What is a company?

A company is a separate legal entity. It has its own ABN, its own tax file number and its own tax return. It must be registered with ASIC, the corporate regulator, and pay fees every year. It needs a director, and directors have legal duties and need a director identification number.

A company protects the owners' personal assets in some situations. But it also brings a lot of paperwork. That paperwork continues every year, even if the company does no work.

## How does the tax compare?

For 2025-26, the ATO says the company tax rate is 25% for base rate entities and 30% for other companies. A sole trader pays the normal personal rates, and those depend on your residency for tax purposes.

Here is a simple example with $30,000 of profit for 2025-26, before any offsets or the Medicare levy:

- **Sole trader who may be a resident:** ($30,000 minus $18,200) x 16% = $1,888.
- **Sole trader who is a foreign resident:** $30,000 x 30% = $9,000.
- **Company at the 25% rate:** $30,000 x 25% = $7,500.

For a student who may be a resident, the sole trader position is much lower. For a foreign resident the company rate looks lower at first. But the money belongs to the company, not to you. To use it, the company has to pay it to you, for example as wages or dividends, and that payment then goes on your personal return too. On top of that, the company has its own costs for registration, annual fees and a separate tax return. At student income levels, those costs usually remove any saving.

## What happens when I leave Australia?

This is where the difference is biggest. When a sole trader stops working, they cancel the ABN, lodge their final returns and keep their records. The ABR says you should cancel within 28 days of stopping, and you can do it online.

A company does not end when you fly home. It keeps its legal duties, its annual fees and its reporting until it is properly closed. Closing a company is a formal process. If you leave without doing it, the duties do not go away. For a student who will finish a course and may leave Australia, this is a strong reason to stay a sole trader.

## When might a company make sense?

It is rare for a student. A company is sometimes worth thinking about when:

- Several people own the business together.
- The business has serious legal risks that insurance cannot cover.
- The profits are high enough that the costs of a company are worth it.

If one of these applies to you, get personal advice before you decide. Do not set up a company only because someone online said it saves tax.

## What if a client says I must have a company?

Some large businesses only work with companies, often for insurance reasons. That can be genuine. But be careful if a business asks you to set up a company or get an ABN for work that is really a normal job, with set hours, supervision and their equipment. The ATO says a contract that calls you a contractor does not override the real relationship. Sham contracting is illegal. If this happens, you can contact the Fair Work Ombudsman. Visa holders have the same workplace rights as everyone else.

## Can I claim the same expenses as a sole trader?

Yes, mostly. A sole trader can claim genuine business expenses, such as tools, equipment, the business part of a phone plan, and car costs using cents per kilometre or a logbook. The normal rules apply: you paid for it, it relates to earning your business income, and you have a record. A sole trader may also be able to get the small business income tax offset, which a company cannot.

## What to do next

- If you are starting ABN work, apply for an ABN as a sole trader through the ABR. It is free.
- Keep a record of all income and business expenses from day one.
- Check that the work is really a business and not a job.
- Plan to cancel your ABN when you stop, and lodge your final return.

If you want help reporting your ABN income at tax time, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: "Does a sole trader need a separate tax return?", a: "No. A sole trader reports business income and expenses on their own individual tax return, together with any wages." },
      { q: "Is the company tax rate lower than my personal rate?", a: "It depends on your residency for tax purposes. For a student who may be a resident with a modest income, the personal rates are usually lower. A company also has extra costs and duties every year." },
      { q: "What do I do with my ABN when I finish my course?", a: "If your business has stopped, cancel the ABN, which the ABR says should be done within 28 days. You still need to lodge your final tax return." },
    ],
    sources: [
      { label: "ATO: Company tax rates 2025-26", href: "https://www.ato.gov.au/tax-rates-and-codes/company-tax-rates/tax-rates-2025-26" },
      { label: "ABR: ABN entitlement", href: "https://www.abr.gov.au/business-super-funds-charities/applying-abn/abn-entitlement" },
      { label: "ABR: When should you cancel your ABN", href: "https://abr.gov.au/media-centre/featured-news/business-super-funds-charities/when-should-you-cancel-your-abn" },
    ],
  },
  {
    slug: "personal-services-income-abn-international-students",
    category: "ABN",
    published: "2026-10-27", updated: "2026-10-27",
    title: "Personal services income: what students with an ABN should know",
    description: "Most student ABN income is paid for your own work, which the ATO calls personal services income. What the 80% rule means and which few deductions it limits.",
    answer: "Personal services income (PSI) is income paid mainly for your own skills or effort. If the PSI rules apply to you, you report the income as usual, but a few deductions are not allowed, such as rent or mortgage interest for your home.",
    body: `Students with an ABN sometimes see the words "personal services income" on a tax form and worry. The idea sounds complicated, but for most students the effect is small. This guide explains what PSI is, how the ATO tests it, and what changes on your tax return.

## What is personal services income?

Personal services income is income that you earn mainly from your own skills or effort. You are paid for your time and your work, not for selling goods or using business assets.

Examples of work that usually produces PSI:

- Tutoring paid by the hour.
- Cleaning houses or offices.
- Freelance design, writing or translation.
- Delivery work paid per drop.
- IT or coding work for one client.

Income that is usually not PSI comes mainly from something else: selling goods you buy or make, renting out equipment, or other people working for you. For example, a student who buys phone cases and sells them online earns income from selling goods, not from personal services.

## What is the 80% rule?

The ATO uses tests to decide if the PSI rules apply. If you pass the tests, you can treat yourself as a personal services business (PSB) and the PSI rules do not apply.

One key test is the **80% rule**. You work it out each income year:

- If 80% or more of your PSI comes from one client and their associates, you fail the 80% rule.
- If less than 80% comes from one client, you pass it. You then need to pass one of three other tests: the unrelated clients test, the employment test or the business premises test.

There is also a **results test**. If you meet it for at least 75% of your PSI, you can treat yourself as a personal services business without the 80% rule. In general terms, this test is about being paid to produce a result, supplying your own tools, and fixing your own mistakes at your own cost.

## Will the PSI rules apply to me?

For many students, yes. A typical student contractor has one main client or platform, uses the client's systems, and works from home or the client's premises. That usually means failing the 80% rule and the other tests.

This is not a penalty. It does not mean you did anything wrong. It just changes a few things about your deductions.

The opposite can also happen. A student who runs a small photography business, advertises to the public and has many unrelated clients may pass the 80% rule and the unrelated clients test. In that case the PSI rules do not apply. If you think this describes you, keep evidence of your advertising and a list of your clients for each year, because the test is worked out year by year.

## Which deductions does PSI limit?

The ATO says that when the PSI rules apply, you **cannot** claim:

- Rent, mortgage interest, rates or land tax for your home.
- Payments to a relative or partner for support work, such as bookkeeping or admin.
- Super contributions for a relative or partner who does that kind of support work.

You **can** still claim normal costs of earning the income, for example:

- Tools and equipment you use for the work.
- The work part of your phone and internet.
- Home office running costs such as heating and lighting.
- Car costs for genuine business travel.
- Payments to unrelated people who help with the work.

For most students, the list of limited deductions does not matter. Very few students would claim rent for a shared apartment against their tutoring income anyway, and the PSI rules make sure that cannot happen.

## Worked example

Lina is studying IT and does website work with an ABN. In 2025-26 she earns $14,000 from one company and $1,000 from a friend's café. The company paid 93% of her PSI, so she fails the 80% rule. She does not meet the results test, because she is paid by the hour.

The PSI rules apply. Lina reports the $15,000 on her tax return as PSI. She claims a laptop used partly for this work (only the work share), the work part of her internet and her home office running costs. She cannot claim part of her rent. Her tax is then worked out at her normal rates, which depend on her residency for tax purposes.

## Is PSI the same as being an employee?

No, and this is important. PSI rules are about contractors. If your work is really a job, with set hours, supervision and the employer's equipment, you may be an employee, not a contractor at all. Having an ABN does not make you a contractor by itself. An employer should not ask you to get an ABN as a condition of a job.

If you are really an employee, the employer should take tax out of your pay, pay super for you and pay at least the minimum rate. Sham contracting is illegal. You can contact the Fair Work Ombudsman for help, and visa holders have the same workplace rights as everyone else.

## What to do next

- List who paid you ABN income this year and how much each paid.
- Work out if one client paid 80% or more.
- Keep records of the tools and costs you used for the work.
- Do not claim rent or home loan interest against PSI.
- If your "contract" looks like a normal job, check your status first.

If you would like your PSI and other income reported correctly, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: "Does PSI mean I pay more tax?", a: "Not directly. PSI is taxed at your normal rates. The rules only stop a few deductions, such as rent or mortgage interest for your home." },
      { q: "What if I have two clients?", a: "The 80% rule looks at how much comes from one client and their associates. If one client paid 80% or more of your PSI, you fail the rule even if you had other clients." },
      { q: "Can I still claim my laptop?", a: "Yes, the work share of tools and equipment you use for the work can still be claimed, with records." },
    ],
    sources: [
      { label: "ATO: Self-assessing as a PSB", href: "https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/personal-services-income/working-out-if-the-psi-rules-apply/self-assessing-as-a-psb" },
      { label: "ATO: Claiming deductions when receiving PSI", href: "https://www.ato.gov.au/businesses-and-organisations/income-deductions-and-concessions/personal-services-income/what-to-do-when-the-psi-rules-apply/claiming-deductions-when-receiving-psi" },
      { label: "ABR: ABN entitlement", href: "https://www.abr.gov.au/business-super-funds-charities/applying-abn/abn-entitlement" },
    ],
  },
  {
    slug: "low-income-tax-offset-examples-international-students",
    category: "Tax return",
    published: "2026-10-27", updated: "2026-10-27",
    title: "Low income tax offset worked examples for international students",
    description: "Five student incomes, step by step: how much tax the 2025-26 resident rates give, how much the low income tax offset takes off, and why it never creates a refund.",
    answer: "If you are an Australian resident for tax purposes and your taxable income is below $66,667, the low income tax offset can reduce your tax by up to $700. It cannot create a refund by itself, and foreign residents cannot get it.",
    body: `The low income tax offset (LITO) is one of the most useful offsets for students who work part time. But many students are not sure how it is calculated or whether it applies to them. This guide goes through real numbers, step by step, so you can see how it works for 2025-26.

## Who can get the low income tax offset?

The ATO says LITO is for **Australian residents for tax purposes** with taxable income below $66,667. A student enrolled in a course of 6 months or more **may be** a resident. Residency depends on your own situation, so it should be checked each year.

If you are a foreign resident for tax purposes, you cannot get LITO. You also do not get the tax-free threshold.

You do not apply for LITO. The ATO works it out from your tax return.

## How is it calculated?

The ATO rules for LITO are:

- Taxable income up to $37,500: offset of **$700**.
- $37,501 to $45,000: $700 minus 5 cents for each dollar over $37,500.
- $45,001 to $66,667: $325 minus 1.5 cents for each dollar over $45,000.
- $66,667 or more: no offset.

The offset is **non-refundable**. It can reduce your tax to zero, but any part that is left over is not paid to you.

## Which tax rates do the examples use?

The examples below use the 2025-26 resident rates: 0 to $18,200 nil, $18,201 to $45,000 16%, $45,001 to $135,000 30%, $135,001 to $190,000 37%, and over $190,000 45%. They show income tax only, before the Medicare levy or any other offsets.

Each example follows the same three steps. First, work out the tax on your taxable income. Second, work out your LITO from the table above. Third, take the LITO away from the tax. If the answer is below zero, your tax is zero. Taxable income means your total income minus your deductions, so claiming a genuine deduction can also change your LITO a little.

## Worked examples at five incomes

**$15,000 of income.** Tax is nil, because $15,000 is below the tax-free threshold. LITO could be up to $700, but there is no tax to reduce, so tax after LITO is $0. LITO gives nothing here, because the threshold already covers all the income. If tax was taken out of your pay, you may get it back through your return because your tax is nil, not because of the offset.

**$20,000 of income.** Tax is ($20,000 minus $18,200) x 16% = $288. LITO is $700, so tax after LITO is $0. The offset is larger than the tax. The extra $412 is not paid out, because LITO is non-refundable.

**$30,000 of income.** Tax is ($30,000 minus $18,200) x 16% = $1,888. LITO is the full $700, so tax after LITO is $1,188. This is a common income for a student with a steady part-time job across the year.

**$42,000 of income.** Tax is ($42,000 minus $18,200) x 16% = $3,808. LITO is $700 minus 5 cents x ($42,000 minus $37,500), which is $700 minus $225 = $475. Tax after LITO is $3,333.

**$55,000 of income.** This might apply to a graduate in the first full year of work. Tax is $4,288 on the first $45,000, plus ($55,000 minus $45,000) x 30% = $3,000, so $7,288 in total. LITO is $325 minus 1.5 cents x ($55,000 minus $45,000), which is $325 minus $150 = $175. Tax after LITO is $7,113.

At $66,667 or more, the offset is zero. As you can see, LITO matters most for students with taxable income between about $20,000 and $45,000, which is where many part-time workers sit.

## What if I was a foreign resident?

If you are a foreign resident for tax purposes, none of these examples apply. For 2025-26, foreign residents pay 30% from the first dollar up to $135,000, then 37%, then 45%. There is no tax-free threshold and no LITO. On $30,000, a foreign resident pays $9,000 of income tax, compared with $1,188 for a resident in the example above. This is why the residency question is so important for students. It must be answered on the facts of your own situation, not guessed.

## Why does my refund not include $700?

Your refund, if any, comes from the tax your employer already took out of your pay during the year. LITO only reduces your final tax. If your employers withheld more tax than you owe after LITO, the difference may come back to you. If they withheld less, you may need to pay.

That is why your TFN declaration matters. If you claim the tax-free threshold from two employers at the same time, too little tax may be taken out. LITO will not fix that, and you may end up with a tax bill.

## What about other offsets?

LITO can be combined with other offsets. For example, a student with ABN work may also get the small business income tax offset on the business part of their income. Each offset is calculated separately.

The Medicare levy is a separate question. Many students are not entitled to Medicare because they have OSHC, and they may be able to claim an exemption from the levy with a Medicare Entitlement Statement from Services Australia.

## What to do next

- Check if you **may be** a resident for tax purposes for the year.
- Add up your taxable income from all jobs.
- Use the rules above to estimate your LITO.
- Make sure you only claim the tax-free threshold from one employer.

If you would like your residency, LITO and Medicare position checked together, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: "Can a foreign resident student get LITO?", a: "No. The ATO says LITO is for Australian residents for tax purposes. Foreign residents also do not get the tax-free threshold." },
      { q: "Is LITO paid to me if my tax is already zero?", a: "No. LITO is non-refundable. It can reduce your tax to zero, but any part left over is not paid to you." },
      { q: "Do I need to claim LITO on my return?", a: "No separate claim is needed. The ATO works out LITO from your taxable income and residency when it processes your return." },
    ],
    sources: [
      { label: "ATO: Low income tax offset", href: "https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/tax-offsets/low-income-tax-offset" },
      { label: "ATO: Studying in Australia", href: "https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia" },
      { label: "ATO: Income from more than one job", href: "https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job" },
    ],
  },
  {
    slug: "objecting-to-ato-decision-international-students",
    category: "Tax return",
    published: "2026-10-27", updated: "2026-10-27",
    title: "Disagree with the ATO? How international students can object",
    description: "If you think an ATO decision about your tax is wrong, you can lodge an objection for free. The time limits, what to include, and when to amend instead.",
    answer: "Yes. If you disagree with an ATO decision, such as your assessment, you can lodge an objection. There is no fee. For most individuals the time limit for an income tax assessment is 2 years, and many other decisions have 60 days.",
    body: `Sometimes a student receives a notice of assessment or a letter from the ATO and thinks it is wrong. You do not have to accept a decision you believe is incorrect. Australia has a formal process called an objection. This guide explains when to use it, how long you have, and how to make your objection clear.

## What is an objection?

An objection is a formal request for the ATO to review a decision it made. The ATO looks at the facts and the law again and decides whether to change the decision. Lodging an objection is free.

Examples of decisions a student might object to:

- An assessment that treats you as a foreign resident when you believe you may be a resident, or the other way around.
- A Medicare levy charge when you have a Medicare Entitlement Statement showing you were not entitled to Medicare.
- A deduction the ATO did not allow.
- A penalty, for example for lodging late.
- A decision to keep your refund.

## Objection or amendment?

These are two different processes. Choosing the right one saves time.

- **Amendment:** you made a mistake on your own return, for example you forgot some income or a deduction. You ask the ATO to change your return. In myTax you go to Income tax history, then Amend.
- **Objection:** you disagree with a decision the ATO made, after looking at your return or your situation.

A simple example: you forgot to claim the Medicare levy exemption because your Medicare Entitlement Statement arrived late. That is usually an amendment. If the ATO then refuses your exemption and you think the refusal is wrong, that is an objection.

## How long do I have?

The ATO sets different time limits for different decisions:

- **Income tax assessment:** 2 years for most individuals. Some individuals have 4 years.
- **Amended assessment:** 60 days from the amended assessment, or the time limit for the original assessment, whichever is later.
- **Penalties and interest:** 60 days from the penalty notice, or the last day to object to the related assessment, whichever is later.
- **Income tax private rulings:** 60 days from the ruling, or a longer period linked to your return, whichever is later.

The period usually runs from the date the ATO tells you about the decision or issues the assessment. Do not wait until the last week. If you are close to the limit or past it, contact the ATO or a registered tax professional as soon as you can.

## How do I make my objection clear?

The ATO says the information you give helps it process the objection faster. A good objection is short and specific. Include:

- **Which decision** you are objecting to, with the date and any reference number on the notice.
- **Exactly what** you disagree with, for example "the Medicare levy at the 2025-26 assessment", not just "the whole assessment".
- **Why** you think it is wrong, in simple facts.
- **Evidence**, attached as documents: for example your Medicare Entitlement Statement, your enrolment confirmation, your visa grant, payslips or receipts.

Keep a copy of everything you send. Write in simple sentences, and stick to the facts. The person reviewing your objection needs to see quickly what you disagree with and why. Long stories about how you feel about the decision do not help. Clear dates, numbers and documents do.

## Worked example

Hana is in Australia on a student visa and doing a two-year course. She lodged her 2025-26 return and treated herself as a foreign resident. Later she learns she **may be** a resident, so she asks for an amendment. The ATO reviews it and issues an amended assessment that still treats her as a foreign resident.

Hana disagrees with that decision. She lodges an objection within 60 days of the amended assessment. In it she names the amended assessment and its date, says she disagrees with her residency status for 2025-26, explains her facts (course length, where she lived, how long she has been in Australia) and attaches her confirmation of enrolment, lease and visa grant.

## What happens after I lodge?

The ATO may contact you or your tax professional for more information or to talk about how long it will take. It then decides to allow your objection in full, allow part of it, or disallow it.

If you disagree with the result, you may be able to ask for an external review by the Administrative Review Tribunal, or appeal to the Federal Court. For most student disputes, a clear objection with good evidence is the important step.

The ATO also has a free service called Dispute Assist for vulnerable individuals and small businesses going through the objection process.

## Can I object from overseas?

Yes. You do not need to be in Australia. The bigger risk after you leave is missing letters. Make sure the ATO has your current email and postal address, and check your myGov inbox. A letter sent to an old student apartment can cost you weeks.

## What to do next

- Read the reasons in the ATO notice carefully.
- Decide if this is your mistake (amend) or an ATO decision you disagree with (object).
- Check the time limit for that type of decision.
- Gather your evidence before you write.
- Update your contact details with the ATO.

If you would like help understanding a notice from the ATO, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: "Does it cost anything to lodge an objection?", a: "No. The ATO says there is no fee to lodge an objection." },
      { q: "How long do I have to object to my income tax assessment?", a: "For most individuals it is 2 years. Some individuals have 4 years. The period usually starts when the ATO issues the assessment." },
      { q: "Can I object after I have left Australia?", a: "Yes. The process does not require you to be in Australia. Keep your contact details up to date so you receive ATO letters." },
    ],
    sources: [
      { label: "ATO: What you can object to, and the time limits", href: "https://www.ato.gov.au/individuals-and-families/your-tax-return/if-you-disagree-with-an-ato-decision/object-to-a-decision/what-you-can-object-to-and-the-time-limits" },
      { label: "ATO: Steps to lodge an objection", href: "https://www.ato.gov.au/individuals-and-families/your-tax-return/if-you-disagree-with-an-ato-decision/object-to-a-decision/steps-to-lodge-an-objection" },
      { label: "ATO: Object to a decision", href: "https://www.ato.gov.au/individuals-and-families/your-tax-return/if-you-disagree-with-an-ato-decision/object-to-a-decision" },
    ],
  },
  {
    slug: "fix-tax-return-mistakes-international-students",
    category: "Tax return",
    published: "2026-10-27", updated: "2026-10-27",
    title: "Fixing mistakes after lodging: amendments for international students",
    description: "Six mistakes students often find after lodging, from a late Medicare Entitlement Statement to the wrong residency answer, and how to fix each one with an amendment.",
    answer: "If you find a mistake after your tax return is processed, you can ask the ATO to amend it. Individuals generally have 2 years from the day after the notice of assessment is sent, and sole traders have 4 years from 2024-25.",
    body: `Finding a mistake in your tax return can be stressful, but it is very common and usually easy to fix. The ATO calls the fix an amendment. This guide looks at the mistakes international students make most often, and how to fix each one.

## What is an amendment?

An amendment is a change to a tax return that has already been processed. You can use it to add something you missed, remove something that was wrong, or correct a figure. An amendment can increase your refund, or it can mean you owe more. Either way, fixing an error yourself is the right thing to do.

In myTax, you go to Income tax history, choose the year, then Amend. A registered tax agent can also lodge an amendment for you.

## How long do I have?

The ATO says:

- Individuals generally have **2 years** to amend, starting from the day after the notice of assessment is sent.
- Sole traders have **4 years**, from the 2024-25 year.
- You can request more than one amendment within that period.

So if your 2025-26 notice of assessment was sent in August 2026, you generally have until August 2028. Do not leave it to the end of the period. Records are easier to find while the year is still fresh, and any money owed to you arrives sooner.

## Which mistakes do students fix most often?

These are the six mistakes we see most often on student returns, and how each one is fixed.

**1. The Medicare levy exemption was missed.** Many students are not entitled to Medicare because they have OSHC. They may be able to claim an exemption from the Medicare levy. To claim it, you need a Medicare Entitlement Statement (MES) from Services Australia. The ATO says you should wait for the MES before lodging, and that it can take up to 8 weeks.

If you lodged before the MES arrived, the levy may have been charged. Once the MES arrives, you can amend your return to claim the exemption. Remember that an MES does not automatically mean you are exempt, and that any dependants, including a spouse, must also be exempt.

**2. The wrong residency answer.** A student enrolled in a course of 6 months or more **may be** an Australian resident for tax purposes. Some students answer "foreign resident" without checking, and miss the tax-free threshold. Others answer "resident" when they may not be. Both can be fixed by an amendment, but the answer must match your real situation. If you are unsure, get advice before you amend.

**3. A job was left out.** This often happens when a student lodges before every income statement is marked "Tax ready", or when a short job from the start of the year is forgotten. Check your income statements in myGov. If a job is missing, add it by amendment. This may reduce your refund or create a tax bill, but adding it yourself is better than the ATO finding it later.

**4. ABN income in the wrong place.** ABN income has no tax taken out, and it must go on the return as business income with any business expenses. If it was put in with wages, or left out, the result is wrong. Business income reported correctly can also allow the small business income tax offset.

**5. A deduction was missed.** A forgotten work deduction can be added if it meets the rules: you paid for it yourself and were not reimbursed, it relates directly to earning your income, and you have a record. Study costs are a common question for students. The ATO says self-education is only claimable if it has a sufficient connection to your current job. A course that helps you get a new job, or that is only generally related, does not qualify.

**6. Bank interest was forgotten.** Interest from an Australian bank account is income. A small amount is easy to miss, especially if you have a savings account you rarely use. Add it by amendment, together with any tax the bank withheld because it did not have your TFN.

## What do I need before I amend?

Have the documents ready before you start. For a Medicare change, you need the Medicare Entitlement Statement. For a missing job, you need the income statement from myGov. For a deduction, you need the receipt and a note of how it relates to your work. For a residency change, you need facts such as your course length, your enrolment and where you lived. If the ATO asks questions later, these documents are your answer.

## Worked example

Jun lodged his 2025-26 return in July 2026. The Medicare levy was charged because his Medicare Entitlement Statement had not arrived. In September the statement arrives. In October he notices he also forgot $35 of bank interest.

Jun makes one amendment that does both: claims the Medicare levy exemption and adds the $35 of interest. He is well inside the 2-year period. If he had already made a separate amendment for the interest, he could still make another one, because more than one amendment is allowed.

## Amend or object?

Amend when the mistake is in your own return. Object when you disagree with a decision the ATO made. If the ATO has written to you asking about your return, reply to that letter with your records rather than lodging a new amendment straight away.

## What to do next

- Find your notice of assessment and check the date.
- Compare your return with your income statements, bank interest and receipts.
- Collect the documents that support the change.
- Lodge the amendment in myTax, or ask a registered tax agent.
- Keep your Australian bank account open if you expect money back.

If you think your return needs fixing, you can message Student Visa Tax on WhatsApp and we can look at it with you.`,
    faq: [
      { q: "Can I amend my return more than once?", a: "Yes. The ATO says you can request more than one amendment within the time limit." },
      { q: "Will an amendment get me in trouble?", a: "Correcting your own mistake is a normal part of the tax system. It is better than the ATO finding the error later." },
      { q: "My Medicare Entitlement Statement arrived after I lodged. What do I do?", a: "You can amend your return to claim the Medicare levy exemption, as long as you are within the time limit and meet the rules for the exemption." },
    ],
    sources: [
      { label: "ATO: Time limits on amendments", href: "https://www.ato.gov.au/individuals-and-families/your-tax-return/amend-your-tax-return/time-limits-on-amendments" },
      { label: "ATO: Request an amendment", href: "https://www.ato.gov.au/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/supporting-documents-for-my-tax/request-an-amendment" },
      { label: "ATO: Not entitled to Medicare benefits", href: "https://www.ato.gov.au/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/not-entitled-to-medicare-benefits" },
    ],
  },
  {
    slug: "owe-the-ato-international-students",
    category: "Tax return",
    published: "2026-10-27", updated: "2026-10-27",
    title: "Owe the ATO money? A guide for international students",
    description: "Why students end up with a tax bill, what to do when the notice arrives, how a payment plan works online, and why leaving Australia does not make the debt go away.",
    answer: "If you owe the ATO and cannot pay in full by the due date, you may be able to set up a payment plan online if you owe $200,000 or less. Interest can apply to unpaid amounts, so paying in the shortest time you can manage costs less.",
    body: `Most students expect a refund at tax time, so a tax bill can be a shock. It usually has a simple cause, and there are clear steps to deal with it. This guide explains why students end up owing, what to do first, and how a payment plan works.

## Why do students end up owing tax?

The most common causes are:

- **The tax-free threshold was claimed from two jobs.** The ATO says you generally claim it from one payer only. If you claim it from more than one, too little tax is taken out in total and you may get a bill.
- **ABN income.** Nobody takes tax out of ABN income. The tax is worked out on your return, so a student who earned ABN income often owes something.
- **The wrong residency answer on a TFN declaration.** If you told your employer you are a resident and you are actually a foreign resident, too little tax may have been taken out. Foreign residents do not get the tax-free threshold.
- **Cash work.** Cash income must be declared, and often no tax was taken out.

## What should I do when the notice arrives?

First, read your notice of assessment carefully. Check the amount, the due date, and the reason. Then check if the return was correct. If the return has a mistake, for example a missing deduction or the Medicare levy charged when you have a Medicare Entitlement Statement, you may be able to amend it, which could reduce the amount.

If the amount is right, decide if you can pay it in full by the due date. If you can, pay it. If you cannot, set up a payment plan before the due date if possible.

## How does a payment plan work?

The ATO says:

- If you owe **$200,000 or less**, you may be able to set up a plan online. In ATO online services through myGov, go to Tax, then Payments, then Payment plans.
- You can also use the ATO self-help phone service if you owe $200,000 or less. Have your TFN and the full amount owing ready.
- A registered tax agent can set up a plan for you.
- You can only set up one plan at a time online.

The online system guides you to pay in the shortest time you can, to help you save on interest. Direct debit is the easiest way to keep up with payments. The ATO says credit cards will no longer be accepted after 30 June 2027, so a plan linked to a credit card would need to change before then.

If you need more than 2 years, need hardship support, or could not set up a plan online, you need to phone the ATO.

## Does interest apply?

Yes. The ATO charges interest, called the general interest charge (GIC), on tax that is paid late. The rate changes over time, so we do not quote it here. The ATO also says that GIC incurred on or after 1 July 2025 cannot be claimed as a deduction. This means the longer the debt stays unpaid, the more it costs.

Lodging late is a separate problem. The ATO can apply a failure to lodge penalty. It usually warns people first and generally does not apply it in isolated cases. Lodging on time, even if you cannot pay yet, is always the better choice.

## Worked example

Priya had two part-time jobs in 2025-26 and claimed the tax-free threshold from both. Each employer took out tax as if it was her only job. When she lodged, her notice of assessment showed $640 to pay.

Priya cannot pay it all at once. She logs in to myGov, goes to ATO online services, then Tax, Payments, Payment plans. She sets up fortnightly direct debits from her Australian bank account. She also gives her second employer a new TFN declaration that does not claim the threshold, so the problem does not happen again next year.

## What if I am leaving Australia?

Leaving Australia does not cancel a tax debt. If you are planning to finish your course and go home, deal with any debt before you leave. It is much easier while you still live in Australia and have an Australian bank account for direct debits.

If you are due a refund for another year, the ATO can use it to pay an existing debt. Keep your contact details up to date in myGov, so letters about the debt reach you after you move.

## How do I avoid a bill next year?

- Claim the tax-free threshold from one employer only, usually the one that pays you the most.
- Answer the residency question on your TFN declaration carefully.
- If you have ABN income, set aside part of each payment for tax.
- Declare all income, including cash and tips.
- You can ask an employer to take out more tax if you think too little is being withheld.

## What to do next

- Read your notice of assessment and check the due date.
- Check whether the return itself was correct.
- Pay in full if you can, or set up a payment plan before the due date.
- Fix the cause, such as a second TFN declaration, so it does not repeat.

If you are not sure why you owe tax, you can message Student Visa Tax on WhatsApp and we can go through it with you.`,
    faq: [
      { q: "Can I set up an ATO payment plan online?", a: "Yes, if you owe $200,000 or less. In ATO online services through myGov, go to Tax, then Payments, then Payment plans." },
      { q: "Does interest stop once I am on a payment plan?", a: "No. Interest can still apply to the unpaid amount, which is why the ATO encourages you to pay in the shortest time you can." },
      { q: "Does my tax debt go away if I leave Australia?", a: "No. Leaving Australia does not cancel a tax debt. It is easier to sort it out before you go." },
    ],
    sources: [
      { label: "ATO: Setting up a payment plan", href: "https://www.ato.gov.au/individuals-and-families/paying-the-ato/help-with-paying/payment-plans/setting-up-a-payment-plan" },
      { label: "ATO: Interest charged by the ATO", href: "https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/cost-of-managing-tax-affairs/interest-charged-by-the-ato" },
      { label: "ATO: Income from more than one job", href: "https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job" },
    ],
  },
  {
    slug: "piece-rates-farm-work-student-visa",
    category: "Work",
    published: "2026-10-27", updated: "2026-10-27",
    title: "Piece rates on farms: what students need to know",
    description: "Picking fruit in the uni holidays and paid per bin? Under the Horticulture Award you must still earn at least your hourly rate each day. How to check your pay.",
    answer: "Yes, farms can pay per bin, kilo or tray under the Horticulture Award, but employees must still get at least the minimum hourly rate for their classification for the hours worked each day. If the pieces pay less, the employer must pay the difference.",
    body: `Some international students spend part of their university holidays picking or packing fruit and vegetables. Many farms pay by the piece: per bin, per kilogram or per tray. This can be good money for fast workers, but it is also an area where underpayment happens. This guide explains the rules in simple terms and how to check your pay. Before you take any job, check your visa conditions with Home Affairs.

## What is a piece rate?

A piece rate pays you for what you produce, not for your time. For example, a set amount for each bin of apples, each kilogram of strawberries or each tray of blueberries. Under the Horticulture Award, farms can use piece rates, but only if they follow the rules.

## What is the minimum hourly guarantee?

Fair Work says that pieceworkers under the Horticulture Award must be paid at least the hourly rate for their classification, multiplied by the hours they worked **each day**. If your piece earnings are higher, you get the higher amount. If they are lower, the employer must pay the difference.

This guarantee has applied from the first pay period starting on or after 28 April 2022. It means a slow first day, bad weather or a poor block of trees cannot push your pay below the minimum for the hours you worked.

For casual employees, the hourly rate used for this guarantee includes the 25% casual loading.

## How must the piece rate be set?

Fair Work says the piece rate must be high enough that an average competent worker can earn at least 15% more per hour than the pieceworker hourly rate. It is not enough for only the fastest workers to reach the minimum.

Before piecework starts, the employer must make a **piecework record**, sign it and give it to you. The piece rate must be set before this record is made. The employer must also keep a record of all the hours you worked and the piece rate that applied at the time.

Ask for your copy of the piecework record. If you do not get one, write down the rate you were told, the date, and who told you.

## Worked example

To keep the maths simple, imagine the minimum hourly rate for your classification, including casual loading, is $30. This is a round number for the example only. Use the Fair Work Pay Calculator to find your real rate.

On Monday you work 7 hours and pick 20 bins at $8 per bin.

- Piece earnings: 20 x $8 = $160.
- Minimum for the day: 7 x $30 = $210.
- Top-up owed: $210 minus $160 = $50.

Your pay for Monday must be at least $210. On Tuesday you work 7 hours and pick 32 bins: 32 x $8 = $256. That is more than $210, so you get $256.

Because the guarantee works per day, a fast Tuesday does not cancel out a slow Monday. Each day must reach the minimum on its own.

## What should I watch for, and what should I record?

These are the common problems with piece rate pay:

- **No piecework record**, or a rate that changes without a new record.
- **Hours not counted**, such as time waiting for bins, moving between rows, training or packing.
- **Bins or weights undercounted** on the tally.
- **No top-up** on slow days.
- **Deductions** for accommodation, transport or food that you did not agree to in writing.
- **Payslips missing**. Fair Work says payslips must be given within 1 working day of payday.

Your own notes are strong evidence if something goes wrong. Each day, record:

- Your start and finish times and your breaks.
- How many bins, kilograms or trays you picked.
- The piece rate you were paid.
- Photos of tally sheets or tickets.

At the end of the week, check each day: piece earnings compared with hours x hourly rate. Fair Work has a free app called Record My Hours that can help you track your shift times.

## How is piece rate pay taxed?

Piece rate pay is wages, like any other job. Your employer takes tax out based on your TFN declaration. Super at 12% must be paid for you on top of your wages, and from 1 July 2026 employers must pay super at the same time as wages. Your farm income appears on your income statement and goes on your tax return.

Remember the tax-free threshold rule. If you already have a job during the semester and you claim the threshold there, do not claim it again from the farm. Claiming it from two employers can lead to a tax bill.

If a farm asks you to get an ABN to pick fruit, be careful. An employer should not ask you to get an ABN as a condition of a job. Contractors do not get the hourly guarantee, super or payslips.

## What if I think I was underpaid?

First, raise it with the employer and show your records. If it is not fixed, contact the Fair Work Ombudsman on 13 13 94, or use their free interpreter service on 13 14 50. Fair Work says visa holders have the same workplace rights as everyone else, and a visa will not be cancelled for contacting them for help.

## What to do next

- Ask for your piecework record before you start.
- Keep a daily log of hours and pieces.
- Check every payslip against your log.
- Claim the tax-free threshold from one employer only.

At tax time, if you would like help with your farm income and other jobs, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: "Is the minimum guarantee worked out per week or per day?", a: "Fair Work describes it per day: at least the hourly rate for your classification multiplied by the hours you worked each day." },
      { q: "Does the casual loading apply to piece rates?", a: "Yes. For casual pieceworkers, the hourly rate used for the guarantee includes the 25% casual loading." },
      { q: "Can I contact Fair Work if I am on a student visa?", a: "Yes. Fair Work says visa holders have the same workplace rights as all employees, and a visa will not be cancelled for contacting them for help." },
    ],
    sources: [
      { label: "Fair Work: Pay and piece rates (Horticulture)", href: "https://horticulture.fairwork.gov.au/pay-and-piece-rates" },
      { label: "Fair Work: Piecework records", href: "https://horticulture.fairwork.gov.au/piecework-records" },
      { label: "Fair Work: Visa holders and migrants", href: "https://www.fairwork.gov.au/find-help-for/visa-holders-migrants" },
    ],
  },
  {
    slug: "labour-hire-agencies-student-visa",
    category: "Work",
    published: "2026-10-27", updated: "2026-10-27",
    title: "Working through a labour hire agency on a student visa",
    description: "When an agency places you at a warehouse, farm or event, the agency is your employer. Who pays your wages and super, what to check before you sign, and tax tips.",
    answer: "When you work through a labour hire agency, the agency is your employer, not the business where you do the work. The agency is responsible for your pay, tax, super, payslips and other entitlements.",
    body: `Labour hire agencies are a common way for international students to find casual work. An agency might send you to a warehouse one week, an event the next, and a factory after that. It can be a quick way to get shifts that fit around classes. But it is important to understand who your employer is and what you are owed. Before you start any job, check your visa conditions with Home Affairs.

## Who is my employer?

Fair Work says a labour hire employee is employed by the labour hire employer, which places them with a host business. The **labour hire employer**, the agency, is responsible for your pay and entitlements. The host business is where you work and who tells you what to do each day, but it does not pay you.

This matters when something goes wrong. If your pay is short, your complaint is with the agency. Make sure you know the agency's full legal name and ABN before you start. It should appear on your payslips.

## What should the agency give me?

As your employer, the agency should:

- Pay you at least the correct minimum rate for the work, including casual loading and penalty rates where they apply.
- Take tax out of your pay, based on your TFN declaration.
- Pay super for you. The rate is 12%, and from 1 July 2026 employers must pay super at the same time as wages.
- Give you a payslip within 1 working day of payday.
- Report your pay to the ATO, so it appears on your income statement.

Visa holders have the same workplace rights as everyone else.

## What are protected pay rates?

The Fair Work Commission can make an order called a regulated labour hire arrangement order. When an order applies, labour hire workers placed with that host cannot be paid less than the host would pay its own employees under its workplace instrument. This is called the "protected pay rate".

Fair Work says the protected rate does not apply to some workers, including those engaged for a short term, usually 3 months or less. Many student placements are short, so it may not apply to you. But if you have a long placement and suspect you earn less than the host's own staff for the same work, you can ask the agency whether an order applies.

## What should I check before I sign, and what are the warning signs?

Ask these questions, and ask for the answers in writing:

- What is the legal name and ABN of the agency?
- Which award covers the work, and what is my hourly rate?
- Which super fund will you pay into? You can choose your own fund.
- When is payday, and how will I get my payslips?
- Will any money be taken out of my pay, and why?

Some states and territories also run labour hire licensing schemes. If you work in one of those places, you can check whether the agency holds a licence.

Be careful if you see any of these warning signs:

- The agency asks you to get an ABN for work that is really a normal job. An employer should not ask you to get an ABN as a condition of employment.
- No payslips, or payslips that do not show your hours and rate.
- One flat rate for all hours, even on weekends or late at night when penalty rates may apply.
- Money taken from your pay for uniforms, transport or training without your written agreement.
- Pay held back until you finish a placement.

## What about tax with an agency?

An agency is one employer, even if it sends you to many host sites. That makes your tax simpler. You fill in one TFN declaration for the agency, not one for each site.

The tax-free threshold rule still matters. Many students have an agency job and another job, such as a café or a tutoring centre. The ATO says you generally claim the threshold from one payer only, usually the one that pays you the most. If you claim it from both, too little tax may be taken out and you may get a bill.

## Worked example

Kenji studies in Sydney. He works 12 hours a week at a café and also takes agency shifts at a warehouse during the holidays. The café pays him more across the year, so he claims the tax-free threshold there. On the agency's TFN declaration, he answers no to the threshold question.

At the end of the year Kenji has two income statements in myGov: one from the café and one from the agency. His tax return includes both. Because he claimed the threshold from one employer only, the tax taken out is closer to the right amount.

## What if I am underpaid?

Work out your real hourly rate for a pay period: total pay before tax divided by all the hours you worked. Compare it with the rate you should get. If it is lower, raise it with the agency first, in writing. If that does not fix it, contact the Fair Work Ombudsman on 13 13 94. Fair Work says a visa will not be cancelled for contacting them for help.

If your super is missing, check your super fund and ATO online services. You can report unpaid super to the ATO with its online tool.

## What to do next

- Get the agency's name, ABN and your pay rate in writing.
- Keep a record of your shifts at each host site.
- Check every payslip and your super account.
- Claim the tax-free threshold from one employer only.

At tax time, if you would like help combining your agency work with other jobs, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: "Is the host business or the agency my employer?", a: "The agency. Fair Work says the labour hire employer is responsible for your pay and entitlements, even though you work at the host business." },
      { q: "Do I need a new TFN declaration for each host site?", a: "No. The agency is your employer, so you give one TFN declaration to the agency." },
      { q: "Can an agency ask me to get an ABN?", a: "An employer should not ask you to get an ABN as a condition of employment. If the work is really a job, you should be paid as an employee." },
    ],
    sources: [
      { label: "Fair Work: Protected pay rates for labour hire employees", href: "https://www.fairwork.gov.au/find-help-for/labour-hire-and-supply-chains/protected-pay-rates-for-labour-hire-employees" },
      { label: "Fair Work: Pay slips", href: "https://www.fairwork.gov.au/pay-and-wages/paying-wages/pay-slips" },
      { label: "ATO: Income from more than one job", href: "https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job" },
    ],
  },
  {
    slug: "how-to-read-a-payslip-international-students",
    category: "Work",
    published: "2026-10-27", updated: "2026-10-27",
    title: "How to read a payslip line by line: international students",
    description: "A line-by-line guide to an Australian payslip for students: gross pay, tax withheld, super, deductions, net pay and year-to-date totals, with a worked example.",
    answer: "An Australian payslip shows how your pay was worked out: your hours and rate, gross pay, tax withheld, any deductions, net pay and the super your employer paid. Fair Work says you must get one within 1 working day of payday.",
    body: `Your payslip is the best record of your work in Australia. It shows your hours, your rate, your tax and your super in one place. Many students only look at the final number. This guide goes through a payslip line by line, so you know what each part means and how to check it.

## What must a payslip show?

Fair Work says employers must give you a payslip within 1 working day of payday. It can be paper or electronic. It must show:

- Your name and your employer's name, and the employer's ABN if they have one.
- The pay period and the payment date.
- Gross pay and net pay.
- Your ordinary hourly rate and the hours worked at that rate.
- Any loadings, allowances, penalty rates or bonuses.
- Each deduction.
- The super contributions and the name of the super fund.

Knowingly giving a false or misleading payslip is unlawful.

## Your details, hours and rate

**Your details and the pay period.** Check your name and the dates. The pay period tells you which days the pay covers. Compare it with your own record of shifts. If you worked on a day that is not in the period, it should appear on the next payslip.

**Hours and hourly rate.** This is the most important line, because everything else is calculated from it. Check:

- The number of hours matches your own record, not just the roster.
- The hourly rate is at least the minimum for your job. From 1 July 2026 the national minimum wage is $26.44 an hour, and award rates for many jobs are higher. The Fair Work Pay Calculator shows your rate.
- If you are casual, a casual loading should usually be included.

**Penalty rates and allowances.** Fair Work says employees may be entitled to higher rates for weekends, public holidays, overtime, and late night or early morning shifts. The exact rate depends on your award or agreement. If you worked a Sunday and every hour shows the same rate, ask your employer to explain. Some jobs also have allowances, for example for using your own tools or for certain duties. These should be listed separately.

## Gross pay and tax withheld

**Gross pay.** Gross pay is your total pay before tax. It equals your hours times your rate, plus any penalty rates, loadings and allowances. Do this sum yourself. It takes one minute.

**Tax withheld.** This is the tax your employer took out and sent to the ATO for you. How much depends on your TFN declaration:

- If you **may be** a resident and claimed the tax-free threshold from this employer, the tax on a small part-time pay may be low or even zero.
- If you are a foreign resident, you have no tax-free threshold. For 2025-26 foreign residents pay 30% from the first dollar, so expect roughly 30 cents in every dollar.
- If you did not give your TFN within 28 days, the employer must take out tax at the top rate plus the Medicare levy.

The tax withheld is not the final tax. Your tax return checks if the total withheld across the year was right. If the tax on your payslip looks far too high or too low, check what you answered on your TFN declaration for that employer.

## Deductions and net pay

**Deductions.** Any money taken out other than tax must be listed, with what it is for. Examples are union fees or salary sacrifice. An amount you did not agree to, or that is not explained, is a warning sign.

**Net pay.** Net pay is gross pay minus tax withheld minus deductions. It should match the money in your bank account to the cent. Super is not taken out of your pay. It is paid by your employer on top.

## Super and year-to-date totals

**Super.** Super should be 12% of your ordinary time earnings, paid on top of your wages, into the fund shown. From 1 July 2026, under Payday Super, employers must pay super at the same time as wages, and it must reach your fund within 7 business days. Check your super fund account from time to time to make sure the money has arrived.

**Year-to-date totals.** Many payslips show totals from 1 July. These help you see your income for the year and check your income statement at tax time. If the year-to-date gross on your last payslip does not match your income statement, ask your employer.

## Worked example

Ana is a casual café worker. Suppose her base rate is $26.44, the national minimum wage, and a 25% casual loading applies. Her casual rate is $33.05 an hour. This week she works 20 ordinary hours.

- Gross pay: 20 x $33.05 = $661.00.
- Super: 12% x $661.00 = $79.32, paid to her fund on top.
- Tax withheld: depends on her TFN declaration, as explained above.
- Net pay: $661.00 minus tax withheld. No other deductions.

If one of those hours was on a Sunday, a penalty rate may apply under her award, so the gross would be higher.

## What to do next

- Save every payslip as a PDF or photo when you get it. App access can stop when a job ends.
- Keep your own record of hours.
- Check hours, rate, gross, tax, net and super each pay.
- If something looks wrong, ask your employer in writing. If it is not fixed, contact the Fair Work Ombudsman on 13 13 94.

At tax time, your payslips help make your return accurate. If you want help, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: "How soon must I get a payslip?", a: "Fair Work says within 1 working day of payday. It can be paper or electronic." },
      { q: "Is super taken out of my pay?", a: "No. Super is paid by your employer on top of your wages. It should not reduce your net pay." },
      { q: "Why is tax on my payslip different from my friend's?", a: "Tax withheld depends on your TFN declaration, including your residency answer and whether you claimed the tax-free threshold from that employer." },
    ],
    sources: [
      { label: "Fair Work: Pay slips", href: "https://www.fairwork.gov.au/pay-and-wages/paying-wages/pay-slips" },
      { label: "Fair Work: Penalty rates", href: "https://www.fairwork.gov.au/pay-and-wages/penalty-rates-allowances-and-other-payments/penalty-rates" },
      { label: "Fair Work: Payday Super", href: "https://www.fairwork.gov.au/newsroom/news/payday-super-new-rules-starting-1-july-2026" },
    ],
  },
]
