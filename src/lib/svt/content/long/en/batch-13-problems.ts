import type { LongArticle } from '../types'

/**
 * Plan 3 (24 Nov 2026): problem guides for students who have left Australia
 * or cannot get into myGov. Facts: S/plan3/r16-facts.md (J, E, I) and the
 * r08/r11 fact sheets; every figure is on an official page in `sources`.
 * zh and vi texts use the same slugs (long/zh, long/vi batch-13-problems.ts).
 */

const MYGOV_SMS = 'https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-a-code-sent-by-sms'
const MYGOV_HELP = 'https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help'
const MYGOV_OVERSEAS = 'https://my.gov.au/en/about/help/mygov-website/help-using-your-account/accessing-mygov-while-overseas'
const MYGOV_RECOVER = 'https://my.gov.au/en/about/help/digital-id/recover-your-account-using-digital-id'
const MYGOV_CONTACT = 'https://my.gov.au/en/about/help/contact'
const ATO_LINK = 'https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato'
const ATO_LINK_INFO = 'https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato/information-you-need-to-link-mygov-to-the-ato'
const ATO_LINK_ERRORS = 'https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/help-and-support-for-online-services-individuals'
const ATO_OUTSIDE = 'https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia'
const ATO_PHONE = 'https://www.ato.gov.au/About-ATO/Contact-us/phone-us/'
const ATO_DASP = 'https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp'
const ATO_DASP_HELP = 'https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system'
const ATO_MISSING_REFUND = 'https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds'
const ATO_BANK_DETAILS = 'https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details'

export const LONG_EN_13: readonly LongArticle[] = [
  {
    slug: 'mygov-sms-code-overseas-international-students',
    category: 'Tax return',
    published: '2026-11-24', updated: '2026-11-24',
    title: 'No myGov code after leaving Australia? Options for students',
    description: 'Your Australian SIM is gone and the myGov SMS code never comes? The sign in options myGov and the ATO list, and how to do your return or super without it.',
    answer: 'myGov only sends SMS codes to the Australian mobile number on your account, so once that SIM is cancelled the code cannot reach you. myGov says you may be able to sign in with Digital ID, a passkey or the myGov app instead, and if none is set up, you can create a new myGov account and link your services again.',
    body: `Your myGov code is not arriving because myGov sends it only to the mobile number registered on your account, and for most students that is the Australian SIM they cancelled when the course ended. What you can do now depends on what you set up before you left. Two jobs, your last tax return and your super claim, do not depend on fixing myGov at all.

## Why does the myGov code stop arriving after I leave?

myGov sends the SMS code to the mobile number registered in your account. To get codes overseas, myGov says you must use that same number, with international roaming turned on, on a network that works with your provider. A prepaid SIM that has expired, or a plan you cancelled before flying home, cannot receive it.

For the ATO part of myGov there is one more rule. The ATO says that if you sign in to its online services with an SMS code, the code has to go to an Australian mobile number. So a new number from home does not solve the problem for your tax records, even if you could add it.

## What should I check first?

If you still have the Australian number, run through myGov's own checklist before anything else:

- you have mobile reception, and flight mode is off
- international roaming is on for the Australian number
- you have restarted the phone, and it has free storage
- you have looked in the blocked and spam message folders

If the number itself is gone, skip this list and go to the options below.

## Which sign in options work without my Australian number?

myGov and the ATO list ways to sign in that do not need an SMS code:

- **The myGov app.** myGov says that if you sign in with the app, a passkey or Digital ID, you do not need to change anything before going overseas.
- **A passkey.** The ATO lists a passkey among the sign in methods it accepts, and it does not use an SMS code.
- **An authenticator app.** The ATO accepts a one-time code from an authenticator. myGov names Google Authenticator, Apple Passwords and 1Password as examples.
- **Digital ID, such as myID.** The ATO recommends myID, a passkey or an authenticator if you are overseas or do not have an Australian mobile number.

Each of these has to be set up while you can still sign in. If you are still in Australia and about to finish your course, this is the moment: the ATO says to update your myGov sign in settings before you go overseas.

## What if I am already home and cannot sign in?

Then the options get narrower, but there is always a way back in:

- **Use what you set up.** If you added the myGov app, a passkey or Digital ID, myGov says you may be able to sign in with it instead of a code.
- **Recover with Digital ID.** myGov can recover an account with a Strong myID that has the same name, date of birth and email as your myGov account. myID says Strong needs Australian identity documents and a photo check, and that temporary residents outside Australia cannot verify a visa in myID. So this route often does not work for students who have already gone home.
- **Start a new account.** myGov says that if you cannot recover the account, you can create a new myGov account and link your services again. To use your old email address on it, the myGov helpdesk has to release it. From overseas the helpdesk is on +61 1300 169 468, option 1, Monday to Friday 7 am to 10 pm and weekends 10 am to 5 pm, Australian time.

Linking the new account to the ATO means answering questions based on what the ATO already holds about you, such as a recent payslip, an active super account or a bank account that received a refund. Our guide to linking the ATO to myGov goes through those questions.

## Can I change my myGov number to an overseas mobile?

myGov lets you change your mobile number in your account settings, but only while you can still sign in. And for the ATO, an SMS code must go to an Australian mobile number. For your tax and super records, an authenticator app, a passkey or myID is the realistic route, not a new number.

## Will I lose my tax records with a new account?

No. Your income statements, notices of assessment and super details are held by the ATO, not by myGov. A new myGov account simply needs to be linked to the ATO again before you can see them online.

## Do I need myGov for my tax return or my super?

Only if you lodge online yourself. The ATO says that to lodge online you need a myGov account linked to the ATO. It also lists other ways to lodge from outside Australia, such as through a registered tax agent or on paper. Whichever way you lodge, you need an Australian bank account for any refund, so keep yours open until the money has arrived.

For your super, the ATO's DASP online application asks for your personal details, your email, your passport details and your fund details. A myGov sign in is not on that list, and your TFN is optional. You submit the application once you have left Australia and your visa has ended.

## You do not need myGov for us to help

You do not need myGov for us to do your tax return. We deal with the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. We never ask for your myGov password. Wherever you are now, you can message Student Visa Tax on WhatsApp.`,
    faq: [
      { q: 'Will a new myGov account lose my tax records?', a: 'No. Your records are held by the ATO, not by myGov. When you link the new account to the ATO, it asks questions based on information it already has about you.' },
      { q: 'Can I get myGov codes on my new overseas number?', a: 'Not for the ATO. The ATO says SMS codes for its online services must go to an Australian mobile number. Use the myGov app, a passkey, an authenticator app or myID instead, set up while you can still sign in.' },
      { q: 'Is my super lost if I cannot sign in to myGov?', a: 'No. The ATO\'s DASP online application does not list a myGov sign in. If you do not claim, your fund sends your super to the ATO once 6 months have passed since you left and your visa ended, and you can still claim it from the ATO.' },
    ],
    sources: [
      { label: 'myGov: Use a code sent by SMS', href: MYGOV_SMS },
      { label: 'myGov: Accessing myGov while overseas', href: MYGOV_OVERSEAS },
      { label: 'myGov: Sign in help', href: MYGOV_HELP },
      { label: 'myGov: Recover your account using Digital ID', href: MYGOV_RECOVER },
      { label: 'myGov: Contact us', href: MYGOV_CONTACT },
      { label: 'ATO: Create a myGov account and link it to the ATO', href: ATO_LINK },
      { label: 'ATO: Lodge your tax return from outside Australia', href: ATO_OUTSIDE },
      { label: 'ATO: Help with the DASP online application system', href: ATO_DASP_HELP },
    ],
  },
  {
    slug: 'cant-link-ato-mygov-international-students',
    category: 'Tax return',
    published: '2026-11-24', updated: '2026-11-24',
    title: 'Can\'t link the ATO to myGov? A guide for students',
    description: 'The ATO will not link to myGov, or its identity questions fail? What the ATO asks, what the error codes mean, and how students can still lodge or claim super.',
    answer: 'The ATO links to your myGov account only after you confirm your identity, with myID or by answering questions drawn from its own records, such as a recent payslip, an active super account or a notice of assessment. If you cannot answer them, the ATO says it will let you know what to do next.',
    body: `The ATO links to your myGov account only after you prove who you are, either with myID at Standard or Strong or by answering questions drawn from records the ATO already holds about you. Most problems come from one of three places: a sign in method the ATO does not accept, questions you cannot answer in your first year, or an error code. Each has an official fix, and none of them stops your tax return or your super claim.

## Which sign in methods does the ATO accept?

To link or use ATO online services, the ATO says you sign in to myGov with one of these:

- myID at Standard or Strong
- a passkey
- an authenticator app that generates a one-time code
- an SMS code sent to an Australian mobile number

Secret questions are not on the list. The ATO says that if answering a secret question is your only sign in option, your account is unlinked from the ATO. If you are overseas or no longer have an Australian number, the ATO recommends myID, a passkey or an authenticator.

## What questions does the ATO ask to link?

The questions are based on information the ATO already has about you. The ATO lists options such as:

- your most recent payslip
- a bank account that received an ATO refund or earned interest in the last 2 years
- an active super account
- a notice of assessment from the last 5 years
- your TFN application receipt reference
- your travel document, if you applied for your TFN as a temporary visitor in the last 4 years

You do not have to answer every topic, and you can skip one you are not sure about. But the ATO says that skipping all of them counts as a failed attempt. If you cannot confirm your identity online, the ATO says it will let you know what to do next.

## Which questions can a student usually answer?

In your first year you may not have a notice of assessment or a refund yet, so look at the others. A recent payslip, your super fund and member number, and your passport details are things most students can find. Have them in front of you before you start.

## What do the linking error codes mean?

The ATO's help page explains the common codes:

- **IDD.002, IDD.004 or IDD.006.** Your details do not match. Check your TFN, name and address. If you have only one name, it goes in the family name field.
- **NOA.002, BANKACC.002, SUPERACC.002 or TVLDOC.002.** An answer was not in the expected format. Check it and try again.
- **LCK.001 to LCK.005.** Too many attempts. Wait until the date and time shown before you try again.
- **OVK.001.** Your sign in method is not supported. Sign in with myID, or contact the ATO.
- **IDD.003, ICI.001 or OVK.002.** You cannot link online. Contact the ATO.

## The ATO does not show in myGov. What now?

Go to View and link services in myGov. If the ATO shows as linked but you cannot open it, the ATO suggests you unlink it and then link it again.

## Who can I call from overseas?

For linking and your ATO records, call the ATO on +61 2 6216 1111 from outside Australia, 8 am to 5 pm Monday to Friday, Australian Eastern time, or 13 28 61 inside Australia. For problems with the myGov account itself, such as a locked account or an email address you want to reuse, the myGov helpdesk is on +61 1300 169 468, option 1, from overseas. Have your TFN ready for the ATO.

## Do I need the link to lodge or claim my super?

The link is only needed to use ATO online services yourself, for example to lodge with myTax. The ATO lists other ways to lodge from outside Australia, such as through a registered tax agent or on paper. Your super is separate again: the ATO's DASP online application asks for your passport and fund details, and a myGov sign in is not on its list.

## You do not need myGov for us to help

If linking keeps failing, it does not have to hold up your return. You do not need myGov for us to do your tax return. We deal with the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. We never ask for your myGov password. You can message Student Visa Tax on WhatsApp from wherever you are.`,
    faq: [
      { q: 'It is my first year and I have no notice of assessment. Can I still link?', a: 'Often yes. You do not need to answer every topic. A recent payslip, an active super account or, if you applied for your TFN as a temporary visitor in the last 4 years, your travel document are among the options the ATO lists.' },
      { q: 'Can I skip a question I cannot answer?', a: 'Yes, you can skip one, but the ATO says that skipping all of them counts as a failed attempt. Too many failed attempts lock linking until the time shown.' },
      { q: 'Can I use secret questions to sign in to the ATO?', a: 'No. The ATO does not accept secret questions for its online services. Use myID, a passkey, an authenticator app or an SMS code to an Australian mobile number.' },
    ],
    sources: [
      { label: 'ATO: Create a myGov account and link it to the ATO', href: ATO_LINK },
      { label: 'ATO: Information you need to link myGov to the ATO', href: ATO_LINK_INFO },
      { label: 'ATO: Help and support for online services', href: ATO_LINK_ERRORS },
      { label: 'ATO: Phone us', href: ATO_PHONE },
      { label: 'myGov: Contact us', href: MYGOV_CONTACT },
      { label: 'ATO: Lodge your tax return from outside Australia', href: ATO_OUTSIDE },
      { label: 'ATO: Help with the DASP online application system', href: ATO_DASP_HELP },
    ],
  },
  {
    slug: 'claim-super-without-mygov-international-students',
    category: 'Super',
    published: '2026-11-24', updated: '2026-11-24',
    title: 'Claim your super without myGov after studying',
    description: 'Cannot get into myGov after your course? The ATO\'s free DASP online application asks for your passport and fund details, not a myGov sign in. How it works.',
    answer: 'You claim your super with the ATO\'s free DASP online application, which asks for your personal details, email, passport country and number and your super fund details, and does not list a myGov sign in. Your TFN is optional, and you submit the claim once you have left Australia and your visa has ended.',
    body: `You can claim your super after studying in Australia without getting back into myGov, because the ATO's DASP online application asks for your passport and fund details, not a myGov sign in. A DASP, or departing Australia superannuation payment, is how former temporary residents take their super with them. It is free to apply online, and you can start before you leave.

## What does the DASP online application ask for?

The ATO lists what the online system needs:

- your personal details and your email address
- your passport country and passport number
- your super fund account details, including the fund's ABN
- your TFN, which is optional: if you give it, the system searches for your super accounts for you

The system also shows the visa details it finds for you, and you confirm them before you submit.

## When can I submit it?

You can start the application in Australia and save it. You can only submit it once you have left Australia and your visa has ended, and you must not hold another active Australian visa. That includes a 485 graduate visa and a bridging visa. The ATO suggests checking your visa status in VEVO, the online visa check from Home Affairs, before you submit.

## Where does myGov come in at all?

Only in finding your super. Before you leave, ATO online services in myGov show the super accounts linked to your TFN. The DASP online system can do the same search if you give your TFN, and the ATO also lists phoning it as a way to find your super. You can also ask each fund you worked with directly. So a dead Australian number or a locked myGov account does not stop the claim itself.

## What if the visa screen is wrong?

Check your visa in VEVO first. If the visa information the DASP system shows is wrong, the ATO says not to submit the application, and to email DASPmail@ato.gov.au instead. For questions from overseas, the ATO gives +61 2 6216 1111, 8 am to 5 pm Monday to Friday, Australian Eastern time; ask to be transferred to 13 10 20.

## How is the super paid, and how long does it take?

Your fund takes the tax before it pays you. If you never held a working holiday visa, the ATO rates are nil on the tax-free component, 35% on the taxed element and 45% on the untaxed element. The ATO says a DASP is generally paid within 28 days of your completed application being received.

The ATO lists these ways to be paid:

- by bank transfer to an Australian account, usually the simplest
- by an Australian dollar cheque
- by an international money transfer, but only for claims paid by a fund, and not every fund offers it; fees, including currency conversion, may apply

Super the ATO already holds is paid only into an Australian bank account in your name, or by cheque.

## What if I wait more than 6 months?

Once it has been 6 months or more since you left Australia and your visa has ended, your fund transfers your super to the ATO. It is not lost. You can still claim it as a DASP, now from the ATO, through the same online application.

## Can someone else claim for me?

Yes. The ATO says a registered tax agent can apply for you with your written authority. You can also do it yourself online, free, as described above.

## Would you rather not do the claim yourself?

The ATO online application is free, and you never need to pay to claim your own super. If you would rather have help, we check your funds, your visa dates and the forms with you, and we confirm the price on WhatsApp before you pay. Student Visa Tax operates under the supervision of a registered tax agent.

Your last tax return is separate from your super. It covers your pay up to the day you leave and is lodged after 30 June, from wherever you are.`,
    faq: [
      { q: 'Do I need myGov to claim my super?', a: 'The ATO\'s DASP online application does not list a myGov sign in. It asks for your personal details, email, passport details and fund details, and your TFN is optional. myGov only helps you see your funds before you leave.' },
      { q: 'I am on a 485 or a bridging visa. Can I claim now?', a: 'No. You cannot submit a DASP claim while you hold any active Australian visa. You can start and save the application, and submit it once you have left Australia and your visa has ended.' },
      { q: 'Can my super be paid into a bank account in my home country?', a: 'Ask your fund. The ATO says some funds offer an international money transfer, but not all, and fees or currency conversion may apply. Super the ATO already holds is paid only into an Australian bank account in your name, or by cheque.' },
    ],
    sources: [
      { label: 'ATO: Help with the DASP online application system', href: ATO_DASP_HELP },
      { label: 'ATO: Departing Australia superannuation payment (DASP)', href: ATO_DASP },
      { label: 'ATO: Phone us', href: ATO_PHONE },
    ],
  },
  {
    slug: 'tax-refund-closed-australian-bank-account-international-students',
    category: 'Tax return',
    published: '2026-11-24', updated: '2026-11-24',
    title: 'Closed your Australian bank account? Refund and super',
    description: 'Closed your Australian bank account before your refund or super arrived? What the ATO does with the money and how to give new bank details from overseas.',
    answer: 'The ATO can only pay tax refunds into an Australian bank account. If your refund goes to an account you have closed, the Reserve Bank of Australia returns it to the ATO, which pays it again to new Australian bank details you give it or, without them, by cheque.',
    body: `If your Australian bank account is closed, your tax refund is not lost: a refund paid to a closed account goes back to the ATO, which pays it again to new Australian bank details or by cheque. Many students close their account in their last week in Australia. But a tax return is lodged after 30 June, and a super claim after the visa ends, so the money often arrives after the account is gone. Here is what happens and what you can still do.

## Can the ATO pay my refund into an overseas account?

No. The ATO says it can only pay refunds into an Australian bank account. The account can be in your name or a joint account. If you have not closed yours yet, keep it open until any refund has arrived, and until your super is paid if you want it paid there.

## What happens if my refund went to my closed account?

The ATO says a refund paid into a closed account is returned to it by the Reserve Bank of Australia, which can take up to 10 days. What happens next depends on whether the ATO has new details for you:

- **You gave new Australian bank details.** The ATO pays the refund again into that account.
- **You did not.** The ATO reissues the refund by cheque. Since January 2025 it has been holding some cheque refunds for up to 90 days while it asks for bank details.

So the money comes back to the ATO and waits for you. The quickest way to receive it is to give the ATO a current Australian account.

## How do I give the ATO new bank details from overseas?

The ATO lists these ways:

- online, in ATO online services through myGov, or in the ATO app
- by phone: you, or a representative you have nominated, can call and answer questions to confirm your identity

Have your TFN ready, and your new BSB, which has 6 digits, and account number. From overseas the ATO is on +61 2 6216 1111, 8 am to 5 pm Monday to Friday, Australian Eastern time. If myGov no longer works for you, our guide to myGov codes after leaving Australia explains the options.

## What about my super?

Your fund pays your DASP. The ATO says payment to an Australian account is usually the simplest. Some funds offer an international money transfer, but not all, and fees or currency conversion may apply. Super that has already been transferred to the ATO, because 6 months have passed since you left and your visa ended, is paid only into an Australian bank account in your name, or by cheque.

## An example

Minh finished her master's degree in June, closed her bank account in her last week and flew home to Hanoi. In August she lodged her tax return from Vietnam and, by habit, gave the old account number. The refund was paid, bounced, and came back to the ATO through the Reserve Bank.

She still had a transaction account with another Australian bank that she had kept for a small subscription. She called the ATO on the overseas number, confirmed her identity with her TFN and gave the BSB and account number of that account. The ATO paid the refund again into it. If she had no Australian account at all, the ATO would have reissued the refund by cheque.

## Before you close your account: a checklist

- Keep the account open until your refund has arrived, and until your super is paid if you want it paid there.
- Note your BSB and account number somewhere safe.
- Check which account the ATO holds for you before your return is lodged.
- Update your address, email and phone with the ATO, so its letters reach you.
- If you must close the account, decide which Australian account will receive any refund, or expect a cheque.

## Getting your return right from overseas

Tell us early if your Australian account is closed, so the right details go on your return. We deal with the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. You can message Student Visa Tax on WhatsApp from wherever you are.`,
    faq: [
      { q: 'Will the ATO send my refund to a bank in my home country?', a: 'No. The ATO pays tax refunds only into an Australian bank account. A refund that bounces from a closed account is paid again to new Australian details, or by cheque.' },
      { q: 'Is my refund lost if my account is closed?', a: 'No. The ATO says the Reserve Bank returns it, which can take up to 10 days. The ATO then pays it to new bank details you give, or reissues it by cheque, and since January 2025 it has held some cheques for up to 90 days while it asks for bank details.' },
      { q: 'Can my super be paid into an overseas account?', a: 'Only if your fund offers an international money transfer, and fees may apply. Super the ATO already holds is paid only into an Australian bank account in your name, or by cheque.' },
    ],
    sources: [
      { label: 'ATO: Missing tax return refunds', href: ATO_MISSING_REFUND },
      { label: 'ATO: Update your financial institution details', href: ATO_BANK_DETAILS },
      { label: 'ATO: Lodge your tax return from outside Australia', href: ATO_OUTSIDE },
      { label: 'ATO: Departing Australia superannuation payment (DASP)', href: ATO_DASP },
      { label: 'ATO: Phone us', href: ATO_PHONE },
    ],
  },
  {
    slug: 'dasp-online-application-problems-international-students',
    category: 'Super',
    published: '2026-11-24', updated: '2026-11-24',
    title: 'DASP online application problems: fixes for students',
    description: 'Saved DASP application gone, fund not found, secret answer forgotten or visa screen wrong? What the ATO says to do about each problem in the online form.',
    answer: 'Most problems with the DASP online application have a fix the ATO describes: re-enter exactly the same details as the first time to see a saved application, use Add application with the fund\'s ABN if a fund is not found, phone the ATO if you forget your secret answer, and email DASPmail@ato.gov.au if the visa screen is wrong.',
    body: `Most problems with the ATO's DASP online application come from a handful of causes, and the ATO's help page for the system has a fix for each one. A DASP, or departing Australia superannuation payment, is how a former student takes their super home. The online application is free, it takes about 30 minutes, and you can start it before you leave. This guide goes through the problems students run into most, in the order they usually appear.

## What do I need before I start?

The ATO lists what the system asks for:

- your name, date of birth and other personal details, and your email address
- your passport country and passport number
- your super fund account details, including the fund's ABN
- your TFN, which is optional: if you give it, the system searches for your super accounts; if not, you enter the account details yourself

The first step is an eligibility check that takes about 45 seconds. The ATO says to enter your details exactly as they appear on your passport. That one habit prevents the most common problem later on.

## Why can I not submit my application?

You can start and save an application while you are in Australia or still hold a visa, but you can only submit it once you are eligible. That means your visa has ended and you have left Australia. The ATO says that even if you have already left, you still cannot submit while your temporary visa is active. A 485 graduate visa or a bridging visa counts as an active visa.

Check your visa status in VEVO, the online visa check from the Department of Home Affairs. If VEVO shows the visa as still active, wait until it has ended, then come back to your saved application.

## Where has my saved application gone?

To see an application you saved, the ATO says you must re-enter exactly the same details you used the first time: your TFN, your name, your passport details and your date of birth.

- If you gave your TFN the first time, include it again. If you did not, leave it out.
- Keep the passport details exactly as you first entered them, even if that passport has since expired.

If any detail is different, the system still lets you create a new application, but you will not see the one you saved. Before you start again, try once more with the details exactly as you typed them the first time.

## I forgot my secret answer. What now?

When you start, you choose a question only you know the answer to. The ATO says the answer can be 1 to 20 characters, one or more words, and can include numbers; extra spaces are ignored. You get three chances to type it correctly when you come back to the system. If you have forgotten the answer, the ATO says to phone it.

## The system does not find my super fund

If you know you have super but the system does not locate it, the ATO says to select Add application on the Add an application page, and start the application with the ABN of the fund that holds your super. You can find a fund's ABN with the Super Fund Lookup website or by contacting the fund.

If you cannot find your TFN, the ATO points to your notice of assessment, ATO letters or a payment summary from an employer. If you still cannot find it, phone the ATO; you will be asked questions to confirm who you are.

If your super has already gone to the ATO, the application shows a category such as "Payment of unclaimed superannuation money" instead of a fund name. That happens when it has been 6 months or more since you left and your visa has ended. The super is not lost, and it can still be claimed.

## The visa screen shows the wrong visa

The visa information screen says whether you have ever held a working holiday visa (subclass 417 or 462). If that is wrong, the ATO says do not submit your application, and email DASPmail@ato.gov.au. Other visas with work rights do not need to be listed by type or date on that screen, but the ATO says your fund needs to know you held them.

## I submitted it with a mistake. Can I change it?

No. The ATO says a submitted application can be viewed but not changed. Contact your fund directly: its details are on the Submitted applications page. An application you saved but have not submitted can still be updated, using your secret answer.

## How do I know where my claim is up to?

The system shows a status for each application: submitted, rejected, new application, not to be forwarded, or transferred. It does not show whether your fund has processed it. The ATO's service standard is 28 days from lodging a completed application, unless the fund needs more information from you. Ask your fund about progress, or the ATO if the ATO holds your super.

## Who can I call from overseas?

The ATO gives +61 2 6216 1111, 8 am to 5 pm Monday to Friday, Australian Eastern time; ask to be transferred to 13 10 20. In Australia the number is 13 10 20. If you need an interpreter, the Translating and Interpreting Service is on +61 3 9268 8332.

## Would you rather have help with the claim?

The ATO online application is free, and you never need to pay to claim your own super. If you would rather have help, we check your funds, your visa dates and the forms with you, and we confirm the price on WhatsApp before you pay. Student Visa Tax operates under the supervision of a registered tax agent.

Your last tax return is separate from your super. It covers your pay up to the day you leave and is lodged after 30 June, from wherever you are.`,
    faq: [
      { q: 'Why can I not see the DASP application I saved?', a: 'The ATO says you must re-enter exactly the same TFN, name, passport details and date of birth you used the first time. Leave the TFN out if you did not give it then, and keep the passport details as first entered, even if that passport has expired.' },
      { q: 'Can I change a DASP application after I submit it?', a: 'No. The ATO says a submitted application can be viewed but not changed. Contact your fund, whose details are on the Submitted applications page.' },
      { q: 'I have left Australia. Why can I still not submit?', a: 'Your visa is probably still active. The ATO says you cannot submit while a temporary visa is active, even after you have left. Check your visa status in VEVO.' },
    ],
    sources: [
      { label: 'ATO: Help with the DASP online application system', href: ATO_DASP_HELP },
      { label: 'ATO: Departing Australia superannuation payment (DASP)', href: ATO_DASP },
    ],
  },
]
