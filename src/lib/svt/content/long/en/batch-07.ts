import type { LongArticle } from '../types'

const ATO = 'https://www.ato.gov.au'

export const LONG_EN_07: readonly LongArticle[] = [
  {
    slug: 'wage-theft-recover-pay-international-students',
    category: 'Work',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Wage theft on a student visa: how to recover unpaid pay',
    description: 'Deliberate underpayment can now be a crime in Australia. How international students can work out what they are owed, keep evidence and ask for it back.',
    answer: 'If your employer paid you less than the award or the national minimum wage, the money is still yours and you can ask for it back, with free help from the Fair Work Ombudsman. Visa holders have the same workplace rights as every other employee.',
    body: `Many international students work in cafés, restaurants, cleaning, warehouses and delivery while they study. Most employers pay correctly. Some do not, and a few do it on purpose because they think a student will stay quiet. This guide explains what wage theft is, how to check your own pay, and the steps to get back what you are owed.

## What does wage theft look like?

Wage theft is when an employer does not pay you what the law says you must get. It is not only a low hourly rate. It often looks like something small or normal at the time.

- An hourly rate below the award rate or the national minimum wage
- The same rate for every hour, even late nights, weekends and public holidays
- Unpaid "training" or trial shifts that go on far longer than a short skills test
- Cash in hand with no pay slip
- Money taken out of your pay for things the law does not allow
- Super that never reaches your super fund
- Being told to get an ABN for work that is really a normal job

Some underpayment is a payroll mistake. Some is deliberate. Either way, the amount you are owed is the same.

## When is underpayment a crime?

Since 1 January 2025, an employer who **intentionally** underpays wages or entitlements can commit a criminal offence. Honest mistakes are not covered by the criminal law. Criminal cases are started by the Commonwealth Director of Public Prosecutions, not by you, and the penalties can include fines and prison.

For you as a worker, the most important point is simpler. Whether or not a crime happened, you can still claim the money. The Fair Work Ombudsman helps employees recover unpaid wages, and its help is free.

## How do you check your own pay?

Start with the facts on paper. Your employer must give you a pay slip within one working day of payday. It must show your pay period, your gross and net pay, your ordinary hourly rate and hours, any loadings or penalty rates, each deduction, and the super paid for you and the fund it went to.

From the first full pay period starting on or after 1 July 2026, the national minimum wage is $26.44 an hour for adults. Most jobs are covered by an award, and award rates are often higher. Casual workers also get a casual loading on top of the base rate, set by the award. The Fair Work Pay Calculator shows the correct rate for your job and award.

**A worked example.** Mai is a casual kitchen hand. She is paid $20 an hour in cash for 15 hours a week. Even before her award rate, casual loading or weekend penalty rates are counted, she is at least $6.44 an hour below the national minimum wage. That is at least $96.60 a week. After 10 weeks, she is owed at least $966, and the real figure is likely higher once the award is applied.

## What evidence should you keep?

A claim is much stronger with records. It is easiest to collect them while you still work there.

- Every pay slip, saved as a file or photo on your own phone
- Your rosters, plus your own note of the real start and finish time of each shift
- Your letter of offer or contract, if you have one
- Messages and emails about pay, shifts and deductions
- Bank statements that show what was actually paid
- Super fund statements that show what arrived and when

A short note in your phone after each shift takes seconds. It is often the record that decides a dispute.

## How do you ask for the money?

Go step by step. Most problems are fixed at the first or second step.

- Write to your employer. Say the dates, the hours, the rate you were paid and the rate you believe is correct. Keep it calm and short.
- Keep a copy of your message and any reply.
- If nothing changes, contact the Fair Work Ombudsman on 13 13 94. If you need an interpreter, call 13 14 50 first.
- You can also use the Fair Work anonymous report form if you only want to report the business.

If you are not sure your rate is wrong, ask Fair Work before you write to your employer. Having the correct figure makes the conversation easier.

## Will asking for your pay affect your visa?

Fair Work says visa holders have the same workplace rights as all other employees. Fair Work also says your visa will not be cancelled because you contacted the Fair Work Ombudsman for help. It can help with your minimum pay even if you worked outside your visa conditions, although there may still be separate migration consequences. For questions about your visa itself, check with the Department of Home Affairs.

Your employer has no power over your visa. A threat to "call immigration" is a pressure tactic, and you can tell Fair Work about it.

## What about super and tax?

Unpaid super is handled by the ATO, not Fair Work. You can ask your employer first, check your fund statements, and then report unpaid super with the ATO online tool. You will need your TFN, the period, and the employer's ABN if you know it. The ATO tells you if it can collect.

Back pay is still income. Wages, tips and other payments for your work are assessable income, and cash income must be declared too. When you receive back pay, make sure it is included in your tax return in the right way, so your return matches what the ATO is told.

## Your checklist

- Save every pay slip and write down your real hours after each shift
- Check your rate with the Fair Work Pay Calculator
- Ask your employer in writing, and keep a copy
- Contact the Fair Work Ombudsman on 13 13 94 if it is not fixed
- Report unpaid super to the ATO separately
- Keep your Australian bank account open until the money is paid

If you are owed money and also need your tax return done, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Does it cost money to get help from the Fair Work Ombudsman?', a: 'No. The Fair Work Ombudsman gives free information and help to employees, including visa holders.' },
      { q: 'Can I still claim if I was paid cash and have no pay slips?', a: 'Yes. Your own notes of hours, rosters, messages and bank deposits can all help show what you worked and what you were paid.' },
      { q: 'Is my employer going to jail for underpaying me?', a: 'Only intentional underpayment can be a crime, and criminal cases are decided by prosecutors and courts. Your claim for the money does not depend on that.' },
    ],
    sources: [
      { label: 'Fair Work Ombudsman: Criminalising wage underpayments', href: 'https://www.fairwork.gov.au/about-us/workplace-laws/legislation-changes/closing-loopholes/criminalising-wage-underpayments-and-other-issues' },
      { label: 'Fair Work Ombudsman: Visa holders and migrants', href: 'https://www.fairwork.gov.au/find-help-for/visa-holders-migrants' },
      { label: 'Fair Work Ombudsman: Pay slips', href: 'https://www.fairwork.gov.au/pay-and-wages/paying-wages/pay-slips' },
      { label: 'ATO: Report unpaid super contributions from my employer', href: `${ATO}/calculators-and-tools/super-report-unpaid-super-contributions-from-my-employer` },
    ],
  },
  {
    slug: 'super-balance-payslip-check-students',
    category: 'Super',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Check your super balance against your pay slips: a student guide',
    description: 'Since Payday Super started on 1 July 2026, super should reach your fund soon after each payday. How students can match pay slips to their fund, step by step.',
    answer: 'Find the super amount on each pay slip, then check that the same amount reached your fund, usually within 7 business days of payday under the Payday Super rules. You can see your funds and employer payments in ATO online services through myGov.',
    body: `Super is money your employer pays for you on top of your wages. It goes straight to a super fund, not to your bank account, so you will not notice if it is missing. For international students this matters at the end of the course, because the super you leave behind can be claimed when you leave Australia. This guide shows how to check it properly, one pay slip at a time.

## Why does your balance need checking?

Your wages arrive in your bank account, so you see quickly if they are wrong. Super is different. It goes to a fund you may never log in to. If an employer pays late or not at all, nothing in your normal banking will tell you.

Generally all employees get super, including casual and part-time workers and temporary residents. The super guarantee rate is 12%. Workers under 18 only get it for weeks they work more than 30 hours.

## What changed on 1 July 2026?

From 1 July 2026, the Payday Super rules apply. Employers must pay super at the same time as wages, and the money must reach your fund within 7 business days. For a new employee, the first contribution has 20 business days.

This makes checking much easier than before. You no longer need to wait for the end of a quarter. If you were paid two weeks ago and no super has arrived, that is worth a question.

## Where can you see your super?

There are two places to look, and it is best to use both.

- **Your fund.** Your pay slip must show the name of your super fund. Log in to the fund's website or app with your member number.
- **ATO online services.** Sign in to myGov with your ATO account linked. Under Super, you can see your accounts, look for lost accounts, see super held by the ATO, and see contribution payments your employer has reported.

Check the "as at" date on what you see. Some information is updated later, and some accounts may not show.

## How do you match a pay slip to your fund?

Take your pay slips for the last month and sit down with your fund statement or app.

- Write down the pay date and the super amount on each pay slip.
- Find the matching payment in your fund. It should arrive within 7 business days of payday.
- Mark any payday with no matching payment.
- Check that the employer name on the fund matches your employer.

**A worked example.** Arjun works 20 ordinary hours a week at $30 an hour. His pay slip each week shows $600 for ordinary hours and super of $72 (12% of $600). After four weeks his pay slips show $288 in super. In his fund app he should see four payments of $72, each within about a week of payday. If only two are there, he asks his employer about the other two, with the dates ready.

## Why do you have more than one account, and should you combine them?

When you start a new job, your employer may open a new account for you if you do not give them your existing fund details. Two or three jobs during a degree can mean two or three accounts. Each one may charge its own fees, and small balances can shrink while you are not working.

ATO online services shows all accounts linked to your TFN, so it is the best way to find one you forgot. You can also move whole balances from there, under Super, then Manage, then Transfer super. When you start your next job, give the employer your existing fund details so a new account is not opened.

Combining can save fees, but check first. You may lose insurance held in the old fund, and some funds charge fees when you leave or join. Combining accounts also does not change the fund your employer pays into. If you want your employer to pay into your chosen fund, tell your employer.

If you are close to leaving Australia, think about timing. Your final super payments still need to arrive, and your claim is easier when all your super is in place.

## What if super is missing?

First ask your employer, in writing, with the pay dates and amounts. Then check your fund and ATO online services again. If it is still missing, report it with the ATO's unpaid super tool. You need your TFN, the period, and your employer's ABN. The ATO will tell you if it can collect, but not every report leads to payment.

## Before you leave Australia

Super from a temporary visa can usually be claimed after you leave, through the Departing Australia Superannuation Payment (DASP). If you never held a working holiday visa (417 or 462), the taxed part of your payment is taxed at 35%. The ATO DASP online system is free. If you do not claim, your fund transfers your super to the ATO 6 months after you leave and your visa ends, and you can still claim it from there.

## Your checklist

- Save every pay slip and note the super amount
- Check each payment reached your fund within 7 business days
- Look in ATO online services for any extra or lost accounts
- Ask your employer about any missing payment, in writing
- Report unpaid super to the ATO if it is not fixed
- Keep your fund details and member number for your DASP claim`,
    faq: [
      { q: 'How quickly should super appear after payday now?', a: 'Under Payday Super, from 1 July 2026, it must reach your fund within 7 business days of payday. For a new job, the first payment has 20 business days.' },
      { q: 'Do casual students get super?', a: 'Generally yes. Casual and part-time employees, including temporary residents, are eligible for super guarantee. Workers under 18 get it only for weeks they work more than 30 hours.' },
      { q: 'Should I combine my super accounts?', a: 'It can save fees, but check insurance and exit fees first. Combining does not change the fund your employer pays into.' },
    ],
    sources: [
      { label: 'Fair Work Ombudsman: Payday Super', href: 'https://www.fairwork.gov.au/newsroom/news/payday-super-new-rules-starting-1-july-2026' },
      { label: 'ATO: Keeping track of your super online', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/keeping-track-of-your-super-online` },
      { label: 'ATO: Transferring or consolidating your super', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/transferring-or-consolidating-your-super` },
      { label: 'ATO: Departing Australia superannuation payment', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp` },
    ],
  },
  {
    slug: 'tfn-application-rejected-student-visa',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'TFN application failed on a student visa? What to check',
    description: 'An online TFN application usually fails because your details do not match Home Affairs records. The common causes for students and how to fix each one.',
    answer: 'Most failed online TFN applications happen because the details you typed do not exactly match your passport and visa record held by Home Affairs. Check each field against your passport, check your device time zone, and do not apply twice within 28 days.',
    body: `Applying for a tax file number (TFN) online is free and usually quick. The ATO checks your details electronically with the Department of Home Affairs. When something does not match, the application stops or is not processed. This can feel worrying, but it is almost always a small problem you can fix.

## How does the online check work?

When you apply online as a temporary visitor in Australia, you do not send any documents. The ATO compares what you type with the passport and visa record that Home Affairs already holds. It is a computer match, not a person reading your file.

This means small differences matter. A missing middle name, a different spelling, or a wrong passport number can all stop the match, even though it is clearly you.

## Cause 1: your details do not match your passport

The ATO asks you to enter your details exactly as they appear on your passport or travel document. Check each of these:

- Your family name and given names, in the same order and spelling as the passport
- Middle names, if your passport shows them
- Your date of birth
- Your passport number, especially if you renewed your passport after your visa was granted
- Your country of citizenship

If you have used other names, such as a name before marriage or an English first name, answer yes to "Other names" and enter them there. Do not put them in your main name fields.

## Cause 2: your device time zone

This one surprises many students. The ATO says that if you get a message that your details do not match, you should check that your device is set to an Australian time zone. If your laptop or phone still uses your home country time, change it and try again.

This happens often to new arrivals, because many phones and laptops keep the home time zone until you change it by hand. It takes less than a minute to fix. Open your device settings, choose the Australian city where you live, and then start the application again from the beginning.

## Causes 3 and 4: your country or your visa

If your country of origin is not in the drop-down list, the ATO cannot process the online application. The ATO says to contact the Department of Home Affairs in that case. Do not choose a different country just to get past the screen, because the details would then not match your record.

You can apply online if you are in Australia and hold a valid visa with work rights linked to your passport. Some visas carry "no work" conditions, and those cannot use the online application. You can check your visa details and conditions in VEVO. For any question about your visa conditions, check with Home Affairs.

## Cause 5: you already have a TFN

A TFN is yours for life. If you had one before, for example from an earlier visa or an earlier stay in Australia, you should not get a second one. The application asks if you have had a TFN or ABN before. Answer yes and enter it if you know it.

If you cannot find your old number, the ATO's online registration service can help you find your TFN or request a copy of your TFN notice. You can also find it on old ATO letters, a notice of assessment or a super statement.

## Should you apply again straight away?

Only if you know the first attempt did not go through, for example because the form showed an error and stopped. If your application was submitted, the ATO says you should receive your TFN within 28 days, and you should not lodge another application during that time.

If 28 days have passed and nothing has arrived, contact the ATO and give your ATO receipt ID. Keep the confirmation email or screen that shows this receipt ID. It is the fastest way for the ATO to find your application.

## What happens to your pay while you wait?

You can start work before your TFN arrives. If you do not give your employer a TFN within 28 days, they must take out tax at the top rate plus the Medicare levy. That is much more than normal.

This money is not lost. Tax taken out is credited when you lodge your tax return. But it can make your weekly pay much smaller for a while, so it is worth fixing the application quickly. Tell your employer you have applied, and give them the number as soon as it arrives.

**A simple example.** Lina earns $500 a week. Without a TFN after 28 days, her employer must take out tax at the top rate of 45% plus the Medicare levy, so more than $225 each week. With her TFN on file, far less is taken out. The extra tax comes back through her tax return, if it was more than her real tax for the year.

## Your checklist

- Compare every field with your passport, letter by letter
- Add other names in the "Other names" section, not in your main name
- Set your device to an Australian time zone
- Check your visa and its conditions in VEVO
- Answer yes if you have had a TFN before
- Keep your receipt ID and wait 28 days before you contact the ATO
- Give your employer your TFN as soon as it arrives`,
    faq: [
      { q: 'Can I apply for a TFN online before I arrive in Australia?', a: 'The online application for temporary visitors is for people who are in Australia and hold a visa with work rights. If you live outside Australia, a paper form is used instead.' },
      { q: 'I applied twice by mistake. What now?', a: 'Contact the ATO and explain. A TFN is issued once for life, and the ATO can help sort out a second application.' },
      { q: 'Does a failed application affect my visa?', a: 'A TFN application is a tax matter. For any question about your visa, check with the Department of Home Affairs.' },
    ],
    sources: [
      { label: 'ATO: TFN application for foreign passport holders and temporary visitors', href: `${ATO}/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application` },
      { label: 'ATO: Individual Auto-Registration help', href: `${ATO}/forms-and-instructions/individual-auto-registration-help` },
      { label: 'ATO: Lost or stolen TFN', href: `${ATO}/individuals-and-families/tax-file-number/lost-or-stolen-tfn` },
    ],
  },
  {
    slug: 'tfn-documents-international-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'TFN documents for international students: what you need',
    description: 'In Australia you apply for a TFN online with your passport details and send no documents. From overseas, a paper form needs certified identity documents.',
    answer: 'If you are in Australia on a visa with work rights, you apply for a TFN online and do not send any documents: the ATO checks your passport details with Home Affairs. If you live outside Australia, you use a paper form and send certified copies of two identity documents.',
    body: `Many students expect to post a pile of certified copies to get a tax file number (TFN). In most cases, you do not need to send anything at all. What you need is your passport, the right details, and an Australian address. This guide explains what to prepare for each way of applying.

## Applying in Australia: no documents to send

If you are in Australia and hold a valid visa with work rights linked to your passport, you can apply online. The ATO says you will not need to send documents. Instead, your details are checked electronically with the Department of Home Affairs.

So the "documents" you need are really the facts printed in your passport and the details of your stay. Have your passport open in front of you when you apply.

## What details will you enter?

Prepare these before you start:

- Your family name and given names, exactly as printed in your passport
- Any other names you have used, such as a name before marriage or an English first name
- Your date of birth
- Your passport number and country of issue
- Your country of citizenship
- An Australian postal address, and a home address (which cannot be a PO box)
- Your email and phone number
- Your old TFN or ABN, if you have ever had one

Each name field takes 1 to 40 characters. The form does not accept some symbols, numbers only, or two or more hyphens, apostrophes or spaces in a row. Type your name as the passport shows it, using normal letters where your passport does.

## Which passport should you use?

Use the passport that your visa is linked to. This matters most for two groups of students.

- **Students with two passports.** Use the one your student visa was granted on, not the one you think of as your main passport.
- **Students who renewed a passport.** A new passport has a new number. If your visa record still shows the old number, the match can fail.

You can check your visa details, including the passport it is linked to, in VEVO. If your visa record needs updating, that is a matter for the Department of Home Affairs.

## Why your address is part of the "paperwork"

Your TFN is posted to the Australian postal address you give. The ATO says you should receive it within 28 days. If you are in short-term accommodation, choose an address where someone will keep your mail. A university residence that holds mail for residents, a share house you have a lease for, or a homestay family are usually good choices.

## Applying from outside Australia

If you have left Australia and are a foreign resident for tax purposes, the online application is not the right path. The ATO uses a paper form called the Tax File Number Application for Individuals Living Outside Australia. You may need it, for example, if you need a TFN to claim a tax refund.

This form does need documents:

- **Two current proof of identity documents.** One must be a primary document, such as a foreign passport or a foreign birth certificate.
- The second can be a secondary document, such as a national photo ID card or a foreign driver's licence.
- **Certified copies, not originals.** Copies you post may not be returned.
- **Certified translations** for any document not in English.
- Linking documents if your name has changed.

If documents are missing, the form is returned and no TFN can be issued. You post it to the ATO at GPO Box 1574, Canberra ACT 2601. The ATO says to allow 28 days from when it receives your form, plus extra time for international mail.

## If the ATO cannot match your details

When the online match fails, the cause is usually a small difference between what you typed and your passport or visa record. Check every field again, check that your device is set to an Australian time zone, and do not send a second application while the first one is still being processed. If 28 days have passed without a letter, contact the ATO with your receipt ID.

## Once your TFN arrives

Give your TFN to your employer, your super fund and your bank. Keep the letter somewhere safe. A TFN is yours for life, so you will use the same number if you return to Australia later on another visa, for example a graduate visa after your course.

It is also a good idea to create a myGov account and link it to the ATO once you have your number. You will use it later to see your income statement, check your super and lodge your tax return.

Do not post your TFN on social media or send photos of your passport and TFN to people you do not know. Someone needs only basic details, such as your name, date of birth, address and TFN, to try identity fraud.

## Your checklist

- Have your passport open and type every detail exactly as printed
- Use the passport your visa is linked to, and check it in VEVO
- Choose an Australian address that will hold your mail for a month
- Enter any old TFN if you have had one before
- If you are overseas, prepare two certified identity documents for the paper form
- Keep your receipt ID and your TFN letter safe`,
    faq: [
      { q: 'Do I need my Confirmation of Enrolment to apply for a TFN?', a: 'The ATO online application does not ask you to send documents. Your passport and visa details are checked electronically with Home Affairs.' },
      { q: 'Can I use a PO box?', a: 'Your home address cannot be a PO box. Your postal address must be in Australia, and the TFN is posted there.' },
      { q: 'Who can certify copies for the overseas paper form?', a: 'The form instructions set out who can certify copies. Read them carefully before you post, because an incomplete application is returned.' },
    ],
    sources: [
      { label: 'ATO: TFN application for foreign passport holders and temporary visitors', href: `${ATO}/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application` },
      { label: 'ATO: Individual Auto-Registration help', href: `${ATO}/forms-and-instructions/individual-auto-registration-help` },
      { label: 'ATO: TFN application for individuals living outside Australia', href: `${ATO}/forms-and-instructions/tfn-application-for-individual-living-outside-australia` },
    ],
  },
  {
    slug: 'tfn-scams-international-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'TFN scams and international students: how to stay safe',
    description: 'Fake ATO messages, fake jobs and fake tax helpers target new students. What the real ATO never does, how to check a contact, and what to do if your TFN leaks.',
    answer: 'The real ATO never sends unsolicited texts or emails with links, never threatens arrest, and never asks for payment in gift cards or crypto. If you think your TFN was stolen or misused, phone the ATO Client Identity Support Centre on 1800 467 033.',
    body: `Your tax file number (TFN) is one of your most valuable personal details in Australia. Criminals want it because, with a few other details, they can pretend to be you. New international students are often targeted, because they do not yet know what normal contact from the ATO looks like. This guide helps you spot a scam and tells you what to do if something goes wrong.

## Why do scammers want your TFN?

The ATO warns that someone only needs basic details, such as your name, date of birth, address, myGov details or TFN, to commit identity fraud. With them, a criminal may try to lodge a tax return in your name and send the refund to their own account, or change details on your ATO record.

A TFN is issued once and stays with you for life. You cannot simply cancel it like a bank card. That is why it is worth protecting from day one.

Fraud is often found late. A student may only learn about it when their own tax return does not go through, or when an ATO letter arrives about income they never earned. Sorting this out takes time, and it is harder if you have already gone home. Prevention is much easier than repair.

## Scams that students often see

Most scams are simple. They work because they arrive when you are busy, new and unsure.

- **The fake ATO message.** A text or email says you owe tax, or that you have a refund, and asks you to click a link and log in.
- **The threatening phone call.** A caller says you will be arrested or deported unless you pay now, and tells you not to hang up.
- **The fake job.** An offer asks for your TFN, passport photo and bank details before any interview or before you have accepted a job.
- **The social media "tax helper".** An account offers to do your tax return cheaply and asks for your myGov password.

## What the real ATO will never do

The ATO publishes a clear list. The real ATO will never:

- Send you an unsolicited email or SMS with a link or QR code, or ask for personal details that way
- Threaten you with arrest, demand that you stay on the line, or threaten to cancel your TFN
- Ask you to pay by gift card, crypto, cash delivery, or into a personal or overseas bank account
- Ask you to pay a fee to receive a refund
- Stop you from speaking to your tax agent
- Ask for personal details, documents or payments through a private message on social media

If a message does any of these things, it is not from the ATO.

## How do you check if contact is real?

Do not reply, click or call any number in the message. Instead:

- Phone the ATO on 1800 008 540 to check if the contact is genuine
- Sign in to myGov yourself, by typing the address, and look at your ATO messages
- Remember that real ATO calls show as "No Caller ID"

If you use someone to do your tax return, check that they are registered on the Tax Practitioners Board online register before you share anything.

## Protecting your TFN day to day

The ATO's own tips are practical and easy to follow.

- Share your TFN only with organisations that need it for a real reason
- Give it to a new employer only after you have started the job
- Do not post it on social media or store it on your phone
- Shred papers with your personal details, and keep important letters in a safe place
- Change any password you have shared, and keep security software up to date

Also secure your myGov account. The ATO says a Strong myID is the most secure way to sign in to ATO online services.

## If you think your TFN was stolen

Act quickly. Phone the ATO Client Identity Support Centre on 1800 467 033, 8 am to 6 pm AEST, Monday to Friday. If English is hard for you, call the Translating and Interpreting Service on 13 14 50 first.

The ATO can check your account for unusual activity, correct details that someone changed, and add security measures that check lodgments and claims before they are processed. It keeps those measures on your record until it is satisfied the risk has passed.

You can also:

- Report identity theft to your state or territory police
- Contact IDCARE on 1800 595 160 for free, confidential support
- Report cybercrime to the Australian Cyber Security Centre

## If you already paid money or shared details

Phone the ATO straight away on 1800 008 540. Contact your bank, and the bank you paid, to report fraud. Report it to your local police.

If you received a scam but did not pay or share anything, you can still help others. Forward the email, or a screenshot of the text or social media post, to ReportScams@ato.gov.au, then delete it.

## Your checklist

- Never click links in unexpected "ATO" texts or emails
- Check any contact on 1800 008 540
- Give your TFN to an employer only after you start work
- Check a tax helper on the Tax Practitioners Board register
- Set up a Strong myID for myGov
- If your TFN leaks, phone 1800 467 033 the same day`,
    faq: [
      { q: 'Can the ATO cancel my TFN?', a: 'The ATO says it will never threaten to cancel your TFN. A caller who does is not from the ATO.' },
      { q: 'Is it safe to send my TFN by WhatsApp to my employer?', a: 'Give your TFN to an employer only after you have started the job, and use the TFN declaration process they give you rather than a casual message.' },
      { q: 'What number do I call if my TFN was stolen?', a: 'Phone the ATO Client Identity Support Centre on 1800 467 033, 8 am to 6 pm AEST, Monday to Friday.' },
    ],
    sources: [
      { label: 'ATO: Verify or report an ATO scam', href: `${ATO}/online-services/scams-cyber-safety-and-identity-protection/verify-or-report-an-ato-scam` },
      { label: 'ATO: Help for identity theft', href: `${ATO}/online-services/scams-cyber-safety-and-identity-protection/help-for-identity-theft` },
      { label: 'ATO: Identity crime', href: `${ATO}/other-languages/information-in-other-languages/general/identity-crime` },
      { label: 'ATO: Lost or stolen TFN', href: `${ATO}/individuals-and-families/tax-file-number/lost-or-stolen-tfn` },
    ],
  },
  {
    slug: 'who-can-ask-for-tfn-international-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Who can ask for your TFN? A guide for international students',
    description: 'Your employer, bank, super fund, university and the ATO may need your TFN. Landlords, phone companies and recruiters usually do not. How to answer each request.',
    answer: 'Share your TFN only with organisations that need it for a real tax reason: the ATO, your employer once you start work, your bank, your super fund, your university and government agencies when you claim a benefit. You do not have to give it to anyone else.',
    body: `In your first weeks in Australia, many forms ask for personal details. Some of them ask for your tax file number (TFN). Some of those requests are normal. Others are not, and a few are scams. This guide gives you a simple way to decide, and the words to use when the answer is no.

## Who has a real reason to ask?

The ATO says to share your TFN only with organisations that need it for a legitimate reason. Its examples are:

- The ATO, when you discuss your tax records
- Your employer, when you start work
- Your bank or other financial institution
- Your super fund
- Your university
- Other government agencies, when you claim benefits

If you use a tax agent, they will also need your TFN to prepare and lodge your return. Check that they are registered on the Tax Practitioners Board register first.

## Your employer: only after you start

An employer asks for your TFN through a TFN declaration when you begin work. They use it to work out how much tax to take from your pay and to report your income to the ATO.

The timing is the key test. The ATO says to give your TFN to a new employer only after you have started the job. It also warns about job offers that ask for your TFN before you are hired, or that promise guaranteed income with no interview. A recruiter or "employer" who wants it before any offer is a warning sign.

## Your bank, super fund and university

These requests are normal and help you.

- **Your bank.** Without your TFN, your bank must take more tax from any interest you earn.
- **Your super fund.** Your TFN helps the fund match your super to you, and you will want that when you claim it after you leave.
- **Your university.** The ATO lists universities among the organisations that may have a real reason to ask. If you are not sure why your university wants it, ask the student office what it is for.

## Who does not need your TFN?

Anyone who has no tax reason for it. Common examples for students:

- Landlords, real estate agents and share house owners, including on rental applications
- Student accommodation providers, for your booking
- Phone, internet and electricity companies
- Recruiters or job sites, before you have accepted a job
- Classmates, friends or people in a group chat
- Anyone online offering to "check your tax" who cannot show you a registration

These organisations may ask for ID to confirm who you are. That is different. Your TFN is not an ID document, and you can choose another form of ID.

## Do you have to give your TFN at all?

No. The ATO says you do not have to have a TFN. But without one, there are costs:

- Your employer or bank must take out more tax from your payments
- You cannot lodge your tax return online
- You cannot apply for an ABN
- You cannot apply for government benefits

So for the right organisations, giving your TFN is in your interest. For the wrong ones, there is no benefit to you.

## How do you say no politely?

You do not need a long reason. A short, calm reply is enough.

- "I only give my TFN to my employer, bank, super fund and the ATO. Can I give you a different form of ID?"
- "I will complete the TFN declaration on my first day of work, once I have accepted the job."
- "Could you tell me which tax law requires you to collect it?"

A genuine organisation will understand. If someone becomes pushy or says you must give it now, treat that as a warning sign.

On a paper form, you can simply leave the TFN box empty. On an online form that will not let you continue without it, stop and contact the organisation by phone or email before you go further. Ask them why they need it and what happens if you do not give it.

## Tax helpers, and what to do if it went to the wrong person

Students often find tax help in social media groups. Before you share your TFN, passport or bank details, check two things. First, look the person or business up on the Tax Practitioners Board register. Second, never give anyone your myGov password. If you have shared a password, change it.

The ATO also says it will never ask you to pay a fee to receive a refund. A "helper" who asks for that is not following ATO rules. Be careful, too, with anyone who names a refund amount before they have seen your income statement. Nobody can know that figure in advance.

If you already gave your TFN to the wrong person, do not panic, but act the same day. Phone the ATO Client Identity Support Centre on 1800 467 033. The ATO can add security measures to your record and watch for unusual activity. If you also shared your myGov password, change it first.

## Your checklist

- Give your TFN to an employer only after you start the job
- Give it to your bank, super fund and university when they ask through official forms
- Offer a different form of ID to landlords and phone companies
- Check tax helpers on the Tax Practitioners Board register
- Never share your myGov password
- Phone 1800 467 033 if your TFN reached the wrong person`,
    faq: [
      { q: 'My landlord wants my TFN on the rental form. Do I have to give it?', a: 'A landlord has no tax reason to need your TFN. You can leave it blank and offer another form of ID.' },
      { q: 'Why does my bank want my TFN?', a: 'Without it, your bank must take out more tax from any interest you earn. Giving it to your bank is normal.' },
      { q: 'Can an employer ask for my TFN at the interview?', a: 'The ATO says to give your TFN to a new employer only after you have started the job. A request before an offer is a warning sign.' },
    ],
    sources: [
      { label: 'ATO: What is a tax file number', href: `${ATO}/individuals-and-families/tax-file-number/what-is-a-tax-file-number` },
      { label: 'ATO: Identity crime', href: `${ATO}/other-languages/information-in-other-languages/general/identity-crime` },
      { label: 'ATO: Lost or stolen TFN', href: `${ATO}/individuals-and-families/tax-file-number/lost-or-stolen-tfn` },
    ],
  },
  {
    slug: 'tfn-postal-address-international-students',
    category: 'TFN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Your TFN address as an international student: get the letter',
    description: 'Your TFN arrives by post at the Australian address you give, usually within 28 days. Which addresses work for students in temporary housing, and what if you move.',
    answer: 'Your TFN is posted to the Australian postal address on your application, and you should receive it within 28 days. Use an address where someone will keep your mail for at least a month; your home address cannot be a PO box.',
    body: `Many students apply for a tax file number (TFN) in their first week, while they are still in a hotel, a short-stay room or a friend's place. That is fine. But your TFN arrives as a letter in the post, so the address you choose decides whether you actually receive it. This guide helps you pick a good address and explains what to do if the letter goes missing.

## Why does the address matter so much?

When you apply online, the ATO posts your TFN notice to the Australian postal address on your application. The ATO says you should receive it within 28 days of receiving your application.

The application is free and you can start work before the letter arrives. But your employer needs the number. If you do not give your employer a TFN within 28 days, they must take out tax at the top rate plus the Medicare levy. So a lost letter can cost you money in your weekly pay, even though the extra tax is credited later when you lodge your return.

## What does the form accept?

The online form has a few simple rules:

- Your postal address must be in Australia
- The postcode must have 4 digits and be a real Australian postcode
- Your home address cannot be a PO box
- You cannot write "as above" in the home address

The ATO also asks for contact details, so it can reach you if there is a problem.

## Which addresses work well for students?

The best address is one where a real person will see the letter and keep it for you. Good choices are usually:

- A share house or flat where you have a lease
- University or college accommodation that holds mail for residents by name
- A homestay family
- A relative or a trusted friend who lives at a fixed address

Before you use student accommodation, ask the front desk how they handle mail. Do they keep letters by resident name? For how long? Do they forward mail after you move out? A two-minute question can save you weeks.

## Which addresses are risky?

Some places are fine for sleeping but poor for mail. Many students arrive a week or two before their lease starts, so their first address in Australia is often one of these.

- A hotel or short-stay rental you will leave in a few days
- A building with shared mailboxes and no name on yours
- An address where you are not sure of the unit number
- A friend's place if you are not sure they will tell you a letter arrived

If you must use one of these, check often and ask the person there to message you as soon as an ATO letter arrives. Write your unit number carefully, because a wrong unit number is a common reason mail goes missing.

## What if you move before it arrives?

Moving in your first month is normal for students. If you move after you apply, the letter may still go to the old address. Ask the people at your old address to keep any ATO letter for you, and contact the ATO to tell them your new address.

Do not apply again just because you moved. A TFN is issued once and stays with you for life. The ATO says not to lodge another application during the 28 days.

## What if the letter never arrives?

If 28 days have passed and you still have no letter, contact the ATO and give your ATO receipt ID. You receive this receipt ID when you apply, so keep the confirmation email or a screenshot.

The ATO's online registration service can also be used to find your TFN or request a copy of your TFN notice. This is better than a new application, which would only cause confusion on your record.

## What should you tell your employer, and what then?

Tell your employer that you have applied and that the number is on the way. Give it to them as soon as it arrives, using the TFN declaration process they give you. Then check your next pay slip to make sure the tax taken out has changed.

**A worked example.** Tom applies for his TFN on 1 March using a short-stay room. He moves to a share house on 10 March. He asks the short-stay manager to hold ATO mail, and the letter arrives there on 18 March. He collects it, gives the number to his employer, and his next pay is taxed normally. If he had not asked, the letter might have been thrown away, and the 28-day limit for his employer would have passed.

Once you have the letter, keep it in a safe place. Your TFN is valuable to criminals, so do not post a photo of it or send it to people you do not know. Later, you will update your address in ATO online services through myGov when you move, so letters about your tax return reach you.

## Your checklist

- Choose an address where someone will keep your mail for a month
- Use a home address that is not a PO box
- Check the unit number and postcode carefully
- Keep your receipt ID from the application
- Do not apply again if you move; contact the ATO
- After 28 days with no letter, contact the ATO with your receipt ID`,
    faq: [
      { q: 'Can I use my university address?', a: 'If you live in university accommodation that holds mail for residents by name, it can work well. Ask how long they keep letters before you apply.' },
      { q: 'Can the ATO email my TFN instead?', a: 'The ATO posts your TFN notice to the Australian postal address on your application.' },
      { q: 'I moved and the letter went to my old place. Should I apply again?', a: 'No. Your TFN is issued once for life. Contact the ATO with your receipt ID, and ask your old address to keep any ATO letter.' },
    ],
    sources: [
      { label: 'ATO: TFN application for foreign passport holders and temporary visitors', href: `${ATO}/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application` },
      { label: 'ATO: Individual Auto-Registration help', href: `${ATO}/forms-and-instructions/individual-auto-registration-help` },
      { label: 'ATO: Lost or stolen TFN', href: `${ATO}/individuals-and-families/tax-file-number/lost-or-stolen-tfn` },
    ],
  },
  {
    slug: 'abn-invoicing-international-students',
    category: 'ABN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'ABN invoices for international students: what to include',
    description: 'What an invoice should show when you work under an ABN, when it must be called a tax invoice, and why leaving your ABN off can cost you 47% of the payment.',
    answer: 'Put your name, your ABN, the date, a description of the work and the amount on every invoice. Only call it a "tax invoice" if you are registered for GST. If your ABN is missing, the business paying you may have to withhold 47% of the payment.',
    body: `Some international students do freelance work under an Australian Business Number (ABN): tutoring, design, photography, translation, or delivery through an app. When you work this way, you are not paid through payroll. You send an invoice, and the business pays it. A clear invoice gets you paid faster and keeps your tax records simple.

## First: is an ABN right for this work?

You are entitled to an ABN only if you are carrying on, or starting, a real business in Australia. An ABN is not for work you do as an employee, even if the job is called "contracting". An employer should not ask you to get an ABN as a condition of a job.

Having an ABN does not make you a contractor on its own. If a business controls how, where and when you work, you may really be an employee, with rights to minimum pay and super. For any question about whether your visa allows this work, check your visa conditions with Home Affairs.

## What should every invoice show?

If you are not registered for GST, which is the case for most students, you issue a standard invoice. The ATO says businesses that are not registered for GST should not use the words "tax invoice". A clear standard invoice usually includes:

- Your name, as it is registered with your ABN
- Your ABN
- The date you issue the invoice
- An invoice number, so you and your client can track it
- A short description of the work, with dates and quantity where relevant
- The amount you are charging
- How to pay you, such as your bank account name, BSB and number
- The client's name

Do not add GST to the total if you are not registered. Charging GST you cannot pass to the ATO causes problems for you and your client.

## Why your ABN must be on it

If you supply work to a business and do not quote your ABN, the business generally must withhold 47% of the payment and send it to the ATO. There are some exceptions, for example when the payment is $75 or less, excluding GST.

The tax withheld is not lost. It is credited when you lodge your tax return. But you wait months for money you need now, so always show your ABN clearly.

**A worked example.** Priya tutors high school students through a small tutoring business. She sends an invoice for 6 sessions at $45 each, a total of $270. If she forgets her ABN, the business may withhold 47%, which is $126.90, and pay her only $143.10. With her ABN on the invoice, she receives the full $270. She then pays any tax on it through her tax return.

## If you are registered for GST

Once you are registered for GST, you issue tax invoices. If a customer asks for one, you must give it within 28 days. Sales of $82.50 or less, including GST, do not need one. A tax invoice for a sale under $1,000 must show:

- That it is a tax invoice
- Your identity and your ABN
- The date of issue
- A short description of what you sold, the quantity if relevant, and the price
- The GST amount, or the words "Total price includes GST" if GST is exactly one-eleventh of the price
- Which items are taxable

For sales of $1,000 or more, it must also show the buyer's identity or ABN.

## When do you need to register for GST?

For most businesses, including food delivery, GST registration is required once your turnover reaches $75,000. Ride-sourcing is different. If you drive passengers through an app such as Uber, you must register for GST before you start, whatever you earn.

## Keeping records for tax time

No tax is taken out of ABN income. It goes in your tax return, together with your business expenses. Keep a copy of every invoice you send, a note of when each one was paid, and the receipts for your business costs. Keep these records for 5 years after you lodge.

A simple spreadsheet with the invoice number, client, date, amount and payment date is enough for most students. At tax time, the total of your paid invoices is the starting point for your business income.

Number your invoices in order, for example 001, 002 and 003, and do not reuse a number. This makes it easy to see if an invoice is missing from your records. It also helps your client, because many businesses need a unique invoice number before they can pay.

Because no tax is taken out of ABN income, put some money aside each time a client pays you. Then any tax you owe on your business income will not be a surprise when you lodge your return.

## Before you finish your studies

If you stop your freelance work, cancel your ABN, usually within 28 days of stopping. Cancelling does not remove the need to lodge your final tax return. Chase any unpaid invoices before you leave Australia, because recovering money from overseas is much harder.

## Your checklist

- Check you are really running a business, not working as an employee
- Put your name, ABN, date, description and amount on every invoice
- Do not call it a "tax invoice" or add GST unless you are registered
- Register for GST before you start if you drive passengers through an app
- Keep copies of invoices and receipts for 5 years
- Cancel your ABN when the work stops`,
    faq: [
      { q: 'Do I need special software to make an invoice?', a: 'No. A clear document with the right details is enough. Many students use a simple template and save each invoice as a PDF.' },
      { q: 'Can I put GST on my invoice to earn more?', a: 'No. Only businesses registered for GST can charge GST, and they must pay it to the ATO.' },
      { q: 'What happens if a client withheld 47% from my payment?', a: 'The tax withheld is credited when you lodge your tax return. Make sure your ABN is on future invoices.' },
    ],
    sources: [
      { label: 'ATO: Tax invoices', href: `${ATO}/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/tax-invoices` },
      { label: 'ATO: Setting up your business invoices', href: `${ATO}/businesses-and-organisations/preparing-lodging-and-paying/record-keeping-for-business/setting-up-and-managing-records/setting-up-your-business-invoices` },
      { label: 'ATO: Statement by a supplier not quoting an ABN', href: `${ATO}/forms-and-instructions/statement-by-supplier-not-quoting-an-abn` },
      { label: 'Australian Business Register: ABN entitlement', href: 'https://www.abr.gov.au/business-super-funds-charities/applying-abn/abn-entitlement' },
    ],
  },
  {
    slug: 'abn-business-expenses-international-students',
    category: 'ABN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'ABN business expenses for international students: what to claim',
    description: 'With an ABN, real business costs reduce the tax you pay. What students in freelance or app-based work can usually claim, how to split private use, and what to keep.',
    answer: 'With an ABN, you can claim costs that relate directly to earning your business income, such as platform fees, the business share of your phone and the work part of vehicle costs. You must be able to show the cost and how you worked out any business share.',
    body: `When you earn money as an employee, your employer takes out tax from each pay. ABN income is different: no tax is taken out, and the full amount goes on your tax return. Your business expenses are then taken off that income. For a student doing freelance or app-based work, claiming the right expenses, with the right records, can make a real difference to the tax you pay.

## Why do expenses matter, and what are the basic tests?

With wages, tax is already paid during the year. A deduction usually increases your refund, if any. With ABN income, no tax was paid during the year. A deduction reduces the tax you still owe.

So if you forget your business expenses, you pay more tax than you need to. If you claim expenses you cannot prove, you may have to pay it back later, sometimes with penalties. Students who worked as employees before often use the employee rules by habit, but business rules for some items, such as vehicles and equipment, are not the same.

For any expense, ask three questions:

- Did you pay for it yourself, without being paid back?
- Does it relate directly to earning your business income?
- Do you have a record, such as a receipt or invoice?

If the answer to any of these is no, do not claim it.

## Costs you can often claim

What you can claim depends on your type of work. For ride-sourcing, the ATO lists examples like these, and similar ideas apply to other small businesses:

- Platform fees or commission
- Fuel, parking and tolls you pay while working
- The business share of your mobile phone and data
- Repairs and upkeep of equipment you use for the work
- Commercial licence or accreditation costs the work needs
- Supplies for customers, where relevant to the work
- The fee for having your tax return prepared by a tax agent

For freelance work, examples might be design or editing software used only for client work, or a camera used for paid photography jobs. Equipment you own may be claimed over several years through depreciation, and some small business concessions may apply. A registered tax agent can tell you which rule fits your item.

## What about things you also use privately?

Many students use the same phone, laptop or car for study, private life and business. You can claim only the business share, and you must be able to show how you worked out that share.

A good way is to keep a record for a typical period. For a phone, you might mark your business calls and data use for four weeks. For a car, you might keep a logbook. A guess is not enough.

If you claim a GST credit because you are registered for GST, you deduct only the amount without the GST. Most students are not registered, so they use the full amount they paid.

## Vehicle costs

If you use a car for your business, there are two ways to claim.

- **Cents per kilometre.** You claim a set rate for each business kilometre, up to 5,000 business kilometres per car per year. The rate covers all running costs, so you cannot also claim fuel or repairs separately. This method is for cars only, not motorcycles or bicycles.
- **Logbook.** You keep a logbook for at least 12 continuous weeks, with odometer readings. You then claim the business percentage of your car's running costs.

For ride-sourcing, only travel while picking up or carrying passengers counts as business. Driving around waiting for a job is generally private.

## Costs you cannot claim

These are common mistakes:

- Fines, such as speeding or parking fines
- Your private driver licence
- Personal meals, even on a work day
- Private use of your car, phone or laptop
- Your course fees for your degree, unless they have a direct link to the business you already run

## A worked example

Hana is a student who does freelance photography under an ABN. In the year she earns $8,000 from clients. Her costs are:

- Marketplace fees of $400
- Editing software of $300, used only for client work
- A phone plan of $600, which she uses 40% for business, based on a four-week record, so she claims $240

Her expenses total $940. Her business income on her tax return is $8,000 less $940, which is $7,060. Tax is then worked out on that amount together with any wages she earned.

## Keep your records

Keep receipts and invoices for 5 years after you lodge your tax return, in paper or electronic form. The ATO app's myDeductions tool can help you record expenses and trips as you go. A folder on your phone, with one photo per receipt, also works well.

Because no tax is taken out of ABN income, it is a good habit to put some money aside after each payment. That way, any tax you owe at the end of the year does not come as a shock.

## Your checklist

- Keep a photo of every business receipt
- Record how you worked out the business share of shared items
- Choose cents per kilometre or a logbook for car costs
- Do not claim fines, private meals or private use
- Keep records for 5 years after you lodge
- Set money aside for tax after each payment

If you have ABN income this year, you can message Student Visa Tax on WhatsApp for your tax return.`,
    faq: [
      { q: 'Can I claim my laptop if I use it for study and business?', a: 'You can claim only the business share, and you need a record of how you worked it out. The private and study parts are not business expenses.' },
      { q: 'Can I use cents per kilometre for my e-bike or scooter?', a: 'No. The cents per kilometre method is for cars only. Other vehicle costs need actual records.' },
      { q: 'How long do I keep receipts?', a: 'Keep them for 5 years after you lodge your tax return.' },
    ],
    sources: [
      { label: 'ATO: Income and deductions for ride-sourcing', href: `${ATO}/businesses-and-organisations/income-deductions-and-concessions/sharing-economy-and-tax/ride-sourcing/income-and-deductions-for-ride-sourcing` },
      { label: 'ATO: Records you need to keep', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/records-you-need-to-keep` },
      { label: 'Australian Business Register: ABN entitlement', href: 'https://www.abr.gov.au/business-super-funds-charities/applying-abn/abn-entitlement' },
    ],
  },
  {
    slug: 'uber-doordash-tax-international-students',
    category: 'ABN',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Uber, DoorDash and Menulog: tax for international students',
    description: 'Platforms report what you earn to the ATO. How app work is taxed for students, why rideshare and food delivery differ for GST, and how much to set aside.',
    answer: 'App-based work is usually done under an ABN, so no tax is taken out and the platform reports your earnings to the ATO. Passenger rideshare needs GST registration before you start; food delivery generally needs it only once turnover reaches $75,000.',
    body: `Delivery and rideshare apps are popular with students because you choose your own hours. The tax side is different from a normal job. There is no employer taking out tax each week. You run a small business, and the tax is worked out at the end of the year. This guide explains how it works and how to avoid a large bill.

## How is platform work taxed?

Platforms usually treat riders and drivers as independent contractors. You need an ABN, and no tax is taken out of what the platform pays you. All your platform income, including tips and bonuses, goes on your tax return, together with your business expenses.

You must lodge a tax return if you earn ride-sourcing income, whatever the amount. It is reported in the business section of your return.

Before you start, check that your visa conditions allow this kind of work. That is a question for Home Affairs, not a tax question.

## Rides and deliveries are different for GST

This is the rule students most often miss.

- **Passenger rideshare** (for example Uber rides, Didi or Ola): you must register for GST before you start, no matter how much you earn.
- **Food delivery** (for example Uber Eats, DoorDash or Menulog): you generally need to register for GST only once your turnover reaches $75,000.

If you do both, the rideshare rule applies. Registering for GST also means lodging activity statements, so do not do rideshare trips "just to try" without registering first.

## The platform tells the ATO what you earned

Under the Sharing Economy Reporting Regime, platforms report information about the people who earn through them. Reporting for ride-sourcing started on 1 July 2023, and for most other platforms on 1 July 2024. Platforms report twice a year.

This means the ATO already has your platform figures when you lodge. Your tax return should include all of it. If you use several apps, each one reports separately, so include the total from every app.

## Several apps, one business

Many students use two or three apps. For tax, this is still one business with one ABN. Add up your income from all apps, and add up your business costs. You do not need to split your bike repairs or phone bill between apps.

A simple weekly note helps: date, app, amount earned, and kilometres driven if you use a car. Most apps also let you download a statement of your earnings. Save these statements during the year, because some students lose access to an app after they stop using it.

At tax time, compare your own total with the platform statements. If they do not match, find out why before you lodge. A common reason is tips or bonuses that were paid separately.

## What can you claim?

For ride-sourcing, the ATO gives examples such as platform fees, fuel, parking and tolls you paid, the business share of your phone, and commercial licence costs. Delivery riders can claim similar costs that relate directly to the work, such as a delivery bag or bike repairs.

You can claim only the business share of anything you also use privately. The cents per kilometre method is for cars only. For rideshare, only travel while picking up or carrying passengers counts as business; time spent driving around waiting for a job is generally private. Keep your records for 5 years.

## How much should you set aside?

Because no tax is taken out, it is safest to save some of each payment. How much depends on your residency for tax purposes and your other income.

**If you may be a foreign resident for tax purposes**, there is no tax-free threshold. For 2025-26, tax starts at 30% from the first dollar up to $135,000. So every $1,000 of delivery profit has $300 of tax on it.

**If you may be an Australian resident for tax purposes** (for example, your course is 6 months or more), you have the tax-free threshold of $18,200. Your platform profit is added to your wages.

**A worked example.** Minh may be a resident for tax purposes. In 2025-26 he earns $20,000 in wages from a café and $8,000 profit from delivery, a total of $28,000. Tax on $28,000 at the 2025-26 resident rates is 16% of the amount above $18,200, which is $1,568. The low income tax offset of $700 reduces this to $868, before any Medicare levy. His café already took tax out of his wages during the year, and that is credited against the total. Whether he gets money back or owes some depends on how much the café withheld.

## Medicare levy

Many students are not entitled to Medicare because they have Overseas Student Health Cover. If that is you, you may be able to claim an exemption from the Medicare levy. You need a Medicare Entitlement Statement from Services Australia, and you should wait for it before you lodge. The statement does not automatically mean you are exempt, and you need one for each year you claim. Students from countries with a reciprocal health care agreement may be entitled to Medicare, and then this exemption does not apply.

## Your checklist

- Get an ABN before you start, and check your visa conditions
- Register for GST before your first rideshare trip
- Record income from every app, every week
- Keep receipts for platform fees, phone, fuel and repairs
- Set money aside from each payment for tax
- Cancel your ABN, and any GST registration, when you stop`,
    faq: [
      { q: 'Do I need GST for Uber Eats only?', a: 'For food delivery, GST registration is generally required once your turnover reaches $75,000. Passenger rideshare is different: you register before you start.' },
      { q: 'Will the ATO know about my DoorDash income?', a: 'Yes. Platforms report what their sellers earn to the ATO twice a year, so include all of it in your tax return.' },
      { q: 'Does the platform pay my super?', a: 'Platforms usually treat you as an independent contractor. Do not assume super is being paid; check your platform terms and your super fund.' },
    ],
    sources: [
      { label: 'ATO: What is the Sharing Economy Reporting Regime', href: `${ATO}/businesses-and-organisations/preparing-lodging-and-paying/third-party-reporting/sharing-economy-reporting-regime/what-is-the-serr` },
      { label: 'ATO: Ride-sourcing registrations', href: `${ATO}/businesses-and-organisations/income-deductions-and-concessions/sharing-economy-and-tax/ride-sourcing/registrations` },
      { label: 'ATO: Income and deductions for ride-sourcing', href: `${ATO}/businesses-and-organisations/income-deductions-and-concessions/sharing-economy-and-tax/ride-sourcing/income-and-deductions-for-ride-sourcing` },
      { label: 'ATO: Low income tax offset', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/tax-offsets/low-income-tax-offset` },
    ],
  },
  {
    slug: 'tax-return-no-tfn-international-students',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    title: 'Worked without a TFN on a student visa? Your tax return steps',
    description: 'Without a TFN, employers take out tax at the top rate. How international students get a TFN, even after leaving, and lodge a return to have the extra tax credited.',
    answer: 'You need a TFN before you can lodge a tax return, but you can still get one, even after you leave Australia. Tax taken out at the top rate is credited when you lodge, and any amount above your real tax is refunded, if any.',
    body: `Some students start work before their tax file number (TFN) arrives, or never give their employer a TFN at all. When that happens, the employer must take out much more tax than usual. The good news is that this tax is not lost. It is credited against your real tax when you lodge your return. This guide explains the steps.

## What happened to your pay?

If you do not give your employer a TFN within 28 days of starting, the employer must take out tax at the top rate plus the Medicare levy. For 2025-26, the top rate is 45%. That is far more than most students really owe for the year.

The employer still reports your pay and the tax taken out to the ATO through Single Touch Payroll. So the money is recorded. It is waiting to be matched to you.

## Why you need a TFN to lodge

The TFN is how the ATO connects the income and tax your employer reported with you. Without a TFN, you cannot lodge your tax return online. So the first step is always to get your TFN, or to find the one you already have.

## How do you get a TFN now?

**If you are still in Australia.** If you are in Australia and hold a visa with work rights, you can apply online for free. You do not send documents; your passport details are checked with Home Affairs. The TFN is posted to your Australian address, and you should receive it within 28 days.

If you think you already had a TFN, for example from an earlier visa, do not apply again. Use the ATO's online registration service to find it, or look on old ATO letters or a super statement.

**If you have already left Australia.** If you have left and are a foreign resident for tax purposes, use the ATO paper form for individuals living outside Australia. The ATO says you may need a TFN to claim a tax refund. You send:

- The completed form
- Certified copies of two current identity documents, one of them a primary document such as your passport
- Certified translations of any document not in English

Post it to the ATO at GPO Box 1574, Canberra ACT 2601. Allow 28 days after the ATO receives it, plus time for international mail.

## What does the ATO already have?

Most employers now report through Single Touch Payroll. Your income statement shows your pay and the tax taken out. Wait until it is marked "Tax ready" before you lodge. Most employers finalise this by 14 July.

If your employer paid you in cash and never reported it, the income must still go on your return. You will need your own records, such as bank deposits, messages and notes of your shifts.

Once your TFN is issued, give it to your employer if you still work there. This stops the high withholding from your next pay. Then check that your income statement in ATO online services shows the right employer, income and tax withheld.

## A worked example

Sofia earned $20,000 in wages in 2025-26 and never gave her employer a TFN. Her employer took out at least 45%, which is at least $9,000.

- **If she may be a resident for tax purposes**, tax on $20,000 at the 2025-26 rates is 16% of $1,800 (the amount above $18,200), which is $288. The low income tax offset of $700 reduces this to nil. The Medicare levy is separate, and many students can claim an exemption. In this example, most of the tax withheld is more than her real tax.
- **If she may be a foreign resident for tax purposes**, tax is 30% of $20,000, which is $6,000. In this example, the tax withheld is at least $3,000 more than her real tax.

Her residency for tax purposes decides which result applies, so it is worth getting that question right.

## Check these at the same time

A year without a TFN often has other loose ends.

- **Super.** Give your super fund your TFN so it can match your account to you. Check ATO online services for accounts you did not know about.
- **Medicare levy.** If you are not entitled to Medicare, you may claim the exemption with a Medicare Entitlement Statement. Wait for the statement before you lodge. You need one for each year you claim.
- **Bank account.** Keep an Australian bank account open for your refund.

## Is it too late?

Not usually. You can still lodge a return for an earlier year. The usual deadline for people lodging themselves is 31 October. Tax agent clients can often lodge later if they contact the agent before 31 October, but not if earlier returns were still outstanding at 30 June. The ATO can apply a penalty for lodging late, but it generally warns you first and you can ask for it to be removed after you lodge.

## Your checklist

- Find your old TFN or apply for one, online or by paper from overseas
- Give your TFN to your employer if you still work there
- Wait for your income statement to be "Tax ready"
- Gather records for any cash income
- Apply for a Medicare Entitlement Statement if you are not entitled to Medicare
- Keep an Australian bank account open, then lodge

If you need help with a year you worked without a TFN, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Is the extra tax lost if I never had a TFN?', a: 'No. It is reported against your employment and credited when you lodge your tax return, once you have a TFN.' },
      { q: 'Can I get a TFN after I go home?', a: 'Yes. Foreign residents for tax purposes living outside Australia can use the ATO paper form with certified copies of two identity documents.' },
      { q: 'Do I need a separate return for each year?', a: 'Yes. Each financial year is its own tax return.' },
    ],
    sources: [
      { label: 'ATO: TFN application for foreign passport holders and temporary visitors', href: `${ATO}/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application` },
      { label: 'ATO: TFN application for individuals living outside Australia', href: `${ATO}/forms-and-instructions/tfn-application-for-individual-living-outside-australia` },
      { label: 'ATO: Access your income statement', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/access-your-income-statement` },
      { label: 'ATO: Not entitled to Medicare benefits', href: `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/not-entitled-to-medicare-benefits` },
    ],
  },
]
