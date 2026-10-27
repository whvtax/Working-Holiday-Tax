import type { LongArticle } from '../types'

const ATO = 'https://www.ato.gov.au'
const FW = 'https://www.fairwork.gov.au'

export const LONG_EN_03: readonly LongArticle[] = [
  {
    slug: 'penalty-rates-student-visa',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Penalty rates on a student visa: weekend and night pay',
    description: 'Weekend, public holiday and late night shifts can pay more than weekday hours. How penalty rates work for international students and how to check your payslip.',
    answer: 'Yes. If an award or registered agreement covers your job, you may be entitled to penalty rates for weekends, public holidays, overtime, late nights and early mornings, on a student visa the same as anyone else. The exact rate depends on your award or agreement, not on your visa.',
    body: `Many international students work the shifts other people do not want: Saturday brunch, Sunday dinner, late closes and public holidays. These are often the hours that fit around classes. They are also the hours where higher pay rates can apply. This guide explains what penalty rates are, where they come from, and how to check that you are getting them.

## What are penalty rates?

Penalty rates are higher pay rates for particular hours or days. The Fair Work Ombudsman says employees may be entitled to them when they work on weekends, on public holidays, overtime, late at night or early in the morning.

The word "penalty" can sound strange. It does not mean you did something wrong. It means the employer pays more because the hours are outside normal working time.

## Where do penalty rates come from?

They come from the award or the registered agreement that covers your job. An award is a legal document that sets minimum pay and conditions for an industry or a type of work, such as hospitality, retail or cleaning. A registered agreement is made for one business or group of businesses.

This means:

- Your penalty rates are not a gift from your manager. They are a legal minimum.
- Different industries have different rates. A Sunday in a café and a Sunday in a supermarket may not pay the same.
- Your classification (your level under the award) changes the base rate, and the penalty is worked out from that base.

Your visa does not change any of this. The Fair Work Ombudsman says visa holders have the same workplace rights as all other employees.

## Do casual students get penalty rates too?

Yes, where the award gives them. Most students work as casuals. A casual employee usually gets a casual loading on top of the base rate, because casuals do not get paid leave. Many awards then add a weekend or public holiday rate as well. How the loading and the penalty combine is set by your award, so check the award rather than guessing.

A single flat hourly rate for every hour, including Sundays and public holidays, is a warning sign. It can be lawful in some cases, but only if it is at least as much as you would get under the award for every shift. Many flat rates are not.

## A worked example (made-up rates)

The rates below are invented to show the method only. Your real rates come from your award.

Imagine a student, Mai, works in a café. Her award base rate for her level is $30.00 an hour. Her award says Sunday hours are paid at 150% of that rate.

- Thursday, 5 hours at the ordinary rate: 5 x $30.00 = $150.00
- Sunday, 6 hours at 150%: 6 x $45.00 = $270.00
- Total for the week: $420.00

If Mai was paid $30.00 for all 11 hours, she would get $330.00. The gap is $90.00 for just one week. Over a semester of Sunday shifts, that adds up.

## How do I check my payslip?

Your employer must give you a payslip within one working day of payday. The Fair Work Ombudsman says it must show your ordinary hourly rate, the hours worked at that rate, and any loadings, allowances or penalty rates. So a correct payslip normally splits your hours by rate.

Check these things each pay:

- Are weekend or public holiday hours shown on their own line?
- Is the rate on those lines higher than your weekday rate?
- Do the hours match your roster and your own notes?
- Is super shown, and the fund named?

The Fair Work Ombudsman has a free Pay and Conditions Tool. You choose your industry and job, and it works out your award and the rates for each type of shift.

## How are penalty rates taxed?

Penalty rates are wages, so they are taxed like the rest of your pay. They go into the same total on your income statement.

A big week with many Sunday hours can look like heavy tax. That is because tax taken from each pay is worked out as if every pay were that size. At the end of the financial year, your tax return looks at your whole year. If you may be an Australian resident for tax purposes, you may get some of that tax back, if any too much was taken. If you are a foreign resident for tax purposes, there is no tax-free threshold, so the result can be different.

Employers also pay super on top of your ordinary wages. The super guarantee rate is 12%.

## What if I was not paid penalty rates?

Start with the facts. Find your award with the Pay and Conditions Tool, list each shift with the day and hours, and compare it with your payslips. Many mistakes are payroll set-up errors.

Then ask your employer in writing, with the dates and the amounts. Keep it calm and short. If it is not fixed, you can contact the Fair Work Ombudsman on 13 13 94. Help is free, and an interpreter is available on 13 14 50. The Fair Work Ombudsman says a visa will not be cancelled for contacting it for help.

## What to do next

- Find your award and classification with the Pay and Conditions Tool.
- Save every roster as a screenshot when it is published.
- Check one payslip that includes a weekend shift, line by line.
- Keep all payslips until after your tax return is done.

When tax time comes, students can message Student Visa Tax on WhatsApp to have their return prepared.`,
    faq: [
      { q: 'Do I get penalty rates if my contract says I am paid a flat rate?', a: 'A flat rate is only lawful if it gives you at least what the award gives you for every shift. If your Sunday or public holiday hours would pay more under the award, the flat rate may be too low.' },
      { q: 'Does my visa affect my penalty rates?', a: 'No. Visa holders have the same workplace rights as all other employees, including penalty rates where the award gives them.' },
      { q: 'Are penalty rates taxed at a higher rate?', a: 'No. They are ordinary wages and go into your total income for the year. The tax taken from a big week can look high, and your tax return works out the correct amount for the whole year.' },
    ],
    sources: [
      { label: 'Fair Work Ombudsman: Penalty rates', href: `${FW}/pay-and-wages/penalty-rates-allowances-and-other-payments/penalty-rates` },
      { label: 'Fair Work Ombudsman: Pay slips', href: `${FW}/pay-and-wages/paying-wages/pay-slips` },
      { label: 'Fair Work Ombudsman: Visa holders and migrants', href: `${FW}/find-help-for/visa-holders-migrants` },
    ],
  },
  {
    slug: 'cash-in-hand-legal-student-visa',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Is cash in hand legal for international students?',
    description: 'Being paid in cash is not illegal on its own. What your employer must still do, what you lose when they do not, and how a student declares cash wages at tax time.',
    answer: 'Being paid in cash is not illegal by itself. What matters is that your employer still withholds tax, pays super, gives you a payslip and pays at least the minimum rate. Cash wages are still income, and you must declare them in your tax return.',
    body: `A restaurant owner offers you shifts and says, "I pay cash, is that OK?" Many international students hear this in their first months in Australia. The answer depends on what comes with the cash, not on the cash itself.

## Is it legal to be paid in cash?

Paying wages in cash is not, on its own, against the law. Some small businesses still pay this way. But an employer who pays in cash has the same duties as an employer who pays by bank transfer.

Those duties include:

- Paying at least the minimum wage or the award rate. The national minimum wage is $26.44 an hour from the first full pay period starting on or after 1 July 2026, and award rates are often higher.
- Giving you a payslip within one working day of payday.
- Paying super for you at the super guarantee rate of 12%. Temporary residents, including students, are generally eligible.
- Taking tax out of your pay and sending it to the ATO, and reporting your pay to the ATO.

If your employer does all of this and hands you notes in an envelope, the method of payment is not the problem.

## What is "cash in hand" usually code for?

In practice, "cash in hand" often means the job is off the books. No tax is taken out, no payslip is given, no super is paid and nothing is reported to the ATO. Sometimes the rate is also below the award.

This kind of arrangement mostly helps the employer, not you. You may lose:

- **Your super.** 12% of your ordinary wages that should go into your fund. When you leave Australia for good and your visa has ended, you may be able to claim it as a departing Australia superannuation payment.
- **Your proof of work.** With no payslips and no income statement, it is harder to show you worked there if you are ever underpaid.
- **Your fair pay.** Off the books jobs are often paid below the award, with no weekend or public holiday rates.
- **Your peace of mind at tax time.** You still have to declare the income, but you have to build the numbers yourself.

## Do I have to declare cash wages?

Yes. The ATO says assessable income includes salary and wages, tips, gratuities and other payments for your services, and that cash income must be declared. It does not matter that no tax was taken out or that the employer did not report it.

If you may be an Australian resident for tax purposes, the tax-free threshold of $18,200 can apply. For 2025-26, resident rates are nil up to $18,200 and 16% from $18,201 to $45,000. If you are a foreign resident for tax purposes, tax starts at 30% from the first dollar.

## A worked example

Lin may be a resident for tax purposes for 2025-26. She earned $14,000 from a job with payslips and $6,000 in cash from weekend shifts with no tax taken out. Her total income is $20,000.

- Income above the tax-free threshold: $20,000 minus $18,200 = $1,800
- Tax at 16% on $1,800: $288, before any offsets

If Lin left out the cash, her return would be wrong, even though the payroll job alone is under the threshold. Declaring the full $20,000 is the correct position. Lin may also be able to claim the low income tax offset, which can reduce the tax on that amount.

The result would be very different if Lin were a foreign resident for tax purposes. There is no tax-free threshold for foreign residents, so for 2025-26 the tax would be 30% of the full $20,000, which is $6,000. This is one reason why working out your residency for tax purposes matters before you lodge. Residency depends on your own situation, such as the length of your course and how long you stay in Australia.

## How do I declare cash if I have no records from the employer?

You use your own records. The ATO expects your return to be right, so collect what you can:

- A diary or notes app with the date, start time and finish time of each shift
- The amount you were paid each time
- Messages from the employer about shifts or pay
- Bank records if you deposited the cash
- The business name and address

Keep these records. If the ATO asks questions later, you can show how you worked out the numbers. The ATO says to keep written evidence for 5 years from when you lodge, so save copies somewhere safe, not only on your phone.

## What warning signs should I look for before I start?

An employer who plans to do things properly will ask for your tax file number and give you a TFN declaration form in your first days. Be careful if:

- Nobody asks for your TFN
- You are told payslips are "not needed"
- Super is never mentioned
- The rate is much lower than what friends earn in similar jobs
- You are asked to keep the arrangement quiet

Your visa does not reduce your workplace rights. The Fair Work Ombudsman says visa holders have the same rights as other employees and that a visa will not be cancelled for asking it for help. For any question about your own visa conditions, check with the Department of Home Affairs.

## What to do next

- Ask the employer, in writing, if they will give you payslips and pay super.
- Write down every shift and every cash payment from day one.
- If you already worked cash shifts, add them to your income for the year.
- If you think you were underpaid, the Fair Work Ombudsman can help on 13 13 94.

If you have cash income to add to your return, you can message Student Visa Tax on WhatsApp and we will go through it with you.`,
    faq: [
      { q: 'My employer pays cash but gives me a payslip and pays super. Is that fine?', a: 'Yes, that can be a lawful arrangement. Check that the rate meets your award and that tax is being taken out and reported.' },
      { q: 'Will declaring cash income get me in trouble?', a: 'Declaring all your income is what the law asks of you. Leaving it out is the risky choice, because the ATO says cash income must be declared.' },
      { q: 'Can I still get super from a cash job?', a: 'Super should have been paid. You can ask the employer and, if it is not paid, report unpaid super to the ATO with its online tool. Records that show you worked there help.' },
    ],
    sources: [
      { label: 'ATO: Taxable, assessable and exempt income', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/income-you-must-declare/taxable-assessable-and-exempt-income` },
      { label: 'Fair Work Ombudsman: Pay slips', href: `${FW}/pay-and-wages/paying-wages/pay-slips` },
      { label: 'ATO: Work out if you have to pay super', href: `${ATO}/businesses-and-organisations/super-for-employers/work-out-if-you-have-to-pay-super` },
    ],
  },
  {
    slug: 'workplace-rights-international-students',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Workplace rights for international students in Australia',
    description: 'Your student visa does not reduce your rights at work. Minimum pay, payslips, leave, super and free help from the Fair Work Ombudsman, explained in plain English.',
    answer: 'International students have the same workplace rights as all other employees in Australia. That includes minimum pay, payslips, super and, for permanent staff, paid leave, and free help from the Fair Work Ombudsman.',
    body: `Starting your first job in a new country can feel uncertain. You may not know what is normal, and you may worry that asking questions could cause problems with your visa. This guide sets out the main rights you have at work as an international student, and where to get free help.

## Do workplace laws cover students on a visa?

Yes. The Fair Work Ombudsman says visa holders and migrants have the same workplace rights as all other employees in Australia. Your nationality and your visa do not lower your pay or your protections.

The Fair Work Ombudsman also says that your visa will not be cancelled because you contacted it for help. It can help with your minimum entitlements even if you have breached a condition of your visa, although there may still be consequences under migration law. For questions about your own visa conditions, check with the Department of Home Affairs.

## What is the minimum I must be paid?

The national minimum wage is $26.44 an hour, or $1,004.90 for a 38 hour week, from the first full pay period starting on or after 1 July 2026. Most jobs are covered by an award, and award rates are often higher than the national minimum. Award minimum wages rose by 4.75% from 1 July 2026.

The Fair Work Ombudsman's Pay Calculator works out which award covers your job and what your rate should be. On top of the base rate, you may be entitled to:

- A casual loading, if you are a casual
- Penalty rates for weekends, public holidays, late nights, early mornings or overtime
- Allowances set by your award

## What paperwork must my employer give me?

Your employer must give you a payslip within one working day of payday. It can be paper or electronic. It must show, among other things, your gross and net pay, your ordinary hourly rate and hours, any penalty rates or loadings, each deduction, and the super paid and the fund name.

The Fair Work Ombudsman says it is unlawful to knowingly give a false or misleading payslip. If your employer does not give payslips at all, that is itself a problem.

Unpaid trials are a related question. Do you have to work for free first? Only in a narrow case. An unpaid trial is lawful only when it is a demonstration of your skills, under direct supervision, for no longer than needed. That can be one hour up to one shift, depending on the job. If the employer asks for more than that, you must be paid at least the minimum rate.

## What leave do I get?

It depends on whether you are casual or permanent.

- Full-time and part-time employees get 4 weeks of paid annual leave a year, based on their ordinary hours.
- Full-time employees get 10 days of paid sick and carer's leave a year. Part-time employees get it pro rata.
- Casual employees do not get most types of paid leave. They are entitled to 2 days of unpaid carer's leave per occasion, and 10 days of paid family and domestic violence leave a year.

## Do I get super?

Generally, yes. The ATO says employees, whether full-time, part-time or casual, are generally eligible for the super guarantee, and this includes temporary residents. The rate is 12% of your ordinary time earnings, paid on top of your wages.

From 1 July 2026, under Payday Super, employers pay super at the same time as wages, and it must reach your fund within 7 business days. When you leave Australia for good and your visa has ended, you may be able to claim your super as a departing Australia superannuation payment.

## What if I am called a contractor?

Some employers ask students to get an ABN and send invoices. If you really work as an employee, this does not change your rights. A contract that says "contractor" does not override the real relationship. The ABR also says an employer should not ask you to get an ABN as a condition of employment.

Signs you may be an employee: the business tells you how, when and where to work, gives you a roster, and you use its tools. Treating an employee as a contractor to avoid paying entitlements is called sham contracting, and it is illegal.

## Where can I get free help, and how does tax fit in?

- Fair Work Ombudsman: 13 13 94
- Translating and Interpreting Service: 13 14 50, ask for the Fair Work Ombudsman
- The Fair Work Ombudsman also has an anonymous report form if you do not want to give your name

Before you call, gather your rosters, payslips and any messages about pay. Clear records make it much easier to fix a problem.

Your rights at work also connect to tax. Your employer should take tax out of each pay and report it to the ATO. At the end of the financial year, this appears on your income statement in myGov. If you may be an Australian resident for tax purposes, the tax-free threshold of $18,200 can apply. Your tax return compares the tax taken out with the tax you really owe for 2025-26.

## A short checklist

- Look up your award rate with the Pay Calculator.
- Check that your first payslip arrives within one working day of payday.
- Make sure super appears on every payslip.
- Save rosters and payslips in one folder.

When your income statement is "Tax ready", students can message Student Visa Tax on WhatsApp to have their return prepared.`,
    faq: [
      { q: 'Can my employer pay me less because I am on a student visa?', a: 'No. Visa holders have the same workplace rights as all other employees, including minimum pay rates.' },
      { q: 'Will contacting the Fair Work Ombudsman affect my visa?', a: 'The Fair Work Ombudsman says your visa will not be cancelled because you contacted it for help. For questions about your visa conditions, check with Home Affairs.' },
      { q: 'Do casual students get any leave?', a: 'Casuals do not get most types of paid leave. They do get 2 days of unpaid carer\'s leave per occasion and 10 days of paid family and domestic violence leave a year.' },
      { q: 'Is the help free?', a: 'Yes. The Fair Work Ombudsman is a free government service, and an interpreter is available on 13 14 50.' },
    ],
    sources: [
      { label: 'Fair Work Ombudsman: Visa holders and migrants', href: `${FW}/find-help-for/visa-holders-migrants` },
      { label: 'Fair Work Ombudsman: Minimum wage increase starts today', href: `${FW}/newsroom/media-releases/2026-media-releases/july-2026/20260701-minimum-wage-increase-media-release` },
      { label: 'Fair Work Ombudsman: Casual employees', href: `${FW}/starting-employment/types-of-employees/casual-employees` },
      { label: 'ATO: Work out if you have to pay super', href: `${ATO}/businesses-and-organisations/super-for-employers/work-out-if-you-have-to-pay-super` },
    ],
  },
  {
    slug: 'how-to-ask-employer-for-back-pay-students',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'How to ask your employer for back pay as a student',
    description: 'A step by step method for international students: work out what you were owed, write to your employer, and know when to contact the Fair Work Ombudsman for free help.',
    answer: 'First work out what you should have been paid using your award, then ask your employer in writing with the dates and amounts. If it is not fixed, the Fair Work Ombudsman can help for free, and your visa will not be cancelled for contacting it.',
    body: `You compare your pay with a friend who does the same job, and something does not add up. Maybe your Sunday rate looks the same as your Monday rate. Maybe super is missing. This guide is a practical, step by step method for asking your employer to fix it.

## Step 1: Find out what you should have been paid

Do not start with the national minimum wage. Most jobs are covered by an award, and the award rate for your job and level is often higher. The national minimum wage is $26.44 an hour from the first full pay period starting on or after 1 July 2026, and award minimum wages rose by 4.75% at the same time.

Use the Fair Work Ombudsman's Pay Calculator. It asks about your industry and your job, finds the award, and shows the rates for:

- Ordinary hours
- Casual loading, if you are casual
- Weekend and public holiday hours (penalty rates)
- Late night or early morning hours, and overtime

Your level under the award (your classification) depends on the work you really do, not only your job title.

## Step 2: Collect your evidence

Most pay problems are about facts: which shifts you worked, for how long, and what you were paid. Collect:

- Every payslip. Employers must give one within one working day of payday.
- Rosters, saved as screenshots. Rostering apps often change or delete old weeks.
- Your own notes of start and finish times.
- Messages from your manager about shifts or pay.
- Bank statements showing what was paid into your account.

If your employer never gave you payslips, your own careful records still count. Not giving payslips is itself against the rules.

## Step 3: Work out the gap, shift by shift

Make a simple table with one line per shift: date, day, hours, the rate you were paid and the rate you should have been paid. Then multiply and add up the difference.

Here is an example with made-up rates. Say the award gives Ravi $30.00 an hour on weekdays and $45.00 on Sundays. He worked 6 hours every Sunday for 10 weeks, and was paid $30.00 for those hours.

- Correct Sunday pay: 6 x $45.00 = $270.00 a week
- What he got: 6 x $30.00 = $180.00 a week
- Gap: $90.00 a week, so $900.00 over 10 weeks

Do not forget super. Super is paid on ordinary time earnings at 12%, so a gap in base pay can also mean a gap in super.

## Step 4: Ask your employer in writing

Many underpayments are mistakes in payroll set-up, for example a rate that was not updated on 1 July. Start politely and assume it can be fixed.

Send a short email or message. Include:

- Your name, your job and the dates you worked
- What you were paid and what you believe the award says
- The total you think is owed, with your table attached
- A request for a reply by a set date, for example in 14 days

Keep your tone calm and factual. Do not threaten. A written request gives payroll something to act on and gives you a record.

A simple message could say: "Hi, I have checked my pay against the award for my job. I think my Sunday hours from March to May were paid at the weekday rate. I have attached a table with the dates, hours and amounts. Could you please check this and let me know by 30 June?" Short, polite and clear is best.

After you send it, keep a copy and note the date. If your employer agrees and pays you, check the next payslip to make sure the back pay is shown and that super was added.

## Step 5: If it is not fixed, get free help

If your employer does not reply, says no without reasons, or becomes angry, stop arguing and keep records. Contact the Fair Work Ombudsman:

- Phone 13 13 94
- Interpreter: 13 14 50
- Anonymous report form, if you do not want to give your name

The Fair Work Ombudsman says visa holders have the same workplace rights as all other employees, and that a visa will not be cancelled for asking it for help. It can help even if you breached a visa condition, although there may still be migration consequences. For any question about your own visa, check with Home Affairs.

## What about unpaid super?

If super is missing, you can first check your fund statements or ATO online services in myGov, which show contributions your employer reported. If it is still missing, you can report unpaid super with the ATO's online tool. You will need your TFN, the period and the employer's ABN if you have it. The ATO will tell you if it can collect the super. Not every report results in collection.

## How is back pay taxed?

Back pay is income. It should be paid through payroll, with tax taken out like any other wages. It will appear on your income statement for the financial year in which you receive it.

If you may be an Australian resident for tax purposes, the tax-free threshold of $18,200 can apply, and for 2025-26 resident rates start at 16% from $18,201. If you are a foreign resident for tax purposes, tax starts at 30% from the first dollar.

## Your checklist

- Find your award and level with the Pay Calculator.
- Collect payslips, rosters and notes.
- Build a shift by shift table of what is owed.
- Write one calm email with a reply date.
- If needed, contact the Fair Work Ombudsman on 13 13 94.

When the year ends, students can message Student Visa Tax on WhatsApp to include any back pay correctly in their return.`,
    faq: [
      { q: 'What if I already finished the job?', a: 'You can still ask for back pay after you leave. Your records are what matter, so keep payslips, rosters and messages.' },
      { q: 'Should I accept a cash payment to settle it?', a: 'Back pay is wages and should be paid through payroll with tax taken out. A cash settlement can leave out super and tax, so be careful.' },
      { q: 'Do I need a lawyer?', a: 'Usually not. The Fair Work Ombudsman is free and is the normal first place to go if your employer will not fix the problem.' },
    ],
    sources: [
      { label: 'Fair Work Ombudsman: Visa holders and migrants', href: `${FW}/find-help-for/visa-holders-migrants` },
      { label: 'Fair Work Ombudsman: Pay slips', href: `${FW}/pay-and-wages/paying-wages/pay-slips` },
      { label: 'ATO: Report unpaid super contributions from my employer', href: `${ATO}/calculators-and-tools/super-report-unpaid-super-contributions-from-my-employer` },
    ],
  },
  {
    slug: 'leave-entitlements-student-visa',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Annual leave and sick leave on a student visa',
    description: 'Do international students get paid leave? It depends on whether you are casual, part-time or full-time. What each type gets, and what to check in your final pay.',
    answer: 'Full-time and part-time employees, including students, get paid annual leave and paid sick and carer\'s leave. Casual employees do not get most types of paid leave; they are paid a casual loading instead.',
    body: `Most international students work casual jobs, but not all. Some have a part-time role with set hours, especially in their second or third year of study. The kind of job you have decides whether you get paid time off. This guide explains what each type of employee gets.

## Who gets paid annual leave?

The Fair Work Ombudsman says all employees, except casual employees, get paid annual leave. Full-time and part-time employees get 4 weeks of annual leave a year, based on their ordinary hours of work.

For a part-time student, that means leave builds up in proportion to the hours you normally work. If you work fewer hours than a full-time employee, you build up less leave, but you still build it up. Unused annual leave carries over from year to year.

## Who gets paid sick leave?

Full-time employees get 10 days of paid sick and carer's leave a year. Part-time employees get it pro rata, which means in proportion to their hours. Unused sick and carer's leave carries over to the next year.

Casual employees do not get paid sick leave. If you are casual and you are too sick to work a shift, you are normally not paid for that shift.

## What do casuals get instead?

Casuals are usually paid a casual loading on top of the base hourly rate. The loading is there because casuals do not get paid leave or notice of termination. Your award sets the loading.

Casuals still have some leave rights:

- 2 days of unpaid carer's leave per occasion
- 10 days of paid family and domestic violence leave a year

So if you are a casual, check that the loading is really in your rate. A casual rate that is the same as the permanent base rate may mean you are being underpaid.

Casual work can still suit many students well. It is flexible, so you can take fewer shifts in exam weeks and more in the holidays. The trade is that time off is unpaid. If you plan a trip home over the summer break, a casual job will not pay you for those weeks, but a part-time job with built-up annual leave may pay some of them.

## Am I really casual?

Fair Work describes a casual employee as someone whose job starts with no firm advance commitment to ongoing work. Whether that commitment exists depends on the real situation, not only on the word in your contract.

Some signs point to casual work: hours that change each week, shifts that are offered rather than guaranteed, and the freedom to say no to a shift. A fixed pattern of the same days and hours for months is something to look at more closely. Casuals may be able to move to permanent work by agreement with the employer, and in some circumstances there is a pathway under the National Employment Standards.

## A worked example (made-up rates)

The rates below are invented to show the idea. Your award sets the real rates.

Two students do the same job for one year.

- Hana is part-time on 20 hours a week at a base rate of $30.00. She earns $600 a week and builds up annual leave and sick leave based on her 20 hours.
- Tom is casual on 20 hours a week. If his award adds a 25% casual loading, his rate is $37.50 and he earns $750 a week. He builds up no paid annual leave or sick leave.

Neither is "better" in every case. Tom gets more money each week. Hana gets paid time off and more predictable hours. What matters is that each is paid correctly for the type of job they really have.

## What happens to leave when I finish a job?

When a part-time or full-time job ends, check your final pay carefully. Look for:

- All hours worked up to your last day
- Any unused annual leave you built up
- The super on your final wages

Sick and carer's leave is a different type of leave. Ask your employer or the Fair Work Ombudsman if you are not sure what your final pay should include.

## How is leave pay taxed?

Leave you take while working is paid as normal wages and taxed like the rest of your pay. If a leave payment is included in your final pay, it appears on your income statement too.

A final pay that includes leave can look like it has a lot of tax taken out, because the payroll system treats that pay as large. Your tax return looks at the whole year. If you may be an Australian resident for tax purposes, the tax-free threshold of $18,200 can apply for 2025-26, and too much tax taken out may come back to you, if any. If you are a foreign resident for tax purposes, the rates start at 30% from the first dollar.

## What to check now

- Look at your contract or letter: does it say casual, part-time or full-time?
- Look at your payslip: if casual, is a casual loading shown or included in the rate?
- If permanent, does your payslip show leave balances?
- Before you leave a job, ask for your leave balance in writing.
- Keep your final payslip with your other tax records.

If something looks wrong, the Fair Work Ombudsman can help for free on 13 13 94. At tax time, students can message Student Visa Tax on WhatsApp to have their return prepared.`,
    faq: [
      { q: 'I am a casual student. Do I get paid if I am sick?', a: 'Usually no. Casuals do not get paid sick leave. The casual loading in your rate is meant to make up for this.' },
      { q: 'Do part-time students get the same leave as full-time staff?', a: 'Part-time employees get annual leave and sick leave too, worked out in proportion to their ordinary hours.' },
      { q: 'Does my visa affect my leave?', a: 'No. Your leave depends on your type of employment and your award, not your visa. Visa holders have the same workplace rights as other employees.' },
    ],
    sources: [
      { label: 'Fair Work Ombudsman: Annual leave', href: `${FW}/leave/annual-leave` },
      { label: 'Fair Work Ombudsman: Sick and carer\'s leave', href: `${FW}/leave/sick-and-carers-leave` },
      { label: 'Fair Work Ombudsman: Casual employees', href: `${FW}/starting-employment/types-of-employees/casual-employees` },
    ],
  },
  {
    slug: 'invoices-with-an-abn-international-students',
    category: 'ABN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Invoices for ABN work: a guide for international students',
    description: 'If you do ABN work such as delivery, tutoring or design, you may need to send invoices. What to include, when a tax invoice is needed, and why quoting your ABN matters.',
    answer: 'If you work under an ABN, you send invoices to get paid. Show your name, ABN, the date, what you did and the amount. A formal tax invoice is a GST document, and a business that pays you without an ABN quoted must withhold 47%.',
    body: `Some international students do freelance or contract work with an ABN: tutoring, photography, design, cleaning or delivery. When you work this way, nobody sends you a payslip. You ask to be paid, often with an invoice. This guide explains what to put on an invoice and how it links to your tax.

## Do I need an ABN to send an invoice?

You are entitled to an ABN only if you are carrying on, or starting, a business in Australia. You do not get an ABN for work you do as an employee, even if someone calls it "contracting". The ABR also says an employer should not ask you to get an ABN as a condition of employment.

Applying for an ABN through the ABR is free. If you are not sure whether your work is employment or a business, read about the employee or contractor test before you apply.

## What is the difference between an invoice and a tax invoice?

An invoice is a bill: it tells your client what they owe you. A tax invoice is a special kind of invoice used for GST. It lets a business that is registered for GST claim back the GST it paid.

Most students with small ABN incomes are not registered for GST. The general rule is that you must register when your business turnover reaches $75,000. Ride-sourcing (for example, driving passengers for Uber) is different: you must register for GST before you start, whatever you earn. Food delivery follows the general rule.

If you are not registered for GST, do not add GST to your prices, and do not show a GST amount on your invoice.

## What should my invoice show?

Keep it simple and clear. A good invoice includes:

- Your name, and business name if you have one
- Your ABN
- The date of the invoice
- An invoice number, in order (1, 2, 3...)
- A short description of the work, with dates, hours or quantity
- The amount to pay
- How to pay you, such as your bank account details
- Your client's name

## What must a tax invoice include?

If you are registered for GST, the ATO says that for sales under $1,000 a tax invoice must show:

- That the document is intended to be a tax invoice
- Your identity and ABN
- The date it was issued
- A brief description of what you sold, with quantity and price
- The GST amount, or a statement that the total price includes GST
- The extent to which each sale is taxable

For sales of $1,000 or more, it must also show the buyer's identity or ABN. If a client asks for a tax invoice, you must give one within 28 days, unless the sale is $82.50 or less including GST.

## Why does quoting my ABN matter?

If you do not quote an ABN on your invoice, the business paying you must generally withhold 47% of the payment and send it to the ATO. That money is credited at tax time, but you wait months for it.

For example, if you invoice $500 without an ABN, the client may hold back $235 and pay you only $265. With your ABN on the invoice, you receive the full $500. Putting your ABN on every invoice avoids this.

Also check that your ABN is still active. If you stop your business, for example before you leave Australia, you should cancel your ABN, and you should not keep quoting an ABN that is no longer active.

## How does invoiced income affect my tax?

No tax is taken out of ABN income. You declare it in your tax return, together with any business expenses you can claim. Because nothing is withheld, you may owe tax when you lodge.

If you may be an Australian resident for tax purposes, the tax-free threshold of $18,200 can apply. For 2025-26, resident rates are nil to $18,200, then 16% from $18,201 to $45,000. A foreign resident pays 30% from the first dollar. Setting aside part of each payment helps you avoid a surprise bill.

## A worked example

Ana may be a resident for tax purposes for 2025-26. She earned $12,000 in wages from a café, and her employer took out some tax. She also invoiced $10,000 for design work with her ABN, and had $1,000 of business expenses.

- Wages: $12,000
- ABN income after expenses: $10,000 minus $1,000 = $9,000
- Total taxable income: $21,000
- Tax on $21,000 minus $18,200 = $2,800 at 16%: $448, before offsets

The tax taken from her wages is credited against this. Any tax still owing is paid after her return is assessed.

## Keeping records and your checklist

Keep copies of every invoice, receipts for expenses and bank records for 5 years from when you lodge your return. Save them as PDF files in a folder that is backed up, not only on your phone. A simple list of each invoice, with the date, client, amount and the date it was paid, also helps you see quickly who still owes you money and makes your tax return much easier to prepare.

Your checklist:

- Check that your work is really a business before you get an ABN.
- Put your ABN on every invoice.
- Do not add GST unless you are registered.
- Number your invoices and keep copies for 5 years.
- Put money aside for tax as you are paid.

Students with ABN income can message Student Visa Tax on WhatsApp when it is time to lodge their return.`,
    faq: [
      { q: 'Can I send invoices if I am not registered for GST?', a: 'Yes. You can send an invoice for your work with your ABN on it. Do not add GST or show a GST amount unless you are registered.' },
      { q: 'What happens if I forget my ABN on an invoice?', a: 'The business may have to withhold 47% of the payment and send it to the ATO. You get that amount back as a credit when you lodge, but only after your return is processed.' },
      { q: 'Do I need special software to make invoices?', a: 'No. A clear document with the right details is enough. What matters is that the details are correct and you keep copies.' },
    ],
    sources: [
      { label: 'ATO: Tax invoices', href: `${ATO}/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/tax-invoices` },
      { label: 'ATO: Statement by a supplier not quoting an ABN', href: `${ATO}/forms-and-instructions/statement-by-supplier-not-quoting-an-abn` },
      { label: 'ABR: ABN entitlement', href: 'https://www.abr.gov.au/business-super-funds-charities/applying-abn/abn-entitlement' },
    ],
  },
  {
    slug: 'several-jobs-in-one-year-student-tax',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Several jobs in one year: tax for international students',
    description: 'Worked for three or four employers in one financial year? How students handle TFN declarations, super funds and income statements so one tax return brings it together.',
    answer: 'You can have more than one job, and all your income goes into one tax return. Give each employer a TFN declaration, claim the tax-free threshold from one employer only if you may be a resident, and check every income statement is "Tax ready" before you lodge.',
    body: `A typical student year can look like this: a café job in first semester, a retail job over the holidays, and some weekend shifts in a warehouse. Each job has its own payroll, its own super and its own income statement. At tax time, all of it has to come together correctly in one return.

This guide looks at the whole year, from your first day in each job to lodging. For questions about how many hours you may work, check your visa conditions with the Department of Home Affairs.

## What do I give each new employer?

Each employer needs its own TFN declaration. Your TFN is the same for every job, but a declaration given to one employer does not go to the next one.

On each declaration you answer two key questions:

- Are you an Australian resident for tax purposes? A student enrolled in a course of 6 months or more may be a resident, but it depends on your situation.
- Do you want to claim the tax-free threshold from this payer?

If you may be a resident, claim the tax-free threshold from one employer only, usually the one who pays you the most. Answer no for every other job. If you are a foreign resident, answer no for every job, because foreign residents do not get the threshold.

## Why does the threshold matter with several jobs?

The tax-free threshold means no tax on the first $18,200 of your income for the year, if you are a resident. Each employer only sees its own pay. If two employers both apply the threshold, each one takes out too little tax. The ATO says claiming the threshold from more than one payer can mean you have a tax bill when you lodge.

If you change jobs, you can give a new declaration. When your main job ends and a second job becomes your main one, you can update both declarations.

If you think too little tax is still being taken out across your jobs, you can ask an employer to withhold more. This can feel strange, because your pay goes down a little. But it can stop a tax bill arriving after you lodge, at a time when you may have rent, fees or a flight home to pay for.

## How do I keep track of super across jobs?

Every employer must pay super for you, generally at 12% of your ordinary wages. If you did not choose a fund, an employer may pay into a fund already linked to you, but you can still end up with more than one fund.

In myGov, ATO online services let you:

- See super payments your employers reported
- Find lost accounts
- Combine accounts, if that suits you

Before combining, check whether you will lose insurance or pay fees. When you leave Australia for good and your visa has ended, you may claim each fund as a departing Australia superannuation payment. A forgotten fund is easy to miss, so keep a list.

## What happens at the end of the financial year?

Each employer reports your pay through Single Touch Payroll. In myGov you will see one income statement per employer. Most employers finalise these by 14 July. Wait until every statement says "Tax ready" before you lodge, so your return uses the final numbers.

Then all your income goes into one return. The ATO adds it up, works out the tax for your total income, and compares that with the tax all your employers took out. You either get some tax back, if any too much was taken, or you have an amount to pay.

## A worked example

Sam may be a resident for tax purposes for 2025-26. He had three jobs:

- Café (main job, claimed the threshold): $15,000
- Retail over summer (did not claim the threshold): $8,000
- Warehouse weekends (did not claim the threshold): $5,000

Total income: $28,000. Using the 2025-26 resident rates:

- Income above $18,200: $28,000 minus $18,200 = $9,800
- Tax at 16%: $1,568
- Low income tax offset: $700, because his income is under $37,500
- Tax after the offset: $868, before the Medicare levy if it applies

If the tax his three employers took out is more than this, the difference may come back to him. If it is less, he pays the gap. Sam may also be able to claim the Medicare levy exemption if he was not entitled to Medicare and gets a Medicare Entitlement Statement.

## What if one job crossed 30 June?

The financial year runs from 1 July to 30 June. If a job ran from May to August, the pay up to 30 June goes in one year's return and the rest in the next year's return. Payroll systems handle this through your income statements.

## What records should I keep?

Keep a short list, one line per job:

- Employer name and ABN
- Start and end dates
- Your super fund for that job
- Whether you claimed the tax-free threshold

Also keep your payslips. A short job is the one people forget most.

## Your checklist

- A TFN declaration for every employer.
- The tax-free threshold from one employer only, if you may be a resident.
- Check your super funds in myGov.
- Wait until every income statement is "Tax ready".
- Lodge one return with all your income.

If you had several jobs, students can message Student Visa Tax on WhatsApp to bring everything together in one return.`,
    faq: [
      { q: 'Do I lodge a separate tax return for each job?', a: 'No. You lodge one tax return for the year, and it includes income from every employer.' },
      { q: 'I claimed the tax-free threshold from two jobs. What now?', a: 'Give one of the employers a new TFN declaration that does not claim it. At tax time, your return works out the correct tax for your total income, which may mean you have an amount to pay.' },
      { q: 'One employer is missing from myGov. What should I do?', a: 'Wait until mid July, then ask the employer if they reported your pay. Use your payslips for that job if you need to.' },
    ],
    sources: [
      { label: 'ATO: Income from more than one job', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job` },
      { label: 'ATO: Access your income statement', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/access-your-income-statement` },
      { label: 'ATO: Low income tax offset', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/tax-offsets/low-income-tax-offset` },
      { label: 'ATO: Keeping track of your super online', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/keeping-track-of-your-super-online` },
    ],
  },
  {
    slug: 'casual-part-time-full-time-international-students',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Casual, part-time or full-time: a guide for students',
    description: 'What casual, part-time and full-time mean in Australia, how each affects pay, leave and super, and whether your type of job changes your tax as an international student.',
    answer: 'Casual jobs have no firm commitment to ongoing work and pay a casual loading instead of paid leave. Part-time and full-time jobs have regular hours and paid leave. Your job type does not change how your income is taxed.',
    body: `When you get a job offer in Australia, the letter usually says "casual", "part-time" or "full-time". These words are not just labels. They decide how your hours work, whether you get paid leave, and how much notice you get if the job ends. This guide explains each type for international students.

For any question about how many hours you may work on your visa, check your visa conditions with the Department of Home Affairs.

## What is a casual job?

The Fair Work Ombudsman describes a casual employee as someone whose job starts with no firm advance commitment to ongoing work, and who is entitled to a casual loading or a casual pay rate under an award, agreement or contract.

In practice, casual work often means:

- Your hours can change each week
- Shifts are offered, and you can usually say no
- You are paid a casual loading on top of the base rate
- You do not get most types of paid leave, notice of termination or redundancy pay

Casual work is common for students because it can fit around classes and exams.

## What is a part-time job?

A part-time employee works fewer hours than a full-time employee, usually on a regular pattern. Part-time employees get paid leave in proportion to their hours:

- Annual leave, based on their ordinary hours (full-time employees get 4 weeks a year)
- Sick and carer's leave, pro rata (full-time employees get 10 days a year)

There is no casual loading, because paid leave and more secure hours are part of the deal.

## What is a full-time job?

A full-time employee works regular full-time hours, usually 38 a week, and gets the full paid leave entitlements: 4 weeks of annual leave and 10 days of sick and carer's leave a year. Full-time roles are less common during study, and are more common for graduates, for example on a 485 visa.

## Which type am I really?

The word in your contract matters, but the real situation matters more. Whether there is a firm advance commitment to ongoing work depends on how the job really works.

Ask yourself:

- Do I have the same days and hours every week, or does it change?
- Can I refuse a shift without any problem?
- Is a casual loading shown on my payslip or included in my rate?

A casual can move to part-time or full-time work by agreement with the employer. In some circumstances, the National Employment Standards also give casuals a pathway to permanent work.

If your answers do not match the word in your contract, talk to your employer first. Ask them to explain, in writing, why the job is casual or permanent. If you are still unsure, the Fair Work Ombudsman can help for free on 13 13 94, and an interpreter is available on 13 14 50.

## A worked example (made-up rates)

These rates are invented to show the idea. Your award sets the real rates.

Imagine a job where the award base rate is $30.00 an hour, and the award adds a 25% loading for casuals.

- Part-time, 15 hours a week: 15 x $30.00 = $450.00 a week, plus paid annual leave and sick leave
- Casual, 15 hours a week: 15 x $37.50 = $562.50 a week, with no paid annual leave or sick leave

If you are casual and your payslip shows $30.00 an hour, with no loading, ask why. That may be an underpayment.

## Does my job type change my tax?

No. Casual, part-time and full-time wages are all salary and wages for tax. The type of job does not change your tax rate. What changes your tax is your residency for tax purposes and your total income for the year.

- If you may be an Australian resident for tax purposes, the tax-free threshold of $18,200 can apply. For 2025-26, resident rates are 16% from $18,201 to $45,000 and 30% from $45,001 to $135,000.
- If you are a foreign resident for tax purposes, tax starts at 30% from the first dollar up to $135,000.

Casual pay often goes up and down. A big fortnight can have more tax taken out, because payroll treats each pay as if it were normal. Your tax return looks at the whole year and sorts it out.

For example, a student who may be a resident for tax purposes and earns $25,000 in 2025-26 pays tax on the amount above $18,200. That is $6,800 at 16%, or $1,088, before any offsets. The answer is the same whether the $25,000 came from casual, part-time or full-time work.

## Does my job type change my super?

Generally, no. The ATO says employees are generally eligible for super whether they are full-time, part-time or casual, and this includes temporary residents. The super guarantee rate is 12%, paid on top of your wages. Under 18s are only eligible for weeks they work more than 30 hours.

## What to check now

- Read your contract: which type does it say?
- Compare it with how the job really works.
- If casual, check that the loading is in your rate.
- If part-time or full-time, check your leave balance on your payslip.
- Look up your award with the Fair Work Ombudsman's Pay Calculator.

When tax time comes, students can message Student Visa Tax on WhatsApp to have their return prepared.`,
    faq: [
      { q: 'Is casual work taxed more than part-time work?', a: 'No. All three types are taxed the same way. Your tax depends on your total income and your residency for tax purposes.' },
      { q: 'Can I ask to become part-time?', a: 'A casual can move to part-time or full-time work by agreement with the employer. In some circumstances there is also a pathway under the National Employment Standards.' },
      { q: 'Do casual students get super?', a: 'Generally yes. Casual employees, including temporary residents, are generally eligible for super at 12% of their ordinary wages.' },
    ],
    sources: [
      { label: 'Fair Work Ombudsman: Casual employees', href: `${FW}/starting-employment/types-of-employees/casual-employees` },
      { label: 'Fair Work Ombudsman: Annual leave', href: `${FW}/leave/annual-leave` },
      { label: 'ATO: Work out if you have to pay super', href: `${ATO}/businesses-and-organisations/super-for-employers/work-out-if-you-have-to-pay-super` },
    ],
  },
  {
    slug: 'medicare-or-oshc-international-students',
    category: 'Medicare',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Medicare or OSHC: what covers international students?',
    description: 'Most international students are covered by Overseas Student Health Cover, not Medicare. What each one is, who may get Medicare, and how it affects your tax return.',
    answer: 'Most international students are not entitled to Medicare. Their health cover is Overseas Student Health Cover (OSHC), which is a condition of the student visa. Students from some agreement countries can also apply for Medicare, but they still need OSHC.',
    body: `Medicare and OSHC are two different things, and students often mix them up. One is Australia's public health system. The other is private health insurance made for overseas students. Friends, classmates and even employers sometimes use the two words as if they mean the same thing, which adds to the confusion. Knowing which one applies to you also matters at tax time, because of the Medicare levy.

## What is Medicare?

Medicare is Australia's public health care scheme. It helps pay for things like doctor visits and treatment in public hospitals. It is mainly for Australian citizens and permanent residents.

Being in Australia on a student visa does not, on its own, give you Medicare. Some students can get limited access through a reciprocal health care agreement between Australia and their home country.

## What is OSHC?

OSHC stands for Overseas Student Health Cover. It is health insurance for international students. The Australian Government's private health website says it is a condition of your visa to keep OSHC for the whole time you hold your student visa.

According to that website, OSHC:

- Helps cover the cost of hospital and medical treatment
- Pays benefits for ambulance services
- Pays limited benefits for medicines, capped at $50 per item, up to $500 a year for a single membership or $1,000 for a family membership
- Does not pay for general treatment such as dental, optical or physiotherapy

If you want extras like dental, you would need separate extras cover.

OSHC is bought from a private health insurer. Many students buy it through their education provider when they accept their offer, but you can also choose an insurer yourself. Keep your policy number and membership card in a safe place. You will need them when you see a doctor or go to hospital, and it is useful to have them at tax time too, because they show the period you held OSHC.

## Can a student have both?

Yes, some can. Students from the United Kingdom, Sweden, the Netherlands, Belgium, Slovenia, Italy or New Zealand can apply for Medicare under their country's agreement. But having reciprocal Medicare does not remove the need for OSHC. You still need OSHC as part of your visa.

Students from Norway, Finland, Malta and the Republic of Ireland are not covered by these agreements as students. Some exemptions from buying OSHC may apply for students from Sweden, Norway or Belgium. The Department of Home Affairs can confirm whether an exemption applies to you.

## Why does this matter for tax?

Because of the Medicare levy. The ATO says the Medicare levy is 2% of your taxable income. It is charged in addition to your income tax, for people who are Australian residents for tax purposes.

A student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. If you are, the Medicare levy is normally added when your return is assessed. But if you were not entitled to Medicare, you may be able to claim an exemption from the levy.

If you are a foreign resident for tax purposes, there is a separate foreign resident exemption category for the Medicare levy.

## How do I claim the exemption?

You need a Medicare Entitlement Statement (MES) from Services Australia. It shows the period you were not entitled to Medicare. Key points from the ATO:

- Applications open on 1 July, for the year that just ended.
- It can take up to 8 weeks to process.
- You should wait until you have the MES before you lodge your tax return.
- Having an MES does not automatically make you exempt. All your dependants, including a spouse, must also be in an exemption category.
- You need an MES for each year you claim the exemption.

Your OSHC insurer does not send you an MES. You apply for it yourself.

## A worked example

Priya may be a resident for tax purposes for 2025-26. Her taxable income is $40,000. She was never entitled to Medicare, because her country has no agreement with Australia, and she has OSHC.

- Medicare levy at 2% of $40,000: $800
- With a valid MES and no dependants who are entitled to Medicare, she may claim the exemption, so the levy would not be charged.

If Priya forgot the MES and lodged anyway, the $800 levy could be included. She could then ask to amend her return once she has the statement.

## What if my country has an agreement?

If you were entitled to Medicare through an agreement, you cannot get an MES for that time. The Medicare levy may then apply if you are a resident for tax purposes. Always check your own entitlement with Services Australia, using your passport country.

This is not about whether you used Medicare. A student who was entitled to Medicare but never visited a doctor is still entitled. What decides the levy is your entitlement, together with your residency for tax purposes, not how often you used the health system.

## What to do next

- Check that your OSHC is active for your whole visa.
- Keep your OSHC policy details with your tax records.
- Check whether your passport country has an agreement with Australia, and whether it covers students.
- If you were not entitled to Medicare, apply for an MES after 1 July.
- Wait for the MES before you lodge.

Students can message Student Visa Tax on WhatsApp to check the Medicare levy on their return.`,
    faq: [
      { q: 'Does OSHC count as Medicare?', a: 'No. OSHC is private health insurance for students. Medicare is the public scheme, and most students are not entitled to it.' },
      { q: 'Does having OSHC give me the Medicare levy exemption?', a: 'Not by itself. The exemption depends on not being entitled to Medicare, and you need a Medicare Entitlement Statement from Services Australia.' },
      { q: 'My country has an agreement. Do I still need OSHC?', a: 'Yes. The Australian Government says reciprocal access to Medicare does not exempt you from needing OSHC, although some exemptions may apply for students from Sweden, Norway or Belgium.' },
    ],
    sources: [
      { label: 'privatehealth.gov.au: Overseas Student Health Cover', href: 'https://www.privatehealth.gov.au/health_insurance/overseas/overseas_student_health_cover.htm' },
      { label: 'ATO: What is the Medicare levy', href: `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/what-is-the-medicare-levy` },
      { label: 'ATO: Not entitled to Medicare benefits', href: `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/not-entitled-to-medicare-benefits` },
    ],
  },
  {
    slug: 'medicare-agreement-countries-international-students',
    category: 'Medicare',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Medicare agreement countries: what students need to know',
    description: 'Students from some countries can apply for Medicare under a reciprocal agreement. Which countries apply to students, what changes for OSHC, and what it means for tax.',
    answer: 'Students from the United Kingdom, Sweden, the Netherlands, Belgium, Slovenia, Italy and New Zealand can apply for Medicare under their country\'s agreement. Students from Norway, Finland, Malta and Ireland are not covered as students. All still need OSHC unless an exemption applies.',
    body: `Australia has reciprocal health care agreements with some countries. These agreements let visitors from those countries get some help with health costs in Australia. But the rules for students are not the same as the rules for tourists or other visitors. This guide explains what the agreements mean if you are an international student.

## Which students can apply for Medicare?

The Australian Government's private health website says students from these countries can also apply for Medicare under their country's agreement:

- United Kingdom
- Sweden
- The Netherlands
- Belgium
- Slovenia
- Italy
- New Zealand

The same website says students from Norway, Finland, Malta and the Republic of Ireland are not covered by these agreements.

If your country is not named above, there is no agreement that gives you Medicare as a student. That is the case for most international students in Australia, including students from many of the countries that send the most students here.

Notice that the list for students is shorter than many people expect. Some countries have an agreement with Australia, but it does not cover people who come here to study. That is why it is important to check the student rules, not only whether your country has an agreement.

Agreements can change, and the details depend on your situation. Always check your own entitlement with Services Australia before you rely on it.

## Do I still need OSHC?

Yes, in most cases. Overseas Student Health Cover is a condition of the student visa. The government website says that having reciprocal access to Medicare does not exempt you from needing to take out OSHC.

There is one exception to look at. Some exemptions to the requirement to buy OSHC may apply if you are a student from Sweden, Norway or Belgium. These students may have arrangements under their own national schemes. The Department of Home Affairs can confirm whether an exemption applies to you.

## What does reciprocal Medicare cover?

Reciprocal agreements are generally for medically necessary treatment, which means care you need while you are in Australia and that cannot wait until you go home. The exact cover depends on the agreement for your country. Services Australia can explain what is covered for you.

OSHC is still your main health cover as a student. It helps with hospital and medical costs and pays benefits for ambulance services. It does not cover dental, optical or physiotherapy.

## Why does an agreement change my tax?

It can change whether you pay the Medicare levy. The ATO says the Medicare levy is 2% of your taxable income. If you may be an Australian resident for tax purposes, for example because you are enrolled in a course of 6 months or more, the levy is normally included when your return is assessed.

Students who were not entitled to Medicare can usually claim an exemption from the levy with a Medicare Entitlement Statement (MES) from Services Australia. But if you were entitled to Medicare through an agreement, you cannot get an MES for that period. That means the exemption is generally not available, and the levy may apply.

## A worked example: two students, same income

Both students below may be residents for tax purposes for 2025-26, and both have taxable income of $40,000.

- Elena is from a country with no agreement. She was not entitled to Medicare and gets an MES. With no dependants entitled to Medicare, she may claim the exemption. Medicare levy: nil.
- Oliver is from the United Kingdom. As a student he can apply for Medicare under the agreement, so he cannot get an MES for that time. Medicare levy at 2%: $800.

Same income, same course, different passport, different result. That is why your passport country matters at tax time.

Both students would also pay income tax on their taxable income. Using the 2025-26 resident rates, tax on $40,000 is 16% of the $21,800 above $18,200, which is $3,488, before any offsets. The Medicare levy is added on top of this, if it applies.

## What if I have two passports?

Dual citizens should take care. Which agreement, if any, applies can depend on your citizenship and how you entered Australia. Do not assume. Check with Services Australia and tell your tax preparer about both passports.

The same care applies if you are a citizen of one country but grew up or lived for a long time in another. The agreement follows your citizenship, not where you lived before. If you are unsure, ask Services Australia before you apply for a Medicare Entitlement Statement, so you know what to expect.

## What if my entitlement changed during the year?

The ATO says you can claim the exemption for any period that meets the conditions. So if you were not entitled to Medicare for part of the year, you may be able to claim an exemption for that part only. The MES shows the dates. Remember that you need an MES for each year you claim.

## What to do next

- Find your passport country in the lists above.
- If it is not listed, apply for an MES after 1 July. Processing can take up to 8 weeks.
- If it is listed, check your entitlement with Services Australia.
- Keep your OSHC active, unless Home Affairs confirms an exemption.

Students can message Student Visa Tax on WhatsApp to check how the Medicare levy applies to their return.`,
    faq: [
      { q: 'I am from Ireland. Can I get Medicare as a student?', a: 'The Australian Government\'s private health website says students from the Republic of Ireland are not covered by these agreements. Check your own situation with Services Australia.' },
      { q: 'If I can get Medicare, can I cancel my OSHC?', a: 'No, in most cases. Reciprocal access to Medicare does not remove the OSHC requirement. Some exemptions may apply for students from Sweden, Norway or Belgium, and Home Affairs can confirm.' },
      { q: 'Does my agreement mean I pay the Medicare levy?', a: 'If you are a resident for tax purposes and were entitled to Medicare, you generally cannot get a Medicare Entitlement Statement, so the levy may apply.' },
    ],
    sources: [
      { label: 'privatehealth.gov.au: Overseas Student Health Cover', href: 'https://www.privatehealth.gov.au/health_insurance/overseas/overseas_student_health_cover.htm' },
      { label: 'Services Australia: Reciprocal Health Care Agreements', href: 'https://www.servicesaustralia.gov.au/reciprocal-health-care-agreements' },
      { label: 'ATO: Not entitled to Medicare benefits', href: `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/not-entitled-to-medicare-benefits` },
    ],
  },
  {
    slug: 'medicare-levy-on-your-return-international-students',
    category: 'Medicare',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'How the Medicare levy works on a student tax return',
    description: 'What the 2% Medicare levy costs an international student, who pays it, how to work it out, and what to check on your notice of assessment if you were charged by mistake.',
    answer: 'The Medicare levy is 2% of taxable income, charged on top of income tax for residents for tax purposes. Students who were not entitled to Medicare may avoid it with a Medicare Entitlement Statement, and foreign residents have their own exemption category.',
    body: `The Medicare levy is one line on your notice of assessment, but it can change your result by hundreds of dollars. Many international students only notice it after they lodge. This guide shows how the levy is worked out, when it applies to students, and what to check on your assessment.

## What is the Medicare levy?

The ATO says the Medicare levy is 2% of your taxable income, and it is paid in addition to the tax you pay on your taxable income. It helps fund Australia's public health system.

The levy is worked out when your tax return is assessed. Your employer may take some extra tax out of each pay to cover it, but the final amount is decided by your return. This is why the levy can be a surprise: it is easy to miss on a payslip.

## Who pays it?

The levy is charged to people who are Australian residents for tax purposes. A student enrolled in a course of 6 months or more may be a resident for tax purposes, so many students are in this group.

There are exemptions. The ATO lists, among others:

- A foreign resident Medicare levy exemption, for people who are foreign residents
- An exemption for people not entitled to Medicare benefits, which needs a Medicare Entitlement Statement
- A medical exemption

People on low incomes may also pay a reduced levy or none at all. The ATO sets the income limits each year.

Each exemption has its own conditions. You cannot pick the one you like best. For most international students, the question is simple: were you entitled to Medicare during the year or not? Your answer, together with your residency for tax purposes, decides which rule applies to you.

## How do I work out the levy?

Take your taxable income and multiply it by 2%. Your taxable income is your total assessable income minus any deductions you can claim.

Examples (residents for tax purposes, with no exemption or low income reduction):

- Taxable income $40,000: levy $800
- Taxable income $50,000: levy $1,000
- Taxable income $60,000: levy $1,200

## A full worked example

Kenji may be a resident for tax purposes for 2025-26. His taxable income is $40,000. Using the 2025-26 resident rates:

- Income above $18,200: $40,000 minus $18,200 = $21,800
- Tax at 16% on $21,800: $3,488
- Low income tax offset: $700 minus 5 cents for each dollar over $37,500, which is $700 minus $125 = $575
- Income tax after the offset: $2,913
- Medicare levy at 2%: $800

So without an exemption, Kenji's total is $3,713 before the tax his employer took out is counted. If Kenji was not entitled to Medicare and has a valid Medicare Entitlement Statement, and no dependants entitled to Medicare, he may claim the exemption and the $800 would not be charged.

## When do students not entitled to Medicare avoid it?

Most international students are not entitled to Medicare. Their health cover is OSHC. To claim the exemption on that basis, the ATO says:

- You need a Medicare Entitlement Statement (MES) from Services Australia.
- Applications open on 1 July, and processing can take up to 8 weeks.
- Wait for the MES before you lodge.
- An MES does not automatically make you exempt. All your dependants, including a spouse, must also be in an exemption category.
- You need an MES for each year you claim. A two year course that spans three financial years can mean three statements.

Having OSHC does not by itself give you the exemption. What counts is that you were not entitled to Medicare, shown by the MES.

Apply for the MES early. If you apply in July, the statement can arrive in time for you to lodge well before the usual deadline. If you wait until October, you may have to lodge late or lodge without the exemption and amend later.

## When does the levy usually apply to students?

The levy may apply if you are a resident for tax purposes and:

- You were entitled to Medicare, for example through a reciprocal agreement for students from your country
- You have a spouse or other dependant who was entitled to Medicare
- You could have claimed the exemption but lodged without an MES

## What should I check on my notice of assessment?

After your return is processed, the ATO sends a notice of assessment. Look for the Medicare levy line.

- If it shows an amount and you believe you were not entitled to Medicare, check whether your MES was used.
- If you lodged before you had the MES, you can ask for an amendment once you have it. Individuals generally have 2 years from the day after the notice of assessment is sent to request an amendment.
- If you were a foreign resident for tax purposes, check that your residency was recorded correctly.

## Your checklist

- Work out whether you may be a resident for tax purposes.
- Check whether you were entitled to Medicare, using your passport country.
- If not entitled, apply for an MES after 1 July and wait for it.
- Read the Medicare levy line on your notice of assessment, and keep the notice with your records.
- Amend within 2 years if the levy was charged by mistake.

Students can message Student Visa Tax on WhatsApp to check the Medicare levy on their return before it is lodged.`,
    faq: [
      { q: 'Is the Medicare levy taken out of my pay?', a: 'Your employer may withhold an amount for it from each pay. The final levy is worked out when your tax return is assessed.' },
      { q: 'I have OSHC. Do I still pay the levy?', a: 'OSHC alone does not give you an exemption. If you were not entitled to Medicare, you may claim the exemption with a Medicare Entitlement Statement.' },
      { q: 'I already lodged without my MES. Can I fix it?', a: 'Yes. Once you have the MES, you can request an amendment. Individuals generally have 2 years from the day after the notice of assessment is sent.' },
    ],
    sources: [
      { label: 'ATO: What is the Medicare levy', href: `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/what-is-the-medicare-levy` },
      { label: 'ATO: Medicare levy exemption', href: `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption` },
      { label: 'ATO: Not entitled to Medicare benefits', href: `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/not-entitled-to-medicare-benefits` },
      { label: 'ATO: Time limits on amendments', href: `${ATO}/individuals-and-families/your-tax-return/amend-your-tax-return/time-limits-on-amendments` },
    ],
  },
  {
    slug: 'tfn-declaration-form-international-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'The TFN declaration form: a guide for international students',
    description: 'Your TFN declaration tells your employer how much tax to take out. The key questions for international students, which boxes to tick, and how to fix a mistake.',
    answer: 'The TFN declaration tells your employer how much tax to withhold. The key questions for students are your TFN, whether you are an Australian resident for tax purposes, and whether you claim the tax-free threshold from this payer.',
    body: `On your first day at a new job, you will usually be asked to fill in a tax file number declaration. Some employers use their own online form, and some use the ATO's paper form. Either way, a few answers decide how much tax is taken from every pay. This guide walks through the questions that matter most for international students.

## What is the TFN declaration for?

It gives your employer the information it needs to work out how much tax to withhold from your pay. It does not decide how much tax you finally pay for the year. That is worked out when you lodge your tax return. But a wrong answer can mean too much or too little tax is taken out all year.

The ATO says to check first whether your employer has its own electronic form. If it does, use that one. You may also be able to complete the declaration online.

## The TFN question

Give your TFN to your employer only after you start work. The ATO says never give your TFN in a job application or over the internet.

If you have applied for a TFN but it has not arrived, mark the box to say so. You then have 28 days to give your TFN to your employer, and during that time tax is withheld at the standard rate. After 28 days without a TFN, your employer must withhold at the top rate.

If you do not give a TFN at all, your employer must withhold tax at the top rate from all your pay. Getting a TFN is free, and it is posted to your Australian address.

## The residency question

This is the question students find hardest. You choose whether you are an Australian resident for tax purposes, a foreign resident, or a working holiday maker.

- Do not tick working holiday maker. That box is for people on a 417 or 462 visa, not students on a 500 or 485 visa.
- A student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. It depends on your situation, so it is worth checking.
- If you are not an Australian resident for tax purposes, tick foreign resident.

Residency for tax is not the same as immigration residency. You can be a temporary visa holder and still be a resident for tax purposes.

If you are not sure which box fits you, ask before you sign. Your answer changes how much tax is taken from every pay. You can give a new declaration later if your situation changes, but it is easier to start with the right answer.

## The tax-free threshold question

The tax-free threshold means no tax on the first $18,200 of your income for the year, for residents.

The ATO says answer yes if you are an Australian resident and you are not claiming the threshold from another payer, or your total income from all sources will be below the threshold. Answer no if you already claim it from another job. Foreign residents are not entitled to the tax-free threshold and must answer no.

If you have two jobs, claim the threshold from one only, usually the one that pays you the most.

## The study loan question

This question asks about debts such as HELP. Most international students do not have these Australian study loans, so most answer no. Only answer yes if you really have one of the debts listed. If you are unsure, check your myGov account before you answer.

## A worked example

Minh starts a café job. She is enrolled in a two year course, so she may be a resident for tax purposes, and she has no other job.

- TFN: she writes her TFN.
- Residency: she ticks Australian resident for tax purposes, after checking her situation.
- Tax-free threshold: yes, because this is her only job.
- Study loan: no.

Six months later she starts a second job at a shop. On that declaration she answers no to the tax-free threshold, because the café already applies it.

Now compare: if Minh had ticked foreign resident, her employer would withhold more tax, starting at 30% from the first dollar. If she had claimed the threshold at both jobs, each employer would withhold too little, and she might get a tax bill when she lodges.

## What if I made a mistake?

Talk to your employer and give a new declaration with the correct answers. Payroll uses the new answers from then on. Pay already processed is not changed, but your tax return sorts out the difference at the end of the year.

- If too much tax was taken out, some may come back to you, if any.
- If too little was taken out, you may have an amount to pay.

Check your next payslip after the change to see that the tax amount moved. If it did not change, ask payroll whether they received your new form.

## Your checklist

- Use your employer's form if it has one.
- Give your TFN only after you start work.
- Do not tick working holiday maker on a student visa.
- Check whether you may be a resident for tax purposes before you answer.
- Claim the tax-free threshold from one employer only.
- Give a new declaration if your situation changes.

Students can message Student Visa Tax on WhatsApp at tax time to have their return prepared.`,
    faq: [
      { q: 'Should I tick working holiday maker if I am on a student visa?', a: 'No. The working holiday maker box is for people on a 417 or 462 visa. Students choose Australian resident or foreign resident for tax purposes.' },
      { q: 'What happens if I do not give my TFN?', a: 'Your employer must withhold tax at the top rate. If you have applied, you have 28 days to give your TFN before the top rate applies.' },
      { q: 'Can I change my answers later?', a: 'Yes. Give your employer a new declaration. It applies to future pays, and your tax return sorts out the year.' },
    ],
    sources: [
      { label: 'ATO: Paper TFN declaration form for payees', href: `${ATO}/forms-and-instructions/tfn-declaration/paper-tfn-declaration-form-for-payees` },
      { label: 'ATO: Income from more than one job', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job` },
      { label: 'ATO: TFN application for foreign passport holders', href: `${ATO}/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application` },
    ],
  },
]
