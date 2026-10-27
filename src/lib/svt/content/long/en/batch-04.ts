import type { LongArticle } from '../types'

const ATO = 'https://www.ato.gov.au'

export const LONG_EN_04: readonly LongArticle[] = [
  {
    slug: 'tax-withheld-payslip-student-visa',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Tax withheld on your payslip: a guide for student visa holders',
    description: 'Tax withheld is the amount your employer sends to the ATO from each pay. What decides it for a student, why it can look too high or too low, and what to check.',
    answer: 'Tax withheld is the part of your gross pay that your employer sends to the ATO for you before paying you the rest. It is an estimate of your tax, not the final amount: your tax return works out the real figure, and any difference becomes a refund or a bill.',
    body: `Every payslip in Australia has a line called tax withheld. For many international students it is the most confusing number on the page. It changes from week to week, it is different at each job, and it rarely matches what friends say they pay. This guide explains what the number is, what decides it, and when it is worth asking a question.

## What does tax withheld actually mean?

When your employer pays you, they do not give you the full amount you earned. They keep back an amount and send it to the ATO in your name. That amount is the tax withheld. The ATO holds it until the end of the financial year, which runs from 1 July to 30 June.

Tax withheld is a prepayment. Your employer does not know your full year. They only know what they pay you, and what you told them on your tax file number (TFN) declaration. So they estimate. When you lodge your tax return, the ATO works out the tax you really owe on all your income for the year, then compares it with everything that was withheld.

- If more was withheld than you owe, the difference comes back to you as a refund.
- If less was withheld than you owe, you pay the difference.
- If the two are close, there may be little or nothing either way.

## What decides how much is withheld from your pay?

Three things decide the amount for most students: what you answered on your TFN declaration, whether your employer has your TFN, and how much you earned in that pay period.

- **The residency question.** The declaration asks if you are an Australian resident for tax purposes. A student enrolled in a course of 6 months or more may be a resident. Your answer changes the withholding scale your employer uses.
- **The tax-free threshold question.** If you may be a resident, you can claim the tax-free threshold from one employer. That employer then withholds less. Foreign residents do not get the threshold.
- **Your TFN.** If you have not given your employer your TFN within 28 days of starting, the ATO says they must withhold at the top rate plus the Medicare levy.
- **How much you earned that pay.** A longer shift week means more is withheld, and not always in a straight line.

## Why does the amount change every pay?

Withholding is worked out from tables. The tables assume that the pay you received this week is what you earn every week of the year. If you work 10 hours one week and 25 the next, the tables treat these as two very different yearly incomes. The amount withheld moves with them.

This is normal for casual work. Do not compare one payslip with another to judge whether the tax is right. Look at the totals over several months, or wait for your income statement after 30 June.

## When is the amount too low?

The most common cause is claiming the tax-free threshold from two employers. The ATO says you should generally claim it from one payer only, usually the one who pays you the most. If you claim it twice, each employer withholds as if it were your only job. Too little tax is taken in total, and you may get a tax bill when you lodge.

Another cause is answering that you are a resident when you are not. A foreign resident pays tax from the first dollar earned, so withholding at resident rates can leave a gap.

## When is the amount too high?

Withholding can also be higher than your final tax. Common reasons for students include:

- you did not give your employer your TFN in time, so the top rate applied for some weeks
- you answered no to the residency question when you may be a resident
- you did not claim the tax-free threshold from any employer
- you started work part way through the year, so the tables assumed a full year of income you never earned
- the Medicare levy was withheld, but you are not entitled to Medicare and may be able to claim an exemption

None of these is lost money. It is corrected on your tax return, if any is owed back to you.

## A worked example

Suppose a student may be an Australian resident for 2025-26 and earns $30,000 from one job across the full year. On the 2025-26 resident rates, the first $18,200 is tax free and the next $11,800 is taxed at 16%, which is $1,888. The low income tax offset of $700 then brings it down to $1,188, not counting the Medicare levy.

If the payslips show $2,000 withheld over the year, the difference of $812 is the starting point for a refund, before the Medicare levy is worked out. If the student is a foreign resident instead, the tax on the same $30,000 is 30% from the first dollar, which is $9,000. The same payslips would then mean a bill. This is why the residency answer matters so much.

## What should you check on your payslip?

Fair Work says every payslip must show your gross pay, your net pay and each deduction, including tax. Check that:

- gross pay minus tax withheld (and any other listed deductions) equals net pay
- the tax line is there at all; a payslip with no tax on normal wages is worth a question
- your employer has your TFN on file
- you claimed the tax-free threshold from one job only, if you may be a resident

## What to do next

Keep every payslip in one folder, by employer. Check your TFN declarations if you have more than one job. After 30 June, wait until your income statements say "Tax ready", then compare the total tax withheld with what your payslips show. If you would like help, you can message Student Visa Tax on WhatsApp and we will check your withholding as part of your return.`,
    faq: [
      { q: 'Is tax withheld the same as the tax I owe?', a: 'No. It is an estimate taken from each pay. Your tax return works out the real amount for the whole year and compares the two.' },
      { q: 'Can I ask my employer to withhold more tax?', a: 'Yes. If you think too little is being withheld, for example because you have two jobs, you can ask an employer to withhold more.' },
      { q: 'Why was so much tax taken in my first few weeks?', a: 'If your employer did not have your TFN within 28 days, they must withhold at the top rate plus the Medicare levy. Any extra is worked out on your tax return.' },
    ],
    sources: [
      { label: 'ATO: Income from more than one job', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job` },
      { label: 'ATO: TFN application for foreign passport holders and temporary visitors', href: `${ATO}/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application` },
      { label: 'ATO: Studying in Australia', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia` },
      { label: 'Fair Work: Pay slips', href: 'https://www.fairwork.gov.au/pay-and-wages/paying-wages/pay-slips' },
    ],
  },
  {
    slug: 'income-statement-explained-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'What is an income statement? Explained for international students',
    description: 'Your income statement is the yearly record of your pay and tax from each employer. How students find it, read it, and fix a missing or wrong one before lodging.',
    answer: 'An income statement is the end of year summary of what one employer paid you and how much tax they withheld. Your employer reports it to the ATO through payroll, and you can see it in ATO online services through myGov.',
    body: `If you worked in Australia during the financial year, each employer has a record of your pay. That record is called an income statement. It is the main document your tax return is built from. Many students never see it, because it is not posted or emailed to you. It sits with the ATO.

## What is an income statement?

An income statement shows, for one employer and one financial year, how much you were paid and how much tax was taken out. It replaced the old paper payment summary. If you had three jobs in the year, you have three income statements.

The two numbers that matter most are:

- your gross pay (salary and wages before tax)
- the total tax withheld

Your super contributions are reported to the ATO separately by your fund, and you can check them in ATO online services.

## Where does it come from?

Your employer does not fill in a form at the end of the year. Their payroll software reports your pay and tax to the ATO every time they pay you. This is called Single Touch Payroll. The income statement is the running total of those reports.

This has one big benefit for students. Even if you have moved city, changed jobs or lost contact with a former employer, your pay record is already with the ATO. You do not need to chase the old employer for paperwork.

## How do you find yours?

You can see your income statements in ATO online services. Sign in to myGov, make sure the ATO is a linked service, then open your income statements. If you use a tax agent, they can see the same data through their own ATO access.

If you are leaving Australia, the ATO says an employer must give you a payment summary within 14 days if you ask for one when you leave. This can be useful if you want a copy before the year ends.

## What does "Tax ready" mean?

During the year, your income statement shows figures that are still changing. After 30 June, your employer finalises it. Once they do, its status changes to "Tax ready". The ATO says most employers finalise by 14 July.

Wait until every one of your income statements says "Tax ready" before you lodge. If you lodge earlier, the figures may still change, and your return may no longer match what the ATO holds. That can mean delays or an amendment later.

This matters more for students than for many other workers. Students often have two or three casual jobs in a year, and each employer finalises on its own timetable. One employer may be "Tax ready" in early July while another takes longer. Check every statement, not only the first one you see.

## How do you check the figures?

Take a few minutes with your payslips and your bank statements. Check three things for each employer:

- **Gross pay.** Add up the gross pay from your payslips for the year. It should be close to the statement. A big gap may mean a missing pay or a reporting error.
- **Tax withheld.** Compare the total with your payslips. If it is much higher or lower than you expected, look at your TFN declaration for that job.
- **The employer name.** Some businesses report under a company name you do not recognise. Match it to the ABN on your payslip.

## What if an employer is missing?

A missing income statement is common, and there are a few reasons for it:

- the employer has not finalised yet, so waiting a little longer may fix it
- the employer reported you under the wrong name, date of birth or TFN, so the record is not linked to you
- you were paid outside payroll, for example cash in hand, so no report was made

In every case, the income is still taxable. The ATO says salary and wages, tips and other payments for services are all assessable, and cash income must be declared. Your payslips and bank records become your evidence.

If your employer used the wrong name or TFN, contact them and ask them to correct it in their payroll. Once they do, the statement should appear in your ATO account. Give them your details exactly as they appear on your TFN letter.

## What if the figures are wrong?

Ask the employer to fix it. Only the employer can correct their payroll report. Put your request in writing, and attach the payslip that shows the right figure.

If the employer will not respond, do not lodge a return that quietly uses different numbers. Talk to your tax agent about how to show the correct income with your evidence. Remember that individuals generally have 2 years from the notice of assessment to amend a return, so a fix later is possible if the employer corrects the record after you lodge.

The income statement students most often forget is the short one: two weeks of event work, a trial of a few shifts that was paid, a tutoring agency in the summer. Before you lodge, list every place that paid you between 1 July and 30 June, then match each one to a statement. A forgotten job can mean a tax bill later, or tax withheld that you never get back.

## Your checklist

- Sign in to myGov and open your ATO income statements.
- List every employer you had in the financial year.
- Wait until each statement says "Tax ready".
- Compare gross pay and tax withheld with your payslips.
- Ask the employer in writing to fix any error.
- Keep your payslips and bank statements with your tax records.`,
    faq: [
      { q: 'Will my employer send me an income statement?', a: 'Usually not. It is reported to the ATO and you see it in ATO online services through myGov, or your tax agent sees it for you.' },
      { q: 'Can I lodge before my statement is "Tax ready"?', a: 'You can, but it is better to wait. The figures can still change, and a return that does not match the ATO record may be delayed or need an amendment.' },
      { q: 'My old employer closed down. Is my income statement lost?', a: 'Not if they reported through payroll during the year. The record is already with the ATO. If it was never reported, your payslips and bank statements are your evidence.' },
    ],
    sources: [
      { label: 'ATO: Access your income statement', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/access-your-income-statement` },
      { label: 'ATO: Taxable, assessable and exempt income', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/income-you-must-declare/taxable-assessable-and-exempt-income` },
      { label: 'ATO: Returning to your home country', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/returning-to-your-home-country` },
    ],
  },
  {
    slug: 'what-is-the-ato-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'What is the ATO? A plain guide for international students',
    description: 'The Australian Taxation Office runs tax and super. What it does for a student, how it learns about your pay, when it contacts you, and how to spot a fake ATO call.',
    answer: 'The ATO, or Australian Taxation Office, is the Australian Government agency that runs the tax and super systems. For an international student, it issues your TFN, receives reports of your pay, processes your tax return and handles super claims when you leave.',
    body: `When you start working in Australia, you hear about the ATO almost straight away. Your employer asks for your tax file number. Your payslip says tax was sent to the ATO. Friends talk about lodging with the ATO. This guide explains what the ATO is and how it fits into your life as a student.

## What is the ATO?

The ATO is the Australian Taxation Office. It is the government agency that collects tax and runs the superannuation (super) system. It is separate from Home Affairs, which handles visas, and from Services Australia, which handles Medicare.

The ATO does not decide anything about your visa. It deals with your income, your tax and your super.

## What does the ATO do for an international student?

Most students deal with the ATO in four ways during their time in Australia:

- **It issues your tax file number (TFN).** You apply online for free if your visa lets you work and you are in Australia. Your TFN is posted to your Australian address.
- **It receives reports about your pay.** Employers report your wages and tax withheld every payday, and super funds report your contributions.
- **It processes your tax return.** After 30 June you lodge a return. The ATO works out your tax, sends a notice of assessment, and pays any refund into your Australian bank account.
- **It is part of claiming your super when you leave.** After your visa ends and you leave Australia, you can apply for a departing Australia superannuation payment (DASP). The ATO DASP online system is free.

## How does the ATO know what you earned?

Your employer tells the ATO each time you are paid. This is called Single Touch Payroll. By the end of the year, the ATO already has a record of your pay and tax from each employer. This record is your income statement.

Banks also report interest on your Australian accounts. Super funds report what your employer paid into your fund. This is why the ATO can often spot a missing job or missing interest on a return.

## How do you deal with the ATO?

Most students use one of these:

- **myGov.** Create a myGov account and link it to the ATO. Then you can see your income statements, track your super, update your details and lodge with myTax.
- **The ATO app.** It gives access to the same online services on your phone.
- **A registered tax agent.** A tax agent can lodge for you and deal with the ATO on your behalf.

You do not have to choose only one. Many students use myGov to check their details during the year and a tax agent to prepare their return. If you use a tax agent, the ATO can talk to them about your return, which helps when you are busy with study or have left Australia.

## When would the ATO contact you?

Many students never hear from the ATO apart from their notice of assessment. The ATO may contact you if it needs more information to process your return, if a figure on your return does not match its records, or if you owe tax.

Letters are often sent by post to the address the ATO has for you. If you move, update your address. A letter you never see can still matter.

If the ATO asks you for information, reply by the date in the letter. Keep a copy of what you send. Most requests are simple, such as a copy of a payslip or a receipt for a deduction. Answering quickly is usually the fastest way to finish your return.

## How do you spot a fake ATO contact?

Scammers pretend to be the ATO, and international students are often targeted. The ATO says it will never:

- send you an unsolicited email or text with a link or QR code
- ask for your personal details by email or SMS
- threaten you with arrest or insist that you stay on the phone
- ask for payment by gift cards, cryptocurrency or to a personal or overseas bank account
- threaten to cancel your TFN or charge a fee for you to receive a refund
- contact you through private messages on social media

If you are not sure whether a contact is real, do not reply. The ATO says you can call 1800 008 540 to check. You can also sign in to myGov and look at your ATO account yourself, or ask your tax agent.

## Do you still deal with the ATO after you leave?

Yes. If you worked, you will probably need to lodge a tax return after 30 June, even if you have already gone home. You can lodge from overseas with myTax, through a registered tax agent, or on paper. Update your myGov sign-in settings before you leave so they work from overseas.

Your super claim also involves the ATO after you leave. If your fund cannot pay you, or six months pass after your visa ends and you have left, your super is transferred to the ATO. You can still claim it.

## Your checklist

- Apply for your TFN when you get work rights, and keep it private.
- Create a myGov account and link it to the ATO.
- Keep your address, email and bank details up to date.
- Check every call or message that says it is from the ATO before you act.
- After 30 June, lodge a return if you need to, once your income statements are "Tax ready".`,
    faq: [
      { q: 'Is the ATO part of immigration?', a: 'No. The ATO runs tax and super. Visas are handled by the Department of Home Affairs.' },
      { q: 'Does it cost money to get a TFN from the ATO?', a: 'No. Applying for a TFN is free. Never pay a website to apply for you.' },
      { q: 'Someone called saying I owe the ATO money and must pay today. What should I do?', a: 'Hang up and do not pay. The ATO says you can call 1800 008 540 to check, or sign in to myGov to see your real ATO account.' },
    ],
    sources: [
      { label: 'ATO: Verify or report an ATO scam', href: `${ATO}/online-services/scams-cyber-safety-and-identity-protection/verify-or-report-an-ato-scam` },
      { label: 'ATO: TFN application for foreign passport holders and temporary visitors', href: `${ATO}/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application` },
      { label: 'ATO: Access your income statement', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/access-your-income-statement` },
      { label: 'ATO: Departing Australia superannuation payment (DASP)', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp` },
    ],
  },
  {
    slug: 'gross-pay-vs-net-pay-student-visa',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Gross pay vs net pay on a student visa: reading your payslip',
    description: 'Gross pay is before tax, net pay is what reaches your bank. How students read each line, why super is paid on top, and which figure your tax return uses.',
    answer: 'Gross pay is the total you earned before anything is taken out. Net pay is what is left after tax and any other deductions, and it is the amount paid into your bank account. Super is paid by your employer on top of your gross pay, into your super fund.',
    body: `Your first Australian payslip can be confusing. There are several numbers, and the one in your bank account is not the one at the top. This guide explains the difference between gross pay and net pay, where super fits, and why it matters at tax time.

## What is gross pay?

Gross pay is everything you earned in the pay period before any deduction. It includes your ordinary hours at your hourly rate, plus any penalty rates, loadings, allowances and overtime you were paid.

Fair Work says your payslip must show your gross pay, your ordinary hourly rate and the hours worked at that rate, and any loadings, allowances or penalty rates paid.

## What is net pay?

Net pay is your gross pay minus the deductions taken out. For most students the main deduction is tax withheld. Some people also have other deductions they agreed to, such as union fees or salary sacrifice. Your payslip must show each deduction.

Net pay is the amount your employer transfers to your bank account. It is sometimes called take-home pay.

## Where does super fit?

Super is not taken out of your pay. Your employer pays it on top of your wages, into a super fund in your name. The ATO says generally all employees are eligible, including part-time, casual and temporary residents. The rate is 12%.

Your payslip must show the super contributions your employer made for you and the name of the fund. Super does not change your net pay. If a payslip seems to subtract super from your wages to reach your net pay, ask your employer about it.

## A worked example

Here is a simple, made-up payslip for one week of casual work:

- Ordinary hours: 15 hours at $30.00 = $450.00
- Sunday penalty hours: 2 hours at $45.00 = $90.00
- **Gross pay: $540.00**
- Tax withheld: $45.00
- **Net pay: $495.00** (paid to your bank)
- Super: $64.80 (12% of $540.00, paid to your super fund)

In this example the penalty hours are ordinary hours, so they count for super. Overtime is different: the ATO says overtime is generally not included in the earnings super is worked out on.

The rates above are only for the example. Your real rate depends on your award or agreement. You can check it with the Fair Work Pay Calculator.

## Which figure does your tax return use?

Your tax return uses gross pay, not net pay. The ATO works out your tax on your gross income for the year. Then it subtracts the tax that was already withheld. The result is your refund, or what you owe.

This surprises many students who track their income in a banking app. The bank only shows net pay, so your year looks smaller there than it really is. Your income statement shows the gross figure.

It also matters for your records. If you add up your bank deposits to check your income, remember that you are adding net amounts. To compare with your income statement, add up the gross pay from your payslips instead.

## Why can two students with the same gross pay keep different amounts?

Your gross pay depends on your job. Your net pay also depends on your tax situation. Two students who earn the same gross pay can have very different net pay because of:

- **Residency for tax purposes.** A student enrolled in a course of 6 months or more may be a resident and may claim the tax-free threshold. Foreign residents pay tax from the first dollar.
- **The tax-free threshold.** It should be claimed from one employer only.
- **The TFN.** Without a TFN on file after 28 days, tax is withheld at the top rate plus the Medicare levy.
- **The Medicare levy.** It is 2% of taxable income. Many students are not entitled to Medicare and may claim an exemption with a Medicare Entitlement Statement.

Some of these are fixed during the year. Others are only fixed when you lodge your tax return.

For example, tax withheld at the top rate in your first weeks, before your employer had your TFN, makes your net pay smaller at the time. Any extra tax is worked out on your tax return, if any is owed back to you. A payslip shows how much was taken. It does not show whether that was the right amount for your year.

## How do you check your gross pay is right?

Net pay is only right if gross pay is right. Once a month, take one payslip and check it:

- multiply your ordinary hours by your hourly rate
- add any penalty rates for weekends, public holidays, late nights or early mornings
- add any allowances and overtime
- compare your total with the gross pay on the payslip

If the numbers do not match, ask your manager or payroll in writing. Fair Work says visa holders have the same workplace rights as all other employees, and you can contact the Fair Work Ombudsman for help on 13 13 94.

## Your checklist

- Find gross pay, tax withheld, net pay and super on every payslip.
- Check that gross minus deductions equals net.
- Check that super is shown on top of your wages, with a fund name.
- Rebuild your gross pay from your hours once a month.
- Keep every payslip for tax time.`,
    faq: [
      { q: 'Is super part of my net pay?', a: 'No. Super is paid by your employer on top of your wages into your super fund. It is not in your bank transfer.' },
      { q: 'Do I declare gross pay or net pay on my tax return?', a: 'Gross pay. The tax already withheld is then credited against the tax you owe for the year.' },
      { q: 'How soon should I get a payslip?', a: 'Fair Work says within 1 working day of payday. It can be on paper or electronic.' },
    ],
    sources: [
      { label: 'Fair Work: Pay slips', href: 'https://www.fairwork.gov.au/pay-and-wages/paying-wages/pay-slips' },
      { label: 'ATO: Work out if you have to pay super', href: `${ATO}/businesses-and-organisations/super-for-employers/work-out-if-you-have-to-pay-super` },
      { label: 'ATO: What payments are qualifying earnings', href: `${ATO}/businesses-and-organisations/super-for-employers/paying-super-on-payday/what-payments-are-qualifying-earnings` },
      { label: 'ATO: What is the Medicare levy?', href: `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/what-is-the-medicare-levy` },
    ],
  },
  {
    slug: 'tax-on-tips-student-visa',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Do you pay tax on tips on a student visa? Card and cash tips',
    description: 'Tips are taxable income in Australia, card or cash. How tips reach students through payroll or by hand, what goes on your return, and a simple way to record them.',
    answer: 'Yes. The ATO says tips and gratuities are assessable income, so they go on your tax return whether you were paid them by card, through payroll or in cash. Card tips paid through payroll are usually already reported; cash tips you keep yourself are yours to declare.',
    body: `Many international students work in cafes, restaurants, bars and hotels. Tips can add a useful amount to your income, especially on busy weekends. A common question is whether tips are taxed. The short answer is yes. This guide explains how the tax works and what you need to do.

## Are tips taxable in Australia?

Yes. The ATO says assessable income includes salary and wages, tips, gratuities and other payments for your services. It also says cash income must be declared. There is no special rule for students and no small amount that is tax free just because it was a tip.

Tips are added to your other income for the year. They are taxed at the same rates as your wages. For 2025-26, if you may be a resident, the tax-free threshold of $18,200 applies across all your income, tips included. If you are a foreign resident, tax applies from the first dollar.

## How do tips reach you?

How a tip reaches you decides who reports it. There are usually two ways.

- **Through payroll.** Card tips, a service charge or a tip pool paid out by the venue through its payroll. These appear on your payslip, tax is withheld, and they are included in your income statement.
- **By hand.** Cash a customer gives you, or cash split between staff at the end of a shift. Nobody reports this for you. No tax is withheld, and it is not on your income statement.

Both types are income. The difference is only in who records them.

Some venues use both. For example, card tips may be paid through payroll each fortnight, while staff also share a cash jar at the end of each night. In that case, part of your tips is already reported and part is not. Keep the two separate in your notes.

## What do you need to do for payroll tips?

If your tips are paid through payroll, most of the work is already done. Check a payslip to see that the tips are listed. Fair Work says your payslip must show your gross pay and any other payments, so tips paid by your employer should be visible.

At tax time, these tips are already in your income statement figure. Do not add them a second time.

## What do you need to do for cash tips?

You add cash tips to your tax return yourself. To do that accurately, you need a record. You do not need to write down every coin. A simple weekly note is enough for most students:

- the week or date
- the venue
- the total cash tips you kept

A note on your phone works well. Do it each week while you remember. Trying to guess a whole year of tips in October is much harder, and a guess is easy to get wrong.

If you deposit your cash tips into your bank account, your bank statement can also help. It is not a complete record on its own, because you may spend some cash before you bank it. Your weekly note and your bank deposits together give a clear picture.

## A worked example

Suppose a student may be an Australian resident for 2025-26. She earns $21,000 in wages from a restaurant, with tax withheld, and keeps about $40 a week in cash tips for 40 weeks. That is $1,600 in cash tips.

Her total income for the year is $22,600. On the 2025-26 resident rates, the first $18,200 is tax free. The remaining $4,400 is taxed at 16%, which is $704, and the low income tax offset can reduce this further. The cash tips are a small part of the tax, but they must be included.

## What if your tips were not declared?

If you forgot to include tips on a return you already lodged, you can ask for an amendment. The ATO says individuals generally have 2 years from the day after the notice of assessment is sent. Fixing it yourself is better than waiting for the ATO to find it.

Hospitality income is an area the ATO looks at. Bank deposits and venue records can show income that was not declared.

If income is found that was not declared, you may have to pay the tax that was missed, plus interest, and a penalty may apply. Including your tips from the start avoids this. It is also much simpler to add one line to a return than to fix it later.

## Do you get super on tips?

It depends on how the tips are paid. Cash a customer hands you is not paid by your employer, so super is not paid on it. For tips paid through payroll, whether super is paid can depend on how the payment is classed, which a payslip may not explain. If you are not sure, ask payroll in writing, then check your super fund to see what was paid.

## Your checklist

- Look for tips on your payslips. If they are there, they are already reported.
- Keep a weekly note of cash tips you keep.
- Add your cash tips total to your tax return.
- Keep your records for 5 years from when you lodge.
- If you missed tips on an earlier return, ask about an amendment.

If you would like help with a return that includes cash tips, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Is there an amount of tips that is tax free?', a: 'No. Tips are part of your assessable income. If you may be a resident, the tax-free threshold applies to your total income, not to tips alone.' },
      { q: 'My card tips are on my payslip. Do I add them again?', a: 'No. Tips paid through payroll are already in your income statement. Only add tips that were not reported, such as cash you kept.' },
      { q: 'How long should I keep my tip records?', a: 'Keep them with your tax records for 5 years from the date you lodge the return.' },
    ],
    sources: [
      { label: 'ATO: Taxable, assessable and exempt income', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/income-you-must-declare/taxable-assessable-and-exempt-income` },
      { label: 'ATO: Records you need to keep', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/records-you-need-to-keep` },
      { label: 'ATO: Time limits on amendments', href: `${ATO}/individuals-and-families/your-tax-return/amend-your-tax-return/time-limits-on-amendments` },
      { label: 'Fair Work: Pay slips', href: 'https://www.fairwork.gov.au/pay-and-wages/paying-wages/pay-slips' },
    ],
  },
  {
    slug: 'tax-after-leaving-australia-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Tax after you leave Australia: what international students still owe',
    description: 'Finishing your course does not close your tax file. The return, super claim, ABN and contact details students still need to handle after leaving Australia.',
    answer: 'Leaving Australia does not end your tax obligations. If you worked, you will probably still need to lodge a tax return after 30 June, which you can do from overseas, and you can claim your super as a DASP once your visa has ended and you have left.',
    body: `Your course ends, you pack, and you fly home. Your Australian tax and super do not end on the same day. The good news is that almost everything can be done from overseas. This guide lists what is still open after you leave and the order to do it in.

## What is still open when you leave?

Most students who worked have up to four separate tasks. Finishing one does not finish the others.

- lodge a tax return for each financial year you earned income in Australia
- claim your super through a departing Australia superannuation payment (DASP)
- cancel your ABN, if you had one for delivery or other contract work
- keep your contact and bank details current with the ATO and your super funds

## Do you still need to lodge a tax return?

The ATO says that if you worked, you will probably need to lodge a return after 30 June, and you can do this from overseas. The financial year runs from 1 July to 30 June. So if you leave in December, your last return covers 1 July to December, and it is lodged after the next 30 June.

You can lodge from outside Australia with myTax through myGov, through a registered tax agent, or on paper. If you use myTax, update your myGov sign-in settings before you leave so you can still sign in from overseas. The normal lodging period is 1 July to 31 October. A registered tax agent may be able to give you a later due date.

If you stay on in Australia after your course, for example on a 485 graduate visa, your tax return works the same way. You lodge for each financial year you earn income. The difference is only in when your final return happens.

## Can you lodge before you leave?

The ATO says that if you are leaving permanently, you can lodge before 30 June, but only on paper, and it is slower. For most students it is easier to wait until after 30 June, when your income statements are "Tax ready", and lodge online.

Before you go, ask each employer for a payment summary. The ATO says an employer must give you one within 14 days if you ask when you leave. It is a useful record if anything is missing later.

## How do you claim your super?

You can apply for a DASP when all of these are true: you worked on a temporary visa (other than a 405 or 410), your visa has ended, you have left Australia, and you do not hold another active visa. You can start the application before you leave, but you cannot submit it while a temporary visa is still active. The ATO DASP online system is free.

The payment is taxed. If you never held a working holiday visa, the taxed element is taxed at 35%. If you had more than one job, you may have more than one fund, so check each one.

## A worked example

Suppose a graduate leaves Australia with $4,000 in one super fund, all of it a taxed element, and she never held a working holiday visa. After her visa ends, she applies for a DASP. Tax of 35% is $1,400, so the payment is $2,600.

If she does nothing, her fund transfers the super to the ATO 6 months after she leaves and her visa ends. The money is still hers and she can still claim it. It just becomes one more step.

If she had two funds from two jobs, she would make a claim for each one. Before leaving, she can log in to ATO online services and look for any lost or extra accounts, so nothing is left behind. Writing down each fund name and member number takes a few minutes and makes the claims much easier later.

## Do you need to cancel your ABN?

If you had an ABN, for example for food delivery, cancel it when you stop the work. The ABR says to cancel within 28 days once the business has stopped. Cancelling does not remove the need to lodge your final tax return, and any ABN income still goes on it.

## Keep your bank account open

Your tax refund is paid into an Australian bank account. Many students close their account in their last week. This can delay a refund for months. Keep at least one Australian account open until your refund and your super have both been paid.

Also update your address, email and phone with the ATO and with each super fund. Updating the ATO does not update your fund.

If you had an ABN, also keep the records for that work. The ATO says to keep written evidence for 5 years from lodging. A simple folder with your payslips, invoices and receipts is enough, and it can be digital.

## Your checklist before you fly

- Update your myGov sign-in settings so they work overseas.
- Ask each employer for a payment summary.
- Write down every employer and super fund from the year.
- Update your contact details with the ATO and each fund.
- Keep one Australian bank account open.
- Cancel your ABN if you had one.
- After your visa ends, apply for your DASP.
- After 30 June, lodge your final return once statements are "Tax ready".

If you would like your final return done from overseas, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Can I lodge my last tax return from my home country?', a: 'Yes. You can lodge from outside Australia with myTax, through a registered tax agent, or on paper.' },
      { q: 'Can I claim my super while my student visa is still active?', a: 'No. You can start the DASP application, but you can only submit it after your visa has ended and you have left Australia.' },
      { q: 'What happens to my super if I forget about it?', a: 'Six months after you leave and your visa ends, your fund transfers it to the ATO. You can still claim it as a DASP from the ATO.' },
    ],
    sources: [
      { label: 'ATO: Returning to your home country', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/returning-to-your-home-country` },
      { label: 'ATO: Lodge your tax return from outside Australia', href: `${ATO}/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia` },
      { label: 'ATO: Departing Australia superannuation payment (DASP)', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp` },
      { label: 'ABR: When should you cancel your ABN', href: 'https://abr.gov.au/media-centre/featured-news/business-super-funds-charities/when-should-you-cancel-your-abn' },
    ],
  },
  {
    slug: 'tax-residency-international-students-explained',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Tax residency for international students: what changes in practice',
    description: 'A student on a course of 6 months or more may be an Australian resident for tax purposes. What that changes in practice: the threshold, rates, offsets and Medicare.',
    answer: 'An international student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. If you are, you may get the tax-free threshold and resident tax rates, which can change your tax for the whole year.',
    body: `Tax residency is not the same as your visa or your immigration status. It is a tax idea only. You can hold a student visa and still be an Australian resident for tax purposes. You can also be a foreign resident for tax purposes. This guide shows what the difference means in real numbers, and why the answer needs care.

## What is tax residency?

Tax residency decides how Australia taxes your income. It does not affect your visa, and it does not make you a permanent resident. The ATO looks at your situation as a whole. For students, it says that if you are enrolled in a course of 6 months or more, you may be an Australian resident for tax purposes.

This is a "may be", not an automatic yes. Your circumstances are weighed, and the answer can differ between two students who look alike from the outside.

## What changes if you are a resident?

If you may be a resident, several things change at once:

- **The tax-free threshold.** The first $18,200 of your income in the year is tax free. If you were a resident for only part of the year, you may get part of it.
- **Tax rates.** For 2025-26 the resident rates are: $0 to $18,200 nil, $18,201 to $45,000 16%, $45,001 to $135,000 30%, $135,001 to $190,000 37%, and over $190,000 45%.
- **The low income tax offset.** Residents with taxable income below $66,667 may get it, up to $700.
- **Foreign income.** The ATO says a student who is a temporary resident and an Australian resident is generally not taxed on most foreign income. Your Australian income is declared.

## What changes if you are a foreign resident?

Foreign residents do not get the tax-free threshold. For 2025-26, the rate is 30% from the first dollar up to $135,000, then 37%, then 45%. The low income tax offset is only for residents.

## A worked example

Two students each earn $24,000 from part-time work in 2025-26, for the whole year.

- **Student A may be a resident.** The first $18,200 is tax free. The next $5,800 is taxed at 16%, which is $928. The low income tax offset of $700 reduces this to $228.
- **Student B is a foreign resident.** The full $24,000 is taxed at 30%, which is $7,200.

The Medicare levy is not included in these figures. The gap between the two answers is large, and it comes from one question. This is why residency is worth getting right, in both directions.

## Where does residency show up during the year?

You meet the residency question first on your tax file number declaration when you start a job. Your answer changes how much tax your employer withholds.

- If you may be a resident, you can claim the tax-free threshold from one employer only. Claiming it from two jobs often leads to a tax bill.
- If you are a foreign resident, answer no to the threshold on every declaration.

What you write on the form does not decide your final residency. It only sets your withholding. The final position is worked out when your return is prepared.

If you answered the residency question in a way that turns out to be wrong, the tax is corrected on your return. Too much withholding can come back to you, if any is owed. Too little withholding means you pay the difference.

## What about Medicare?

Residency for tax and entitlement to Medicare are separate questions. A student can be a tax resident and still not be entitled to Medicare. Many students have OSHC instead, which is a visa condition.

If you are not entitled to Medicare, you may be able to claim an exemption from the Medicare levy with a Medicare Entitlement Statement from Services Australia. Students from countries with a reciprocal health care agreement may be entitled to Medicare, and then the exemption does not apply.

## Why you should not decide this on your own

Many students guess. Some assume a student visa means foreign resident, and pay more tax than they need to. Others assume they are a resident without looking at their situation, and take a position they cannot support. Both are common mistakes.

A good answer looks at your course length, when you arrived, whether you left Australia during the year, and the other facts of your year together.

Changes during the year also matter. A student who finishes a course and moves to a new visa, or who leaves Australia for good part way through the year, may have a different position for part of the year. In that case the tax-free threshold may only apply in part. These are the cases where a careful review is most useful. It is better to raise them before lodging than after.

## What to do next

- Check how long your course is, from your confirmation of enrolment.
- Note when you arrived and any long trips out of Australia.
- Check the residency answer on each TFN declaration.
- Claim the tax-free threshold from one job only, if you may be a resident.
- Apply for a Medicare Entitlement Statement if you are not entitled to Medicare.

Every Student Visa Tax return is reviewed and signed off by a registered tax agent before it is lodged with the ATO, including the residency position.`,
    faq: [
      { q: 'Does being a tax resident change my visa?', a: 'No. Tax residency is only for tax. It does not change your visa or make you a permanent resident.' },
      { q: 'My course is shorter than 6 months. Am I a foreign resident?', a: 'Often you may be, but it depends on your circumstances as a whole. It is worth checking before you lodge.' },
      { q: 'Do I need to declare income from my home country?', a: 'The ATO says a student who is a temporary resident and an Australian resident is generally not taxed on most foreign income. Your Australian income must be declared.' },
    ],
    sources: [
      { label: 'ATO: Studying in Australia', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia` },
      { label: 'ATO: Australian resident for tax purposes', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/your-tax-residency/australian-resident-for-tax-purposes` },
      { label: 'ATO: Low income tax offset', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/tax-offsets/low-income-tax-offset` },
      { label: 'ATO: Not entitled to Medicare benefits', href: `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/not-entitled-to-medicare-benefits` },
    ],
  },
  {
    slug: 'update-address-with-ato-international-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'How to update your address with the ATO as an international student',
    description: 'Students move often. How to change your address, email and phone with the ATO through myGov, the ATO app, phone or post, and why your super fund needs it too.',
    answer: 'The fastest way is online: sign in to myGov, open the ATO under linked services, then go to My profile, Personal details. You can also use the ATO app, call the ATO, or post the Change of details for individuals form.',
    body: `International students move a lot. You might start in student housing, move to a share house, and then move again when your lease ends. Each time, the ATO still has your old address unless you tell it. This guide explains how to update your details and why it matters more than it seems.

## Why does your address matter to the ATO?

Your refund is paid into your bank account, so it is easy to think the address does not matter. But several important things can still be sent by post:

- your TFN, which the ATO posts to the Australian address you give
- letters asking for more information about your return
- notices about tax you owe
- identity checks that can hold up a return

A letter that goes to your old house is still treated as sent. If it asks a question and you never answer, your return can be delayed or decided without your input.

Your email and phone number matter for the same reason. The ATO and myGov use them for sign-in codes and messages. If you change your phone number and the old one is still on file, you may not be able to sign in when you need to lodge.

## What details can you update?

The ATO lets you update your residential address, postal address, home and mobile phone numbers, and email address. Check all of them, not only the address. An old email or phone number can cause the same problems.

## How do you update your details online?

Online is usually the fastest way.

- **Through ATO online services.** Sign in to myGov, select the Australian Taxation Office under Linked services, then go to My profile, then Personal details. Update your contact details, agree to the declaration, and select Save.
- **Through your myGov profile.** In myGov, go to My Account, then Profile, then Contact details. Here you can choose which linked government services receive the update at the same time.
- **Through the ATO app.** Go to More, then My details, then select Update under Personal details.

If you have not linked the ATO to myGov yet, it is worth doing. You will also use it to see your income statements and lodge your return.

When you save, check the confirmation. Then sign out and sign back in to make sure the new details are showing. It only takes a minute, and it avoids a surprise later.

## Can you update by phone or post?

Yes. You can phone the ATO. You will need to prove your identity, so have your TFN ready.

You can also download the Change of details for individuals form and post it. The ATO says records can take up to 28 days to update after it receives the form, so this is the slowest way.

A registered tax agent can also update your details with the ATO as part of looking after your return.

## Which address should you give?

Give an address where you will still receive mail in a few weeks. If you are about to move, use your new address, or a reliable postal address. This matters most when you are waiting for your TFN, because it only arrives by post.

If you live in student housing or a share house, ask how mail for past tenants is handled. Some places hold mail for a while, others return it. If you are not sure, a friend or relative with a stable Australian address may be a better postal address, if they agree to check your mail.

The ATO keeps a residential address and a postal address separately. If you use a different address for mail, make sure the postal address is the one you can check.

## Does updating the ATO update your super fund?

No. The ATO says its own update methods change your details with the ATO only. Your super fund keeps its own records. If you had more than one job, you may have more than one fund, and each needs your new details.

This matters because a fund that cannot reach you may report your account as lost. When you leave Australia, it may be harder to find. You can see your super accounts in ATO online services, which helps you check which funds to update.

## What about after you leave Australia?

Keep your details current after you finish your course too. Your final tax return, any letters about it, and your DASP super claim all happen after you leave. If you plan to use myTax from overseas, update your myGov sign-in settings before you go so you can still sign in.

Keep your email address current. It is often the easiest way to stay in touch with your tax agent and your super fund from your home country.

Before you fly, it helps to make one list: your TFN, your myGov sign-in details, each super fund and member number, and the Australian bank account you are keeping open. With this list, updating your details from overseas is quick. Keep it somewhere safe and private.

## Your checklist

- Update your address within a week of moving.
- Check your email and mobile number at the same time.
- Use myGov or the ATO app if you can, because it is fastest.
- Update each super fund separately.
- Before you leave Australia, update your details and your myGov sign-in settings.`,
    faq: [
      { q: 'How long does an address change take?', a: 'Online changes are made through your ATO account straight away when you save. A posted form can take up to 28 days after the ATO receives it.' },
      { q: 'I moved before my TFN arrived. What should I do?', a: 'Update your postal address with the ATO as soon as you can, because the TFN is posted. If it does not arrive within 28 days of applying, contact the ATO.' },
      { q: 'Will my university or super fund get my new address?', a: 'Not from the ATO. Update your super fund yourself, and tell your university through its own system.' },
    ],
    sources: [
      { label: 'ATO: Update your personal contact details', href: `${ATO}/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-personal-contact-details` },
      { label: 'ATO: Change of details for individuals', href: `${ATO}/forms-and-instructions/change-of-details-for-individuals` },
      { label: 'ATO: Keeping track of your super online', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/keeping-track-of-your-super-online` },
    ],
  },
  {
    slug: 'what-is-a-tax-refund-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'What is a tax refund? How it works for international students',
    description: 'A tax refund is extra tax withheld during the year that the ATO pays back after you lodge. Why students may get one, why some owe instead, and what decides the result.',
    answer: 'A tax refund is the amount the ATO pays back when more tax was withheld from your pay during the year than you actually owe. It is worked out when you lodge your tax return, and some students get a refund while others owe tax.',
    body: `Many international students hear that a tax return means money back. Sometimes it does. Sometimes it does not. A refund is not a bonus or a payment for students. It is your own tax being returned because too much was taken. This guide explains how a refund is worked out, what makes it bigger or smaller, and why some students owe instead.

## What is a tax refund?

During the year, your employer withholds tax from each pay and sends it to the ATO. That amount is an estimate. After the year ends on 30 June, you lodge a tax return. The ATO works out the real tax on your total income and compares it with all the tax that was withheld.

- If the tax withheld is more than the tax you owe, the ATO pays you the difference. That is your refund.
- If the tax withheld is less than you owe, you have a tax bill.

The ATO sends a notice of assessment that shows the result, and pays any refund into your Australian bank account.

## Why might a student get a refund?

Withholding is worked out pay by pay. It assumes each pay is typical of your whole year. Student work is often uneven, so the estimate is often wrong. Common reasons for over-withholding include:

- you arrived or started work part way through the financial year
- your hours went up and down, for example more hours in the holidays
- you did not give your employer your TFN in time, so the top rate applied for a while
- you may be a resident but did not claim the tax-free threshold from any job
- the Medicare levy was withheld, but you are not entitled to Medicare and may claim an exemption
- you have work deductions that reduce your taxable income

## Why might a student owe tax instead?

Some students are surprised to get a bill. The most common reasons are:

- claiming the tax-free threshold from two or more employers, so too little was withheld
- ABN work, such as food delivery, where no tax is taken from your pay
- cash income or cash tips that had no tax withheld
- answering that you are a resident on your TFN declaration when you are a foreign resident

If you owe, the ATO lets you set up a payment plan in some cases. It is better to know early.

A tax bill is not a penalty. It is the tax that should have been taken during the year but was not. If you know you have ABN or cash income, you can put some money aside each week so the bill is easier to pay.

## A worked example

Suppose a student may be an Australian resident for 2025-26 and earns $24,000 from one job, with $1,500 tax withheld during the year.

- Tax on $24,000 at the 2025-26 resident rates: the first $18,200 is tax free, the next $5,800 at 16% is $928.
- The low income tax offset of $700 reduces this to $228.
- The tax withheld was $1,500, so before the Medicare levy is worked out, the difference is $1,272.

If the student is not entitled to Medicare and gets a Medicare Entitlement Statement, they may be exempt from the levy. If the same student were a foreign resident, the tax would be 30% of $24,000, which is $7,200, and the same $1,500 withheld would leave a bill. This is an example only. Your result depends on your own year.

## What decides the size of your refund?

You cannot know your result from one payslip. It depends on your whole year:

- your residency for tax purposes
- how many jobs you had, and which one had the tax-free threshold
- the total tax withheld across all your income statements
- any income with no tax withheld, such as ABN or cash income
- your Medicare position
- any deductions you can support with records

The first two often matter most. A change in residency can change the tax on the same income by thousands of dollars, as the example above shows. And a second job that claimed the tax-free threshold can turn an expected refund into a bill. These are worth checking before you think about deductions.

## When does a refund arrive?

The ATO says most online returns are processed within 12 business days. Some need a manual check, which can take up to 30 calendar days. Paper returns take up to 50 business days. The refund goes to your Australian bank account, so keep it open until the refund is paid.

Lodging early does not always mean a faster refund. If you lodge before your income statements are "Tax ready", or before your Medicare Entitlement Statement arrives, your return may need corrections later. A complete return is usually the quickest one.

## Your checklist

- Wait until all your income statements say "Tax ready".
- List every job and any cash or ABN income.
- Check your TFN declarations for the tax-free threshold.
- Apply for a Medicare Entitlement Statement if you are not entitled to Medicare.
- Keep receipts for any work expenses.
- Keep an Australian bank account open.

If you would like your return done for you, you can message Student Visa Tax on WhatsApp. We look at your whole year and tell you the result, refund or not, before anything is lodged.`,
    faq: [
      { q: 'Does every international student get a tax refund?', a: 'No. A refund only happens if more tax was withheld than you owe. Some students get one, some get nothing back, and some owe tax.' },
      { q: 'Can my refund go to a bank account in my home country?', a: 'The ATO pays refunds into an Australian bank account, so keep one open until your refund arrives.' },
      { q: 'I did not lodge last year. Can I still get a refund for that year?', a: 'You can still lodge a return for an earlier year. Whether there is a refund depends on what was withheld and what you owed.' },
    ],
    sources: [
      { label: 'ATO: Low income tax offset', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/tax-offsets/low-income-tax-offset` },
      { label: 'ATO: How to track the progress of your tax return', href: `${ATO}/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return` },
      { label: 'ATO: Income from more than one job', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job` },
      { label: 'ATO: Not entitled to Medicare benefits', href: `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/not-entitled-to-medicare-benefits` },
    ],
  },
  {
    slug: 'tax-refund-delays-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Why is my tax refund late? Common delays for international students',
    description: 'Most online returns are processed within 12 business days. Why a student refund can take longer, from Medicare statements to bank details, and how to check progress.',
    answer: 'The ATO says most online returns are processed within 12 business days, but a return that needs a manual check can take up to 30 calendar days. For students, the usual causes of delay are lodging too early, a mismatch with ATO records, or wrong bank details.',
    body: `You lodged your return and now you are waiting. Your friend got their refund in a week, but yours has not arrived. This guide looks at the reasons a student refund can be slower, how to check where your return is, and what you can do to avoid delays next year.

## How long should it take?

The ATO gives these processing times:

- most online returns are processed within 12 business days
- returns that need manual processing can take up to 30 calendar days
- paper returns can take up to 50 business days

Business days do not include weekends or public holidays. So 12 business days is often about two and a half weeks on the calendar.

These times start when the ATO receives your return, not when you first started preparing it. If you are waiting for documents, the clock has not started yet. For students, the time before lodging is often longer than the processing time itself.

## How do you check the progress?

You can track your return in ATO online services through myGov. Look for the progress of your tax return. If a tax agent lodged for you, they can see the status too and can talk to the ATO for you.

The status shows the stage, such as received, in progress or finalised. When it is finalised, the ATO issues your notice of assessment.

## Delay 1: waiting for the Medicare Entitlement Statement

Many students are not entitled to Medicare and may claim an exemption from the Medicare levy. To do this you need a Medicare Entitlement Statement from Services Australia. The ATO says to wait for the statement before you lodge. Applications open on 1 July, and the ATO says it can take up to 8 weeks.

This wait happens before lodging, so it does not show as a slow refund. But it is often the reason a student lodges later than a friend who is entitled to Medicare.

## Delay 2: lodging before your income statements were ready

Employers finalise your income statement after 30 June, and most do this by 14 July. If you lodge before a statement says "Tax ready", the figures can change. The ATO may then find that your return does not match its records, and your return may need a manual check.

## Delay 3: a mismatch with ATO records

The ATO already holds data from employers, banks and super funds. If your return leaves out a job, or bank interest, or uses a different figure, the return may be checked by a person. Common examples for students are:

- a short job that was forgotten
- a second income statement under a company name you did not recognise
- interest on an Australian savings account that was not included

If the ATO finds a difference, it may adjust your return or ask you about it. Either way, it takes longer than a return that matched from the start. Check your ATO account for all income statements and bank interest before you lodge.

Students with a second or third job are most likely to miss something. If your employer is a large group, the income statement may show the name of a parent company. Match the ABN on your payslip to the ABN on the statement.

## Delay 4: bank details and identity checks

Your refund is paid into an Australian bank account. If the BSB or account number is wrong, or the account is closed, the payment cannot be made. This often happens when a student closes their account before leaving Australia. Keep your account open until your refund is paid, and check the details on your return carefully.

If this is your first Australian return, or details on your return differ from what the ATO has, the ATO may need to confirm who you are. Letters about this can be posted. If your address is old, you may not see the letter. Update your address, email and phone with the ATO when you move.

## What can you do while you wait?

- Check the status in ATO online services before you call anyone.
- Make sure your contact details are current, so you see any ATO request.
- Answer any ATO request quickly and fully.
- Do not lodge a second return for the same year. If something was wrong, ask about an amendment instead.
- If you used a tax agent, ask them to look at the status for you.

Be careful of messages that say you can speed up your refund by paying a fee or clicking a link. The ATO says it never charges a fee for you to receive a refund and never sends unsolicited links by email or SMS.

## How to get a faster refund next year

- Apply for your Medicare Entitlement Statement soon after 1 July, if you need one.
- Wait until all income statements say "Tax ready".
- List every job and every bank account before you lodge.
- Check your bank details twice.
- Keep your address and email current with the ATO.
- Keep a list of every employer and every Australian bank account during the year, so nothing is missed at tax time.

A return that is complete when it is lodged is usually the fastest one. A few extra days of checking before you lodge can save weeks of waiting afterwards.`,
    faq: [
      { q: 'It has been 12 business days. Should I call the ATO?', a: 'Check the status in ATO online services first. If the return needs manual processing, the ATO says it can take up to 30 calendar days.' },
      { q: 'Can I lodge before my Medicare Entitlement Statement arrives?', a: 'The ATO says to wait for the statement before lodging if you are claiming the Medicare levy exemption.' },
      { q: 'My Australian bank account is closed. What happens to my refund?', a: 'The payment cannot reach a closed account. Contact the ATO or your tax agent to give correct Australian bank details.' },
    ],
    sources: [
      { label: 'ATO: How to track the progress of your tax return', href: `${ATO}/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return` },
      { label: 'ATO: Not entitled to Medicare benefits', href: `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/not-entitled-to-medicare-benefits` },
      { label: 'ATO: Access your income statement', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/access-your-income-statement` },
      { label: 'ATO: Verify or report an ATO scam', href: `${ATO}/online-services/scams-cyber-safety-and-identity-protection/verify-or-report-an-ato-scam` },
    ],
  },
  {
    slug: 'super-for-casual-student-workers',
    category: 'Super',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Super for casual and part-time international students',
    description: 'Casual and part-time students are generally entitled to 12% super, whatever they earn. What it is paid on, when it must arrive under Payday Super, and how to check.',
    answer: 'Yes. The ATO says generally all employees are entitled to super, including casual and part-time workers and temporary residents, regardless of how much they earn. The rate is 12%, paid by your employer on top of your wages.',
    body: `Most international students work casual or part-time jobs. Many think super is only for full-time workers, or only for people who will stay in Australia. That is not right. This guide explains how super works for casual and part-time students, what it is paid on, and how to check it has been paid.

## What is super?

Superannuation, or super, is money your employer pays into a fund for you. It is meant for retirement. For a temporary resident who leaves Australia, it can usually be claimed as a departing Australia superannuation payment (DASP) after the visa ends.

Super is paid on top of your wages. It does not come out of your pay.

Super is also separate from tax. Tax withheld goes to the ATO. Super goes to your fund. Both should appear on your payslip as different lines.

## Do casual and part-time workers get super?

Yes. The ATO says generally all employees are eligible for the super guarantee, whether full-time, part-time or casual, and regardless of how much they earn. This generally includes temporary residents, such as students. The rate is 12%.

There are some exceptions. Workers under 18 only get super for weeks they work more than 30 hours. This is rare for university students but can matter for younger students.

Being on a student visa does not change your right to super. The same rules apply to you as to an Australian worker in the same job. If an employer says casual students do not get super, that is not correct. Ask them to check, and keep a record of what they say.

Casual loading does not replace super. Casual loading is extra pay casuals get instead of things like paid leave. It is not instead of super. Your employer pays both.

In fact, the ATO lists casual loading as part of the earnings super is worked out on. So super should be paid on your loaded rate, not only on a base rate.

## What is super paid on?

Super is worked out on your qualifying earnings. The ATO says these include your pay for ordinary hours, and lists casual loading and shift penalties, including public holiday penalties, as included. Overtime is generally not included.

- ordinary hours at your hourly rate: included
- casual loading: included
- shift penalties for ordinary hours: included
- overtime: generally not included

## A worked example

A student works a casual job and earns $600 in one week. All of it is for ordinary hours, including casual loading and a Sunday shift penalty. No overtime was worked.

Super for that week is 12% of $600, which is $72. This is paid into her super fund. Her $600 gross pay is taxed as normal, and her net pay does not change because of super.

If the same student also worked 3 hours of overtime that week, paid at an overtime rate, that overtime pay would generally not be included in the $600 used for super. Her payslip would still show the overtime as part of her gross pay.

## When must super be paid?

From 1 July 2026, Payday Super applies. Employers must pay super at the same time as wages, and it must reach your fund within 7 business days after payday. For a new employee, the first contribution may take up to 20 business days.

Before 1 July 2026, employers could pay quarterly. So for work before that date, a gap of some weeks between your payslip and your fund was normal.

## How do you check it is being paid?

A payslip shows what your employer says they paid. Your fund shows what arrived. Check both.

- Fair Work says your payslip must show super contributions and the fund name.
- Log in to your super fund and look at your contributions.
- In ATO online services, you can see employer contribution payments and find lost accounts.

If super is missing, ask your employer first. If it is still not paid, you can report unpaid super to the ATO with its online tool. You will need your TFN, the period and the employer ABN.

## Many jobs can mean many funds

If you did not choose a fund, each employer may have opened a new one for you. Three casual jobs could mean three funds, each with its own fees. Most employees can choose which fund receives their super. Give each new employer the same fund details if you want everything in one place.

Many funds give you a form or a letter with your fund details, which you can hand to a new employer. Keep it with your TFN details so it is ready when you start a job. Using one fund also makes your DASP claim simpler when you leave Australia. It also means fewer sets of fees.

If you already have several funds, you can consolidate them. The ATO says to check first, because you may lose insurance in an old fund, and fees can apply.

## Your checklist

- Check every payslip shows super and a fund name.
- Log in to your fund and compare the contributions.
- Choose one fund and give the details to each new employer.
- Look for lost or extra accounts in ATO online services.
- Report unpaid super if your employer does not fix it.
- When you leave Australia, claim your super as a DASP after your visa ends.`,
    faq: [
      { q: 'Do I get super if I only work a few hours a week?', a: 'Generally yes. The ATO says employees are eligible regardless of how much they earn. Workers under 18 only get super for weeks they work more than 30 hours.' },
      { q: 'Is super paid on overtime?', a: 'Generally no. Super is worked out on qualifying earnings, which generally do not include overtime.' },
      { q: 'Can I get my super when I go home?', a: 'Usually, yes. After your visa ends and you leave Australia, you can apply for a DASP. If you never held a working holiday visa, the taxed element is taxed at 35%.' },
    ],
    sources: [
      { label: 'ATO: Super from your employer', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/super-from-your-employer` },
      { label: 'ATO: What payments are qualifying earnings', href: `${ATO}/businesses-and-organisations/super-for-employers/paying-super-on-payday/what-payments-are-qualifying-earnings` },
      { label: 'Fair Work: Payday Super', href: 'https://www.fairwork.gov.au/newsroom/news/payday-super-new-rules-starting-1-july-2026' },
      { label: 'ATO: Report unpaid super contributions from my employer', href: `${ATO}/calculators-and-tools/super-report-unpaid-super-contributions-from-my-employer` },
    ],
  },
]
